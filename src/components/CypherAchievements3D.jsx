import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { achievementsData } from '../data/achievements'
import AchievementDetailModal from './AchievementDetailModal'
import './cypher-achievements-3d.css'

export default function CypherAchievements3D({ className = '' }) {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mode, setMode] = useState('hero') // 'hero' | 'opening' | 'detail' | 'closing'
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeModalData, setActiveModalData] = useState(null)
  const [hoveredIdx, setHoveredIdx] = useState(-1)
  const [hoverTitle, setHoverTitle] = useState('')
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0, visible: false })

  const threeActionsRef = useRef({})
  const selectedAchievement = achievementsData[selectedIndex] || achievementsData[0]

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return

    let isDisposed = false
    let isVisible = true
    let animationFrameId = null

    // Constants
    const ITEMS = achievementsData
    const ITEM_COUNT = ITEMS.length
    const shelfBoardTop = 0.45
    const spacing = 1.45
    const PRESENT_TRANSITION_DURATION = 0.55 // Fast, responsive transition

    // Helper math functions
    const clamp = THREE.MathUtils.clamp
    const damp = THREE.MathUtils.damp
    const lerp = THREE.MathUtils.lerp
    const smootherstep = (x) => x * x * x * (x * (x * 6 - 15) + 10)
    const mod = (n, m) => ((n % m) + m) % m

    // State
    let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let viewWidth = Math.max(1, root.clientWidth)
    let viewHeight = Math.max(1, root.clientHeight)
    let lastTime = performance.now()
    let currentMode = 'hero'
    let currentSelectedIndex = 0
    let position = 0
    let targetPosition = 0
    let wheelIdle = 0
    let transitionTime = 0
    let hoveredIndex = -1
    let detailSafeWidth = viewWidth * 0.5
    let detailViewOffsetX = 0
    let currentViewOffsetX = 0
    let openingViewOffsetX = 0
    let closingViewOffsetX = 0

    // Three.js Objects
    let renderer, scene, camera, shelfStage, controls, environmentTarget

    const shelfCameraPosition = new THREE.Vector3(0, 1.85, 7.8)
    const shelfCameraTarget = new THREE.Vector3(0, 1.48, 0)
    const presentPosition = new THREE.Vector3(-1.8, 1.55, 0.4)
    const presentCameraPosition = new THREE.Vector3(0, 1.75, 4.8)
    const presentCameraTarget = new THREE.Vector3().copy(presentPosition)
    const shelfRestPosition = new THREE.Vector3()

    const openingPlaquePosition = new THREE.Vector3()
    const openingPlaqueQuaternion = new THREE.Quaternion()
    const openingCameraPosition = new THREE.Vector3()
    const openingCameraTarget = new THREE.Vector3()
    const openingShelfPosition = new THREE.Vector3()

    const presentPlaqueQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.04, 0.14, 0))
    const presentShelfPosition = new THREE.Vector3(0, -3.8, -2.5)

    const closingPlaqueStartPosition = new THREE.Vector3()
    const closingPlaqueStartQuaternion = new THREE.Quaternion()
    const closingCameraPosition = new THREE.Vector3()
    const closingCameraTarget = new THREE.Vector3()
    const closingShelfPosition = new THREE.Vector3()
    const closingPlaquePosition = new THREE.Vector3()
    const closingPlaqueQuaternion = new THREE.Quaternion()

    const transitionCameraTarget = new THREE.Vector3().copy(shelfCameraTarget)

    const pointer = { ndc: new THREE.Vector2(3, 3), clientX: 0, clientY: 0 }
    const raycaster = new THREE.Raycaster()

    let activeAward = null
    let awardRigs = []
    let dustParticles = null

    // Touch & Mouse Dragging
    const shelfDrag = {
      active: false,
      pointerId: null,
      startX: 0,
      startY: 0,
      moved: false,
      velocity: 0,
      lastX: 0,
      lastTime: 0
    }

    // =========================================================================
    // SHARED GEOMETRIES & MATERIALS (MAX PERFORMANCE VIA REUSE)
    // =========================================================================
    const sharedGeoms = {
      plaque: new RoundedBoxGeometry(0.96, 1.48, 0.05, 2, 0.015),
      base: new RoundedBoxGeometry(0.72, 0.08, 0.32, 2, 0.01),
      facePlane: new THREE.PlaneGeometry(0.92, 1.44),
      shadowPlane: new THREE.PlaneGeometry(1.2, 0.6),
      hitBox: new THREE.BoxGeometry(1.05, 1.55, 0.45)
    }

    // Soft procedural contact shadow texture (shared across all 8 plaques)
    function createContactShadowTexture() {
      const cvs = document.createElement('canvas')
      cvs.width = 128
      cvs.height = 64
      const ctx = cvs.getContext('2d')
      const grad = ctx.createRadialGradient(64, 32, 4, 64, 32, 60)
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.75)')
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)')
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 128, 64)
      const tex = new THREE.CanvasTexture(cvs)
      tex.minFilter = THREE.LinearFilter
      tex.generateMipmaps = false
      return tex
    }

    const sharedShadowTexture = createContactShadowTexture()

    const sharedMaterials = {
      graphiteBase: new THREE.MeshStandardMaterial({
        color: 0x090d16,
        roughness: 0.35,
        metalness: 0.85
      }),
      darkMetalBody: new THREE.MeshStandardMaterial({
        color: 0x060912,
        roughness: 0.28,
        metalness: 0.92
      }),
      shadow: new THREE.MeshBasicMaterial({
        map: sharedShadowTexture,
        transparent: true,
        opacity: 0.6,
        depthWrite: false
      }),
      hit: new THREE.MeshBasicMaterial({ visible: false })
    }

    // =========================================================================
    // LIGHTWEIGHT PROCEDURAL CANVAS TEXTURE FOR AWARD PLAQUE FACES
    // 512x768 Crisp Resolution · Pre-rendered ONCE
    // =========================================================================
    function makeAwardFaceTexture(item) {
      const cvs = document.createElement('canvas')
      cvs.width = 512
      cvs.height = 768
      const ctx = cvs.getContext('2d')
      const w = cvs.width
      const h = cvs.height

      // Dark brushed obsidian background
      const bgGrad = ctx.createLinearGradient(0, 0, w, h)
      bgGrad.addColorStop(0, '#04070d')
      bgGrad.addColorStop(0.5, '#081120')
      bgGrad.addColorStop(1, '#030509')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, w, h)

      // Subtle tech background grid
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.035)'
      ctx.lineWidth = 1
      for (let x = 0; x < w; x += 28) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
      }
      for (let y = 0; y < h; y += 28) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
      }

      // Glowing outer boundary
      ctx.strokeStyle = item.foil
      ctx.lineWidth = 2.5
      ctx.strokeRect(24, 24, w - 48, h - 48)

      // Thin inner inset
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 1
      ctx.strokeRect(32, 32, w - 64, h - 64)

      // Cyber corner accents
      const cLen = 22
      ctx.strokeStyle = item.foil
      ctx.lineWidth = 3.5
      // TL
      ctx.beginPath(); ctx.moveTo(24, 24 + cLen); ctx.lineTo(24, 24); ctx.lineTo(24 + cLen, 24); ctx.stroke()
      // TR
      ctx.beginPath(); ctx.moveTo(w - 24 - cLen, 24); ctx.lineTo(w - 24, 24); ctx.lineTo(w - 24, 24 + cLen); ctx.stroke()
      // BL
      ctx.beginPath(); ctx.moveTo(24, h - 24 - cLen); ctx.lineTo(24, h - 24); ctx.lineTo(24 + cLen, h - 24); ctx.stroke()
      // BR
      ctx.beginPath(); ctx.moveTo(w - 24 - cLen, h - 24); ctx.lineTo(w - 24, h - 24); ctx.lineTo(w - 24, h - 24 - cLen); ctx.stroke()

      // Header Brand
      ctx.fillStyle = item.foil
      ctx.font = '700 13px monospace'
      ctx.textAlign = 'left'
      ctx.fillText('CYPhER CLUB', 42, 60)

      ctx.fillStyle = 'rgba(148, 163, 184, 0.9)'
      ctx.font = '600 12px monospace'
      ctx.textAlign = 'right'
      ctx.fillText(`ACH // 0${item.number}`, w - 42, 60)

      ctx.strokeStyle = 'rgba(0, 229, 255, 0.2)'
      ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(42, 74); ctx.lineTo(w - 42, 74); ctx.stroke()

      // Central Emblem / Category Icon
      const cx = w / 2
      const cy = 200

      // Glowing emblem plate
      ctx.fillStyle = 'rgba(10, 20, 38, 0.7)'
      ctx.beginPath(); ctx.arc(cx, cy, 64, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = item.foil
      ctx.lineWidth = 2
      ctx.stroke()

      // Outer dashed tech ring
      ctx.setLineDash([4, 6])
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.beginPath(); ctx.arc(cx, cy, 74, 0, Math.PI * 2); ctx.stroke()
      ctx.setLineDash([])

      // Category Abstract Vector Icon
      ctx.strokeStyle = item.foil
      ctx.fillStyle = item.foil
      ctx.lineWidth = 2.5
      ctx.textAlign = 'center'

      if (item.category === 'Hackathon') {
        // Circuit / chip node
        ctx.strokeRect(cx - 24, cy - 24, 48, 48)
        ctx.fillRect(cx - 10, cy - 10, 20, 20)
        ctx.beginPath()
        ctx.moveTo(cx - 24, cy); ctx.lineTo(cx - 38, cy)
        ctx.moveTo(cx + 24, cy); ctx.lineTo(cx + 38, cy)
        ctx.moveTo(cx, cy - 24); ctx.lineTo(cx, cy - 38)
        ctx.moveTo(cx, cy + 24); ctx.lineTo(cx, cy + 38)
        ctx.stroke()
      } else if (item.category === 'Competition') {
        // Terminal leaderboard / speed radar
        ctx.beginPath()
        ctx.moveTo(cx - 28, cy + 20); ctx.lineTo(cx - 10, cy - 18); ctx.lineTo(cx + 10, cy + 8); ctx.lineTo(cx + 28, cy - 24)
        ctx.stroke()
        for (let p of [-28, -10, 10, 28]) {
          ctx.beginPath(); ctx.arc(cx + p, cy + (p === -28 ? 20 : p === -10 ? -18 : p === 10 ? 8 : -24), 4, 0, Math.PI * 2); ctx.fill()
        }
      } else if (item.category === 'Projects') {
        // Dashboard / modular apps
        ctx.strokeRect(cx - 28, cy - 24, 24, 20)
        ctx.strokeRect(cx + 4, cy - 24, 24, 20)
        ctx.strokeRect(cx - 28, cy + 4, 56, 20)
      } else if (item.category === 'Workshop') {
        // Terminal session & clinic
        ctx.strokeRect(cx - 28, cy - 22, 56, 44)
        ctx.font = '700 16px monospace'
        ctx.fillText('>_ CLI', cx, cy + 6)
      } else if (item.category === 'Coding') {
        // Brackets { }
        ctx.font = '700 36px monospace'
        ctx.fillText('{  }', cx, cy + 12)
      } else if (item.category === 'Innovation') {
        // Neural network node cluster
        const npts = [
          [0, -22], [-22, 14], [22, 14], [0, 6]
        ]
        ctx.beginPath()
        ctx.moveTo(cx + npts[0][0], cy + npts[0][1]); ctx.lineTo(cx + npts[1][0], cy + npts[1][1])
        ctx.moveTo(cx + npts[0][0], cy + npts[0][1]); ctx.lineTo(cx + npts[2][0], cy + npts[2][1])
        ctx.moveTo(cx + npts[1][0], cy + npts[1][1]); ctx.lineTo(cx + npts[3][0], cy + npts[3][1])
        ctx.moveTo(cx + npts[2][0], cy + npts[2][1]); ctx.lineTo(cx + npts[3][0], cy + npts[3][1])
        ctx.stroke()
        npts.forEach(([nx, ny]) => {
          ctx.beginPath(); ctx.arc(cx + nx, cy + ny, 5, 0, Math.PI * 2); ctx.fill()
        })
      } else if (item.category === 'Community') {
        // Connected network nodes
        for (let a = 0; a < 6; a++) {
          const rad = (a * Math.PI) / 3
          const px = cx + Math.cos(rad) * 26
          const py = cy + Math.sin(rad) * 26
          ctx.beginPath(); ctx.arc(px, py, 4.5, 0, Math.PI * 2); ctx.fill()
          ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke()
        }
        ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill()
      } else {
        // Recognition: Trophy medallion / star
        ctx.strokeRect(cx - 18, cy - 24, 36, 32)
        ctx.beginPath(); ctx.moveTo(cx - 18, cy + 8); ctx.lineTo(cx, cy + 22); ctx.lineTo(cx + 18, cy + 8); ctx.stroke()
        ctx.beginPath(); ctx.arc(cx, cy - 8, 8, 0, Math.PI * 2); ctx.fill()
      }

      // Achievement Title
      ctx.fillStyle = '#FFFFFF'
      ctx.font = '800 24px sans-serif'
      ctx.textAlign = 'center'
      const titleWords = item.title.toUpperCase().split(' ')
      if (titleWords.length > 2) {
        ctx.fillText(titleWords.slice(0, 2).join(' '), cx, 310)
        ctx.fillText(titleWords.slice(2).join(' '), cx, 338)
      } else {
        ctx.fillText(item.title.toUpperCase(), cx, 320)
      }

      // Category Pill & Year
      ctx.fillStyle = item.foil
      ctx.font = '700 14px monospace'
      ctx.fillText(`${item.category.toUpperCase()} · 2026`, cx, 380)

      // Verified Documented Activity
      ctx.fillStyle = '#94A3B8'
      ctx.font = '400 13px sans-serif'
      const descWords = item.description.split(' ')
      let line = ''
      let ly = 430
      for (let i = 0; i < descWords.length; i++) {
        const testLine = line + descWords[i] + ' '
        if (ctx.measureText(testLine).width > w - 100 && i > 0) {
          ctx.fillText(line, cx, ly)
          line = descWords[i] + ' '
          ly += 20
        } else {
          line = testLine
        }
      }
      ctx.fillText(line, cx, ly)

      // Team attribution
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.font = '600 13px monospace'
      ctx.fillText('TEAM: CYPHER CLUB', cx, 640)

      // Verified footer seal
      ctx.fillStyle = 'rgba(0, 229, 255, 0.12)'
      ctx.fillRect(cx - 110, 675, 220, 30)
      ctx.strokeStyle = item.foil
      ctx.strokeRect(cx - 110, 675, 220, 30)
      ctx.fillStyle = item.foil
      ctx.font = '700 11px monospace'
      ctx.fillText(`AUTHENTICATED // 2026`, cx, 694)

      const tex = new THREE.CanvasTexture(cvs)
      tex.colorSpace = THREE.SRGBColorSpace
      tex.minFilter = THREE.LinearMipmapLinearFilter
      tex.generateMipmaps = true
      tex.needsUpdate = true
      return tex
    }

    // =========================================================================
    // COMPACT 3D TROPHY / AWARD PLAQUE RIG
    // =========================================================================
    function createAwardRig(item, index) {
      const root = new THREE.Group()
      root.name = `award-${item.id}`
      root.userData.index = index

      const motion = new THREE.Group()
      motion.name = `${item.id}-motion`
      root.add(motion)

      // Heavy graphite pedestal base
      const baseMesh = new THREE.Mesh(sharedGeoms.base, sharedMaterials.graphiteBase)
      baseMesh.position.set(0, -0.74, 0)
      motion.add(baseMesh)

      // Plaque back body
      const plaqueBody = new THREE.Mesh(sharedGeoms.plaque, sharedMaterials.darkMetalBody)
      plaqueBody.position.set(0, 0, 0)
      motion.add(plaqueBody)

      // Faceplate with custom CanvasTexture
      const faceTexture = makeAwardFaceTexture(item)
      const faceMat = new THREE.MeshStandardMaterial({
        map: faceTexture,
        roughness: 0.22,
        metalness: 0.25
      })

      const faceMesh = new THREE.Mesh(sharedGeoms.facePlane, faceMat)
      faceMesh.position.set(0, 0, 0.026)
      motion.add(faceMesh)

      // Thin glowing border trim
      const edgeMat = new THREE.MeshBasicMaterial({
        color: item.foil
      })
      const edgeTrim = new THREE.Mesh(sharedGeoms.facePlane, edgeMat)
      edgeTrim.scale.set(1.02, 1.02, 1)
      edgeTrim.position.set(0, 0, 0.025)
      motion.add(edgeTrim)

      // Soft contact shadow on the floor
      const shadow = new THREE.Mesh(sharedGeoms.shadowPlane, sharedMaterials.shadow)
      shadow.rotation.x = -Math.PI * 0.5
      shadow.position.set(0, -0.77, 0)
      root.add(shadow)

      // Invisible Raycast Hit Box
      const hit = new THREE.Mesh(sharedGeoms.hitBox, sharedMaterials.hit)
      hit.name = `${item.id}-hit`
      root.add(hit)

      return {
        data: item,
        index,
        root,
        motion,
        edgeMat,
        faceMat,
        faceTexture,
        hit,
        lastOffset: null
      }
    }

    // =========================================================================
    // ROOM & LIGHTS (LIGHTWEIGHT & HIGH PERFORMANCE)
    // =========================================================================
    function addRoom() {
      // Dark ground plane
      const floorGeom = new THREE.PlaneGeometry(36, 24)
      const floorMat = new THREE.MeshStandardMaterial({
        color: 0x05070b,
        roughness: 0.35,
        metalness: 0.4
      })
      const floor = new THREE.Mesh(floorGeom, floorMat)
      floor.rotation.x = -Math.PI * 0.5
      floor.position.y = -0.01
      scene.add(floor)

      // Dark backdrop
      const backGeom = new THREE.PlaneGeometry(36, 18)
      const backMat = new THREE.MeshStandardMaterial({
        color: 0x05070b,
        roughness: 0.95,
        metalness: 0.05
      })
      const back = new THREE.Mesh(backGeom, backMat)
      back.position.set(0, 5, -4)
      scene.add(back)

      // Graphite gallery rail
      const railGeom = new THREE.BoxGeometry(20, 0.18, 0.9)
      const rail = new THREE.Mesh(railGeom, sharedMaterials.graphiteBase)
      rail.position.set(0, 0.28, -0.02)
      shelfStage.add(rail)

      // Subtle cyan glowing LED strip along rail edge
      const ledGeom = new THREE.BoxGeometry(20.02, 0.03, 0.02)
      const ledMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff })
      const ledStrip = new THREE.Mesh(ledGeom, ledMat)
      ledStrip.position.set(0, 0.37, 0.43)
      shelfStage.add(ledStrip)
    }

    function addLights() {
      const hemi = new THREE.HemisphereLight(0x00e5ff, 0x05070b, 0.65)
      scene.add(hemi)

      const keyLight = new THREE.DirectionalLight(0x00e5ff, 1.4)
      keyLight.position.set(-3, 6, 5)
      scene.add(keyLight)

      const fillLight = new THREE.DirectionalLight(0x7c3aed, 1.0)
      fillLight.position.set(4, 4, 3)
      scene.add(fillLight)

      const rimLight = new THREE.DirectionalLight(0x2563eb, 0.8)
      rimLight.position.set(0, 3, -4)
      scene.add(rimLight)
    }

    function addDust() {
      const count = 40
      const geom = new THREE.BufferGeometry()
      const pos = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 14
        pos[i * 3 + 1] = Math.random() * 5
        pos[i * 3 + 2] = (Math.random() - 0.5) * 6
      }
      geom.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      const mat = new THREE.PointsMaterial({
        color: 0x00e5ff,
        size: 0.035,
        transparent: true,
        opacity: 0.35
      })
      dustParticles = new THREE.Points(geom, mat)
      scene.add(dustParticles)
    }

    function configureResponsiveTargets() {
      const narrow = viewWidth < 820
      shelfCameraPosition.set(0, narrow ? 1.95 : 1.85, narrow ? 8.6 : 7.8)
      shelfCameraTarget.set(0, narrow ? 1.5 : 1.48, 0)
      presentPosition.set(narrow ? 0 : -1.8, narrow ? 2.1 : 1.55, narrow ? 0.2 : 0.4)
      presentCameraPosition.set(narrow ? 0 : -0.3, narrow ? 2.2 : 1.75, narrow ? 5.2 : 4.8)
      presentCameraTarget.copy(presentPosition)

      if (narrow) {
        detailViewOffsetX = 0
        detailSafeWidth = viewWidth
      } else {
        const panelLeft = viewWidth * 0.64
        const gutter = clamp(viewWidth * 0.035, 32, 56)
        detailSafeWidth = Math.max(viewWidth * 0.42, panelLeft - gutter)
        const wideProgress = clamp((viewWidth - 820) / 620, 0, 1)
        const centerRatio = lerp(0.55, 0.62, wideProgress)
        detailViewOffsetX = Math.max(0, viewWidth * 0.5 - detailSafeWidth * centerRatio)
      }
    }

    function applyDetailViewOffset() {
      if (Math.abs(currentViewOffsetX) < 0.5) {
        camera.clearViewOffset()
        return
      }
      camera.setViewOffset(viewWidth, viewHeight, currentViewOffsetX, 0, viewWidth, viewHeight)
    }

    // =========================================================================
    // AWARD PRESENTATION (NO BOOK OPENING!)
    // =========================================================================
    function updateSelection(index) {
      currentSelectedIndex = mod(index, ITEM_COUNT)
      setSelectedIndex(currentSelectedIndex)
    }

    function openDetail() {
      if (currentMode !== 'hero') return
      currentMode = 'opening'
      setMode('opening')
      transitionTime = 0

      activeAward = awardRigs[currentSelectedIndex]

      activeAward.root.updateWorldMatrix(true, true)
      activeAward.root.matrixWorld.decompose(
        openingPlaquePosition,
        openingPlaqueQuaternion,
        new THREE.Vector3()
      )
      openingCameraPosition.copy(camera.position)
      openingCameraTarget.copy(transitionCameraTarget)
      openingShelfPosition.copy(shelfStage.position)
      openingViewOffsetX = currentViewOffsetX

      scene.add(activeAward.root)
      activeAward.root.position.copy(openingPlaquePosition)
      activeAward.root.quaternion.copy(openingPlaqueQuaternion)
      applyDetailViewOffset()
      controls.enabled = false

      if (reducedMotion) {
        finishOpening()
      }
    }

    function applyOpeningPose(progress) {
      const eased = smootherstep(clamp(progress, 0, 1))
      shelfStage.position.lerpVectors(openingShelfPosition, presentShelfPosition, eased)
      activeAward.root.position.lerpVectors(openingPlaquePosition, presentPosition, eased)
      activeAward.root.quaternion.slerpQuaternions(openingPlaqueQuaternion, presentPlaqueQuaternion, eased)
      camera.position.lerpVectors(openingCameraPosition, presentCameraPosition, eased)
      transitionCameraTarget.lerpVectors(openingCameraTarget, presentCameraTarget, eased)

      currentViewOffsetX = lerp(openingViewOffsetX, detailViewOffsetX, eased)
      applyDetailViewOffset()
      camera.lookAt(transitionCameraTarget)
    }

    function finishOpening() {
      currentMode = 'detail'
      setMode('detail')
      shelfStage.position.copy(presentShelfPosition)
      activeAward.root.position.copy(presentPosition)
      activeAward.root.quaternion.copy(presentPlaqueQuaternion)
      camera.position.copy(presentCameraPosition)
      transitionCameraTarget.copy(presentCameraTarget)
      currentViewOffsetX = detailViewOffsetX
      applyDetailViewOffset()
      camera.lookAt(transitionCameraTarget)

      controls.target.copy(presentCameraTarget)
      controls.enabled = true
      controls.update()
    }

    function closeDetail() {
      if (currentMode !== 'detail') return
      currentMode = 'closing'
      setMode('closing')
      transitionTime = 0
      controls.enabled = false

      closingPlaqueStartPosition.copy(activeAward.root.position)
      closingPlaqueStartQuaternion.copy(activeAward.root.quaternion)
      closingCameraPosition.copy(camera.position)
      closingCameraTarget.copy(controls.target)
      closingShelfPosition.copy(shelfStage.position)
      closingViewOffsetX = currentViewOffsetX
      transitionCameraTarget.copy(closingCameraTarget)

      position = currentSelectedIndex
      targetPosition = currentSelectedIndex
      closingPlaquePosition.set(0, shelfBoardTop + 0.74, 0.12)

      awardRigs.forEach((rig, idx) => {
        if (rig !== activeAward && rig.root.parent === shelfStage) {
          rig.root.position.set((idx - position) * spacing, shelfBoardTop + 0.74, 0.12)
        }
      })

      if (reducedMotion) {
        finishClosing()
      }
    }

    function applyClosingPose(progress) {
      const eased = smootherstep(clamp(progress, 0, 1))
      shelfStage.position.lerpVectors(closingShelfPosition, shelfRestPosition, eased)
      activeAward.root.position.lerpVectors(closingPlaqueStartPosition, closingPlaquePosition, eased)
      activeAward.root.quaternion.slerpQuaternions(closingPlaqueStartQuaternion, closingPlaqueQuaternion, eased)
      camera.position.lerpVectors(closingCameraPosition, shelfCameraPosition, eased)
      transitionCameraTarget.lerpVectors(closingCameraTarget, shelfCameraTarget, eased)

      currentViewOffsetX = lerp(closingViewOffsetX, 0, eased)
      applyDetailViewOffset()
      camera.lookAt(transitionCameraTarget)
    }

    function finishClosing() {
      currentMode = 'hero'
      setMode('hero')
      shelfStage.position.copy(shelfRestPosition)
      shelfStage.add(activeAward.root)
      activeAward.root.position.copy(closingPlaquePosition)
      activeAward.root.quaternion.set(0, 0, 0, 1)
      camera.position.copy(shelfCameraPosition)
      transitionCameraTarget.copy(shelfCameraTarget)
      currentViewOffsetX = 0
      applyDetailViewOffset()
      camera.lookAt(transitionCameraTarget)
      activeAward = null
    }

    function navigate(dir) {
      if (currentMode !== 'hero') return
      targetPosition = Math.round(targetPosition + dir)
    }

    function selectItem(idx) {
      if (currentMode !== 'hero') return
      targetPosition = idx
    }

    threeActionsRef.current = {
      openDetail,
      closeDetail,
      navigate,
      selectItem
    }

    // =========================================================================
    // EVENT LISTENERS: POINTER, DRAG, WHEEL, KEYBOARD
    // =========================================================================
    function onPointerMove(e) {
      const rect = canvas.getBoundingClientRect()
      pointer.clientX = e.clientX
      pointer.clientY = e.clientY
      pointer.ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      pointer.ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      // Shelf Dragging
      if (shelfDrag.active && currentMode === 'hero') {
        const deltaX = e.clientX - shelfDrag.startX
        if (Math.abs(deltaX) > 4) shelfDrag.moved = true

        const now = performance.now()
        const dt = Math.max(1, now - shelfDrag.lastTime)
        shelfDrag.velocity = (e.clientX - shelfDrag.lastX) / dt
        shelfDrag.lastX = e.clientX
        shelfDrag.lastTime = now

        targetPosition -= (deltaX / rect.width) * 2.2
        shelfDrag.startX = e.clientX
        return
      }

      // Raycast detection
      if (currentMode === 'hero') {
        raycaster.setFromCamera(pointer.ndc, camera)
        const hitMeshes = awardRigs.map((r) => r.hit)
        const intersects = raycaster.intersectObjects(hitMeshes, false)

        if (intersects.length > 0) {
          const hitMesh = intersects[0].object
          const found = awardRigs.find((r) => r.hit === hitMesh)
          if (found) {
            hoveredIndex = found.index
            setHoveredIdx(found.index)
            setHoverTitle(found.data.title)
            setPointerPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true })
            return
          }
        }
        hoveredIndex = -1
        setHoveredIdx(-1)
        setPointerPos((prev) => ({ ...prev, visible: false }))
      }
    }

    function onPointerDown(e) {
      if (currentMode === 'hero') {
        shelfDrag.active = true
        shelfDrag.pointerId = e.pointerId
        shelfDrag.startX = e.clientX
        shelfDrag.startY = e.clientY
        shelfDrag.lastX = e.clientX
        shelfDrag.lastTime = performance.now()
        shelfDrag.moved = false
        shelfDrag.velocity = 0
      }
    }

    function onPointerUp() {
      if (shelfDrag.active && currentMode === 'hero') {
        shelfDrag.active = false
        if (Math.abs(shelfDrag.velocity) > 0.3) {
          targetPosition -= shelfDrag.velocity * 0.75
        }
        targetPosition = Math.round(targetPosition)
      }
    }

    function onCanvasClick() {
      if (shelfDrag.moved) return
      if (currentMode === 'hero') {
        if (hoveredIndex !== -1) {
          if (hoveredIndex === currentSelectedIndex) {
            openDetail()
          } else {
            targetPosition = hoveredIndex
          }
        }
      }
    }

    function onWheel(e) {
      if (currentMode === 'hero') {
        e.preventDefault()
        wheelIdle = 0.25
        targetPosition += Math.sign(e.deltaY) * 0.35
      }
    }

    function onKeyDown(e) {
      if (e.key === 'Escape' && currentMode === 'detail') {
        closeDetail()
      } else if (currentMode === 'hero') {
        if (e.key === 'ArrowLeft') navigate(-1)
        else if (e.key === 'ArrowRight') navigate(1)
        else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          openDetail()
        }
      }
    }

    function resize() {
      if (!root || !canvas || isDisposed) return
      viewWidth = Math.max(1, root.clientWidth)
      viewHeight = Math.max(1, root.clientHeight)
      renderer.setSize(viewWidth, viewHeight, false)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      camera.aspect = viewWidth / viewHeight
      configureResponsiveTargets()
      applyDetailViewOffset()
      camera.updateProjectionMatrix()
    }

    // =========================================================================
    // INTERSECTION OBSERVER FOR PAUSING RENDERING OFF-SCREEN
    // =========================================================================
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting
      })
    }, { threshold: 0.05 })

    observer.observe(root)

    // =========================================================================
    // INITIALIZATION & RENDER LOOP
    // =========================================================================
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance'
      })
    } catch (err) {
      console.error('WebGL init failed:', err)
      return
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.setClearColor(0x05070b, 1)

    scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x05070b, 0.024)

    const pmrem = new THREE.PMREMGenerator(renderer)
    environmentTarget = pmrem.fromScene(new RoomEnvironment(), 0.04)
    scene.environment = environmentTarget.texture
    scene.environmentIntensity = 0.7
    pmrem.dispose()

    camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60)
    shelfStage = new THREE.Group()
    shelfStage.name = 'shelf-stage'
    scene.add(shelfStage)

    configureResponsiveTargets()
    camera.position.copy(shelfCameraPosition)
    camera.lookAt(shelfCameraTarget)

    controls = new OrbitControls(camera, canvas)
    controls.enabled = false
    controls.enableDamping = !reducedMotion
    controls.dampingFactor = 0.075
    controls.enablePan = true
    controls.screenSpacePanning = true
    controls.minDistance = 2.5
    controls.maxDistance = 7.0
    controls.minPolarAngle = Math.PI * 0.18
    controls.maxPolarAngle = Math.PI * 0.76
    controls.target.copy(shelfCameraTarget)

    addRoom()
    addLights()
    addDust()

    awardRigs = ITEMS.map((item, index) => {
      const rig = createAwardRig(item, index)
      shelfStage.add(rig.root)
      return rig
    })

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('keydown', onKeyDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('click', onCanvasClick)
    canvas.addEventListener('wheel', onWheel, { passive: false })

    // Ultra-smooth 60 FPS frame loop
    function frame(time) {
      if (isDisposed) return
      animationFrameId = requestAnimationFrame(frame)

      // Only render if visible on screen to save battery and GPU cycles
      if (!isVisible) return

      const delta = Math.min((time - lastTime) / 1000, 0.05)
      const elapsed = time / 1000
      lastTime = time

      // Shelf Layout Update
      if (currentMode === 'hero') {
        position = reducedMotion ? targetPosition : damp(position, targetPosition, 9.5, delta)
        if (Math.abs(position - targetPosition) < 0.0005) position = targetPosition

        if (wheelIdle > 0) {
          wheelIdle -= delta
          if (wheelIdle <= 0) targetPosition = Math.round(targetPosition)
        }

        const nearest = mod(Math.round(position), ITEM_COUNT)
        if (nearest !== currentSelectedIndex) {
          updateSelection(nearest)
        }
      }

      // Update 3D Award Plaques along shelf
      awardRigs.forEach((rig, index) => {
        if (rig.root.parent !== shelfStage) return

        let offset = index - position
        offset -= Math.round(offset / ITEM_COUNT) * ITEM_COUNT
        const distance = Math.abs(offset)
        const focus = 1 - clamp(distance, 0, 1)

        const targetX = offset * spacing
        const targetY = shelfBoardTop + 0.74 + focus * 0.14
        const targetZ = 0.12 + focus * 0.22 - Math.min(distance, 2.5) * 0.06
        const targetRotY = -offset * 0.09
        const targetRotZ = -offset * 0.015
        const targetScale = 1 + focus * 0.08
        const speed = reducedMotion ? 1000 : 12

        rig.root.position.x = damp(rig.root.position.x, targetX, speed, delta)
        rig.root.position.y = damp(rig.root.position.y, targetY, speed, delta)
        rig.root.position.z = damp(rig.root.position.z, targetZ, speed, delta)
        rig.root.rotation.y = damp(rig.root.rotation.y, targetRotY, speed, delta)
        rig.root.rotation.z = damp(rig.root.rotation.z, targetRotZ, speed, delta)
        rig.root.scale.setScalar(damp(rig.root.scale.x, targetScale, speed, delta))

        // Hover lift & tilt
        const isHov = hoveredIndex === index && currentMode === 'hero'
        const hovElevation = isHov && !reducedMotion ? 0.06 : 0
        const hovTilt = isHov && !reducedMotion ? -0.06 : 0
        rig.motion.position.y = damp(rig.motion.position.y, hovElevation, 12, delta)
        rig.motion.rotation.x = damp(rig.motion.rotation.x, hovTilt, 12, delta)
      })

      // Transitions
      if (currentMode === 'opening') {
        transitionTime = Math.min(1, transitionTime + delta / PRESENT_TRANSITION_DURATION)
        applyOpeningPose(transitionTime)
        if (transitionTime >= 1) finishOpening()
      } else if (currentMode === 'closing') {
        transitionTime = Math.min(1, transitionTime + delta / PRESENT_TRANSITION_DURATION)
        applyClosingPose(transitionTime)
        if (transitionTime >= 1) finishClosing()
      } else if (currentMode === 'hero') {
        camera.position.x = damp(camera.position.x, shelfCameraPosition.x, 8, delta)
        camera.position.y = damp(camera.position.y, shelfCameraPosition.y, 8, delta)
        camera.position.z = damp(camera.position.z, shelfCameraPosition.z, 8, delta)
        transitionCameraTarget.copy(shelfCameraTarget)
        currentViewOffsetX = 0
        applyDetailViewOffset()
        camera.lookAt(shelfCameraTarget)
      } else if (currentMode === 'detail') {
        controls.update()
      }

      // Ambient dust drift
      if (dustParticles) {
        dustParticles.rotation.y = elapsed * 0.02
      }

      renderer.render(scene, camera)
    }

    animationFrameId = requestAnimationFrame(frame)

    // Complete clean-up
    return () => {
      isDisposed = true
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      observer.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('keydown', onKeyDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('click', onCanvasClick)
      canvas.removeEventListener('wheel', onWheel)

      // Dispose textures, geometries, materials
      sharedShadowTexture.dispose()
      Object.values(sharedGeoms).forEach((g) => g.dispose())
      Object.values(sharedMaterials).forEach((m) => m.dispose())
      awardRigs.forEach((rig) => {
        rig.faceTexture.dispose()
        rig.faceMat.dispose()
        rig.edgeMat.dispose()
      })

      if (controls) controls.dispose()
      if (renderer) renderer.dispose()
    }
  }, [])

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev)
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 80)
  }

  return (
    <div
      ref={rootRef}
      className={`cypher-achievements-root ${isFullscreen ? 'is-fullscreen' : ''} ${className}`}
      data-mode={mode}
    >
      {/* Cyber Framing Corners */}
      <span className="cypher-frame-corner cypher-frame-tl" aria-hidden="true" />
      <span className="cypher-frame-corner cypher-frame-tr" aria-hidden="true" />
      <span className="cypher-frame-corner cypher-frame-bl" aria-hidden="true" />
      <span className="cypher-frame-corner cypher-frame-br" aria-hidden="true" />

      {/* Top Masthead Header */}
      <header className="cypher-masthead" aria-label="Achievements Section Header">
        <div className="cypher-identity">
          <span className="cypher-community-badge">TECHNOLOGY COMMUNITY</span>
          <h2 className="cypher-section-title">
            CYPhER CLUB <span>ACHIEVEMENTS</span>
          </h2>
          <p className="cypher-subtitle">
            Celebrating ideas, innovation and student excellence.
          </p>
        </div>

        <div className="cypher-header-actions">
          <button
            onClick={() => {
              if (mode === 'detail') threeActionsRef.current.closeDetail?.()
              else threeActionsRef.current.openDetail?.()
            }}
            className="cypher-explore-btn"
            type="button"
          >
            <span>{mode === 'detail' ? 'RETURN TO SHELF' : 'EXPLORE ACHIEVEMENTS'}</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={toggleFullscreen}
            className="cypher-icon-btn"
            type="button"
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
            aria-label="Toggle Fullscreen View"
          >
            {isFullscreen ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* 3D WebGL Canvas Shell */}
      <div className="cypher-scene-shell">
        <canvas
          ref={canvasRef}
          className={`cypher-webgl-canvas ${mode === 'detail' ? 'is-inspecting' : ''}`}
          aria-label="Interactive 3D Achievements Catalogue"
        />
      </div>

      {/* Dynamic Cursor Tooltip */}
      <div
        className="cypher-pointer-label"
        style={{
          left: `${pointerPos.x}px`,
          top: `${pointerPos.y}px`
        }}
        aria-hidden={!pointerPos.visible || mode !== 'hero'}
      >
        <span className="cypher-pointer-label-idx">CYPHER // 0{hoveredIdx + 1}</span>
        <strong className="cypher-pointer-label-title">{hoverTitle}</strong>
      </div>

      {/* Bottom Horizontal Catalogue Navigation */}
      <nav
        className="cypher-browse-ui"
        aria-label="Achievement Navigation"
        style={{
          opacity: mode === 'hero' ? 1 : 0,
          transform: mode === 'hero' ? 'translateY(0)' : 'translateY(14px)',
          pointerEvents: mode === 'hero' ? 'auto' : 'none'
        }}
      >
        {/* Active Selection Details */}
        <div className="cypher-selection">
          <span className="cypher-counter">
            0{selectedIndex + 1} / 0{achievementsData.length}
          </span>
          <div className="cypher-selection-copy">
            <h3 className="cypher-selection-title">{selectedAchievement.title}</h3>
            <p className="cypher-selection-note">{selectedAchievement.description}</p>
          </div>
        </div>

        {/* Prev / Focus / Next Actions */}
        <div className="cypher-browse-actions">
          <button
            onClick={() => threeActionsRef.current.navigate?.(-1)}
            className="cypher-round-btn"
            type="button"
            aria-label="Previous award"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={() => threeActionsRef.current.openDetail?.()}
            className="cypher-open-btn"
            type="button"
          >
            Inspect Award
          </button>

          <button
            onClick={() => threeActionsRef.current.navigate?.(1)}
            className="cypher-round-btn"
            type="button"
            aria-label="Next award"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Marker Indicator Pills */}
        <div className="cypher-index-nav">
          <div className="cypher-markers" role="tablist" aria-label="Select award plaque">
            {achievementsData.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => threeActionsRef.current.selectItem?.(idx)}
                className={`cypher-marker-pill ${idx === selectedIndex ? 'is-active' : ''}`}
                type="button"
                role="tab"
                aria-selected={idx === selectedIndex}
                title={`${item.number} ${item.title}`}
              />
            ))}
          </div>
          <span className="cypher-microcopy">Drag horizontal · Wheel scroll · Click award</span>
        </div>
      </nav>

      {/* =======================================================================
          LIGHTWEIGHT AWARD DETAIL REVEAL PANEL
          AWARD → WHAT WAS ACHIEVED → WHEN
          ======================================================================= */}
      <aside
        className={`cypher-award-detail-panel ${mode === 'detail' ? 'is-active' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Award Information"
      >
        <button
          onClick={() => threeActionsRef.current.closeDetail?.()}
          className="cypher-detail-close-btn"
          type="button"
          aria-label="Close detail and return to shelf"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div>
          {/* Category · Year */}
          <div className="cypher-detail-tagline">
            <span className="cypher-category-pill">{selectedAchievement.category}</span>
            <span className="text-slate-500">·</span>
            <span className="cypher-year-pill">{selectedAchievement.year}</span>
          </div>

          {/* Award Title */}
          <h3 className="cypher-award-title">
            {selectedAchievement.title}
          </h3>

          {/* Achievement Description */}
          <p className="cypher-award-desc">
            "{selectedAchievement.description}"
          </p>

          {/* Compact Metadata */}
          <dl className="cypher-compact-meta">
            <div className="cypher-meta-cell">
              <dt>CATEGORY</dt>
              <dd>{selectedAchievement.category}</dd>
            </div>
            <div className="cypher-meta-cell">
              <dt>YEAR</dt>
              <dd>{selectedAchievement.year}</dd>
            </div>
            <div className="cypher-meta-cell">
              <dt>TEAM / STUDENT</dt>
              <dd>{selectedAchievement.team}</dd>
            </div>
            <div className="cypher-meta-cell">
              <dt>STATUS</dt>
              <dd className="text-cyan-400 font-mono">Authenticated</dd>
            </div>
          </dl>
        </div>

        {/* Lightweight Buttons */}
        <div className="cypher-award-actions">
          <button
            onClick={() => setActiveModalData(selectedAchievement)}
            className="cypher-btn-primary"
            type="button"
          >
            [ VIEW DETAILS ]
          </button>

          <button
            onClick={() => threeActionsRef.current.closeDetail?.()}
            className="cypher-btn-secondary"
            type="button"
          >
            [ CLOSE ]
          </button>
        </div>

        <p className="cypher-award-hint">
          Drag in 3D to tilt plaque · 360° orbital preview
        </p>
      </aside>

      {/* Detailed Modal popup when clicking [ VIEW DETAILS ] */}
      {activeModalData && (
        <AchievementDetailModal
          achievement={activeModalData}
          onClose={() => setActiveModalData(null)}
        />
      )}
    </div>
  )
}

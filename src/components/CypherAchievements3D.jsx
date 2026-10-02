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
  const tooltipRef = useRef(null)

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mode, setMode] = useState('hero') // 'hero' | 'opening' | 'detail' | 'closing'
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeModalData, setActiveModalData] = useState(null)
  const [hoveredIdx, setHoveredIdx] = useState(-1)
  const [hoverTitle, setHoverTitle] = useState('')

  const threeActionsRef = useRef({})
  const selectedAchievement = achievementsData[selectedIndex] || achievementsData[0]

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    const tooltip = tooltipRef.current
    if (!root || !canvas) return

    let isDisposed = false
    let isVisible = true
    let animationFrameId = null
    let isPageScrolling = false
    let scrollEndTimer = null

    // Constants
    const ITEMS = achievementsData
    const ITEM_COUNT = ITEMS.length
    const shelfBoardTop = 0.45
    const spacing = 1.45
    const PRESENT_TRANSITION_DURATION = 0.55
    const PAUSE_DURATION = 2.0 // 2-second pause per focused award
    const TRANSITION_DURATION = 3.0 // 3-second smooth cinematic transition

    // Helper math functions
    const clamp = THREE.MathUtils.clamp
    const damp = THREE.MathUtils.damp
    const lerp = THREE.MathUtils.lerp
    const smootherstep = (x) => x * x * x * (x * (x * 6 - 15) + 10)

    // State
    let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let viewWidth = Math.max(1, root.clientWidth)
    let viewHeight = Math.max(1, root.clientHeight)
    let lastTime = performance.now()
    let currentMode = 'hero'
    let position = 0
    let transitionTime = 0
    let hoveredIndex = -1
    let detailSafeWidth = viewWidth * 0.5
    let detailViewOffsetX = 0
    let currentViewOffsetX = 0
    let openingViewOffsetX = 0
    let closingViewOffsetX = 0

    // Automatic Sequential Presentation Controller (01 -> 02 -> ... -> 08 -> STOP)
    const playback = {
      phase: 'pause', // 'pause' | 'transition' | 'stopped'
      timer: 0,
      currentIndex: 0,
      fromPos: 0,
      toPos: 0
    }

    // Touch Swipe Navigation Tracker (Mobile Only)
    const touchTracker = {
      active: false,
      startX: 0,
      startY: 0,
      isHorizontal: false
    }

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

    // =========================================================================
    // SHARED GEOMETRIES & MATERIALS (MAX PERFORMANCE VIA REUSE)
    // =========================================================================
    const sharedGeoms = {
      plaque: new RoundedBoxGeometry(0.96, 1.48, 0.05, 2, 0.015),
      base: new RoundedBoxGeometry(0.72, 0.08, 0.32, 2, 0.01),
      facePlane: new THREE.PlaneGeometry(0.92, 1.38),
      shadowPlane: new THREE.PlaneGeometry(1.2, 0.6),
      hitBox: new THREE.BoxGeometry(1.05, 1.55, 0.45)
    }

    // Soft procedural contact shadow texture (shared across all plaques)
    function createContactShadowTexture() {
      const cvs = document.createElement('canvas')
      cvs.width = 128
      cvs.height = 64
      const ctx = cvs.getContext('2d')
      const grad = ctx.createRadialGradient(64, 32, 4, 64, 32, 60)
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.75)')
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.28)')
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
        roughness: 0.5,
        metalness: 0.7
      }),
      darkMetalBody: new THREE.MeshStandardMaterial({
        color: 0x090e1a,
        roughness: 0.55,
        metalness: 0.7
      }),
      shadow: new THREE.MeshBasicMaterial({
        map: sharedShadowTexture,
        transparent: true,
        opacity: 0.55,
        depthWrite: false
      }),
      hit: new THREE.MeshBasicMaterial({ visible: false })
    }

    // =========================================================================
    // HIGH-DEFINITION PROCEDURAL CANVAS TEXTURE FOR AWARD PLAQUE FACES
    // 1024x1536 Crisp HD Resolution · Anisotropic Filtering · Pre-rendered ONCE
    // =========================================================================
    function makeAwardFaceTexture(item, currentRenderer) {
      const cvs = document.createElement('canvas')
      cvs.width = 1024
      cvs.height = 1536
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
      ctx.lineWidth = 1.5
      for (let x = 0; x < w; x += 52) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
      }
      for (let y = 0; y < h; y += 52) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
      }

      // Outer boundary matching award foil accent
      ctx.strokeStyle = item.foil
      ctx.lineWidth = 4
      ctx.strokeRect(44, 44, w - 88, h - 88)

      // Thin inner inset
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)'
      ctx.lineWidth = 2
      ctx.strokeRect(58, 58, w - 116, h - 116)

      // Cyber corner brackets
      const cLen = 40
      ctx.strokeStyle = item.foil
      ctx.lineWidth = 6
      // TL
      ctx.beginPath(); ctx.moveTo(44, 44 + cLen); ctx.lineTo(44, 44); ctx.lineTo(44 + cLen, 44); ctx.stroke()
      // TR
      ctx.beginPath(); ctx.moveTo(w - 44 - cLen, 44); ctx.lineTo(w - 44, 44); ctx.lineTo(w - 44, 44 + cLen); ctx.stroke()
      // BL
      ctx.beginPath(); ctx.moveTo(44, h - 44 - cLen); ctx.lineTo(44, h - 44); ctx.lineTo(44 + cLen, h - 44); ctx.stroke()
      // BR
      ctx.beginPath(); ctx.moveTo(w - 44 - cLen, h - 44); ctx.lineTo(w - 44, h - 44); ctx.lineTo(w - 44, h - 44 - cLen); ctx.stroke()

      // Header Brand
      ctx.fillStyle = item.foil
      ctx.font = '700 24px monospace'
      ctx.textAlign = 'left'
      ctx.fillText('CYPhER CLUB', 76, 115)

      ctx.fillStyle = 'rgba(148, 163, 184, 0.95)'
      ctx.font = '600 22px monospace'
      ctx.textAlign = 'right'
      ctx.fillText(`ACH // 0${item.number}`, w - 76, 115)

      ctx.strokeStyle = 'rgba(0, 229, 255, 0.22)'
      ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(76, 140); ctx.lineTo(w - 76, 140); ctx.stroke()

      // Central Category Icon & Emblem Plate
      const cx = w / 2
      const cy = 370

      // Emblem plate
      ctx.fillStyle = 'rgba(10, 20, 38, 0.75)'
      ctx.beginPath(); ctx.arc(cx, cy, 115, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = item.foil
      ctx.lineWidth = 3.5
      ctx.stroke()

      // Outer dashed tech ring
      ctx.setLineDash([8, 10])
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)'
      ctx.beginPath(); ctx.arc(cx, cy, 134, 0, Math.PI * 2); ctx.stroke()
      ctx.setLineDash([])

      // Category Abstract Vector Icon
      ctx.strokeStyle = item.foil
      ctx.fillStyle = item.foil
      ctx.lineWidth = 4.5
      ctx.textAlign = 'center'

      if (item.category === 'Hackathon') {
        ctx.strokeRect(cx - 44, cy - 44, 88, 88)
        ctx.fillRect(cx - 18, cy - 18, 36, 36)
        ctx.beginPath()
        ctx.moveTo(cx - 44, cy); ctx.lineTo(cx - 68, cy)
        ctx.moveTo(cx + 44, cy); ctx.lineTo(cx + 68, cy)
        ctx.moveTo(cx, cy - 44); ctx.lineTo(cx, cy - 68)
        ctx.moveTo(cx, cy + 44); ctx.lineTo(cx, cy + 68)
        ctx.stroke()
      } else if (item.category === 'Competition') {
        ctx.beginPath()
        ctx.moveTo(cx - 52, cy + 36); ctx.lineTo(cx - 18, cy - 32); ctx.lineTo(cx + 18, cy + 14); ctx.lineTo(cx + 52, cy - 44)
        ctx.stroke()
        for (let p of [[-52, 36], [-18, -32], [18, 14], [52, -44]]) {
          ctx.beginPath(); ctx.arc(cx + p[0], cy + p[1], 7, 0, Math.PI * 2); ctx.fill()
        }
      } else if (item.category === 'Projects') {
        ctx.strokeRect(cx - 52, cy - 44, 46, 38)
        ctx.strokeRect(cx + 6, cy - 44, 46, 38)
        ctx.strokeRect(cx - 52, cy + 6, 104, 38)
      } else if (item.category === 'Workshop') {
        ctx.strokeRect(cx - 54, cy - 42, 108, 84)
        ctx.font = '700 30px monospace'
        ctx.fillText('>_ CLI', cx, cy + 10)
      } else if (item.category === 'Coding') {
        ctx.font = '700 68px monospace'
        ctx.fillText('{  }', cx, cy + 22)
      } else if (item.category === 'Innovation') {
        const npts = [[0, -42], [-42, 26], [42, 26], [0, 10]]
        ctx.beginPath()
        ctx.moveTo(cx + npts[0][0], cy + npts[0][1]); ctx.lineTo(cx + npts[1][0], cy + npts[1][1])
        ctx.moveTo(cx + npts[0][0], cy + npts[0][1]); ctx.lineTo(cx + npts[2][0], cy + npts[2][1])
        ctx.moveTo(cx + npts[1][0], cy + npts[1][1]); ctx.lineTo(cx + npts[3][0], cy + npts[3][1])
        ctx.moveTo(cx + npts[2][0], cy + npts[2][1]); ctx.lineTo(cx + npts[3][0], cy + npts[3][1])
        ctx.stroke()
        npts.forEach(([nx, ny]) => {
          ctx.beginPath(); ctx.arc(cx + nx, cy + ny, 9, 0, Math.PI * 2); ctx.fill()
        })
      } else if (item.category === 'Community') {
        for (let a = 0; a < 6; a++) {
          const rad = (a * Math.PI) / 3
          const px = cx + Math.cos(rad) * 48
          const py = cy + Math.sin(rad) * 48
          ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2); ctx.fill()
          ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke()
        }
        ctx.beginPath(); ctx.arc(cx, cy, 11, 0, Math.PI * 2); ctx.fill()
      } else {
        ctx.strokeRect(cx - 34, cy - 44, 68, 60)
        ctx.beginPath(); ctx.moveTo(cx - 34, cy + 16); ctx.lineTo(cx, cy + 42); ctx.lineTo(cx + 34, cy + 16); ctx.stroke()
        ctx.beginPath(); ctx.arc(cx, cy - 14, 15, 0, Math.PI * 2); ctx.fill()
      }

      // Achievement Title
      ctx.fillStyle = '#FFFFFF'
      ctx.font = '800 46px sans-serif'
      ctx.textAlign = 'center'
      const titleWords = item.title.toUpperCase().split(' ')
      if (titleWords.length > 2) {
        ctx.fillText(titleWords.slice(0, 2).join(' '), cx, 580)
        ctx.fillText(titleWords.slice(2).join(' '), cx, 634)
      } else {
        ctx.fillText(item.title.toUpperCase(), cx, 600)
      }

      // Category Pill & Year
      ctx.fillStyle = item.foil
      ctx.font = '700 26px monospace'
      ctx.fillText(`${item.category.toUpperCase()} · 2026`, cx, 710)

      // Description text
      ctx.fillStyle = '#CBD5E1'
      ctx.font = '400 24px sans-serif'
      const descWords = item.description.split(' ')
      let line = ''
      let ly = 780
      for (let i = 0; i < descWords.length; i++) {
        const testLine = line + descWords[i] + ' '
        if (ctx.measureText(testLine).width > w - 160 && i > 0) {
          ctx.fillText(line, cx, ly)
          line = descWords[i] + ' '
          ly += 36
        } else {
          line = testLine
        }
      }
      ctx.fillText(line, cx, ly)

      // Attribution
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.font = '600 24px monospace'
      ctx.fillText('TEAM: CYPHER CLUB', cx, 1260)

      // Verified footer seal
      ctx.fillStyle = 'rgba(0, 229, 255, 0.12)'
      ctx.fillRect(cx - 200, 1330, 400, 56)
      ctx.strokeStyle = item.foil
      ctx.lineWidth = 2.5
      ctx.strokeRect(cx - 200, 1330, 400, 56)
      ctx.fillStyle = item.foil
      ctx.font = '700 20px monospace'
      ctx.fillText('AUTHENTICATED // 2026', cx, 1366)

      const tex = new THREE.CanvasTexture(cvs)
      tex.colorSpace = THREE.SRGBColorSpace
      tex.minFilter = THREE.LinearMipmapLinearFilter
      tex.magFilter = THREE.LinearFilter
      tex.generateMipmaps = true
      if (currentRenderer) {
        tex.anisotropy = currentRenderer.capabilities.getMaxAnisotropy()
      }
      tex.needsUpdate = true
      return tex
    }

    // =========================================================================
    // COMPACT 3D TROPHY / AWARD PLAQUE RIG
    // STRICT FINITE LINEAR LAYOUT — NO WRAPPING / NO DUPLICATES
    // =========================================================================
    function createAwardRig(item, index, currentRenderer) {
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

      // Plaque back body (rounded dark titanium housing)
      const plaqueBody = new THREE.Mesh(sharedGeoms.plaque, sharedMaterials.darkMetalBody)
      plaqueBody.position.set(0, 0, 0)
      motion.add(plaqueBody)

      // Faceplate with custom HD CanvasTexture (Satin-finish, zero specular glare)
      const faceTexture = makeAwardFaceTexture(item, currentRenderer)
      const faceMat = new THREE.MeshStandardMaterial({
        map: faceTexture,
        roughness: 0.52,
        metalness: 0.12
      })

      // Single crisp face mesh sitting squarely in the frame
      const faceMesh = new THREE.Mesh(sharedGeoms.facePlane, faceMat)
      faceMesh.position.set(0, 0, 0.0265)
      motion.add(faceMesh)

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
        faceMat,
        faceTexture,
        hit
      }
    }

    // =========================================================================
    // ROOM & BALANCED STUDIO LIGHTS
    // =========================================================================
    function addRoom() {
      // Dark ground plane
      const floorGeom = new THREE.PlaneGeometry(36, 24)
      const floorMat = new THREE.MeshStandardMaterial({
        color: 0x05070b,
        roughness: 0.45,
        metalness: 0.3
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

      // Subtle cyan accent line along rail edge
      const ledGeom = new THREE.BoxGeometry(20.02, 0.02, 0.02)
      const ledMat = new THREE.MeshBasicMaterial({ color: 0x00b4d8 })
      const ledStrip = new THREE.Mesh(ledGeom, ledMat)
      ledStrip.position.set(0, 0.37, 0.43)
      shelfStage.add(ledStrip)
    }

    function addLights() {
      const hemi = new THREE.HemisphereLight(0x1e293b, 0x070b14, 0.55)
      scene.add(hemi)

      const keyLight = new THREE.DirectionalLight(0xffffff, 0.65)
      keyLight.position.set(-2, 5, 4.5)
      scene.add(keyLight)

      const fillLight = new THREE.DirectionalLight(0x94a3b8, 0.3)
      fillLight.position.set(3, 3.5, 3)
      scene.add(fillLight)

      const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.18)
      rimLight.position.set(0, 4, -3)
      scene.add(rimLight)
    }

    function addDust() {
      const count = 35
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
        size: 0.03,
        transparent: true,
        opacity: 0.3
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
    // NAVIGATION CONTROLLER: MANUAL SELECTION & TOUCH SWIPES
    // =========================================================================
    function selectItem(idx) {
      if (currentMode !== 'hero') return
      const targetIdx = clamp(idx, 0, ITEM_COUNT - 1)
      if (targetIdx === playback.currentIndex && playback.phase === 'pause') return

      playback.phase = 'transition'
      playback.timer = 0
      playback.fromPos = position
      playback.toPos = targetIdx
      playback.currentIndex = targetIdx
      setSelectedIndex(targetIdx)
    }

    // =========================================================================
    // AWARD PRESENTATION / INSPECT MODE
    // =========================================================================
    function openDetail() {
      if (currentMode !== 'hero') return
      currentMode = 'opening'
      setMode('opening')
      transitionTime = 0

      // Pause playback while inspecting
      playback.phase = 'pause'
      playback.timer = 0

      activeAward = awardRigs[playback.currentIndex]

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

      position = playback.currentIndex
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

      // Resume 2-second pause from this award, then continue auto-playback
      playback.phase = 'pause'
      playback.timer = 0
    }

    threeActionsRef.current = {
      openDetail,
      closeDetail,
      selectItem
    }

    // =========================================================================
    // EVENT LISTENERS: HOVER ONLY (ZERO MOUSE SLIDING, ZERO VERTICAL SCROLL HIJACK)
    // =========================================================================
    function onPointerMove(e) {
      if (isPageScrolling) return

      const rect = canvas.getBoundingClientRect()
      pointer.clientX = e.clientX
      pointer.clientY = e.clientY
      pointer.ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      pointer.ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      // Touch gesture intent detection on mobile only
      if (e.pointerType === 'touch' && currentMode === 'hero' && touchTracker.active) {
        const deltaX = e.clientX - touchTracker.startX
        const deltaY = e.clientY - touchTracker.startY

        if (!touchTracker.isHorizontal) {
          if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) {
            touchTracker.active = false
            return
          }
          if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
            touchTracker.isHorizontal = true
          }
        }
        return
      }

      // Raycast detection for subtle visual hover highlight & tooltip (NO SLIDING!)
      if (currentMode === 'hero') {
        raycaster.setFromCamera(pointer.ndc, camera)
        const hitMeshes = awardRigs.map((r) => r.hit)
        const intersects = raycaster.intersectObjects(hitMeshes, false)

        if (intersects.length > 0) {
          const hitMesh = intersects[0].object
          const found = awardRigs.find((r) => r.hit === hitMesh)
          if (found) {
            canvas.style.cursor = 'pointer'
            if (hoveredIndex !== found.index) {
              hoveredIndex = found.index
              setHoveredIdx(found.index)
              setHoverTitle(found.data.title)
            }
            if (tooltip) {
              tooltip.style.transform = `translate3d(${e.clientX - rect.left + 16}px, ${e.clientY - rect.top + 18}px, 0)`
              tooltip.style.opacity = '1'
              tooltip.style.visibility = 'visible'
            }
            return
          }
        }
        canvas.style.cursor = 'default'
        if (hoveredIndex !== -1) {
          hoveredIndex = -1
          setHoveredIdx(-1)
        }
        if (tooltip) {
          tooltip.style.opacity = '0'
          tooltip.style.visibility = 'hidden'
        }
      }
    }

    function onPointerDown(e) {
      if (e.pointerType === 'touch' && currentMode === 'hero') {
        touchTracker.active = true
        touchTracker.startX = e.clientX
        touchTracker.startY = e.clientY
        touchTracker.isHorizontal = false
      }
    }

    function onPointerUp(e) {
      if (e.pointerType === 'touch' && currentMode === 'hero' && touchTracker.active) {
        if (touchTracker.isHorizontal) {
          const totalDeltaX = e.clientX - touchTracker.startX
          if (totalDeltaX < -32) {
            // Mobile Swipe Left -> request next award
            if (playback.currentIndex < ITEM_COUNT - 1) {
              selectItem(playback.currentIndex + 1)
            }
          } else if (totalDeltaX > 32) {
            // Mobile Swipe Right -> request previous award
            if (playback.currentIndex > 0) {
              selectItem(playback.currentIndex - 1)
            }
          }
        }
        touchTracker.active = false
        touchTracker.isHorizontal = false
      }
    }

    function onPointerLeave() {
      if (hoveredIndex !== -1) {
        hoveredIndex = -1
        setHoveredIdx(-1)
      }
      if (tooltip) {
        tooltip.style.opacity = '0'
        tooltip.style.visibility = 'hidden'
      }
      canvas.style.cursor = 'default'
    }

    function onCanvasClick() {
      if (touchTracker.isHorizontal) return
      if (currentMode === 'hero') {
        if (hoveredIndex !== -1) {
          if (hoveredIndex === playback.currentIndex) {
            openDetail()
          } else {
            selectItem(hoveredIndex)
          }
        }
      }
    }

    // When the window scrolls vertically, awards stay completely stable
    function onWindowScroll() {
      touchTracker.active = false
      touchTracker.isHorizontal = false

      isPageScrolling = true
      if (scrollEndTimer) clearTimeout(scrollEndTimer)
      scrollEndTimer = setTimeout(() => {
        isPageScrolling = false
      }, 140)

      if (hoveredIndex !== -1) {
        hoveredIndex = -1
        setHoveredIdx(-1)
      }
      if (tooltip) {
        tooltip.style.opacity = '0'
        tooltip.style.visibility = 'hidden'
      }
    }

    function onKeyDown(e) {
      if (e.key === 'Escape' && currentMode === 'detail') {
        closeDetail()
      } else if (currentMode === 'hero') {
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          if (playback.currentIndex > 0) selectItem(playback.currentIndex - 1)
        } else if (e.key === 'ArrowRight') {
          e.preventDefault()
          if (playback.currentIndex < ITEM_COUNT - 1) selectItem(playback.currentIndex + 1)
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          openDetail()
        }
      }
    }

    function resize() {
      if (!root || !canvas || isDisposed || !renderer) return
      viewWidth = Math.max(1, root.clientWidth)
      viewHeight = Math.max(1, root.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.setSize(viewWidth, viewHeight, false)
      camera.aspect = viewWidth / viewHeight
      configureResponsiveTargets()
      applyDetailViewOffset()
      camera.updateProjectionMatrix()
    }

    // Resize observer ensures crisp buffer scaling whenever container dimensions change
    const resizeObserver = new ResizeObserver(() => {
      resize()
    })
    resizeObserver.observe(root)

    // Intersection observer pauses rendering & auto-playback when off-screen
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

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(viewWidth, viewHeight, false)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.92
    renderer.setClearColor(0x05070b, 1)

    scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x05070b, 0.02)

    const pmrem = new THREE.PMREMGenerator(renderer)
    environmentTarget = pmrem.fromScene(new RoomEnvironment(), 0.04)
    scene.environment = environmentTarget.texture
    scene.environmentIntensity = 0.22
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
    controls.enableZoom = false
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

    // Strict finite linear award placement: Award 0 at x=0, up to Award 7
    awardRigs = ITEMS.map((item, index) => {
      const rig = createAwardRig(item, index, renderer)
      shelfStage.add(rig.root)

      const offset = index - position
      const distance = Math.abs(offset)
      const focus = 1 - clamp(distance, 0, 1)

      const targetX = offset * spacing
      const targetY = shelfBoardTop + 0.74 + focus * 0.04
      const targetZ = 0.12 + focus * 0.04 - Math.min(distance, 2.5) * 0.03
      const targetRotY = -offset * 0.05
      const targetRotZ = -offset * 0.008
      const targetScale = 1 + focus * 0.025

      rig.root.position.set(targetX, targetY, targetZ)
      rig.root.rotation.set(0, targetRotY, targetRotZ)
      rig.root.scale.setScalar(targetScale)
      rig.root.visible = distance <= 3.2

      return rig
    })

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('scroll', onWindowScroll, { passive: true })
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('pointerleave', onPointerLeave)
    canvas.addEventListener('click', onCanvasClick)

    // Ultra-smooth 60 FPS frame loop
    function frame(time) {
      if (isDisposed) return
      animationFrameId = requestAnimationFrame(frame)

      if (!isVisible) return

      const delta = Math.min((time - lastTime) / 1000, 0.05)
      const elapsed = time / 1000
      lastTime = time

      // AUTOMATIC PROGRESSION: 2s PAUSE -> 3s TRANSITION -> NEXT -> STOP AT 08
      if (currentMode === 'hero' && isVisible && !isPageScrolling) {
        if (playback.phase === 'pause') {
          playback.timer += delta
          if (playback.timer >= PAUSE_DURATION) {
            if (playback.currentIndex < ITEM_COUNT - 1) {
              const nextIndex = playback.currentIndex + 1
              playback.phase = 'transition'
              playback.timer = 0
              playback.fromPos = position
              playback.toPos = nextIndex
              playback.currentIndex = nextIndex
              setSelectedIndex(nextIndex)
            } else {
              // Reached final award 08: STOP automatic playback!
              playback.phase = 'stopped'
            }
          }
        } else if (playback.phase === 'transition') {
          playback.timer += delta
          const duration = reducedMotion ? 0.05 : TRANSITION_DURATION
          const progress = clamp(playback.timer / duration, 0, 1)
          const eased = smootherstep(progress)
          position = lerp(playback.fromPos, playback.toPos, eased)

          if (progress >= 1) {
            position = playback.toPos
            if (playback.currentIndex < ITEM_COUNT - 1) {
              // Once transition arrives, pause for 2 seconds before moving to next award
              playback.phase = 'pause'
              playback.timer = 0
            } else {
              // Reached final award 08: STOP automatic playback!
              playback.phase = 'stopped'
              playback.timer = 0
            }
          }
        }
      }

      // Update 3D Award Plaques along shelf (Strict finite layout, NO looping)
      awardRigs.forEach((rig, index) => {
        if (rig.root.parent !== shelfStage) return

        const offset = index - position
        const distance = Math.abs(offset)

        // Culling: off-camera awards are hidden so they never render
        if (distance > 3.2) {
          rig.root.visible = false
          return
        }
        rig.root.visible = true

        const focus = 1 - clamp(distance, 0, 1)

        const targetX = offset * spacing
        const targetY = shelfBoardTop + 0.74 + focus * 0.04
        const targetZ = 0.12 + focus * 0.04 - Math.min(distance, 2.5) * 0.03
        const targetRotY = -offset * 0.05
        const targetRotZ = -offset * 0.008
        const targetScale = 1 + focus * 0.025

        rig.root.position.set(targetX, targetY, targetZ)
        rig.root.rotation.set(0, targetRotY, targetRotZ)
        rig.root.scale.setScalar(targetScale)

        // Controlled, subtle hover elevation and tilt (disabled while page is scrolling)
        const isHov = hoveredIndex === index && currentMode === 'hero' && !isPageScrolling
        const hovElevation = isHov && !reducedMotion ? 0.04 : 0
        const hovTilt = isHov && !reducedMotion ? -0.03 : 0
        rig.motion.position.y = damp(rig.motion.position.y, hovElevation, 12, delta)
        rig.motion.rotation.x = damp(rig.motion.rotation.x, hovTilt, 12, delta)
      })

      // Presentation mode transitions
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

      // Gentle ambient dust drift
      if (dustParticles) {
        dustParticles.rotation.y = elapsed * 0.015
      }

      renderer.render(scene, camera)
    }

    animationFrameId = requestAnimationFrame(frame)

    // Complete deterministic clean-up
    return () => {
      isDisposed = true
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      if (scrollEndTimer) clearTimeout(scrollEndTimer)
      observer.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('scroll', onWindowScroll)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointerleave', onPointerLeave)
      canvas.removeEventListener('click', onCanvasClick)

      // Dispose textures, geometries, materials
      sharedShadowTexture.dispose()
      Object.values(sharedGeoms).forEach((g) => g.dispose())
      Object.values(sharedMaterials).forEach((m) => m.dispose())
      awardRigs.forEach((rig) => {
        rig.faceTexture.dispose()
        rig.faceMat.dispose()
      })

      if (environmentTarget) environmentTarget.dispose()
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

      {/* 3D WebGL Canvas Shell & Award Slider */}
      <div className="cypher-scene-shell">
        <canvas
          ref={canvasRef}
          className={`cypher-webgl-canvas ${mode === 'detail' ? 'is-inspecting' : ''}`}
          aria-label="Interactive 3D Achievements Catalogue"
        />

        {/* Navigation Arrows directly beside the 3D Award Catalogue */}
        <div
          className="cypher-stage-navigation"
          style={{
            opacity: mode === 'hero' ? 1 : 0,
            pointerEvents: mode === 'hero' ? 'auto' : 'none'
          }}
          aria-label="Award Slider Navigation"
        >
          <button
            onClick={() => {
              if (selectedIndex > 0) {
                threeActionsRef.current.selectItem?.(selectedIndex - 1)
              }
            }}
            disabled={selectedIndex <= 0}
            className="cypher-stage-arrow cypher-stage-arrow-prev"
            type="button"
            title="Previous Award (←)"
            aria-label="Previous Achievement"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={() => {
              if (selectedIndex < achievementsData.length - 1) {
                threeActionsRef.current.selectItem?.(selectedIndex + 1)
              }
            }}
            disabled={selectedIndex >= achievementsData.length - 1}
            className="cypher-stage-arrow cypher-stage-arrow-next"
            type="button"
            title="Next Award (→)"
            aria-label="Next Achievement"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dynamic Cursor Tooltip */}
      <div
        ref={tooltipRef}
        className="cypher-pointer-label"
        style={{ opacity: 0, visibility: 'hidden' }}
        aria-hidden={hoveredIdx === -1 || mode !== 'hero'}
      >
        <span className="cypher-pointer-label-idx">CYPHER // 0{hoveredIdx + 1}</span>
        <strong className="cypher-pointer-label-title">{hoverTitle}</strong>
      </div>

      {/* Bottom Horizontal Catalogue Navigation: 01 / 08 & Standalone Inspect Award Button */}
      <nav
        className="cypher-browse-ui"
        aria-label="Achievement Navigation"
        style={{
          opacity: mode === 'hero' ? 1 : 0,
          transform: mode === 'hero' ? 'translateY(0)' : 'translateY(14px)',
          pointerEvents: mode === 'hero' ? 'auto' : 'none'
        }}
      >
        <div className="cypher-browse-central">
          {/* Dynamic Counter Badge: 01 / 08 */}
          <div className="cypher-counter-badge" aria-live="polite">
            <span className="cypher-counter-current">
              {String(selectedIndex + 1).padStart(2, '0')}
            </span>
            <span className="cypher-counter-divider">/</span>
            <span className="cypher-counter-total">
              {String(achievementsData.length).padStart(2, '0')}
            </span>
          </div>

          {/* Active Selection Details */}
          <div className="cypher-selection-copy">
            <h3 className="cypher-selection-title">{selectedAchievement.title}</h3>
            <p className="cypher-selection-note">{selectedAchievement.category} · {selectedAchievement.year}</p>
          </div>

          {/* Standalone Clean Inspect Award Button — NO ARROWS BESIDE OR INSIDE */}
          <button
            onClick={() => threeActionsRef.current.openDetail?.()}
            className="cypher-open-btn"
            type="button"
          >
            Inspect Award
          </button>

          {/* Marker Indicator Pills */}
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

        {/* Action Buttons */}
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
          Drag in 3D to rotate plaque · 360° orbital preview
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

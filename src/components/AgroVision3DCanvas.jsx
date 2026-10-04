import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/**
 * AgroVision3DCanvas
 * 
 * Interactive WebGL 3D Agricultural AI Showcase.
 * Features a central floating organic holographic leaf/plant, 
 * multi-tier rotating cyber scanner rings, laser sweep plane,
 * 3D bounding box reticle, bio-luminescent particle cloud,
 * and mouse/touch parallax interaction.
 */
export default function AgroVision3DCanvas({ className = '', onScanUpdate }) {
  const containerRef = useRef(null)
  const [isInteracting, setIsInteracting] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let width = container.clientWidth || 600
    let height = container.clientHeight || 500

    // 1. SCENE SETUP
    const scene = new THREE.Scene()

    // 2. CAMERA SETUP
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(0, 0, 7.8)

    // 3. RENDERER SETUP
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)
    } catch (e) {
      console.error('WebGL not supported', e)
      return
    }

    // 4. LIGHTING
    const ambientLight = new THREE.AmbientLight(0x064e3b, 1.2)
    scene.add(ambientLight)

    const cyanLight = new THREE.PointLight(0x22d3ee, 3.5, 18)
    cyanLight.position.set(3, 4, 4)
    scene.add(cyanLight)

    const emeraldLight = new THREE.PointLight(0x10b981, 3.0, 16)
    emeraldLight.position.set(-3, -3, 3)
    scene.add(emeraldLight)

    const rimLight = new THREE.DirectionalLight(0x34d399, 1.8)
    rimLight.position.set(0, 5, -4)
    scene.add(rimLight)

    // 5. MASTER GROUP (Affected by mouse rotation & float)
    const masterGroup = new THREE.Group()
    scene.add(masterGroup)

    // Subgroup for the plant (so it can rotate independently of scanner)
    const plantGroup = new THREE.Group()
    masterGroup.add(plantGroup)

    // ---------------------------------------------------------------
    // HELPER: BUILD A CURVED 3D LEAF GEOMETRY
    // ---------------------------------------------------------------
    const createLeafGeometry = (scaleX = 1.0, scaleY = 1.0, curveZ = 0.3) => {
      const uSegs = 28
      const vSegs = 20
      const positions = []
      const normals = []
      const uvs = []
      const indices = []

      for (let i = 0; i <= uSegs; i++) {
        const u = i / uSegs // 0 (stem base) to 1 (leaf tip)
        // Natural leaf width profile: peaks around u = 0.45
        const widthFactor = Math.sin(u * Math.PI) * Math.pow(1 - 0.15 * u, 1.2) * scaleX

        // Central vein curvature
        const spineZ = Math.sin(u * Math.PI) * curveZ - Math.pow(u, 2) * 0.25

        for (let j = 0; j <= vSegs; j++) {
          const v = (j / vSegs) * 2 - 1 // -1 (left margin) to +1 (right margin)
          const x = v * widthFactor * 0.85
          const y = (u - 0.5) * 2.8 * scaleY
          // Cross-sectional camber: leaf folds slightly along central vein
          const z = spineZ - Math.abs(v) * 0.12 * widthFactor

          positions.push(x, y, z)
          normals.push(0, 0, 1)
          uvs.push(v * 0.5 + 0.5, u)
        }
      }

      for (let i = 0; i < uSegs; i++) {
        for (let j = 0; j < vSegs; j++) {
          const a = i * (vSegs + 1) + j
          const b = (i + 1) * (vSegs + 1) + j
          const c = (i + 1) * (vSegs + 1) + (j + 1)
          const d = i * (vSegs + 1) + (j + 1)

          indices.push(a, b, d)
          indices.push(b, c, d)
        }
      }

      const geom = new THREE.BufferGeometry()
      geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
      geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
      geom.setIndex(indices)
      geom.computeVertexNormals()
      return geom
    }

    // Leaf Materials
    // 1. Organic holographic leaf surface
    const leafMaterial = new THREE.MeshStandardMaterial({
      color: 0x064e3b,
      emissive: 0x022c22,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide
    })

    // 2. Cyber wireframe lattice overlay
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    })

    // ---------------------------------------------------------------
    // MAIN LEAF MESH
    // ---------------------------------------------------------------
    const mainLeafGeom = createLeafGeometry(1.2, 1.15, 0.4)
    const mainLeaf = new THREE.Mesh(mainLeafGeom, leafMaterial)
    const mainWire = new THREE.Mesh(mainLeafGeom, wireframeMaterial)
    mainLeaf.add(mainWire)
    plantGroup.add(mainLeaf)

    // Secondary side leaves for organic depth
    const leftLeafGeom = createLeafGeometry(0.7, 0.8, 0.25)
    const leftLeaf = new THREE.Mesh(leftLeafGeom, leafMaterial)
    const leftWire = new THREE.Mesh(leftLeafGeom, wireframeMaterial)
    leftLeaf.add(leftWire)
    leftLeaf.position.set(-0.75, -0.6, 0.15)
    leftLeaf.rotation.set(0.2, 0.5, -0.65)
    plantGroup.add(leftLeaf)

    const rightLeafGeom = createLeafGeometry(0.75, 0.85, 0.25)
    const rightLeaf = new THREE.Mesh(rightLeafGeom, leafMaterial)
    const rightWire = new THREE.Mesh(rightLeafGeom, wireframeMaterial)
    rightLeaf.add(rightWire)
    rightLeaf.position.set(0.7, -0.5, -0.1)
    rightLeaf.rotation.set(-0.15, -0.5, 0.6)
    plantGroup.add(rightLeaf)

    // Central Stem
    const stemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -1.8, -0.2),
      new THREE.Vector3(0, -1.0, -0.1),
      new THREE.Vector3(0, 0.2, 0.05),
      new THREE.Vector3(0, 1.2, 0.15)
    ])
    const stemGeom = new THREE.TubeGeometry(stemCurve, 32, 0.035, 12, false)
    const stemMaterial = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.8,
      roughness: 0.4
    })
    const stem = new THREE.Mesh(stemGeom, stemMaterial)
    plantGroup.add(stem)

    // ---------------------------------------------------------------
    // GLOWING LEAF VEIN LINES
    // ---------------------------------------------------------------
    const veinPositions = [
      // Central main vein
      0, -1.4, -0.15,   0, 1.2, 0.12,
      // Lateral branching veins
      0, -0.8, -0.08,   -0.5, -0.5, -0.12,
      0, -0.8, -0.08,    0.5, -0.5, -0.12,
      0, -0.4, -0.02,   -0.75, -0.1, -0.1,
      0, -0.4, -0.02,    0.75, -0.1, -0.1,
      0, 0.1, 0.06,     -0.7, 0.45, -0.08,
      0, 0.1, 0.06,      0.7, 0.45, -0.08,
      0, 0.6, 0.1,      -0.45, 0.85, -0.04,
      0, 0.6, 0.1,       0.45, 0.85, -0.04
    ]
    const veinGeom = new THREE.BufferGeometry()
    veinGeom.setAttribute('position', new THREE.Float32BufferAttribute(veinPositions, 3))
    const veinMaterial = new THREE.LineBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.9,
      linewidth: 2
    })
    const veinLines = new THREE.LineSegments(veinGeom, veinMaterial)
    plantGroup.add(veinLines)

    // ---------------------------------------------------------------
    // DISEASE INSPECTION TARGET NODES ON LEAF
    // ---------------------------------------------------------------
    const targetNodes = [
      { pos: new THREE.Vector3(0.42, 0.35, 0.05), label: 'Node 01: Folium A', status: 'HEALTHY' },
      { pos: new THREE.Vector3(-0.38, -0.25, 0.02), label: 'Node 02: Folium B', status: 'HEALTHY' },
      { pos: new THREE.Vector3(0.15, -0.85, -0.05), label: 'Node 03: Stem Junction', status: 'OPTIMAL' }
    ]

    const nodeGroup = new THREE.Group()
    plantGroup.add(nodeGroup)

    targetNodes.forEach((node) => {
      // Glowing sphere node
      const sphereGeom = new THREE.SphereGeometry(0.045, 16, 16)
      const sphereMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee })
      const sphere = new THREE.Mesh(sphereGeom, sphereMat)
      sphere.position.copy(node.pos)
      nodeGroup.add(sphere)

      // Pulsing outer halo ring
      const ringGeom = new THREE.RingGeometry(0.07, 0.09, 24)
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x34d399,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75
      })
      const ring = new THREE.Mesh(ringGeom, ringMat)
      ring.position.copy(node.pos)
      nodeGroup.add(ring)
    })

    // ---------------------------------------------------------------
    // 6. FUTURISTIC AI SCANNER SYSTEM (Independent rotation)
    // ---------------------------------------------------------------
    const scannerGroup = new THREE.Group()
    masterGroup.add(scannerGroup)

    // RING 1: Outer Cyan Segmented Ring
    const ring1Geom = new THREE.TorusGeometry(2.5, 0.015, 16, 100)
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.65
    })
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat)
    ring1.rotation.x = Math.PI / 3.2
    ring1.rotation.y = Math.PI / 8
    scannerGroup.add(ring1)

    // RING 2: Emerald Green Radar Reticle Ring
    const ring2Geom = new THREE.TorusGeometry(2.0, 0.012, 16, 80)
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.75
    })
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat)
    ring2.rotation.x = -Math.PI / 4
    ring2.rotation.z = Math.PI / 6
    scannerGroup.add(ring2)

    // RING 3: Fast-spinning tilted data ring with orbiters
    const ring3Geom = new THREE.TorusGeometry(1.6, 0.008, 12, 60)
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0xa7f3d0,
      transparent: true,
      opacity: 0.5
    })
    const ring3 = new THREE.Mesh(ring3Geom, ring3Mat)
    ring3.rotation.x = Math.PI / 2
    scannerGroup.add(ring3)

    // Satellites on Ring 3
    const satelliteCount = 3
    const satellites = []
    for (let i = 0; i < satelliteCount; i++) {
      const satGeom = new THREE.BoxGeometry(0.05, 0.05, 0.05)
      const satMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee })
      const sat = new THREE.Mesh(satGeom, satMat)
      ring3.add(sat)
      satellites.push(sat)
    }

    // ---------------------------------------------------------------
    // 7. HORIZONTAL LASER SWEEP PLANE
    // ---------------------------------------------------------------
    const sweepGroup = new THREE.Group()
    scannerGroup.add(sweepGroup)

    const laserLineGeom = new THREE.BufferGeometry()
    laserLineGeom.setAttribute('position', new THREE.Float32BufferAttribute([
      -1.8, 0, 0,
       1.8, 0, 0
    ], 3))
    const laserLineMat = new THREE.LineBasicMaterial({
      color: 0x22d3ee,
      linewidth: 3,
      transparent: true,
      opacity: 0.95
    })
    const laserLine = new THREE.Line(laserLineGeom, laserLineMat)
    sweepGroup.add(laserLine)

    // Translucent laser fan/sweep disc
    const sweepDiscGeom = new THREE.RingGeometry(0.01, 1.8, 32)
    const sweepDiscMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide
    })
    const sweepDisc = new THREE.Mesh(sweepDiscGeom, sweepDiscMat)
    sweepDisc.rotation.x = Math.PI / 2
    sweepGroup.add(sweepDisc)

    // ---------------------------------------------------------------
    // 8. 3D AI DETECTION BOUNDING BOX
    // ---------------------------------------------------------------
    const bboxGeom = new THREE.BoxGeometry(2.3, 3.4, 1.2)
    const bboxEdges = new THREE.EdgesGeometry(bboxGeom)
    const bboxMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.35
    })
    const boundingBox = new THREE.LineSegments(bboxEdges, bboxMat)
    scannerGroup.add(boundingBox)

    // ---------------------------------------------------------------
    // 9. BIO-DIGITAL GLOWING PARTICLE CLOUD
    // ---------------------------------------------------------------
    const particleCount = 140
    const particlePositions = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)

    const cyanColor = new THREE.Color(0x22d3ee)
    const emeraldColor = new THREE.Color(0x10b981)
    const yellowColor = new THREE.Color(0xfacc15)

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.0 + Math.random() * 2.2
      const theta = Math.random() * Math.PI * 2
      const phi = (Math.random() - 0.5) * Math.PI

      particlePositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi)
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 4.0
      particlePositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi)

      const colorChoice = i % 4 === 0 ? yellowColor : i % 2 === 0 ? cyanColor : emeraldColor
      particleColors[i * 3] = colorChoice.r
      particleColors[i * 3 + 1] = colorChoice.g
      particleColors[i * 3 + 2] = colorChoice.b
    }

    const particleGeom = new THREE.BufferGeometry()
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particleGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    })

    const particles = new THREE.Points(particleGeom, particleMat)
    masterGroup.add(particles)

    // ---------------------------------------------------------------
    // 10. INTERACTION & MOUSE PARALLAX STATE
    // ---------------------------------------------------------------
    let mouseX = 0
    let mouseY = 0
    let targetRotationX = 0
    let targetRotationY = 0
    let currentRotationX = 0
    let currentRotationY = 0
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      mouseX = (x / width) * 2 - 1
      mouseY = -(y / height) * 2 + 1

      targetRotationY = mouseX * 0.45
      targetRotationX = -mouseY * 0.35

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX
        const deltaY = e.clientY - prevMouseY
        masterGroup.rotation.y += deltaX * 0.008
        masterGroup.rotation.x += deltaY * 0.008
        prevMouseX = e.clientX
        prevMouseY = e.clientY
      }
    }

    const handleMouseDown = (e) => {
      isDragging = true
      setIsInteracting(true)
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const handleMouseUp = () => {
      isDragging = false
      setIsInteracting(false)
    }

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        const rect = container.getBoundingClientRect()
        mouseX = ((touch.clientX - rect.left) / width) * 2 - 1
        mouseY = -((touch.clientY - rect.top) / height) * 2 + 1
        targetRotationY = mouseX * 0.45
        targetRotationX = -mouseY * 0.35
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    container.addEventListener('mousedown', handleMouseDown)
    container.addEventListener('touchmove', handleTouchMove, { passive: true })

    const handleResize = () => {
      if (!container) return
      width = container.clientWidth || 600
      height = container.clientHeight || 500
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // ---------------------------------------------------------------
    // 11. ANIMATION TICK LOOP
    // ---------------------------------------------------------------
    let animationFrameId
    const clock = new THREE.Clock()

    const scanMessages = [
      'ANALYZING SPECIMEN...',
      'VISION MODEL ACTIVE',
      'LEAF PATHOLOGY: CLEAR',
      'HEALTH STATUS: 98.4%',
      'DISEASE PROBABILITY: 1.6%',
      'CROP HEALTH: OPTIMAL'
    ]
    let lastScanIndex = -1

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // 1. Slow continuous plant auto-rotation
      if (!isDragging) {
        plantGroup.rotation.y = Math.sin(elapsedTime * 0.4) * 0.35 + 0.1
        plantGroup.rotation.z = Math.cos(elapsedTime * 0.3) * 0.06
        plantGroup.position.y = Math.sin(elapsedTime * 0.9) * 0.08
      }

      // 2. Scanner Rings Rotation (Varying speeds and axes)
      ring1.rotation.z = elapsedTime * 0.55
      ring2.rotation.z = -elapsedTime * 0.42
      ring3.rotation.z = elapsedTime * 0.8

      // Update satellites on Ring 3
      satellites.forEach((sat, i) => {
        const angle = elapsedTime * 1.5 + (i * Math.PI * 2) / satelliteCount
        sat.position.set(Math.cos(angle) * 1.6, Math.sin(angle) * 1.6, 0)
      })

      // 3. Laser Sweep Plane Movement (Oscillates vertically along leaf)
      const sweepY = Math.sin(elapsedTime * 1.8) * 1.6
      sweepGroup.position.y = sweepY

      // Pulse bounding box opacity based on laser position
      bboxMat.opacity = 0.25 + (Math.sin(elapsedTime * 2.5) + 1) * 0.12

      // Periodically trigger HUD message update based on laser position
      const scanIndex = Math.floor((Math.sin(elapsedTime * 0.8) * 0.5 + 0.5) * scanMessages.length)
      if (scanIndex !== lastScanIndex && onScanUpdate) {
        lastScanIndex = scanIndex
        onScanUpdate(scanMessages[scanIndex])
      }

      // 4. Drift Particles Upward
      const positions = particleGeom.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += 0.004
        if (positions[i * 3 + 1] > 2.2) {
          positions[i * 3 + 1] = -2.2
        }
      }
      particleGeom.attributes.position.needsUpdate = true

      // 5. Smooth Parallax Damping on Mouse
      currentRotationX += (targetRotationX - currentRotationX) * 0.06
      currentRotationY += (targetRotationY - currentRotationY) * 0.06

      if (!isDragging) {
        masterGroup.rotation.x = currentRotationX
        masterGroup.rotation.y = currentRotationY
      }

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // ---------------------------------------------------------------
    // CLEANUP ON UNMOUNT
    // ---------------------------------------------------------------
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousedown', handleMouseDown)
      container.removeEventListener('touchmove', handleTouchMove)

      if (animationFrameId) cancelAnimationFrame(animationFrameId)

      // Dispose geometries and materials
      mainLeafGeom.dispose()
      leftLeafGeom.dispose()
      rightLeafGeom.dispose()
      stemGeom.dispose()
      veinGeom.dispose()
      ring1Geom.dispose()
      ring2Geom.dispose()
      ring3Geom.dispose()
      bboxGeom.dispose()
      bboxEdges.dispose()
      sweepDiscGeom.dispose()
      particleGeom.dispose()

      leafMaterial.dispose()
      wireframeMaterial.dispose()
      stemMaterial.dispose()
      veinMaterial.dispose()
      ring1Mat.dispose()
      ring2Mat.dispose()
      ring3Mat.dispose()
      laserLineMat.dispose()
      sweepDiscMat.dispose()
      bboxMat.dispose()
      particleMat.dispose()

      if (renderer) {
        renderer.dispose()
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement)
        }
      }
    }
  }, [onScanUpdate])

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
      title="Click and drag to rotate the 3D AgroVision leaf specimen"
    >
      {/* Subtle Hint Overlay */}
      <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none transition-opacity duration-300 ${isInteracting ? 'opacity-0' : 'opacity-70'}`}>
        <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 bg-cypher-950/80 px-3 py-1 rounded-full border border-cypher-800 backdrop-blur-sm">
          DRAG TO ROTATE 3D SPECIMEN
        </span>
      </div>
    </div>
  )
}

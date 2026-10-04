import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * ThreeVortexCanvas
 * 
 * 100% Borderless, seamless 3D metallic spiral vortex animation.
 * Features generous camera bounds to prevent any edge clipping.
 */
export default function ThreeVortexCanvas({ className = '', onLoaded }) {
  const containerRef = useRef(null)

  // Ref to hold mutable state for the animation loop
  const animState = useRef({
    mouseX: 0,
    mouseY: 0,
    targetRotX: 0.12,
    targetRotY: 0,
    currentRotX: 0.12,
    currentRotY: 0,
    spinSpeed: 0.007,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    dragBaseRotX: 0,
    dragBaseRotY: 0,
    clock: new THREE.Clock(),
    materials: [],
    coreGroup: null,
    particleSystem: null,
    renderer: null,
    scene: null,
    camera: null,
    pointLight: null,
  })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth || 450
    const height = container.clientHeight || 450

    // 1. SCENE SETUP
    const scene = new THREE.Scene()
    animState.current.scene = scene

    // 2. CAMERA SETUP (ample Z-distance to avoid edge clipping)
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 10.2)
    animState.current.camera = camera

    // 3. RENDERER SETUP (transparent alpha for zero borders)
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      })
    } catch (e) {
      console.warn('WebGL not supported:', e)
      return
    }

    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    renderer.outputColorSpace = THREE.SRGBColorSpace
    container.appendChild(renderer.domElement)
    animState.current.renderer = renderer

    // 4. DYNAMIC LIGHTING
    // Ambient light - deep indigo
    const ambientLight = new THREE.AmbientLight(0x0a0f1d, 1.2)
    scene.add(ambientLight)

    // Key Light: Electric Cyan
    const keyLight = new THREE.DirectionalLight(0x00f0ff, 3.2)
    keyLight.position.set(4, 5, 4)
    scene.add(keyLight)

    // Rim/Fill Light: Deep Violet / Magenta
    const fillLight = new THREE.DirectionalLight(0x8b5cf6, 2.6)
    fillLight.position.set(-5, -4, 3)
    scene.add(fillLight)

    // Specular Glint Light following cursor
    const pointLight = new THREE.PointLight(0xffffff, 2.0, 16)
    pointLight.position.set(0, 2, 5)
    scene.add(pointLight)
    animState.current.pointLight = pointLight

    // 5. MAIN VORTEX GROUP
    const vortexGroup = new THREE.Group()
    vortexGroup.scale.setScalar(1.4)
    scene.add(vortexGroup)
    animState.current.coreGroup = vortexGroup

    // 6. PROCEDURAL METALLIC BLADE GENERATION
    const NUM_BLADES = 26
    const STEPS = 36
    const materials = []

    const bladeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xdce5f0,
      metalness: 0.94,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.95,
      side: THREE.DoubleSide,
    })
    materials.push(bladeMaterial)

    // Create custom multi-blade vortex geometry scaled safely within bounds
    for (let b = 0; b < NUM_BLADES; b++) {
      const angleBase = (b / NUM_BLADES) * Math.PI * 2
      const bladeGeom = createCurvedBladeGeometry(angleBase, STEPS)
      const bladeMesh = new THREE.Mesh(bladeGeom, bladeMaterial)
      vortexGroup.add(bladeMesh)
    }

    // 7. CENTRAL GLOWING CYBER CORE
    const coreInnerGeom = new THREE.TorusGeometry(0.58, 0.065, 24, 64)
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.7
    })
    materials.push(coreMaterial)
    const coreInner = new THREE.Mesh(coreInnerGeom, coreMaterial)
    coreInner.position.z = -0.9
    vortexGroup.add(coreInner)

    // Central deepest eye sphere
    const coreEyeGeom = new THREE.SphereGeometry(0.3, 32, 32)
    const coreEyeMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      emissive: 0x8b5cf6,
      emissiveIntensity: 1.2,
      roughness: 0.1,
      metalness: 0.8
    })
    materials.push(coreEyeMat)
    const coreEye = new THREE.Mesh(coreEyeGeom, coreEyeMat)
    coreEye.position.z = -1.05
    vortexGroup.add(coreEye)

    // 8. CONCENTRIC ORBITAL RINGS
    const ringGeom = new THREE.RingGeometry(2.7, 2.73, 96)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    })
    materials.push(ringMat)
    const outerRing = new THREE.Mesh(ringGeom, ringMat)
    outerRing.position.z = -0.3
    vortexGroup.add(outerRing)

    // Dashed inner gyro ring
    const gyroGeom = new THREE.TorusGeometry(1.85, 0.018, 16, 72)
    const gyroMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.5,
      metalness: 0.8,
      roughness: 0.3
    })
    materials.push(gyroMat)
    const gyroRing = new THREE.Mesh(gyroGeom, gyroMat)
    gyroRing.rotation.x = Math.PI * 0.1
    gyroRing.position.z = 0.5
    vortexGroup.add(gyroRing)

    // 9. ORBITAL PARTICLES SYSTEM
    const PARTICLE_COUNT = 150
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3)
    const particleAngles = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const rad = 0.8 + Math.random() * 1.7
      const angle = Math.random() * Math.PI * 2
      const speed = 0.2 + Math.random() * 0.6
      const zOffset = (Math.random() - 0.5) * 1.5 - 0.2

      particlePositions[i * 3] = Math.cos(angle) * rad
      particlePositions[i * 3 + 1] = Math.sin(angle) * rad
      particlePositions[i * 3 + 2] = zOffset

      particleAngles.push({ rad, angle, speed, zOffset })
    }

    const particleGeom = new THREE.BufferGeometry()
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))

    const particleMat = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: 0.055,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    })
    materials.push(particleMat)

    const particles = new THREE.Points(particleGeom, particleMat)
    vortexGroup.add(particles)
    animState.current.particleSystem = { particles, particleAngles, particlePositions }
    animState.current.materials = materials

    // 10. MOUSE & TOUCH EVENT HANDLERS
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)

      animState.current.mouseX = x
      animState.current.mouseY = y

      if (pointLight) {
        pointLight.position.x = x * 3.5
        pointLight.position.y = y * 3.5
      }

      if (!animState.current.isDragging) {
        animState.current.targetRotY = x * 0.35
        animState.current.targetRotX = 0.12 - y * 0.3
      }
    }

    const handleMouseDown = (e) => {
      animState.current.isDragging = true
      animState.current.dragStartX = e.clientX
      animState.current.dragStartY = e.clientY
      animState.current.dragBaseRotX = animState.current.targetRotX
      animState.current.dragBaseRotY = animState.current.targetRotY
    }

    const handleWindowMouseMove = (e) => {
      if (!animState.current.isDragging) return
      const deltaX = (e.clientX - animState.current.dragStartX) * 0.007
      const deltaY = (e.clientY - animState.current.dragStartY) * 0.007
      animState.current.targetRotY = animState.current.dragBaseRotY + deltaX
      animState.current.targetRotX = animState.current.dragBaseRotX + deltaY
    }

    const handleWindowMouseUp = () => {
      animState.current.isDragging = false
    }

    // Touch support for mobile
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        animState.current.isDragging = true
        animState.current.dragStartX = e.touches[0].clientX
        animState.current.dragStartY = e.touches[0].clientY
        animState.current.dragBaseRotX = animState.current.targetRotX
        animState.current.dragBaseRotY = animState.current.targetRotY
      }
    }

    const handleTouchMove = (e) => {
      if (!animState.current.isDragging || e.touches.length !== 1) return
      const deltaX = (e.touches[0].clientX - animState.current.dragStartX) * 0.007
      const deltaY = (e.touches[0].clientY - animState.current.dragStartY) * 0.007
      animState.current.targetRotY = animState.current.dragBaseRotY + deltaX
      animState.current.targetRotX = animState.current.dragBaseRotX + deltaY
    }

    const handleTouchEnd = () => {
      animState.current.isDragging = false
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleWindowMouseMove)
    window.addEventListener('mouseup', handleWindowMouseUp)
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)

    // 11. RESIZE OBSERVER
    const handleResize = () => {
      if (!container || !renderer || !camera) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    // 12. ANIMATION TICK LOOP
    let animationFrameId
    const clock = animState.current.clock

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      // Continuous rotation of vortex
      vortexGroup.rotation.z += animState.current.spinSpeed

      // Smooth inertia damping for cursor / drag rotation
      animState.current.currentRotX += (animState.current.targetRotX - animState.current.currentRotX) * 0.06
      animState.current.currentRotY += (animState.current.targetRotY - animState.current.currentRotY) * 0.06

      // Subtle organic breathing float
      vortexGroup.position.y = Math.sin(elapsedTime * 1.6) * 0.06

      // Apply tilted rotation
      vortexGroup.rotation.x = animState.current.currentRotX
      vortexGroup.rotation.y = animState.current.currentRotY

      // Animate orbiting particle dust
      const pSystem = animState.current.particleSystem
      if (pSystem) {
        const positions = pSystem.particlePositions
        const angles = pSystem.particleAngles

        for (let i = 0; i < angles.length; i++) {
          const p = angles[i]
          p.angle += p.speed * 0.01
          positions[i * 3] = Math.cos(p.angle) * p.rad
          positions[i * 3 + 1] = Math.sin(p.angle) * p.rad
          positions[i * 3 + 2] = p.zOffset + Math.sin(elapsedTime * 2 + i) * 0.06
        }
        pSystem.particles.geometry.attributes.position.needsUpdate = true
      }

      renderer.render(scene, camera)
    }

    animate()
    if (onLoaded) onLoaded()

    // 13. CLEANUP ON UNMOUNT
    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()

      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleWindowMouseMove)
      window.removeEventListener('mouseup', handleWindowMouseUp)
      container.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)

      materials.forEach((m) => m.dispose())
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
      })
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center select-none cursor-grab active:cursor-grabbing overflow-visible ${className}`}
    >
      {/* Completely borderless diffuse ambient glow behind the spiral */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
        <div
          className="w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] rounded-full blur-[90px] opacity-70 transition-opacity pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.28) 0%, rgba(139,92,246,0.18) 50%, rgba(0,0,0,0) 75%)'
          }}
        />
      </div>

      {/* WebGL Canvas Container - borderless, unclipped */}
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center relative z-10 overflow-visible"
      />
    </div>
  )
}

/**
 * Creates curved 3D metallic ribbon blade geometry
 * scaled appropriately to fit comfortably within the camera frustum.
 */
function createCurvedBladeGeometry(angleBase, steps = 36) {
  const geom = new THREE.BufferGeometry()

  const positions = []
  const uvs = []
  const indices = []

  // Scaled dimensions so the spiral never clips the camera view
  const rOuter = 2.65
  const rInner = 0.62
  const spiralTwist = 2.45
  const funnelDepth = 1.15

  for (let s = 0; s <= steps; s++) {
    const t = s / steps
    const easeT = Math.pow(t, 0.85)
    const radius = rOuter - (rOuter - rInner) * easeT
    const angle = angleBase + Math.pow(t, 1.1) * spiralTwist
    const z = -Math.pow(t, 1.45) * funnelDepth

    const bladeWidth = (0.20 + 0.32 * Math.sin(t * Math.PI)) * 0.95
    const thickness = 0.07 * (1.0 - t * 0.45)

    const cx = Math.cos(angle) * radius
    const cy = Math.sin(angle) * radius
    const cz = z

    const lx = -Math.sin(angle)
    const ly = Math.cos(angle)

    const halfW = bladeWidth * 0.5
    const halfH = thickness * 0.5
    const camber = Math.sin(t * Math.PI) * 0.06

    // 4 cross-section vertices:
    // 0: Top-Left
    positions.push(cx - lx * halfW, cy - ly * halfW, cz + halfH + camber)
    uvs.push(0, t)

    // 1: Top-Right
    positions.push(cx + lx * halfW, cy + ly * halfW, cz + halfH - camber)
    uvs.push(1, t)

    // 2: Bottom-Right
    positions.push(cx + lx * halfW, cy + ly * halfW, cz - halfH - camber)
    uvs.push(1, t)

    // 3: Bottom-Left
    positions.push(cx - lx * halfW, cy - ly * halfW, cz - halfH + camber)
    uvs.push(0, t)
  }

  for (let s = 0; s < steps; s++) {
    const curr = s * 4
    const next = (s + 1) * 4

    // Top Face
    indices.push(curr + 0, next + 0, next + 1)
    indices.push(curr + 0, next + 1, curr + 1)

    // Bottom Face
    indices.push(curr + 3, next + 2, next + 3)
    indices.push(curr + 3, curr + 2, next + 2)

    // Right Side Face
    indices.push(curr + 1, next + 1, next + 2)
    indices.push(curr + 1, next + 2, curr + 2)

    // Left Side Face
    indices.push(curr + 0, next + 3, next + 0)
    indices.push(curr + 0, curr + 3, next + 3)
  }

  // Caps
  indices.push(0, 1, 2)
  indices.push(0, 2, 3)

  const last = steps * 4
  indices.push(last + 0, last + 2, last + 1)
  indices.push(last + 0, last + 3, last + 2)

  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geom.setIndex(indices)
  geom.computeVertexNormals()

  return geom
}

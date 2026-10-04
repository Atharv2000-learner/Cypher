import { useEffect, useRef } from 'react'

export default function ParticleNetworkBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*()'.split('')
    const pointer = { x: -1000, y: -1000 }
    let width = 0
    let height = 0
    let nodes = []
    let beams = []
    let animationFrameId = null

    const initializeParticles = () => {
      nodes = Array.from({ length: 90 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: Math.random() * 0.8 + 0.25,
        char: characters[Math.floor(Math.random() * characters.length)]
      }))

      beams = Array.from({ length: 25 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 120 + 60,
        speed: Math.random() * 10 + 6,
        opacity: Math.random() * 0.55 + 0.35
      }))
    }

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      width = bounds.width
      height = bounds.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      initializeParticles()
      if (reducedMotion) draw()
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)

      beams.forEach((beam) => {
        beam.y -= beam.speed
        if (beam.y + beam.length < 0) {
          beam.y = height + 100
          beam.x = Math.random() * width
        }

        const gradient = context.createLinearGradient(beam.x, beam.y, beam.x, beam.y + beam.length)
        gradient.addColorStop(0, `rgba(96, 165, 250, ${beam.opacity})`)
        gradient.addColorStop(1, 'transparent')
        context.strokeStyle = gradient
        context.lineWidth = 1.5
        context.beginPath()
        context.moveTo(beam.x, beam.y)
        context.lineTo(beam.x, beam.y + beam.length)
        context.stroke()
      })

      context.font = '12px monospace'
      context.textAlign = 'center'
      context.textBaseline = 'middle'

      for (let i = 0; i < nodes.length; i += 1) {
        const nodeA = nodes[i]
        for (let j = i + 1; j < nodes.length; j += 1) {
          const nodeB = nodes[j]
          const distance = Math.hypot(nodeA.x - nodeB.x, nodeA.y - nodeB.y)
          if (distance < 120) {
            context.strokeStyle = `rgba(156, 163, 175, ${0.15 * (1 - distance / 120)})`
            context.beginPath()
            context.moveTo(nodeA.x, nodeA.y)
            context.lineTo(nodeB.x, nodeB.y)
            context.stroke()
          }
        }
      }

      nodes.forEach((node) => {
        node.y += node.vy
        if (node.y > height + 20) {
          node.y = -20
          node.x = Math.random() * width
        }

        const distance = Math.hypot(pointer.x - node.x, pointer.y - node.y)

        if (distance < 180 || Math.random() > 0.95) {
          node.char = characters[Math.floor(Math.random() * characters.length)]
        }

        if (distance < 180) {
          context.strokeStyle = `rgba(96, 165, 250, ${0.5 * (1 - distance / 180)})`
          context.beginPath()
          context.moveTo(node.x, node.y)
          context.lineTo(pointer.x, pointer.y)
          context.stroke()
        }

        context.fillStyle = distance < 180 ? '#60A5FA' : 'rgba(156, 163, 175, 0.4)'
        context.fillText(node.char, node.x, node.y)
      })
    }

    const render = () => {
      draw()
      if (!reducedMotion) {
        animationFrameId = requestAnimationFrame(render)
      }
    }

    const handlePointerMove = (event) => {
      if (event.pointerType === 'touch') return
      const bounds = canvas.getBoundingClientRect()
      pointer.x = event.clientX - bounds.left
      pointer.y = event.clientY - bounds.top
    }

    resize()
    render()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="shader-frame" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
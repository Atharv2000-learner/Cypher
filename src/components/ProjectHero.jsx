import React, { useEffect, useRef } from 'react'
import { ArrowDown, ArrowRight, Sparkles, Terminal, Cpu, ShieldCheck } from 'lucide-react'

export default function ProjectHero({ onExploreClick, onBuildClick }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = (canvas.width = canvas.parentElement.offsetWidth)
    let height = (canvas.height = canvas.parentElement.offsetHeight)

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.offsetWidth
      height = canvas.height = canvas.parentElement.offsetHeight
    }

    window.addEventListener('resize', handleResize)

    // Code snippets floating in background
    const codeSnippets = [
      '// Cypher Labs v2.4',
      'model.predict(tensor)',
      'docker-compose up -d',
      'eBPF::ring_buffer_poll()',
      'const auth = Argon2id()',
      'ros2 launch slam.py',
      'git push origin main',
      'HTTP/2 200 OK [34ms]'
    ]

    // Nodes for connected cyber network
    const nodeCount = Math.min(Math.floor(width / 35), 36)
    const nodes = []

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1,
        color: i % 3 === 0 ? '#06b6d4' : i % 3 === 1 ? '#8b5cf6' : '#3b82f6',
        snippet: i < codeSnippets.length ? codeSnippets[i] : null
      })
    }

    let tick = 0

    const render = () => {
      tick++
      ctx.clearRect(0, 0, width, height)

      // Draw faint cyber grid
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.04)'
      ctx.lineWidth = 1
      const gridSize = 40
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Draw connection lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 120

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.22
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`
            ctx.lineWidth = 0.75
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes and code snippets
      nodes.forEach((node, idx) => {
        if (!prefersReducedMotion) {
          node.x += node.vx
          node.y += node.vy

          if (node.x < 0) node.x = width
          if (node.x > width) node.x = 0
          if (node.y < 0) node.y = height
          if (node.y > height) node.y = 0
        }

        ctx.fillStyle = node.color
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()

        // Subtle glowing halos on some nodes
        if (idx % 4 === 0) {
          ctx.fillStyle = `${node.color}22`
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius * 3.5, 0, Math.PI * 2)
          ctx.fill()
        }

        // Render code snippet label periodically
        if (node.snippet && idx % 3 === 0) {
          ctx.font = '9px "JetBrains Mono", monospace'
          ctx.fillStyle = 'rgba(148, 163, 184, 0.22)'
          ctx.fillText(node.snippet, node.x + 8, node.y + 3)
        }
      })

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render)
      }
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-cypher-800/80 bg-gradient-to-b from-cypher-950 via-cypher-900/90 to-cypher-950 px-6 sm:px-12 py-16 sm:py-24 shadow-2xl">
      {/* Background Animated Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Radial Atmospheric Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Cyber Corner Accents */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-neon-cyan/60 pointer-events-none" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-neon-cyan/60 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-neon-cyan/60 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-neon-cyan/60 pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)] mb-6 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
          </span>
          <span>CYPHER LABS / PROJECT SHOWCASE</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-white mb-6">
          Ideas. <span className="text-gradient-cyan">Innovation.</span> Impact.
        </h1>

        {/* Supporting Text */}
        <p className="text-base sm:text-xl text-slate-300 dark:text-slate-300 max-w-2xl leading-relaxed mb-10 font-sans">
          Explore projects built by Cypher Club members — from AI and web applications to hardware, automation, and innovative solutions designed to solve real-world problems.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-neon-cyan to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-cypher-950 shadow-[0_0_25px_-5px_rgba(6,182,212,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-neon-cyan"
          >
            <span>Explore Projects</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>

          <button
            onClick={onBuildClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-cypher-900/80 hover:bg-cypher-800 text-white border border-cypher-700 hover:border-cyan-500/50 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <span>Build With Us</span>
            <ArrowRight className="w-4 h-4 text-neon-cyan group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Subtitle tag */}
        <div className="mt-8 flex items-center gap-4 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open Source</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-600" />
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span>Student-Led Engineering</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-600" />
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Production Tested</span>
          </span>
        </div>
      </div>
    </div>
  )
}

import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight, Calendar, Terminal, Code2, Shield, Cpu, ChevronRight } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import ThreeVortexCanvas from './ThreeVortexCanvas'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 md:pt-12 md:pb-16">
      {/* Background Decorative Gradients & Grid */}
      <div className="absolute inset-0 bg-cyber-grid bg-grid-pattern opacity-60 pointer-events-none"></div>
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-violet-600/15 to-emerald-600/10 blur-[110px] rounded-full pointer-events-none"></div>

      <div className="w-full px-3 sm:px-5 relative z-10">
        
        {/* 2-Column Split: Content on Left, 3D Spiral on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: CYPHER Hero Content */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Top Pill / Status Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cypher-900/90 border border-neon-cyan/30 text-xs font-mono text-slate-300 shadow-lg shadow-neon-cyan/5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
              </span>
              <span className="text-neon-cyan font-bold tracking-wider uppercase">CYPHER</span>
              <span className="text-slate-400">|</span>
              <span>Cyber Security Club</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1] sm:leading-tight">
              Explore{' '}
              <span className="block sm:inline">
                <span style={{ color: '#ff003c', textShadow: '0 0 18px rgba(255, 0, 60, 0.55)' }}>Exploit</span>{' '}
                <span style={{ color: '#00ffff', textShadow: '0 0 18px rgba(0, 255, 255, 0.55)' }}>Defend</span>
              </span>
            </h1>

            {/* Introduction Paragraph */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
              Welcome to <span className="text-white font-medium">CYPHER</span> — the premier student hub for aspiring developers, cybersecurity enthusiasts, and AI builders. We bridge the gap between classroom theory and real-world engineering.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#events"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base bg-cypher-900/90 hover:bg-cypher-800 text-white border border-cypher-700 hover:border-neon-cyan/40 shadow-sm hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cypher-700 focus:ring-offset-cypher-950"
              >
                <Calendar className="w-5 h-5 text-neon-cyan" />
                <span>Explore Events</span>
                <ArrowRight className="w-4 h-4 text-slate-400 ml-1" />
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: 3D Animated Metallic Spiral */}
          <div className="lg:col-span-5 flex items-center justify-center relative overflow-visible">
            <div className="w-full h-[380px] sm:h-[460px] lg:h-[500px] flex items-center justify-center relative overflow-visible">
              <ThreeVortexCanvas className="w-full h-full" />
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: Progression Loop Banner & Metrics */}
        <div className="mt-14 space-y-10">
          
          {/* Interactive Progression Banner */}
          <div className="card-lift p-4 sm:p-5 rounded-2xl bg-cypher-900/70 border border-cypher-800/80 backdrop-blur-md max-w-4xl mx-auto text-left shadow-xl">
            <div className="flex items-center justify-between border-b border-cypher-800 pb-3 mb-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                <span className="ml-2 text-slate-400 font-mono">cypher-community-loop.sh</span>
              </div>
              <span className="text-neon-cyan-bright font-mono">Status: ACTIVE</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center sm:text-left">
              {siteConfig.progression.map((stage) => (
                <div key={stage.title} className="p-3 rounded-lg bg-cypher-950/60 border border-cypher-800/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">{stage.step}</span>
                    <span className={`text-xs font-mono font-bold ${stage.accent}`}>{stage.title}</span>
                  </div>
                  <p className="text-xs text-slate-400 hidden sm:block truncate">{stage.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights / Replaceable Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {siteConfig.stats.map((stat) => (
              <div
                key={stat.label}
                className="card-lift p-4 rounded-xl bg-cypher-900/40 border border-cypher-800/60 text-center hover:border-cypher-700 transition-colors shadow-sm"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight text-gradient-cyan">
                  <AnimatedStat value={stat.value} />
                </div>
                <div className="text-xs text-slate-400 font-medium mt-1">
                  {stat.label}
                </div>
                {stat.isSample && (
                  <span className="text-[9px] text-slate-400 uppercase font-mono mt-1 block">
                    (Sample Club Metric)
                  </span>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

function AnimatedStat({ value }) {
  const statRef = useRef(null)
  const [count, setCount] = useState(0)
  const valueText = String(value)
  const match = /^(\d+)(.*)$/.exec(valueText)
  const target = match ? Number(match[1]) : 0
  const suffix = match ? match[2] : ''

  useEffect(() => {
    if (!match || target === 0) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target)
      return
    }

    let frameId
    let startDelay
    let observer
    let started = false

    const animate = () => {
      if (started) return
      started = true
      const startTime = performance.now()
      const duration = 1500

      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1)
        const easedProgress = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(target * easedProgress))

        if (progress < 1) {
          frameId = requestAnimationFrame(tick)
        } else {
          setCount(target)
        }
      }

      frameId = requestAnimationFrame(tick)
    }

    if (!statRef.current || !('IntersectionObserver' in window)) {
      animate()
    } else {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          startDelay = window.setTimeout(animate, 300)
        }
      }, { threshold: 0.6 })
      observer.observe(statRef.current)
    }

    return () => {
      observer?.disconnect()
      window.clearTimeout(startDelay)
      cancelAnimationFrame(frameId)
    }
  }, [valueText, target])

  return <span ref={statRef} className="tabular-nums">{count}{suffix}</span>
}

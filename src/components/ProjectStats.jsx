import React, { useState, useEffect, useRef } from 'react'
import { FolderGit2, Users, Cpu, Layers, Sparkles } from 'lucide-react'

// Icon mapping helper
const iconMap = {
  FolderGit2,
  Users,
  Cpu,
  Layers
}

function StatCounter({ target, suffix, duration = 1600 }) {
  const [count, setCount] = useState(0)
  const elementRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let start = 0
          const startTime = performance.now()

          const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease-out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3)
            const current = Math.floor(easeOutProgress * target)

            setCount(current)

            if (progress < 1) {
              requestAnimationFrame(updateCount)
            } else {
              setCount(target)
            }
          }

          requestAnimationFrame(updateCount)
        }
      },
      { threshold: 0.25 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [target, duration])

  return (
    <span ref={elementRef} className="font-mono font-bold tracking-tight">
      {count}
      {suffix}
    </span>
  )
}

export default function ProjectStats({ stats = [] }) {
  const accentStyles = {
    cyan: {
      borderHover: 'hover:border-cyan-500/50',
      glow: 'group-hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)]',
      text: 'text-cyan-400',
      badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
    },
    violet: {
      borderHover: 'hover:border-purple-500/50',
      glow: 'group-hover:shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)]',
      text: 'text-purple-400',
      badge: 'bg-purple-500/10 text-purple-300 border-purple-500/20'
    },
    blue: {
      borderHover: 'hover:border-blue-500/50',
      glow: 'group-hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]',
      text: 'text-blue-400',
      badge: 'bg-blue-500/10 text-blue-300 border-blue-500/20'
    },
    emerald: {
      borderHover: 'hover:border-emerald-500/50',
      glow: 'group-hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]',
      text: 'text-emerald-400',
      badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
    }
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {stats.map((stat) => {
          const Icon = iconMap[stat.icon] || FolderGit2
          const style = accentStyles[stat.accent] || accentStyles.cyan

          return (
            <div
              key={stat.id}
              className={`group relative overflow-hidden rounded-2xl bg-cypher-900/60 dark:bg-cypher-900/60 backdrop-blur-md border border-cypher-800/80 p-5 sm:p-6 transition-all duration-300 ${style.borderHover} ${style.glow} hover:-translate-y-1`}
            >
              {/* Top ambient glow bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-cyan-400" />

              <div className="flex items-center justify-between mb-3">
                <span className={`p-2.5 rounded-xl border ${style.badge}`}>
                  <Icon className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                  METRIC
                </span>
              </div>

              {/* Number Display */}
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-1.5">
                <StatCounter target={stat.number} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <h3 className="text-sm sm:text-base font-semibold text-slate-200 group-hover:text-white transition-colors">
                {stat.label}
              </h3>

              {/* Subtext description */}
              <p className="text-xs text-slate-400 mt-1 leading-snug">
                {stat.subtext}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

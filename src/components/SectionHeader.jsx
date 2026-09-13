import React from 'react'

export default function SectionHeader({
  badge,
  title,
  highlight,
  subtitle,
  centered = true,
  className = ''
}) {
  return (
    <div className={`mb-12 ${centered ? 'text-center max-w-3xl mx-auto' : ''} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-semibold bg-neon-cyan/10 text-neon-cyan-bright border border-neon-cyan/25 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse"></span>
          {badge}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white light:text-slate-900 mb-4">
        {title} {highlight && <span className="text-gradient-cyan">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-slate-400 light:text-slate-600 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

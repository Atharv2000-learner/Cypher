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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-semibold bg-cyan-500/10 dark:bg-neon-cyan/10 text-cyan-700 dark:text-neon-cyan-bright border border-cyan-500/30 dark:border-neon-cyan/25 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-neon-cyan animate-pulse"></span>
          {badge}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
        {title} {highlight && <span className="text-gradient-cyan">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

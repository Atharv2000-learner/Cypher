import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { X, Award, ExternalLink, CheckCircle, Code2, Users, Calendar, ShieldCheck, Terminal, Cpu, FileText } from 'lucide-react'

export default function AchievementDetailModal({ achievement, onClose }) {
  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!achievement) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight

    // Compensate for scrollbar removal to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [achievement, onClose])

  if (!achievement || typeof document === 'undefined') return null

  const renderCategoryIcon = (category) => {
    switch (category) {
      case 'Hackathon':
        return <Award className="w-5 h-5 text-cyan-400" />
      case 'Competition':
        return <ShieldCheck className="w-5 h-5 text-purple-400" />
      case 'Projects':
        return <Cpu className="w-5 h-5 text-sky-400" />
      case 'Workshop':
        return <Terminal className="w-5 h-5 text-indigo-400" />
      case 'Coding':
        return <Code2 className="w-5 h-5 text-emerald-400" />
      case 'Innovation':
        return <Cpu className="w-5 h-5 text-fuchsia-400" />
      case 'Community':
        return <Users className="w-5 h-5 text-blue-400" />
      case 'Recognition':
        return <Award className="w-5 h-5 text-amber-400" />
      default:
        return <Award className="w-5 h-5 text-cyan-400" />
    }
  }

  const modalContent = (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-achievement-title"
      onClick={onClose}
    >
      {/* 1. Full-screen dark translucent backdrop with blur */}
      <div 
        className="fixed inset-0 z-[99998] bg-black/80 backdrop-blur-md transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* 2. Modal Card Container: completely opaque to prevent any cards showing through */}
      <div 
        className="relative z-[99999] w-full max-w-2xl max-h-[90vh] my-auto overflow-y-auto bg-[#070b14] border border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/15 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background accents */}
        <div 
          className="absolute -top-24 -left-24 w-60 h-60 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: achievement.foil || '#00E5FF' }}
        />
        <div 
          className="absolute -bottom-24 -right-24 w-60 h-60 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: achievement.secondary || '#2563EB' }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span 
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border"
            style={{ 
              borderColor: `${achievement.foil || '#00E5FF'}40`, 
              color: achievement.foil || '#00E5FF',
              backgroundColor: `${achievement.foil || '#00E5FF'}15`
            }}
          >
            {renderCategoryIcon(achievement.category)}
            {achievement.category}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-mono text-slate-400 bg-slate-800/80 border border-slate-700/60">
            Year {achievement.year}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-800/40">
            CYPHER // 0{achievement.number}
          </span>
        </div>

        {/* Title */}
        <h2 
          id="modal-achievement-title"
          className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2"
        >
          {achievement.title}
        </h2>

        {/* Short description */}
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
          {achievement.description}
        </p>

        {/* Key Metrics Grid */}
        {achievement.details?.metrics && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {achievement.details.metrics.map((metric, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl bg-[#0b1220] border border-slate-800/80 flex flex-col"
              >
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  {metric.label}
                </span>
                <span className="text-base font-bold text-white font-mono">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Highlights Section */}
        {achievement.details?.highlights && (
          <div className="mb-6 space-y-2">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
              Verified Highlights & Activities
            </h4>
            <ul className="space-y-2">
              {achievement.details.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack Pills */}
        {achievement.details?.techStack && (
          <div className="mb-6">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
              Technology & Framework Ecosystem
            </h4>
            <div className="flex flex-wrap gap-2">
              {achievement.details.techStack.map((tech, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 border border-slate-700 text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Student Attribution Footer */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[11px] font-mono text-slate-400 uppercase">Team / Student Body</span>
            <span className="text-sm font-semibold text-white">{achievement.team}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/70 hover:bg-slate-700 text-xs font-mono font-bold uppercase tracking-wider text-slate-200 transition-colors cursor-pointer"
            >
              Close
            </button>
            <Link
              to="/projects"
              onClick={onClose}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs font-mono font-bold uppercase tracking-wider text-slate-950 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <span>{achievement.actionLabel || 'VIEW DETAILS'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

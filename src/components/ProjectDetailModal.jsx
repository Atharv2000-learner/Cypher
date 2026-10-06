import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { 
  X, ArrowLeft, Github, ExternalLink, FileText, Video, 
  Sparkles, AlertCircle, CheckCircle2, Cpu, Users, 
  Workflow, Activity, ShieldCheck, Copy, Check, ArrowRight
} from 'lucide-react'
import ProjectBanner from './ProjectBanner'
import { projectStatuses } from '../data/projects'

export default function ProjectDetailModal({ project, onClose }) {
  const [copiedLink, setCopiedLink] = useState(false)
  const [activeTab, setActiveTab] = useState('overview') // 'overview' | 'architecture' | 'team'

  // Close on Escape key & lock body scroll
  useEffect(() => {
    if (!project) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight

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
  }, [project, onClose])

  if (!project || typeof document === 'undefined') return null

  const statusInfo = projectStatuses[project.status] || projectStatuses.Active

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const modalContent = (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* 1. Full-screen dark translucent backdrop with blur */}
      <div 
        className="fixed inset-0 z-[99998] bg-black/80 backdrop-blur-md transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* 2. Modal Container */}
      <div 
        className="relative z-[99999] w-full max-w-5xl my-auto bg-cypher-950 border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Navigation */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-cypher-950/95 backdrop-blur-md border-b border-cypher-800">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-medium text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-neon-cyan px-2 py-1 rounded-lg hover:bg-cypher-900"
          >
            <ArrowLeft className="w-4 h-4 text-neon-cyan" />
            <span>Back to Projects</span>
          </button>

          <div className="flex items-center gap-3">
            {/* Status Indicator */}
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border ${statusInfo.bgClass}`}>
              <span className={`w-2 h-2 rounded-full ${statusInfo.dotClass} ${statusInfo.pulseClass}`} />
              <span>{statusInfo.label}</span>
            </span>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-cypher-900 border border-cypher-800 text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto custom-scrollbar">
          {/* Hero Banner & Title Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-5">
              <ProjectBanner
                bannerType={project.bannerType}
                title={project.title}
                accentColor={project.accentColor}
                aspectRatio="aspect-[16/10]"
                className="shadow-2xl"
              />
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-cypher-900 border border-cypher-700 text-cyan-300">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  ID: #{project.id}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  • Year {project.year}
                </span>
              </div>

              <h2 id="modal-title" className="text-2xl sm:text-4xl font-extrabold font-display text-white">
                {project.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                {project.description}
              </p>

              {/* Action Links Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-cypher-900 hover:bg-cypher-800 text-white border border-cypher-700 hover:border-cyan-500/50 transition-all shadow-sm"
                  >
                    <Github className="w-4 h-4 text-slate-300" />
                    <span>GitHub Repo</span>
                  </a>
                )}

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-neon-cyan hover:bg-cyan-300 text-cypher-950 shadow-md shadow-cyan-950/40 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}

                {project.documentation && (
                  <a
                    href={project.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-cypher-900/60 hover:bg-cypher-800 text-slate-300 hover:text-white border border-cypher-800 transition-all"
                  >
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span>Docs</span>
                  </a>
                )}

                {project.videoDemo && (
                  <a
                    href={project.videoDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-cypher-900/60 hover:bg-cypher-800 text-slate-300 hover:text-white border border-cypher-800 transition-all"
                  >
                    <Video className="w-4 h-4 text-red-400" />
                    <span>Video Walkthrough</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Impact Metrics Bar */}
          {project.impact && project.impact.length > 0 && (
            <div className="rounded-2xl bg-cypher-900/50 border border-cypher-800/80 p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-neon-cyan" />
                <span>Measurable Results & Outcomes</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.impact.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-cypher-950 border border-cypher-800">
                    <div className="text-xl sm:text-2xl font-black font-mono text-neon-cyan">
                      {item.metric}
                    </div>
                    <div className="text-xs font-semibold text-white mt-0.5">
                      {item.label}
                    </div>
                    {item.note && (
                      <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                        {item.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Problem vs Solution Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Problem Card */}
            <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/25 space-y-2.5">
              <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                <span>The Problem</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {project.problem}
              </p>
            </div>

            {/* Solution Card */}
            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/25 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>The Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Features Section */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-cypher-800 pb-3">
                <h3 className="text-base sm:text-lg font-bold font-display text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-neon-cyan" />
                  <span>Key Technical Capabilities</span>
                </h3>
                <span className="text-xs font-mono text-slate-500">
                  {project.features.length} CORE MODULES
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-cypher-900/60 border border-cypher-800/80 hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-800/50 text-cyan-300 shrink-0">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-1">
                          {feat.title}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {feat.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture & Workflow Diagram */}
          {project.architecture && project.architecture.stages && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-cypher-800 pb-3">
                <h3 className="text-base sm:text-lg font-bold font-display text-white flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-purple-400" />
                  <span>System Architecture & Data Pipeline</span>
                </h3>
                <span className="text-xs font-mono text-slate-500">
                  END-TO-END WORKFLOW
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-cypher-950 border border-cypher-800 overflow-x-auto">
                <div className="flex items-stretch min-w-[680px] gap-2">
                  {project.architecture.stages.map((stage, idx) => (
                    <React.Fragment key={idx}>
                      <div className="flex-1 p-4 rounded-xl bg-cypher-900/80 border border-cypher-800 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-neon-cyan font-bold tracking-widest uppercase">
                            Stage {stage.step}
                          </span>
                          <h5 className="text-xs font-bold text-white mt-1 mb-1">
                            {stage.name}
                          </h5>
                          <p className="text-[11px] text-slate-400 leading-snug">
                            {stage.desc}
                          </p>
                        </div>
                      </div>

                      {idx < project.architecture.stages.length - 1 && (
                        <div className="flex items-center justify-center text-slate-600 px-1">
                          <ArrowRight className="w-4 h-4 text-cyan-500/60" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Technology Breakdown */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold font-display text-white flex items-center gap-2 border-b border-cypher-800 pb-3">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>Technology Stack Breakdown</span>
            </h3>

            {project.techCategories ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(project.techCategories).map(([category, items]) => (
                  <div key={category} className="p-4 rounded-xl bg-cypher-900/60 border border-cypher-800">
                    <h5 className="text-xs font-mono uppercase text-slate-400 font-semibold mb-2.5">
                      {category}
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-cypher-950 border border-cypher-800 text-cyan-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-cypher-900 border border-cypher-700 text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Project Contributors */}
          {project.team && project.team.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold font-display text-white flex items-center gap-2 border-b border-cypher-800 pb-3">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Project Contributors</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.team.map((member, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-cypher-900/60 border border-cypher-800/80 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cypher-950 border border-cyan-500/30 text-xs font-mono font-bold text-neon-cyan flex items-center justify-center">
                        {member.avatar || member.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {member.name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {member.role}
                        </div>
                      </div>
                    </div>

                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-cypher-800 transition-colors"
                        title="GitHub Profile"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 z-30 flex items-center justify-between px-6 py-4 bg-cypher-950/95 backdrop-blur-md border-t border-cypher-800">
          <button
            onClick={onClose}
            className="text-xs sm:text-sm font-mono text-slate-400 hover:text-white transition-colors"
          >
            ← Close Window
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-cypher-900 border border-cypher-800 transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Project'}</span>
            </button>

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold bg-neon-cyan hover:bg-cyan-300 text-cypher-950 transition-colors"
              >
                <span>Launch App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

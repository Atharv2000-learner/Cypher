import React from 'react'
import { 
  Github, ExternalLink, ArrowRight, Sparkles, 
  AlertCircle, Users, Code2, CheckCircle2 
} from 'lucide-react'
import ProjectBanner from './ProjectBanner'
import { projectStatuses } from '../data/projects'

export default function FeaturedProjects({ projects = [], onViewProject }) {
  const featured = projects.filter((p) => p.featured)

  return (
    <div className="w-full space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-cypher-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Innovations</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Flagship <span className="text-gradient-cyan">Engineering</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-xl">
            Selected high-impact platforms engineered by Cypher Club student researchers and deployment squads.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          SHOWCASING <span className="text-neon-cyan font-bold">{featured.length}</span> LAB FLAGSHIPS
        </div>
      </div>

      {/* Featured Projects Cards */}
      <div className="space-y-8">
        {featured.map((project, index) => {
          const statusInfo = projectStatuses[project.status] || projectStatuses.Active
          const isReversed = index % 2 === 1

          return (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-3xl bg-cypher-900/70 border border-cypher-800/90 backdrop-blur-xl hover:border-cyan-500/50 shadow-2xl transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.25)]"
            >
              {/* Asymmetrical Neon Accent Line */}
              <div 
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-300"
              />

              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-6 sm:p-8 lg:p-10 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                {/* Visual Banner Column (Dominant 5 cols) */}
                <div className={`lg:col-span-5 w-full ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative group/thumb cursor-pointer" onClick={() => onViewProject(project)}>
                    <ProjectBanner
                      bannerType={project.bannerType}
                      title={project.title}
                      accentColor={project.accentColor}
                      aspectRatio="aspect-[16/10]"
                      className="shadow-xl"
                    />

                    {/* Overlay Click Hint */}
                    <div className="absolute inset-0 bg-cypher-950/60 backdrop-blur-[2px] opacity-0 group-hover/thumb:opacity-100 transition-all duration-300 flex items-center justify-center rounded-xl">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neon-cyan text-cypher-950 text-xs font-mono font-bold shadow-lg shadow-cyan-950/50 scale-95 group-hover/thumb:scale-100 transition-transform">
                        <span>Inspect Architecture</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Team Members List */}
                  {project.team && project.team.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-cypher-800/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {project.team.map((member, mIdx) => (
                            <div
                              key={mIdx}
                              title={`${member.name} - ${member.role}`}
                              className="w-8 h-8 rounded-full bg-cypher-800 border-2 border-cypher-950 text-[10px] font-mono font-bold text-cyan-300 flex items-center justify-center shadow"
                            >
                              {member.avatar || member.name.substring(0, 2).toUpperCase()}
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-slate-400 font-mono">
                          {project.team.length} Contributors
                        </span>
                      </div>

                      <span className="text-[11px] font-mono text-slate-500">
                        Cohort {project.year}
                      </span>
                    </div>
                  )}
                </div>

                {/* Details Column (Dominant 7 cols) */}
                <div className={`lg:col-span-7 flex flex-col justify-between space-y-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  {/* Category and Status Meta */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-cypher-950 border border-cypher-700 text-slate-300">
                      {project.category}
                    </span>

                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-semibold border ${statusInfo.bgClass}`}>
                      <span className={`w-2 h-2 rounded-full ${statusInfo.dotClass} ${statusInfo.pulseClass}`} />
                      <span>{statusInfo.label}</span>
                    </span>

                    <span className="text-xs font-mono text-slate-500 ml-auto">
                      ID: #{project.id}
                    </span>
                  </div>

                  {/* Project Name and One Liner */}
                  <div>
                    <h3 
                      onClick={() => onViewProject(project)}
                      className="text-2xl sm:text-3xl font-extrabold font-display text-white group-hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed font-sans">
                      {project.oneLiner}
                    </p>
                  </div>

                  {/* Problem Solved Callout */}
                  <div className="rounded-2xl bg-cypher-950/70 border border-cypher-800 p-4 relative overflow-hidden">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 shrink-0 mt-0.5">
                        <AlertCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold mb-1">
                          Problem Solved
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {project.problem}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Technologies Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    {project.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-cypher-950 border border-cypher-800 text-cyan-300/90 hover:border-cyan-500/40 hover:text-cyan-200 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 6 && (
                      <span className="px-2 py-1 rounded-md text-xs font-mono text-slate-500">
                        +{project.technologies.length - 6} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons Row */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onViewProject(project)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-neon-cyan hover:bg-cyan-300 text-cypher-950 shadow-md shadow-cyan-950/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                    >
                      <span>View Project</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-cypher-950 hover:bg-cypher-800 text-slate-200 hover:text-white border border-cypher-700 transition-all hover:border-slate-500"
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                      </a>
                    )}

                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-cypher-950 hover:bg-cypher-800 text-slate-200 hover:text-white border border-cypher-700 transition-all hover:border-slate-500"
                        title="Open Live Demonstration"
                      >
                        <ExternalLink className="w-4 h-4 text-neon-cyan" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

import React from 'react'
import { Github, ExternalLink, Code2, Sparkles, CheckCircle } from 'lucide-react'

export default function ProjectCard({ project }) {
  // Determine gradient / visual icon based on category/accent
  const getGradient = (accent) => {
    switch (accent) {
      case 'cyan':
        return 'from-cyan-500/20 via-cyan-900/40 to-cypher-950 border-cyan-500/30 text-cyan-400'
      case 'emerald':
        return 'from-emerald-500/20 via-emerald-900/40 to-cypher-950 border-emerald-500/30 text-emerald-400'
      case 'violet':
        return 'from-violet-500/20 via-violet-900/40 to-cypher-950 border-violet-500/30 text-violet-400'
      case 'amber':
        return 'from-amber-500/20 via-amber-900/40 to-cypher-950 border-amber-500/30 text-amber-400'
      default:
        return 'from-cyan-500/20 via-cypher-900 to-cypher-950 border-cyan-500/30 text-cyan-400'
    }
  }

  const gradientClasses = getGradient(project.accentColor)

  return (
    <div className="flex flex-col h-full bg-cypher-900/70 border border-cypher-800/90 rounded-2xl overflow-hidden hover:border-cypher-700 hover:shadow-xl hover:shadow-cyan-950/20 transition-all duration-300 group">
      {/* Project Visual Header */}
      <div className={`h-40 relative p-5 bg-gradient-to-br ${gradientClasses} border-b flex flex-col justify-between`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-cypher-950/80 text-white border border-cypher-800">
            {project.category}
          </span>
          <span className="text-[11px] font-mono text-slate-400 bg-cypher-950/70 px-2 py-0.5 rounded">
            {project.status}
          </span>
        </div>

        <div className="flex items-end justify-between">
          <div className="w-12 h-12 rounded-xl bg-cypher-950/90 border border-current flex items-center justify-center shadow-lg">
            <Code2 className="w-6 h-6" />
          </div>
          {project.featured && (
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan-bright transition-colors mb-2">
          {project.title}
        </h3>

        <p className="text-sm text-slate-300 leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Feature Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <ul className="mb-5 space-y-1.5 text-xs text-slate-400">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-neon-cyan shrink-0" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Technologies Badges */}
        <div className="mt-auto pt-4 border-t border-cypher-800/70">
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-cypher-950 border border-cypher-800 text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons: Only show if URLs are provided */}
          <div className="flex items-center gap-3">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-cypher-800 hover:bg-cypher-700 text-white border border-cypher-700 transition-colors focus:outline-none focus:ring-2 focus:ring-neon-cyan"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            ) : null}

            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-neon-cyan text-cypher-950 hover:bg-neon-cyan-bright transition-colors focus:outline-none focus:ring-2 focus:ring-neon-cyan"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            ) : null}

            {/* If neither link is configured yet, show an informational note */}
            {!project.githubUrl && !project.demoUrl && (
              <span className="text-[11px] font-mono text-slate-400 italic">
                Source repository in internal club review
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

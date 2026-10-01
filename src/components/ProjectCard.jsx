import React from 'react'
import { ArrowRight, Github, ExternalLink, Users, Code2 } from 'lucide-react'
import ProjectBanner from './ProjectBanner'
import { projectStatuses } from '../data/projects'

export default function ProjectCard({ project, onViewProject }) {
  const statusInfo = projectStatuses[project.status] || projectStatuses.Active

  return (
    <div
      onClick={() => onViewProject(project)}
      className="group relative flex flex-col h-full rounded-2xl bg-cypher-900/60 dark:bg-cypher-900/60 backdrop-blur-md border border-cypher-800/80 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.18)] cursor-pointer overflow-hidden"
    >
      {/* Neon Accent Line Appearing on Hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

      {/* 1. Project Thumbnail with Image Zoom on Hover */}
      <div className="relative overflow-hidden border-b border-cypher-800/80 bg-cypher-950">
        <div className="transform transition-transform duration-500 group-hover:scale-105">
          <ProjectBanner
            bannerType={project.bannerType}
            title={project.title}
            accentColor={project.accentColor}
            aspectRatio="aspect-[16/9]"
          />
        </div>

        {/* Floating Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          {/* Category Badge */}
          <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-cypher-950/90 text-cyan-300 border border-cypher-700/80 backdrop-blur-md shadow-sm">
            {project.category}
          </span>

          {/* Status Badge */}
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border backdrop-blur-md ${statusInfo.bgClass}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotClass} ${statusInfo.pulseClass}`} />
            <span>{statusInfo.label}</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* 2. Project Title */}
          <h3 className="text-lg font-bold font-display text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mb-2">
            {project.title}
          </h3>

          {/* 3. Short Description */}
          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed mb-4">
            {project.oneLiner || project.description}
          </p>

          {/* 4. Technology Stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-cypher-950 border border-cypher-800 text-slate-300 group-hover:border-cyan-500/30 group-hover:text-cyan-200 transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Footer: Team & View Project Button */}
        <div className="pt-4 border-t border-cypher-800/60 flex items-center justify-between gap-3">
          {/* 7. Team / Member Preview */}
          <div className="flex items-center gap-1.5">
            {project.team && project.team.length > 0 ? (
              <div className="flex -space-x-1.5">
                {project.team.slice(0, 3).map((member, idx) => (
                  <div
                    key={idx}
                    title={`${member.name} - ${member.role}`}
                    className="w-6 h-6 rounded-full bg-cypher-800 border border-cypher-950 text-[9px] font-mono font-bold text-cyan-300 flex items-center justify-center"
                  >
                    {member.avatar || member.name.substring(0, 2).toUpperCase()}
                  </div>
                ))}
              </div>
            ) : (
              <Users className="w-4 h-4 text-slate-500" />
            )}
            <span className="text-[11px] font-mono text-slate-400">
              {project.team ? project.team[0]?.name.split(' ')[0] : 'Cypher'}
            </span>
          </div>

          {/* 8. View Project Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onViewProject(project)
            }}
            className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-neon-cyan group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all focus:outline-none"
          >
            <span>View Project</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}

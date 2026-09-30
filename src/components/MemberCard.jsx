import React from 'react'
import { Github, Linkedin, Terminal } from 'lucide-react'

export default function MemberCard({ member }) {
  const isCore = member.category === 'core'

  // Generate clean initials for fallback avatar
  const getInitials = (name) => {
    if (!name) return 'CY'
    const parts = name.trim().split(/\s+/)
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  const initials = getInitials(member.name)
  const hasGithub = Boolean(member.github)
  const hasLinkedin = Boolean(member.linkedin)

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-300 ease-out overflow-hidden select-none
        ${isCore
          ? 'bg-cypher-950/80 dark:bg-cypher-950/90 border-cyan-500/25 hover:border-cyan-400/70 hover:shadow-[0_0_30px_rgba(6,182,212,0.22)]'
          : 'bg-cypher-950/60 dark:bg-cypher-950/70 border-slate-800 hover:border-cyan-500/40 hover:shadow-[0_0_24px_rgba(6,182,212,0.12)]'
        }
        hover:-translate-y-1.5 backdrop-blur-xl p-4 sm:p-5 aspect-square
      `}
      style={{ minHeight: '300px' }}
    >
      {/* Background Cyber Tech Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none bg-cyber-grid bg-[length:16px_16px]" 
        aria-hidden="true" 
      />

      {/* Cyber Corner Reticles */}
      <div 
        className={`absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 pointer-events-none transition-colors duration-300
          ${isCore ? 'border-cyan-400/60 group-hover:border-neon-cyan' : 'border-slate-700 group-hover:border-cyan-400/60'}`}
        aria-hidden="true"
      />
      <div 
        className={`absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 pointer-events-none transition-colors duration-300
          ${isCore ? 'border-cyan-400/60 group-hover:border-neon-cyan' : 'border-slate-700 group-hover:border-cyan-400/60'}`}
        aria-hidden="true"
      />
      <div 
        className={`absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 pointer-events-none transition-colors duration-300
          ${isCore ? 'border-cyan-400/60 group-hover:border-neon-cyan' : 'border-slate-700 group-hover:border-cyan-400/60'}`}
        aria-hidden="true"
      />
      <div 
        className={`absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 pointer-events-none transition-colors duration-300
          ${isCore ? 'border-cyan-400/60 group-hover:border-neon-cyan' : 'border-slate-700 group-hover:border-cyan-400/60'}`}
        aria-hidden="true"
      />

      {/* Subtle Scanline Highlight on Hover */}
      <div 
        className="absolute inset-0 -translate-y-full group-hover:translate-y-full bg-gradient-to-b from-transparent via-cyan-400/[0.06] to-transparent pointer-events-none transition-transform duration-1000 ease-in-out"
        aria-hidden="true"
      />

      {/* TOP HEADER: Security ID / Decorative Indicator */}
      <div className="relative z-10 flex items-center justify-between w-full border-b border-white/[0.06] pb-2 text-[11px] font-mono">
        <span className="text-slate-400 font-semibold tracking-wider flex items-center gap-1.5">
          <span 
            className={`w-1.5 h-1.5 rounded-full ${isCore ? 'bg-cyan-400 animate-pulse' : 'bg-slate-400'}`} 
            aria-hidden="true" 
          />
          CYPHER
        </span>

        {isCore ? (
          <span className="px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono font-bold tracking-wider">
            {member.code || 'CY-CORE'}
          </span>
        ) : (
          <span className="px-1.5 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-slate-400 text-[10px] font-mono tracking-wider">
            {member.code || 'CY-MBR'}
          </span>
        )}
      </div>

      {/* CENTER PROFILE BLOCK */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full my-auto">
        {/* 1. PHOTO */}
        <div 
          className={`w-20 h-20 sm:w-22 sm:h-22 rounded-xl border flex items-center justify-center overflow-hidden transition-all duration-300 relative group-hover:scale-105 shadow-inner
            ${isCore 
              ? 'border-cyan-500/40 bg-gradient-to-b from-cyan-950/40 to-cypher-900 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
              : 'border-slate-700/80 bg-cypher-900/90 group-hover:border-cyan-500/40'
            }`}
        >
          {member.photo ? (
            <img
              src={member.photo}
              alt={`${member.name} - ${member.post}`}
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            /* Cyber Monogram Fallback Avatar */
            <div className="relative flex flex-col items-center justify-center w-full h-full text-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent opacity-80" />
              <span className="text-xl sm:text-2xl font-mono font-bold tracking-widest text-white/90 group-hover:text-cyan-300 transition-colors drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                {initials}
              </span>
              <span className="text-[8px] font-mono tracking-widest text-cyan-400/70 uppercase mt-0.5">
                CYPHER-ID
              </span>
            </div>
          )}
        </div>

        {/* 2. MEMBER NAME (with comfortable vertical spacing) */}
        <h3 
          className="mt-3.5 sm:mt-4 font-display font-bold text-white text-sm sm:text-base tracking-wide leading-snug group-hover:text-cyan-300 transition-colors truncate max-w-[95%]"
          title={member.name}
        >
          {member.name}
        </h3>

        {/* 3. POST / DESIGNATION (with comfortable vertical spacing) */}
        <p 
          className={`mt-1 sm:mt-1.5 text-xs font-mono font-medium tracking-wide uppercase truncate max-w-[95%]
            ${isCore ? 'text-cyan-400 dark:text-cyan-300' : 'text-slate-300 dark:text-slate-400'}`}
          title={member.post}
        >
          {member.post}
        </p>

        {/* 4. CATEGORY INDICATOR */}
        <div className="mt-1 sm:mt-1.5">
          <span className="inline-block text-[9px] font-mono tracking-widest uppercase text-slate-400 dark:text-slate-500">
            {isCore ? 'CORE MEMBER' : 'MEMBER'}
          </span>
        </div>
      </div>

      {/* BOTTOM FOOTER: Social Links / Terminal Decorator */}
      <div className="relative z-10 flex items-center justify-between w-full border-t border-white/[0.06] pt-2">
        <div className="flex items-center gap-2">
          {hasGithub ? (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
              aria-label={`${member.name} GitHub profile`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          ) : null}

          {hasLinkedin ? (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-[#0a66c2] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
              aria-label={`${member.name} LinkedIn profile`}
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          ) : null}

          {!hasGithub && !hasLinkedin && (
            <span className="text-[9px] font-mono text-slate-500 tracking-wider">
              CYPHER
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-[9px] font-mono text-slate-500">
          <Terminal className="w-3 h-3 text-cyan-500/50" />
          <span>CY/{isCore ? 'COR' : 'MBR'}</span>
        </div>
      </div>
    </div>
  )
}

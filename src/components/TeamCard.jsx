import React from 'react'
import { Github, Linkedin, Mail, Shield, Sparkles } from 'lucide-react'

export default function TeamCard({ member }) {
  // Generate initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }

  // Generate distinct border/accent color based on wing/role
  const getRoleAccent = (role) => {
    if (role.includes('President') || role.includes('Lead')) {
      return 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10'
    }
    return 'text-violet-300 border-violet-500/30 bg-violet-500/10'
  }

  return (
    <div className="flex flex-col h-full bg-cypher-900/70 border border-cypher-800/90 rounded-2xl p-6 hover:border-cypher-700 hover:shadow-xl transition-all duration-300 group relative">
      {/* Member Avatar / Photo Fallback */}
      <div className="flex items-center gap-4 mb-4">
        {member.avatar ? (
          <img
            src={member.avatar}
            alt={member.name}
            className="w-16 h-16 rounded-2xl object-cover border border-cypher-700"
          />
        ) : (
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cypher-850 via-cypher-800 to-cypher-950 border border-cypher-700 flex items-center justify-center text-neon-cyan font-mono font-bold text-xl shadow-inner group-hover:border-neon-cyan/50 transition-colors">
            {getInitials(member.name)}
          </div>
        )}

        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-white group-hover:text-neon-cyan-bright transition-colors">
            {member.name}
          </h3>
          <span className={`inline-flex items-center gap-1 mt-1 text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full border w-fit ${getRoleAccent(member.role)}`}>
            {member.role}
          </span>
        </div>
      </div>

      {/* Academic Department & Year */}
      {(member.department || member.year) && (
        <div className="text-xs font-mono text-slate-400 mb-3 flex items-center gap-1.5 flex-wrap">
          {member.department && <span>{member.department}</span>}
          {member.department && member.year && <span>•</span>}
          {member.year && <span className="text-slate-300">{member.year}</span>}
        </div>
      )}

      {/* Bio */}
      {member.bio && (
        <p className="text-sm text-slate-300 leading-relaxed mb-5 flex-grow">
          {member.bio}
        </p>
      )}

      {/* Social Links */}
      <div className="pt-4 border-t border-cypher-800/80 mt-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {member.socials?.github && (
            <a
              href={member.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-cypher-950 border border-cypher-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-cypher-700 transition-colors"
              aria-label={`${member.name}'s GitHub`}
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
          {member.socials?.linkedin && (
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-cypher-950 border border-cypher-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-cypher-700 transition-colors"
              aria-label={`${member.name}'s LinkedIn`}
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
          {member.wing}
        </span>
      </div>
    </div>
  )
}

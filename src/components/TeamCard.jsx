import React from 'react'

export default function TeamCard({ member, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(member)}
      className="card-lift w-full min-h-[340px] flex flex-col items-center justify-center gap-5 p-8 text-center bg-white/5 dark:bg-cypher-900/60 backdrop-blur-xl border border-white/10 rounded-[20px] text-white shadow-lg hover:border-neon-cyan/40 hover:shadow-cyan-500/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
      aria-label={`View ${member.name}'s profile`}
    >
      <span className="rounded-full px-4 py-2 text-[10px] font-mono font-black tracking-wider text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/25">
        {member.role.toUpperCase()}
      </span>

      <span className="w-[120px] h-[120px] rounded-full bg-white/[0.03] border-2 border-dashed border-neon-cyan/40 flex items-center justify-center overflow-hidden shadow-inner shadow-neon-cyan/5">
        {member.avatar ? (
          <img
            src={member.avatar}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-5xl font-mono text-neon-cyan drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">?</span>
        )}
      </span>

      <span className="text-lg font-mono font-black text-white tracking-wider leading-snug break-words">
        {member.name}
      </span>
    </button>
  )
}

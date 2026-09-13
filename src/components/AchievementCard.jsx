import React from 'react'
import { Trophy, ShieldCheck, Code2, Award, Users, Calendar } from 'lucide-react'

export default function AchievementCard({ achievement }) {
  // Map icon
  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'Trophy':
        return <Trophy className="w-6 h-6 text-amber-400" />
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-cyan-400" />
      case 'Code2':
        return <Code2 className="w-6 h-6 text-emerald-400" />
      case 'Users':
        return <Users className="w-6 h-6 text-cyan-400" />
      default:
        return <Award className="w-6 h-6 text-violet-400" />
    }
  }

  return (
    <div className="flex flex-col h-full bg-cypher-900/70 border border-cypher-800/90 rounded-2xl p-6 hover:border-cypher-700 hover:shadow-xl transition-all duration-300 relative group">
      {/* Top Bar: Icon + Badge + Date */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-cypher-950 border border-cypher-800 flex items-center justify-center shrink-0 group-hover:border-neon-cyan/40 transition-colors">
          {renderIcon(achievement.icon)}
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${achievement.accent}`}>
            {achievement.badge}
          </span>
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1 mt-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            {achievement.date}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan-bright transition-colors mb-2">
        {achievement.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-300 leading-relaxed mb-4 flex-grow">
        {achievement.description}
      </p>

      {/* Team / Member Attribution */}
      {achievement.team && (
        <div className="pt-4 border-t border-cypher-800/70 mt-auto text-xs">
          <span className="text-slate-400 block font-mono text-[11px] mb-0.5">Recognized Team:</span>
          <span className="text-slate-300 font-medium">{achievement.team}</span>
        </div>
      )}
    </div>
  )
}

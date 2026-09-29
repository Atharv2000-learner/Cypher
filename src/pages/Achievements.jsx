import React, { useState } from 'react'
import { Trophy, Award, Calendar, CheckCircle2, Medal, Sparkles } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import AchievementCard from '../components/AchievementCard'
import { achievements } from '../data/achievements'

export default function Achievements() {
  const [selectedYear, setSelectedYear] = useState('All')

  const years = ['All', '2026', '2025']

  const filtered = selectedYear === 'All'
    ? achievements
    : achievements.filter((a) => a.year === selectedYear)

  return (
    <div className="w-full px-3 sm:px-5 py-8 space-y-8">
      {/* Header */}
      <SectionHeader
        badge="Honor Roll"
        title="Club"
        highlight="Achievements"
        subtitle="Celebrating triumphs in national hackathons, collegiate cybersecurity CTFs, algorithmic competitions, and community growth milestones."
      />

      {/* Year Filter Pills */}
      <div className="flex items-center justify-center gap-2">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
              selectedYear === year
                ? 'bg-neon-cyan text-cypher-950 shadow-md shadow-neon-cyan/20 font-bold'
                : 'bg-cypher-900 text-slate-300 hover:text-white border border-cypher-800'
            }`}
          >
            {year === 'All' ? 'All Milestones' : `Year ${year}`}
          </button>
        ))}
      </div>

      {/* Grid of Achievement Cards */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <AchievementCard key={item.id} achievement={item} />
          ))}
        </div>
      ) : (
        <div className="card-lift p-12 rounded-3xl bg-cypher-900/40 border border-cypher-800 text-center space-y-3">
          <Trophy className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">
            Achievements will be added soon.
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
            New competition results and event certifications will be posted here as they conclude.
          </p>
        </div>
      )}

      {/* Competition Culture Banner */}
      <div className="card-lift rounded-3xl bg-cypher-900/70 border border-cypher-800 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-neon-cyan uppercase tracking-wider">
            <Medal className="w-4 h-4" />
            Competitive Spirit
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Want to represent Cypher Club at the next hackathon?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl">
            We form interdisciplinary student squads, provide dedicated workspace, cover entry requisites, and conduct mock pitch reviews before every national contest.
          </p>
        </div>
      </div>
    </div>
  )
}

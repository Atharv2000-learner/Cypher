import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trophy, Medal, Sparkles, Box, LayoutGrid } from 'lucide-react'
import CypherAchievements3D from '../components/CypherAchievements3D'
import AchievementCard from '../components/AchievementCard'
import AchievementDetailModal from '../components/AchievementDetailModal'
import { achievementsData } from '../data/achievements'

export default function Achievements() {
  const [viewMode, setViewMode] = useState('3d') // '3d' | 'grid'
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedAchievementModal, setSelectedAchievementModal] = useState(null)

  const categories = ['All', 'Hackathon', 'Competition', 'Projects', 'Workshop', 'Coding', 'Innovation', 'Community', 'Recognition']

  const filtered = selectedCategory === 'All'
    ? achievementsData
    : achievementsData.filter((a) => a.category === selectedCategory)

  return (
    <div className="w-full px-2 sm:px-4 lg:px-6 py-6 space-y-8">
      {/* 3D Interactive Exhibition Engine */}
      <div className="relative">
        <CypherAchievements3D />
      </div>

      {/* View Mode & Category Filter Ribbon */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-cypher-900/60 border border-cypher-800/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('3d')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
              viewMode === '3d'
                ? 'bg-neon-cyan text-cypher-950 shadow-lg shadow-neon-cyan/25'
                : 'text-slate-400 hover:text-white bg-cypher-950/60 border border-cypher-800'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            3D Tactile Stage
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
              viewMode === 'grid'
                ? 'bg-neon-cyan text-cypher-950 shadow-lg shadow-neon-cyan/25'
                : 'text-slate-400 hover:text-white bg-cypher-950/60 border border-cypher-800'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Catalogue Grid
          </button>
        </div>

        {viewMode === 'grid' && (
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-[11px] font-mono font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-neon-cyan border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200 bg-cypher-950/40 border border-cypher-800/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid View (When toggled to catalogue grid) */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {filtered.map((item) => (
            <AchievementCard 
              key={item.id} 
              achievement={{
                id: item.id,
                title: item.title,
                date: `Year ${item.year}`,
                year: item.year,
                category: item.category,
                description: item.description,
                team: item.team,
                badge: `ACH-${item.number}`,
                icon: item.category === 'Hackathon' ? 'Trophy' : item.category === 'Competition' ? 'ShieldCheck' : item.category === 'Projects' ? 'Code2' : 'Award',
                accent: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
                rawItem: item
              }}
              onViewDetails={setSelectedAchievementModal}
            />
          ))}
        </div>
      )}

      {/* Modal popup when clicking [ VIEW DETAILS ] from grid cards */}
      {selectedAchievementModal && (
        <AchievementDetailModal
          achievement={selectedAchievementModal}
          onClose={() => setSelectedAchievementModal(null)}
        />
      )}

      {/* Competition Culture Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-cypher-950 via-[#0a1120] to-cypher-950 border border-cypher-800/80 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-neon-cyan uppercase tracking-wider">
            <Medal className="w-4 h-4" />
            Competitive Engineering Culture
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Want to represent Cypher Club at the next hackathon?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
            We form interdisciplinary student squads, provide dedicated workspace, cover entry requisites, and conduct mock pitch reviews before every national contest.
          </p>
        </div>
        <div className="shrink-0">
          <Link
            to="/join"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-cyan hover:bg-neon-cyan-bright text-cypher-950 font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-neon-cyan/20 transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            Join Next Squad
          </Link>
        </div>
      </div>
    </div>
  )
}

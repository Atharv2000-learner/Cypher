import React, { useState, useMemo } from 'react'
import { 
  Shield, 
  Users, 
  Terminal, 
  Search, 
  Sparkles, 
  Crown, 
  Filter,
  CheckCircle2,
  Lock
} from 'lucide-react'
import MemberCard from '../components/MemberCard'
import { coreMembers, generalMembers } from '../data/team'

export default function Team() {
  const [activeTab, setActiveTab] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter logic
  const filteredCore = useMemo(() => {
    if (!searchQuery.trim()) return coreMembers
    const query = searchQuery.toLowerCase().trim()
    return coreMembers.filter(
      (m) =>
        m.name.toLowerCase().includes(query) ||
        m.post.toLowerCase().includes(query) ||
        m.code.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) return generalMembers
    const query = searchQuery.toLowerCase().trim()
    return generalMembers.filter(
      (m) =>
        m.name.toLowerCase().includes(query) ||
        m.post.toLowerCase().includes(query) ||
        m.code.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const showCoreSection = activeTab === 'ALL' || activeTab === 'CORE MEMBERS'
  const showGeneralSection = activeTab === 'ALL' || activeTab === 'MEMBERS'

  const totalResults = (showCoreSection ? filteredCore.length : 0) + (showGeneralSection ? filteredMembers.length : 0)

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16">
      
      {/* ─────────────────────────────────────────────────────────────
          SECTION HEADER
          ───────────────────────────────────────────────────────────── */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 dark:bg-neon-cyan/10 border border-cyan-500/30 text-cyan-400 dark:text-cyan-300 text-xs font-mono tracking-widest uppercase">
          <Terminal className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>CYPHER // OUR PEOPLE</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white">
          Meet the <span className="text-gradient-cyan">Team</span>
        </h1>

        {/* Supporting Text */}
        <p className="text-base sm:text-lg text-slate-400 font-sans leading-relaxed max-w-2xl mx-auto">
          The people building, leading and growing Cypher.
        </p>

        {/* Animated Cyber Grid Line & Terminal decoration */}
        <div className="pt-2 flex flex-col items-center gap-2">
          <div className="relative w-48 sm:w-64 h-[2px] bg-slate-800 overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-1/2 animate-[pulse_2s_ease-in-out_infinite]" />
          </div>
          <span className="font-mono text-[11px] text-cyan-500/80 tracking-widest flex items-center gap-1.5">
            <span className="text-cyan-400">&gt;</span> access /cypher/team
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          NAVIGATION / FILTER & SEARCH CONTROLS
          ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 sm:p-3 rounded-2xl bg-cypher-950/80 border border-slate-800/80 backdrop-blur-xl max-w-4xl mx-auto">
        
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto p-1 bg-black/40 rounded-xl border border-white/[0.05]">
          {[
            { key: 'ALL', label: 'ALL', count: coreMembers.length + generalMembers.length },
            { key: 'CORE MEMBERS', label: 'CORE MEMBERS', count: coreMembers.length },
            { key: 'MEMBERS', label: 'MEMBERS', count: generalMembers.length }
          ].map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-lg text-xs font-mono font-bold tracking-wider transition-all duration-200 flex items-center justify-center gap-2
                  ${isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent'
                  }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded ${isActive ? 'bg-cyan-400/20 text-cyan-200' : 'bg-slate-800 text-slate-400'}`}>
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search directory..."
            className="w-full pl-9 pr-8 py-2 bg-black/40 border border-slate-800 focus:border-cyan-500/50 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs font-mono p-0.5"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Directory Metrics Strip */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 max-w-3xl mx-auto pt-2">
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-cypher-950/60 border border-slate-800">
          <Crown className="w-3.5 h-3.5 text-cyan-400" />
          <span>Core Leadership: <strong className="text-white font-semibold">{coreMembers.length}</strong></span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-cypher-950/60 border border-slate-800">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          <span>Members: <strong className="text-white font-semibold">{generalMembers.length}</strong></span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-cypher-950/60 border border-slate-800">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span>Total Strength: <strong className="text-white font-semibold">{coreMembers.length + generalMembers.length}</strong></span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          1. CORE MEMBERS SECTION
          ───────────────────────────────────────────────────────────── */}
      {showCoreSection && (
        <section id="core-members" className="space-y-8">
          {/* Core Section Header */}
          <div className="border-l-2 border-cyan-400 pl-4 sm:pl-6 space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold tracking-widest uppercase border border-cyan-500/40">
                LEADERSHIP
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-wide">
                CORE MEMBERS
              </h2>
            </div>
            <p className="text-sm text-slate-400 font-sans max-w-3xl">
              The team responsible for leading Cypher, managing operations and driving technical initiatives.
            </p>
          </div>

          {/* Core Members Grid (Square Cards) */}
          {filteredCore.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
              {filteredCore.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-800 p-8 text-center bg-cypher-950/40">
              <p className="text-xs font-mono text-slate-400">No core leadership matches your query "{searchQuery}"</p>
            </div>
          )}
        </section>
      )}

      {/* Section Divider Line with Cyber Diamond */}
      {activeTab === 'ALL' && (
        <div className="relative py-4 flex items-center justify-center">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
          <div className="absolute px-4 py-1 bg-cypher-950 border border-slate-800 rounded-full text-[10px] font-mono text-slate-400 flex items-center gap-2">
            <Shield className="w-3 h-3 text-cyan-400" />
            <span>CYPHER TEAM DIRECTORY</span>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. GENERAL MEMBERS SECTION
          ───────────────────────────────────────────────────────────── */}
      {showGeneralSection && (
        <section id="general-members" className="space-y-8">
          {/* Members Section Header */}
          <div className="border-l-2 border-slate-700 pl-4 sm:pl-6 space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono font-bold tracking-widest uppercase border border-slate-700">
                COMMUNITY
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-wide">
                MEMBERS
              </h2>
            </div>
            <p className="text-sm text-slate-400 font-sans max-w-3xl">
              The community of students learning, building and contributing to Cypher.
            </p>
          </div>

          {/* Members Grid (Square Cards) */}
          {filteredMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
              {filteredMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-800 p-8 text-center bg-cypher-950/40">
              <p className="text-xs font-mono text-slate-400">No members match your query "{searchQuery}"</p>
            </div>
          )}
        </section>
      )}

      {/* Empty State when zero results across both sections */}
      {totalResults === 0 && (
        <div className="p-12 text-center rounded-3xl bg-cypher-950/80 border border-slate-800 space-y-3">
          <Terminal className="w-8 h-8 text-cyan-400 mx-auto opacity-80" />
          <h3 className="text-lg font-bold text-white font-display">No Operatives Found</h3>
          <p className="text-xs font-mono text-slate-400">No member matches "{searchQuery}". Try searching by another name or role.</p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="mt-4 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-mono text-cyan-300 transition-colors"
          >
            Clear Search Filter
          </button>
        </div>
      )}

    </div>
  )
}

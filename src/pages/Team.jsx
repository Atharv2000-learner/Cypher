import React, { useState } from 'react'
import { Users, Sparkles, Shield, Code2, HeartHandshake } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import PillFilter from '../components/PillFilter'
import TeamCard from '../components/TeamCard'
import { teamMembers, teamDepartments } from '../data/team'

export default function Team() {
  const [selectedWing, setSelectedWing] = useState('All')

  const filteredMembers = selectedWing === 'All'
    ? teamMembers
    : teamMembers.filter((m) => m.wing === selectedWing)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <SectionHeader
        badge="Club Leadership"
        title="Meet the"
        highlight="Core Team"
        subtitle="The student leads, technical architects, and coordinators driving Cypher Club's workshops, events, and open source development."
      />

      {/* Department/Wing Filter */}
      <div className="flex justify-center">
        <PillFilter
          categories={teamDepartments}
          selectedCategory={selectedWing}
          onSelectCategory={setSelectedWing}
        />
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMembers.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>

      {/* Leadership Openings Note */}
      <div className="rounded-3xl bg-cypher-900/60 border border-cypher-800 p-8 sm:p-10 text-center max-w-3xl mx-auto space-y-4">
        <div className="w-12 h-12 rounded-xl bg-cypher-950 border border-cypher-700 flex items-center justify-center text-neon-cyan mx-auto">
          <HeartHandshake className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white">Interested in a Core Committee Role?</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Cypher Club inducts associate leads, workshop instructors, and event organizers every semester. Active contributors who mentor peers or contribute to projects can step into leadership responsibilities.
        </p>
        <div className="pt-2">
          <a
            href="/join"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold bg-cypher-800 hover:bg-cypher-700 text-white border border-cypher-700 transition-colors"
          >
            <span>Apply for Student Committee</span>
          </a>
        </div>
      </div>
    </div>
  )
}

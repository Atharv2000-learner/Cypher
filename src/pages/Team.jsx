import React, { useEffect, useState } from 'react'
import { Github, HeartHandshake, Linkedin, X } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import PillFilter from '../components/PillFilter'
import TeamCard from '../components/TeamCard'
import { teamMembers } from '../data/team'

const teamTypes = ['Core Members', 'Members']

export default function Team() {
  const [selectedType, setSelectedType] = useState('Core Members')
  const [selectedMember, setSelectedMember] = useState(null)

  useEffect(() => {
    if (!selectedMember) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedMember(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedMember])

  const filteredMembers = selectedType === 'Core Members' ? teamMembers : []

  return (
    <div className="w-full px-3 sm:px-5 py-8 space-y-8">
      {/* Header */}
      <SectionHeader
        badge="Club Leadership"
        title="Meet the"
        highlight="Cypher Club"
        subtitle="Meet the core team and the members building our community together."
      />

      {/* Member Type Filter */}
      <div className="flex justify-center">
        <PillFilter
          categories={teamTypes}
          selectedCategory={selectedType}
          onSelectCategory={setSelectedType}
        />
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMembers.map((member) => (
          <TeamCard key={member.id} member={member} onSelect={setSelectedMember} />
        ))}
        {filteredMembers.length === 0 && (
          <div className="col-span-full rounded-2xl bg-cypher-900/40 border border-cypher-800 p-10 text-center">
            <h3 className="text-lg font-bold text-white">Member profiles coming soon</h3>
            <p className="mt-2 text-sm text-slate-300">Check back as more Cypher Club members are added.</p>
          </div>
        )}
      </div>

      {/* Leadership Openings Note */}
      {selectedType === 'Core Members' && (
        <div className="card-lift rounded-3xl bg-cypher-900/60 border border-cypher-800 p-8 sm:p-10 text-center max-w-3xl mx-auto space-y-4">
        <div className="w-12 h-12 rounded-xl bg-cypher-950 border border-cypher-700 flex items-center justify-center text-neon-cyan mx-auto">
          <HeartHandshake className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white">Interested in a Core Committee Role?</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Cypher Club inducts associate leads, workshop instructors, and event organizers every semester. Active contributors who mentor peers or contribute to projects can step into leadership responsibilities.
        </p>
        </div>
      )}

      {selectedMember && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedMember(null)
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-profile-name"
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-neon-cyan/30 bg-cypher-950 p-6 sm:p-10 text-white shadow-2xl shadow-cyan-500/10"
          >
            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
              aria-label="Close profile"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="mb-5 flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-neon-cyan/50 bg-white/[0.03] text-5xl font-mono text-neon-cyan">
                {selectedMember.avatar ? (
                  <img src={selectedMember.avatar} alt={selectedMember.name} className="h-full w-full object-cover" />
                ) : (
                  '?'
                )}
              </div>
              <span className="mb-3 rounded-full border border-neon-cyan/25 bg-neon-cyan/10 px-4 py-2 text-[10px] font-mono font-black tracking-wider text-neon-cyan">
                {selectedMember.role.toUpperCase()}
              </span>
              <h2 id="team-profile-name" className="text-2xl font-mono font-black text-white">
                {selectedMember.name}
              </h2>
              {(selectedMember.department || selectedMember.year) && (
                <p className="mt-2 text-xs font-mono text-slate-400">
                  {[selectedMember.department, selectedMember.year].filter(Boolean).join(' · ')}
                </p>
              )}
              {selectedMember.bio && (
                <p className="mt-6 text-sm leading-relaxed text-slate-300">{selectedMember.bio}</p>
              )}
              {(selectedMember.socials?.github || selectedMember.socials?.linkedin) && (
                <div className="mt-7 flex items-center gap-3">
                  {selectedMember.socials.github && (
                    <a
                      href={selectedMember.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-cypher-800 bg-cypher-900 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-neon-cyan/50 hover:text-white"
                    >
                      <Github className="h-4 w-4" /> GitHub
                    </a>
                  )}
                  {selectedMember.socials.linkedin && (
                    <a
                      href={selectedMember.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-cypher-800 bg-cypher-900 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-neon-cyan/50 hover:text-white"
                    >
                      <Linkedin className="h-4 w-4" /> LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import React from 'react'
import { Rocket, ArrowRight, Lightbulb, Users, Sparkles, Terminal } from 'lucide-react'

export default function BuildSomethingCTA({ onStartProjectClick, onJoinClick }) {
  return (
    <div id="build-something" className="w-full relative overflow-hidden rounded-3xl bg-gradient-to-b from-cypher-900/90 via-cypher-950 to-cypher-950 border border-cypher-800 p-8 sm:p-14 lg:p-16 text-center shadow-2xl scroll-mt-24">
      {/* Background Animated Cyber Grid & Gradients */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.2) 0%, transparent 60%),
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 32px 32px, 32px 32px'
        }}
      />

      {/* Cyber Corner Marks */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-neon-cyan/70 pointer-events-none" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-neon-cyan/70 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-neon-cyan/70 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-neon-cyan/70 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-6 flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]">
          <Lightbulb className="w-3.5 h-3.5 text-neon-cyan" />
          <span>INCUBATION & MENTORSHIP</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white">
          Have an idea <span className="text-gradient-cyan">worth building?</span>
        </h2>

        {/* Text */}
        <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
          Turn your idea into a real project with Cypher Club. Get compute resources, mentorship from senior engineers, code review pipelines, and demo opportunities at tech conferences.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onStartProjectClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-neon-cyan hover:bg-cyan-300 text-cypher-950 shadow-[0_0_25px_-5px_rgba(6,182,212,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-neon-cyan"
          >
            <Rocket className="w-4 h-4" />
            <span>Start a Project →</span>
          </button>

          <a
            href="#join"
            onClick={(e) => {
              if (onJoinClick) {
                e.preventDefault()
                onJoinClick()
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-cypher-900/90 hover:bg-cypher-800 text-white border border-cypher-700 hover:border-purple-400 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            <Users className="w-4 h-4 text-purple-400" />
            <span>Join Cypher Club →</span>
          </a>
        </div>

        {/* Club Perks Badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Free Cloud & Hardware Lab Access</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>1-on-1 Senior Code Review</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span>Showcase at Annual Demo Day</span>
          </span>
        </div>
      </div>
    </div>
  )
}

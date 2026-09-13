import React from 'react'
import { Sparkles, CheckCircle2, ShieldCheck, Laptop, Rocket } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import JoinForm from '../components/JoinForm'
import { siteConfig } from '../data/siteConfig'

export default function Join() {
  const perks = [
    {
      title: "Hands-on Technical Sprints",
      desc: "Work on real web, AI, and cybersecurity projects with guidance from senior student mentors."
    },
    {
      title: "Priority Event Access",
      desc: "Guaranteed seats at capped-capacity hands-on workshops, CTF sandboxes, and tech talk Q&As."
    },
    {
      title: "Hackathon Squad Matching",
      desc: "Form complementary teams with fellow coders, UI designers, and systems builders."
    },
    {
      title: "Resume & Portfolio Reviews",
      desc: "Detailed technical feedback from peers and alumni who have cleared competitive tech interviews."
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <SectionHeader
        badge="Inductions Open"
        title="Become a"
        highlight="Cypher Club Member"
        subtitle="Join our close-knit student technology society. Fill out your details below to get connected to our study circles, workshops, and project pods."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Col: Info & What to Expect */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-cypher-900/60 border border-cypher-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 text-neon-cyan font-mono text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Member Privileges
            </div>

            <h2 className="text-2xl font-bold text-white leading-snug">
              What you get when you join our society
            </h2>

            <div className="space-y-4">
              {perks.map((perk) => (
                <div key={perk.title} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-white">{perk.title}</h3>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-cypher-800/80 space-y-2 text-xs text-slate-400 font-mono">
              <p><span className="text-slate-300 font-semibold">Cohort:</span> {siteConfig.joinSettings.cohortName}</p>
              <p><span className="text-slate-300 font-semibold">Eligibility:</span> {siteConfig.contact.openTo}</p>
              <p><span className="text-slate-300 font-semibold">Fee:</span> 100% Free (Student-run)</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/30 to-cypher-900 border border-neon-cyan/25 space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Laptop className="w-4 h-4 text-neon-cyan" />
              Have Questions Before Applying?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Visit our lab during club hours ({siteConfig.contact.meetingHours}) at {siteConfig.contact.location} or email us at {siteConfig.contact.email}.
            </p>
          </div>
        </div>

        {/* Right Col: Interactive Application Form */}
        <div className="lg:col-span-7">
          <JoinForm />
        </div>
      </div>
    </div>
  )
}

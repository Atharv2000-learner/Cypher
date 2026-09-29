import React from 'react'
import { Target, Compass, Code, Shield, Terminal, Trophy, CheckCircle2 } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'

export default function About() {
  const whatWeDo = [
    {
      title: "Hands-on Technical Workshops",
      description: "Weekly interactive coding sessions covering modern web development, applied artificial intelligence, Linux tooling, and cloud infrastructure.",
      icon: Terminal,
      accent: "text-cyan-400 border-cyan-500/30"
    },
    {
      title: "Student Project Incubation",
      description: "Small teams collaborate on production-ready open source applications, campus productivity tools, and cross-disciplinary research ideas.",
      icon: Code,
      accent: "text-emerald-400 border-emerald-500/30"
    },
    {
      title: "CTFs & Security Clinics",
      description: "Hands-on vulnerability testing labs, reverse engineering tutorials, and collegiate Capture The Flag competition training.",
      icon: Shield,
      accent: "text-violet-400 border-violet-500/30"
    },
    {
      title: "Hackathon Squad Preparation",
      description: "Mentoring, ideation workshops, UI/UX polish, and rapid prototyping bootcamps to field winning teams at national hackathons.",
      icon: Trophy,
      accent: "text-amber-400 border-amber-500/30"
    }
  ]

  const whyJoinReasons = [
    {
      title: "Zero Experience Required",
      desc: "Whether you wrote your first 'Hello World' today or have three years of hobby projects, we have a progressive learning curve suited for you."
    },
    {
      title: "Build Real Shipped Software",
      desc: "Move beyond passive tutorials. Contribute to live repositories, get constructive code reviews, and showcase proven software on your resume."
    },
    {
      title: "Mentorship From Senior Engineers",
      desc: "Direct access to final-year students and alumni working at top tech firms who guide you through technical interview prep and project architectures."
    },
    {
      title: "Compete on National Stages",
      desc: "Receive travel sponsorships, team formation support, and club backing to represent the university in high-profile hackathons and CTFs."
    },
    {
      title: "Collaborative Student Network",
      desc: "Find hackathon teammates, study partners for technical subjects, and lifelong friends passionate about technology."
    },
    {
      title: "Completely Free Membership",
      desc: "Cypher Club is 100% student-led and free to join. All workshops, study circles, and project resources are freely accessible."
    }
  ]

  return (
    <div className="w-full px-3 sm:px-5 py-8 space-y-12">
      {/* 1. ABOUT CYPHER CLUB HERO */}
      <section className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase bg-cyan-500/10 dark:bg-neon-cyan/10 text-cyan-700 dark:text-neon-cyan border border-cyan-500/30 dark:border-neon-cyan/25">
          About Cypher Club
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          What is <span className="text-gradient-cyan">Cypher</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
          We are a dynamic collective of security enthusiasts, ethical hackers, and tech innovators. While our primary domain is <strong className="font-bold text-cyan-700 dark:text-neon-cyan">Cyber Security</strong>, we don't stop there—we push the boundaries of technology through groundbreaking innovations, collaborative projects, and intense hackathons.
        </p>
      </section>

      {/* 2. VISION & MISSION CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vision */}
        <div className="card-lift p-8 sm:p-10 rounded-3xl bg-white dark:bg-cypher-900/80 border border-cyan-500/30 relative overflow-hidden shadow-xl group hover:border-cyan-500/50 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-neon-cyan mb-6">
            <Target className="w-7 h-7" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-700 dark:text-cyan-400 font-bold block mb-2">
            Our Vision
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Democratizing Technology & Engineering Excellence
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            To create a vibrant, student-powered engineering hub where every student — regardless of background or prior experience — has the mentorship, tools, and platform to become a confident creator, builder, and problem-solver.
          </p>
        </div>

        {/* Mission */}
        <div className="card-lift p-8 sm:p-10 rounded-3xl bg-white dark:bg-cypher-900/80 border border-emerald-500/30 relative overflow-hidden shadow-xl group hover:border-emerald-500/50 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
            <Compass className="w-7 h-7" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-bold block mb-2">
            Our Mission
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Hands-on Mastery Through Collaborative Building
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            To run high-quality peer-to-peer technical bootcamps, foster cross-functional open source project teams, nurture cybersecurity talent, and support competitive squads with real engineering resources and mentorship.
          </p>
        </div>
      </section>

      {/* 4. WHAT WE DO */}
      <section className="space-y-8">
        <SectionHeader
          badge="Activities"
          title="What We"
          highlight="Do"
          subtitle="A glimpse into the daily, weekly, and semester cadence of Cypher Club initiatives."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whatWeDo.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="card-lift p-6 sm:p-8 rounded-2xl bg-white dark:bg-cypher-900/60 border border-slate-200 dark:border-cypher-800 flex items-start gap-5 hover:border-slate-300 dark:hover:border-cypher-700 transition-colors shadow-sm"
              >
                <div className={`w-12 h-12 rounded-xl bg-slate-100 dark:bg-cypher-950 border ${item.accent} flex items-center justify-center shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 6. WHY JOIN CYPHER CLUB */}
      <section className="space-y-8">
        <SectionHeader
          badge="Community Benefits"
          title="Why"
          highlight="Join Us?"
          subtitle="Everything you gain as an active member of Cypher Club."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyJoinReasons.map((reason) => (
            <div
              key={reason.title}
              className="card-lift p-6 rounded-2xl bg-white dark:bg-cypher-900/60 border border-slate-200 dark:border-cypher-800/80 hover:border-cyan-500/40 dark:hover:border-neon-cyan/40 transition-colors shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-neon-cyan shrink-0" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{reason.title}</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>

      </section>
    </div>
  )
}

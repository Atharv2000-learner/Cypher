import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Terminal, Trophy, Code2, ShieldCheck, Users, Calendar, CheckCircle2, ChevronRight } from 'lucide-react'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'
import EventCard from '../components/EventCard'
import ProjectCard from '../components/ProjectCard'
import AchievementCard from '../components/AchievementCard'
import { siteConfig } from '../data/siteConfig'
import { events } from '../data/events'
import { projects } from '../data/projects'
import { achievements } from '../data/achievements'

export default function Home() {
  const upcomingEvents = events.filter((e) => e.type === 'upcoming').slice(0, 3)
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3)
  const topAchievements = achievements.slice(0, 3)

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. THE CYPHER PROGRESSION (Learn → Build → Compete → Collaborate) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Community Roadmap"
          title="The Cypher Engine:"
          highlight="Learn → Build → Compete → Collaborate"
          subtitle="Our student-led ecosystem takes you from your first line of code to building production software and winning national hackathons."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.progression.map((item) => (
            <div
              key={item.title}
              className={`p-6 rounded-2xl bg-cypher-900/60 border ${item.border} backdrop-blur-sm relative overflow-hidden group hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-semibold text-slate-400">
                  PHASE {item.step}
                </span>
                <span className={`text-lg font-mono font-bold ${item.accent}`}>
                  {item.title}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {item.subtitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>
              <div className={`mt-4 pt-3 border-t border-cypher-800/80 flex items-center text-xs font-mono font-semibold ${item.accent}`}>
                <span>Explore Phase</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ABOUT HIGHLIGHTS & WHY JOIN CYPHER CLUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cypher-900/60 border border-cypher-800/90 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/25">
                About Cypher Club
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                A student community driven by{' '}
                <span className="text-gradient-cyan">passion for technology</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Cypher Club was founded with a singular conviction: engineering skills flourish when students teach, build, and solve hard problems together. We eliminate gatekeeping and provide the tools, mentorship, and opportunities to build real-world software.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {siteConfig.values.map((v) => (
                  <div key={v.title} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-neon-cyan shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-white">{v.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5 leading-normal">{v.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-neon-cyan hover:text-neon-cyan-bright transition-colors"
                >
                  <span>Learn more about our Vision & Mission</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-cypher-950/80 border border-cypher-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-slate-400 border-b border-cypher-800 pb-3">
                <Terminal className="w-4 h-4 text-neon-cyan" />
                <span>cypher-manifesto.json</span>
              </div>
              <pre className="text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto">
{`{
  "society": "Cypher Club",
  "motto": "Code. Create. Collaborate.",
  "status": "Active & Welcoming",
  "prerequisites": "None. Bring your curiosity.",
  "weekly_rhythm": [
    "Tech Deep-Dive Labs",
    "Open Hack Sprints",
    "Peer Code Reviews"
  ],
  "tracks": [
    "Full-Stack Web",
    "Applied AI & Agents",
    "Cyber Defense & CTFs",
    "Systems & Open Source"
  ]
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 4. UPCOMING EVENTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/25 mb-3">
              Hands-on Gatherings
            </div>
            <h2 className="text-3xl font-bold text-white">Upcoming Events & Workshops</h2>
            <p className="text-sm text-slate-400 mt-1">
              Join live technical clinics, hackathons, and guest engineering sessions.
            </p>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-neon-cyan hover:text-neon-cyan-bright"
          >
            <span>View All Events ({events.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* 5. FEATURED MEMBER PROJECTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 mb-3">
              Built by Members
            </div>
            <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
            <p className="text-sm text-slate-400 mt-1">
              Real software, cyber utilities, and AI applications created in student squads.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-neon-cyan hover:text-neon-cyan-bright"
          >
            <span>Browse All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 6. ACHIEVEMENTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase bg-amber-500/10 text-amber-300 border border-amber-500/25 mb-3">
              Excellence & Milestones
            </div>
            <h2 className="text-3xl font-bold text-white">Recent Achievements</h2>
            <p className="text-sm text-slate-400 mt-1">
              Recognizing student triumphs in national competitions, CTFs, and tech honors.
            </p>
          </div>
          <Link
            to="/achievements"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-neon-cyan hover:text-neon-cyan-bright"
          >
            <span>View All Milestones</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topAchievements.map((item) => (
            <AchievementCard key={item.id} achievement={item} />
          ))}
        </div>
      </section>

      {/* 7. CALL TO ACTION: JOIN CYPHER CLUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-cypher-900 via-cypher-850 to-cypher-900 border border-neon-cyan/40 p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30">
              <Sparkles className="w-3.5 h-3.5" /> Ready to Code?
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Start your tech journey with{' '}
              <span className="text-gradient-cyan">Cypher Club</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Whether you want to build your first full-stack application, hunt security bugs, or compete in 36-hour hackathons, our community welcomes you.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/join"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-neon-cyan to-cyan-500 text-cypher-950 hover:from-cyan-300 hover:to-neon-cyan shadow-lg shadow-neon-cyan/25"
              >
                <span>Join Cypher Club</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm bg-cypher-950 text-white border border-cypher-800 hover:border-cypher-700"
              >
                <span>Ask Questions</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

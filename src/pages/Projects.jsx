import React, { useState, useRef, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

// The 6 student-focused projects (Languages/backend removed per user request)
const projectsData = [
  {
    id: 'agrovision-ai',
    number: '01',
    title: 'AGROVISION AI',
    category: 'AI / Machine Learning',
    description:
      'An AI-powered crop and plant disease detection platform designed to help identify potential plant health issues through visual analysis.',
    accentColor: 'cyan',
    visualType: 'agrovision'
  },
  {
    id: 'student-attendance',
    number: '02',
    title: 'STUDENT ATTENDANCE SYSTEM',
    category: 'Web / Education',
    description:
      'A simple digital attendance management system that helps students and faculty record, manage, and track attendance efficiently.',
    accentColor: 'blue',
    visualType: 'attendance'
  },
  {
    id: 'student-portfolio',
    number: '03',
    title: 'STUDENT PORTFOLIO',
    category: 'Web Development',
    description:
      'A personal portfolio platform that helps students showcase their skills, projects, achievements, and learning journey in one place.',
    accentColor: 'emerald',
    visualType: 'portfolio'
  },
  {
    id: 'campus-event-manager',
    number: '04',
    title: 'CAMPUS EVENT MANAGER',
    category: 'Web / Management',
    description:
      'A student-focused platform for discovering campus events, managing registrations, and keeping track of upcoming activities.',
    accentColor: 'violet',
    visualType: 'events'
  },
  {
    id: 'study-planner',
    number: '05',
    title: 'STUDY PLANNER',
    category: 'Productivity',
    description:
      'A simple productivity tool that helps students organize subjects, tasks, study sessions, and academic goals.',
    accentColor: 'amber',
    visualType: 'planner'
  },
  {
    id: 'cyber-awareness-hub',
    number: '06',
    title: 'CYBER AWARENESS HUB',
    category: 'Cybersecurity',
    description:
      'An educational platform that helps students learn about cybersecurity fundamentals, online safety, common threats, and secure digital practices.',
    accentColor: 'cyan',
    visualType: 'security'
  }
]

/**
 * Compact, lightweight vector visual for medium-sized card
 */
function ProjectSceneVisual({ type, parallax = { x: 0, y: 0 } }) {
  const transformStyle = {
    transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
    transition: 'transform 180ms ease-out'
  }

  switch (type) {
    case 'agrovision':
      return (
        <div style={transformStyle} className="w-full h-full flex items-center justify-center p-2">
          <svg className="w-full max-w-[150px] max-h-[105px]" viewBox="0 0 300 190" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="150" cy="95" r="65" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 4" opacity="0.35" />
            <circle cx="150" cy="95" r="45" stroke="#10b981" strokeWidth="1.2" opacity="0.45" />

            <path d="M 110 55 L 110 45 L 120 45" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 190 55 L 190 45 L 180 45" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 110 135 L 110 145 L 120 145" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 190 135 L 190 145 L 180 145" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />

            <path
              d="M 150 42 C 180 62 192 104 150 140 C 108 104 120 62 150 42 Z"
              fill="url(#agroLeafGrad)"
              stroke="#10b981"
              strokeWidth="1.8"
            />
            <path d="M 150 46 L 150 136" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 2" />
            <path d="M 150 72 Q 166 78 176 86" stroke="#34d399" strokeWidth="1.2" />
            <path d="M 150 88 Q 134 94 124 102" stroke="#34d399" strokeWidth="1.2" />

            <line x1="85" y1="95" x2="215" y2="95" stroke="#22d3ee" strokeWidth="1.8" strokeDasharray="5 3" />
            <circle cx="150" cy="95" r="3" fill="#22d3ee" />

            <defs>
              <linearGradient id="agroLeafGrad" x1="150" y1="42" x2="150" y2="140" gradientUnits="userSpaceOnUse">
                <stop stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="1" stopColor="#06b6d4" stopOpacity="0.08" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )

    case 'attendance':
      return (
        <div style={transformStyle} className="w-full h-full flex items-center justify-center p-2">
          <svg className="w-full max-w-[150px] max-h-[105px]" viewBox="0 0 300 190" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="90" y="30" width="120" height="130" rx="10" fill="#0b1120" stroke="#3b82f6" strokeWidth="1.6" />
            <rect x="122" y="24" width="56" height="12" rx="3" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.2" />
            <circle cx="150" cy="30" r="2.5" fill="#60a5fa" />

            <g transform="translate(106, 54)">
              <circle cx="7" cy="7" r="5.5" fill="#3b82f6" fillOpacity="0.2" stroke="#60a5fa" strokeWidth="1.2" />
              <path d="M 4.5 7 L 6.5 9 L 10 5" stroke="#60a5fa" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="18" y1="7" x2="76" y2="7" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
            </g>

            <g transform="translate(106, 80)">
              <circle cx="7" cy="7" r="5.5" fill="#3b82f6" fillOpacity="0.2" stroke="#60a5fa" strokeWidth="1.2" />
              <path d="M 4.5 7 L 6.5 9 L 10 5" stroke="#60a5fa" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="18" y1="7" x2="70" y2="7" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
            </g>

            <g transform="translate(106, 106)">
              <circle cx="7" cy="7" r="5.5" fill="#3b82f6" fillOpacity="0.2" stroke="#60a5fa" strokeWidth="1.2" />
              <path d="M 4.5 7 L 6.5 9 L 10 5" stroke="#60a5fa" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="18" y1="7" x2="64" y2="7" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
            </g>

            <rect x="150" y="124" width="48" height="18" rx="3" fill="#0f172a" stroke="#10b981" strokeWidth="1.2" />
            <text x="156" y="136" fill="#34d399" fontSize="7.5" fontFamily="monospace" fontWeight="bold">VERIFIED</text>
          </svg>
        </div>
      )

    case 'portfolio':
      return (
        <div style={transformStyle} className="w-full h-full flex items-center justify-center p-2">
          <svg className="w-full max-w-[150px] max-h-[105px]" viewBox="0 0 300 190" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="70" y="32" width="160" height="124" rx="10" fill="#0b1120" stroke="#10b981" strokeWidth="1.6" />
            <line x1="70" y1="54" x2="230" y2="54" stroke="#1e293b" strokeWidth="1.2" />
            <circle cx="82" cy="43" r="2.5" fill="#ef4444" />
            <circle cx="91" cy="43" r="2.5" fill="#f59e0b" />
            <circle cx="100" cy="43" r="2.5" fill="#10b981" />

            <rect x="82" y="68" width="32" height="32" rx="4" fill="#064e3b" fillOpacity="0.4" stroke="#34d399" strokeWidth="1" />
            <line x1="124" y1="72" x2="212" y2="72" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="124" y1="82" x2="196" y2="82" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="124" y1="92" x2="178" y2="92" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" />

            <rect x="82" y="112" width="136" height="24" rx="4" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
            <text x="94" y="128" fill="#22d3ee" fontSize="8.5" fontFamily="monospace">&lt;Developer /&gt;</text>
            <text x="168" y="128" fill="#34d399" fontSize="8.5" fontFamily="monospace">Ready</text>
          </svg>
        </div>
      )

    case 'events':
      return (
        <div style={transformStyle} className="w-full h-full flex items-center justify-center p-2">
          <svg className="w-full max-w-[150px] max-h-[105px]" viewBox="0 0 300 190" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="78" y="30" width="144" height="128" rx="10" fill="#0b1120" stroke="#8b5cf6" strokeWidth="1.6" />
            <path d="M 78 58 L 222 58" stroke="#8b5cf6" strokeWidth="1.4" />
            <line x1="106" y1="22" x2="106" y2="34" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="194" y1="22" x2="194" y2="34" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" />

            <g transform="translate(94, 72)">
              <rect x="0" y="0" width="16" height="14" rx="2" fill="#8b5cf6" fillOpacity="0.2" />
              <rect x="23" y="0" width="16" height="14" rx="2" fill="#8b5cf6" fillOpacity="0.2" />
              <rect x="46" y="0" width="16" height="14" rx="2" fill="#a855f7" />
              <text x="50" y="10" fill="#ffffff" fontSize="7.5" fontWeight="bold" fontFamily="monospace">24</text>
              <rect x="69" y="0" width="16" height="14" rx="2" fill="#8b5cf6" fillOpacity="0.2" />
              <rect x="92" y="0" width="16" height="14" rx="2" fill="#8b5cf6" fillOpacity="0.2" />

              <rect x="0" y="20" width="16" height="14" rx="2" fill="#8b5cf6" fillOpacity="0.2" />
              <rect x="23" y="20" width="16" height="14" rx="2" fill="#8b5cf6" fillOpacity="0.2" />
              <rect x="46" y="20" width="16" height="14" rx="2" fill="#8b5cf6" fillOpacity="0.2" />
              <rect x="69" y="20" width="16" height="14" rx="2" fill="#8b5cf6" fillOpacity="0.2" />
              <rect x="92" y="20" width="16" height="14" rx="2" fill="#8b5cf6" fillOpacity="0.2" />
            </g>

            <rect x="94" y="116" width="112" height="20" rx="4" fill="#1e1b4b" stroke="#a78bfa" strokeWidth="0.9" />
            <text x="104" y="129" fill="#c084fc" fontSize="7.5" fontFamily="monospace">CAMPUS EVENT</text>
            <circle cx="192" cy="126" r="2.5" fill="#22d3ee" />
          </svg>
        </div>
      )

    case 'planner':
      return (
        <div style={transformStyle} className="w-full h-full flex items-center justify-center p-2">
          <svg className="w-full max-w-[150px] max-h-[105px]" viewBox="0 0 300 190" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="78" y="30" width="144" height="128" rx="10" fill="#0b1120" stroke="#f59e0b" strokeWidth="1.6" />
            <line x1="88" y1="54" x2="212" y2="54" stroke="#1e293b" strokeWidth="1.2" />
            <circle cx="98" cy="42" r="3.5" fill="#f59e0b" />
            <line x1="108" y1="42" x2="156" y2="42" stroke="#fcd34d" strokeWidth="1.8" strokeLinecap="round" />

            <g transform="translate(92, 66)">
              <rect x="0" y="0" width="12" height="12" rx="2.5" fill="#f59e0b" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="0.9" />
              <path d="M 2.5 6 L 5 8.5 L 9.5 3.5" stroke="#fbbf24" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="18" y1="6" x2="104" y2="6" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
            </g>

            <g transform="translate(92, 88)">
              <rect x="0" y="0" width="12" height="12" rx="2.5" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="0.9" />
              <path d="M 2.5 6 L 5 8.5 L 9.5 3.5" stroke="#34d399" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="18" y1="6" x2="92" y2="6" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
            </g>

            <g transform="translate(92, 110)">
              <rect x="0" y="0" width="12" height="12" rx="2.5" fill="#3b82f6" fillOpacity="0.25" stroke="#3b82f6" strokeWidth="0.9" />
              <line x1="18" y1="6" x2="80" y2="6" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            </g>

            <circle cx="196" cy="116" r="10" stroke="#1e293b" strokeWidth="2" />
            <circle cx="196" cy="116" r="10" stroke="#f59e0b" strokeWidth="2" strokeDasharray="42 20" strokeLinecap="round" />
            <text x="191" y="119" fill="#fbbf24" fontSize="6.5" fontFamily="monospace">80%</text>
          </svg>
        </div>
      )

    case 'security':
      return (
        <div style={transformStyle} className="w-full h-full flex items-center justify-center p-2">
          <svg className="w-full max-w-[150px] max-h-[105px]" viewBox="0 0 300 190" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="150,26 205,56 205,128 150,158 95,128 95,56" fill="#0b1120" stroke="#06b6d4" strokeWidth="1.6" />
            <polygon points="150,38 192,62 192,122 150,146 108,122 108,62" fill="#06b6d4" fillOpacity="0.1" stroke="#22d3ee" strokeWidth="1" />

            <path d="M 150,68 L 170,78 L 170,104 Q 170,120 150,128 Q 130,120 130,104 L 130,78 Z" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <rect x="143" y="94" width="14" height="14" rx="2" fill="#22d3ee" />
            <path d="M 145 94 L 145 88 A 5 5 0 0 1 155 88 L 155 94" stroke="#22d3ee" strokeWidth="1.8" fill="none" />
            <circle cx="150" cy="101" r="1.8" fill="#0b1120" />

            <text x="106" y="140" fill="#38bdf8" fontSize="6.5" fontFamily="monospace" opacity="0.8">01000011 01011001</text>
          </svg>
        </div>
      )

    default:
      return null
  }
}

/**
 * True Medium-Sized Project Card (max-w-[780px], compact ~200-240px height, languages removed)
 */
function ProjectVerticalScene({ project, isLast }) {
  const cardRef = useRef(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // IntersectionObserver for lightweight scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
    )

    const currentRef = cardRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [])

  // Mouse move handler for subtle cursor-follow glow & parallax
  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePos({ x, y })

    // Subtle micro-parallax between -3px and +3px
    const normX = (x / rect.width - 0.5) * 6
    const normY = (y / rect.height - 0.5) * 6
    setParallax({ x: normX, y: normY })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePos({ x: -1000, y: -1000 })
    setParallax({ x: 0, y: 0 })
  }

  return (
    <div className="space-y-4">
      {/* ----------------------------------------------------------- */}
      {/* MEDIUM PROJECT CARD CONTAINER (max-w-[780px], compact height) */}
      {/* ----------------------------------------------------------- */}
      <div
        id={project.id}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`group relative overflow-hidden rounded-2xl bg-cypher-900/60 dark:bg-cypher-900/75 border border-cypher-800 backdrop-blur-xl p-5 sm:p-6 max-w-[780px] mx-auto transition-all duration-500 ease-out select-none scroll-mt-24 ${
          isRevealed
            ? 'opacity-100 translate-y-0 scale-100 shadow-[0_0_25px_-8px_rgba(6,182,212,0.18)]'
            : 'opacity-0 translate-y-8 scale-[0.98]'
        } hover:border-cyan-500/50 hover:scale-[1.015] hover:shadow-[0_0_30px_-6px_rgba(6,182,212,0.25)]`}
      >
        {/* Subtle Cyber Grid in Background */}
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(34, 211, 238, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(34, 211, 238, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />

        {/* DIAGONAL WIPE LAYER: sweeps across as the project reveals */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          <div
            className={`absolute -inset-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent transform -skew-x-12 transition-transform duration-800 ease-out ${
              isRevealed ? 'translate-x-[200%]' : '-translate-x-[150%]'
            }`}
          />
        </div>

        {/* Subtle Cursor-Following Radial Glow */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.14), transparent 70%)`
          }}
        />

        {/* Cyber Corner Marks */}
        <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-500/50 pointer-events-none group-hover:border-cyan-400 transition-colors" />
        <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-500/50 pointer-events-none group-hover:border-cyan-400 transition-colors" />
        <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-500/50 pointer-events-none group-hover:border-cyan-400 transition-colors" />
        <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-500/50 pointer-events-none group-hover:border-cyan-400 transition-colors" />

        {/* Medium Card Content: Text on Left, Compact Visual on Right */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
          {/* Left Column: Project Details (No language/backend tags) */}
          <div className="flex-1 space-y-2">
            {/* Category Label + Project Index */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                {project.category}
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                {project.number} / 06
              </span>
            </div>

            {/* Medium Project Name */}
            <h3 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight group-hover:text-cyan-300 transition-colors leading-snug">
              {project.title}
            </h3>

            {/* Medium Short Description (No technologies below it) */}
            <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-sans max-w-[460px]">
              {project.description}
            </p>
          </div>

          {/* Right Column: Compact Visual */}
          <div className="w-full sm:w-[180px] h-[120px] sm:h-[135px] flex-shrink-0 rounded-xl bg-cypher-950/80 border border-cypher-800/80 overflow-hidden flex items-center justify-center shadow-inner relative">
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(34, 211, 238, 0.25) 1px, transparent 1px)`,
                backgroundSize: '12px 12px'
              }}
            />
            <ProjectSceneVisual type={project.visualType} parallax={parallax} />
          </div>
        </div>
      </div>

      {/* Clean Subtle Divider Between Medium Projects */}
      {!isLast && (
        <div className="flex items-center justify-center py-2 pointer-events-none">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>
      )}
    </div>
  )
}

export default function Projects() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto space-y-8">
      {/* ------------------------------------------------------------- */}
      {/* 1. SECTION INTRO                                              */}
      {/* ------------------------------------------------------------- */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-cyan-950/70 border border-cyan-500/30 text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-neon-cyan" />
          <span>CYPHER LABS SHOWCASE</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
          OUR <span className="text-gradient-cyan">PROJECTS</span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans max-w-md mx-auto">
          From simple student tools to ambitious AI systems, our projects are where ideas become something people can actually use.
        </p>

        <p className="text-[11px] sm:text-xs font-mono text-cyan-300/90">
          We build, experiment, learn, and create technology for real-world use.
        </p>

        <div className="w-14 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent mx-auto pt-1" />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. MEDIUM-SIZED VERTICAL SEQUENCE OF PROJECT SHOWCASES        */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-4">
        {projectsData.map((project, idx) => (
          <ProjectVerticalScene
            key={project.id}
            project={project}
            isLast={idx === projectsData.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

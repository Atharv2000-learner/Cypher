import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, MapPin, Tag, ArrowUpRight, Users, CheckCircle2 } from 'lucide-react'

export default function EventCard({ event }) {
  const isUpcoming = event.type === 'upcoming'

  // Dynamic category badge colors
  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Hackathons':
        return 'text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-300 dark:bg-amber-500/10 dark:border-amber-500/25'
      case 'AI Workshops':
        return 'text-cyan-700 bg-cyan-50 border-cyan-200 dark:text-cyan-300 dark:bg-cyan-500/10 dark:border-cyan-500/25'
      case 'Web Development Workshops':
        return 'text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-300 dark:bg-blue-500/10 dark:border-blue-500/25'
      case 'Cybersecurity Events':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-500/10 dark:border-emerald-500/25'
      case 'Coding Competitions':
        return 'text-violet-700 bg-violet-50 border-violet-200 dark:text-violet-300 dark:bg-violet-500/10 dark:border-violet-500/25'
      case 'Git & GitHub Workshops':
        return 'text-pink-700 bg-pink-50 border-pink-200 dark:text-pink-300 dark:bg-pink-500/10 dark:border-pink-500/25'
      case 'Tech Talks':
        return 'text-orange-700 bg-orange-50 border-orange-200 dark:text-orange-300 dark:bg-orange-500/10 dark:border-orange-500/25'
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200 dark:text-slate-300 dark:bg-slate-500/10 dark:border-slate-500/25'
    }
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-cypher-900/70 border border-slate-200 dark:border-cypher-800/90 rounded-2xl p-5 sm:p-6 hover:border-cyan-500/40 hover:shadow-lg dark:hover:border-cypher-700 dark:hover:shadow-xl dark:hover:shadow-cyan-950/20 transition-all duration-300 group relative">
      {/* Top Meta: Category & Status Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(event.category)}`}>
          <Tag className="w-3 h-3" />
          {event.category}
        </span>
        <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${
          isUpcoming
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
            : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
        }`}>
          {event.status}
        </span>
      </div>

      {/* Event Title */}
      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-neon-cyan-bright transition-colors mb-3 leading-snug">
        {event.title}
      </h3>

      {/* Logistics: Date, Time, Venue */}
      <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-neon-cyan shrink-0" />
          <span className="font-semibold text-slate-800 dark:text-slate-300">{event.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-neon-cyan shrink-0" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-neon-cyan shrink-0" />
          <span>{event.venue}</span>
        </div>
        {event.attendees && (
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{event.attendees}</span>
          </div>
        )}
      </div>

      {/* Short Description */}
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 flex-grow">
        {event.shortDescription}
      </p>

      {/* Prerequisites / Capacity if upcoming */}
      {isUpcoming && event.prerequisites && (
        <div className="mb-5 p-2.5 rounded-lg bg-slate-50 border border-slate-200 dark:bg-cypher-950/70 dark:border-cypher-800 text-xs text-slate-600 dark:text-slate-400">
          <span className="text-slate-800 dark:text-slate-300 font-semibold font-mono">Note: </span>
          {event.prerequisites}
        </div>
      )}

      {/* Card Action / Registration */}
      <div className="pt-4 border-t border-slate-200 dark:border-cypher-800/80 mt-auto">
        {isUpcoming ? (
          event.isRegistrationAvailable && event.registrationUrl ? (
            event.registrationUrl.startsWith('http') ? (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-neon-cyan dark:text-cypher-950 dark:hover:bg-neon-cyan-bright transition-all shadow-md shadow-cyan-600/20 dark:shadow-neon-cyan/20 focus:outline-none focus:ring-2 focus:ring-cyan-600 dark:focus:ring-neon-cyan"
              >
                <span>Register for Event</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            ) : (
              <Link
                to={event.registrationUrl}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-neon-cyan dark:text-cypher-950 dark:hover:bg-neon-cyan-bright transition-all shadow-md shadow-cyan-600/20 dark:shadow-neon-cyan/20 focus:outline-none focus:ring-2 focus:ring-cyan-600 dark:focus:ring-neon-cyan"
              >
                <span>Register for Event</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            )
          ) : (
            <div className="w-full text-center py-2 px-3 rounded-xl bg-slate-100 border border-slate-200 dark:bg-cypher-950/60 dark:border-cypher-800 text-xs text-slate-600 dark:text-slate-400 font-mono">
              Registration opens soon
            </div>
          )
        ) : (
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400/90 font-mono font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> Event Concluded
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Recap in archives</span>
          </div>
        )}
      </div>
    </div>
  )
}

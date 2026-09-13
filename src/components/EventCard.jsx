import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, MapPin, Tag, ArrowUpRight, Users, CheckCircle2 } from 'lucide-react'

export default function EventCard({ event }) {
  const isUpcoming = event.type === 'upcoming'

  // Dynamic category badge colors
  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Hackathons':
        return 'text-amber-300 bg-amber-500/10 border-amber-500/25'
      case 'AI Workshops':
        return 'text-cyan-300 bg-cyan-500/10 border-cyan-500/25'
      case 'Web Development Workshops':
        return 'text-blue-300 bg-blue-500/10 border-blue-500/25'
      case 'Cybersecurity Events':
        return 'text-emerald-300 bg-emerald-500/10 border-emerald-500/25'
      case 'Coding Competitions':
        return 'text-violet-300 bg-violet-500/10 border-violet-500/25'
      case 'Git & GitHub Workshops':
        return 'text-pink-300 bg-pink-500/10 border-pink-500/25'
      case 'Tech Talks':
        return 'text-orange-300 bg-orange-500/10 border-orange-500/25'
      default:
        return 'text-slate-300 bg-slate-500/10 border-slate-500/25'
    }
  }

  return (
    <div className="flex flex-col h-full bg-cypher-900/70 border border-cypher-800/90 rounded-2xl p-5 sm:p-6 hover:border-cypher-700 hover:shadow-xl hover:shadow-cyan-950/20 transition-all duration-300 group relative">
      {/* Top Meta: Category & Status Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(event.category)}`}>
          <Tag className="w-3 h-3" />
          {event.category}
        </span>
        <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${
          isUpcoming
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            : 'bg-slate-800 text-slate-400 border-slate-700'
        }`}>
          {event.status}
        </span>
      </div>

      {/* Event Title */}
      <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan-bright transition-colors mb-3 leading-snug">
        {event.title}
      </h3>

      {/* Logistics: Date, Time, Venue */}
      <div className="space-y-1.5 text-xs text-slate-400 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-neon-cyan shrink-0" />
          <span className="font-medium text-slate-300">{event.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-neon-cyan shrink-0" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-neon-cyan shrink-0" />
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
      <p className="text-sm text-slate-300 leading-relaxed mb-6 flex-grow">
        {event.shortDescription}
      </p>

      {/* Prerequisites / Capacity if upcoming */}
      {isUpcoming && event.prerequisites && (
        <div className="mb-5 p-2.5 rounded-lg bg-cypher-950/70 border border-cypher-800 text-xs text-slate-400">
          <span className="text-slate-300 font-semibold font-mono">Note: </span>
          {event.prerequisites}
        </div>
      )}

      {/* Card Action / Registration */}
      <div className="pt-4 border-t border-cypher-800/80 mt-auto">
        {isUpcoming ? (
          event.isRegistrationAvailable && event.registrationUrl ? (
            event.registrationUrl.startsWith('http') ? (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-neon-cyan text-cypher-950 hover:bg-neon-cyan-bright transition-all shadow-md shadow-neon-cyan/20 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
              >
                <span>Register for Event</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            ) : (
              <Link
                to={event.registrationUrl}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-neon-cyan text-cypher-950 hover:bg-neon-cyan-bright transition-all shadow-md shadow-neon-cyan/20 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
              >
                <span>Register for Event</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            )
          ) : (
            <div className="w-full text-center py-2 px-3 rounded-xl bg-cypher-950/60 border border-cypher-800 text-xs text-slate-400 font-mono">
              Registration opens soon
            </div>
          )
        ) : (
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5 text-emerald-400/90 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" /> Event Concluded
            </span>
            <span className="text-[11px] text-slate-400">Recap in archives</span>
          </div>
        )}
      </div>
    </div>
  )
}

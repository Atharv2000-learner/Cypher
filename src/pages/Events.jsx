import React, { useState, useMemo } from 'react'
import { Calendar, Search, Filter, Sparkles, AlertCircle } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import PillFilter from '../components/PillFilter'
import EventCard from '../components/EventCard'
import { events, eventCategories } from '../data/events'

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'upcoming' | 'past'

  // Filter events based on active tab, category, and search query
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Tab filter
      if (activeTab === 'upcoming' && event.type !== 'upcoming') return false
      if (activeTab === 'past' && event.type !== 'past') return false

      // Category filter
      if (selectedCategory !== 'All' && event.category !== selectedCategory) return false

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchesTitle = event.title.toLowerCase().includes(q)
        const matchesDesc = event.shortDescription.toLowerCase().includes(q)
        const matchesCat = event.category.toLowerCase().includes(q)
        const matchesVenue = event.venue.toLowerCase().includes(q)
        if (!matchesTitle && !matchesDesc && !matchesCat && !matchesVenue) return false
      }

      return true
    })
  }, [activeTab, selectedCategory, searchQuery])

  const upcomingList = filteredEvents.filter((e) => e.type === 'upcoming')
  const pastList = filteredEvents.filter((e) => e.type === 'past')

  return (
    <div className="w-full px-3 sm:px-5 py-8 space-y-8">
      {/* Header */}
      <SectionHeader
        badge="Club Schedule"
        title="Events &"
        highlight="Workshops"
        subtitle="Hands-on bootcamps, 36-hour hackathons, capture-the-flags, and industry talks designed to build your engineering capabilities."
      />

      {/* Filter and Search Bar Control Area */}
      <div className="bg-white dark:bg-cypher-900/70 border border-slate-200 dark:border-cypher-800 rounded-2xl p-5 space-y-4 shadow-xl">
        {/* Search + Tab toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Tab Filter: All | Upcoming | Past */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-cypher-950 border border-slate-200 dark:border-cypher-800 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                activeTab === 'all'
                  ? 'bg-neon-cyan text-cypher-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              All Events ({events.length})
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                activeTab === 'upcoming'
                  ? 'bg-neon-cyan text-cypher-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              Upcoming ({events.filter((e) => e.type === 'upcoming').length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                activeTab === 'past'
                  ? 'bg-neon-cyan text-cypher-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              Past Archives ({events.filter((e) => e.type === 'past').length})
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, keyword, venue..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-cypher-950 border border-slate-300 dark:border-cypher-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-neon-cyan"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="pt-2 border-t border-slate-200 dark:border-cypher-800/80">
          <span className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-2">Category Filter:</span>
          <PillFilter
            categories={eventCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </div>

      {/* Events Results Section */}
      <div className="space-y-14">
        {/* UPCOMING EVENTS */}
        {(activeTab === 'all' || activeTab === 'upcoming') && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-cypher-800 pb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Upcoming Events</h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-cypher-900 border border-slate-200 dark:border-cypher-800 text-slate-700 dark:text-slate-300">
                {upcomingList.length}
              </span>
            </div>

            {upcomingList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingList.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="card-lift p-10 rounded-2xl bg-white dark:bg-cypher-900/40 border border-slate-200 dark:border-cypher-800 text-center space-y-2">
                <Calendar className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="text-base font-medium text-slate-700 dark:text-slate-300">
                  No upcoming events at the moment. Check back soon.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Try adjusting the category filter or search terms above.
                </p>
              </div>
            )}
          </div>
        )}

        {/* PAST EVENTS */}
        {(activeTab === 'all' || activeTab === 'past') && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-cypher-800 pb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Past Events & Archives</h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-cypher-900 border border-slate-200 dark:border-cypher-800 text-slate-700 dark:text-slate-300">
                {pastList.length}
              </span>
            </div>

            {pastList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastList.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="card-lift p-8 rounded-2xl bg-white dark:bg-cypher-900/40 border border-slate-200 dark:border-cypher-800 text-center text-slate-500 dark:text-slate-400 text-sm">
                No past events match the current filter.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

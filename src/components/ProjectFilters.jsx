import React from 'react'
import { Search, X, SlidersHorizontal, Layers, Sparkles } from 'lucide-react'

export default function ProjectFilters({
  categories = [],
  selectedCategory = 'All',
  onSelectCategory,
  searchQuery = '',
  onSearchChange,
  totalCount = 0,
  filteredCount = 0,
  categoryCounts = {}
}) {
  return (
    <div id="project-catalog" className="w-full space-y-4 scroll-mt-24">
      {/* Search and Quick Meta Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-cypher-900/80 border border-cypher-800 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-xl">
        {/* Search Input Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects by name, tech, domain, or contributor..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-cypher-950/90 border border-cypher-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-md hover:bg-cypher-800 transition-colors"
              aria-label="Clear search query"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Counter & Clear Indicator */}
        <div className="flex items-center justify-between md:justify-end gap-3 text-xs font-mono text-slate-400">
          <span className="px-3 py-1.5 rounded-lg bg-cypher-950 border border-cypher-800">
            Showing <strong className="text-neon-cyan">{filteredCount}</strong> of {totalCount} projects
          </span>

          {(selectedCategory !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                onSelectCategory('All')
                onSearchChange('')
              }}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Category Pills System */}
      <div className="relative">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
          {categories.map((category) => {
            const isSelected = selectedCategory === category
            const count = categoryCounts[category] ?? 0

            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-neon-cyan ${
                  isSelected
                    ? 'bg-neon-cyan text-cypher-950 font-bold border-neon-cyan shadow-[0_0_15px_-3px_rgba(6,182,212,0.4)] scale-105'
                    : 'bg-cypher-900/60 hover:bg-cypher-800 text-slate-300 hover:text-white border-cypher-800 hover:border-slate-700'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                    isSelected
                      ? 'bg-cypher-950 text-cyan-300 font-bold'
                      : 'bg-cypher-950/70 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

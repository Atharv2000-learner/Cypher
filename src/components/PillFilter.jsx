import React from 'react'

export default function PillFilter({
  categories = [],
  selectedCategory = 'All',
  onSelectCategory,
  className = ''
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`} role="tablist" aria-label="Filter categories">
      {categories.map((category) => {
        const isSelected = selectedCategory === category
        return (
          <button
            key={category}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-cypher-950 ${
              isSelected
                ? 'bg-neon-cyan text-cypher-950 font-semibold shadow-lg shadow-neon-cyan/20 border border-neon-cyan'
                : 'bg-cypher-900/80 text-slate-300 hover:text-white hover:bg-cypher-800 border border-cypher-800'
            }`}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}

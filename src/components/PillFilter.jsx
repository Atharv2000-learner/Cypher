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
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-cypher-950 ${
              isSelected
                ? 'bg-neon-cyan text-cypher-950 font-semibold shadow-md shadow-neon-cyan/20 border border-neon-cyan'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200 dark:bg-cypher-900/80 dark:text-slate-300 dark:hover:text-white dark:hover:bg-cypher-800 dark:border-cypher-800'
            }`}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}

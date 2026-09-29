import React, { useState, useMemo } from 'react'
import { Code2, Search, Sparkles, FolderGit2 } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import PillFilter from '../components/PillFilter'
import ProjectCard from '../components/ProjectCard'
import { projects, projectCategories } from '../data/projects'

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category filter
      if (selectedCategory !== 'All' && project.category !== selectedCategory) {
        return false
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchTitle = project.title.toLowerCase().includes(q)
        const matchDesc = project.description.toLowerCase().includes(q)
        const matchTech = project.technologies.some((t) => t.toLowerCase().includes(q))
        if (!matchTitle && !matchDesc && !matchTech) return false
      }

      return true
    })
  }, [selectedCategory, searchQuery])

  return (
    <div className="w-full px-3 sm:px-5 py-8 space-y-8">
      {/* Header */}
      <SectionHeader
        badge="Open Source & Labs"
        title="Member"
        highlight="Projects"
        subtitle="Explore practical applications, developer tools, and security suites crafted by Cypher Club student engineers."
      />

      {/* Filter and Search Bar */}
      <div className="bg-cypher-900/70 border border-cypher-800 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            <PillFilter
              categories={projectCategories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech or title..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-cypher-950 border border-cypher-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-cyan"
            />
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="card-lift p-12 rounded-3xl bg-cypher-900/40 border border-cypher-800 text-center space-y-3">
          <FolderGit2 className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">
            Projects will be showcased here soon.
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
            No projects matched the selected category. Club members regularly submit project proposals each semester.
          </p>
        </div>
      )}
    </div>
  )
}

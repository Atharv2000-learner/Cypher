import { useEffect, useRef, useState, useMemo } from 'react'
import SectionHeader from '../components/SectionHeader'
import CompleteShelfBackground from '../components/CompleteShelfBackground'
import ProjectStats from '../components/ProjectStats'
import FeaturedProjects from '../components/FeaturedProjects'
import ProjectFilters from '../components/ProjectFilters'
import ProjectCard from '../components/ProjectCard'
import ProjectDetailModal from '../components/ProjectDetailModal'
import ProjectProposalModal from '../components/ProjectProposalModal'
import BuildSomethingCTA from '../components/BuildSomethingCTA'
import { projects, projectCategories } from '../data/projects'

export default function Projects() {
  const shelfContainerRef = useRef(null)
  const [shouldLoadShelf, setShouldLoadShelf] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isProposalOpen, setIsProposalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const container = shelfContainerRef.current
    if (!container) return

    if (!('IntersectionObserver' in window)) {
      setShouldLoadShelf(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return

      setShouldLoadShelf(true)
      observer.disconnect()
    }, { rootMargin: '300px 0px' })

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  // Filter projects by category and search query
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch = !query || 
        project.title.toLowerCase().includes(query) ||
        project.oneLiner?.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query) ||
        project.technologies?.some((t) => t.toLowerCase().includes(query)) ||
        project.team?.some((m) => m.name.toLowerCase().includes(query))

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  // Count per category
  const categoryCounts = useMemo(() => {
    const counts = { All: projects.length }
    projects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [])

  return (
    <section className="projects-section relative w-full min-h-screen py-16 sm:py-24 bg-[#07090e] border-y border-cyan-950/40">
      <div className="projects-content relative z-10 w-full space-y-16 sm:space-y-24">
        {/* Header & 3D Interactive Exhibition */}
        <div className="space-y-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Engineering & Research"
              highlight="Projects"
              centered={true}
            />
          </div>

          <div ref={shelfContainerRef} className="completeshelf-container relative isolate w-full aspect-[4/5] overflow-hidden border-y border-cyan-500/30 bg-[#171a24] sm:aspect-[16/10] lg:aspect-[16/9]">
            {shouldLoadShelf && <CompleteShelfBackground />}
          </div>
        </div>

        {/* Lab Stats */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectStats />
        </div>

        {/* Featured Projects Innovation Showcase */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedProjects
            projects={projects}
            onViewProject={setSelectedProject}
          />
        </div>

        {/* Filterable Project Catalog */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ProjectFilters
            categories={projectCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalCount={projects.length}
            filteredCount={filteredProjects.length}
            categoryCounts={categoryCounts}
          />

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onViewProject={setSelectedProject}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 rounded-3xl bg-cypher-900/40 border border-cypher-800/60">
              <p className="text-base text-slate-400 font-mono">
                No projects matched your search criteria.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All')
                  setSearchQuery('')
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-neon-cyan/10 text-cyan-300 border border-cyan-500/30 hover:bg-neon-cyan/20 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Propose a Project CTA Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BuildSomethingCTA
            onStartProjectClick={() => setIsProposalOpen(true)}
          />
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Project Proposal Modal */}
      {isProposalOpen && (
        <ProjectProposalModal
          isOpen={isProposalOpen}
          onClose={() => setIsProposalOpen(false)}
        />
      )}
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import SectionHeader from '../components/SectionHeader'
import CompleteShelfBackground from '../components/CompleteShelfBackground'

export default function Projects() {
  const shelfContainerRef = useRef(null)
  const [shouldLoadShelf, setShouldLoadShelf] = useState(false)

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

  return (
    <section className="projects-section relative w-full min-h-screen py-16 sm:py-24 overflow-hidden bg-[#07090e] border-y border-cyan-950/40">
      <div className="projects-content relative z-10 w-full">
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
    </section>
  )
}

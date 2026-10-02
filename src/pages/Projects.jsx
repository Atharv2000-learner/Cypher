import SectionHeader from '../components/SectionHeader'
import CompleteShelfBackground from '../components/CompleteShelfBackground'

export default function Projects() {
  return (
    <section className="projects-section relative w-full min-h-screen py-16 sm:py-24 overflow-hidden bg-[#07090e] border-y border-cyan-950/40">
      <div className="projects-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Engineering & Research"
          highlight="Projects"
          centered={true}
        />

        <div className="completeshelf-container relative isolate mx-auto aspect-[4/5] w-full max-w-5xl overflow-hidden rounded-xl border border-cyan-500/30 bg-[#171a24] sm:aspect-[16/10] lg:aspect-[16/9]">
          <CompleteShelfBackground />
        </div>
      </div>
    </section>
  )
}

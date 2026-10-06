import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { X, ArrowRight } from 'lucide-react'
import { projects } from '../data/projects'
import ProjectDetailModal from './ProjectDetailModal'
import './CompleteShelfBackground.css'

const BookshelfScene = lazy(() =>
  import('@designcodeio/threeui/components/BookshelfScene').then(({ BookshelfScene: scene }) => ({
    default: scene
  }))
)

/**
 * Mounts the authored interactive ThreeUI bookshelf renderer without its landing-page UI.
 */
export default function CompleteShelfBackground({
  enabled = true,
  className = ""
}) {
  const hostRef = useRef(null)
  const closeObserverRef = useRef(null)
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0)
  const [isBookOpen, setIsBookOpen] = useState(false)
  const [selectedModalProject, setSelectedModalProject] = useState(null)
  const selectedProject = projects[selectedProjectIndex] ?? null

  useEffect(() => {
    const host = hostRef.current
    if (!enabled || !host) return

    const syncBookState = () => {
      const shelf = host.querySelector('.bookshelf')
      if (!shelf) return

      const selectedNumber = Number.parseInt(
        shelf.querySelector('#counter')?.textContent || '1',
        10
      )
      if (Number.isFinite(selectedNumber)) {
        const maxIndex = Math.max(projects.length - 1, 0)
        setSelectedProjectIndex(Math.min(Math.max(selectedNumber - 1, 0), maxIndex))
      }
      setIsBookOpen(shelf.querySelector('#detail-panel')?.getAttribute('aria-hidden') === 'false')
    }

    const observer = new MutationObserver(syncBookState)
    observer.observe(host, {
      attributes: true,
      attributeFilter: ['aria-hidden', 'aria-current', 'class'],
      characterData: true,
      childList: true,
      subtree: true
    })
    syncBookState()

    return () => {
      observer.disconnect()
      closeObserverRef.current?.disconnect()
    }
  }, [enabled])

  const closeOpenedBook = () => {
    const host = hostRef.current
    const shelf = host?.querySelector('.bookshelf')
    const sourceCloseButton = host?.querySelector('#close-detail')
    if (!shelf || !sourceCloseButton) return

    closeObserverRef.current?.disconnect()
    if (!shelf.classList.contains('is-opening')) {
      sourceCloseButton.click()
      return
    }

    const observer = new MutationObserver(() => {
      if (shelf.classList.contains('is-opening')) return
      observer.disconnect()
      closeObserverRef.current = null
      sourceCloseButton.click()
    })
    closeObserverRef.current = observer
    observer.observe(shelf, { attributes: true, attributeFilter: ['class'] })
  }

  if (!enabled) return null

  return (
    <div className="completeshelf-renderer-host" ref={hostRef}>
      <Suspense fallback={<div className="bookshelf completeshelf-background" aria-hidden="true" />}>
        <BookshelfScene className={`completeshelf-background ${className}`.trim()} />
      </Suspense>
      {isBookOpen && selectedProject && (
        <aside className="completeshelf-details" aria-label={`${selectedProject.title} project details`}>
          <button
            className="completeshelf-details__close"
            type="button"
            aria-label="Close project details and return to bookshelf"
            onClick={closeOpenedBook}
          >
            <X aria-hidden="true" />
          </button>
          <div className="completeshelf-details__body">
            <h3 className="completeshelf-details__title">{selectedProject.title}</h3>
            <p className="completeshelf-details__summary">
              {selectedProject.description || selectedProject.oneLiner}
            </p>
            <h4 className="completeshelf-details__team-heading">BUILD BY</h4>
            <div className="completeshelf-details__team" aria-label="Project team">
              {selectedProject.team?.map((member) => {
                const image = member.image || member.photo
                const initials = member.avatar || member.name
                  .trim()
                  .split(/\s+/)
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join('')

                return (
                  <span
                    key={member.name}
                    className="completeshelf-details__member"
                    role="img"
                    aria-label={member.name}
                    title={member.name}
                  >
                    {image ? <img src={image} alt="" /> : initials}
                  </span>
                )
              })}
            </div>

            <div className="completeshelf-details__actions" style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(244, 238, 230, 0.15)' }}>
              <button
                type="button"
                onClick={() => setSelectedModalProject(selectedProject)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neon-cyan hover:bg-cyan-300 text-cypher-950 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-neon-cyan/20 cursor-pointer"
              >
                <span>View Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>
      )}

      {selectedModalProject && (
        <ProjectDetailModal
          project={selectedModalProject}
          onClose={() => setSelectedModalProject(null)}
        />
      )}
    </div>
  )
}

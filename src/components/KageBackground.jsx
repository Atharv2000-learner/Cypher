import { useEffect, useRef } from 'react'

export default function KageBackground() {
  const frameRef = useRef(null)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    const syncKageScroll = () => {
      const win = frame.contentWindow
      const doc = frame.contentDocument
      if (!win || !doc) return

      const outerMax = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0)
      const innerMax = Math.max(doc.documentElement.scrollHeight - win.innerHeight, 0)

      if (!outerMax) return

      const target = (window.scrollY / outerMax) * innerMax
      if (Math.abs((win.scrollY || 0) - target) > 1) {
        win.scrollTo({ top: target, behavior: 'auto' })
      }
    }

    syncKageScroll()
    window.addEventListener('scroll', syncKageScroll, { passive: true })
    window.addEventListener('resize', syncKageScroll)

    return () => {
      window.removeEventListener('scroll', syncKageScroll)
      window.removeEventListener('resize', syncKageScroll)
    }
  }, [])

  return (
    <iframe
      ref={frameRef}
      title="Kage ambient background"
      src="/landing-pages/kage-background.html"
      className="kage-background"
      aria-hidden="true"
    />
  )
}

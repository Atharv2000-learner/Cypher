import React, { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import OnePage from './pages/OnePage'

export default function App() {
  const cursorGlowRef = useRef(null)
  const cursorClickRef = useRef(null)

  // Theme state: dark by default
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('cypher-theme')
    if (savedTheme) {
      return savedTheme === 'dark'
    }
    return true // Default dark
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      root.classList.remove('light')
      localStorage.setItem('cypher-theme', 'dark')
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
      localStorage.setItem('cypher-theme', 'light')
    }
  }, [isDark])

  useEffect(() => {
    const cursorGlow = cursorGlowRef.current
    const cursorClick = cursorClickRef.current
    const supportsFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!cursorGlow || !supportsFinePointer || prefersReducedMotion) return

    let animationFrameId = null
    let pointerX = 0
    let pointerY = 0

    const handlePointerMove = (event) => {
      if (event.pointerType === 'touch') return

      pointerX = event.clientX - 200
      pointerY = event.clientY - 200
      cursorGlow.classList.add('cursor-glow-visible')

      if (animationFrameId !== null) return
      animationFrameId = requestAnimationFrame(() => {
        cursorGlow.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`
        animationFrameId = null
      })
    }

    const handlePointerDown = (event) => {
      if (event.pointerType === 'touch' || event.button !== 0) return

      pointerX = event.clientX - 200
      pointerY = event.clientY - 200
      cursorGlow.classList.add('cursor-glow-visible')
      cursorGlow.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`

      if (!cursorClick) return
      cursorClick.classList.remove('cursor-click-active')
      void cursorClick.offsetWidth
      cursorClick.classList.add('cursor-click-active')
    }

    const hideCursorGlow = () => cursorGlow.classList.remove('cursor-glow-visible')

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown, { passive: true })
    window.addEventListener('blur', hideCursorGlow)
    document.addEventListener('pointerleave', hideCursorGlow)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('blur', hideCursorGlow)
      document.removeEventListener('pointerleave', hideCursorGlow)
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const toggleTheme = () => {
    setIsDark((prev) => !prev)
  }

  return (
    <div className="relative isolate min-h-screen flex flex-col bg-transparent text-slate-900 dark:text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-800 dark:selection:text-neon-cyan-bright transition-colors duration-200">
      <div className="cypher-backdrop" aria-hidden="true" />
      <div ref={cursorGlowRef} className="cursor-glow" aria-hidden="true">
        <span ref={cursorClickRef} className="cursor-click-ripple" />
      </div>
      <div className="relative z-10 flex flex-1 flex-col">
        <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

        <main className="flex-grow">
          <OnePage />
        </main>

        <Footer />
      </div>
    </div>
  )
}

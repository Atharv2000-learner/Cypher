import React, { useEffect, useRef } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AppRoutes from './pages/AppRoutes'
import ParticleNetworkBackground from './components/ParticleNetworkBackground'

export default function App() {
  const cursorGlowRef = useRef(null)
  const cursorClickRef = useRef(null)

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('dark')
    root.classList.remove('light')
    localStorage.removeItem('cypher-theme')
  }, [])

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

      pointerX = event.clientX - cursorGlow.offsetWidth / 2
      pointerY = event.clientY - cursorGlow.offsetHeight / 2
      cursorGlow.classList.add('cursor-glow-visible')

      if (animationFrameId !== null) return
      animationFrameId = requestAnimationFrame(() => {
        cursorGlow.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`
        animationFrameId = null
      })
    }

    const handlePointerDown = (event) => {
      if (event.pointerType === 'touch' || event.button !== 0) return

      pointerX = event.clientX - cursorGlow.offsetWidth / 2
      pointerY = event.clientY - cursorGlow.offsetHeight / 2
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

  return (
    <BrowserRouter>
      <div className="app-shell relative isolate min-h-screen flex flex-col bg-transparent text-slate-100 selection:bg-neon-cyan/20 selection:text-neon-cyan-bright">
        <ParticleNetworkBackground />
        <div ref={cursorGlowRef} className="cursor-glow" aria-hidden="true">
          <span ref={cursorClickRef} className="cursor-click-ripple" />
        </div>
        <div className="relative z-10 flex flex-1 flex-col">
          <Navbar />

          <main className="flex-grow">
            <AppRoutes />
          </main>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  )
}

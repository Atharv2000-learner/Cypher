import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import OnePage from './pages/OnePage'

export default function App() {
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

  const toggleTheme = () => {
    setIsDark((prev) => !prev)
  }

  return (
    <div className="relative isolate min-h-screen flex flex-col bg-transparent text-slate-900 dark:text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-800 dark:selection:text-neon-cyan-bright transition-colors duration-200">
      <div className="cypher-backdrop" aria-hidden="true" />
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

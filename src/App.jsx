import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import Projects from './pages/Projects'
import Achievements from './pages/Achievements'
import Team from './pages/Team'
import Join from './pages/Join'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

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
    <div className="min-h-screen flex flex-col bg-cypher-950 text-slate-100 selection:bg-neon-cyan/20 selection:text-neon-cyan-bright transition-colors duration-200">
      <ScrollToTop />
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/team" element={<Team />} />
          <Route path="/join" element={<Join />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

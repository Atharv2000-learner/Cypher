import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Terminal, Menu, X, Sun, Moon, Sparkles } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'

export default function Navbar({ isDark, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  // Track window scroll for glassmorphism header enhancement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Projects', path: '/projects' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' }
  ]

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-cypher-950/85 backdrop-blur-md border-b border-slate-200 dark:border-cypher-800/80 shadow-md shadow-slate-900/5 dark:shadow-black/20'
          : 'bg-white/70 dark:bg-cypher-950/60 backdrop-blur-sm border-b border-slate-200/50 dark:border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-neon-cyan rounded-lg px-1 py-0.5"
            aria-label="Cypher Club Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cypher-900 to-cypher-850 border border-neon-cyan/40 flex items-center justify-center text-neon-cyan shadow-sm group-hover:border-neon-cyan group-hover:shadow-neon-cyan/30 transition-all duration-300">
              <Terminal className="w-5 h-5 text-neon-cyan group-hover:rotate-6 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-mono tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-neon-cyan-bright transition-colors">
                CYPHER<span className="text-cyan-600 dark:text-neon-cyan font-sans font-normal ml-1">CLUB</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase -mt-1">
                Student Tech Society
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-cyan-700 dark:text-neon-cyan bg-cyan-500/10 dark:bg-neon-cyan/10 font-semibold border border-cyan-500/30 dark:border-neon-cyan/25'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-cypher-900/80 border border-transparent'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Actions: Theme Toggle & Join CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-cypher-900 border border-slate-200 dark:border-cypher-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-cypher-700 focus:outline-none focus:ring-2 focus:ring-neon-cyan transition-colors"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            <Link
              to="/join"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-cyan-600 to-cyan-500 text-white dark:from-neon-cyan dark:to-cyan-500 dark:text-cypher-950 hover:from-cyan-500 hover:to-cyan-600 dark:hover:from-cyan-400 dark:hover:to-neon-cyan shadow-md shadow-cyan-600/20 dark:shadow-neon-cyan/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600 dark:focus:ring-neon-cyan"
            >
              <Sparkles className="w-4 h-4" />
              <span>Join Us</span>
            </Link>
          </div>

          {/* Mobile menu and theme buttons */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-cypher-900 border border-slate-200 dark:border-cypher-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-cypher-900 border border-slate-200 dark:border-cypher-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-cypher-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-cypher-800 px-4 pt-2 pb-6 space-y-1 shadow-2xl transition-all">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'text-cyan-700 dark:text-neon-cyan bg-cyan-500/10 dark:bg-neon-cyan/15 font-semibold border-l-4 border-cyan-600 dark:border-neon-cyan'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-cypher-800'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-3">
              <Link
                to="/join"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-base font-semibold bg-gradient-to-r from-cyan-600 to-cyan-500 text-white dark:from-neon-cyan dark:to-cyan-500 dark:text-cypher-950 shadow-md shadow-cyan-600/20 dark:shadow-neon-cyan/20"
              >
                <Sparkles className="w-5 h-5" />
                <span>Join Cypher Club</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

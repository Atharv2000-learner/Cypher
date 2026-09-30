import React, { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'

export default function Navbar({ isDark, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Track window scroll for glassmorphism header enhancement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#top' },
    { name: 'About', href: '#about' },
    { name: 'Events', href: '#events' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <header
      className={`navbar-enter sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-cypher-950/85 backdrop-blur-md border-b border-slate-200 dark:border-cypher-800/80 shadow-md shadow-slate-900/5 dark:shadow-black/20'
          : 'bg-white/70 dark:bg-cypher-950/60 backdrop-blur-sm border-b border-slate-200/50 dark:border-transparent'
      }`}
    >
      <div className="w-full px-3 sm:px-5">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <a
            href="#top"
            className="navbar-brand-enter flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-neon-cyan rounded-lg px-1 py-0.5"
            aria-label="CYPHER Home"
          >
            <img
              src="/assets/cypher-logo.png"
              alt="CYPHER logo"
              className="w-14 h-14 rounded-full object-cover border border-white shadow-sm"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold font-display tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-neon-cyan-bright transition-colors">
                CYPHER
              </span>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase -mt-1">
                Cyber Security Club
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:ml-auto lg:mr-3 lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                style={{ animationDelay: `${100 + index * 45}ms` }}
                className="navbar-link-enter nav-cyber-corners px-3.5 py-2 rounded-lg text-sm font-display font-medium transition-all duration-200 hover:scale-105 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border border-transparent"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions: Theme Toggle & Join CTA */}
          <div className="navbar-control-enter hidden lg:flex items-center gap-3">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-cypher-900 border border-slate-200 dark:border-cypher-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-cypher-700 focus:outline-none focus:ring-2 focus:ring-neon-cyan transition-colors"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

          </div>

          {/* Mobile menu and theme buttons */}
          <div className="navbar-control-enter flex lg:hidden items-center gap-2">
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
        <div className="navbar-drawer-enter lg:hidden bg-white/95 dark:bg-cypher-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-cypher-800 px-4 pt-2 pb-6 space-y-1 shadow-2xl transition-all">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${index * 35}ms` }}
                className="navbar-link-enter nav-cyber-corners px-4 py-3 rounded-lg text-base font-display font-medium transition-all duration-200 hover:scale-105 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

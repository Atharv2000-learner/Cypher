import React, { useState } from 'react'
import { Github, Linkedin, MessageSquare, Twitter, Instagram, Mail, MapPin, CheckCircle2, ArrowRight } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState('idle') // idle | loading | success

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (!newsletterEmail || !newsletterEmail.includes('@')) return

    setNewsletterStatus('loading')
    setTimeout(() => {
      setNewsletterStatus('success')
      setNewsletterEmail('')
    }, 800)
  }

  return (
    <footer className="bg-cypher-950/85 border-t border-cypher-850 text-slate-400 text-sm relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-neon-cyan/5 blur-3xl pointer-events-none"></div>

      <div className="w-full px-3 sm:px-5 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#top" className="inline-flex items-center gap-3 group">
              <img
                src="/assets/cypher-logo.png"
                alt="CYPHER logo"
                className="w-14 h-14 rounded-full object-cover border border-white"
              />
              <span className="text-xl font-bold font-display tracking-tight text-white">
                CYPHER
              </span>
            </a>
            <p className="text-slate-300 font-medium font-mono text-sm">
              "{siteConfig.tagline}"
            </p>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {siteConfig.socials.github && (
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-cypher-900 border border-cypher-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-neon-cyan/50 hover:bg-neon-cyan/10 transition-all"
                  aria-label="Cypher Club on GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {siteConfig.socials.linkedin && (
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-cypher-900 border border-cypher-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-neon-cyan/50 hover:bg-neon-cyan/10 transition-all"
                  aria-label="Cypher Club on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {siteConfig.socials.discord && (
                <a
                  href={siteConfig.socials.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-cypher-900 border border-cypher-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-neon-cyan/50 hover:bg-neon-cyan/10 transition-all"
                  aria-label="Cypher Club Discord Community"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              )}
              {siteConfig.socials.twitter && (
                <a
                  href={siteConfig.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-cypher-900 border border-cypher-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-neon-cyan/50 hover:bg-neon-cyan/10 transition-all"
                  aria-label="Cypher Club on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-white font-semibold uppercase font-mono tracking-wider text-xs">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#top" className="hover:text-neon-cyan transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-neon-cyan transition-colors">About Us</a>
              </li>
              <li>
                <a href="#events" className="hover:text-neon-cyan transition-colors">Events & Workshops</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-neon-cyan transition-colors">Member Projects</a>
              </li>
              <li>
                <a href="#achievements" className="hover:text-neon-cyan transition-colors">Achievements</a>
              </li>
              <li>
                <a href="#team" className="hover:text-neon-cyan transition-colors">Core Team</a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-neon-cyan transition-colors">FAQs</a>
              </li>
            </ul>
          </div>

          {/* Campus Details */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-white font-semibold uppercase font-mono tracking-wider text-xs">
              Campus Headquarters
            </h3>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-neon-cyan shrink-0 mt-0.5" />
                <span>{siteConfig.contact.location}, {siteConfig.contact.institution}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-neon-cyan shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </div>
              <p className="text-xs text-slate-400 pt-1 border-t border-cypher-800">
                <span className="text-slate-300 font-medium">Club Lab Hours:</span> {siteConfig.contact.meetingHours}
              </p>
            </div>
          </div>

          {/* Newsletter / Bulletin */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-white font-semibold uppercase font-mono tracking-wider text-xs">
              Club Dispatch
            </h3>
            <p className="text-xs text-slate-400">
              Get bi-weekly notifications for new hackathon registrations, AI paper deep-dives, and tech talks.
            </p>
            
            {newsletterStatus === 'success' ? (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Subscribed! Check your campus inbox for the next digest.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="student@university.edu"
                    required
                    aria-label="Email address for newsletter"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-cypher-900 border border-cypher-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
                  />
                  <button
                    type="submit"
                    disabled={newsletterStatus === 'loading'}
                    className="absolute right-1 top-1 bottom-1 px-3 bg-neon-cyan text-cypher-950 font-semibold rounded-md text-xs hover:bg-neon-cyan-bright transition-colors flex items-center gap-1 disabled:opacity-50"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <span className="text-[11px] text-slate-400 block">
                  Zero spam. Unsubscribe anytime.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-cypher-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-400">
            © {new Date().getFullYear()} {siteConfig.name}. Built with React, Vite & Tailwind CSS.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="#contact" className="hover:text-neon-cyan transition-colors">Contact Organizers</a>
            <span>•</span>
            <a href="#top" className="hover:text-neon-cyan transition-colors">Back to Top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

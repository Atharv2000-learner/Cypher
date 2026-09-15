import React, { useState } from 'react'
import { Mail, MapPin, Clock, Github, Linkedin, MessageSquare, Twitter, ChevronDown, HelpCircle, CheckCircle } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import ContactForm from '../components/ContactForm'
import { siteConfig } from '../data/siteConfig'
import { faqs } from '../data/faqs'

export default function Contact() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <SectionHeader
        badge="Direct Channels"
        title="Get in Touch with"
        highlight="Cypher Club"
        subtitle="Have a question about upcoming workshops, project proposals, campus collaborations, or speaking opportunities? We'd love to hear from you."
      />

      {/* Main Grid: Details & Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct info & Campus Location */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-cypher-900/60 border border-cypher-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-white">Contact Details</h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-cypher-950 border border-cypher-800 flex items-center justify-center text-neon-cyan shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-0.5">Official Club Email</span>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-neon-cyan font-medium transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-cypher-950 border border-slate-200 dark:border-cypher-800 flex items-center justify-center text-cyan-600 dark:text-neon-cyan shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-0.5">Campus Headquarters</span>
                  <span className="text-slate-800 dark:text-slate-200 block font-medium">
                    {siteConfig.contact.location}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                    {siteConfig.contact.institution}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-cypher-950 border border-slate-200 dark:border-cypher-800 flex items-center justify-center text-cyan-600 dark:text-neon-cyan shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-0.5">Lab Meeting Hours</span>
                  <span className="text-slate-800 dark:text-slate-200 block font-medium">
                    {siteConfig.contact.meetingHours}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-4 border-t border-slate-200 dark:border-cypher-800/80">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-3 uppercase tracking-wider">
                Follow & Connect
              </span>
              <div className="flex items-center gap-3">
                {siteConfig.socials.github && (
                  <a
                    href={siteConfig.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-cypher-950 border border-slate-200 dark:border-cypher-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-white hover:border-cyan-500 transition-all"
                    aria-label="Cypher GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {siteConfig.socials.linkedin && (
                  <a
                    href={siteConfig.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-cypher-950 border border-slate-200 dark:border-cypher-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-white hover:border-cyan-500 transition-all"
                    aria-label="Cypher LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {siteConfig.socials.discord && (
                  <a
                    href={siteConfig.socials.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-cypher-950 border border-slate-200 dark:border-cypher-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-white hover:border-cyan-500 transition-all"
                    aria-label="Cypher Discord"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                )}
                {siteConfig.socials.twitter && (
                  <a
                    href={siteConfig.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-cypher-950 border border-slate-200 dark:border-cypher-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-white hover:border-cyan-500 transition-all"
                    aria-label="Cypher Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>

      {/* Bonus: FAQ Section */}
      <section className="pt-8 max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase bg-cyan-500/10 dark:bg-neon-cyan/10 text-cyan-700 dark:text-neon-cyan border border-cyan-500/30 dark:border-neon-cyan/25">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Quick answers about club requirements, workshops, and participation.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx
            return (
              <div
                key={faq.question}
                className="rounded-2xl bg-white dark:bg-cypher-900/60 border border-slate-200 dark:border-cypher-800 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus:bg-slate-50 dark:focus:bg-cypher-900"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-cyan-600 dark:text-neon-cyan' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-cypher-850 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

import React, { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { faqs } from '../data/faqs'

export default function Faqs() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  return (
    <div className="w-full px-3 sm:px-5 py-8">
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
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index
            return (
              <div
                key={faq.question}
                className="card-lift rounded-2xl bg-white dark:bg-cypher-900/60 border border-slate-200 dark:border-cypher-800 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
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
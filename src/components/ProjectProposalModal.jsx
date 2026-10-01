import React, { useState, useEffect } from 'react'
import { X, Rocket, CheckCircle2, Sparkles, AlertCircle, ArrowRight } from 'lucide-react'
import { projectCategories } from '../data/projects'

export default function ProjectProposalModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'AI / ML',
    technologies: '',
    problem: '',
    leadName: '',
    email: '',
    lookingForTeammates: true
  })

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.leadName.trim() || !formData.email.trim() || !formData.problem.trim()) {
      setError('Please fill in all required fields.')
      return
    }

    setError('')
    setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    setFormData({
      title: '',
      category: 'AI / ML',
      technologies: '',
      problem: '',
      leadName: '',
      email: '',
      lookingForTeammates: true
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-xl my-auto bg-cypher-950 border border-cypher-800 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-cypher-900 border border-cypher-800 text-slate-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-display text-white">
              Proposal Received!
            </h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Thanks for submitting <strong className="text-neon-cyan">{formData.title}</strong>! The Cypher Club Technical Committee reviews project proposals weekly and will reach out to you via <strong className="text-white">{formData.email}</strong> with mentor allocation and lab resources.
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm bg-neon-cyan hover:bg-cyan-300 text-cypher-950 transition-colors"
            >
              <span>Back to Showcase</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 mb-2">
                <Rocket className="w-3.5 h-3.5 text-neon-cyan" />
                <span>Cypher Labs Incubator</span>
              </div>
              <h3 className="text-2xl font-bold font-display text-white">
                Pitch a Project Proposal
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Have a novel concept in AI, security, robotics, or web dev? Request lab sponsorship, code reviews, and fellow student contributors.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. OmniSentinel IoT Gateway"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cypher-900 border border-cypher-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-cyan"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cypher-900 border border-cypher-800 text-sm text-white focus:outline-none focus:border-neon-cyan"
                  >
                    {projectCategories.filter(c => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Tech Stack Idea
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Python, ROS2, FastAPI"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cypher-900 border border-cypher-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-cyan"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Problem & Proposed Solution *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="What challenge does this project solve? What will you build during the semester?"
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cypher-900 border border-cypher-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-cyan resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Name / Lead *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Student Name"
                    value={formData.leadName}
                    onChange={(e) => setFormData({ ...formData, leadName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cypher-900 border border-cypher-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-cyan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    University Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@college.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cypher-900 border border-cypher-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-cyan"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={formData.lookingForTeammates}
                  onChange={(e) => setFormData({ ...formData, lookingForTeammates: e.target.checked })}
                  className="rounded bg-cypher-900 border-cypher-700 text-neon-cyan focus:ring-neon-cyan"
                />
                <span>I would like Cypher Club to help pair me with student co-contributors.</span>
              </label>
            </div>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-cypher-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-neon-cyan hover:bg-cyan-300 text-cypher-950 transition-colors"
              >
                <span>Submit Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

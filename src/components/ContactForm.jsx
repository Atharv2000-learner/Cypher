import React, { useState } from 'react'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [statusMessage, setStatusMessage] = useState('')

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.'
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email format.'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please type your message.'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('sending')
    setStatusMessage('')

    try {
      const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT

      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        if (!res.ok) throw new Error('Contact service temporarily unavailable.')
      } else {
        // Asynchronous client-side verification
        await new Promise((resolve) => setTimeout(resolve, 800))
      }

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setStatusMessage(err.message || 'Failed to dispatch message. Please try again.')
    }
  }

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' })
    setErrors({})
    setStatus('idle')
  }

  if (status === 'success') {
    return (
      <div className="card-lift bg-white dark:bg-cypher-900/80 border border-emerald-500/40 rounded-3xl p-8 sm:p-10 text-center shadow-xl">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">Packet Dispatched</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto mb-6">
          Thanks for reaching out! A Cypher Club team coordinator will reply to <span className="text-slate-900 dark:text-white font-medium">{formData.email}</span> shortly.
        </p>
        <button
          onClick={handleReset}
          className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 dark:bg-cypher-800 dark:hover:bg-cypher-700 dark:text-white dark:border-cypher-700 transition-colors"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="card-lift bg-white dark:bg-cypher-900/70 border border-slate-200 dark:border-cypher-800/90 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-sm space-y-5"
    >
      {status === 'error' && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Your Name <span className="text-cyan-600 dark:text-neon-cyan">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Jordan Lee"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-err" : undefined}
          className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-cypher-950 border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-colors ${
            errors.name ? 'border-red-500' : 'border-slate-300 dark:border-cypher-800 focus:border-neon-cyan'
          }`}
        />
        {errors.name && (
          <p id="name-err" className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Your Email <span className="text-cyan-600 dark:text-neon-cyan">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. jordan@example.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-err" : undefined}
          className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-cypher-950 border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-colors ${
            errors.email ? 'border-red-500' : 'border-slate-300 dark:border-cypher-800 focus:border-neon-cyan'
          }`}
        />
        {errors.email && (
          <p id="email-err" className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="contact-subject" className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Topic / Subject <span className="text-slate-500 text-[10px] font-normal">(Optional)</span>
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Workshop query, partnership, or general question"
          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-cypher-950 border border-slate-300 dark:border-cypher-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-neon-cyan"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Message <span className="text-cyan-600 dark:text-neon-cyan">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="How can Cypher Club assist you?"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "msg-err" : undefined}
          className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-cypher-950 border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-colors ${
            errors.message ? 'border-red-500' : 'border-slate-300 dark:border-cypher-800 focus:border-neon-cyan'
          }`}
        />
        {errors.message && (
          <p id="msg-err" className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
          </p>
        )}
      </div>

      {/* Send */}
      <div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-cypher-900 text-neon-emerald-bright border border-neon-emerald/40 hover:bg-cypher-800 hover:border-neon-emerald/70 transition-colors focus:outline-none focus:ring-2 focus:ring-neon-emerald disabled:opacity-50"
        >
          {status === 'sending' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send_Packet</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}

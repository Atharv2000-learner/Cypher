import React, { useState } from 'react'
import { CheckCircle2, AlertCircle, Loader2, Sparkles, Send, ArrowRight } from 'lucide-react'

export default function JoinForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: '',
    year: '',
    interest: 'Web Development',
    githubOrLinkedin: '',
    reason: ''
  })

  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('')

  const departments = [
    'Computer Science & Engineering',
    'Information Technology',
    'Artificial Intelligence & Data Science',
    'Electronics & Communication',
    'Electrical & Electronics',
    'Mechanical Engineering',
    'Other Branch'
  ]

  const years = ['1st Year (Freshman)', '2nd Year (Sophomore)', '3rd Year (Junior)', '4th Year (Senior)']

  const interests = [
    'Web Development (Frontend / Full-Stack)',
    'Artificial Intelligence & Machine Learning',
    'Cybersecurity & CTF Defense',
    'Competitive Programming & Algorithms',
    'UI/UX Design & Branding',
    'DevOps, Cloud & Open Source'
  ]

  const validate = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.'
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter a valid name (at least 2 characters).'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.'
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.'
    }

    if (!formData.department) {
      newErrors.department = 'Please select your department.'
    }

    if (!formData.year) {
      newErrors.year = 'Please select your current year.'
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Please share why you wish to join Cypher Club.'
    } else if (formData.reason.trim().length < 20) {
      newErrors.reason = 'Please write at least 20 characters explaining your interest.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for field on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')
    setErrorMessage('')

    try {
      // Configurable endpoint integration:
      // If VITE_JOIN_FORM_ENDPOINT is configured in .env, submit via POST
      const endpoint = import.meta.env.VITE_JOIN_FORM_ENDPOINT

      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        if (!res.ok) throw new Error('Submission server returned an error.')
      } else {
        // Structured local demonstration: Simulate asynchronous network verification
        await new Promise((resolve) => setTimeout(resolve, 900))
      }

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err.message || 'An unexpected error occurred while processing your application.')
    }
  }

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      department: '',
      year: '',
      interest: 'Web Development',
      githubOrLinkedin: '',
      reason: ''
    })
    setErrors({})
    setStatus('idle')
  }

  if (status === 'success') {
    return (
      <div className="card-lift bg-white dark:bg-cypher-900/80 border border-emerald-500/40 rounded-3xl p-8 sm:p-10 text-center shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Application Received!
        </h3>
        <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6 text-sm sm:text-base leading-relaxed">
          Thank you, <span className="text-slate-900 dark:text-white font-semibold">{formData.fullName}</span>! Your registration for Cypher Club has been logged. Our student leads review new member intakes during regular club onboarding cycles.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-cypher-950/80 border border-slate-200 dark:border-cypher-800 text-left max-w-md mx-auto mb-6 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 font-mono">
          <p><span className="text-slate-500 dark:text-slate-400">Department:</span> {formData.department}</p>
          <p><span className="text-slate-500 dark:text-slate-400">Academic Year:</span> {formData.year}</p>
          <p><span className="text-slate-500 dark:text-slate-400">Track:</span> {formData.interest}</p>
          <p><span className="text-slate-500 dark:text-slate-400">Notification Email:</span> {formData.email}</p>
        </div>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 dark:bg-cypher-800 dark:hover:bg-cypher-700 dark:text-white dark:border-cypher-700 transition-colors"
        >
          Submit Another Response
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="card-lift bg-white dark:bg-cypher-900/70 border border-slate-200 dark:border-cypher-800/90 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm space-y-6"
    >
      {status === 'error' && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-300 text-sm flex items-start gap-3" role="alert">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Submission failed</p>
            <p className="text-xs text-red-500/90 dark:text-red-300/90">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Row 1: Full Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Full Name <span className="text-cyan-600 dark:text-neon-cyan">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Alex Rivera"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-cypher-950 border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-colors ${
              errors.fullName
                ? 'border-red-500/70 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                : 'border-slate-300 dark:border-cypher-800 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan'
            }`}
          />
          {errors.fullName && (
            <p id="fullName-error" className="text-xs text-red-500 dark:text-red-400 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Email Address <span className="text-cyan-600 dark:text-neon-cyan">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. alex@university.edu"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-cypher-950 border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-colors ${
              errors.email
                ? 'border-red-500/70 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                : 'border-slate-300 dark:border-cypher-800 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan'
            }`}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-red-500 dark:text-red-400 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Department & Year */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="department" className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Department / Major <span className="text-cyan-600 dark:text-neon-cyan">*</span>
          </label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            aria-invalid={!!errors.department}
            aria-describedby={errors.department ? "dept-error" : undefined}
            className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-cypher-950 border text-sm text-slate-900 dark:text-white focus:outline-none transition-colors ${
              errors.department
                ? 'border-red-500/70 focus:border-red-400'
                : 'border-slate-300 dark:border-cypher-800 focus:border-neon-cyan'
            }`}
          >
            <option value="">Select your department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {errors.department && (
            <p id="dept-error" className="text-xs text-red-500 dark:text-red-400 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.department}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="year" className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Academic Year <span className="text-cyan-600 dark:text-neon-cyan">*</span>
          </label>
          <select
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            aria-invalid={!!errors.year}
            aria-describedby={errors.year ? "year-error" : undefined}
            className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-cypher-950 border text-sm text-slate-900 dark:text-white focus:outline-none transition-colors ${
              errors.year
                ? 'border-red-500/70 focus:border-red-400'
                : 'border-slate-300 dark:border-cypher-800 focus:border-neon-cyan'
            }`}
          >
            <option value="">Select current year</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          {errors.year && (
            <p id="year-error" className="text-xs text-red-500 dark:text-red-400 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.year}
            </p>
          )}
        </div>
      </div>

      {/* Row 3: Primary Area of Interest */}
      <div>
        <label htmlFor="interest" className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Primary Area of Interest <span className="text-cyan-600 dark:text-neon-cyan">*</span>
        </label>
        <select
          id="interest"
          name="interest"
          value={formData.interest}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-cypher-950 border border-slate-300 dark:border-cypher-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-neon-cyan"
        >
          {interests.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      {/* Row 4: GitHub or LinkedIn (Optional) */}
      <div>
        <label htmlFor="githubOrLinkedin" className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-700 dark:text-slate-300 mb-2">
          GitHub or LinkedIn Profile <span className="text-slate-500 text-[10px] font-normal">(Optional)</span>
        </label>
        <input
          id="githubOrLinkedin"
          name="githubOrLinkedin"
          type="url"
          value={formData.githubOrLinkedin}
          onChange={handleChange}
          placeholder="https://github.com/your-username"
          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-cypher-950 border border-slate-300 dark:border-cypher-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-neon-cyan transition-colors"
        />
      </div>

      {/* Row 5: Motivation / Why join? */}
      <div>
        <label htmlFor="reason" className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Why do you want to join Cypher Club? <span className="text-cyan-600 dark:text-neon-cyan">*</span>
        </label>
        <textarea
          id="reason"
          name="reason"
          rows={4}
          value={formData.reason}
          onChange={handleChange}
          placeholder="Tell us about what you want to learn, what projects you wish to build, or how you want to contribute..."
          aria-invalid={!!errors.reason}
          aria-describedby={errors.reason ? "reason-error" : undefined}
          className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-cypher-950 border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-colors ${
            errors.reason
              ? 'border-red-500/70 focus:border-red-400 focus:ring-1 focus:ring-red-400'
              : 'border-slate-300 dark:border-cypher-800 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan'
          }`}
        />
        {errors.reason && (
          <p id="reason-error" className="text-xs text-red-500 dark:text-red-400 mt-1.5 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.reason}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-neon-cyan to-cyan-500 text-cypher-950 hover:from-cyan-300 hover:to-neon-cyan shadow-lg shadow-neon-cyan/20 hover:shadow-neon-cyan/35 transition-all duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-cypher-950"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting Application...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Join Cypher Club</span>
            </>
          )}
        </button>
        <span className="block mt-2 text-[11px] text-slate-500 dark:text-slate-400">
          Submissions are stored securely and reviewed by the student committee.
        </span>
      </div>
    </form>
  )
}

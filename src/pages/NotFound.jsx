import React from 'react'
import { Link } from 'react-router-dom'
import { Terminal, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-cypher-900 border border-neon-cyan/40 text-neon-cyan flex items-center justify-center mx-auto">
        <Terminal className="w-8 h-8" />
      </div>
      <div className="font-mono text-neon-cyan text-sm tracking-widest uppercase">
        Error 404 // Segment Not Found
      </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
        Lost in Cyberspace?
      </h1>
      <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
        The requested path does not exist or may have moved. Return to the Cypher Club portal to find what you're looking for.
      </p>
      <div className="pt-4 flex items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-neon-cyan text-cypher-950 hover:bg-neon-cyan-bright transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  )
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cypher: {
          950: '#060911',
          900: '#0b1120',
          850: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
          400: '#94a3b8',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f1f5f9',
          50: '#f8fafc',
        },
        neon: {
          cyan: '#06b6d4',
          'cyan-bright': '#22d3ee',
          violet: '#8b5cf6',
          'violet-bright': '#a78bfa',
          emerald: '#10b981',
          'emerald-bright': '#34d399',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Orbitron', 'Rajdhani', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'Fira Code', 'monospace'],
        display: ['Black Future', 'Orbitron', 'sans-serif'],
      },
      backgroundImage: {
        'cyber-grid': "radial-gradient(circle, rgba(14, 165, 233, 0.08) 1px, transparent 1px)",
        'cyber-grid-light': "radial-gradient(circle, rgba(14, 165, 233, 0.15) 1px, transparent 1px)",
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

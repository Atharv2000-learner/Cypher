import React from 'react'
import { 
  Scan, Shield, Cpu, QrCode, Lock, Terminal, 
  Radio, Layers, Compass, Code2, Sparkles, Activity
} from 'lucide-react'

/**
 * High-tech futuristic vector banner for Cypher Club projects.
 * Renders custom SVG cyber visuals tailored to each project domain.
 */
export default function ProjectBanner({ 
  bannerType = 'generic', 
  title = '', 
  accentColor = 'cyan', 
  className = '',
  aspectRatio = 'aspect-[16/9]'
}) {
  // Accent gradient mappings
  const accents = {
    cyan: {
      from: '#06b6d4',
      to: '#22d3ee',
      glow: 'rgba(6, 182, 212, 0.4)',
      bg: 'from-cyan-950/60 via-cypher-900 to-cypher-950',
      border: 'border-cyan-500/30'
    },
    blue: {
      from: '#2563eb',
      to: '#60a5fa',
      glow: 'rgba(59, 130, 246, 0.4)',
      bg: 'from-blue-950/60 via-cypher-900 to-cypher-950',
      border: 'border-blue-500/30'
    },
    violet: {
      from: '#7c3aed',
      to: '#c084fc',
      glow: 'rgba(139, 92, 246, 0.4)',
      bg: 'from-purple-950/60 via-cypher-900 to-cypher-950',
      border: 'border-purple-500/30'
    },
    emerald: {
      from: '#059669',
      to: '#34d399',
      glow: 'rgba(16, 185, 129, 0.4)',
      bg: 'from-emerald-950/60 via-cypher-900 to-cypher-950',
      border: 'border-emerald-500/30'
    }
  }

  const currentAccent = accents[accentColor] || accents.cyan

  return (
    <div className={`relative w-full overflow-hidden rounded-xl bg-gradient-to-br ${currentAccent.bg} border ${currentAccent.border} ${aspectRatio} ${className} group/banner`}>
      {/* Background Cyber Grid */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none transition-transform duration-700 group-hover/banner:scale-105"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Ambient Radial Glow */}
      <div 
        className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-40 pointer-events-none transition-opacity duration-500 group-hover/banner:opacity-70"
        style={{ background: currentAccent.glow }}
      />
      <div 
        className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: currentAccent.glow }}
      />

      {/* SVG Domain Graphics based on bannerType */}
      {bannerType === 'agrovision' && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <svg className="w-full h-full max-w-[320px] max-h-[180px]" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Target Reticle */}
            <circle cx="160" cy="90" r="60" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 4" className="animate-spin" style={{ animationDuration: '40s' }} />
            <circle cx="160" cy="90" r="42" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.6" />
            
            {/* Corner bounding brackets */}
            <path d="M 110 50 L 110 40 L 120 40" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
            <path d="M 210 50 L 210 40 L 200 40" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
            <path d="M 110 130 L 110 140 L 120 140" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
            <path d="M 210 130 L 210 140 L 200 140" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />

            {/* Neural Leaf Contour */}
            <path 
              d="M 160 52 C 190 70 200 100 160 128 C 120 100 130 70 160 52 Z" 
              fill="url(#leafGrad)" 
              fillOpacity="0.25" 
              stroke="#10b981" 
              strokeWidth="2" 
            />
            {/* Leaf Vein Structure */}
            <path d="M 160 54 L 160 126" stroke="#34d399" strokeWidth="1.5" strokeDasharray="2 2" />
            <path d="M 160 75 Q 175 80 185 88" stroke="#34d399" strokeWidth="1" />
            <path d="M 160 85 Q 145 90 135 98" stroke="#34d399" strokeWidth="1" />
            <path d="M 160 98 Q 175 105 182 112" stroke="#34d399" strokeWidth="1" />

            {/* Pathogen Detection Box */}
            <rect x="175" y="70" width="36" height="24" rx="4" fill="#0b1120" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.8" />
            <text x="180" y="86" fill="#f59e0b" fontSize="8" fontFamily="monospace" fontWeight="bold">98.4%</text>

            {/* Telemetry Waveform */}
            <path d="M 20 150 L 80 150 L 95 138 L 105 162 L 115 150 L 300 150" stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.4" />
            
            <defs>
              <linearGradient id="leafGrad" x1="160" y1="52" x2="160" y2="128" gradientUnits="userSpaceOnUse">
                <stop stopColor="#10b981" />
                <stop offset="1" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}

      {bannerType === 'aegisguard' && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <svg className="w-full h-full max-w-[320px] max-h-[180px]" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Hexagonal Shield Mesh */}
            <polygon points="160,35 210,65 210,120 160,150 110,120 110,65" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.5" fill="#1e293b" fillOpacity="0.2" />
            <polygon points="160,50 198,72 198,114 160,136 122,114 122,72" stroke="#60a5fa" strokeWidth="1.5" fill="none" />
            
            {/* Center Core Shield */}
            <path d="M 160 62 L 185 75 L 185 105 Q 185 125 160 135 Q 135 125 135 105 L 135 75 Z" fill="#2563eb" fillOpacity="0.3" stroke="#60a5fa" strokeWidth="2" />
            
            {/* Attack Vector Rays */}
            <line x1="60" y1="90" x2="110" y2="90" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
            <polygon points="112,90 104,86 104,94" fill="#ef4444" />
            <text x="50" y="82" fill="#ef4444" fontSize="8" fontFamily="monospace">INTRUSION</text>

            <line x1="210" y1="90" x2="260" y2="90" stroke="#10b981" strokeWidth="1.5" />
            <text x="220" y="82" fill="#10b981" fontSize="8" fontFamily="monospace">DEFENDED</text>

            {/* eBPF Syscall Trace Matrix */}
            <text x="35" y="145" fill="#64748b" fontSize="7" fontFamily="monospace">sys_execve(sandbox/payload) -&gt; 0x0 [BLOCKED]</text>
            <text x="35" y="157" fill="#38bdf8" fontSize="7" fontFamily="monospace">eBPF ring_buffer: 1,248 packets/sec</text>
          </svg>
        </div>
      )}

      {bannerType === 'neuropulse' && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <svg className="w-full h-full max-w-[320px] max-h-[180px]" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 360 LiDAR Sweep Rings */}
            <circle cx="160" cy="90" r="70" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.4" />
            <circle cx="160" cy="90" r="48" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.5" />
            <circle cx="160" cy="90" r="26" stroke="#c084fc" strokeWidth="1" strokeOpacity="0.6" />

            {/* Sweep Ray */}
            <line x1="160" y1="90" x2="225" y2="40" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
            
            {/* Point Cloud Clusters */}
            <circle cx="215" cy="45" r="2.5" fill="#f43f5e" />
            <circle cx="220" cy="50" r="2" fill="#f43f5e" />
            <circle cx="228" cy="48" r="2" fill="#f43f5e" />
            <text x="210" y="32" fill="#f43f5e" fontSize="7" fontFamily="monospace">OBSTACLE 0.8m</text>

            <circle cx="105" cy="115" r="2" fill="#34d399" />
            <circle cx="98" cy="120" r="2.5" fill="#34d399" />
            <circle cx="112" cy="125" r="2" fill="#34d399" />
            <text x="75" y="140" fill="#34d399" fontSize="7" fontFamily="monospace">CLEAR CORRIDOR</text>

            {/* Rover Schematic */}
            <rect x="150" y="80" width="20" height="20" rx="3" fill="#0f172a" stroke="#c084fc" strokeWidth="1.5" />
            <rect x="146" y="83" width="3" height="14" rx="1" fill="#8b5cf6" />
            <rect x="171" y="83" width="3" height="14" rx="1" fill="#8b5cf6" />
            <circle cx="160" cy="90" r="3" fill="#22d3ee" />

            {/* Telemetry info */}
            <text x="30" y="30" fill="#a855f7" fontSize="8" fontFamily="monospace" fontWeight="bold">ROS2 SLAM :: CARTOGRAPHER</text>
            <text x="30" y="42" fill="#94a3b8" fontSize="7" fontFamily="monospace">IMU Yaw: +14.2° | Latency: 12ms</text>
          </svg>
        </div>
      )}

      {bannerType === 'campusflow' && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <svg className="w-full h-full max-w-[320px] max-h-[180px]" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Dynamic QR Scanner Grid */}
            <rect x="120" y="40" width="80" height="80" rx="10" fill="#0b1120" stroke="#10b981" strokeWidth="1.5" />
            {/* Mini QR modules */}
            <rect x="130" y="50" width="16" height="16" fill="#34d399" rx="2" />
            <rect x="134" y="54" width="8" height="8" fill="#0b1120" rx="1" />
            <rect x="174" y="50" width="16" height="16" fill="#34d399" rx="2" />
            <rect x="178" y="54" width="8" height="8" fill="#0b1120" rx="1" />
            <rect x="130" y="94" width="16" height="16" fill="#34d399" rx="2" />
            <rect x="134" y="98" width="8" height="8" fill="#0b1120" rx="1" />
            <rect x="154" y="72" width="12" height="12" fill="#22d3ee" rx="2" />
            <rect x="172" y="88" width="8" height="8" fill="#10b981" />
            <rect x="156" y="96" width="6" height="6" fill="#34d399" />

            {/* Glowing Laser Scan Bar */}
            <line x1="115" y1="80" x2="205" y2="80" stroke="#34d399" strokeWidth="2" strokeDasharray="2 1" />

            {/* TOTP Counter */}
            <text x="132" y="138" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold">VALID [0.4s]</text>
            <text x="35" y="158" fill="#64748b" fontSize="7" fontFamily="monospace">TOTP Seed: 8f92a10b... | 14,000+ Verified</text>
          </svg>
        </div>
      )}

      {bannerType === 'ciphervault' && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <svg className="w-full h-full max-w-[320px] max-h-[180px]" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Vault Dial */}
            <circle cx="160" cy="85" r="55" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="6 3" />
            <circle cx="160" cy="85" r="42" fill="#0f172a" stroke="#a78bfa" strokeWidth="1.5" />
            <circle cx="160" cy="85" r="22" fill="#1e1b4b" stroke="#c084fc" strokeWidth="2" />
            
            {/* Keyhole / Shield Core */}
            <path d="M 160 76 L 165 83 L 163 94 L 157 94 L 155 83 Z" fill="#22d3ee" />
            
            {/* Cryptographic hash lines */}
            <text x="35" y="152" fill="#c084fc" fontSize="8" fontFamily="monospace">Argon2id (m=64MB, t=3, p=4)</text>
            <text x="35" y="164" fill="#64748b" fontSize="7" fontFamily="monospace">AES-256-GCM authenticated cipher block</text>
          </svg>
        </div>
      )}

      {bannerType === 'devmorph' && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <svg className="w-full h-full max-w-[320px] max-h-[180px]" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Code Diff Box */}
            <rect x="50" y="35" width="220" height="110" rx="8" fill="#0b1120" stroke="#06b6d4" strokeWidth="1.5" />
            <rect x="50" y="35" width="220" height="22" rx="8" fill="#0f172a" />
            <circle cx="62" cy="46" r="3" fill="#ef4444" />
            <circle cx="72" cy="46" r="3" fill="#f59e0b" />
            <circle cx="82" cy="46" r="3" fill="#10b981" />
            <text x="96" y="49" fill="#94a3b8" fontSize="8" fontFamily="monospace">pr-security-audit.yml</text>

            <rect x="60" y="68" width="200" height="16" fill="#ef4444" fillOpacity="0.15" rx="3" />
            <text x="65" y="79" fill="#f87171" fontSize="8" fontFamily="monospace">- const API_KEY = "AKIA..." // [HARDCODED SECRET]</text>

            <rect x="60" y="90" width="200" height="16" fill="#10b981" fillOpacity="0.15" rx="3" />
            <text x="65" y="101" fill="#4ade80" fontSize="8" fontFamily="monospace">+ const API_KEY = process.env.API_KEY</text>

            <text x="65" y="128" fill="#38bdf8" fontSize="8" fontFamily="monospace">✓ DevMorph Bot: PR passed security gate</text>
          </svg>
        </div>
      )}

      {bannerType === 'pulsemetric' && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <svg className="w-full h-full max-w-[320px] max-h-[180px]" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Wi-Fi Wave Radiation */}
            <circle cx="160" cy="120" r="20" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="160" cy="120" r="45" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.7" />
            <circle cx="160" cy="120" r="70" stroke="#2563eb" strokeWidth="1" strokeDasharray="5 5" strokeOpacity="0.4" />
            <circle cx="160" cy="120" r="4" fill="#60a5fa" />

            {/* Time-Series Forecast Curve */}
            <path d="M 40 100 Q 100 50 160 80 T 280 60" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
            <circle cx="160" cy="80" r="4" fill="#22d3ee" stroke="#0b1120" strokeWidth="1.5" />
            <text x="140" y="70" fill="#22d3ee" fontSize="8" fontFamily="monospace" fontWeight="bold">PEAK SPURT</text>

            <text x="35" y="155" fill="#94a3b8" fontSize="8" fontFamily="monospace">Library AP 04: 98.2 Mbps | Ping: 9ms</text>
          </svg>
        </div>
      )}

      {bannerType === 'autograde' && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <svg className="w-full h-full max-w-[320px] max-h-[180px]" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Sandbox Jailing Cage */}
            <rect x="60" y="40" width="200" height="100" rx="8" fill="#0b1120" stroke="#10b981" strokeWidth="1.5" />
            
            {/* Test Case Badges */}
            <rect x="75" y="55" width="70" height="24" rx="4" fill="#065f46" fillOpacity="0.4" stroke="#10b981" strokeWidth="1" />
            <text x="82" y="70" fill="#34d399" fontSize="8" fontFamily="monospace">TEST 01: PASS (2ms)</text>

            <rect x="155" y="55" width="70" height="24" rx="4" fill="#065f46" fillOpacity="0.4" stroke="#10b981" strokeWidth="1" />
            <text x="162" y="70" fill="#34d399" fontSize="8" fontFamily="monospace">TEST 02: PASS (4ms)</text>

            <rect x="75" y="90" width="150" height="22" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <text x="82" y="104" fill="#94a3b8" fontSize="7" fontFamily="monospace">cgroups: mem_limit=256MB | syscall=seccomp_bpf</text>

            <text x="75" y="128" fill="#10b981" fontSize="9" fontFamily="monospace" fontWeight="bold">ALL 50 TEST SUITES VERIFIED [100/100]</text>
          </svg>
        </div>
      )}

      {bannerType === 'sentinelshield' && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <svg className="w-full h-full max-w-[320px] max-h-[180px]" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* PCB Trace Outline */}
            <rect x="90" y="50" width="140" height="80" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
            
            {/* USB-C Connector */}
            <rect x="65" y="72" width="25" height="36" rx="4" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
            
            {/* Microcontroller Chip */}
            <rect x="130" y="70" width="40" height="40" rx="4" fill="#0f172a" stroke="#60a5fa" strokeWidth="1.5" />
            <text x="134" y="94" fill="#60a5fa" fontSize="8" fontFamily="monospace" fontWeight="bold">STM32</text>
            
            {/* Capacitive Touch Ring */}
            <circle cx="195" cy="90" r="14" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="195" cy="90" r="6" fill="#f59e0b" />
            <text x="180" y="118" fill="#fbbf24" fontSize="7" fontFamily="monospace">TOUCH</text>

            <text x="40" y="152" fill="#38bdf8" fontSize="8" fontFamily="monospace">WebAuthn / FIDO2 CTAP2.1 Hardware Token</text>
          </svg>
        </div>
      )}

      {bannerType === 'aerotrace' && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <svg className="w-full h-full max-w-[320px] max-h-[180px]" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Quadcopter Wireframe */}
            <line x1="120" y1="60" x2="200" y2="120" stroke="#c084fc" strokeWidth="2" />
            <line x1="120" y1="120" x2="200" y2="60" stroke="#c084fc" strokeWidth="2" />
            
            {/* Rotor Rings */}
            <circle cx="120" cy="60" r="16" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 2" />
            <circle cx="200" cy="60" r="16" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 2" />
            <circle cx="120" cy="120" r="16" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 2" />
            <circle cx="200" cy="120" r="16" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 2" />

            {/* Central Fuselage */}
            <circle cx="160" cy="90" r="14" fill="#0f172a" stroke="#22d3ee" strokeWidth="2" />
            
            {/* Attitude Vector */}
            <line x1="160" y1="90" x2="160" y2="65" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />

            <text x="35" y="155" fill="#c084fc" fontSize="8" fontFamily="monospace">MAVLink 2.0 :: Alt 42m | Battery 86% | RTL: Armed</text>
          </svg>
        </div>
      )}

      {/* Generic fallback cyber graphic */}
      {(!bannerType || bannerType === 'generic') && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          <div className="w-16 h-16 rounded-2xl bg-cypher-950/80 border border-cyan-500/40 flex items-center justify-center shadow-lg shadow-cyan-950/40 mb-3 group-hover/banner:scale-110 transition-transform">
            <Cpu className="w-8 h-8 text-neon-cyan" />
          </div>
          <span className="font-mono text-xs text-slate-300 uppercase tracking-widest">{title}</span>
        </div>
      )}

      {/* Cyber Corner Marks */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-cyan-400/60 pointer-events-none" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-cyan-400/60 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-cyan-400/60 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-cyan-400/60 pointer-events-none" />
    </div>
  )
}

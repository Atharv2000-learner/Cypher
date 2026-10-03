/**
 * Cypher Club - Member Projects Data & Configuration
 * 
 * Reusable data structure for all club technology projects, categories,
 * statistics, and status configurations.
 * 
 * To add a new project, simply append a new object to the `projects` array.
 */

export const projectCategories = [
  "All",
  "AI / ML",
  "Web Development",
  "App Development",
  "IoT",
  "Cybersecurity",
  "Data Science",
  "Automation",
  "Other"
];

export const projectStatuses = {
  Active: {
    label: "Active",
    color: "#10b981",
    bgClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    dotClass: "bg-emerald-400 shadow-[0_0_8px_#10b981]",
    pulseClass: "animate-ping"
  },
  Completed: {
    label: "Completed",
    color: "#3b82f6",
    bgClass: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    dotClass: "bg-blue-400 shadow-[0_0_8px_#3b82f6]",
    pulseClass: ""
  },
  "In Development": {
    label: "In Development",
    color: "#f59e0b",
    bgClass: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    dotClass: "bg-amber-400 shadow-[0_0_8px_#f59e0b]",
    pulseClass: "animate-pulse"
  },
  Archived: {
    label: "Archived",
    color: "#94a3b8",
    bgClass: "bg-slate-500/10 text-slate-400 border-slate-500/30",
    dotClass: "bg-slate-400",
    pulseClass: ""
  }
};

export const projectStats = [
  {
    id: "stats-projects",
    number: 25,
    suffix: "+",
    label: "Projects",
    subtext: "Production apps & lab research",
    icon: "FolderGit2",
    accent: "cyan"
  },
  {
    id: "stats-contributors",
    number: 50,
    suffix: "+",
    label: "Contributors",
    subtext: "Student engineers & designers",
    icon: "Users",
    accent: "violet"
  },
  {
    id: "stats-tech",
    number: 10,
    suffix: "+",
    label: "Technologies",
    subtext: "Cutting-edge tools & stacks",
    icon: "Cpu",
    accent: "blue"
  },
  {
    id: "stats-domains",
    number: 8,
    suffix: "+",
    label: "Domains",
    subtext: "From AI & SecOps to Robotics",
    icon: "Layers",
    accent: "emerald"
  }
];

export const projects = [
  {
    id: "agrovision-ai",
    title: "AgroVision AI",
    oneLiner: "AI-powered crop and plant disease detection platform designed to help farmers identify diseases and make better agricultural decisions.",
    description: "An edge-accelerated computer vision platform that detects 38+ plant foliar diseases in real-time from smartphone camera feeds, providing instant organic treatment recommendations and regional pathogen outbreak risk heatmaps.",
    category: "AI / ML",
    status: "Active",
    featured: true,
    year: "2025",
    accentColor: "cyan",
    bannerType: "agrovision",
    image: null,
    github: "https://github.com/cypher-club/agrovision-ai",
    demo: "https://agrovision.cypherclub.tech",
    documentation: "https://docs.cypherclub.tech/projects/agrovision",
    videoDemo: "https://youtube.com/watch?v=cypher-agrovision-demo",
    technologies: ["AI", "Python", "Computer Vision", "React", "Firebase", "TensorFlow", "FastAPI"],
    techCategories: {
      "AI / Core": ["TensorFlow Lite", "OpenCV", "MobileNetV3", "Python 3.11"],
      Frontend: ["React 18", "Tailwind CSS", "Vite PWA", "Lucide Icons"],
      Backend: ["FastAPI", "Uvicorn", "Docker"],
      Cloud: ["Firebase Firestore", "Google Cloud Run", "GeoJSON Maps"]
    },
    team: [
      { name: "Rohan Sharma", role: "AI & CV Lead", github: "https://github.com", avatar: "RS" },
      { name: "Ananya Patel", role: "Frontend Architect", github: "https://github.com", avatar: "AP" },
      { name: "Vikram Rao", role: "Cloud & Edge ML", github: "https://github.com", avatar: "VR" }
    ],
    problem: "Crop foliar diseases destroy up to 40% of agricultural yields annually in developing farming clusters. Smallholder farmers lack immediate access to certified agronomists and laboratory diagnostics, resulting in delayed treatments, pesticide overuse, and severe harvest losses.",
    solution: "AgroVision AI provides an offline-capable progressive web application running quantized neural models directly on low-spec smartphones. In under 2 seconds, it diagnoses foliar anomalies with 98.4% accuracy and provides multilingual organic remediation regimens.",
    features: [
      {
        icon: "Scan",
        title: "Sub-2s Real-time Leaf Scanner",
        description: "Zero-latency on-device inference using quantized MobileNetV3 with bounding-box pathology overlay."
      },
      {
        icon: "Languages",
        title: "Multilingual Agronomy Bot",
        description: "Localized agricultural voice & text guidance in 6 regional languages powered by quantized LLM."
      },
      {
        icon: "Activity",
        title: "Epidemic Risk Heatmap",
        description: "Anonymized geo-spatial sensor telemetry aggregating foliar outbreaks across regional agricultural blocks."
      },
      {
        icon: "ShieldAlert",
        title: "Offline-First Resilience",
        description: "Full PWA caching with IndexedDB ensuring full diagnostic capability in remote farmlands without 4G."
      }
    ],
    architecture: {
      stages: [
        { step: "01", name: "Camera Ingress", desc: "Mobile PWA capture / video frame stream" },
        { step: "02", name: "Edge Normalization", desc: "OpenCV bilinear crop & color balance" },
        { step: "03", name: "TFLite Quantized Model", desc: "38-class leaf pathology classification" },
        { step: "04", name: "FastAPI Advisory Engine", desc: "Multilingual remediation & risk scoring" },
        { step: "05", name: "GeoJSON Map Telemetry", desc: "Anonymized pathogen outbreak cluster log" }
      ]
    },
    impact: [
      { metric: "98.4%", label: "Diagnostic Accuracy", note: "Tested across 12,000+ benchmark agricultural datasets" },
      { metric: "< 1.8s", label: "Inference Latency", note: "Benchmarked on budget Android devices" },
      { metric: "450+", label: "Pilot Farmer Testers", note: "Active pilots across 3 regional agricultural cooperatives" },
      { metric: "1st Place", label: "National AgriHack", note: "Awarded Best Sustainable Tech Innovation 2025" }
    ]
  },
  {
    id: "aegisguard-ctf",
    title: "AegisGuard Threat Intelligence",
    oneLiner: "Real-time network security honeypot, automated vulnerability analyzer, and student CTF simulation arena.",
    description: "A defense-grade cyber range platform built for ethical hacking practice, featuring kernel-level eBPF intrusion telemetry, ephemeral docker challenge sandboxes, and automated MITRE ATT&CK kill-chain mapping.",
    category: "Cybersecurity",
    status: "Active",
    featured: true,
    year: "2025",
    accentColor: "blue",
    bannerType: "aegisguard",
    image: null,
    github: "https://github.com/cypher-club/aegisguard-ctf",
    demo: "https://aegisguard.cypherclub.tech",
    documentation: "https://docs.cypherclub.tech/projects/aegisguard",
    videoDemo: "https://youtube.com/watch?v=cypher-aegisguard-demo",
    technologies: ["Python", "Go", "Docker", "React", "eBPF", "Wireshark", "Tailwind CSS"],
    techCategories: {
      "Kernel & SecOps": ["Linux eBPF", "BCC Probes", "iptables / Netfilter", "Wireshark PCAP"],
      Backend: ["Go (Golang)", "gRPC", "Docker Engine API", "Redis Pub/Sub"],
      Frontend: ["React 18", "WebGL Threat Map", "JetBrains Mono UI", "Tailwind CSS"],
      Infra: ["Firecracker MicroVMs", "Kubernetes", "Prometheus"]
    },
    team: [
      { name: "Devendra Singh", role: "SecOps & Kernel Lead", github: "https://github.com", avatar: "DS" },
      { name: "Priya Deshmukh", role: "Go Backend Engineer", github: "https://github.com", avatar: "PD" },
      { name: "Kabir Mehra", role: "Frontend UI/UX", github: "https://github.com", avatar: "KM" }
    ],
    problem: "Cybersecurity students struggle to gain realistic adversarial defense skills. Traditional static challenge labs lack live network telemetry, reactive defenders, and kernel-level visibility, failing to mirror modern enterprise SOC environments.",
    solution: "AegisGuard provisions microVM sandboxes in under 400ms where students execute exploit payloads and defensive counter-measures while eBPF kernel probes capture syscall telemetry, visualizing attack vectors across MITRE ATT&CK matrices in real time.",
    features: [
      {
        icon: "Shield",
        title: "Ephemeral Challenge Sandboxes",
        description: "MicroVM-isolated attack targets spinning up on demand with zero host network exposure."
      },
      {
        icon: "Terminal",
        title: "Live eBPF Syscall Telemetry",
        description: "Kernel-level monitoring capturing execve, socket connect, and unauthorized privilege escalation."
      },
      {
        icon: "Radar",
        title: "MITRE ATT&CK Matrix Visualizer",
        description: "Automatic tagging of student exploits into standard tactical kill-chain categories."
      },
      {
        icon: "Flag",
        title: "Dynamic Flag Generator",
        description: "HMAC-salted dynamic flags preventing student solution sharing during competitive CTFs."
      }
    ],
    architecture: {
      stages: [
        { step: "01", name: "Student Target Ingress", desc: "Envoy gateway with TLS & rate limiting" },
        { step: "02", name: "Firecracker MicroVM", desc: "Kernel-isolated challenge container" },
        { step: "03", name: "eBPF Probe Daemon", desc: "Low-overhead Linux kernel event tracing" },
        { step: "04", name: "Go Telemetry Pipeline", desc: "gRPC event streaming to Redis Pub/Sub" },
        { step: "05", name: "SIEM Radar Interface", desc: "Live WebGL packet waveform & MITRE graph" }
      ]
    },
    impact: [
      { metric: "1,200+", label: "Exploits Evaluated", note: "Captured across university-wide CTF tournaments" },
      { metric: "350ms", label: "Sandbox Spin-up", note: "Instant sandbox initialization on Docker/Firecracker" },
      { metric: "100%", label: "Host Isolation", note: "Zero VM escapes verified by club red team audits" },
      { metric: "4 Univs", label: "Adopted By Labs", note: "Used as training curriculum for collegiate infosec" }
    ]
  },
  {
    id: "neuropulse-rover",
    title: "NeuroPulse Autonomous IoT Rover",
    oneLiner: "Edge-computed LiDAR obstacle avoidance and hazardous environment exploration rover.",
    description: "An autonomous tracked robotics platform engineered for physical inspection of campus utility tunnels, high-voltage rooms, and industrial ducts using 2D/3D SLAM, thermal anomaly detection, and sub-15ms WebRTC telemetry.",
    category: "IoT",
    status: "In Development",
    featured: true,
    year: "2025",
    accentColor: "violet",
    bannerType: "neuropulse",
    image: null,
    github: "https://github.com/cypher-club/neuropulse-rover",
    demo: "https://neuropulse.cypherclub.tech",
    documentation: "https://docs.cypherclub.tech/projects/neuropulse",
    videoDemo: "https://youtube.com/watch?v=cypher-neuropulse-demo",
    technologies: ["Embedded C++", "ROS2", "Python", "ESP32", "OpenCV", "MQTT", "React"],
    techCategories: {
      "Robotics & Hardware": ["ROS2 Humble", "RPLiDAR A1M8", "ESP32 Dual-Core", "STM32 Motor Drivers"],
      "Perception & CV": ["OpenCV", "Point Cloud Library (PCL)", "Thermal FLIR Lepton", "Cartographer SLAM"],
      Connectivity: ["micro-XRCE-DDS", "MQTT over Wi-Fi 6", "WebRTC Video Streaming"],
      Software: ["React Ground Station", "Three.js 3D Viewer", "Python FastAPI"]
    },
    team: [
      { name: "Aryan Joshi", role: "Robotics Hardware Lead", github: "https://github.com", avatar: "AJ" },
      { name: "Tanvi Nair", role: "ROS2 & SLAM Specialist", github: "https://github.com", avatar: "TN" },
      { name: "Sameer Khan", role: "Firmware & Telemetry", github: "https://github.com", avatar: "SK" }
    ],
    problem: "Routine inspections of campus underground utility corridors and hazardous electrical transformer vaults pose electrical arc-flash and toxic gas inhalation hazards to human maintenance staff.",
    solution: "NeuroPulse provides an autonomous tele-operated all-terrain rover built with off-the-shelf components costing under $350. It navigates GPS-denied environments using LiDAR SLAM and streams real-time environmental telemetry to an operator web dashboard.",
    features: [
      {
        icon: "Cpu",
        title: "2D/3D Cartographer SLAM",
        description: "Real-time occupancy grid mapping in GPS-denied tunnels using 360-degree LiDAR laser sweeps."
      },
      {
        icon: "Flame",
        title: "Multi-Gas & Thermal Array",
        description: "Continuous telemetry for methane (CH4), carbon monoxide (CO), and infrared hotspot anomalies."
      },
      {
        icon: "Radio",
        title: "Ultra-Low Latency Cockpit",
        description: "Sub-15ms hardware-accelerated H.264 video streaming over WebRTC with virtual joystick control."
      },
      {
        icon: "Compass",
        title: "Dead-Reckoning Fail-Safe",
        description: "Automated reverse path retracing upon radio link loss to recover telemetry connection."
      }
    ],
    architecture: {
      stages: [
        { step: "01", name: "Sensor Acquisition", desc: "RPLiDAR A1 + BNO055 IMU + ESP32" },
        { step: "02", name: "micro-XRCE Bridge", desc: "High-speed DDS bridge to Raspberry Pi 5" },
        { step: "03", name: "ROS2 SLAM Node", desc: "Cartographer 2D spatial grid calculation" },
        { step: "04", name: "MQTT & WebRTC Stream", desc: "Telemetry and low-latency video uplink" },
        { step: "05", name: "React Web Cockpit", desc: "Three.js 3D point cloud & gamepad HUD" }
      ]
    },
    impact: [
      { metric: "15,000 sq ft", label: "Tunnel Mapped", note: "Autonomous mapping completed in 22 minutes" },
      { metric: "< 15ms", label: "Control Latency", note: "Direct peer-to-peer WebRTC streaming" },
      { metric: "< $350", label: "Hardware BOM", note: "90% cheaper than commercial inspection rovers" },
      { metric: "Top 3", label: "RoboCup Regional", note: "Podium finish in Autonomous Exploration track" }
    ]
  },
  {
    id: "campusflow-nexus",
    title: "CampusFlow: Event & Pass Nexus",
    oneLiner: "High-speed campus resource scheduler and cryptographic QR event pass generator for 4,000+ students.",
    description: "A high-concurrency event registration and ticket validation system used by Cypher Club and partner student organizations. Employs dynamic TOTP rotating QR codes that defeat screenshot proxy attendance while enabling 0.4s badge validation.",
    category: "Web Development",
    status: "Completed",
    featured: false,
    year: "2024",
    accentColor: "emerald",
    bannerType: "campusflow",
    image: null,
    github: "https://github.com/cypher-club/campusflow",
    demo: "https://campusflow.cypherclub.tech",
    documentation: "https://docs.cypherclub.tech/projects/campusflow",
    videoDemo: null,
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Redis"],
    techCategories: {
      Frontend: ["Next.js 14 App Router", "TypeScript", "Tailwind CSS", "Zustand"],
      Backend: ["Node.js", "Prisma ORM", "Redis Caching", "Server Actions"],
      Database: ["PostgreSQL", "Supabase", "pgvector"],
      Security: ["Web Crypto API", "TOTP RFC 6238", "Rate Limiting"]
    },
    team: [
      { name: "Sneha Kulkarni", role: "Full-Stack Engineer", github: "https://github.com", avatar: "SK" },
      { name: "Kunal Verma", role: "Database Architect", github: "https://github.com", avatar: "KV" }
    ],
    problem: "Manual paper attendance at college technical hackathons and symposiums causes massive queues, 30+ minutes wasted per check-in desk, and rampant ticket sharing via WhatsApp screenshots.",
    solution: "CampusFlow generates rotating cryptographic QR tokens that re-hash every 5 seconds on the attendee's phone. Volunteer scanners decode and verify signatures offline via ECDSA public keys in 400 milliseconds.",
    features: [
      {
        icon: "QrCode",
        title: "Anti-Proxy Rotating QR",
        description: "Time-based rotating cryptographic token invalidating screenshot forwarding."
      },
      {
        icon: "Zap",
        title: "0.4s Instant Check-in",
        description: "Optimized WASM QR scanner decoding tokens directly in mobile browser cameras."
      },
      {
        icon: "Users",
        title: "Live Auditorium Heatmap",
        description: "Real-time occupancy tracking monitoring fire safety capacity limits."
      },
      {
        icon: "Award",
        title: "Automated Certificate Dispatch",
        description: "Instant PDF certificate generation with cryptographic verification hash."
      }
    ],
    architecture: {
      stages: [
        { step: "01", name: "Student RSVP", desc: "Next.js form with university SSO auth" },
        { step: "02", name: "Pass Generation", desc: "ECDSA key pair generation with TOTP seed" },
        { step: "03", name: "Scanner App", desc: "WASM camera barcode reader on staff device" },
        { step: "04", name: "Redis Validation", desc: "Sub-millisecond duplicate check-in suppression" },
        { step: "05", name: "PostgreSQL Sync", desc: "Persistent attendance & certificate batching" }
      ]
    },
    impact: [
      { metric: "14,000+", label: "Check-ins Processed", note: "Across 8 technical symposiums and hackathons" },
      { metric: "0.4s", label: "Average Scan Time", note: "Zero bottleneck at auditorium entry gates" },
      { metric: "99.98%", label: "Uptime", note: "Sustained peak concurrent traffic during opening ceremonies" }
    ]
  },
  {
    id: "ciphervault-auth",
    title: "CipherVault: Zero-Knowledge Key Guardian",
    oneLiner: "Zero-knowledge cross-platform password manager and 2FA authenticator with local biometric enclave.",
    description: "An air-gapped, open-source credentials vault designed for students and developers. Performs all cryptographic hashing on the client device using Argon2id and AES-256-GCM, syncing between devices via encrypted local peer-to-peer Wi-Fi.",
    category: "App Development",
    status: "Active",
    featured: false,
    year: "2025",
    accentColor: "violet",
    bannerType: "ciphervault",
    image: null,
    github: "https://github.com/cypher-club/ciphervault",
    demo: "https://ciphervault.cypherclub.tech",
    documentation: "https://docs.cypherclub.tech/projects/ciphervault",
    videoDemo: null,
    technologies: ["Flutter", "Dart", "Rust", "SQLite", "Argon2id", "AES-256-GCM"],
    techCategories: {
      Mobile: ["Flutter 3.x", "Dart", "Biometric Enclave API"],
      Cryptography: ["Rust (libsignal-protocol)", "Argon2id KDF", "AES-256-GCM"],
      Storage: ["SQLCipher Encrypted DB", "Secure Storage Enclave"],
      Networking: ["mDNS Local Discovery", "TLS 1.3 P2P Socket"]
    },
    team: [
      { name: "Siddharth Menon", role: "Flutter & Mobile Lead", github: "https://github.com", avatar: "SM" },
      { name: "Neha Joshi", role: "Cryptographic Engineer", github: "https://github.com", avatar: "NJ" }
    ],
    problem: "Commercial password managers store encrypted vault blobs on centralized US cloud servers, making users vulnerable to enterprise master breaches and telemetry tracking.",
    solution: "CipherVault completely eliminates cloud servers. Your master password never leaves your device memory, and mobile and desktop apps sync encrypted records directly over local Wi-Fi via peer-to-peer TLS.",
    features: [
      {
        icon: "Lock",
        title: "Argon2id Memory Hard KDF",
        description: "State-of-the-art key derivation with 64MB RAM cost to resist GPU brute forcing."
      },
      {
        icon: "Fingerprint",
        title: "Biometric Hardware Enclave",
        description: "Seamless unlock using Android BiometricPrompt and iOS Secure Enclave."
      },
      {
        icon: "Wifi",
        title: "Air-Gapped P2P Wi-Fi Sync",
        description: "Encrypted device-to-device synchronization without touching third-party servers."
      },
      {
        icon: "ShieldAlert",
        title: "Breached Password Scanner",
        description: "Local k-anonymity SHA-1 checking against 800M+ pwned password hashes."
      }
    ],
    architecture: {
      stages: [
        { step: "01", name: "Master Key Input", desc: "Client-side passkey entry in locked memory" },
        { step: "02", name: "Argon2id Derivation", desc: "Rust native module derives 256-bit AES key" },
        { step: "03", name: "SQLCipher Engine", desc: "Page-level hardware-accelerated decryption" },
        { step: "04", name: "mDNS P2P Beacon", desc: "Discovers companion laptop on local subnet" },
        { step: "05", name: "Encrypted Sync", desc: "Diff sync over TLS 1.3 socket with mutual auth" }
      ]
    },
    impact: [
      { metric: "0 Bytes", label: "Cloud Data Stored", note: "Zero external server dependencies" },
      { metric: "256-bit", label: "AES-GCM Encryption", note: "Military-grade authenticated encryption" },
      { metric: "600+", label: "Active Student Users", note: "Campus open-source install base" }
    ]
  },
  {
    id: "devmorph-action",
    title: "DevMorph: AI Code Review & Security Sentinel",
    oneLiner: "Automated GitHub Action bot that scans student PRs for hardcoded secrets, SQL injection, and algorithmic anti-patterns.",
    description: "A continuous integration bot designed to catch student security mistakes before they hit public repositories. Inspects git diffs using AST parsing and semantic LLM reasoning to comment inline security fixes directly onto pull requests.",
    category: "Automation",
    status: "Active",
    featured: false,
    year: "2025",
    accentColor: "cyan",
    bannerType: "devmorph",
    image: null,
    github: "https://github.com/cypher-club/devmorph",
    demo: "https://github.com/marketplace/actions/devmorph-sentinel",
    documentation: "https://docs.cypherclub.tech/projects/devmorph",
    videoDemo: null,
    technologies: ["Node.js", "GitHub API", "OpenAI / Claude", "Docker", "Semgrep"],
    techCategories: {
      Core: ["Node.js 20", "GitHub Actions Toolkit", "Octokit API"],
      StaticAnalysis: ["Semgrep Rules Engine", "Tree-sitter AST", "TruffleHog Regex"],
      AI: ["Anthropic Claude 3.5 Sonnet", "Structured JSON Schema"]
    },
    team: [
      { name: "Rahul Gupta", role: "DevOps & CI/CD Lead", github: "https://github.com", avatar: "RG" },
      { name: "Ananya Rao", role: "Security Researcher", github: "https://github.com", avatar: "AR" }
    ],
    problem: "Novice student contributors frequently commit sensitive AWS keys, database connection strings, and unescaped SQL queries into open-source club projects.",
    solution: "DevMorph runs in CI on every pull request. It combines deterministic Semgrep static rules with an LLM that explains *why* the vulnerability exists and suggests copy-pasteable replacement code.",
    features: [
      {
        icon: "ShieldCheck",
        title: "TruffleHog Entropy Secret Detection",
        description: "Scans diffs for high-entropy strings, API tokens, private keys, and passwords."
      },
      {
        icon: "Code2",
        title: "Automated PR Diff Comments",
        description: "Places formatted GitHub suggestions directly on offending lines of code."
      },
      {
        icon: "Terminal",
        title: "Static AST Linting",
        description: "Catches SQL injections, ReDoS regexes, and prototype pollution in JS/Python."
      },
      {
        icon: "FileCheck",
        title: "Security Scorecard Badge",
        description: "Generates an SVG badge for the repository README indicating security health."
      }
    ],
    architecture: {
      stages: [
        { step: "01", name: "PR Webhook Ingress", desc: "GitHub Actions runner launches ephemeral container" },
        { step: "02", name: "Git Diff Parsing", desc: "Tree-sitter extracts changed AST nodes" },
        { step: "03", name: "Semgrep Static Pass", desc: "Fast matching against 240+ OWASP rule patterns" },
        { step: "04", name: "LLM Explanation Pass", desc: "Generates educational explanations for students" },
        { step: "05", name: "GitHub Review Post", desc: "Publishes markdown comments with code fixes" }
      ]
    },
    impact: [
      { metric: "62", label: "Secrets Intercepted", note: "Prevented from leaking to public GitHub repos" },
      { metric: "18 Repos", label: "Active Club Projects", note: "Mandatory check in Cypher CI pipeline" },
      { metric: "< 28s", label: "Execution Time", note: "Blazing fast workflow run per pull request" }
    ]
  },
  {
    id: "pulsemetric-wifi",
    title: "PulseMetric: Campus Wi-Fi Predictive Telemetry",
    oneLiner: "Spatiotemporal predictive modeling of campus network congestion, latency drops, and access point density.",
    description: "An IoT telemetry network and time-series ML pipeline analyzing campus Wi-Fi access points. Forecasts bandwidth bottlenecks up to 3 hours in advance and provides students with a real-time 'quiet study spot' recommendation map.",
    category: "Data Science",
    status: "Completed",
    featured: false,
    year: "2024",
    accentColor: "blue",
    bannerType: "pulsemetric",
    image: null,
    github: "https://github.com/cypher-club/pulsemetric",
    demo: "https://pulsemetric.cypherclub.tech",
    documentation: "https://docs.cypherclub.tech/projects/pulsemetric",
    videoDemo: null,
    technologies: ["Python", "Pandas", "Scikit-Learn", "FastAPI", "Grafana", "InfluxDB"],
    techCategories: {
      "Data & ML": ["Python 3.10", "Pandas", "NumPy", "Scikit-Learn", "Prophet / LSTM"],
      Storage: ["InfluxDB Time-Series", "PostgreSQL PostGIS"],
      Visualization: ["Grafana Dashboards", "Deck.gl Map", "React 18"]
    },
    team: [
      { name: "Yash Sharma", role: "Data Scientist", github: "https://github.com", avatar: "YS" },
      { name: "Diya Bhatt", role: "Time-Series ML Engineer", github: "https://github.com", avatar: "DB" }
    ],
    problem: "During exam weeks, thousands of students flood libraries and computer centers, overloading specific Wi-Fi access points while adjacent reading rooms remain completely empty.",
    solution: "PulseMetric collects anonymized RSSI and latency beacons from Raspberry Pi sensor nodes, training temporal forecasting models to display a live campus heatmap showing where bandwidth is highest.",
    features: [
      {
        icon: "Radio",
        title: "Sub-Minute Probe Pings",
        description: "Continuous ICMP and DNS latency telemetry across 40+ campus subnets."
      },
      {
        icon: "TrendingUp",
        title: "3-Hour Congestion Forecast",
        description: "Predictive model anticipating lunch hour and evening study rushes."
      },
      {
        icon: "MapPin",
        title: "Best Study Spot Recommender",
        description: "Directs students to nearby tables with sub-15ms ping and low noise levels."
      },
      {
        icon: "AlertTriangle",
        title: "Rogue AP Detection",
        description: "Detects unauthorized Wi-Fi hotspots mimicking university credentials."
      }
    ],
    architecture: {
      stages: [
        { step: "01", name: "Raspberry Pi Probes", desc: "12 nodes collect ping, RSSI, and DNS timing" },
        { step: "02", name: "InfluxDB Line Protocol", desc: "High-throughput time-series data ingestion" },
        { step: "03", name: "Prophet ML Worker", desc: "Hourly retraining on historical traffic cycles" },
        { step: "04", name: "FastAPI REST API", desc: "Cached responses served with Redis" },
        { step: "05", name: "Interactive Deck.gl Map", desc: "Live 3D campus building heatmap visualizer" }
      ]
    },
    impact: [
      { metric: "91.2%", label: "Forecast Accuracy", note: "Validated against university IT backbone graphs" },
      { metric: "6", label: "Rogue APs Identified", note: "Reported to campus network administration" },
      { metric: "1.4M+", label: "Telemetry Pings Logged", note: "Curated open research dataset for students" }
    ]
  },
  {
    id: "autograde-judge",
    title: "AutoGrade: Sandboxed Code Judge",
    oneLiner: "Lightweight sandboxed competitive programming evaluator with memory, CPU, and syscall limits.",
    description: "An open-source online judge engine built by Cypher Club to host intra-college hackathons and algorithmic coding rounds without risking server crashes from student fork bombs or runaway loops.",
    category: "Other",
    status: "Completed",
    featured: false,
    year: "2024",
    accentColor: "emerald",
    bannerType: "autograde",
    image: null,
    github: "https://github.com/cypher-club/autograde",
    demo: "https://autograde.cypherclub.tech",
    documentation: "https://docs.cypherclub.tech/projects/autograde",
    videoDemo: null,
    technologies: ["Go", "Linux cgroups", "gRPC", "React", "Redis"],
    techCategories: {
      Core: ["Go (Golang)", "Linux cgroups v2", "seccomp-bpf", "ptrace"],
      IPC: ["gRPC Protocol Buffers", "Redis Queue"],
      Frontend: ["React 18", "Monaco Code Editor", "Tailwind CSS"]
    },
    team: [
      { name: "Amit Patel", role: "Systems & Linux Engineer", github: "https://github.com", avatar: "AP" },
      { name: "Riya Sen", role: "Frontend UI Specialist", github: "https://github.com", avatar: "RS" }
    ],
    problem: "Collegiate coding competitions frequently fail because student code contains memory leaks, fork bombs, or malicious syscalls that exhaust server resources and halt testing for everyone.",
    solution: "AutoGrade creates an isolated Linux cgroup v2 sandbox with seccomp-bpf filters for every submission. Memory is hard-capped to 256MB, CPU to 1 core, and untrusted syscalls trigger instant termination with detailed diagnostic reports.",
    features: [
      {
        icon: "Cpu",
        title: "Sub-Millisecond Benchmarking",
        description: "High-resolution monotonic timer measurement of user code execution."
      },
      {
        icon: "Shield",
        title: "Seccomp-BPF Syscall Filter",
        description: "Blocks socket(), fork(), and file system writes outside designated scratch dirs."
      },
      {
        icon: "Layers",
        title: "Multi-Language Support",
        description: "First-class sandboxes for C++20, Java 21, Python 3.12, and Go 1.22."
      },
      {
        icon: "FileCheck",
        title: "Plagiarism AST Comparator",
        description: "Cosine token similarity detector discovering re-ordered variable names."
      }
    ],
    architecture: {
      stages: [
        { step: "01", name: "Monaco Editor Submission", desc: "Student writes code and triggers 'Run Tests'" },
        { step: "02", name: "Redis Job Queue", desc: "Dispatches compilation job to available worker" },
        { step: "03", name: "cgroups v2 Jailing", desc: "Applies hard memory, CPU, and PID limits" },
        { step: "04", name: "Seccomp Execution", desc: "Kernel traps forbidden syscalls instantly" },
        { step: "05", name: "WebSocket Result Push", desc: "Streams test case passes/failures to UI" }
      ]
    },
    impact: [
      { metric: "100k+", label: "Executions Evaluated", note: "Evaluated across 4 annual club contests" },
      { metric: "0", label: "Server Crashes", note: "100% containment of memory leaks and fork bombs" },
      { metric: "< 120ms", label: "Evaluation Overhead", note: "Ultra-lean Go worker execution loop" }
    ]
  },
  {
    id: "sentinelshield-fido",
    title: "SentinelShield: Hardware Security Key",
    oneLiner: "Open-source FIDO2/WebAuthn USB hardware security key with capacitive touch verification.",
    description: "A custom-engineered USB cryptographic authenticator designed by Cypher Club hardware engineers. Implements NIST P-256 ECDSA hardware signatures, capacitive presence verification, and plug-and-play driverless WebAuthn compliance.",
    category: "Cybersecurity",
    status: "In Development",
    featured: false,
    year: "2025",
    accentColor: "blue",
    bannerType: "sentinelshield",
    image: null,
    github: "https://github.com/cypher-club/sentinelshield",
    demo: "https://sentinelshield.cypherclub.tech",
    documentation: "https://docs.cypherclub.tech/projects/sentinelshield",
    videoDemo: null,
    technologies: ["C", "Rust", "STM32", "KiCad", "WebAuthn", "Crypto"],
    techCategories: {
      Hardware: ["STM32F042 ARM Cortex-M0", "KiCad 4-Layer PCB", "USB Type-C"],
      Firmware: ["Embedded C", "Rust (embedded-hal)", "TinyUSB Stack"],
      Crypto: ["ECDSA P-256", "SHA-256", "CTAP 2.1 Protocol"]
    },
    team: [
      { name: "Omkar Patil", role: "PCB & Hardware Engineer", github: "https://github.com", avatar: "OP" },
      { name: "Zoya Sheikh", role: "Embedded Cryptographer", github: "https://github.com", avatar: "ZS" }
    ],
    problem: "Commercial FIDO2 hardware keys like YubiKeys cost $50-$80, making multi-factor hardware security prohibitively expensive for university students.",
    solution: "SentinelShield designs an open-hardware key manufactured for under $6 in bill-of-materials. It works seamlessly with Google, GitHub, and Microsoft WebAuthn passwordless authentication flows.",
    features: [
      {
        icon: "Cpu",
        title: "ARM Cortex-M0 Hardware",
        description: "Dedicated microcontroller with hardware random number generation (TRNG)."
      },
      {
        icon: "Fingerprint",
        title: "Capacitive Touch Presence",
        description: "Requires physical user touch on copper pad to authorize cryptographic signatures."
      },
      {
        icon: "ShieldCheck",
        title: "Driverless HID Protocol",
        description: "Recognized natively by Windows, macOS, Linux, and Android via USB HID."
      },
      {
        icon: "Layers",
        title: "Open KiCad Design Files",
        description: "Fully open schematics and Gerber files for students to solder and assemble."
      }
    ],
    architecture: {
      stages: [
        { step: "01", name: "Browser WebAuthn Request", desc: "Browser dispatches CTAP2 challenge via USB HID" },
        { step: "02", name: "Touch Presence Poll", desc: "LED pulses amber awaiting human capacitive touch" },
        { step: "03", name: "Touch Confirmation", desc: "User touches sensor pad; TRNG generates nonce" },
        { step: "04", name: "ECDSA P-256 Signing", desc: "Private key stored in flash signs the challenge" },
        { step: "05", name: "CTAP2 Response", desc: "Signed assertion returned to relying party site" }
      ]
    },
    impact: [
      { metric: "< $6", label: "Manufacturing BOM", note: "Assembled in university electronics fabrication lab" },
      { metric: "100%", label: "FIDO2 Compliant", note: "Passes official FIDO2 conformance test suites" },
      { metric: "70+", label: "Keys Distributed", note: "Field-tested by club members for GitHub 2FA" }
    ]
  },
  {
    id: "aerotrace-ground",
    title: "AeroTrace: Drone Swarm Ground Station",
    oneLiner: "Ground station control dashboard for telemetry streaming, waypoint navigation, and battery health of quadcopter swarms.",
    description: "An Electron and WebGL mission control cockpit built for autonomous search-and-rescue quadcopters. Decodes real-time MAVLink telemetry packets, displays 3D flight paths, and calculates dynamic return-to-home battery thresholds.",
    category: "IoT",
    status: "Archived",
    featured: false,
    year: "2024",
    accentColor: "violet",
    bannerType: "aerotrace",
    image: null,
    github: "https://github.com/cypher-club/aerotrace",
    demo: "https://aerotrace.cypherclub.tech",
    documentation: "https://docs.cypherclub.tech/projects/aerotrace",
    videoDemo: null,
    technologies: ["React", "Electron", "MAVLink", "Leaflet", "Node.js", "WebSockets"],
    techCategories: {
      Frontend: ["React 18", "Three.js 3D Altitude Mesh", "Leaflet GIS Maps"],
      Runtime: ["Electron Desktop", "Node.js", "SerialPort USB"],
      Protocol: ["MAVLink 2.0 Protocol", "Telemetry Radio 433MHz"]
    },
    team: [
      { name: "Harish Iyer", role: "Avionics & Telemetry Lead", github: "https://github.com", avatar: "HI" },
      { name: "Pooja Nair", role: "Ground Station UI/UX", github: "https://github.com", avatar: "PN" }
    ],
    problem: "Legacy ground control software (like Mission Planner) is cluttered, resource-heavy, and difficult for collegiate teams to customize for multi-drone autonomous formations.",
    solution: "AeroTrace built a streamlined, cyber-themed desktop interface that connects to ArduPilot telemetry radios over USB, parsing 50Hz telemetry packets into smooth 60fps WebGL attitude indicators.",
    features: [
      {
        icon: "Compass",
        title: "3D Synthetic Attitude Indicator",
        description: "Real-time artificial horizon showing roll, pitch, and yaw of airborne quadcopters."
      },
      {
        icon: "MapPin",
        title: "Interactive Waypoint Planner",
        description: "Point-and-click flight route planner with terrain altitude elevation lookup."
      },
      {
        icon: "BatteryCharging",
        title: "Dynamic Smart-RTL Calculation",
        description: "Calculates live wind vectors and current draw to mandate return-to-launch."
      },
      {
        icon: "Radio",
        title: "Dual-Radio Swarm Link",
        description: "Simultaneous monitoring of up to 4 companion drones in a single viewport."
      }
    ],
    architecture: {
      stages: [
        { step: "01", name: "433MHz RF Ingress", desc: "Telemetry radio receives MAVLink packets" },
        { step: "02", name: "Node SerialPort Pipe", desc: "Buffered byte stream parsed into JS structures" },
        { step: "03", name: "WebSocket Broadcast", desc: "Local IPC broadcast to React Electron renderer" },
        { step: "04", name: "WebGL 3D Rendering", desc: "Real-time drone attitude orientation update" },
        { step: "05", name: "Telemetry Blackbox Log", desc: "Automated CSV and KML export for post-flight" }
      ]
    },
    impact: [
      { metric: "120+", label: "Flight Hours Logged", note: "Zero telemetry-induced communication dropouts" },
      { metric: "50 Hz", label: "Telemetry Refresh", note: "Real-time telemetry update rate" },
      { metric: "Archived", label: "Research Milestone", note: "Findings published in student robotics symposium" }
    ]
  }
];

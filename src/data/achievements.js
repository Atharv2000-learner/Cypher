/**
 * Cypher Club - Achievements Data
 * 
 * Official student achievements showcasing innovation, competitions,
 * student projects, workshops, coding activities, and student recognition.
 * All entries follow genuine college student achievements.
 */

export const achievementsData = [
  {
    id: "sih-2026",
    number: "01",
    roman: "I",
    title: "Smart India Hackathon",
    category: "Hackathon",
    year: "2026",
    team: "Cypher Club",
    actionType: "project",
    actionLabel: "VIEW PROJECT",
    description: "Students participated in a national-level innovation and problem-solving competition, developing technology solutions for real-world challenges.",
    deck: "National-level problem-solving and software development competition tackling real-world societal and industrial challenges with cutting-edge technology solutions.",
    details: {
      domain: "National Innovation & Real-World Problem Solving",
      initiative: "Autonomous Disaster-Relief Triage & Coordination Grid",
      techStack: ["React 18", "Python / FastAPI", "PyTorch", "Tailwind CSS", "Docker", "PostgreSQL"],
      highlights: [
        "Formed multi-disciplinary squads across web, machine learning, and systems architecture.",
        "Engineered real-time emergency dispatch coordination protocol under simulated network constraints.",
        "Demonstrated working prototype through rapid 36-hour continuous build sprint.",
        "Presented end-to-end architecture review before collegiate mentors and evaluators."
      ],
      metrics: [
        { label: "Sprint Duration", value: "36 Hours" },
        { label: "Squad Size", value: "6 Students" },
        { label: "Prototype Stage", value: "Deployed MVP" },
        { label: "Evaluation", value: "Verified" }
      ]
    },
    motifKey: "hackathon",
    color: "#08101e",
    foil: "#00E5FF",
    secondary: "#2563EB",
    paletteLabel: "Cyan · Obsidian · Cobalt",
    palette: {
      paper: "#05070B",
      paperDeep: "#030407",
      paperPale: "#0a1324",
      ink: "#F5F7FA",
      inkSoft: "#94A3B8",
      wall: "#05070B",
      shelf: "#0b1220",
      shelfDark: "#060a12",
      light: "#00E5FF",
      fill: "#2563EB"
    },
    width: 1.04,
    height: 1.58,
    depth: 0.22,
    chapters: ["Problem Brief", "System Architecture", "Prototype Delivery"],
    seed: 111
  },
  {
    id: "tech-competitions",
    number: "02",
    roman: "II",
    title: "Technical Competitions",
    category: "Competition",
    year: "2026",
    team: "Cypher Club",
    actionType: "details",
    actionLabel: "VIEW DETAILS",
    description: "Cypher members participated in coding contests, technical challenges and college-level technology competitions.",
    deck: "Collegiate algorithmic contests, cybersecurity capture-the-flags, and multi-round engineering challenges testing speed and problem-solving capability.",
    details: {
      domain: "Collegiate Coding & Cyber Security Contests",
      initiative: "Inter-Collegiate Algorithmic Cup & Security CTF Series",
      techStack: ["C++20", "Rust", "Python", "Linux CLI", "GDB", "Ghidra"],
      highlights: [
        "Weekly competitive programming squads solving complex graph, tree, and dynamic programming tasks.",
        "Capture-The-Flag (CTF) security division analyzing reverse engineering and cryptographic ciphers.",
        "Conducted internal qualifying sprints to prepare junior members for national competitive platforms.",
        "Demonstrated consistent performance across multiple regional collegiate tech symposiums."
      ],
      metrics: [
        { label: "Contests Entered", value: "8+ Rounds" },
        { label: "Active Competitors", value: "24 Members" },
        { label: "Challenge Success", value: "High Precision" },
        { label: "Rank Bracket", value: "Top Tier" }
      ]
    },
    motifKey: "leaderboard",
    color: "#0f0b20",
    foil: "#7C3AED",
    secondary: "#A855F7",
    paletteLabel: "Violet · Obsidian · Electric Purple",
    palette: {
      paper: "#05070B",
      paperDeep: "#030407",
      paperPale: "#150e2a",
      ink: "#F5F7FA",
      inkSoft: "#94A3B8",
      wall: "#05070B",
      shelf: "#110c24",
      shelfDark: "#080512",
      light: "#7C3AED",
      fill: "#3B82F6"
    },
    width: 1.06,
    height: 1.52,
    depth: 0.24,
    chapters: ["Algorithmic Contests", "Security CTF", "Benchmark Rankings"],
    seed: 222
  },
  {
    id: "student-projects",
    number: "03",
    roman: "III",
    title: "Student Projects",
    category: "Projects",
    year: "2026",
    team: "Cypher Club",
    actionType: "project",
    actionLabel: "VIEW PROJECT",
    description: "Students developed practical software projects including attendance systems, portfolios, management systems and productivity tools.",
    deck: "Hands-on engineering initiatives delivering working applications for student productivity, campus administration, and portfolio showcases.",
    details: {
      domain: "Practical Software Development & Full-Stack Systems",
      initiative: "Campus Utility Suite & Developer Productivity Infrastructure",
      techStack: ["Next.js", "TypeScript", "Node.js", "Tailwind CSS", "MongoDB", "Vercel"],
      highlights: [
        "Engineered an automated campus attendance logging tool utilized during student workshops.",
        "Constructed open-source developer portfolio templates adopted across university departments.",
        "Implemented secure club asset management system for tracking lab equipment and hardware kits.",
        "Published comprehensive API documentation and CI/CD deployment pipelines."
      ],
      metrics: [
        { label: "Shipped Projects", value: "6 Systems" },
        { label: "Code Repositories", value: "12 Git Repos" },
        { label: "Campus Users", value: "400+ Students" },
        { label: "Uptime Rate", value: "99.8%" }
      ]
    },
    motifKey: "dashboard",
    color: "#06151a",
    foil: "#06B6D4",
    secondary: "#0284C7",
    paletteLabel: "Cyan · Deep Teal · Slate",
    palette: {
      paper: "#05070B",
      paperDeep: "#030407",
      paperPale: "#0c1f26",
      ink: "#F5F7FA",
      inkSoft: "#94A3B8",
      wall: "#05070B",
      shelf: "#0a1920",
      shelfDark: "#050e12",
      light: "#06B6D4",
      fill: "#2563EB"
    },
    width: 1.02,
    height: 1.56,
    depth: 0.23,
    chapters: ["Campus Attendance", "Portfolio Hub", "Management Systems"],
    seed: 333
  },
  {
    id: "technical-workshops",
    number: "04",
    roman: "IV",
    title: "Technical Workshops",
    category: "Workshop",
    year: "2026",
    team: "Cypher Club",
    actionType: "details",
    actionLabel: "VIEW DETAILS",
    description: "Hands-on sessions introduced students to programming, web development, AI, cybersecurity and emerging technologies.",
    deck: "Collaborative technical clinics and workshops guiding students through modern frameworks, cloud architectures, and cybersecurity workflows.",
    details: {
      domain: "Student Upskilling & Practical Technology Clinics",
      initiative: "Cypher Core Tech Curriculum & Hands-On Bootcamps",
      techStack: ["Linux", "Git & GitHub", "Modern JS / React", "Python for AI", "Network Security"],
      highlights: [
        "Organized immersive beginner-to-intermediate clinics in full-stack web architectures.",
        "Conducted hands-on ethical hacking sessions covering common vulnerability patterns and defenses.",
        "Demonstrated practical prompt-engineering and local LLM tool integration for developers.",
        "Provided interactive coding environments and step-by-step laboratory worksheets."
      ],
      metrics: [
        { label: "Workshops Held", value: "12 Sessions" },
        { label: "Students Trained", value: "320+ Attendees" },
        { label: "Lab Hours", value: "48+ Hours" },
        { label: "Feedback Rating", value: "4.9 / 5.0" }
      ]
    },
    motifKey: "workshop",
    color: "#0f1624",
    foil: "#38BDF8",
    secondary: "#6366F1",
    paletteLabel: "Sky Blue · Indigo · Night",
    palette: {
      paper: "#05070B",
      paperDeep: "#030407",
      paperPale: "#141e30",
      ink: "#F5F7FA",
      inkSoft: "#94A3B8",
      wall: "#05070B",
      shelf: "#101827",
      shelfDark: "#080c14",
      light: "#38BDF8",
      fill: "#6366F1"
    },
    width: 1.06,
    height: 1.50,
    depth: 0.25,
    chapters: ["Web Engineering", "Cyber Defense", "AI Tooling"],
    seed: 444
  },
  {
    id: "coding-events",
    number: "05",
    roman: "V",
    title: "Coding Events",
    category: "Coding",
    year: "2026",
    team: "Cypher Club",
    actionType: "details",
    actionLabel: "VIEW DETAILS",
    description: "Coding activities and problem-solving sessions helped students strengthen programming and algorithmic thinking.",
    deck: "Weekly programming challenges, problem analysis meetups, and algorithmic optimization sprints fostering strong foundations in data structures.",
    details: {
      domain: "Algorithmic Thinking & Rapid Problem Solving",
      initiative: "Weekend Algo-Sparks & Bug Hunt Sprints",
      techStack: ["Python", "Java", "C++", "LeetCode Standards", "Codeforces Platform"],
      highlights: [
        "Structured weekly practice rounds covering arrays, binary search, graphs, and dynamic programming.",
        "Organized pair-programming sprints to enhance code readability and debugging speed.",
        "Facilitated post-session editorial breakdowns exploring optimal time and space complexities.",
        "Encouraged collaborative problem-solving across all year cohorts."
      ],
      metrics: [
        { label: "Weekly Meets", value: "20+ Sprints" },
        { label: "Problems Solved", value: "180+ Tasks" },
        { label: "Active Solvers", value: "65 Students" },
        { label: "Avg Complexity", value: "O(N log N)" }
      ]
    },
    motifKey: "coding",
    color: "#081614",
    foil: "#10B981",
    secondary: "#059669",
    paletteLabel: "Emerald · Forest · Mint",
    palette: {
      paper: "#05070B",
      paperDeep: "#030407",
      paperPale: "#0e201d",
      ink: "#F5F7FA",
      inkSoft: "#94A3B8",
      wall: "#05070B",
      shelf: "#0b1b18",
      shelfDark: "#060f0d",
      light: "#10B981",
      fill: "#2563EB"
    },
    width: 0.98,
    height: 1.54,
    depth: 0.22,
    chapters: ["Data Structures", "Speed Coding", "System Optimization"],
    seed: 555
  },
  {
    id: "innovation-ideas",
    number: "06",
    roman: "VI",
    title: "Innovation & Ideas",
    category: "Innovation",
    year: "2026",
    team: "Cypher Club",
    actionType: "project",
    actionLabel: "VIEW PROJECT",
    description: "Students transformed creative ideas into prototypes and technology solutions for real-world problems.",
    deck: "Incubating original prototypes, machine learning workflows, and automated system architectures from concept to functional proof.",
    details: {
      domain: "Emerging Tech & Prototype Incubation",
      initiative: "Cypher Idea Sandbox & Research Prototyping",
      techStack: ["PyTorch", "TensorFlow Lite", "Raspberry Pi", "WebSockets", "Computer Vision"],
      highlights: [
        "Prototyped assistive computer vision tools for automated defect identification.",
        "Researched lightweight neural network inference on resource-constrained embedded microcontrollers.",
        "Mentored student ideation teams from initial concept wireframes to working proof-of-concept demos.",
        "Facilitated cross-disciplinary collaboration between hardware and software student engineers."
      ],
      metrics: [
        { label: "Prototypes Built", value: "5 Concepts" },
        { label: "R&D Teams", value: "15 Researchers" },
        { label: "Inference Latency", value: "< 24ms" },
        { label: "Hardware Nodes", value: "IoT Linked" }
      ]
    },
    motifKey: "neural",
    color: "#160e22",
    foil: "#C084FC",
    secondary: "#9333EA",
    paletteLabel: "Lilac · Obsidian · Neon Purple",
    palette: {
      paper: "#05070B",
      paperDeep: "#030407",
      paperPale: "#1f1430",
      ink: "#F5F7FA",
      inkSoft: "#94A3B8",
      wall: "#05070B",
      shelf: "#160d24",
      shelfDark: "#0b0612",
      light: "#C084FC",
      fill: "#7C3AED"
    },
    width: 1.05,
    height: 1.55,
    depth: 0.24,
    chapters: ["Concept Ideation", "Neural Prototyping", "Proof of Concept"],
    seed: 666
  },
  {
    id: "club-events",
    number: "07",
    roman: "VII",
    title: "Club Events",
    category: "Community",
    year: "2026",
    team: "Cypher Club",
    actionType: "details",
    actionLabel: "VIEW DETAILS",
    description: "Cypher organized technical events and collaborative activities that brought students together to learn and build.",
    deck: "Interdisciplinary meetups, community build jams, and panel sessions connecting students with mentors and technical peers.",
    details: {
      domain: "Community Engagement & Tech Culture",
      initiative: "Annual Tech Fest, Build Jams & Guest Keynotes",
      techStack: ["Discord Community", "GitHub Organization", "Live Streaming", "Figma Jam"],
      highlights: [
        "Hosted annual Cypher Tech Convergence gathering over 250+ student participants.",
        "Invited alumni software engineers for interactive AMAs on career pathways and open source.",
        "Conducted late-night hack sprints encouraging team formation and rapid prototyping.",
        "Curated community code repositories and student project showcases."
      ],
      metrics: [
        { label: "Major Events", value: "4 Flagships" },
        { label: "Total Participants", value: "500+ Students" },
        { label: "Industry Speakers", value: "6 Mentors" },
        { label: "Community Size", value: "Active & Growing" }
      ]
    },
    motifKey: "community",
    color: "#0c1424",
    foil: "#60A5FA",
    secondary: "#2563EB",
    paletteLabel: "Cobalt · Deep Sky · Night",
    palette: {
      paper: "#05070B",
      paperDeep: "#030407",
      paperPale: "#121d33",
      ink: "#F5F7FA",
      inkSoft: "#94A3B8",
      wall: "#05070B",
      shelf: "#0f1a2e",
      shelfDark: "#070c17",
      light: "#60A5FA",
      fill: "#2563EB"
    },
    width: 1.04,
    height: 1.50,
    depth: 0.23,
    chapters: ["Build Jams", "Tech Talks", "Community Culture"],
    seed: 777
  },
  {
    id: "student-recognition",
    number: "08",
    roman: "VIII",
    title: "Student Recognition",
    category: "Recognition",
    year: "2026",
    team: "Cypher Club",
    actionType: "certificate",
    actionLabel: "VIEW CERTIFICATE",
    description: "Celebrating students for technical contributions, creativity, leadership and innovation.",
    deck: "Acknowledging student excellence in community mentorship, open-source building, competitive spirit, and continuous learning.",
    details: {
      domain: "Excellence Honors & Contributor Recognition",
      initiative: "Cypher Annual Honor Roll & Technical Citations",
      techStack: ["Cryptographic Signatures", "Verified Credentials", "Badges of Honor"],
      highlights: [
        "Presented citations to peer mentors who led hands-on training sessions for junior members.",
        "Recognized top contributors to collegiate open-source repositories and club utilities.",
        "Commended teams for exceptional persistence and teamwork during national hackathons.",
        "Awarded certificates of accomplishment for completion of rigorous semester technical tracks."
      ],
      metrics: [
        { label: "Students Honored", value: "35 Students" },
        { label: "Citations Awarded", value: "Excellence" },
        { label: "Credential Hash", value: "Verified SHA" },
        { label: "Academic Term", value: "Year 2026" }
      ]
    },
    motifKey: "certificate",
    color: "#181308",
    foil: "#F59E0B",
    secondary: "#D97706",
    paletteLabel: "Gold Foil · Amber · Obsidian",
    palette: {
      paper: "#05070B",
      paperDeep: "#030407",
      paperPale: "#261e0d",
      ink: "#F5F7FA",
      inkSoft: "#94A3B8",
      wall: "#05070B",
      shelf: "#1c1509",
      shelfDark: "#0e0a04",
      light: "#F59E0B",
      fill: "#00E5FF"
    },
    width: 1.06,
    height: 1.56,
    depth: 0.24,
    chapters: ["Leadership Honors", "Open-Source Merit", "Citation Verification"],
    seed: 888
  }
];

// Alias for backwards compatibility if needed
export const achievements = achievementsData;

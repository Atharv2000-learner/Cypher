/**
 * Cypher Club - Member Projects Data
 * 
 * Showcase of software, tools, and platforms built by club members.
 * Set githubUrl or demoUrl to null or empty string to hide the respective buttons.
 */

export const projectCategories = [
  "All",
  "AI & Machine Learning",
  "Cybersecurity",
  "Web Development",
  "DevOps & Tools"
];

export const projects = [
  {
    id: "proj-01",
    title: "AI Study Assistant",
    category: "AI & Machine Learning",
    description: "An intelligent student companion that synthesizes lecture notes, generates flashcards, and answers technical queries through RAG vector search.",
    technologies: ["Python", "FastAPI", "OpenAI / Gemini", "React", "Tailwind CSS"],
    featured: true,
    accentColor: "cyan",
    status: "Active Development",
    // Configurable links: If null, the respective button will not render
    githubUrl: null, // Set to repository link when public
    demoUrl: null,   // Set to live demo link when deployed
    highlights: [
      "Vector embeddings for PDF notes",
      "Automated quiz generator",
      "Local model fallback support"
    ]
  },
  {
    id: "proj-02",
    title: "Cybersecurity Dashboard",
    category: "Cybersecurity",
    description: "Real-time network vulnerability scanning and intrusion monitoring interface visualizing port telemetry, SSL validity, and attack surface metrics.",
    technologies: ["HTML", "CSS", "JavaScript", "Chart.js", "Python"],
    featured: true,
    accentColor: "emerald",
    status: "Completed Prototype",
    githubUrl: null,
    demoUrl: null,
    highlights: [
      "Interactive threat map",
      "Automated port scanning alerts",
      "OWASP vulnerability checklist"
    ]
  },
  {
    id: "proj-03",
    title: "Campus Event Nexus",
    category: "Web Development",
    description: "A centralized event discovery and QR-ticket check-in system built for college technical societies to manage hackathon check-ins and registrations.",
    technologies: ["React", "Vite", "Node.js", "Express", "Tailwind CSS"],
    featured: true,
    accentColor: "violet",
    status: "In Production for Club Events",
    githubUrl: null,
    demoUrl: null,
    highlights: [
      "Sub-second QR badge validation",
      "Real-time attendance analytics",
      "Role-based staff portal"
    ]
  },
  {
    id: "proj-04",
    title: "Cypher CLI & Git Automation Tool",
    category: "DevOps & Tools",
    description: "A command-line utility built by club members to streamline project scaffolding, conventional git commit validation, and automated GitHub release notes.",
    technologies: ["Node.js", "Commander.js", "Shell", "Git"],
    featured: false,
    accentColor: "amber",
    status: "Open Source Utility",
    githubUrl: null,
    demoUrl: null,
    highlights: [
      "Interactive commit prompt",
      "Pre-push security linters",
      "One-click repo bootstrap"
    ]
  },
  {
    id: "proj-05",
    title: "Algorithmic Code Arena",
    category: "Web Development",
    description: "A lightweight coding practice sandbox where club members can run test cases against data structure problems with execution time and memory limits.",
    technologies: ["React", "Monaco Editor", "Docker", "Python"],
    featured: false,
    accentColor: "cyan",
    status: "Beta Testing",
    githubUrl: null,
    demoUrl: null,
    highlights: [
      "Sandboxed Docker runtime",
      "Custom test suite validation",
      "Syntax-highlighted code editor"
    ]
  }
];

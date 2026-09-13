/**
 * Cypher Club - Events Data
 * 
 * Centralized list of upcoming and past events.
 * Category filters match specification:
 * Hackathons, AI Workshops, Web Development Workshops, Cybersecurity Events,
 * Coding Competitions, Git & GitHub Workshops, Tech Talks.
 * 
 * Set registrationUrl to null or empty string if registration is closed or handled internally.
 */

export const eventCategories = [
  "All",
  "Hackathons",
  "AI Workshops",
  "Web Development Workshops",
  "Cybersecurity Events",
  "Coding Competitions",
  "Git & GitHub Workshops",
  "Tech Talks"
];

export const events = [
  // UPCOMING EVENTS
  {
    id: "evt-01",
    type: "upcoming",
    title: "CypherHacks 2026: 36-Hour Hackathon",
    category: "Hackathons",
    date: "October 10-12, 2026",
    time: "09:00 AM onwards",
    venue: "Main Campus Auditorium & Hybrid",
    shortDescription: "Our flagship annual student hackathon. Build innovative software across AI, Web3, FinTech, and Social Good tracks with industry mentorship and exciting prize pools.",
    status: "Registration Open",
    isRegistrationAvailable: true,
    registrationUrl: "/join", // Configurable link (internal route or external forms)
    featured: true,
    capacity: "250 Participants",
    prerequisites: "Laptop and passion to build. Teams of 2 to 4."
  },
  {
    id: "evt-02",
    type: "upcoming",
    title: "Hands-on LLMs & Agentic AI Workshop",
    category: "AI Workshops",
    date: "October 24, 2026",
    time: "04:30 PM - 07:00 PM",
    venue: "Computer Science Lab 301",
    shortDescription: "Dive into building retrieval-augmented generation (RAG) pipelines, local embeddings, and deploying autonomous LLM agents with Python and modern SDKs.",
    status: "Registration Open",
    isRegistrationAvailable: true,
    registrationUrl: "/join",
    featured: true,
    capacity: "60 Seats",
    prerequisites: "Basic Python knowledge recommended."
  },
  {
    id: "evt-03",
    type: "upcoming",
    title: "Capture The Flag: Defensive & Offensive Cyber Ops",
    category: "Cybersecurity Events",
    date: "November 05, 2026",
    time: "02:00 PM - 06:00 PM",
    venue: "Cyber Defense Lab / Virtual Sandbox",
    shortDescription: "Test your cybersecurity skills in reverse engineering, binary exploitation, web security vulnerabilities, and network forensics in a controlled environment.",
    status: "Coming Soon",
    isRegistrationAvailable: false,
    registrationUrl: null,
    featured: false,
    capacity: "100 Seats",
    prerequisites: "Familiarity with Linux CLI and basic networking."
  },
  {
    id: "evt-04",
    type: "upcoming",
    title: "Modern Full-Stack React & Vite Masterclass",
    category: "Web Development Workshops",
    date: "November 14, 2026",
    time: "04:00 PM - 06:30 PM",
    venue: "Auditorium Hall B",
    shortDescription: "Learn component architecture, state management patterns, Tailwind CSS styling, and deploying production-ready Single Page Applications on modern cloud edges.",
    status: "Registration Open",
    isRegistrationAvailable: true,
    registrationUrl: "/join",
    featured: false,
    capacity: "80 Seats",
    prerequisites: "Basic HTML/CSS & JavaScript."
  },

  // PAST EVENTS
  {
    id: "evt-05",
    type: "past",
    title: "Zero to Hero: Git & GitHub Collaborative Workflows",
    category: "Git & GitHub Workshops",
    date: "August 20, 2026",
    time: "03:00 PM - 05:30 PM",
    venue: "Seminar Hall 1",
    shortDescription: "Mastered branching strategies, rebasing, resolving merge conflicts, crafting pull requests, and automated GitHub Actions workflows.",
    status: "Completed",
    isRegistrationAvailable: false,
    registrationUrl: null,
    featured: false,
    attendees: "110+ Attendees",
    summaryNotes: "Slides and tutorial repository distributed to all registered attendees."
  },
  {
    id: "evt-06",
    type: "past",
    title: "Cypher CodeSprint: Algorithms & Data Structures Contest",
    category: "Coding Competitions",
    date: "July 12, 2026",
    time: "06:00 PM - 09:00 PM",
    venue: "Online Contest Platform",
    shortDescription: "A high-speed algorithmic programming contest featuring dynamic programming, graph traversal, and optimization problems. Over 80 student coders competed.",
    status: "Completed",
    isRegistrationAvailable: false,
    registrationUrl: null,
    featured: false,
    attendees: "85 Competitors",
    summaryNotes: "Top 3 winners awarded official Cypher Club trophy badges."
  },
  {
    id: "evt-07",
    type: "past",
    title: "Industry Tech Talk: Cloud Native & Distributed Systems",
    category: "Tech Talks",
    date: "June 18, 2026",
    time: "05:00 PM - 06:30 PM",
    venue: "Virtual via Google Meet",
    shortDescription: "Invited alumni systems engineer shared insights on microservices architecture, Kubernetes orchestration, and transitioning from college to high-scale tech roles.",
    status: "Completed",
    isRegistrationAvailable: false,
    registrationUrl: null,
    featured: false,
    attendees: "140+ Attendees",
    summaryNotes: "Recording archived in the club member knowledge base."
  },
  {
    id: "evt-08",
    type: "past",
    title: "Web Security & OWASP Top 10 Hands-on Clinic",
    category: "Cybersecurity Events",
    date: "May 06, 2026",
    time: "03:30 PM - 06:00 PM",
    venue: "Lab 204",
    shortDescription: "Explored SQL injections, XSS vulnerabilities, CSRF, and broken authorization vectors with hands-on lab exercises and mitigation techniques.",
    status: "Completed",
    isRegistrationAvailable: false,
    registrationUrl: null,
    featured: false,
    attendees: "75 Attendees",
    summaryNotes: "Participants practiced on simulated vulnerable web environments."
  }
];

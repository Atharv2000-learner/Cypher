/**
 * Cypher Club - Central Site Configuration
 * 
 * All organizational metadata, social channels, college information,
 * and contact links are centralized here for easy maintenance.
 */

export const siteConfig = {
  name: "Cypher Club",
  shortName: "Cypher",
  tagline: "Code. Create. Collaborate.",
  description: "A premier student technology community dedicated to fostering engineering excellence, hands-on development, cybersecurity prowess, and collaborative innovation.",
  heroSubtitle: "Empowering passionate student developers, cyber defenders, and tech innovators through hands-on workshops, hackathons, and real-world project development.",
  
  // Progression Model
  progression: [
    {
      step: "01",
      title: "Learn",
      subtitle: "Master the Fundamentals",
      description: "Hands-on workshops in AI/ML, Full-Stack Web, DevOps, Cybersecurity, and Git. Guided by senior mentors and industry practitioners.",
      icon: "GraduationCap",
      color: "from-cyan-500/20 to-cyan-500/5",
      border: "border-cyan-500/30",
      accent: "text-cyan-400"
    },
    {
      step: "02",
      title: "Build",
      subtitle: "Ship Real Software",
      description: "Collaborate in agile student pods to build open-source tools, campus utilities, and deploy scalable applications to production.",
      icon: "Code2",
      color: "from-emerald-500/20 to-emerald-500/5",
      border: "border-emerald-500/30",
      accent: "text-emerald-400"
    },
    {
      step: "03",
      title: "Compete",
      subtitle: "Test Skills Under Pressure",
      description: "Represent the club in national hackathons, university CTF security showdowns, algorithmic contests, and innovation challenges.",
      icon: "Trophy",
      color: "from-violet-500/20 to-violet-500/5",
      border: "border-violet-500/30",
      accent: "text-violet-400"
    },
    {
      step: "04",
      title: "Collaborate",
      subtitle: "Grow With The Network",
      description: "Connect with peers, alumni in high-impact tech roles, open-source maintainers, and community mentors across disciplines.",
      icon: "Users",
      color: "from-amber-500/20 to-amber-500/5",
      border: "border-amber-500/30",
      accent: "text-amber-400"
    }
  ],

  // Core Value Pillars
  values: [
    {
      title: "Peer-to-Peer Learning",
      description: "No hierarchical gatekeeping. Experienced student engineers train juniors directly through project walkthroughs and code reviews.",
      icon: "BookOpen"
    },
    {
      title: "Ship Over Theory",
      description: "We measure growth by shipped code, live demos, and working prototypes rather than theoretical slide decks.",
      icon: "Rocket"
    },
    {
      title: "Open Source First",
      description: "Promoting public codebases, transparent contribution guidelines, and collaborative version control etiquette.",
      icon: "GitBranch"
    },
    {
      title: "Ethical & Inclusive",
      description: "A welcoming, zero-harassment environment for learners of all backgrounds, departments, and skill levels.",
      icon: "ShieldCheck"
    }
  ],

  // Replaceable Sample Statistics
  stats: [
    { label: "Active Student Members", value: "350+", isSample: true },
    { label: "Technical Workshops Held", value: "30+", isSample: true },
    { label: "Hackathons & CTFs Won", value: "12+", isSample: true },
    { label: "Open-Source Projects", value: "18+", isSample: true }
  ],

  // Campus and Contact Information
  contact: {
    email: "contact@cypherclub.edu", // Replace with verified club address
    alternateEmail: "support@cypherclub.edu",
    location: "Student Innovation Center, Tech Campus Lab 402",
    institution: "Department of Computer Science & Engineering",
    meetingHours: "Wednesdays & Fridays: 4:30 PM – 6:30 PM",
    openTo: "All university students across all engineering branches and years."
  },

  // Social Channels (Use configurable handles; empty strings hide external buttons)
  socials: {
    github: "https://github.com",       // Configurable club GitHub
    linkedin: "https://linkedin.com",   // Configurable club LinkedIn
    discord: "https://discord.com",     // Configurable club Discord
    instagram: "https://instagram.com", // Configurable club Instagram
    twitter: "https://twitter.com"      // Configurable club Twitter/X
  },

  // Join & Application Settings
  joinSettings: {
    recruitmentOpen: true,
    cohortName: "Fall 2026 Induction",
    deadline: "Rolling Admissions"
  }
};

# Cypher Club — Student Technology Community Website (V1)

> **"Code. Create. Collaborate."**  
> An open, modern, and accessible community platform built for student software engineers, cybersecurity practitioners, and technology innovators.

---

## 🚀 Overview

**Cypher Club** is a premier student technology society dedicated to bridging the divide between classroom computer science fundamentals and industry-standard production engineering.

This repository contains the complete V1 responsive web application, structured to highlight:
- **Core Progression Engine**: `Learn → Build → Compete → Collaborate`
- **Events & Hands-on Clinics**: Categorized upcoming hackathons, AI labs, web dev bootcamps, and CTF security tournaments with instant category filtering.
- **Member Projects**: Showcase of software, developer utilities, and AI applications built by students with configurable GitHub repository and live demo links.
- **Achievements & Hall of Fame**: Competition victories, hackathon podiums, CTF rankings, and community upskilling milestones.
- **Student Leadership Team**: Directory of committee leads and domain coordinators with photo fallbacks and social links.
- **Interactive Induction Portal**: Client-side validated multi-field membership registration with instant feedback and configurable backend endpoints.
- **Direct Contact & Help Center**: Inquiries form with input validation, campus lab location information, and FAQ accordion.

---

## 🛠️ Tech Stack

- **Frontend Core**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/) with client-side history navigation and auto-scroll-to-top
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) with custom cyber/tech design system, dark mode toggle, and glassmorphism utilities
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Google Inter & JetBrains Mono

---

## 📂 Project Architecture

```
Cypher/
├── public/
│   └── favicon.svg           # Custom Cypher branded SVG favicon
├── src/
│   ├── assets/               # Static assets & illustrations
│   ├── components/           # Modular, reusable UI components
│   │   ├── AchievementCard.jsx # Milestone recognition card
│   │   ├── ContactForm.jsx     # Form with email & field validation
│   │   ├── EventCard.jsx       # Event card with category badges & registration links
│   │   ├── Footer.jsx          # Multi-column footer & newsletter dispatch
│   │   ├── Hero.jsx            # Dynamic hero with interactive terminal preview
│   │   ├── JoinForm.jsx        # Induction application with client state machine
│   │   ├── Navbar.jsx          # Sticky header with mobile drawer & theme toggle
│   │   ├── PillFilter.jsx      # Dynamic category filter pills
│   │   ├── ProjectCard.jsx     # Member showcase card with conditional links
│   │   ├── ScrollToTop.jsx     # Route change scroll reset
│   │   ├── SectionHeader.jsx   # Standardized section headings
│   │   └── TeamCard.jsx        # Member profile card with avatar fallbacks
│   ├── data/                 # Decoupled centralized content layer
│   │   ├── achievements.js   # Competition wins & milestones
│   │   ├── events.js         # Upcoming & past event database
│   │   ├── faqs.js           # Student questions & community answers
│   │   ├── projects.js       # Club projects & tech tags
│   │   ├── siteConfig.js     # Global metadata, campus location, socials
│   │   └── team.js           # Leadership committee directory
│   ├── pages/                # Top-level route views
│   │   ├── About.jsx         # Vision, Mission, What We Do, What You Learn
│   │   ├── Achievements.jsx  # Full timeline & records
│   │   ├── Contact.jsx       # Location, inquiries & FAQs
│   │   ├── Events.jsx        # Filterable upcoming & past events catalog
│   │   ├── Home.jsx          # Landing page with hero & previews
│   │   ├── Join.jsx          # Membership application page
│   │   ├── NotFound.jsx      # 404 Error page
│   │   ├── Projects.jsx      # Filterable member project repository
│   │   └── Team.jsx          # Full leadership directory
│   ├── App.jsx               # Route provider & theme manager
│   ├── index.css             # Tailwind base, utilities & cyber glow styles
│   └── main.jsx              # Vite React DOM entrypoint
├── .env.example              # Template for external webhooks/endpoints
├── .gitignore                # Git ignore configuration
├── index.html                # HTML template with SEO & meta tags
├── package.json              # Project dependencies & scripts
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Cyber theme tokens & animations
└── vite.config.js            # Vite configuration with path aliases
```

---

## ⚡ Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or later (v20+ or v24 LTS recommended)
- **npm**: v9.0.0 or later

### Installation

1. Clone or navigate to the repository:
   ```bash
   cd Cypher
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build locally:
   ```bash
   npm run preview
   ```

---

## ⚙️ Customization & Adding Real Club Data

All content is intentionally decoupled from JSX and stored in `src/data/`:

| Data File | Purpose | Customization Instructions |
| :--- | :--- | :--- |
| `src/data/siteConfig.js` | Main brand, campus, social media links | Update club email, location, meeting hours, and official social handles. |
| `src/data/events.js` | Upcoming & past workshops/hackathons | Add events, set categories, configure real registration URLs. Missing URLs automatically render "Registration opens soon". |
| `src/data/projects.js` | Member software projects | Add project titles, descriptions, and tech stacks. When `githubUrl` or `demoUrl` are `null`, the buttons gracefully hide. |
| `src/data/achievements.js` | Hackathon wins & CTF results | Add milestone titles, years, descriptions, and team attributions. |
| `src/data/team.js` | Committee members & roles | Update names, roles, departments, bio snippets, and photo/avatar links. |
| `src/data/faqs.js` | Member queries | Update answers to reflect your university club guidelines. |

---

## 🌐 External Form Integration

By default, the **Join Form** and **Contact Form** run in student-friendly preview mode with real client-side validation, loading spinners, and confirmation cards.

To route submissions to a real service (e.g. Formspree, Google Apps Script, Supabase, or custom REST API):
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Populate the endpoint variables:
   ```env
   VITE_JOIN_FORM_ENDPOINT=https://your-api.com/api/join
   VITE_CONTACT_FORM_ENDPOINT=https://your-api.com/api/contact
   ```

---

## ♿ Accessibility & Performance

- **Semantic HTML5**: Native `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` landmarks.
- **Accessible Forms**: Associated `<label>` elements, `aria-invalid`, `aria-describedby`, clear error messages, and disabled submit states during loading.
- **Keyboard Navigable**: Visible focus rings with high-contrast neon cyan outline.
- **Reduced Motion Support**: Clean, subtle micro-interactions that respect accessibility guidelines.
- **Color Contrast**: Compliant with WCAG AA standards in both Cyber Dark and Light modes.

---

## 📄 License & Credits

Developed with pride by the **Cypher Club** student technical community.  
Free and open for educational and student club usage under the MIT License.

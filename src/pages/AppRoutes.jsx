import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

const Home = lazy(() => import('../components/Hero'))
const About = lazy(() => import('./About'))
const Events = lazy(() => import('./Events'))
const Projects = lazy(() => import('./Projects'))
const Achievements = lazy(() => import('./Achievements'))
const Team = lazy(() => import('./Team'))
const Join = lazy(() => import('./Join'))
const Faqs = lazy(() => import('./Faqs'))

const legacyHashes = {
  top: '/',
  about: '/about',
  events: '/events',
  projects: '/projects',
  achievements: '/achievements',
  team: '/team',
  join: '/join',
  contact: '/contact',
  faqs: '/faqs'
}

function LegacyHashRedirect() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const target = legacyHashes[location.hash.slice(1)]
    if (location.pathname === '/' && target) {
      navigate(target, { replace: true })
    }
  }, [location, navigate])

  return null
}

function RoutePage({ component: Page, transitionName }) {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== '/contact') {
      window.scrollTo(0, 0)
    }
  }, [location.pathname])

  return (
    <div
      key={location.pathname}
      className={`page-transition page-transition-${transitionName}`}
    >
      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center text-sm font-mono text-slate-400">
            Loading page...
          </div>
        }
      >
        <Page />
      </Suspense>
    </div>
  )
}

export default function AppRoutes() {
  return (
    <>
      <LegacyHashRedirect />
      <Routes>
        <Route path="/" element={<RoutePage component={Home} transitionName="home" />} />
        <Route path="/about" element={<RoutePage component={About} transitionName="about" />} />
        <Route path="/events" element={<RoutePage component={Events} transitionName="events" />} />
        <Route path="/projects" element={<RoutePage component={Projects} transitionName="projects" />} />
        <Route path="/achievements" element={<RoutePage component={Achievements} transitionName="achievements" />} />
        <Route path="/team" element={<RoutePage component={Team} transitionName="team" />} />
        <Route path="/join" element={<RoutePage component={Join} transitionName="join" />} />
        <Route path="/contact" element={<RoutePage component={Join} transitionName="contact" />} />
        <Route path="/faqs" element={<RoutePage component={Faqs} transitionName="default" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

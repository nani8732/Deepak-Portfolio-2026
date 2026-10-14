import { lazy, Suspense, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PRESETS, goPreset, reducedMotion as RM } from './lib/sceneState'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Experience from './components/Experience'
import Philosophy from './components/Philosophy'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import ProfilePicker from './components/ProfilePicker'
gsap.registerPlugin(ScrollTrigger)
const Scene3D = lazy(() => import('./components/Scene3D')) // heavy 3D loads after first paint

export default function App() {
  const prog = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      Object.keys(PRESETS).forEach((k) => ScrollTrigger.create({ trigger: '#' + k, start: 'top 55%', end: 'bottom 55%', onToggle: (s) => { if (s.isActive) goPreset(k) } }))
      if (!RM) gsap.to('.hero-copy', { y: 60, opacity: 0, ease: 'none', scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom 25%', scrub: true } })
    })
    const sp = () => { if (prog.current) prog.current.style.width = (scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)) * 100 + '%' }
    addEventListener('scroll', sp, { passive: true })
    return () => { ctx.revert(); removeEventListener('scroll', sp) }
  }, [])
  return (<>
    <Suspense fallback={null}><Scene3D /></Suspense>
    <div className="blob b1" aria-hidden="true" /><div className="blob b2" aria-hidden="true" />
    <Cursor /><div id="prog" ref={prog} />
    <ProfilePicker /><Navbar />
    <Hero />
    <main><About /><Skills /><Projects /><Certifications /><Experience /><Philosophy /><Contact /></main>
    <Footer />
  </>)
}

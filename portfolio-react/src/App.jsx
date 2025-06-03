import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Components
import GalaxyBackground from './components/GalaxyBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import About from './components/About'
import Experience from './components/Experience'
import Testimonials from './components/Testimonials'
import Hire from './components/Hire'
import Footer from './components/Footer'
import ProjectModal from './components/ProjectModal'
import ScrollToTop from './components/ScrollToTop'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

function App() {
  const appRef = useRef(null)

  useEffect(() => {
    // Initialize GSAP animations
    const ctx = gsap.context(() => {
      // Initial page load animation
      const tl = gsap.timeline()
      
      tl.from('.hero-title-char', {
        duration: 1,
        opacity: 0,
        y: 100,
        stagger: 0.06,
        ease: 'back.out',
      })
      .to('.hero-image', {
        duration: 2,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        scale: 1,
        ease: 'expo.out',
      }, '-=1')
      .from('.hero-subtitle', {
        duration: 0.8,
        opacity: 0,
        y: 50,
        ease: 'expo.out',
      }, '-=1.5')
    }, appRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={appRef} className="relative min-h-screen">
      <GalaxyBackground />
      <Navbar />
      <ScrollToTop />
      
      <main className="relative z-10">
        <Hero />
        <Portfolio />
        <About />
        <Experience />
        <Testimonials />
        <Hire />
        <Footer />
      </main>
      
      <ProjectModal />
    </div>
  )
}

export default App

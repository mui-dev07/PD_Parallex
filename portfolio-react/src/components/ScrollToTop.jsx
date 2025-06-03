import { useState, useEffect } from 'react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showNavPopup, setShowNavPopup] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setShowNavPopup(false)
  }

  const navLinks = [
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'hire', label: 'Hire Me' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <>
      {/* Scroll to Top Button */}
      <div className={`scroll-to-top fixed bottom-8 right-8 z-40 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        <div className="relative group">
          <button
            onClick={scrollToTop}
            onDoubleClick={() => setShowNavPopup(!showNavPopup)}
            className="w-12 h-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <svg 
              className="w-6 h-6 transform rotate-180" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
          
          {/* Tooltip */}
          <div className="scroll-tooltip absolute bottom-full right-0 mb-2 px-3 py-2 bg-black/80 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Double click on arrow for menu Options
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
          </div>
        </div>
      </div>

      {/* Navigation Popup */}
      <div className={`scroll-nav-popup fixed bottom-24 right-8 z-50 transition-all duration-300 ${
        showNavPopup ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        <div className="bg-black/90 backdrop-blur-lg border border-white/20 rounded-2xl p-4 min-w-[200px]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="block w-full text-left px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overlay to close popup */}
      {showNavPopup && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowNavPopup(false)}
        />
      )}
    </>
  )
}

export default ScrollToTop 
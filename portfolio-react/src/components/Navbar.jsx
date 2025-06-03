import { useState, useEffect } from 'react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section
      const sections = ['home', 'portfolio', 'about', 'testimonials', 'hire']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 200 && rect.bottom >= 200
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsSidebarOpen(false)
  }

  const navLinks = [
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'hire', label: 'Hire Me' },
  ]

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-2xl font-primary font-bold">Portfolio</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <ul className="flex space-x-8">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className={`relative text-white hover:text-white transition-colors duration-300 ${
                        activeSection === link.id ? 'text-white' : 'text-gray-300'
                      }`}
                    >
                      {link.label}
                      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform transition-transform duration-300 ${
                        activeSection === link.id ? 'scale-x-100' : 'scale-x-0'
                      }`} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Hamburger Menu */}
      <div className="fixed top-4 left-4 z-[60] md:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`flex flex-col justify-center items-center w-8 h-8 space-y-1 transition-all duration-300 ${
            isSidebarOpen ? 'transform rotate-45' : ''
          }`}
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isSidebarOpen ? 'rotate-45 translate-y-1.5' : ''
          }`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isSidebarOpen ? 'opacity-0' : ''
          }`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isSidebarOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`} />
        </button>
      </div>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-black/90 backdrop-blur-lg z-[58] transition-transform duration-300 md:hidden ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 text-white text-2xl w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
        >
          ×
        </button>
        
        <nav className="mt-16 px-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`block w-full text-left py-4 text-lg transition-colors duration-300 border-b border-white/10 ${
                activeSection === link.id ? 'text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}

export default Navbar 
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Footer = () => {
  const sectionRef = useRef(null)

  const socialLinks = [
    { name: 'GitHub', url: '#' },
    { name: 'LinkedIn', url: '#' },
    { name: 'Twitter', url: '#' },
    { name: 'Dribbble', url: '#' }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer text animation
      gsap.utils.toArray('.footer-text span').forEach((span, index) => {
        gsap.from(span, {
          y: parseFloat(span.getAttribute('data-speed')) || 0,
          scrollTrigger: {
            trigger: '.footer-bottom',
            start: 'top bottom',
            scrub: 1.9,
          },
        })
      })

      // Social links animation
      gsap.utils.toArray('.social-link').forEach((link, index) => {
        gsap.from(link, {
          y: parseFloat(link.getAttribute('data-speed')) || 0,
          scrollTrigger: {
            trigger: '.footer-social',
            start: 'top bottom',
            scrub: 1.9,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={sectionRef} id="contact" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="footer-container">
          <div className="footer-content text-center mb-16">
            <h2 className="footer-title font-primary font-bold text-6xl md:text-8xl mb-8">
              LET'S <span className="text-stroke">WORK</span> TOGETHER
            </h2>
            
            <p className="footer-subtitle text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              Ready to bring your ideas to life? Let's create something
              amazing together.
            </p>
            
            <div className="contact-info flex flex-col sm:flex-row gap-8 justify-center items-center">
              <a
                href="mailto:hello@developer.com"
                className="contact-link relative text-xl md:text-2xl text-white hover:text-gray-300 transition-colors duration-300 group"
              >
                <span>hello@developer.com</span>
                <div className="link-underline absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </a>
              
              <a
                href="tel:+1234567890"
                className="contact-link relative text-xl md:text-2xl text-white hover:text-gray-300 transition-colors duration-300 group"
              >
                <span>+1 (234) 567-890</span>
                <div className="link-underline absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </a>
            </div>
          </div>

          <div className="footer-social flex justify-center space-x-8 mb-16">
            {socialLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.url}
                className="social-link relative text-lg text-gray-400 hover:text-white transition-colors duration-300 group"
                data-speed={100 + index * 100}
              >
                <span>{link.name}</span>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom text-center">
          <div className="footer-text text-4xl md:text-6xl font-bold text-gray-600 tracking-wider">
            <span data-speed="-300">D</span>
            <span data-speed="100">E</span>
            <span data-speed="300">V</span>
            <span data-speed="-300">E</span>
            <span data-speed="350">L</span>
            <span data-speed="200">O</span>
            <span data-speed="-310">P</span>
            <span data-speed="200">E</span>
            <span data-speed="-340">R</span>
            <span data-speed="-100">2</span>
            <span data-speed="300">0</span>
            <span data-speed="-200">2</span>
            <span data-speed="150">4</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 
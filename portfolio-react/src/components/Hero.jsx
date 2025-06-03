import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Hero = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split title into characters for animation
      const titleElement = titleRef.current
      const titleText = titleElement.textContent
      titleElement.innerHTML = titleText
        .split('')
        .map(char => `<span class="hero-title-char inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('')

      // Parallax effects
      gsap.to('.title-line:first-child', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          scrub: 1.9,
        },
        yPercent: -150,
      })

      gsap.to('.title-line.stroke', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          scrub: 1.9,
        },
        xPercent: 50,
      })

      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          scrub: 1.9,
        },
        xPercent: -70,
      })

      gsap.to(imageRef.current.querySelector('img'), {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          scrub: 1.9,
        },
        scale: 1.3,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <h1 className="hero-title font-primary font-bold text-6xl md:text-8xl lg:text-9xl leading-none">
              <div className="title-line">
                <span ref={titleRef}>CREATIVE</span>
              </div>
              <div className="title-line stroke text-stroke">
                DEVELOPER
              </div>
            </h1>
            
            <p className="hero-subtitle text-xl md:text-2xl text-gray-300 max-w-md">
              Crafting digital experiences with modern technology
            </p>
          </div>

          {/* Hero Image */}
          <div ref={imageRef} className="hero-image relative">
            <div className="image-container relative overflow-hidden rounded-2xl clip-path-hero">
              <img 
                src="/images/1.jpg" 
                alt="Portfolio Hero" 
                className="w-full h-[600px] object-cover transform scale-110"
              />
              <div className="image-overlay absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-4">
        <span className="scroll-text text-sm text-gray-400 animate-float">Scroll Down</span>
        <div className="scroll-line w-px h-16 bg-white/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-white animate-scroll-line" />
        </div>
      </div>
    </section>
  )
}

export default Hero 
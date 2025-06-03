import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Hire = () => {
  const sectionRef = useRef(null)

  const features = [
    {
      icon: '⚡',
      title: 'Fast Delivery',
      description: 'Quick turnaround times without compromising on quality'
    },
    {
      icon: '🎨',
      title: 'Modern Design',
      description: 'Contemporary aesthetics with cutting-edge technologies'
    },
    {
      icon: '📱',
      title: 'Responsive',
      description: 'Perfect performance across all devices and screen sizes'
    },
    {
      icon: '🚀',
      title: 'Performance',
      description: 'Optimized code for lightning-fast loading speeds'
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title square rotation
      gsap.from('.hire-square', {
        rotation: 720,
        duration: 3,
        scrollTrigger: {
          trigger: '.hire-square',
          start: 'top bottom',
          scrub: 1.9,
        },
      })

      // Feature cards parallax
      gsap.utils.toArray('.hire-feature').forEach((feature, index) => {
        gsap.from(feature, {
          y: -160 - index * 20,
          scrollTrigger: {
            trigger: '.hire-features',
            start: 'top bottom',
            scrub: 1.9,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section ref={sectionRef} id="hire" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hire-container text-center">
          <h2 className="hire-title font-primary font-bold text-6xl md:text-8xl mb-8">
            HIRE <span className="text-stroke">ME</span>
            <span className="hire-square inline-block w-8 h-8 bg-white ml-4 animate-rotate-slow" />
          </h2>
          
          <p className="hire-subtitle text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-16">
            Ready to transform your ideas into stunning digital experiences?
            Let's collaborate and create something extraordinary together.
          </p>

          <div className="hire-features grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="hire-feature bg-glass rounded-2xl p-8 hover-glow transition-all duration-500 hover:scale-105"
                data-speed={-160 - index * 20}
              >
                <div className="hire-feature-icon text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="hire-cta flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={scrollToContact}
              className="hire-btn primary relative px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover-glow"
            >
              <span>Start Project</span>
              <div className="btn-glow absolute inset-0 bg-white/20 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <a
              href="mailto:hello@developer.com"
              className="hire-btn secondary px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
            >
              <span>Send Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hire 
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const About = () => {
  const sectionRef = useRef(null)

  const skills = [
    { name: 'Frontend', tech: 'React, Vue, Angular' },
    { name: 'Backend', tech: 'Node.js, Python, PHP' },
    { name: 'Database', tech: 'MongoDB, MySQL, PostgreSQL' },
    { name: 'Tools', tech: 'GSAP, Three.js, Docker' }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title square rotation
      gsap.from('.about-square', {
        rotation: 720,
        duration: 3,
        scrollTrigger: {
          trigger: '.about-square',
          start: 'top bottom',
          scrub: 1.9,
        },
      })

      // Parallax effects for content
      gsap.from('.about-intro', {
        y: -100,
        scrollTrigger: {
          trigger: '.about-text',
          start: 'top bottom',
          scrub: 1.5,
        },
      })

      gsap.from('.about-description', {
        y: -150,
        scrollTrigger: {
          trigger: '.about-text',
          start: 'top bottom',
          scrub: 1.5,
        },
      })

      // Skills animation
      gsap.utils.toArray('.skill-item').forEach((skill, index) => {
        gsap.from(skill, {
          y: -180 - index * 40,
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top bottom',
            scrub: 1.9,
          },
        })
      })

      // Image parallax
      gsap.from('.about-image', {
        y: -250,
        scrollTrigger: {
          trigger: '.about-container',
          start: 'top bottom',
          scrub: 1.9,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="about-container grid lg:grid-cols-2 gap-16 items-center">
          {/* About Content */}
          <div className="about-content space-y-8">
            <h2 className="section-title font-primary font-bold text-6xl md:text-8xl mb-8">
              ABO<span className="text-stroke">UT</span>
              <span className="about-square inline-block w-8 h-8 bg-white ml-4 animate-rotate-slow" />
            </h2>
            
            <div className="about-text space-y-6">
              <p className="about-intro text-xl text-gray-300 leading-relaxed">
                I'm a passionate developer who creates digital experiences
                that bridge the gap between design and functionality.
              </p>
              
              <p className="about-description text-lg text-gray-400 leading-relaxed">
                With expertise in modern web technologies and a keen eye for
                detail, I transform ideas into stunning, responsive
                applications that deliver exceptional user experiences across
                all devices.
              </p>

              {/* Skills Grid */}
              <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="skill-item bg-glass rounded-xl p-6 hover-glow transition-all duration-300 hover:scale-105"
                  >
                    <span className="skill-name block text-white font-semibold text-lg mb-2">
                      {skill.name}
                    </span>
                    <span className="skill-tech text-gray-400 text-sm">
                      {skill.tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* About Image */}
          <div className="about-image relative">
            <div className="image-container relative">
              <img
                src="/images/2.jpg"
                alt="About Me"
                className="w-full h-[600px] object-cover rounded-2xl"
              />
              <div className="image-border absolute inset-0 border-2 border-white/20 rounded-2xl transform translate-x-4 translate-y-4 -z-10 transition-transform duration-300 hover:translate-x-2 hover:translate-y-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 
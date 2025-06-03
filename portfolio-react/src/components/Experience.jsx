import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Experience = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const sectionRef = useRef(null)

  const experiences = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Tech Company Inc.',
      period: '2022 - Present',
      description: 'Leading frontend development for enterprise applications, mentoring junior developers, and implementing modern web technologies.'
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Digital Agency',
      period: '2020 - 2022',
      description: 'Developed and maintained multiple client websites and web applications using React, Node.js, and various cloud services.'
    },
    {
      id: 3,
      title: 'Junior Developer',
      company: 'Startup Hub',
      period: '2019 - 2020',
      description: 'Started my journey in web development, learning modern frameworks and contributing to various startup projects.'
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title square rotation
      gsap.from('.experience-square', {
        rotation: 720,
        duration: 3,
        scrollTrigger: {
          trigger: '.experience-square',
          start: 'top bottom',
          scrub: 1.9,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title font-primary font-bold text-6xl md:text-8xl text-center mb-20">
          EXPERI<span className="text-stroke">ENCE</span>
          <span className="experience-square inline-block w-8 h-8 bg-white ml-4 animate-rotate-slow" />
        </h2>

        <div className="experience-slider">
          <div className="slider-container">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`slide ${index === activeSlide ? 'active' : 'hidden'} transition-all duration-500`}
              >
                <div className="slide-content bg-glass rounded-2xl p-8 lg:p-12">
                  <div className="slide-number text-6xl font-bold text-white/20 mb-4">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="slide-info">
                    <h3 className="text-3xl font-bold mb-2">{exp.title}</h3>
                    <p className="company text-xl text-gray-300 mb-2">{exp.company}</p>
                    <p className="period text-lg text-gray-400 mb-6">{exp.period}</p>
                    <p className="description text-gray-300 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="slider-controls mt-12 flex flex-col items-center space-y-8">
            <div className="slider-nav flex space-x-4">
              {experiences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`nav-btn w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    index === activeSlide
                      ? 'bg-white text-black border-white'
                      : 'bg-transparent text-white border-white/30 hover:border-white'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
            <div className="slider-progress w-64 h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="progress-bar h-full bg-white transition-all duration-500 ease-out"
                style={{ width: `${((activeSlide + 1) / experiences.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience 
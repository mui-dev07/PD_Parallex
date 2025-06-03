import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Portfolio = () => {
  const sectionRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      image: '/images/3.jpg',
      technologies: ['React', 'Node.js', 'MongoDB'],
      description: 'A full-stack e-commerce platform with modern UI/UX design, payment integration, and admin dashboard.',
      number: '001'
    },
    {
      id: 2,
      title: 'Portfolio Website',
      image: '/images/4.jpg',
      technologies: ['Vue.js', 'GSAP', 'Three.js'],
      description: 'Interactive portfolio website with 3D animations and smooth parallax scrolling effects.',
      number: '002'
    },
    {
      id: 3,
      title: 'Mobile App Design',
      image: '/images/5.jpg',
      technologies: ['React Native', 'Firebase'],
      description: 'Cross-platform mobile application with real-time features and elegant user interface.',
      number: '003'
    },
    {
      id: 4,
      title: 'Dashboard Analytics',
      image: '/images/6.jpg',
      technologies: ['Angular', 'D3.js', 'TypeScript'],
      description: 'Data visualization dashboard with interactive charts and real-time analytics.',
      number: '004'
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title square rotation
      gsap.from('.section-title__square', {
        rotation: 720,
        duration: 3,
        scrollTrigger: {
          trigger: '.section-title__square',
          start: 'top bottom',
          scrub: 1.9,
        },
      })

      // Portfolio items parallax
      gsap.utils.toArray('.portfolio-item').forEach((item, index) => {
        const speed = parseFloat(item.getAttribute('data-speed')) || -200
        gsap.from(item, {
          y: speed,
          scrollTrigger: {
            trigger: '.portfolio-grid',
            start: 'top bottom',
            scrub: 1.9,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="portfolio" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="section-title font-primary font-bold text-6xl md:text-8xl text-center mb-20 relative">
          PORTFO<span className="text-stroke">LIO</span>
          <span className="section-title__square inline-block w-8 h-8 bg-white ml-4 animate-rotate-slow" />
        </h2>

        {/* Portfolio Grid */}
        <div className="portfolio-grid grid md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="portfolio-item group cursor-pointer"
              data-speed={-200 - index * 100}
              data-project={project.id}
            >
              <div className="portfolio-card bg-glass rounded-2xl overflow-hidden hover-glow transition-all duration-500 hover:scale-105">
                <div className="card-image relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="card-overlay absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="overlay-content text-center text-white p-8">
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-300 mb-4">{project.technologies.join(' • ')}</p>
                      <div className="view-btn inline-flex items-center space-x-2 px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                        <span>View Details</span>
                        <div className="btn-arrow">→</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-info p-6 flex items-center justify-between">
                  <span className="project-num text-gray-400">/{project.number}</span>
                  <h4 className="project-title text-xl font-semibold">{project.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio 
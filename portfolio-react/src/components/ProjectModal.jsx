import { useState, useEffect } from 'react'

const ProjectModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = {
    1: {
      title: 'E-Commerce Platform',
      image: '/images/3.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
      description: 'A comprehensive e-commerce platform featuring user authentication, product catalog, shopping cart, payment processing, and admin dashboard. Built with modern technologies for scalability and performance.',
      liveUrl: '#',
      githubUrl: '#'
    },
    2: {
      title: 'Portfolio Website',
      image: '/images/4.jpg',
      technologies: ['Vue.js', 'GSAP', 'Three.js', 'Nuxt.js'],
      description: 'An interactive portfolio website showcasing 3D animations, smooth parallax scrolling, and modern web technologies. Features responsive design and optimized performance.',
      liveUrl: '#',
      githubUrl: '#'
    },
    3: {
      title: 'Mobile App Design',
      image: '/images/5.jpg',
      technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
      description: 'Cross-platform mobile application with real-time features, push notifications, and elegant user interface. Includes offline functionality and cloud synchronization.',
      liveUrl: '#',
      githubUrl: '#'
    },
    4: {
      title: 'Dashboard Analytics',
      image: '/images/6.jpg',
      technologies: ['Angular', 'D3.js', 'TypeScript', 'Chart.js'],
      description: 'Data visualization dashboard with interactive charts, real-time analytics, and comprehensive reporting features. Built for enterprise-level data management.',
      liveUrl: '#',
      githubUrl: '#'
    }
  }

  useEffect(() => {
    const handleProjectClick = (event) => {
      const projectElement = event.target.closest('[data-project]')
      if (projectElement) {
        const projectId = parseInt(projectElement.getAttribute('data-project'))
        if (projects[projectId]) {
          setSelectedProject(projects[projectId])
          setIsOpen(true)
          document.body.classList.add('menu-open')
        }
      }
    }

    document.addEventListener('click', handleProjectClick)
    return () => document.removeEventListener('click', handleProjectClick)
  }, [])

  const closeModal = () => {
    setIsOpen(false)
    setSelectedProject(null)
    document.body.classList.remove('menu-open')
  }

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  if (!isOpen || !selectedProject) return null

  return (
    <div className="project-modal fixed inset-0 z-[100] flex items-center justify-center">
      <div 
        className="modal-overlay absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={closeModal}
      />
      
      <div className="modal-content relative bg-dark-gray rounded-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={closeModal}
          className="modal-close absolute top-4 right-4 text-white text-2xl w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors z-10"
        >
          ×
        </button>
        
        <div className="modal-body">
          <div className="modal-image">
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
            />
          </div>
          
          <div className="modal-info p-8">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">{selectedProject.title}</h3>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {selectedProject.description}
            </p>
            
            <div className="modal-tech mb-8">
              <h4 className="text-xl font-semibold mb-4">Technologies Used:</h4>
              <div className="flex flex-wrap gap-3">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="tech-tag px-4 py-2 bg-white/10 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="modal-links flex flex-col sm:flex-row gap-4">
              <a
                href={selectedProject.liveUrl}
                className="modal-link relative px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 text-center"
              >
                <span>Live Demo</span>
                <div className="btn-glow absolute inset-0 bg-white/20 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </a>
              
              <a
                href={selectedProject.githubUrl}
                className="modal-link secondary px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 text-center"
              >
                View Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal 
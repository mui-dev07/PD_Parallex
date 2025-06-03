import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Testimonials = () => {
  const sectionRef = useRef(null)

  const testimonials = [
    {
      id: 1,
      quote: "Working with this developer was an absolute pleasure. The attention to detail and technical expertise delivered results beyond our expectations. Our website performance improved by 300%!",
      author: "John Smith",
      position: "CEO, Tech Startup",
      avatar: "JS",
      rating: 5
    },
    {
      id: 2,
      quote: "Incredible work! The modern design and smooth animations created exactly the user experience we were looking for. Professional, responsive, and delivered on time.",
      author: "Maria Johnson",
      position: "Creative Director, Design Agency",
      avatar: "MJ",
      rating: 5
    },
    {
      id: 3,
      quote: "Outstanding technical skills combined with creative vision. The e-commerce platform built for us increased our sales by 250%. Highly recommended!",
      author: "Robert Brown",
      position: "Founder, E-commerce Store",
      avatar: "RB",
      rating: 5
    },
    {
      id: 4,
      quote: "The mobile app development exceeded all expectations. Clean code, beautiful UI, and seamless functionality. A true professional who delivers quality work.",
      author: "Lisa Wilson",
      position: "Product Manager, Mobile Solutions",
      avatar: "LW",
      rating: 5
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title square rotation
      gsap.from('.testimonials-square', {
        rotation: 720,
        duration: 3,
        scrollTrigger: {
          trigger: '.testimonials-square',
          start: 'top bottom',
          scrub: 1.9,
        },
      })

      // Testimonial cards parallax
      gsap.utils.toArray('.testimonial-card').forEach((card, index) => {
        gsap.from(card, {
          y: -150 - index * 50,
          scrollTrigger: {
            trigger: '.testimonials-grid',
            start: 'top bottom',
            scrub: 1.9,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}>
        ★
      </span>
    ))
  }

  return (
    <section ref={sectionRef} id="testimonials" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title font-primary font-bold text-6xl md:text-8xl text-center mb-20">
          TESTIMO<span className="text-stroke">NIALS</span>
          <span className="testimonials-square inline-block w-8 h-8 bg-white ml-4 animate-rotate-slow" />
        </h2>

        <div className="testimonials-grid grid md:grid-cols-2 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="testimonial-card bg-glass rounded-2xl p-8 hover-glow transition-all duration-500 hover:scale-105"
              data-speed={-150 - index * 50}
            >
              <div className="testimonial-quote text-lg text-gray-300 leading-relaxed mb-8 relative">
                <span className="text-6xl text-white/20 absolute -top-4 -left-2">"</span>
                {testimonial.quote}
              </div>
              
              <div className="testimonial-author flex items-center space-x-4">
                <div className="author-avatar w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold">
                  {testimonial.avatar}
                </div>
                <div className="author-info flex-1">
                  <h4 className="text-white font-semibold text-lg">{testimonial.author}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.position}</p>
                  <div className="testimonial-rating flex space-x-1 mt-2">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials 
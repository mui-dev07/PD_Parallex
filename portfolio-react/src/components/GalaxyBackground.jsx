import { useEffect, useRef } from 'react'

const GalaxyBackground = () => {
  const starsRef = useRef(null)
  const shootingStarsRef = useRef(null)

  useEffect(() => {
    // Create shooting stars effect
    const createShootingStar = () => {
      const shootingStar = document.createElement('div')
      shootingStar.className = 'shooting-star fixed w-0.5 h-0.5 bg-white rounded-full opacity-0 pointer-events-none z-[2]'
      
      // Random position and direction
      const startX = Math.random() * window.innerWidth
      const startY = Math.random() * window.innerHeight
      const endX = startX + (Math.random() - 0.5) * 200
      const endY = startY + (Math.random() - 0.5) * 200
      
      shootingStar.style.left = startX + 'px'
      shootingStar.style.top = startY + 'px'
      
      // Add tail effect
      const tail = document.createElement('div')
      tail.className = 'absolute top-1/2 left-1/2 w-20 h-px bg-gradient-to-r from-white to-transparent transform -translate-x-1/2 -translate-y-1/2'
      shootingStar.appendChild(tail)
      
      document.body.appendChild(shootingStar)
      
      // Animate
      shootingStar.style.opacity = '1'
      shootingStar.animate([
        { transform: `translate(0, 0)`, opacity: 1 },
        { transform: `translate(${endX - startX}px, ${endY - startY}px)`, opacity: 0 }
      ], {
        duration: 1000 + Math.random() * 1000,
        easing: 'ease-out'
      }).onfinish = () => {
        document.body.removeChild(shootingStar)
      }
    }

    // Create shooting stars periodically
    const shootingStarInterval = setInterval(() => {
      createShootingStar()
    }, 3000 + Math.random() * 5000)

    return () => {
      clearInterval(shootingStarInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[1] overflow-hidden bg-gradient-radial from-soft-black to-primary-black">
      {/* Static Stars Layer 1 */}
      <div 
        ref={starsRef}
        className="absolute inset-0 bg-stars-1 bg-stars bg-repeat animate-twinkle"
      />
      
      {/* Static Stars Layer 2 */}
      <div className="absolute inset-0 bg-stars-2 bg-stars bg-repeat animate-twinkle-reverse" />
      
      {/* Moving Stars */}
      <div className="absolute inset-0 bg-moving-stars bg-moving-stars bg-repeat animate-moving-stars" />
      
      {/* Shooting Stars Container */}
      <div ref={shootingStarsRef} className="absolute inset-0" />
    </div>
  )
}

export default GalaxyBackground 
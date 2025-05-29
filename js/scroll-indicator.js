// ===== CUSTOM SCROLL INDICATOR ===== 
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (!scrollIndicator) return;
    
    // Update scroll progress
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        
        // Update CSS custom property for scroll progress
        document.documentElement.style.setProperty('--scroll-progress', `${scrollProgress}%`);
        
        // Add glow effect when scrolling
        if (scrollProgress > 0) {
            scrollIndicator.style.opacity = '1';
        } else {
            scrollIndicator.style.opacity = '0.7';
        }
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollProgress);
            ticking = true;
        }
    }
    
    function handleScroll() {
        ticking = false;
        requestTick();
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize on load
    updateScrollProgress();
    
    // Smooth scroll to top functionality
    function createScrollToTop() {
        const scrollToTopBtn = document.createElement('div');
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        
        document.body.appendChild(scrollToTopBtn);
        
        // Show/hide scroll to top button
        function toggleScrollToTop() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }
        
        // Scroll to top functionality
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', toggleScrollToTop, { passive: true });
        toggleScrollToTop(); // Initialize
    }
    
    // Create scroll to top button
    createScrollToTop();
    
    // Enhanced smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===== CUSTOM SCROLLBAR ENHANCEMENTS =====
document.addEventListener('DOMContentLoaded', function() {
    // Add custom scrollbar hover effects for different sections
    const sections = document.querySelectorAll('section, .header, .footer');
    
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.setProperty('--scrollbar-hover', '1');
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.setProperty('--scrollbar-hover', '0');
        });
    });
    
    // Parallax scrolling effect for background elements
    function handleParallaxScroll() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }
    
    // Throttled parallax scroll
    let parallaxTicking = false;
    function requestParallaxTick() {
        if (!parallaxTicking) {
            requestAnimationFrame(handleParallaxScroll);
            parallaxTicking = true;
        }
    }
    
    function handleParallaxScrollEvent() {
        parallaxTicking = false;
        requestParallaxTick();
    }
    
    window.addEventListener('scroll', handleParallaxScrollEvent, { passive: true });
}); 
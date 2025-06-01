// ===== OPTIMIZED SCROLL INDICATOR ===== 
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (!scrollIndicator) return;
    
    // Performance detection
    const isLowEndDevice = (() => {
        const ram = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 4;
        return ram < 4 || cores < 4 || window.innerWidth <= 768;
    })();
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Throttle variables
    let ticking = false;
    let lastKnownScrollPosition = 0;
    
    // Update scroll progress with better performance
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Only update if scroll position changed significantly
        if (Math.abs(scrollTop - lastKnownScrollPosition) < 2) {
            ticking = false;
            return;
        }
        
        lastKnownScrollPosition = scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min((scrollTop / scrollHeight) * 100, 100);
        
        // Use CSS custom property for better performance
        document.documentElement.style.setProperty('--scroll-progress', `${scrollProgress}%`);
        
        // Simplified opacity logic
        scrollIndicator.style.opacity = scrollProgress > 0 ? '1' : '0.7';
        
        ticking = false;
    }
    
    // Optimized scroll handler
    function handleScroll() {
        if (!ticking) {
            // Use requestAnimationFrame for smooth performance
            requestAnimationFrame(updateScrollProgress);
            ticking = true;
        }
    }
    
    // Add scroll event listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize on load
    updateScrollProgress();
    
    // Optimized scroll to top functionality
    function createScrollToTop() {
        const scrollToTopBtn = document.createElement('div');
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        
        document.body.appendChild(scrollToTopBtn);
        
        let isVisible = false;
        
        // Show/hide scroll to top button with throttling
        function toggleScrollToTop() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const shouldShow = scrollTop > 500;
            
            if (shouldShow !== isVisible) {
                isVisible = shouldShow;
                scrollToTopBtn.classList.toggle('visible', shouldShow);
            }
        }
        
        // Optimized scroll to top functionality
        scrollToTopBtn.addEventListener('click', function() {
            // Use native smooth scrolling if supported, fallback to manual animation
            if ('scrollBehavior' in document.documentElement.style) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Fallback smooth scroll for older browsers
                const scrollStep = -window.scrollY / (300 / 15);
                const scrollInterval = setInterval(function(){
                    if (window.scrollY !== 0) {
                        window.scrollBy(0, scrollStep);
                    } else {
                        clearInterval(scrollInterval);
                    }
                }, 15);
            }
        });
        
        // Throttled scroll listener for button visibility
        let buttonTicking = false;
        function handleButtonScroll() {
            if (!buttonTicking) {
                requestAnimationFrame(toggleScrollToTop);
                buttonTicking = true;
            }
        }
        
        window.addEventListener('scroll', () => {
            buttonTicking = false;
            handleButtonScroll();
        }, { passive: true });
        
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
                
                // Use native smooth scrolling if supported
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    // Fallback for older browsers
                    const startPosition = window.pageYOffset;
                    const distance = offsetPosition - startPosition;
                    const duration = 800;
                    let start = null;
                    
                    function animation(currentTime) {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const run = ease(timeElapsed, startPosition, distance, duration);
                        window.scrollTo(0, run);
                        if (timeElapsed < duration) requestAnimationFrame(animation);
                    }
                    
                    function ease(t, b, c, d) {
                        t /= d / 2;
                        if (t < 1) return c / 2 * t * t + b;
                        t--;
                        return -c / 2 * (t * (t - 2) - 1) + b;
                    }
                    
                    requestAnimationFrame(animation);
                }
            }
        });
    });
});

// ===== OPTIMIZED PARALLAX SCROLLING =====
document.addEventListener('DOMContentLoaded', function() {
    // Skip heavy animations on low-end devices or reduced motion preference
    const isLowEndDevice = (() => {
        const ram = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 4;
        return ram < 4 || cores < 4 || window.innerWidth <= 768;
    })();
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isLowEndDevice || prefersReducedMotion) {
        return; // Skip parallax on low-end devices or reduced motion
    }
    
    // Optimized parallax scrolling for background elements
    const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
    
    if (!parallaxElements.length) return;
    
    let parallaxTicking = false;
    let lastScrollPosition = 0;
    
    function handleParallaxScroll() {
        const scrolled = window.pageYOffset;
        
        // Only update if scroll changed significantly
        if (Math.abs(scrolled - lastScrollPosition) < 5) {
            parallaxTicking = false;
            return;
        }
        
        lastScrollPosition = scrolled;
        
        // Use transform3d for better performance
        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1); // Reduced speed for better performance
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        
        parallaxTicking = false;
    }
    
    // Throttled parallax scroll handler
    function handleParallaxScrollEvent() {
        if (!parallaxTicking) {
            requestAnimationFrame(handleParallaxScroll);
            parallaxTicking = true;
        }
    }
    
    window.addEventListener('scroll', handleParallaxScrollEvent, { passive: true });
}); 
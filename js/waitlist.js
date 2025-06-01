document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // Performance detection and device capabilities
  const isLowEndDevice = (() => {
    const ram = navigator.deviceMemory || 4; // Default to 4GB if unknown
    const cores = navigator.hardwareConcurrency || 4; // Default to 4 cores
    return ram < 4 || cores < 4 || window.innerWidth <= 768;
  })();

  // Reduced motion support
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Check device type for responsive animations
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;

  // Performance throttling
  let animationThrottle = false;
  const throttleDelay = isLowEndDevice ? 32 : 16; // Reduce FPS on low-end devices

  // Initialize text splitting for animations (with error handling)
  try {
    if (typeof Splitting !== 'undefined' && !prefersReducedMotion) {
      Splitting();
    }
  } catch (error) {
    console.warn('Splitting.js not loaded:', error);
  }

  // Initialize smooth scrolling library (with error handling and performance check)
  try {
    if (typeof luxy !== 'undefined' && !isLowEndDevice && !prefersReducedMotion) {
      luxy.init({
        wrapper: '#luxy',
        targets: '.luxy-el',
        wrapperSpeed: isMobile ? 0.12 : 0.08, // Faster on mobile for better performance
        targetSpeed: 0.01, // Reduced for better performance
        targetPercentage: 0.05 // Reduced for smoother animation
      });
    }
  } catch (error) {
    console.warn('Luxy.js not loaded:', error);
  }

  // Register GSAP plugins (with error handling)
  try {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Performance settings for GSAP
      gsap.config({
        force3D: true,
        nullTargetWarn: false
      });
    }
  } catch (error) {
    console.warn('GSAP not loaded:', error);
  }

  // ===== OPTIMIZED INITIAL ANIMATIONS =====
  function initAnimations() {
    // Ensure ALL content is visible first - this is crucial
    const elementsToShow = [
      '.hero-content',
      '.logo-container', 
      '.main-heading',
      '.heading-word',
      '.subtitle',
      '.subtitle .char',
      '.podcast-preview',
      '.waitlist-form-container',
      '.stat-item',
      '.header__marq'
    ];
    
    elementsToShow.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (el) {
          el.style.opacity = '1';
          el.style.visibility = 'visible';
          el.style.transform = 'none';
        }
      });
    });

    // Skip complex animations on reduced motion or low-end devices
    if (prefersReducedMotion || isLowEndDevice) {
      console.warn('Animations disabled for better performance/accessibility');
      startPodcastAnimation();
      animateCounters();
      return;
    }

    // Only run animations if GSAP is available and elements exist
    if (typeof gsap === 'undefined') {
      console.warn('GSAP not available, content is visible without animations');
      return;
    }

    // Wait a bit to ensure DOM is fully ready
    setTimeout(() => {
      try {
        // Check if elements exist before animating
        const logoContainer = document.querySelector('.logo-container');
        const headingWords = document.querySelectorAll('.heading-word');
        const heroContent = document.querySelector('.hero-content');
        
        if (!logoContainer || !headingWords.length || !heroContent) {
          console.warn('Required elements not found, skipping animations');
          return;
        }

        // Simplified timeline with better performance
        const tl = gsap.timeline({
          defaults: {
            ease: "power2.out",
            force3D: true
          },
          onComplete: () => {
            // Ensure everything is visible after animations complete
            elementsToShow.forEach(selector => {
              const elements = document.querySelectorAll(selector);
              elements.forEach(el => {
                if (el) {
                  el.style.opacity = '1';
                  el.style.visibility = 'visible';
                }
              });
            });
          }
        });

        // Batch animations for better performance
        tl.fromTo(".logo-container", 
          { opacity: 0, y: -30 },
          { duration: 0.8, opacity: 1, y: 0 }
        )
        .fromTo(".logo-image", 
          { scale: 0.8, rotation: -90 },
          { duration: 0.6, scale: 1, rotation: 0, ease: "back.out(1.2)" }, 
          "-=0.4"
        )
        .fromTo(".heading-word", 
          { opacity: 0, y: 50 },
          { duration: 0.8, opacity: 1, y: 0, stagger: 0.1 }, 
          "-=0.2"
        );
        
        // Only animate subtitle chars if they exist, otherwise animate subtitle
        const subtitleChars = document.querySelectorAll('.subtitle .char');
        if (subtitleChars.length > 0) {
          tl.fromTo(".subtitle .char", 
            { opacity: 0, y: 20 },
            { duration: 0.6, opacity: 1, y: 0, stagger: 0.005 }, 
            "-=0.4"
          );
        } else {
          tl.fromTo(".subtitle", 
            { opacity: 0, y: 20 },
            { duration: 0.6, opacity: 1, y: 0 }, 
            "-=0.4"
          );
        }

        tl.fromTo([".podcast-preview", ".waitlist-form-container", ".stat-item"], 
          { opacity: 0, y: 30 },
          { duration: 0.6, opacity: 1, y: 0, stagger: 0.1 }, 
          "-=0.3"
        )
        .fromTo(".header__marq", 
          { opacity: 0 },
          { duration: 0.5, opacity: 1 }, 
          "-=0.2"
        );

        // Start other animations with delay
        tl.call(animateCounters, null, "-=0.2");
        tl.call(startPodcastAnimation, null, "-=0.3");

      } catch (error) {
        console.error('Animation error:', error);
        // Ensure content is visible even if animations fail
        elementsToShow.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            if (el) {
              el.style.opacity = '1';
              el.style.visibility = 'visible';
            }
          });
        });
      }
    }, 100); // Reduced delay
  }

  // ===== OPTIMIZED PODCAST ANIMATION =====
  function startPodcastAnimation() {
    const podcastPlayer = document.querySelector('.podcast-player');
    const bars = document.querySelectorAll('.equalizer .bar');
    
    if (!podcastPlayer || !bars.length) return;

    // Always animate equalizer bars with slower speed
    bars.forEach((bar, index) => {
      if (typeof gsap !== 'undefined') {
        gsap.to(bar, {
          scaleY: () => 0.3 + Math.random() * 0.7,
          duration: 0.6 + Math.random() * 0.8, // Slowed down duration
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.2 // Increased delay between bars
        });
      } else {
        // Fallback CSS animation if GSAP is not available (slower)
        bar.style.animation = `equalizer ${0.6 + Math.random() * 0.8}s ease-in-out infinite alternate`;
        bar.style.animationDelay = `${index * 0.2}s`;
      }
    });

    // Add live indicator pulse animation (slower)
    const liveIndicator = document.querySelector('.live-indicator');
    if (liveIndicator && typeof gsap !== 'undefined') {
      gsap.to(liveIndicator, {
        opacity: 0.6,
        duration: 2.5, // Slowed down from 1.5s
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }

    // Modal click handler - ensure this always works
    podcastPlayer.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Podcast player clicked!'); // Debug log
      openModal();
    });
  }

  // ===== OPTIMIZED COUNTER ANIMATION =====
  function animateCounters() {
      const counters = document.querySelectorAll('.stat-number');
      
    if (!counters.length) return;
      
      counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count') || '0');
      let current = 0;
      const increment = Math.ceil(target / (isLowEndDevice ? 30 : 60)); // Reduced steps on low-end devices
      const duration = isLowEndDevice ? 1000 : 2000;
      const stepTime = duration / (target / increment);

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
          }
        counter.textContent = current;
      }, stepTime);
    });
  }

  // ===== OPTIMIZED PARALLAX SETUP =====
  function setupParallax() {
    // Always show background animations, just optimize them
    if (typeof gsap === 'undefined') {
      return;
    }

    try {
      // Keep background animations but make them lighter on mobile
      const shapes = document.querySelectorAll('.floating-shapes .shape');
      const waves = document.querySelectorAll('.audio-waves .wave');
      
      // Ensure background elements are visible
      shapes.forEach(shape => {
        shape.style.opacity = '1';
        shape.style.visibility = 'visible';
      });
      
      waves.forEach(wave => {
        wave.style.opacity = '1';
        wave.style.visibility = 'visible';
      });

      // Only add parallax scrolling effects if not low-end device
      if (!isLowEndDevice && !prefersReducedMotion) {
        // Simplified parallax with better performance
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach((card, index) => {
          const speed = -0.5 - (index * 0.1);
          
          gsap.to(card, {
            yPercent: speed * 10,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1, // Smooth scrubbing
              invalidateOnRefresh: true
            }
          });
        });
      }

    } catch (error) {
      console.error('Parallax setup error:', error);
    }
  }

  // ===== OPTIMIZED FORM SETUP =====
  function setupForm() {
    const form = document.getElementById('waitlistForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const submitBtn = document.querySelector('.submit-btn');

    if (!form || !nameInput || !emailInput || !submitBtn) {
      console.warn('Form elements not found');
      return;
    }

    // Throttled input validation
    let validationThrottle = false;
    
    function throttledValidation() {
      if (!validationThrottle) {
        validationThrottle = true;
        setTimeout(() => {
          validationThrottle = false;
        }, 200);
        return true;
      }
      return false;
    }

    // Enhanced form validation with performance optimization
    function validateForm() {
      if (!throttledValidation()) return false;
      
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      
      // Clear previous error states
      nameInput.classList.remove('error');
      emailInput.classList.remove('error');
      
      let isValid = true;
      
      if (name.length < 2) {
        nameInput.classList.add('error');
        if (!prefersReducedMotion) shakeElement(nameInput);
        isValid = false;
      }
      
      if (!isValidEmail(email)) {
        emailInput.classList.add('error');
        if (!prefersReducedMotion) shakeElement(emailInput);
        isValid = false;
      }
      
      return isValid;
    }

    // Form submission with optimized animation
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      if (!validateForm()) {
        showAlert('Please fill in all fields correctly.', 'error');
        return;
      }

      const formData = new FormData(form);
      const name = formData.get('name');
      const email = formData.get('email');

      // Show loading state
      animateButtonLoading(true);
      
      try {
        // Simulated API call - replace with your actual endpoint
        await new Promise(resolve => setTimeout(resolve, 1500));
          
        // Success handling
            animateButtonLoading(false);
        if (!prefersReducedMotion && !isLowEndDevice) {
          animateButtonSuccess();
          createConfetti();
        }
        
        showAlert('🎉 Welcome to PodGorilla! Check your email for updates.', 'success');
        form.reset();
        
      } catch (error) {
        console.error('Submission error:', error);
        animateButtonLoading(false);
        showAlert('Something went wrong. Please try again.', 'error');
      }
    });

    // Optimized helper functions
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function shakeElement(element) {
      if (prefersReducedMotion) return;
      element.style.animation = 'shake 0.5s ease-in-out';
      setTimeout(() => {
        element.style.animation = '';
      }, 500);
    }

    function animateButtonLoading(loading) {
      const btnText = submitBtn.querySelector('.btn-text');
      
      if (loading) {
        btnText.textContent = 'Joining...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
      } else {
        btnText.textContent = 'Join Waitlist';
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
      }
    }

    function animateButtonSuccess() {
      if (prefersReducedMotion || typeof gsap === 'undefined') return;
      
      const btnText = submitBtn.querySelector('.btn-text');
      btnText.textContent = '✓ Joined!';
      
      gsap.to(submitBtn, {
        duration: 0.3,
        scale: 1.02, // Reduced scale for performance
        ease: "back.out(1.2)",
        yoyo: true,
        repeat: 1
      });
    }

    function createConfetti() {
      if (prefersReducedMotion || isLowEndDevice || typeof gsap === 'undefined') return;
      
      const colors = ['#ED454A', '#B453E7', '#6366f1', '#f093fb', '#ff4757'];
      const confettiCount = isLowEndDevice ? 20 : 50; // Reduced count for low-end devices
      
      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
          position: fixed;
          width: 8px;
          height: 8px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          top: 50%;
          left: 50%;
          z-index: 10000;
          pointer-events: none;
          border-radius: 50%;
        `;
        
        document.body.appendChild(confetti);
        
        gsap.to(confetti, {
          duration: 1.5, // Reduced duration
          x: (Math.random() - 0.5) * 600, // Reduced spread
          y: (Math.random() - 0.5) * 400,
          rotation: Math.random() * 360,
          opacity: 0,
          scale: 0,
          ease: "power2.out",
          onComplete: () => confetti.remove()
        });
      }
    }

    function showAlert(message, type = 'info') {
      const alertContainer = document.getElementById('alertContainer');
      
      const alert = document.createElement('div');
      alert.className = `alert ${type}`;
      alert.innerHTML = `
        <button class="alert-close" aria-label="Close alert">&times;</button>
        <div class="alert-message">${message}</div>
      `;
      
      alertContainer.appendChild(alert);
      
      // Optimized show animation
      requestAnimationFrame(() => {
        alert.classList.add('show');
      });
      
      // Auto close after 4 seconds (reduced time)
      const autoCloseTimer = setTimeout(() => {
        closeAlert(alert);
      }, 4000);
      
      // Manual close
      const closeBtn = alert.querySelector('.alert-close');
      closeBtn.addEventListener('click', () => {
        clearTimeout(autoCloseTimer);
        closeAlert(alert);
      });
      
      function closeAlert(alertElement) {
        alertElement.classList.remove('show');
        setTimeout(() => {
          if (alertElement.parentNode) {
            alertElement.remove();
          }
        }, 300); // Reduced timeout
      }
    }
  }

  // ===== OPTIMIZED INTERACTIVE ANIMATIONS =====
  function setupInteractiveAnimations() {
    // Skip complex interactions on low-end devices
    if (isLowEndDevice || prefersReducedMotion || typeof gsap === 'undefined') {
      return;
    }

    // Optimized logo hover effect
    const logo = document.querySelector('.logo');
    if (logo && !isMobile) {
      let logoHoverTween;
      
      logo.addEventListener('mouseenter', () => {
        if (logoHoverTween) logoHoverTween.kill();
        logoHoverTween = gsap.to('.logo-image', {
          duration: 0.2,
          scale: 1.05, // Reduced scale
          rotation: 3, // Reduced rotation
            ease: "power2.out"
          });
      });

      logo.addEventListener('mouseleave', () => {
        if (logoHoverTween) logoHoverTween.kill();
        logoHoverTween = gsap.to('.logo-image', {
          duration: 0.2,
            scale: 1,
            rotation: 0,
            ease: "power2.out"
          });
      });
    }

    // Optimized feature cards hover effect
    document.querySelectorAll('.feature-card').forEach(card => {
      if (isMobile) return; // Skip on mobile
      
      let cardTween;
      
      card.addEventListener('mouseenter', () => {
        if (cardTween) cardTween.kill();
        cardTween = gsap.to(card, {
          duration: 0.2,
          y: -5, // Reduced movement
            ease: "power2.out"
          });
      });

      card.addEventListener('mouseleave', () => {
        if (cardTween) cardTween.kill();
        cardTween = gsap.to(card, {
          duration: 0.2,
            y: 0,
            ease: "power2.out"
          });
      });
    });
  }

  // ===== OPTIMIZED RESIZE HANDLER =====
  function handleResize() {
    // Throttled resize handler
    let resizeTimeout;
    
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Update device detection
        const newIsMobile = window.innerWidth <= 768;
        const newIsTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
        
        // Refresh ScrollTrigger if available
        if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
  }

        // Ensure content visibility
        ensureContentVisibility();
      }, 250); // Reduced throttle time
    });
  }

  // ===== OPTIMIZED CONTENT VISIBILITY =====
  function ensureContentVisibility() {
    const elementsToShow = [
      '.hero-content',
      '.logo-container', 
      '.main-heading',
      '.heading-word',
      '.subtitle',
      '.podcast-preview',
      '.waitlist-form-container',
      '.stat-item',
      '.header__marq'
    ];
    
    elementsToShow.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (el) {
          el.style.opacity = '1';
          el.style.visibility = 'visible';
          el.style.transform = 'none';
        }
      });
    });
  }

  // ===== OPTIMIZED INITIALIZATION =====
  function init() {
    try {
      console.log('🚀 Initializing PodGorilla...'); // Debug log
      
      // Ensure content is visible first
      ensureContentVisibility();
      
      // Setup modal functionality EARLY (before other animations)
      setupModal();
      
      // Fix body height issues from luxy.js
      fixBodyHeight();
      
      // Initialize core functions
      initAnimations();
      setupForm();
      setupParallax();
      handleResize();
      
      // Initialize interactions only if not reduced motion
      if (!prefersReducedMotion && !isLowEndDevice) {
        setupInteractiveAnimations();
      }
      
      // Preload critical images
      preloadImages();
      
      // Additional event delegation for podcast player (backup)
      document.addEventListener('click', function(e) {
        if (e.target.closest('.podcast-player')) {
          e.preventDefault();
          e.stopPropagation();
          console.log('🎵 Event delegation: Opening modal...'); // Debug log
          if (window.openModal) {
            window.openModal();
          }
        }
      });
      
      // Fix body height periodically to prevent spacing issues
      setInterval(fixBodyHeight, 2000);
      
      console.log('✅ PodGorilla initialized successfully!'); // Debug log
      
    } catch (error) {
      console.error('❌ Initialization error:', error);
      // Ensure content is visible even if initialization fails
      ensureContentVisibility();
      // Still try to setup modal even if other things fail
      setupModal();
    }
  }

  // ===== OPTIMIZED IMAGE PRELOADING =====
  const preloadImages = () => {
    const imageUrls = [
      'img/Logo/Pod Gorilla Logo-01.png',
      'img/Logo/Pod Gorilla Logo-02.png'
    ];
    
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  };

  // ===== OPTIMIZED MODAL FUNCTIONALITY =====
  function setupModal() {
    const podcastPlayer = document.querySelector('.podcast-player');
    const modal = document.getElementById('playlistModal');
    const closeModal = document.getElementById('closeModal');
    const youtubePlayer = document.getElementById('youtubePlayer');
    
    console.log('Setting up modal...', { podcastPlayer, modal, closeModal, youtubePlayer }); // Debug log
    
    if (!modal) {
      console.error('Modal not found!');
      return;
    }

    // Global modal functions (accessible from anywhere)
    window.openModal = function() {
      console.log('Opening modal...'); // Debug log
      
      // Ensure modal is properly styled for centering
      modal.style.display = 'flex';
      modal.style.alignItems = 'center';
      modal.style.justifyContent = 'center';
      
      // Add show class
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
      
      // Force centering
      setTimeout(() => {
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
      }, 10);
      
      // Load YouTube playlist with delay for better performance
      setTimeout(() => {
        if (youtubePlayer && !youtubePlayer.src) {
          youtubePlayer.src = 'https://www.youtube.com/embed/videoseries?list=PLMQYoEoYSyuN4C4G1QjsJBnrPTWsF18Aj&autoplay=1';
        }
      }, 300);
    };

    window.closeModalFunc = function() {
      console.log('Closing modal...'); // Debug log
      modal.classList.remove('show');
      document.body.style.overflow = '';
      
      // Stop video playback
      if (youtubePlayer) {
        youtubePlayer.src = '';
      }
      
      // Reset display after animation
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    };

    // Event listeners
    if (closeModal) {
      closeModal.addEventListener('click', window.closeModalFunc);
    }
    
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        window.closeModalFunc();
      }
    });
    
    // Keyboard support
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        window.closeModalFunc();
      }
    });

    // Ensure podcast player click works (backup handler)
    if (podcastPlayer) {
      podcastPlayer.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Backup podcast player clicked!'); // Debug log
        window.openModal();
      });
    }
  }

  // ===== FIX BODY HEIGHT ISSUES =====
  function fixBodyHeight() {
    try {
      const wrapper = document.querySelector('.wrapp');
      if (wrapper) {
        const wrapperHeight = wrapper.scrollHeight;
        const windowHeight = window.innerHeight;
        
        // Ensure body height doesn't exceed wrapper height by too much
        if (document.body.style.height) {
          const bodyHeight = parseInt(document.body.style.height);
          if (bodyHeight > wrapperHeight + 100) { // Allow 100px buffer
            document.body.style.height = Math.max(wrapperHeight, windowHeight) + 'px';
          }
        }
        
        // Ensure minimum height for proper layout
        if (wrapperHeight < windowHeight) {
          wrapper.style.minHeight = windowHeight + 'px';
        }
      }
    } catch (error) {
      console.warn('Body height fix error:', error);
    }
  }

  // Initialize when DOM is loaded
  init();
}); 
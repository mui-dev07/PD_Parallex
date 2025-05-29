document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // Check device type for responsive animations
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;

  // Initialize text splitting for animations (with error handling)
  try {
    if (typeof Splitting !== 'undefined') {
      Splitting();
    }
  } catch (error) {
    console.warn('Splitting.js not loaded:', error);
  }

  // Initialize smooth scrolling library (with error handling)
  try {
    if (typeof luxy !== 'undefined') {
      luxy.init({
        wrapper: '#luxy',
        targets: '.luxy-el',
        wrapperSpeed: 0.08
      });
    }
  } catch (error) {
    console.warn('Luxy.js not loaded:', error);
  }

  // Register GSAP plugins (with error handling)
  try {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  } catch (error) {
    console.warn('GSAP not loaded:', error);
  }

  // ===== INITIAL ANIMATIONS =====
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

        const tl = gsap.timeline({
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

        // Set initial states manually (safer than relying on from() animations)
        gsap.set(".logo-container", { opacity: 0, y: -50 });
        gsap.set(".logo-image", { scale: 0, rotation: -180 });
        gsap.set(".logo-text", { opacity: 0, x: -30 });
        gsap.set(".heading-word", { opacity: 0, y: 100, rotationX: 90 });
        
        // Only animate subtitle chars if they exist
        const subtitleChars = document.querySelectorAll('.subtitle .char');
        if (subtitleChars.length > 0) {
          gsap.set(".subtitle .char", { opacity: 0, yPercent: 50 });
        }
        
        gsap.set(".podcast-preview", { opacity: 0, scale: 0.8 });
        gsap.set(".waitlist-form-container", { opacity: 0, y: 50 });
        gsap.set(".stat-item", { opacity: 0, y: 30, scale: 0.8 });
        gsap.set(".header__marq", { opacity: 0, yPercent: 100 });

        // Animate to final states
        tl.to(".logo-container", {
          duration: 1,
          opacity: 1,
          y: 0,
          ease: "power2.out",
        });

        tl.to(".logo-image", {
          duration: 0.8,
          scale: 1,
          rotation: 0,
          ease: "back.out(1.7)",
        }, "-=0.5");

        tl.to(".logo-text", {
          duration: 0.6,
          opacity: 1,
          x: 0,
          ease: "power2.out",
        }, "-=0.3");

        tl.to(".heading-word", {
          duration: 1.2,
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.15,
          ease: "back.out(1.7)",
          transformOrigin: "center bottom",
        }, "-=0.3");

        // Only animate subtitle chars if they exist
        if (subtitleChars.length > 0) {
          tl.to(".subtitle .char", {
            duration: 0.8,
            opacity: 1,
            yPercent: 0,
            stagger: 0.01,
            ease: "power2.out",
          }, "-=0.6");
        } else {
          // Fallback for subtitle without splitting
          tl.to(".subtitle", {
            duration: 0.8,
            opacity: 1,
            ease: "power2.out",
          }, "-=0.6");
        }

        tl.to(".podcast-preview", {
          duration: 1,
          opacity: 1,
          scale: 1,
          ease: "power2.out",
        }, "-=0.4");

        tl.to(".waitlist-form-container", {
          duration: 1,
          opacity: 1,
          y: 0,
          ease: "power2.out",
        }, "-=0.6");

        tl.to(".stat-item", {
          duration: 0.8,
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }, "-=0.6");

        tl.to(".header__marq", {
          duration: 1,
          opacity: 1,
          yPercent: 0,
          ease: "power2.out",
        }, "-=0.8");

        // Start other animations
        tl.call(animateCounters, null, "-=0.3");
        tl.call(startPodcastAnimation, null, "-=0.5");

      } catch (error) {
        console.error('Animation error:', error);
        // Ensure content is visible even if animations fail
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
    }, 100); // Small delay to ensure DOM is ready
  }

  // ===== PODCAST PLAYER ANIMATION =====
  function startPodcastAnimation() {
    if (typeof gsap === 'undefined') {
      return;
    }

    try {
      // Check if elements exist before animating
      const equalizerBars = document.querySelectorAll('.equalizer .bar');
      const liveIndicator = document.querySelector('.live-indicator');
      const episodeTitle = document.querySelector('.episode-title');

      // Animate equalizer bars only if they exist
      if (equalizerBars.length > 0) {
        gsap.to(".equalizer .bar", {
          duration: "random(0.5, 2)",
          height: "random(10, 35)",
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          stagger: {
            each: 0.1,
            repeat: -1,
            yoyo: true
          }
        });
      }

      // Pulse live indicator only if it exists
      if (liveIndicator) {
        gsap.to(".live-indicator", {
          duration: 1.5,
          opacity: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      }

      // Animate episode title only if it exists
      if (episodeTitle) {
        const episodeNumbers = [247, 248, 249, 250, 251];
        let currentIndex = 0;
        
        setInterval(() => {
          currentIndex = (currentIndex + 1) % episodeNumbers.length;
          const currentEpisodeTitle = document.querySelector('.episode-title');
          
          if (currentEpisodeTitle) {
            gsap.to(currentEpisodeTitle, {
              duration: 0.3,
              opacity: 0,
              y: -10,
              ease: "power2.in",
              onComplete: () => {
                currentEpisodeTitle.textContent = `AI-Generated Episode #${episodeNumbers[currentIndex]}`;
                gsap.to(currentEpisodeTitle, {
                  duration: 0.3,
                  opacity: 1,
                  y: 0,
                  ease: "power2.out"
                });
              }
            });
          }
        }, 3000);
      }
    } catch (error) {
      console.error('Podcast animation error:', error);
    }
  }

  // ===== COUNTER ANIMATION =====
  function animateCounters() {
    if (typeof gsap === 'undefined') {
      return;
    }

    try {
      const counters = document.querySelectorAll('.stat-number');
      
      if (counters.length === 0) {
        console.warn('No stat counters found');
        return;
      }
      
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        if (isNaN(target)) {
          console.warn('Invalid data-count attribute:', counter);
          return;
        }
        
        const duration = 2;
        
        gsap.to(counter, {
          duration: duration,
          innerHTML: target,
          ease: "power2.out",
          snap: { innerHTML: 1 },
          onUpdate: function() {
            counter.innerHTML = Math.ceil(counter.innerHTML);
          }
        });
      });
    } catch (error) {
      console.error('Counter animation error:', error);
    }
  }

  // ===== PARALLAX ANIMATIONS =====
  function setupParallax() {
    const parallaxIntensity = isMobile ? 0.5 : 1;
    const scrubValue = isMobile ? 1.5 : 1.9;

    // Animate heading words on scroll
    gsap.to(".heading-word", {
      scrollTrigger: {
        trigger: ".header",
        start: "top top",
        scrub: scrubValue,
      },
      yPercent: -30 * parallaxIntensity,
      rotationX: -15,
      stagger: 0.1,
    });

    // Animate logo on scroll
    gsap.to(".logo-container", {
      scrollTrigger: {
        trigger: ".header",
        start: "top top",
        scrub: scrubValue,
      },
      y: 50 * parallaxIntensity,
      opacity: 0.7,
    });

    // Animate podcast preview
    gsap.to(".podcast-preview", {
      scrollTrigger: {
        trigger: ".header",
        start: "top top",
        scrub: scrubValue,
      },
      y: -100 * parallaxIntensity,
      scale: 0.9,
    });

    // Animate marquee
    gsap.to(".header__marq-wrapp", {
      scrollTrigger: {
        trigger: ".header",
        start: "top top",
        scrub: scrubValue,
      },
      xPercent: isMobile ? -25 : -30,
    });

    // Animate floating shapes
    gsap.utils.toArray(".shape").forEach((shape, i) => {
      gsap.to(shape, {
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
        y: (i + 1) * (isMobile ? 100 : 200),
        rotation: (i + 1) * 90,
        ease: "none",
      });
    });

    // Animate audio waves
    gsap.utils.toArray(".wave").forEach((wave, i) => {
      gsap.to(wave, {
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
        y: (i + 1) * (isMobile ? 50 : 100),
        ease: "none",
      });
    });

    // Animate section title squares
    gsap.utils.toArray(".section-title__square").forEach((square) => {
      gsap.from(square, {
        scrollTrigger: {
          trigger: square,
          start: "top bottom",
          scrub: scrubValue,
        },
        rotation: 720,
        duration: 3,
      });
    });

    // Animate feature cards
    gsap.utils.toArray(".feature-card").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          end: "bottom top",
          scrub: true,
        },
        y: (1 - parseFloat(card.getAttribute("data-speed") || 0)) * (isMobile ? 0.5 : 1),
      });
    });

    // Animate footer letters - smooth and simple
    gsap.to(".footer__div span", {
      scrollTrigger: {
        trigger: ".footer",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      y: -20,
      stagger: 0.1,
      ease: "none",
    });
  }

  // ===== FORM HANDLING =====
  function setupForm() {
    const form = document.getElementById('waitlistForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const submitBtn = form.querySelector('.submit-btn');

    // Mailvio API configuration
    const MAILVIO_CONFIG = {
      accountId: '29003',
      formId: '43895',
      apiUrl: 'https://apiv2.mailvio.com/form'
    };

    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      
      // Validation
      if (!name) {
        showAlert('Please enter your name', 'error');
        shakeElement(nameInput);
        return;
      }
      
      if (!email || !isValidEmail(email)) {
        showAlert('Please enter a valid email address', 'error');
        shakeElement(emailInput);
        return;
      }

      // Show loading state
      animateButtonLoading(true);
      
      try {
        // Submit to Mailvio API
        const response = await fetch(`${MAILVIO_CONFIG.apiUrl}?am=${MAILVIO_CONFIG.accountId}&fid=${MAILVIO_CONFIG.formId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emailAddress: email,
            name: name
          })
        });

        if (response.ok) {
          // Success
          animateButtonSuccess();
          showAlert(`🎉 Welcome to the waitlist, ${name}! Check your email for confirmation.`, 'success');
          
          // Reset form after delay
          setTimeout(() => {
            form.reset();
            animateButtonLoading(false);
          }, 2000);
          
          // Create confetti effect
          createConfetti();
          
        } else {
          throw new Error('Subscription failed');
        }
        
      } catch (error) {
        console.error('Subscription error:', error);
        showAlert('Oops! Something went wrong. Please try again.', 'error');
        animateButtonLoading(false);
      }
    });

    // Email validation
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    // Shake animation for invalid inputs
    function shakeElement(element) {
      element.style.animation = 'shake 0.5s ease-in-out';
      setTimeout(() => {
        element.style.animation = '';
      }, 500);
    }

    // Button loading animation
    function animateButtonLoading(loading) {
      const btnText = submitBtn.querySelector('.btn-text');
      const btnBg = submitBtn.querySelector('.btn-bg');
      
      if (loading) {
        btnText.textContent = 'Joining...';
        submitBtn.disabled = true;
        gsap.to(btnBg, {
          duration: 1,
          scaleX: 1,
          ease: "power2.inOut"
        });
      } else {
        btnText.textContent = 'Join Waitlist';
        submitBtn.disabled = false;
        gsap.to(btnBg, {
          duration: 0.3,
          scaleX: 0,
          ease: "power2.out"
        });
      }
    }

    // Success animation
    function animateButtonSuccess() {
      const btnText = submitBtn.querySelector('.btn-text');
      btnText.textContent = '✓ Joined!';
      
      gsap.to(submitBtn, {
        duration: 0.3,
        scale: 1.05,
        ease: "back.out(1.7)",
        yoyo: true,
        repeat: 1
      });
    }

    // Confetti effect
    function createConfetti() {
      const colors = ['#ED454A', '#B453E7', '#6366f1', '#f093fb', '#ff4757'];
      const confettiCount = 50;
      
      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
          position: fixed;
          width: 10px;
          height: 10px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          top: 50%;
          left: 50%;
          z-index: 10000;
          pointer-events: none;
          border-radius: 50%;
        `;
        
        document.body.appendChild(confetti);
        
        gsap.to(confetti, {
          duration: 2,
          x: (Math.random() - 0.5) * 800,
          y: (Math.random() - 0.5) * 600,
          rotation: Math.random() * 360,
          opacity: 0,
          scale: 0,
          ease: "power2.out",
          onComplete: () => confetti.remove()
        });
      }
    }

    // Alert system
    function showAlert(message, type = 'info') {
      const alertContainer = document.getElementById('alertContainer');
      
      const alert = document.createElement('div');
      alert.className = `alert ${type}`;
      alert.innerHTML = `
        <button class="alert-close" aria-label="Close alert">&times;</button>
        <div class="alert-message">${message}</div>
      `;
      
      alertContainer.appendChild(alert);
      
      // Show animation
      setTimeout(() => {
        alert.classList.add('show');
      }, 100);
      
      // Auto close after 5 seconds
      const autoCloseTimer = setTimeout(() => {
        closeAlert(alert);
      }, 5000);
      
      // Manual close
      const closeBtn = alert.querySelector('.alert-close');
      closeBtn.addEventListener('click', () => {
        clearTimeout(autoCloseTimer);
        closeAlert(alert);
      });
      
      // Close alert function
      function closeAlert(alertElement) {
        alertElement.classList.remove('show');
        setTimeout(() => {
          if (alertElement.parentNode) {
            alertElement.remove();
          }
        }, 400);
      }
    }

    // Add shake animation to CSS if not present
    if (!document.querySelector('#shakeAnimation')) {
      const style = document.createElement('style');
      style.id = 'shakeAnimation';
      style.textContent = `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ===== INTERACTIVE ANIMATIONS =====
  function setupInteractiveAnimations() {
    // Logo hover effect
    const logo = document.querySelector('.logo');
    if (logo) {
      logo.addEventListener('mouseenter', () => {
        if (!isMobile) {
          gsap.to('.logo-image', {
            duration: 0.3,
            scale: 1.1,
            rotation: 5,
            ease: "power2.out"
          });
          
          gsap.to('.logo-text', {
            duration: 0.3,
            color: "#ED454A",
            ease: "power2.out"
          });
        }
      });

      logo.addEventListener('mouseleave', () => {
        if (!isMobile) {
          gsap.to('.logo-image', {
            duration: 0.3,
            scale: 1,
            rotation: 0,
            ease: "power2.out"
          });
          
          gsap.to('.logo-text', {
            duration: 0.3,
            color: "#667eea",
            ease: "power2.out"
          });
        }
      });
    }

    // Podcast player hover effect
    const podcastPlayer = document.querySelector('.podcast-player');
    if (podcastPlayer) {
      podcastPlayer.addEventListener('mouseenter', () => {
        if (!isMobile) {
          gsap.to(podcastPlayer, {
            duration: 0.3,
            scale: 1.05,
            ease: "power2.out"
          });
          
          gsap.to('.equalizer .bar', {
            duration: 0.3,
            scaleY: 1.2,
            ease: "power2.out"
          });
        }
      });

      podcastPlayer.addEventListener('mouseleave', () => {
        if (!isMobile) {
          gsap.to(podcastPlayer, {
            duration: 0.3,
            scale: 1,
            ease: "power2.out"
          });
          
          gsap.to('.equalizer .bar', {
            duration: 0.3,
            scaleY: 1,
            ease: "power2.out"
          });
        }
      });
    }

    // Feature cards hover effect
    document.querySelectorAll('.feature-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        if (!isMobile) {
          gsap.to(card, {
            duration: 0.3,
            y: -10,
            scale: 1.02,
            ease: "power2.out"
          });
          
          const cardGlow = card.querySelector('.card-glow');
          if (cardGlow) {
            gsap.to(cardGlow, {
              duration: 0.3,
              opacity: 1,
              ease: "power2.out"
            });
          }
        }
      });

      card.addEventListener('mouseleave', () => {
        if (!isMobile) {
          gsap.to(card, {
            duration: 0.3,
            y: 0,
            scale: 1,
            ease: "power2.out"
          });
          
          const cardGlow = card.querySelector('.card-glow');
          if (cardGlow) {
            gsap.to(cardGlow, {
              duration: 0.3,
              opacity: 0,
              ease: "power2.out"
            });
          }
        }
      });
    });

    // Submit button hover effect
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('mouseenter', () => {
        if (!isMobile) {
          gsap.to(submitBtn, {
            duration: 0.3,
            y: -2,
            ease: "power2.out"
          });
        }
      });

      submitBtn.addEventListener('mouseleave', () => {
        if (!isMobile) {
          gsap.to(submitBtn, {
            duration: 0.3,
            y: 0,
            ease: "power2.out"
          });
        }
      });
    }

    // Footer letters hover effect
    document.querySelectorAll('.footer__div span').forEach(span => {
      span.addEventListener('mouseenter', () => {
        if (!isMobile) {
          gsap.to(span, {
            duration: 0.3,
            scale: 1.2,
            color: "#6366f1",
            ease: "power2.out"
          });
        }
      });

      span.addEventListener('mouseleave', () => {
        if (!isMobile) {
          gsap.to(span, {
            duration: 0.3,
            scale: 1,
            color: "#9ca3af",
            ease: "power2.out"
          });
        }
      });
    });

    // Heading words hover effect
    document.querySelectorAll('.heading-word').forEach(word => {
      word.addEventListener('mouseenter', () => {
        if (!isMobile) {
          gsap.to(word, {
            duration: 0.3,
            scale: 1.05,
            ease: "power2.out"
          });
        }
      });

      word.addEventListener('mouseleave', () => {
        if (!isMobile) {
          gsap.to(word, {
            duration: 0.3,
            scale: 1,
            ease: "power2.out"
          });
        }
      });
    });
  }

  // ===== RESPONSIVE HANDLING =====
  function handleResize() {
    window.addEventListener('resize', () => {
      // Refresh ScrollTrigger on resize
      ScrollTrigger.refresh();
    });
  }

  // ===== ENSURE GRADIENT TEXT VISIBILITY =====
  function ensureGradientTextVisibility() {
    const gradientTexts = document.querySelectorAll('.gradient-text');
    
    gradientTexts.forEach(element => {
      // Ensure the element is visible
      element.style.opacity = '1';
      element.style.visibility = 'visible';
      element.style.display = 'inline-block';
      
      // Check if gradient is working by testing computed styles
      const computedStyle = window.getComputedStyle(element);
      const textFillColor = computedStyle.webkitTextFillColor;
      
      // If gradient isn't working, apply fallback styling
      if (!textFillColor || textFillColor === 'rgb(0, 0, 0)' || textFillColor === 'black') {
        element.style.background = 'linear-gradient(135deg, #ED454A 0%, #B453E7 100%)';
        element.style.webkitBackgroundClip = 'text';
        element.style.webkitTextFillColor = 'transparent';
        element.style.backgroundClip = 'text';
        
        // If still not working, use solid color fallback
        setTimeout(() => {
          const newComputedStyle = window.getComputedStyle(element);
          if (!newComputedStyle.webkitTextFillColor || newComputedStyle.webkitTextFillColor === 'rgb(0, 0, 0)') {
            element.style.webkitTextFillColor = '';
            element.style.color = '#ED454A';
            element.style.textShadow = '0 0 10px rgba(180, 83, 231, 0.5)';
          }
        }, 100);
      }
    });
  }

  // ===== FALLBACK CONTENT VISIBILITY =====
  function ensureContentVisibility() {
    const criticalElements = [
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
    
    criticalElements.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (el) {
          el.style.opacity = '1';
          el.style.visibility = 'visible';
          el.style.transform = 'none';
          el.style.display = el.style.display || '';
        }
      });
    });
    
    // Ensure gradient text is visible
    ensureGradientTextVisibility();
  }

  // ===== INITIALIZE EVERYTHING =====
  function init() {
    // Ensure content is visible immediately
    ensureContentVisibility();
    
    // Additional gradient text check after a short delay
    setTimeout(() => {
      ensureGradientTextVisibility();
    }, 200);
    
    try {
      initAnimations();
      setupParallax();
      setupForm();
      setupInteractiveAnimations();
      handleResize();
    } catch (error) {
      console.error('Initialization error:', error);
      // Ensure content is still visible even if initialization fails
      ensureContentVisibility();
    }
  }

  // Start the magic - with multiple fallbacks
  try {
    init();
  } catch (error) {
    console.error('Critical initialization error:', error);
    ensureContentVisibility();
  }

  // Additional safety nets
  setTimeout(() => {
    ensureContentVisibility();
    ensureGradientTextVisibility();
  }, 500);

  setTimeout(() => {
    ensureGradientTextVisibility();
  }, 1000);

  // ===== PERFORMANCE OPTIMIZATION =====
  // Preload critical resources
  const preloadImages = () => {
    const images = ['img/star.svg'];
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  };

  preloadImages();

  // ===== YOUTUBE PLAYLIST MODAL FUNCTIONALITY =====
  const podcastPlayer = document.getElementById('podcastPlayer');
  const modal = document.getElementById('playlistModal');
  const closeModal = document.getElementById('closeModal');
  const youtubePlayer = document.getElementById('youtubePlayer');
  
  // YouTube playlist URL - embed format
  const playlistEmbedUrl = 'https://www.youtube.com/embed/videoseries?list=PLMQYoEoYSyuN4C4G1QjsJBnrPTWsF18Aj&autoplay=1&rel=0&modestbranding=1';
  
  // Open modal when podcast player is clicked
  if (podcastPlayer) {
    podcastPlayer.addEventListener('click', function() {
      openModal();
    });
  }
  
  // Close modal when close button is clicked
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      closeModalFunc();
    });
  }
  
  // Close modal when clicking outside the modal content
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModalFunc();
      }
    });
  }
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
      closeModalFunc();
    }
  });
  
  function openModal() {
    if (modal && youtubePlayer) {
      // Set the YouTube playlist URL
      youtubePlayer.src = playlistEmbedUrl;
      
      // Show modal with animation
      modal.style.display = 'flex';
      
      // Force reflow for animation
      modal.offsetHeight;
      
      // Add show class for animation
      modal.classList.add('show');
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Add loading state
      modal.setAttribute('aria-hidden', 'false');
      
      // Focus management for accessibility
      if (closeModal) {
        closeModal.focus();
      }
    }
  }
  
  function closeModalFunc() {
    if (modal && youtubePlayer) {
      // Remove show class for animation
      modal.classList.remove('show');
      
      // Wait for animation to complete before hiding
      setTimeout(() => {
        modal.style.display = 'none';
        // Stop video by removing src
        youtubePlayer.src = '';
      }, 400);
      
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Update accessibility
      modal.setAttribute('aria-hidden', 'true');
      
      // Return focus to the trigger element
      if (podcastPlayer) {
        podcastPlayer.focus();
      }
    }
  }
  
  // Handle window resize to maintain responsive design
  window.addEventListener('resize', function() {
    if (modal && modal.classList.contains('show')) {
      // Recalculate modal positioning if needed
      const modalContent = modal.querySelector('.modal-content');
      if (modalContent) {
        // Force recalculation of responsive units
        modalContent.style.width = modalContent.style.width;
      }
    }
  });
  
  // Preload modal for better performance
  function preloadModal() {
    if (modal) {
      modal.style.display = 'flex';
      modal.style.opacity = '0';
      modal.style.pointerEvents = 'none';
      
      setTimeout(() => {
        modal.style.display = 'none';
        modal.style.opacity = '';
        modal.style.pointerEvents = '';
      }, 100);
    }
  }
  
  // Preload after a short delay
  setTimeout(preloadModal, 2000);
  
  // Enhanced accessibility
  if (modal) {
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modal-title');
    modal.setAttribute('aria-hidden', 'true');
    
    // Add keyboard navigation within modal
    modal.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  }
}); 
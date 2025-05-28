document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // Check device type for responsive animations
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;

  // Initialize text splitting for animations
  Splitting();

  // Initialize smooth scrolling library
  luxy.init({
    wrapper: '#luxy',
    targets: '.luxy-el',
    wrapperSpeed: 0.08
  });

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // ===== INITIAL ANIMATIONS =====
  function initAnimations() {
    const tl = gsap.timeline();

    // Animate logo
    tl.from(".logo-container", {
      duration: 1,
      opacity: 0,
      y: -50,
      ease: "power2.out",
    });

    // Animate logo elements
    tl.from(".mic-body", {
      duration: 0.8,
      scale: 0,
      ease: "back.out(1.7)",
    }, "-=0.5");

    tl.from(".sound-waves span", {
      duration: 0.6,
      scale: 0,
      stagger: 0.1,
      ease: "power2.out",
    }, "-=0.3");

    // Animate main heading words
    tl.from(".heading-word", {
      duration: 1.2,
      opacity: 0,
      y: 100,
      rotationX: 90,
      stagger: 0.15,
      ease: "back.out(1.7)",
      transformOrigin: "center bottom",
    }, "-=0.3");

    // Animate subtitle
    tl.from(".subtitle .char", {
      duration: 0.8,
      opacity: 0,
      yPercent: 50,
      stagger: 0.01,
      ease: "power2.out",
    }, "-=0.6");

    // Animate podcast preview
    tl.from(".podcast-preview", {
      duration: 1,
      opacity: 0,
      scale: 0.8,
      ease: "power2.out",
    }, "-=0.4");

    // Animate form container
    tl.from(".waitlist-form-container", {
      duration: 1,
      opacity: 0,
      y: 50,
      ease: "power2.out",
    }, "-=0.6");

    // Animate stats
    tl.from(".stat-item", {
      duration: 0.8,
      opacity: 0,
      y: 30,
      scale: 0.8,
      stagger: 0.1,
      ease: "back.out(1.7)",
    }, "-=0.6");

    // Animate marquee
    tl.from(".header__marq", {
      duration: 1,
      opacity: 0,
      yPercent: 100,
      ease: "power2.out",
    }, "-=0.8");

    // Start counting animation after initial load
    tl.call(animateCounters, null, "-=0.3");
    
    // Start podcast player animation
    tl.call(startPodcastAnimation, null, "-=0.5");
  }

  // ===== PODCAST PLAYER ANIMATION =====
  function startPodcastAnimation() {
    // Animate equalizer bars
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

    // Pulse live indicator
    gsap.to(".live-indicator", {
      duration: 1.5,
      opacity: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Animate episode title
    const episodeNumbers = [247, 248, 249, 250, 251];
    let currentIndex = 0;
    
    setInterval(() => {
      currentIndex = (currentIndex + 1) % episodeNumbers.length;
      const episodeTitle = document.querySelector('.episode-title');
      
      gsap.to(episodeTitle, {
        duration: 0.3,
        opacity: 0,
        y: -10,
        ease: "power2.in",
        onComplete: () => {
          episodeTitle.textContent = `AI-Generated Episode #${episodeNumbers[currentIndex]}`;
          gsap.to(episodeTitle, {
            duration: 0.3,
            opacity: 1,
            y: 0,
            ease: "power2.out"
          });
        }
      });
    }, 3000);
  }

  // ===== COUNTER ANIMATION =====
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
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
    const emailInput = document.getElementById('email');
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = document.querySelector('.btn-text');

    // Form submission
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = emailInput.value.trim();
      
      if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        shakeElement(emailInput);
        return;
      }

      // Animate button loading state
      animateButtonLoading(true);
      
      // Simulate API call (replace with actual endpoint)
      setTimeout(() => {
        // Success animation
        animateButtonSuccess();
        showMessage('🎉 Welcome to the waitlist! Check your email for confirmation.', 'success');
        
        // Confetti effect
        createConfetti();
        
        // Reset form after delay
        setTimeout(() => {
          form.reset();
          animateButtonLoading(false);
        }, 3000);
      }, 2000);
    });

    // Email validation
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    // Shake animation for errors
    function shakeElement(element) {
      gsap.to(element, {
        duration: 0.1,
        x: -10,
        repeat: 5,
        yoyo: true,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(element, { x: 0 });
        }
      });
    }

    // Button loading animation
    function animateButtonLoading(loading) {
      if (loading) {
        gsap.to(submitBtn, {
          duration: 0.3,
          scale: 0.95,
          ease: "power2.out"
        });
        btnText.textContent = 'Joining...';
        
        // Add loading spinner
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        spinner.style.cssText = `
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-left: 10px;
          display: inline-block;
        `;
        btnText.appendChild(spinner);
        
        // Add spinner animation
        const style = document.createElement('style');
        style.textContent = `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `;
        document.head.appendChild(style);
        
      } else {
        gsap.to(submitBtn, {
          duration: 0.3,
          scale: 1,
          ease: "power2.out"
        });
        btnText.innerHTML = 'Join Waitlist';
      }
    }

    // Button success animation
    function animateButtonSuccess() {
      gsap.timeline()
        .to(submitBtn, {
          duration: 0.2,
          scale: 1.05,
          ease: "power2.out"
        })
        .to(submitBtn, {
          duration: 0.3,
          scale: 1,
          ease: "power2.out"
        });
      
      btnText.innerHTML = '✓ Joined!';
    }

    // Confetti effect
    function createConfetti() {
      const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#6366f1', '#f093fb'];
      
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
          position: fixed;
          width: 10px;
          height: 10px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          top: 50%;
          left: 50%;
          z-index: 1000;
          pointer-events: none;
          border-radius: 50%;
        `;
        document.body.appendChild(confetti);
        
        gsap.to(confetti, {
          duration: 2,
          x: (Math.random() - 0.5) * 800,
          y: Math.random() * 600 + 100,
          rotation: Math.random() * 360,
          opacity: 0,
          ease: "power2.out",
          onComplete: () => confetti.remove()
        });
      }
    }

    // Show message
    function showMessage(text, type) {
      // Remove existing messages
      const existingMessage = document.querySelector('.form-message');
      if (existingMessage) {
        existingMessage.remove();
      }

      // Create new message
      const message = document.createElement('div');
      message.className = `form-message ${type}`;
      message.textContent = text;
      message.style.cssText = `
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 8px;
        text-align: center;
        font-weight: 600;
        background: ${type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
        color: ${type === 'success' ? '#22c55e' : '#ef4444'};
        border: 1px solid ${type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
      `;

      form.appendChild(message);

      // Animate message in
      gsap.from(message, {
        duration: 0.5,
        opacity: 0,
        y: 20,
        ease: "power2.out"
      });

      // Remove message after delay
      setTimeout(() => {
        gsap.to(message, {
          duration: 0.3,
          opacity: 0,
          y: -20,
          ease: "power2.in",
          onComplete: () => message.remove()
        });
      }, 5000);
    }
  }

  // ===== INTERACTIVE ANIMATIONS =====
  function setupInteractiveAnimations() {
    // Logo hover effect
    const logo = document.querySelector('.logo');
    if (logo) {
      logo.addEventListener('mouseenter', () => {
        if (!isMobile) {
          gsap.to('.mic-body', {
            duration: 0.3,
            scale: 1.1,
            boxShadow: '0 0 30px rgba(102, 126, 234, 0.8)',
            ease: "power2.out"
          });
          
          gsap.to('.sound-waves span', {
            duration: 0.3,
            scaleY: 1.5,
            stagger: 0.1,
            ease: "power2.out"
          });
        }
      });

      logo.addEventListener('mouseleave', () => {
        if (!isMobile) {
          gsap.to('.mic-body', {
            duration: 0.3,
            scale: 1,
            boxShadow: '0 0 20px rgba(102, 126, 234, 0.5)',
            ease: "power2.out"
          });
          
          gsap.to('.sound-waves span', {
            duration: 0.3,
            scaleY: 1,
            stagger: 0.1,
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

  // ===== INITIALIZE EVERYTHING =====
  function init() {
    initAnimations();
    setupParallax();
    setupForm();
    setupInteractiveAnimations();
    handleResize();
  }

  // Start the magic
  init();

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
}); 
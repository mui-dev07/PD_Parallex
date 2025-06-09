// ===== CUSTOM SITE LOADER =====
function initSiteLoader() {
  console.log('🔧 Loader initialization starting...');
  
  // Check if loader should be displayed
  const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  // Check for force show option first
  const forceShow = typeof LOADER_CONFIG !== 'undefined' && LOADER_CONFIG.forceShow === true;
  
  const shouldShowLoader = forceShow || (typeof LOADER_CONFIG !== 'undefined' 
    ? (isDevelopment ? LOADER_CONFIG.showInDevelopment : LOADER_CONFIG.enabled)
    : true); // Default to true if config not found

  const siteLoader = document.getElementById('siteLoader');
  const mainContent = document.getElementById('mainContent');
  const progressBar = document.getElementById('progressBar');
  const progressPercentage = document.getElementById('progressPercentage');

  console.log('🔍 Debug Info:');
  console.log('  - Environment:', isDevelopment ? 'Development' : 'Production');
  console.log('  - Hostname:', window.location.hostname);
  console.log('  - Force Show:', forceShow);
  console.log('  - Should Show Loader:', shouldShowLoader);
  console.log('  - Loader Element Found:', !!siteLoader);
  console.log('  - Main Content Found:', !!mainContent);

  if (!shouldShowLoader) {
    console.log('❌ Loader disabled - showing content immediately');
    // Skip loader - show content immediately
    if (siteLoader) siteLoader.style.display = 'none';
    if (mainContent) {
      mainContent.style.opacity = '1';
      mainContent.style.pointerEvents = 'auto';
    }
    return;
  }

  console.log('✅ Loader enabled - starting animation');

  // Ensure loader is visible
  if (siteLoader) {
    siteLoader.style.display = 'flex';
    siteLoader.style.opacity = '1';
    siteLoader.style.visibility = 'visible';
  }

  // Ensure main content is hidden
  if (mainContent) {
    mainContent.style.opacity = '0';
    mainContent.style.pointerEvents = 'none';
  }

  // Loader duration from config or default 5 seconds
  const loaderDuration = (typeof LOADER_CONFIG !== 'undefined' && LOADER_CONFIG.duration) 
    ? LOADER_CONFIG.duration 
    : 5000;

  let progress = 0;
  const progressInterval = 50; // Update every 50ms
  const progressIncrement = (100 / (loaderDuration / progressInterval));
  let hasCompleted = false;

  // Function to complete loading and show main content
  function completeLoading() {
    if (hasCompleted) return; // Prevent multiple calls
    hasCompleted = true;

    console.log('🎯 Loader completing...'); // Debug log

    // Add fade-out class to loader
    if (siteLoader) {
      siteLoader.classList.add('fade-out');
    }

    // Show main content with fade-in animation
    if (mainContent) {
      setTimeout(() => {
        mainContent.style.opacity = '1';
        mainContent.style.pointerEvents = 'auto';
        
        // Remove loader from DOM after animation completes
        setTimeout(() => {
          if (siteLoader) {
            siteLoader.remove();
          }
        }, 800); // Match CSS transition duration
      }, 200);
    }
  }

  // Start progress animation
  const progressTimer = setInterval(() => {
    progress += progressIncrement;
    
    if (progress >= 100) {
      progress = 100;
      clearInterval(progressTimer);
      
      // Complete loading after reaching 100%
      setTimeout(() => {
        completeLoading();
      }, 200);
    }
    
    // Update progress bar and percentage
    if (progressBar) {
      progressBar.style.width = progress + '%';
    }
    if (progressPercentage) {
      progressPercentage.textContent = Math.floor(progress) + '%';
    }
  }, progressInterval);

  // Preload critical images to improve perceived performance
  function preloadImages() {
    const criticalImages = [
      'img/mujtaba.png', // Hero image
      'img/2.jpg', // About image
      'img/3.jpg', 'img/4.jpg', 'img/5.jpg', 'img/6.jpg' // Portfolio images
    ];

    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  // Start preloading images
  preloadImages();

  // Force minimum display time - this ensures the loader shows for the full duration
  setTimeout(() => {
    if (!hasCompleted) {
      console.log('🕒 Minimum time reached, loader still running...'); // Debug log
    }
  }, loaderDuration);

  // Debug logging
  console.log('🚀 Loader initialized with duration:', loaderDuration + 'ms');
  console.log('🏠 Environment:', isDevelopment ? 'Development' : 'Production');
  console.log('👁️ Show loader:', shouldShowLoader);
}

// Initialize loader immediately when script loads
initSiteLoader();

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // ===== DEVICE DETECTION =====
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 991 && window.innerWidth > 768;
  const isDesktop = window.innerWidth > 991;

  // ===== INITIALIZE LIBRARIES =====
  if (typeof Splitting !== "undefined") {
    Splitting();
  }

  // Initialize luxy for smooth scrolling
  if (typeof luxy !== "undefined") {
    luxy.init({
      wrapper: "#luxy",
      targets: ".luxy-el",
      wrapperSpeed: isMobile ? 0.8 : 0.95,
    });
  }

  // Register GSAP plugins
  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // ===== NAVBAR FUNCTIONALITY =====
  function initNavbar() {
    // Navigation functionality is now handled by initNavigation()
    // This function is kept for compatibility but functionality moved
  }

  // ===== ACTIVE LINK HIGHLIGHTING =====
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // Add scroll listener for active link highlighting
  window.addEventListener("scroll", updateActiveLink);

  // ===== GSAP ANIMATIONS =====

  // Initial page load animation (similar to original)
  function initPageAnimations() {
    const gTl = gsap.timeline();

    // Animate hero title characters
    if (document.querySelector(".hero-title .char")) {
      gTl.from(".hero-title .char", {
        duration: 1,
        opacity: 0,
        yPercent: 130,
        stagger: 0.06,
        ease: "back.out",
      });
    }

    // Animate hero image with clip-path (similar to original)
    gTl.to(
      ".hero-image .image-container",
      {
        duration: 2,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        scale: 1,
        ease: "expo.out",
      },
      "-=1"
    );

    // Animate hero elements
    gTl
      .from(
        ".hero-subtitle",
        {
          duration: 0.8,
          opacity: 0,
          yPercent: 100,
          ease: "expo.out",
        },
        "-=1.5"
      )
      .from(
        ".hero-cta",
        {
          duration: 0.8,
          opacity: 0,
          yPercent: 100,
          ease: "expo.out",
        },
        "-=1.3"
      )
      .from(
        ".scroll-indicator",
        {
          duration: 0.8,
          opacity: 0,
          yPercent: 100,
          ease: "expo.out",
        },
        "-=1"
      );
  }

  // Section title squares rotation (from original)
  function initSectionSquares() {
    const gsapSq = gsap.utils.toArray(".section-title__square");
    gsapSq.forEach((gSq, i) => {
      const scrubValue = isMobile ? 1.5 : 1.9;
      const rotat = gsap.from(gSq, {
        duration: 3,
        rotation: 720,
      });
      ScrollTrigger.create({
        trigger: gSq,
        animation: rotat,
        start: "top bottom",
        scrub: scrubValue,
      });
    });
  }

  // Hero parallax effects (enhanced from original)
  function initHeroParallax() {
    const scrubValue = isMobile ? 1.5 : 1.9;
    const parallaxIntensity = isMobile ? 0.7 : 1;

    // Title parallax (similar to original title_paralax)
    gsap.to(".title-line:first-child", {
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        scrub: scrubValue,
      },
      yPercent: -150 * parallaxIntensity,
    });

    // Stroke text movement (similar to original)
    gsap.to(".title-line.stroke", {
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        scrub: scrubValue,
      },
      xPercent: isMobile ? 30 : 50,
    });

    // Hero image parallax (similar to original header__img)
    gsap.to(".hero-image", {
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        scrub: scrubValue,
      },
      xPercent: isMobile ? -40 : -70,
    });

    gsap.to(".hero-image img", {
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        scrub: scrubValue,
      },
      scale: isMobile ? 1.15 : 1.3,
    });
  }

  // Portfolio animations (similar to original work section)
  function initPortfolioAnimations() {
    const portfolioItems = gsap.utils.toArray(".portfolio-item");
    const scrubValue = isMobile ? 1.5 : 1.9;

    // Portfolio items parallax (similar to work__item)
    gsap.from(portfolioItems, {
      y: (i, el) =>
        (1 - parseFloat(el.getAttribute("data-speed"))) * (isMobile ? 0.6 : 1),
      scrollTrigger: {
        trigger: ".portfolio-grid",
        start: "top bottom",
        scrub: scrubValue,
      },
    });

    // Portfolio images scale effect
    gsap.from(".portfolio-card .card-image img", {
      scale: isMobile ? 1.2 : 1.6,
      scrollTrigger: {
        trigger: ".portfolio-grid",
        start: "top bottom",
        scrub: scrubValue,
      },
    });

    // Individual card animations
    portfolioItems.forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
        },
        duration: 0.8,
        opacity: 0,
        y: 50,
        delay: index * 0.1,
        ease: "power2.out",
      });
    });
  }

  // About section animations (similar to original about section)
  function initAboutAnimations() {
    const scrubValue = isMobile ? 1.5 : 1.9;

    // About image parallax (similar to about__img)
    gsap.from(".about-image", {
      scrollTrigger: {
        trigger: ".about-section",
        start: "top bottom",
        scrub: scrubValue,
      },
      yPercent: isMobile ? 50 : 80,
    });

    gsap.from(".about-image img", {
      scrollTrigger: {
        trigger: ".about-section",
        start: "top bottom",
        scrub: scrubValue,
      },
      scale: isMobile ? 1.3 : 1.6,
    });

    // About text parallax (similar to about__txt)
    gsap.to(".about-text", {
      scrollTrigger: {
        trigger: ".about-container",
        start: "top bottom",
        scrub: scrubValue,
      },
      yPercent: isMobile ? 30 : 50,
    });

    // Skills grid parallax (similar to benefits)
    gsap.from(".skill-item", {
      x: (i, el) =>
        (1 - parseFloat(el.getAttribute("data-speed") || -200)) *
        (isMobile ? 0.5 : 1),
      scrollTrigger: {
        trigger: ".skills-grid",
        start: "top bottom",
        scrub: scrubValue,
      },
    });
  }

  // Experience slider animations
  function initExperienceAnimations() {
    const scrubValue = isMobile ? 1.5 : 1.9;

    // Animate the entire experience section
    gsap.from(".experience-slider", {
      scrollTrigger: {
        trigger: ".experience-section",
        start: "top 80%",
        end: "bottom 20%",
      },
      duration: 1,
      opacity: 0,
      y: 50,
      ease: "power2.out",
    });

    // Animate slider controls (pagination) to center when section is in view
    gsap.from(".slider-controls", {
      scrollTrigger: {
        trigger: ".experience-section",
        start: "top 70%",
        end: "center center",
      },
      duration: 0.8,
      opacity: 0,
      y: 30,
      delay: 0.3,
      ease: "power2.out",
    });

    // Animate navigation buttons individually
    gsap.from(".nav-btn", {
      scrollTrigger: {
        trigger: ".slider-controls",
        start: "top 80%",
      },
      duration: 0.6,
      opacity: 0,
      scale: 0.8,
      stagger: 0.1,
      delay: 0.5,
      ease: "back.out(1.7)",
    });
  }

  // Testimonials animations
  function initTestimonialsAnimations() {
    const testimonialCards = gsap.utils.toArray(".testimonial-card");
    const scrubValue = isMobile ? 1.5 : 1.9;

    // Testimonial cards parallax
    gsap.from(testimonialCards, {
      y: (i, el) =>
        (1 - parseFloat(el.getAttribute("data-speed"))) * (isMobile ? 0.6 : 1),
      scrollTrigger: {
        trigger: ".testimonials-grid",
        start: "top bottom",
        scrub: scrubValue,
      },
    });

    // Individual card animations
    testimonialCards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
        duration: 0.8,
        opacity: 0,
        y: 50,
        delay: index * 0.1,
        ease: "power2.out",
      });
    });
  }

  // Hire me section animations
  function initHireAnimations() {
    const hireFeatures = gsap.utils.toArray(".hire-feature");
    const scrubValue = isMobile ? 1.5 : 1.9;

    // Hire features parallax
    gsap.from(hireFeatures, {
      x: (i, el) =>
        (1 - parseFloat(el.getAttribute("data-speed"))) * (isMobile ? 0.5 : 1),
      scrollTrigger: {
        trigger: ".hire-features",
        start: "top bottom",
        scrub: scrubValue,
      },
    });

    // Individual feature animations
    hireFeatures.forEach((feature, index) => {
      gsap.from(feature, {
        scrollTrigger: {
          trigger: feature,
          start: "top 85%",
        },
        duration: 0.6,
        opacity: 0,
        y: 30,
        delay: index * 0.1,
        ease: "power2.out",
      });
    });

    // Hire CTA animation
    gsap.from(".hire-cta", {
      scrollTrigger: {
        trigger: ".hire-cta",
        start: "top 85%",
      },
      duration: 0.8,
      opacity: 0,
      y: 30,
      ease: "power2.out",
    });
  }

  // Footer animations (similar to original footer)
  function initFooterAnimations() {
    const scrubValue = isMobile ? 1.5 : 1.9;

    // Social links parallax
    gsap.from(".social-link", {
      x: (i, el) =>
        (1 - parseFloat(el.getAttribute("data-speed"))) * (isMobile ? 0.3 : 1),
      scrollTrigger: {
        trigger: ".footer",
        start: "top bottom",
        scrub: scrubValue,
      },
    });

    // Footer text animation (similar to original footer__div span)
    gsap.from(".footer-text span", {
      y: (i, el) =>
        (1 - parseFloat(el.getAttribute("data-speed"))) * (isMobile ? 0.5 : 1),
      opacity: 0,
      scrollTrigger: {
        trigger: ".footer-bottom",
        start: "top bottom",
        end: "bottom bottom",
        scrub: scrubValue,
      },
    });
  }

  // ===== EXPERIENCE SLIDER =====
  function initExperienceSlider() {
    const slides = document.querySelectorAll(".slide");
    const navBtns = document.querySelectorAll(".nav-btn");
    const progressBar = document.querySelector(".progress-bar");
    let currentSlide = 0;

    function showSlide(index) {
      // Remove active class from all slides and buttons
      slides.forEach((slide) => slide.classList.remove("active"));
      navBtns.forEach((btn) => btn.classList.remove("active"));

      // Add active class to current slide and button
      if (slides[index]) slides[index].classList.add("active");
      if (navBtns[index]) navBtns[index].classList.add("active");

      // Update progress bar
      if (progressBar) {
        progressBar.style.transform = `translateX(${index * 100}%)`;
      }

      currentSlide = index;
    }

    // Navigation button event listeners
    navBtns.forEach((btn, index) => {
      btn.addEventListener("click", () => showSlide(index));
    });

    // Auto-play slider
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);
  }

  // ===== PROJECT MODAL =====
  function initProjectModal() {
    const portfolioCards = document.querySelectorAll(".portfolio-card");
    const modal = document.getElementById("projectModal");
    const modalClose = document.getElementById("modalClose");
    const modalOverlay = document.querySelector(".modal-overlay");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalTech = document.getElementById("modalTech");
    const modalLiveLink = document.getElementById("modalLiveLink");

    // Project data
    const projectData = {
      1: {
        title: "E-Commerce Platform",
        description:
          "A full-stack e-commerce solution built with React and Node.js. Features include user authentication, product catalog, shopping cart, payment integration, and admin dashboard. The application uses MongoDB for data storage and implements real-time notifications.",
        image: "img/3.jpg",
        tech: [
          "React",
          "Node.js",
          "MongoDB",
          "Express",
          "Stripe API",
          "Socket.io",
        ],
        liveLink: "#",
      },
      2: {
        title: "Portfolio Website",
        description:
          "A modern, responsive portfolio website showcasing creative work and projects. Built with Vue.js and enhanced with GSAP animations and Three.js for interactive 3D elements. Features smooth scrolling, parallax effects, and optimized performance.",
        image: "img/4.jpg",
        tech: ["Vue.js", "GSAP", "Three.js", "SCSS", "Webpack", "PWA"],
        liveLink: "#",
      },
      3: {
        title: "Mobile App Design",
        description:
          "A cross-platform mobile application for social networking and content sharing. Developed with React Native and integrated with Firebase for real-time data synchronization, user authentication, and cloud storage.",
        image: "img/5.jpg",
        tech: ["React Native", "Firebase", "Redux", "Expo", "AsyncStorage"],
        liveLink: "#",
      },
      4: {
        title: "Dashboard Analytics",
        description:
          "A comprehensive analytics dashboard for business intelligence and data visualization. Built with Angular and D3.js, featuring interactive charts, real-time data updates, and customizable widgets for monitoring KPIs.",
        image: "img/6.jpg",
        tech: [
          "Angular",
          "D3.js",
          "TypeScript",
          "RxJS",
          "Chart.js",
          "Material UI",
        ],
        liveLink: "#",
      },
    };

    function openModal(projectId) {
      const project = projectData[projectId];
      if (!project) return;

      // Populate modal content
      modalImage.src = project.image;
      modalTitle.textContent = project.title;
      modalDescription.textContent = project.description;
      modalLiveLink.href = project.liveLink;

      // Populate tech stack
      modalTech.innerHTML = "";
      project.tech.forEach((tech) => {
        const techTag = document.createElement("span");
        techTag.className = "tech-tag";
        techTag.textContent = tech;
        modalTech.appendChild(techTag);
      });

      // Show modal
      modal.classList.add("active");
      document.body.style.overflow = "hidden";

      // GSAP animation for modal content
      gsap.from(".modal-content", {
        duration: 0.4,
        scale: 0.8,
        opacity: 0,
        ease: "back.out(1.7)",
      });
    }

    function closeModal() {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }

    // Event listeners
    portfolioCards.forEach((card) => {
      card.addEventListener("click", () => {
        const projectId = card
          .closest(".portfolio-item")
          .getAttribute("data-project");
        openModal(projectId);
      });
    });

    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modalOverlay) modalOverlay.addEventListener("click", closeModal);

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal && modal.classList.contains("active")) {
        closeModal();
      }
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));

        if (target) {
          const offsetTop = target.offsetTop - 100; // Account for fixed navbar

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // ===== CTA BUTTON FUNCTIONALITY =====
  function initCTAButtons() {
    const viewPortfolioBtn = document.querySelector(".cta-btn.primary");
    const getInTouchBtn = document.querySelector(".cta-btn.secondary");
    const startProjectBtn = document.querySelector(".hire-btn.primary");
    const sendEmailBtn = document.querySelector(".hire-btn.secondary");

    if (viewPortfolioBtn) {
      viewPortfolioBtn.addEventListener("click", () => {
        const portfolioSection = document.getElementById("portfolio");
        if (portfolioSection) {
          portfolioSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    }

    if (getInTouchBtn) {
      getInTouchBtn.addEventListener("click", () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    }

    if (startProjectBtn) {
      startProjectBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    }

    if (sendEmailBtn) {
      sendEmailBtn.addEventListener("click", () => {
        // Email functionality is handled by the href attribute
        console.log("Opening email client...");
      });
    }
  }

  // ===== PERFORMANCE OPTIMIZATION =====
  function initPerformanceOptimizations() {
    // Reduce animations on mobile for better performance
    if (isMobile) {
      gsap.globalTimeline.timeScale(0.8);
    }

    // Pause animations when tab is not visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        gsap.globalTimeline.pause();
      } else {
        gsap.globalTimeline.resume();
      }
    });
  }

  // ===== RESIZE HANDLER (Fixed - no debounce) =====
  function handleResize() {
    // Update device detection
    const newIsMobile = window.innerWidth <= 768;

    // Refresh ScrollTrigger on device change
    ScrollTrigger.refresh();
  }

  // Simple debounce function replacement
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 250);
  });

  // Handle orientation change for mobile devices
  window.addEventListener("orientationchange", function () {
    setTimeout(function () {
      ScrollTrigger.refresh();
    }, 500);
  });

  // ===== NAVIGATION FUNCTIONALITY =====
  function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarClose = document.getElementById('sidebar-close');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollToTop = document.getElementById("scrollToTop");
    const scrollNavPopup = document.getElementById("scrollNavPopup");
    
    let lastScrollY = window.scrollY;
    let isScrolling = false;

    // Check if we're in mobile mode and update navbar accordingly
    function updateNavbarMode() {
        if (window.innerWidth <= 991) {
            navbar.classList.add('mobile-mode');
        } else {
            navbar.classList.remove('mobile-mode');
        }
    }

    // Initial check
    updateNavbarMode();

    // Hamburger click handler
    hamburger.addEventListener('click', () => {
        openSidebar();
    });

    // Sidebar close button handler
    sidebarClose.addEventListener('click', () => {
        closeSidebar();
    });

    // Overlay click handler
    sidebarOverlay.addEventListener('click', () => {
        closeSidebar();
    });

    // Navigation link handlers for sidebar
    const sidebarLinks = sidebar.querySelectorAll('.nav-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                closeSidebar();
                setTimeout(() => {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
        });
    });

    // Regular navigation link handlers
    const regularNavLinks = document.querySelectorAll('.nav-menu .nav-link');
    regularNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll to top functionality with proper single/double click detection
    if (scrollToTop) {
        let clickCount = 0;
        let clickTimer = null;
        const clickDelay = 300; // 300ms to detect double click
        
        function handleScrollToTopClick(e) {
            e.preventDefault();
            clickCount++;
            
            if (clickCount === 1) {
                clickTimer = setTimeout(() => {
                    // Single click - scroll to top
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                    clickCount = 0;
                }, clickDelay);
            } else if (clickCount === 2) {
                // Double click - show navigation popup
                clearTimeout(clickTimer);
                scrollNavPopup.classList.toggle("active");
                
                // Hide popup after 3 seconds
                setTimeout(() => {
                    scrollNavPopup.classList.remove("active");
                }, 3000);
                
                clickCount = 0;
            }
        }
        
        // Handle both mouse clicks and touch events
        scrollToTop.addEventListener("click", handleScrollToTopClick);
        
        // Touch events for mobile devices
        let touchStartTime = 0;
        let touchCount = 0;
        let touchTimer = null;
        
        scrollToTop.addEventListener("touchstart", (e) => {
            e.preventDefault();
            touchStartTime = Date.now();
        });
        
        scrollToTop.addEventListener("touchend", (e) => {
            e.preventDefault();
            const touchDuration = Date.now() - touchStartTime;
            
            // Only process quick taps (not long presses)
            if (touchDuration < 200) {
                touchCount++;
                
                if (touchCount === 1) {
                    touchTimer = setTimeout(() => {
                        // Single tap - scroll to top
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });
                        touchCount = 0;
                    }, clickDelay);
                } else if (touchCount === 2) {
                    // Double tap - show navigation popup
                    clearTimeout(touchTimer);
                    scrollNavPopup.classList.toggle("active");
                    
                    // Hide popup after 3 seconds
                    setTimeout(() => {
                        scrollNavPopup.classList.remove("active");
                    }, 3000);
                    
                    touchCount = 0;
                }
            }
        });
    }

    // Close popup when clicking outside
    if (scrollNavPopup) {
        document.addEventListener("click", (e) => {
            if (!scrollToTop.contains(e.target) && !scrollNavPopup.contains(e.target)) {
                scrollNavPopup.classList.remove("active");
            }
        });

        // Close popup navigation when clicking on links
        const popupLinks = scrollNavPopup.querySelectorAll(".nav-link");
        popupLinks.forEach((link) => {
            link.addEventListener("click", () => {
                scrollNavPopup.classList.remove("active");
            });
        });
    }

    function openSidebar() {
        hamburger.classList.add('active');
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        hamburger.classList.remove('active');
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Scroll handler for navbar hide/show and scroll-to-top widget
    function handleScroll() {
        if (isScrolling) return;
        
        isScrolling = true;
        requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            
            // Only handle navbar scroll effects on larger screens
            if (window.innerWidth > 991) {
                // Add scrolled class for styling
                if (currentScrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                // Hide/show navbar based on scroll direction
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    navbar.classList.add('hidden');
                } else {
                    navbar.classList.remove('hidden');
                }
            }

            // Show/hide scroll to top button
            if (scrollToTop) {
                if (currentScrollY > 300) {
                    scrollToTop.classList.add("visible");
                } else {
                    scrollToTop.classList.remove("visible");
                }
            }

            lastScrollY = currentScrollY;
            isScrolling = false;
        });
    }

    // Scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle window resize
    window.addEventListener('resize', () => {
        updateNavbarMode();
        if (window.innerWidth > 991) {
            closeSidebar();
        }
    });

    // Close sidebar on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
  }

  // ===== SHOOTING STARS FUNCTIONALITY =====
  function initShootingStars() {
    const galaxyBg = document.querySelector('.galaxy-bg');
    if (!galaxyBg) return;
    
    let shootingStarTimer;
    
    // Different shooting star types and directions
    const starTypes = ['type-1', 'type-2', 'type-3'];
    const directions = [
      'shoot-from-top-left',
      'shoot-from-top-right', 
      'shoot-from-left',
      'shoot-from-right',
      'shoot-from-bottom-left',
      'shoot-from-bottom-right'
    ];
    
    function createShootingStar(type, direction) {
      const star = document.createElement('div');
      star.className = `shooting-star ${type} ${direction}`;
      
      // Position the star at the starting edge based on direction
      const startPositions = {
        'shoot-from-top-left': { top: '0%', left: '0%' },
        'shoot-from-top-right': { top: '0%', right: '0%' },
        'shoot-from-left': { top: '50%', left: '0%' },
        'shoot-from-right': { top: '50%', right: '0%' },
        'shoot-from-bottom-left': { bottom: '0%', left: '0%' },
        'shoot-from-bottom-right': { bottom: '0%', right: '0%' }
      };
      
      const position = startPositions[direction];
      Object.assign(star.style, position);
      
      // Add random offset to make it more natural
      if (direction.includes('top') || direction.includes('bottom')) {
        const randomOffset = Math.random() * 30 - 15; // -15 to +15
        if (position.top) star.style.top = `${randomOffset}%`;
        if (position.bottom) star.style.bottom = `${randomOffset}%`;
      } else {
        const randomOffset = Math.random() * 30 - 15;
        star.style.top = `${50 + randomOffset}%`;
      }
      
      galaxyBg.appendChild(star);
      
      // Remove the star after animation completes
      setTimeout(() => {
        if (star.parentNode) {
          star.parentNode.removeChild(star);
        }
      }, 3500);
    }
    
    function createShootingStarGroup() {
      // Create 1-3 shooting stars at random intervals
      const numStars = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < numStars; i++) {
        setTimeout(() => {
          const randomType = starTypes[Math.floor(Math.random() * starTypes.length)];
          const randomDirection = directions[Math.floor(Math.random() * directions.length)];
          createShootingStar(randomType, randomDirection);
        }, i * (Math.random() * 1000 + 500)); // Stagger the stars by 0.5-1.5 seconds
      }
    }
    
    function startShootingStars() {
      function scheduleNext() {
        // Random interval between 10-15 seconds
        const interval = Math.random() * 5000 + 10000; // 10000-15000ms
        
        shootingStarTimer = setTimeout(() => {
          createShootingStarGroup();
          scheduleNext(); // Schedule the next group
        }, interval);
      }
      
      // Start the first group after a short delay
      setTimeout(() => {
        createShootingStarGroup();
        scheduleNext();
      }, 3000);
    }
    
    function stopShootingStars() {
      if (shootingStarTimer) {
        clearTimeout(shootingStarTimer);
        shootingStarTimer = null;
      }
    }
    
    // Start shooting stars
    startShootingStars();
    
    // Handle visibility change to pause/resume shooting stars
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopShootingStars();
      } else {
        startShootingStars();
      }
    });
    
    // Return control functions for potential external use
    return {
      start: startShootingStars,
      stop: stopShootingStars
    };
  }

  // ===== HERO IMAGE MODAL =====
  function initHeroImageModal() {
    const heroImage = document.querySelector('.hero-image .image-container');
    const heroImageModal = document.getElementById('heroImageModal');
    const heroModalClose = document.getElementById('heroModalClose');
    const modalOverlay = heroImageModal ? heroImageModal.querySelector('.modal-overlay') : null;

    if (!heroImage || !heroImageModal) return;

    function openHeroModal() {
      heroImageModal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // GSAP animation for modal content
      if (typeof gsap !== 'undefined') {
        gsap.from('.hero-modal-content', {
          duration: 0.4,
          scale: 0.8,
          opacity: 0,
          ease: 'back.out(1.7)',
        });
      }
    }

    function closeHeroModal() {
      heroImageModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }

    // Event listeners
    heroImage.addEventListener('click', openHeroModal);
    if (heroModalClose) heroModalClose.addEventListener('click', closeHeroModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeHeroModal);

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && heroImageModal.classList.contains('active')) {
        closeHeroModal();
      }
    });
  }

  // ===== INITIALIZE ALL FUNCTIONS =====
  function init() {
    try {
      initPageAnimations();
      initSectionSquares();
      initHeroParallax();
      initPortfolioAnimations();
      initAboutAnimations();
      initExperienceAnimations();
      initTestimonialsAnimations();
      initHireAnimations();
      initFooterAnimations();
      initExperienceSlider();
      initProjectModal();
      initHeroImageModal();
      initSmoothScroll();
      initCTAButtons();
      initPerformanceOptimizations();
      initNavigation();
      initShootingStars();

      console.log("Portfolio initialized successfully!");
    } catch (error) {
      console.error("Error initializing portfolio:", error);
    }
  }

  // ===== START INITIALIZATION =====
  init();

  // ===== REFRESH SCROLLTRIGGER ON LOAD =====
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });

  // ===== ERROR HANDLING =====
  window.addEventListener("error", (e) => {
    console.error("Portfolio error:", e.error);
  });
});

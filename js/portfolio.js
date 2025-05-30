document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // ===== DEVICE DETECTION =====
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 991 && window.innerWidth > 768;
    const isDesktop = window.innerWidth > 991;

    // ===== INITIALIZE LIBRARIES =====
    if (typeof Splitting !== 'undefined') {
        Splitting();
    }

    // Initialize luxy for smooth scrolling
    if (typeof luxy !== 'undefined') {
        luxy.init({
            wrapper: '#luxy',
            targets: '.luxy-el',
            wrapperSpeed: isMobile ? 0.8 : 0.95
        });
    }

    // Register GSAP plugins
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // ===== NAVBAR FUNCTIONALITY =====
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link highlighting
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // ===== GSAP ANIMATIONS =====
    
    // Initial page load animation
    function initPageAnimations() {
        const tl = gsap.timeline();
        
        // Animate hero title
        if (document.querySelector('.hero-title .char')) {
            tl.from('.hero-title .char', {
                duration: 1,
                opacity: 0,
                yPercent: 130,
                stagger: 0.06,
                ease: "back.out"
            });
        }
        
        // Animate hero elements
        tl.from('.hero-subtitle', {
            duration: 0.8,
            opacity: 0,
            y: 50,
            ease: "power2.out"
        }, "-=0.5")
        .from('.hero-cta', {
            duration: 0.8,
            opacity: 0,
            y: 50,
            ease: "power2.out"
        }, "-=0.6")
        .from('.hero-image', {
            duration: 1.2,
            opacity: 0,
            scale: 0.8,
            ease: "power2.out"
        }, "-=0.8")
        .from('.scroll-indicator', {
            duration: 0.8,
            opacity: 0,
            y: 30,
            ease: "power2.out"
        }, "-=0.4");
    }

    // Hero parallax effects
    function initHeroParallax() {
        const scrubValue = isMobile ? 1.5 : 1.9;
        const parallaxIntensity = isMobile ? 0.7 : 1;

        // Title parallax
        gsap.to('.title-line:first-child', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                scrub: scrubValue
            },
            yPercent: -50 * parallaxIntensity
        });

        gsap.to('.title-line.stroke', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                scrub: scrubValue
            },
            xPercent: isMobile ? 30 : 50
        });

        // Hero image parallax
        gsap.to('.hero-image', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                scrub: scrubValue
            },
            yPercent: isMobile ? -30 : -50
        });

        gsap.to('.hero-image img', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                scrub: scrubValue
            },
            scale: isMobile ? 1.2 : 1.3
        });
    }

    // Section title animations
    function initSectionTitleAnimations() {
        const sectionTitles = gsap.utils.toArray('.section-title');
        
        sectionTitles.forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    end: 'bottom 20%'
                },
                duration: 1,
                opacity: 0,
                y: 50,
                ease: "power2.out"
            });
        });

        // Animate section squares
        const squares = gsap.utils.toArray('.section-title__square');
        squares.forEach(square => {
            const scrubValue = isMobile ? 1.5 : 1.9;
            const rotation = gsap.from(square, {
                duration: 3,
                rotation: 720
            });
            
            ScrollTrigger.create({
                trigger: square,
                animation: rotation,
                start: 'top bottom',
                scrub: scrubValue
            });
        });
    }

    // Portfolio grid animations
    function initPortfolioAnimations() {
        const portfolioItems = gsap.utils.toArray('.portfolio-item');
        const scrubValue = isMobile ? 1.5 : 1.9;

        portfolioItems.forEach(item => {
            const speed = item.getAttribute('data-speed') || -200;
            
            gsap.from(item, {
                scrollTrigger: {
                    trigger: '.portfolio-grid',
                    start: 'top bottom',
                    scrub: scrubValue
                },
                y: (1 - parseFloat(speed)) * (isMobile ? 0.5 : 1)
            });
        });

        // Portfolio card hover effects
        portfolioItems.forEach(item => {
            const card = item.querySelector('.portfolio-card');
            
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%'
                },
                duration: 0.8,
                opacity: 0,
                y: 50,
                ease: "power2.out"
            });
        });
    }

    // About section animations
    function initAboutAnimations() {
        const scrubValue = isMobile ? 1.5 : 1.9;

        // About image parallax
        gsap.from('.about-image', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top bottom',
                scrub: scrubValue
            },
            yPercent: isMobile ? 30 : 50
        });

        gsap.from('.about-image img', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top bottom',
                scrub: scrubValue
            },
            scale: isMobile ? 1.2 : 1.4
        });

        // About text animations
        const aboutTexts = gsap.utils.toArray('.about-text > *');
        aboutTexts.forEach((element, index) => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%'
                },
                duration: 0.8,
                opacity: 0,
                y: 30,
                delay: index * 0.1,
                ease: "power2.out"
            });
        });

        // Skills grid animation
        const skillItems = gsap.utils.toArray('.skill-item');
        skillItems.forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%'
                },
                duration: 0.6,
                opacity: 0,
                y: 30,
                delay: index * 0.1,
                ease: "power2.out"
            });
        });
    }

    // Footer animations
    function initFooterAnimations() {
        const scrubValue = isMobile ? 1.5 : 1.9;
        
        // Social links parallax
        gsap.from('.social-link', {
            scrollTrigger: {
                trigger: '.footer',
                start: 'top bottom',
                scrub: scrubValue
            },
            x: (i, el) => (1 - parseFloat(el.getAttribute('data-speed'))) * (isMobile ? 0.3 : 1)
        });

        // Footer text animation
        const footerSpans = gsap.utils.toArray('.footer-text span');
        footerSpans.forEach(span => {
            gsap.from(span, {
                scrollTrigger: {
                    trigger: '.footer-bottom',
                    start: 'top bottom',
                    scrub: scrubValue
                },
                y: (i, el) => (1 - parseFloat(el.getAttribute('data-speed'))) * (isMobile ? 0.3 : 1)
            });
        });
    }

    // ===== EXPERIENCE SLIDER =====
    function initExperienceSlider() {
        const slides = document.querySelectorAll('.slide');
        const navBtns = document.querySelectorAll('.nav-btn');
        const progressBar = document.querySelector('.progress-bar');
        let currentSlide = 0;

        function showSlide(index) {
            // Remove active class from all slides and buttons
            slides.forEach(slide => slide.classList.remove('active'));
            navBtns.forEach(btn => btn.classList.remove('active'));

            // Add active class to current slide and button
            slides[index].classList.add('active');
            navBtns[index].classList.add('active');

            // Update progress bar
            progressBar.style.transform = `translateX(${index * 100}%)`;

            currentSlide = index;
        }

        // Navigation button event listeners
        navBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => showSlide(index));
        });

        // Auto-play slider
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // ===== PROJECT MODAL =====
    function initProjectModal() {
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        const modal = document.getElementById('projectModal');
        const modalClose = document.getElementById('modalClose');
        const modalOverlay = document.querySelector('.modal-overlay');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalTech = document.getElementById('modalTech');
        const modalLiveLink = document.getElementById('modalLiveLink');
        const modalCodeLink = document.getElementById('modalCodeLink');

        // Project data
        const projectData = {
            1: {
                title: "E-Commerce Platform",
                description: "A full-stack e-commerce solution built with React and Node.js. Features include user authentication, product catalog, shopping cart, payment integration, and admin dashboard. The application uses MongoDB for data storage and implements real-time notifications.",
                image: "img/3.jpg",
                tech: ["React", "Node.js", "MongoDB", "Express", "Stripe API", "Socket.io"],
                liveLink: "#",
                codeLink: "#"
            },
            2: {
                title: "Portfolio Website",
                description: "A modern, responsive portfolio website showcasing creative work and projects. Built with Vue.js and enhanced with GSAP animations and Three.js for interactive 3D elements. Features smooth scrolling, parallax effects, and optimized performance.",
                image: "img/4.jpg",
                tech: ["Vue.js", "GSAP", "Three.js", "SCSS", "Webpack", "PWA"],
                liveLink: "#",
                codeLink: "#"
            },
            3: {
                title: "Mobile App Design",
                description: "A cross-platform mobile application for social networking and content sharing. Developed with React Native and integrated with Firebase for real-time data synchronization, user authentication, and cloud storage.",
                image: "img/5.jpg",
                tech: ["React Native", "Firebase", "Redux", "Expo", "AsyncStorage"],
                liveLink: "#",
                codeLink: "#"
            },
            4: {
                title: "Dashboard Analytics",
                description: "A comprehensive analytics dashboard for business intelligence and data visualization. Built with Angular and D3.js, featuring interactive charts, real-time data updates, and customizable widgets for monitoring KPIs.",
                image: "img/6.jpg",
                tech: ["Angular", "D3.js", "TypeScript", "RxJS", "Chart.js", "Material UI"],
                liveLink: "#",
                codeLink: "#"
            }
        };

        function openModal(projectId) {
            const project = projectData[projectId];
            if (!project) return;

            // Populate modal content
            modalImage.src = project.image;
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            modalLiveLink.href = project.liveLink;
            modalCodeLink.href = project.codeLink;

            // Populate tech stack
            modalTech.innerHTML = '';
            project.tech.forEach(tech => {
                const techTag = document.createElement('span');
                techTag.className = 'tech-tag';
                techTag.textContent = tech;
                modalTech.appendChild(techTag);
            });

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // GSAP animation for modal content
            gsap.from('.modal-content', {
                duration: 0.4,
                scale: 0.8,
                opacity: 0,
                ease: "back.out(1.7)"
            });
        }

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Event listeners
        portfolioCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.closest('.portfolio-item').getAttribute('data-project');
                openModal(projectId);
            });
        });

        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===== CTA BUTTON FUNCTIONALITY =====
    function initCTAButtons() {
        const viewPortfolioBtn = document.querySelector('.cta-btn.primary');
        const getInTouchBtn = document.querySelector('.cta-btn.secondary');

        if (viewPortfolioBtn) {
            viewPortfolioBtn.addEventListener('click', () => {
                const portfolioSection = document.getElementById('portfolio');
                if (portfolioSection) {
                    portfolioSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        if (getInTouchBtn) {
            getInTouchBtn.addEventListener('click', () => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    function initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);

        // Observe elements for fade-in animations
        const elementsToObserve = document.querySelectorAll(
            '.portfolio-card, .skill-item, .slide, .footer-content'
        );
        
        elementsToObserve.forEach(el => observer.observe(el));
    }

    // ===== PERFORMANCE OPTIMIZATION =====
    function initPerformanceOptimizations() {
        // Reduce animations on mobile for better performance
        if (isMobile) {
            gsap.globalTimeline.timeScale(0.8);
        }

        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                gsap.globalTimeline.pause();
            } else {
                gsap.globalTimeline.resume();
            }
        });

        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // ===== RESIZE HANDLER =====
    function handleResize() {
        // Update device detection
        const newIsMobile = window.innerWidth <= 768;
        
        if (newIsMobile !== isMobile) {
            // Refresh ScrollTrigger on device change
            ScrollTrigger.refresh();
        }
    }

    window.addEventListener('resize', gsap.utils.debounce(handleResize, 250));

    // ===== INITIALIZE ALL FUNCTIONS =====
    function init() {
        try {
            initPageAnimations();
            initHeroParallax();
            initSectionTitleAnimations();
            initPortfolioAnimations();
            initAboutAnimations();
            initFooterAnimations();
            initExperienceSlider();
            initProjectModal();
            initSmoothScroll();
            initCTAButtons();
            initIntersectionObserver();
            initPerformanceOptimizations();
            
            console.log('Portfolio initialized successfully!');
        } catch (error) {
            console.error('Error initializing portfolio:', error);
        }
    }

    // ===== START INITIALIZATION =====
    init();

    // ===== REFRESH SCROLLTRIGGER ON LOAD =====
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });

    // ===== CUSTOM CURSOR (DESKTOP ONLY) =====
    if (isDesktop) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.innerHTML = '<div class="cursor-dot"></div>';
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Add cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .portfolio-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // ===== PRELOADER =====
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            gsap.to(preloader, {
                duration: 0.8,
                opacity: 0,
                ease: "power2.out",
                onComplete: () => {
                    preloader.style.display = 'none';
                }
            });
        });
    }

    // ===== ERROR HANDLING =====
    window.addEventListener('error', (e) => {
        console.error('Portfolio error:', e.error);
    });

}); 
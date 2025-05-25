document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // Check if device is mobile
  const isMobile = window.innerWidth <= 767;
  const isTablet = window.innerWidth <= 991 && window.innerWidth > 767;

  Splitting();

  // Initialize luxy on all devices
  luxy.init();

  gsap.registerPlugin(ScrollTrigger);

  const gTl = gsap.timeline();
  gTl.from(".title .char", 1, {
    opacity: 0,
    yPercent: 130,
    stagger: 0.06,
    ease: "back.out",
  });
  gTl.to(
    ".header__img",
    2,
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scale: 1,
      ease: "expo.out",
    },
    "-=1"
  );
  gTl.from(
    ".header__marq",
    2,
    { opacity: 0, yPercent: 100, ease: "expo.out" },
    "-=1.5"
  );

  const gsapSq = gsap.utils.toArray(".section-title__square");
  gsapSq.forEach((gSq, i) => {
    const scrubValue = isMobile ? 1.5 : 1.9;
    const rotat = gsap.from(gSq, 3, { rotation: 720 });
    ScrollTrigger.create({
      trigger: gSq,
      animation: rotat,
      start: "top bottom",
      scrub: scrubValue,
    });
  });

  //header
  function header() {
    // Adjust parallax intensity based on device for better mobile visibility
    const parallaxIntensity = isMobile ? 0.7 : 1;
    const scrubValue = isMobile ? 1.5 : 1.9;
    
    gsap.to(".title_paralax", {
      scrollTrigger: {
        trigger: ".header",
        start: "top top",
        scrub: scrubValue,
      },
      yPercent: -150 * parallaxIntensity,
    });
    
    gsap.to(".header .stroke", {
      scrollTrigger: {
        trigger: ".header",
        start: "top top",
        scrub: scrubValue,
      },
      xPercent: isMobile ? 30 : 50,
    });
    
    gsap.to(".header__img", {
      scrollTrigger: {
        trigger: ".header",
        start: "top top",
        scrub: scrubValue,
      },
      xPercent: isMobile ? -40 : -70,
    });
    
    gsap.to(".header__img img", {
      scrollTrigger: {
        trigger: ".header",
        start: "top top",
        scrub: scrubValue,
      },
      scale: isMobile ? 1.15 : 1.3,
    });
    gsap.to(".header__marq-wrapp", {
      scrollTrigger: {
        trigger: ".header",
        start: "top top",
        scrub: scrubValue,
      },
      xPercent: isMobile ? -35 : -50,
    });
    gsap.to(".header__marq-star img", {
      scrollTrigger: {
        trigger: ".header",
        start: "top top",
        scrub: scrubValue,
      },
      rotate: isMobile ? -540 : -720,
    });
  }
  header();

  //about
  function about() {
    const scrubValue = isMobile ? 1.5 : 1.9;
    
    gsap.from(".about__img", {
      scrollTrigger: {
        trigger: ".about",
        start: "top bottom",
        scrub: scrubValue,
      },
      yPercent: isMobile ? 50 : 80,
    });
    gsap.from(".about__img img", {
      scrollTrigger: {
        trigger: ".about",
        start: "top bottom",
        scrub: scrubValue,
      },
      scale: isMobile ? 1.3 : 1.6,
    });
    
    gsap.to(".about__txt", {
      scrollTrigger: {
        trigger: ".about__wrapp",
        start: "top bottom",
        scrub: scrubValue,
      },
      yPercent: isMobile ? 30 : 50,
    });
  }
  about();

  //benefits
  function benefits() {
    const scrubValue = isMobile ? 1.5 : 1.9;
    
    gsap.from(".benefits__num", {
      x: (i, el) => (1 - parseFloat(el.getAttribute("data-speed"))) * (isMobile ? 0.5 : 1),
      scrollTrigger: {
        trigger: ".benefits__list",
        start: "top bottom",
        scrub: scrubValue,
      },
    });
  }
  benefits();

  //portfolio
  function portfolio() {
    const scrubValue = isMobile ? 1.5 : 1.9;
    
    gsap.from(".work__item, .work__item-num", {
      y: (i, el) => (1 - parseFloat(el.getAttribute("data-speed"))) * (isMobile ? 0.6 : 1),
      scrollTrigger: {
        trigger: ".work",
        start: "top bottom",
        scrub: scrubValue,
      },
    });
    
    gsap.from(".work__item-img img", {
      scale: isMobile ? 1.2 : 1.6,
      scrollTrigger: {
        trigger: ".work__wrapp",
        start: "top bottom",
        scrub: scrubValue,
      },
    });
  }
  portfolio();

  //serv
  function serv() {
    const scrubValue = isMobile ? 1.5 : 1.9;
    
    gsap.from(".serv__item-arrow", {
      x: (i, el) => (1 - parseFloat(el.getAttribute("data-speed"))) * (isMobile ? 0.4 : 1),
      scrollTrigger: {
        trigger: ".serv__list",
        start: "top bottom",
        scrub: scrubValue,
      },
    });
  }
  serv();

  //footer
  function footer() {
    const scrubValue = isMobile ? 1.5 : 1.9;
    
    gsap.from(".footer__div span", {
      y: (i, el) => (1 - parseFloat(el.getAttribute("data-speed"))) * (isMobile ? 0.5 : 1),
      opacity: 0,
      scrollTrigger: {
        trigger: ".footer",
        start: "top bottom",
        end: "bottom bottom",
        scrub: scrubValue,
      },
    });
  }
  footer();

  // Handle window resize and orientation change
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Refresh ScrollTrigger on resize
      ScrollTrigger.refresh();
    }, 250);
  });

  // Handle orientation change for mobile devices
  window.addEventListener('orientationchange', function() {
    setTimeout(function() {
      ScrollTrigger.refresh();
    }, 500);
  });
});

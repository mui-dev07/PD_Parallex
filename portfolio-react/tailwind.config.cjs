/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-white": "#ffffff",
        "primary-black": "#000000",
        "soft-black": "#0a0a0a",
        "dark-gray": "#1a1a1a",
        "medium-gray": "#2a2a2a",
        "light-gray": "#3a3a3a",
        "neon-white": "#ffffff",
        "glass-bg": "rgba(255, 255, 255, 0.05)",
        "glass-border": "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        primary: ["Syne", "sans-serif"],
        secondary: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        twinkle: "twinkle 4s linear infinite",
        "twinkle-reverse": "twinkle 6s linear infinite reverse",
        "moving-stars": "movingStars 20s linear infinite",
        float: "float 3s ease-in-out infinite",
        "scroll-line": "scrollLine 2s ease-in-out infinite",
        "rotate-slow": "rotate 20s linear infinite",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        movingStars: {
          "0%": { transform: "translateX(0px) translateY(0px)" },
          "100%": { transform: "translateX(-200px) translateY(-200px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scrollLine: {
          "0%": { height: "0%" },
          "50%": { height: "100%" },
          "100%": { height: "0%" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
        "stars-1": `radial-gradient(1px 1px at 20px 30px, white, transparent),
                   radial-gradient(1px 1px at 40px 70px, white, transparent),
                   radial-gradient(1px 1px at 90px 40px, white, transparent),
                   radial-gradient(1px 1px at 130px 80px, white, transparent),
                   radial-gradient(1px 1px at 160px 30px, white, transparent)`,
        "stars-2": `radial-gradient(1px 1px at 40px 60px, white, transparent),
                   radial-gradient(1px 1px at 80px 10px, white, transparent),
                   radial-gradient(1px 1px at 120px 50px, white, transparent),
                   radial-gradient(1px 1px at 180px 90px, white, transparent)`,
        "moving-stars": `radial-gradient(2px 2px at 30px 40px, rgba(255, 255, 255, 0.8), transparent),
                        radial-gradient(2px 2px at 70px 80px, rgba(255, 255, 255, 0.6), transparent),
                        radial-gradient(1px 1px at 110px 20px, rgba(255, 255, 255, 0.9), transparent),
                        radial-gradient(1px 1px at 150px 60px, rgba(255, 255, 255, 0.7), transparent)`,
      },
      backgroundSize: {
        stars: "200px 100px",
        "moving-stars": "300px 200px",
      },
      clipPath: {
        hero: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        "hero-reveal": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      },
    },
  },
  plugins: [],
} 
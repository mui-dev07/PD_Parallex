# Modern Portfolio - React + Vite + Tailwind CSS

A stunning, modern portfolio website built with React, Vite, and Tailwind CSS, featuring smooth animations, parallax effects, and a beautiful galaxy background.

## 🚀 Features

- **Modern Design**: Clean, professional design with a black/white color scheme
- **Smooth Animations**: GSAP-powered animations and parallax effects
- **Galaxy Background**: Animated starfield with shooting stars
- **Responsive Design**: Fully responsive across all devices
- **Interactive Components**: 
  - Animated navigation with hamburger menu
  - Portfolio grid with project modals
  - Experience slider
  - Testimonials section
  - Contact form
  - Scroll-to-top with navigation popup

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Professional-grade animation library
- **Framer Motion** - React animation library
- **React Icons** - Icon library

## 📁 Project Structure

```
portfolio-react/
├── public/
│   ├── images/          # Portfolio images
│   └── index.html
├── src/
│   ├── components/      # React components
│   │   ├── GalaxyBackground.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Portfolio.jsx
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Hire.jsx
│   │   ├── Footer.jsx
│   │   ├── ProjectModal.jsx
│   │   └── ScrollToTop.jsx
│   ├── App.jsx         # Main app component
│   ├── index.css       # Global styles
│   └── main.jsx        # App entry point
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── package.json
```

## 🎨 Key Components Explained

### 1. **GalaxyBackground**
- Creates an animated starfield background
- Multiple layers of twinkling stars
- Shooting star effects with random trajectories
- Smooth parallax movement

### 2. **Hero Section**
- Large animated title with character-by-character animation
- Parallax image effects
- Scroll indicator with animation
- Responsive typography

### 3. **Portfolio Grid**
- Interactive project cards
- Hover effects with overlay information
- Modal popup for detailed project views
- Parallax scrolling effects

### 4. **Navigation**
- Fixed navbar with scroll effects
- Mobile hamburger menu with sidebar
- Active section highlighting
- Smooth scroll to sections

### 5. **Experience Slider**
- Interactive experience timeline
- Smooth transitions between slides
- Progress indicator
- Responsive design

## 🎯 Animation Features

### GSAP Animations
- **Page Load**: Character-by-character title animation
- **Parallax Effects**: Different scroll speeds for elements
- **Section Squares**: Rotating elements on scroll
- **Stagger Animations**: Sequential element animations

### CSS Animations
- **Twinkling Stars**: CSS keyframe animations
- **Floating Elements**: Smooth up/down movement
- **Hover Effects**: Scale and glow transitions
- **Loading States**: Smooth opacity transitions

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Touch Friendly**: Large touch targets for mobile
- **Performance Optimized**: Reduced animations on mobile

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🎨 Customization

### Colors
Update colors in `tailwind.config.js`:
```javascript
colors: {
  'primary-white': '#ffffff',
  'primary-black': '#000000',
  'soft-black': '#0a0a0a',
  // Add your custom colors
}
```

### Fonts
Update fonts in `tailwind.config.js`:
```javascript
fontFamily: {
  'primary': ['Your-Font', 'sans-serif'],
  'secondary': ['Your-Secondary-Font', 'sans-serif'],
}
```

### Content
- Update project data in `Portfolio.jsx`
- Modify experience data in `Experience.jsx`
- Change testimonials in `Testimonials.jsx`
- Update contact information in `Footer.jsx`

## 📊 Performance Optimizations

- **Lazy Loading**: Images loaded on demand
- **Code Splitting**: Components loaded as needed
- **Optimized Animations**: Reduced motion on mobile
- **Efficient Rendering**: React.memo and useCallback where needed
- **Asset Optimization**: Compressed images and optimized builds

## 🔧 Development Tips

### Adding New Sections
1. Create component in `src/components/`
2. Import in `App.jsx`
3. Add to navigation in `Navbar.jsx`
4. Update scroll targets in `ScrollToTop.jsx`

### GSAP Animation Patterns
```javascript
useEffect(() => {
  const ctx = gsap.context(() => {
    // Your animations here
    gsap.from('.element', {
      y: 100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.trigger-element',
        start: 'top bottom',
        scrub: 1.9,
      },
    })
  }, ref)

  return () => ctx.revert() // Cleanup
}, [])
```

## 🌟 Features Converted from Original

✅ **Galaxy Background** - Animated starfield with shooting stars  
✅ **Smooth Scrolling** - GSAP ScrollTrigger parallax effects  
✅ **Navigation** - Fixed navbar with mobile hamburger menu  
✅ **Hero Section** - Animated title with parallax image  
✅ **Portfolio Grid** - Interactive cards with modal popups  
✅ **About Section** - Skills grid with parallax effects  
✅ **Experience Slider** - Interactive timeline  
✅ **Testimonials** - Animated testimonial cards  
✅ **Hire Section** - Feature cards with CTAs  
✅ **Footer** - Contact info with social links  
✅ **Scroll to Top** - With navigation popup  
✅ **Responsive Design** - Mobile-first approach  
✅ **Modern Animations** - GSAP + CSS transitions  

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](issues).

## 📞 Contact

- Email: hello@developer.com
- Phone: +1 (234) 567-890
- GitHub: [Your GitHub](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourusername)

---

**Built with ❤️ using React, Vite, and Tailwind CSS**

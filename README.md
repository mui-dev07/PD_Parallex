# PodGorilla - AI-Powered Podcast Creation Waitlist

A modern, responsive waitlist landing page for PodGorilla - the revolutionary AI tool that creates podcasts without writing or recording.

## ✨ Features

- **Modern Design**: Clean, professional UI with smooth animations
- **Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Animated Background**: Smooth floating shapes with CSS animations
- **GSAP Animations**: Professional scroll-triggered and interactive animations
- **Email Validation**: Client-side form validation with visual feedback
- **Smooth Scrolling**: Enhanced user experience with Luxy.js
- **Performance Optimized**: Lightweight and fast loading

## 🚀 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript (ES6+)**: Modern JavaScript with GSAP animations
- **GSAP**: Professional animation library with ScrollTrigger
- **Luxy.js**: Smooth scrolling effects
- **Splitting.js**: Text animation effects

## 📱 Responsive Breakpoints

- **Mobile**: 480px and below
- **Tablet**: 768px and below
- **Desktop**: 1024px and above

## 🎨 Design Features

### Animated Background
- Floating gradient shapes with smooth animations
- Parallax effects on scroll
- Optimized for performance

### Typography
- Syne font family for modern look
- Responsive font sizes using clamp()
- Animated text reveals

### Form Design
- Glassmorphism effects
- Smooth hover animations
- Loading states and success feedback

## 📁 File Structure

```
├── index.html              # Main HTML file
├── style/
│   ├── normalize.css       # CSS reset
│   └── style.css          # Main stylesheet
├── js/
│   ├── waitlist.js        # Main JavaScript file
│   ├── luxy.js           # Smooth scrolling library
│   └── splitting.min.js   # Text animation library
├── img/
│   ├── star.svg          # Star icon for marquee
│   └── icon.jpg          # Favicon
└── README.md             # This file
```

## 🛠️ Setup & Installation

1. **Clone or download** the repository
2. **Open** `index.html` in a modern web browser
3. **No build process required** - it's ready to use!

## 🔧 Customization

### Colors
Edit the CSS custom properties in `style/style.css`:
```css
:root {
  --primary-color: #ffffff;
  --secondary-color: #0a0a0a;
  --accent-color: #6366f1;
  --text-muted: #9ca3af;
}
```

### Animation Speed
Adjust GSAP animation durations in `js/waitlist.js`:
```javascript
// Example: Slower animations for accessibility
tl.from(".main-heading .char", {
  duration: 2.0, // Increased from 1.2
  // ... other properties
});
```

### Form Integration
Replace the simulated API call in `js/waitlist.js` with your actual endpoint:
```javascript
// Replace this simulation with actual API call
setTimeout(() => {
  // Your API integration here
}, 2000);
```

## 📊 Performance Features

- **Optimized animations** for 60fps performance
- **Responsive images** and assets
- **Minimal dependencies** for fast loading
- **Progressive enhancement** for older browsers

## 🌐 Browser Support

- **Chrome**: 60+
- **Firefox**: 60+
- **Safari**: 12+
- **Edge**: 79+

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different devices
5. Submit a pull request

## 📞 Support

For questions or support, please open an issue in the repository.

---

**Built with ❤️ for the future of podcast creation**

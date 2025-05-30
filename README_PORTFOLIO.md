# Modern Portfolio Website

A stunning, modern portfolio website built with GSAP animations, smooth scrolling, and a beautiful galaxy background. Features glass morphism effects, neon glows, and a sleek black & white design aesthetic.

## Features

### 🌟 **Design & Visual Effects**
- **Galaxy Background**: Animated stars and moving particles
- **Glass Morphism**: Modern frosted glass effects throughout
- **Neon Glows**: Subtle white neon effects and borders
- **Black & White Theme**: Elegant monochrome color scheme
- **Responsive Design**: Optimized for all devices

### 🚀 **Animations & Interactions**
- **GSAP Animations**: Smooth, professional animations
- **Scroll Triggers**: Elements animate as you scroll
- **Parallax Effects**: Multiple layers of depth
- **Smooth Scrolling**: Buttery smooth navigation
- **Interactive Modal**: Glass morphism project details

### 📱 **User Experience**
- **Mobile-First**: Optimized for mobile devices
- **Performance**: Lightweight and fast loading
- **Accessibility**: Keyboard navigation and ARIA labels
- **SEO Optimized**: Clean HTML structure

## File Structure

```
portfolio/
├── portfolio.html          # Main portfolio page
├── style/
│   ├── portfolio.css       # Main styles with galaxy bg & effects
│   └── normalize.css       # CSS reset (existing)
├── js/
│   ├── portfolio.js        # Main animations & functionality
│   ├── luxy.js            # Smooth scrolling library (existing)
│   └── splitting.min.js   # Text animation library (existing)
└── img/                   # Image assets (existing)
```

## How to Use

### 1. **Quick Start**
- Open `portfolio.html` in your browser
- All animations and effects should work immediately

### 2. **Customization**

#### **Update Project Information**
Edit the project data in `js/portfolio.js`:
```javascript
const projectData = {
    1: {
        title: "Your Project Title",
        description: "Your project description...",
        image: "img/your-image.jpg",
        tech: ["React", "Node.js", "MongoDB"],
        liveLink: "https://your-live-site.com",
        codeLink: "https://github.com/your-repo"
    }
    // Add more projects...
};
```

#### **Update Personal Information**
- **Hero Section**: Edit title and subtitle in HTML
- **About Section**: Update bio and skills
- **Contact Info**: Update email and phone in footer
- **Social Links**: Update social media links

#### **Replace Images**
- Add your project images to the `img/` folder
- Update image paths in HTML and project data
- Recommended image size: 800x600px for best results

### 3. **Color Customization**
To change colors, edit CSS variables in `style/portfolio.css`:
```css
:root {
    --primary-white: #ffffff;
    --primary-black: #000000;
    --neon-glow: rgba(255, 255, 255, 0.8);
    /* Modify these for different color schemes */
}
```

### 4. **Adding New Sections**
Follow the existing HTML structure:
```html
<section class="your-section">
    <div class="content">
        <h2 class="section-title">
            YOUR<span class="stroke">TITLE</span>
            <span class="section-title__square"></span>
        </h2>
        <!-- Your content here -->
    </div>
</section>
```

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Features**: CSS Grid, Flexbox, CSS Custom Properties, ES6+

## Performance Tips

1. **Optimize Images**: Compress images for web
2. **Mobile Performance**: Animations are automatically reduced on mobile
3. **Lazy Loading**: Images load as they come into view
4. **Smooth Scrolling**: Can be disabled for better performance if needed

## Libraries Used

- **GSAP**: Animation library for smooth effects
- **ScrollTrigger**: Scroll-based animations
- **Luxy.js**: Smooth scrolling implementation
- **Splitting.js**: Text animation effects

## Deployment

### **GitHub Pages**
1. Upload files to your GitHub repository
2. Enable GitHub Pages in repository settings
3. Your site will be available at `username.github.io/repo-name`

### **Netlify/Vercel**
1. Connect your GitHub repository
2. Deploy automatically with each commit
3. Custom domain support available

### **Traditional Hosting**
1. Upload all files to your web server
2. Ensure HTTPS is enabled for best performance
3. Configure proper MIME types for assets

## Troubleshooting

### **Animations Not Working**
- Check browser console for JavaScript errors
- Ensure GSAP CDN links are loading properly
- Verify all required files are present

### **Images Not Loading**
- Check image file paths are correct
- Ensure images are in the `img/` folder
- Verify image file extensions match HTML

### **Mobile Issues**
- Test on actual devices, not just browser dev tools
- Check if smooth scrolling is causing issues
- Reduce animation intensity if needed

## Customization Examples

### **Change Galaxy Colors**
```css
.galaxy-bg {
    background: radial-gradient(ellipse at center, #001122 0%, #000000 70%);
}
```

### **Add New Project**
```html
<div class="portfolio-item" data-speed="-300" data-project="5">
    <!-- Portfolio card HTML -->
</div>
```

### **Modify Animation Speed**
```javascript
// In portfolio.js
const scrubValue = isMobile ? 1.5 : 1.9; // Lower = faster
```

## Credits

- **Design**: Modern glass morphism and space theme
- **Development**: Custom GSAP animations and responsive layout
- **Libraries**: GSAP, ScrollTrigger, Luxy.js, Splitting.js

---

**Ready to showcase your work in style!** 🚀✨

For questions or support, check the console for any error messages and ensure all files are properly linked. 
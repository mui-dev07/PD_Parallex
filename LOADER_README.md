# Custom Site Loader

A modern, responsive loading screen for your portfolio website with galaxy-themed animations and smooth transitions.

## Features

- 🎨 **Modern Design**: Matches your site's black/white aesthetic with neon effects
- 🌌 **Galaxy Animation**: Orbital planets, twinkling stars, and glowing core
- 📱 **Fully Responsive**: Works perfectly on all devices and screen sizes
- ⚙️ **Easy Configuration**: Simple toggle between development and production
- 🚀 **Performance Optimized**: Preloads critical images while loading
- 🎭 **Smooth Animations**: GSAP-quality transitions and effects
- ⏱️ **Progress Tracking**: Real-time loading progress with percentage display

## Quick Setup

### 1. Enable/Disable Loader

Edit `js/loader-config.js`:

```javascript
const LOADER_CONFIG = {
  enabled: true,        // true = show loader, false = skip loader
  duration: 5000,       // 5 seconds loading time
  showInDevelopment: false  // Show in localhost (useful for testing)
};
```

### 2. Development Mode

For **development** (no loader):
```javascript
LOADER_CONFIG.enabled = false;
LOADER_CONFIG.showInDevelopment = false;
```

For **production** (with loader):
```javascript
LOADER_CONFIG.enabled = true;
LOADER_CONFIG.showInDevelopment = false;
```

### 3. Testing Locally

To test the loader on localhost:
```javascript
LOADER_CONFIG.showInDevelopment = true;
```

## Configuration Options

### Basic Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | boolean | `true` | Enable/disable the loader |
| `duration` | number | `5000` | Loader duration in milliseconds |
| `showInDevelopment` | boolean | `false` | Show loader on localhost |

### Advanced Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `minDisplayTime` | number | `3000` | Minimum display time even if page loads faster |
| `fadeOutDuration` | number | `800` | Fade out animation duration |
| `contentFadeInDelay` | number | `200` | Delay before content fades in |
| `progressUpdateInterval` | number | `50` | Progress bar update frequency |

## Quick Methods

### Disable Loader Completely
```javascript
LOADER_CONFIG.disable();
```

### Enable Loader for All Environments
```javascript
LOADER_CONFIG.enable();
```

### Change Duration
```javascript
LOADER_CONFIG.setDuration(3000); // 3 seconds
```

### Custom Configuration Example
```javascript
// Production setup: 7-second loader, no development display
LOADER_CONFIG.enabled = true;
LOADER_CONFIG.showInDevelopment = false;
LOADER_CONFIG.duration = 7000;
```

## How It Works

### 1. Environment Detection
The loader automatically detects if you're on localhost or production and applies appropriate settings.

### 2. Content Protection
While the loader is active:
- Main content is hidden (`opacity: 0; pointer-events: none`)
- User cannot interact with the page
- Critical images are preloaded in the background

### 3. Progress Animation
- Real-time progress bar from 0% to 100%
- Smooth orbital animations with twinkling stars
- Galaxy background matching your site's theme

### 4. Completion Process
1. Progress reaches 100%
2. Loader fades out smoothly
3. Main content fades in
4. Loader element is removed from DOM
5. Full site functionality restored

## Customization

### Changing Loader Duration
```javascript
// 3 seconds
LOADER_CONFIG.setDuration(3000);

// 10 seconds
LOADER_CONFIG.setDuration(10000);
```

### Development Workflow
```javascript
// During development - no loader
LOADER_CONFIG.disable();

// Before production deploy
LOADER_CONFIG.enable();
```

### Environment-Based Auto Config
Uncomment this section in `loader-config.js` for automatic setup:

```javascript
// Auto-detect environment and configure accordingly
(function() {
  const isProduction = !LOADER_CONFIG.developmentHosts.includes(window.location.hostname);
  
  if (isProduction) {
    // Production settings
    LOADER_CONFIG.enabled = true;
    LOADER_CONFIG.showInDevelopment = false;
  } else {
    // Development settings
    LOADER_CONFIG.enabled = false;
    LOADER_CONFIG.showInDevelopment = false;
  }
})();
```

## File Structure

```
/
├── index.html              # Updated with loader HTML
├── js/
│   ├── loader-config.js    # Configuration file
│   └── portfolio.js        # Updated with loader logic
├── style/
│   └── portfolio.css       # Updated with loader styles
└── LOADER_README.md        # This documentation
```

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ iOS Safari 12+
- ✅ Android Chrome 60+

## Troubleshooting

### Loader Not Showing
1. Check `LOADER_CONFIG.enabled` is `true`
2. If on localhost, set `LOADER_CONFIG.showInDevelopment = true`
3. Verify `js/loader-config.js` is loaded before other scripts

### Loader Stuck/Not Disappearing
1. Check browser console for JavaScript errors
2. Ensure all image paths in `preloadImages()` are correct
3. Verify GSAP library is loaded properly

### Content Not Appearing
1. Check if `main-content` div has proper ID: `mainContent`
2. Ensure closing `</div>` for main-content is present
3. Verify CSS transitions are not being overridden

## Performance Tips

1. **Optimize Images**: Compress images referenced in `preloadImages()`
2. **CDN Loading**: Use CDN for GSAP to improve loading times
3. **Critical Path**: Load `loader-config.js` first for immediate configuration

## Demo Usage

For a quick demo with different settings:

```javascript
// Quick 2-second demo
LOADER_CONFIG.setDuration(2000);
LOADER_CONFIG.enable();

// Full production experience
LOADER_CONFIG.setDuration(5000);
LOADER_CONFIG.enable();
```

---

**Need help?** Check the configuration examples in `js/loader-config.js` or refer to the inline comments in the code. 
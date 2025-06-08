// ===== SITE LOADER CONFIGURATION =====
// Easy configuration for the custom site loader

const LOADER_CONFIG = {
  // ===== MAIN SETTINGS =====
  
  // Set to false for development (no loader), true for production (with loader)
  enabled: true, 
  
  // Loader duration in milliseconds (5000 = 5 seconds)
  duration: 5000, // Back to 5 seconds for production
  
  // Show loader even in development environment (localhost)
  // Set to true if you want to test the loader locally
  showInDevelopment: true, // Keep true for testing
  
  // ===== DEBUG/TEST MODE =====
  
  // Force loader to show regardless of other settings (for debugging)
  forceShow: false, // Disabled - animations are now working properly
  
  // ===== ADANCED SETTINGS =====
  
  // Minimum time to show loader even if page loads faster
  minDisplayTime: 5000,
  
  // Animation speeds (in milliseconds)
  fadeOutDuration: 800,
  contentFadeInDelay: 200,
  
  // Progress bar update frequency (in milliseconds)
  progressUpdateInterval: 50,
  
  // ===== ENVIRONMENT DETECTION =====
  
  // Custom development hostnames (add your local dev URLs here)
  developmentHosts: [
    'localhost',
    '127.0.0.1',
    '0.0.0.0',
    // Add your custom local development URLs here
    // 'myapp.local',
    // 'dev.mysite.com'
  ],
  
  // ===== QUICK TOGGLE METHODS =====
  
  // Quick method to disable loader (for development)
  disable: function() {
    this.enabled = false;
    this.showInDevelopment = false;
  },
  
  // Quick method to enable loader (for production)
  enable: function() {
    this.enabled = true;
    this.showInDevelopment = true;
  },
  
  // Quick method to set duration
  setDuration: function(milliseconds) {
    this.duration = milliseconds;
  }
};

// ===== USAGE EXAMPLES =====
/*

// To disable loader completely:
LOADER_CONFIG.disable();

// To enable loader for all environments:
LOADER_CONFIG.enable();

// To change duration to 3 seconds:
LOADER_CONFIG.setDuration(3000);

// To show loader only in production but with 7 second duration:
LOADER_CONFIG.enabled = true;
LOADER_CONFIG.showInDevelopment = false;
LOADER_CONFIG.duration = 7000;

*/

// ===== ENVIRONMENT-BASED AUTO CONFIGURATION =====
// Uncomment the section below if you want automatic environment detection

/*
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
*/ 
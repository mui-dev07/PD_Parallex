// ===== CENTRALIZED SECURITY CONFIGURATION =====
// © 2025 Mujtaba Ahmed - All Rights Reserved

(function() {
  'use strict';

  // ===== MASTER SECURITY SWITCH =====
  // Set this to control ALL security features at once
  const MASTER_SECURITY_CONFIG = {
    
    // ===== ENVIRONMENT SETTINGS =====
    // Change this to switch between development and production
    ENVIRONMENT: 'production', // 'development' or 'production'
    
    // ===== MANUAL OVERRIDE =====
    // Set to true/false to manually control all security features
    // This overrides the environment setting above
    MANUAL_OVERRIDE: null, // null, true, or false
    
    // ===== DEVELOPMENT SETTINGS =====
    DEVELOPMENT: {
      enableSecurity: false,           // Master switch for development
      blockDevTools: false,           // Allow DevTools in development
      blockRightClick: false,         // Allow right-click in development
      blockSelection: false,          // Allow text selection
      blockKeyboardShortcuts: false,  // Allow keyboard shortcuts
      enableDebugProtection: false,   // Disable anti-debugging
      showWarnings: false,            // No security warnings
      redirectOnDetection: false,     // No redirects
      enableAntiDebug: false,         // No anti-debugging
      integrityCheck: false,          // No integrity checking
      dynamicWatermark: false,        // No watermarks
      antiTamper: false,              // No tamper detection
      sourceCodeProtection: false,    // No source protection
      networkMonitoring: false,       // No network monitoring
      enableAdvancedSecurity: false   // Disable advanced features
    },
    
    // ===== PRODUCTION SETTINGS =====
    PRODUCTION: {
      enableSecurity: true,            // Master switch for production
      blockDevTools: true,            // Block DevTools in production
      blockRightClick: true,          // Block right-click
      blockSelection: true,           // Block text selection
      blockKeyboardShortcuts: true,   // Block keyboard shortcuts
      enableDebugProtection: true,    // Enable anti-debugging
      showWarnings: false,            // Silent warnings (no popups)
      redirectOnDetection: false,     // Optional: redirect on violation
      enableAntiDebug: true,          // Enable anti-debugging
      integrityCheck: true,           // Enable integrity checking
      dynamicWatermark: false,        // Optional: dynamic watermarks
      antiTamper: true,               // Enable tamper detection
      sourceCodeProtection: true,     // Enable source protection
      networkMonitoring: true,        // Enable network monitoring
      enableAdvancedSecurity: true    // Enable advanced features
    }
  };

  // ===== CONFIGURATION RESOLVER =====
  function getSecurityConfig() {
    // Check for manual override first
    if (MASTER_SECURITY_CONFIG.MANUAL_OVERRIDE !== null) {
      const manualSettings = MASTER_SECURITY_CONFIG.MANUAL_OVERRIDE 
        ? MASTER_SECURITY_CONFIG.PRODUCTION 
        : MASTER_SECURITY_CONFIG.DEVELOPMENT;
      
      console.log(`🔧 Security: MANUAL OVERRIDE - ${MASTER_SECURITY_CONFIG.MANUAL_OVERRIDE ? 'ENABLED' : 'DISABLED'}`);
      return manualSettings;
    }
    
    // Use environment-based configuration
    const config = MASTER_SECURITY_CONFIG.ENVIRONMENT === 'production' 
      ? MASTER_SECURITY_CONFIG.PRODUCTION 
      : MASTER_SECURITY_CONFIG.DEVELOPMENT;
    
    console.log(`🔧 Security: ${MASTER_SECURITY_CONFIG.ENVIRONMENT.toUpperCase()} MODE - ${config.enableSecurity ? 'ENABLED' : 'DISABLED'}`);
    return config;
  }

  // ===== APPLY CONFIGURATION =====
  const CURRENT_CONFIG = getSecurityConfig();

  // Export configuration globally
  window.SECURITY_CONFIG = {
    // Basic security settings
    blockDevTools: CURRENT_CONFIG.blockDevTools,
    blockRightClick: CURRENT_CONFIG.blockRightClick,
    blockSelection: CURRENT_CONFIG.blockSelection,
    blockKeyboardShortcuts: CURRENT_CONFIG.blockKeyboardShortcuts,
    enableDebugProtection: CURRENT_CONFIG.enableDebugProtection,
    showWarnings: CURRENT_CONFIG.showWarnings,
    redirectOnDetection: CURRENT_CONFIG.redirectOnDetection,
    enableAntiDebug: CURRENT_CONFIG.enableAntiDebug,
    watermarkText: '© 2025 Mujtaba Ahmed - All Rights Reserved',
    
    // Master switches
    enableSecurity: CURRENT_CONFIG.enableSecurity,
    enableAdvancedSecurity: CURRENT_CONFIG.enableAdvancedSecurity
  };

  // Advanced security configuration
  window.ADVANCED_SECURITY = {
    enabled: CURRENT_CONFIG.enableAdvancedSecurity,
    integrityCheck: CURRENT_CONFIG.integrityCheck,
    dynamicWatermark: CURRENT_CONFIG.dynamicWatermark,
    antiTamper: CURRENT_CONFIG.antiTamper,
    sourceCodeProtection: CURRENT_CONFIG.sourceCodeProtection,
    networkMonitoring: CURRENT_CONFIG.networkMonitoring,
    fingerprintProtection: CURRENT_CONFIG.enableAdvancedSecurity
  };

  // ===== QUICK CONFIGURATION METHODS =====
  window.SecurityControl = {
    // Enable all security features
    enableAll: function() {
      console.log('🔒 Enabling ALL security features...');
      window.location.reload();
    },
    
    // Disable all security features  
    disableAll: function() {
      console.log('🔓 Disabling ALL security features...');
      window.location.reload();
    },
    
    // Switch to development mode
    developmentMode: function() {
      console.log('🔧 Switching to DEVELOPMENT mode...');
      localStorage.setItem('securityMode', 'development');
      window.location.reload();
    },
    
    // Switch to production mode
    productionMode: function() {
      console.log('🔒 Switching to PRODUCTION mode...');
      localStorage.setItem('securityMode', 'production');
      window.location.reload();
    },
    
    // Get current configuration
    getConfig: function() {
      return {
        environment: MASTER_SECURITY_CONFIG.ENVIRONMENT,
        manualOverride: MASTER_SECURITY_CONFIG.MANUAL_OVERRIDE,
        securityEnabled: CURRENT_CONFIG.enableSecurity,
        currentConfig: CURRENT_CONFIG
      };
    },
    
    // Show current status
    status: function() {
      const config = this.getConfig();
      console.log('🔍 Current Security Status:');
      console.log(`   Environment: ${config.environment}`);
      console.log(`   Security Enabled: ${config.securityEnabled}`);
      console.log(`   Manual Override: ${config.manualOverride}`);
      console.log('   Use SecurityControl.developmentMode() or SecurityControl.productionMode() to switch');
    }
  };

  // ===== ENVIRONMENT DETECTION =====
  // Check for stored preference
  const storedMode = localStorage.getItem('securityMode');
  if (storedMode && (storedMode === 'development' || storedMode === 'production')) {
    MASTER_SECURITY_CONFIG.ENVIRONMENT = storedMode;
  }

  // Auto-detect development environment
  const isDevelopment = 
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '' ||
    window.location.protocol === 'file:';

  if (isDevelopment && !storedMode) {
    MASTER_SECURITY_CONFIG.ENVIRONMENT = 'development';
  }

  // ===== SECURITY STATUS INDICATOR =====
  function createSecurityIndicator() {
    if (!CURRENT_CONFIG.enableSecurity) {
      const indicator = document.createElement('div');
      indicator.innerHTML = '🔓 DEV MODE';
      indicator.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(255, 193, 7, 0.9);
        color: black;
        padding: 5px 10px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 12px;
        z-index: 999999;
        pointer-events: none;
      `;
      
      setTimeout(() => {
        if (document.body) {
          document.body.appendChild(indicator);
          setTimeout(() => indicator.remove(), 3000);
        }
      }, 1000);
    }
  }

  // Show indicator when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createSecurityIndicator);
  } else {
    createSecurityIndicator();
  }

  // ===== CONSOLE HELPERS =====
  console.log('%c🔧 SECURITY CONFIGURATION LOADED', 'color: #00ff41; font-size: 14px; font-weight: bold;');
  console.log(`%cMode: ${MASTER_SECURITY_CONFIG.ENVIRONMENT.toUpperCase()}`, 'color: #fff; font-size: 12px;');
  console.log(`%cSecurity: ${CURRENT_CONFIG.enableSecurity ? 'ENABLED' : 'DISABLED'}`, `color: ${CURRENT_CONFIG.enableSecurity ? '#00ff41' : '#ff4757'}; font-size: 12px;`);
  console.log('%cUse SecurityControl.status() for more info', 'color: #666; font-size: 10px;');

})();

// ===== USAGE EXAMPLES =====
/*

// IN CONSOLE - QUICK COMMANDS:
SecurityControl.status()              // Show current status
SecurityControl.developmentMode()     // Switch to development mode  
SecurityControl.productionMode()      // Switch to production mode
SecurityControl.getConfig()           // Get detailed configuration

// IN CODE - MANUAL OVERRIDE:
// Edit the MANUAL_OVERRIDE setting above:
MANUAL_OVERRIDE: true,    // Force enable all security
MANUAL_OVERRIDE: false,   // Force disable all security  
MANUAL_OVERRIDE: null,    // Use environment-based settings

// ENVIRONMENT SWITCHING:
// Edit the ENVIRONMENT setting above:
ENVIRONMENT: 'development',  // Disable all security features
ENVIRONMENT: 'production',   // Enable all security features

*/ 
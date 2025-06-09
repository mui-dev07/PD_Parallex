// ===== ADVANCED SECURITY LAYER =====
// © 2025 Mujtaba Ahmed - All Rights Reserved
// This file contains proprietary security measures

(function() {
  'use strict';
  
  // Use centralized security configuration
  // Configuration is now loaded from js/security-config.js

  // ===== OBFUSCATED STRINGS =====
  const _SEC = {
    a: 'getElementById',
    b: 'createElement',
    c: 'appendChild',
    d: 'addEventListener',
    e: 'removeEventListener',
    f: 'getAttribute',
    g: 'setAttribute',
    h: 'innerHTML',
    i: 'textContent',
    j: 'style',
    k: 'display',
    l: 'none',
    m: 'block',
    n: 'position',
    o: 'fixed',
    p: 'zIndex',
    q: '999999',
    r: 'background',
    s: 'rgba(0,0,0,0.9)',
    t: 'color',
    u: 'white',
    v: 'fontSize',
    w: '20px',
    x: 'textAlign',
    y: 'center',
    z: 'padding'
  };

  // ===== SOURCE CODE INTEGRITY CHECK =====
  class IntegrityChecker {
    constructor() {
      this.originalSources = new Map();
      this.checksums = new Map();
      this.monitoringActive = false;
    }

    // Generate simple checksum
    generateChecksum(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      return Math.abs(hash).toString(16);
    }

    // Store original source
    storeOriginal(name, content) {
      this.originalSources.set(name, content);
      this.checksums.set(name, this.generateChecksum(content));
    }

    // Verify integrity
    verifyIntegrity(name, content) {
      const originalChecksum = this.checksums.get(name);
      const currentChecksum = this.generateChecksum(content);
      return originalChecksum === currentChecksum;
    }

    // Monitor for changes
    startMonitoring() {
      if (this.monitoringActive) return;
      this.monitoringActive = true;

      // Monitor script tags
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.tagName === 'SCRIPT' && node.src) {
                this.handleTampering('script_injection');
              }
            });
          }
        });
      });

      observer.observe(document, {
        childList: true,
        subtree: true
      });
    }

    handleTampering(type) {
      console.clear();
      SecurityHandler.triggerSecurityAlert(`TAMPERING_DETECTED_${type.toUpperCase()}`);
    }
  }

  // ===== DYNAMIC WATERMARK SYSTEM =====
  class WatermarkSystem {
    constructor() {
      this.watermarks = [];
      this.interval = null;
    }

    createWatermark() {
      const watermark = document[_SEC.b]('div');
      watermark[_SEC.g]('data-security', 'watermark');
      
      // Randomize position
      const positions = [
        { top: '10px', right: '10px' },
        { bottom: '10px', left: '10px' },
        { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
        { top: '10px', left: '50%', transform: 'translateX(-50%)' }
      ];
      
      const pos = positions[Math.floor(Math.random() * positions.length)];
      
      watermark[_SEC.j][_SEC.n] = _SEC.o;
      watermark[_SEC.j][_SEC.p] = _SEC.q;
      watermark[_SEC.j][_SEC.t] = 'rgba(255,255,255,0.1)';
      watermark[_SEC.j][_SEC.v] = '12px';
      watermark[_SEC.j].fontFamily = 'monospace';
      watermark[_SEC.j].pointerEvents = 'none';
      watermark[_SEC.j].userSelect = 'none';
      
      // Apply position
      Object.assign(watermark[_SEC.j], pos);
      
      watermark[_SEC.i] = `© ${new Date().getFullYear()} Mujtaba Ahmed - Protected`;
      
      document.body[_SEC.c](watermark);
      this.watermarks.push(watermark);
      
      // Remove after random time
      setTimeout(() => {
        if (watermark.parentNode) {
          watermark.parentNode.removeChild(watermark);
        }
        this.watermarks = this.watermarks.filter(w => w !== watermark);
      }, Math.random() * 5000 + 3000);
    }

    startDynamicWatermarking() {
      this.interval = setInterval(() => {
        if (this.watermarks.length < 3) {
          this.createWatermark();
        }
      }, Math.random() * 10000 + 5000);
    }

    stopDynamicWatermarking() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }
  }

  // ===== ADVANCED ANTI-DEBUGGING =====
  class AntiDebugger {
    constructor() {
      this.debuggerDetected = false;
      this.intervals = [];
    }

    // Method 1: Debugger statement timing
    timingCheck() {
      const interval = setInterval(() => {
        const start = performance.now();
        debugger;
        const end = performance.now();
        
        if (end - start > 100) {
          this.debuggerDetected = true;
          SecurityHandler.triggerSecurityAlert('DEBUGGER_TIMING');
        }
      }, 1000);
      
      this.intervals.push(interval);
    }

    // Method 2: Console API monitoring
    consoleMonitoring() {
      const originalLog = console.log;
      const originalClear = console.clear;
      const originalWarn = console.warn;
      const originalError = console.error;

      // Override console methods
      console.log = function(...args) {
        SecurityHandler.logSecurityEvent('console_access', args);
        return originalLog.apply(console, args);
      };

      console.clear = function() {
        SecurityHandler.logSecurityEvent('console_clear');
        return originalClear.apply(console);
      };

      // Create trap for console access
      const img = new Image();
      Object.defineProperty(img, 'id', {
        get: function() {
          SecurityHandler.triggerSecurityAlert('CONSOLE_ACCESS');
          return '';
        }
      });

      // Periodically trigger console access check
      const interval = setInterval(() => {
        console.log(img);
        console.clear();
      }, 2000);

      this.intervals.push(interval);
    }

    // Method 3: Function constructor detection
    functionConstructorTrap() {
      const originalFunction = window.Function;
      window.Function = function(...args) {
        SecurityHandler.triggerSecurityAlert('FUNCTION_CONSTRUCTOR');
        return originalFunction.apply(this, args);
      };
    }

    // Method 4: Eval detection
    evalTrap() {
      const originalEval = window.eval;
      window.eval = function(code) {
        SecurityHandler.triggerSecurityAlert('EVAL_USAGE');
        return originalEval.call(this, code);
      };
    }

    // Start all anti-debugging measures
    initialize() {
      this.timingCheck();
      this.consoleMonitoring();
      this.functionConstructorTrap();
      this.evalTrap();
    }

    // Cleanup
    destroy() {
      this.intervals.forEach(interval => clearInterval(interval));
      this.intervals = [];
    }
  }

  // ===== NETWORK MONITORING =====
  class NetworkMonitor {
    constructor() {
      this.requests = [];
      this.suspiciousActivity = false;
    }

    monitorRequests() {
      // Override fetch
      const originalFetch = window.fetch;
      window.fetch = (...args) => {
        this.logRequest('fetch', args[0]);
        return originalFetch.apply(window, args);
      };

      // Override XMLHttpRequest
      const originalXMLHttpRequest = window.XMLHttpRequest;
      window.XMLHttpRequest = function() {
        const xhr = new originalXMLHttpRequest();
        const originalOpen = xhr.open;
        
        xhr.open = function(method, url) {
          NetworkMonitor.instance.logRequest('xhr', url);
          return originalOpen.apply(xhr, arguments);
        };
        
        return xhr;
      };
    }

    logRequest(type, url) {
      this.requests.push({
        type,
        url,
        timestamp: Date.now()
      });

      // Check for suspicious patterns
      if (this.isSuspiciousRequest(url)) {
        SecurityHandler.triggerSecurityAlert('SUSPICIOUS_NETWORK_ACTIVITY');
      }
    }

    isSuspiciousRequest(url) {
      const suspiciousPatterns = [
        /download/i,
        /scrape/i,
        /extract/i,
        /copy/i,
        /steal/i,
        /hack/i
      ];

      return suspiciousPatterns.some(pattern => pattern.test(url));
    }
  }

  // ===== MAIN SECURITY HANDLER =====
  class SecurityHandler {
    static instance = null;

    constructor() {
      if (SecurityHandler.instance) {
        return SecurityHandler.instance;
      }
      
      SecurityHandler.instance = this;
      this.integrityChecker = new IntegrityChecker();
      this.watermarkSystem = new WatermarkSystem();
      this.antiDebugger = new AntiDebugger();
      this.networkMonitor = new NetworkMonitor();
      this.securityEvents = [];
      this.alertCount = 0;
    }

    static triggerSecurityAlert(type) {
      const handler = SecurityHandler.instance || new SecurityHandler();
      handler.handleSecurityAlert(type);
    }

    static logSecurityEvent(type, data = null) {
      const handler = SecurityHandler.instance || new SecurityHandler();
      handler.logEvent(type, data);
    }

    handleSecurityAlert(type) {
      this.alertCount++;
      this.logEvent('SECURITY_ALERT', { type, count: this.alertCount });

      // Log silently without visual overlay
      console.log(`🔒 Security Alert: ${type} (Count: ${this.alertCount})`);

      // If too many alerts, take stronger action
      if (this.alertCount > 10) {
        this.enableStrictMode();
      }
    }

    showSecurityOverlay(type) {
      const overlay = document[_SEC.b]('div');
      overlay[_SEC.g]('id', 'security-overlay-' + Date.now());
      
      overlay[_SEC.j][_SEC.n] = _SEC.o;
      overlay[_SEC.j].top = '0';
      overlay[_SEC.j].left = '0';
      overlay[_SEC.j].width = '100vw';
      overlay[_SEC.j].height = '100vh';
      overlay[_SEC.j][_SEC.r] = 'rgba(0, 0, 0, 0.95)';
      overlay[_SEC.j][_SEC.p] = '999999';
      overlay[_SEC.j][_SEC.k] = 'flex';
      overlay[_SEC.j].alignItems = 'center';
      overlay[_SEC.j].justifyContent = 'center';
      overlay[_SEC.j][_SEC.t] = '#ff4757';
      overlay[_SEC.j].fontFamily = 'monospace';
      overlay[_SEC.j][_SEC.v] = '18px';
      overlay[_SEC.j][_SEC.x] = _SEC.y;

      overlay[_SEC.h] = `
        <div>
          <h2 style="margin-bottom: 20px;">🔒 SECURITY BREACH DETECTED</h2>
          <p>Alert Type: ${type}</p>
          <p>Timestamp: ${new Date().toISOString()}</p>
          <p>Alert #${this.alertCount}</p>
          <div style="margin-top: 30px; opacity: 0.7; font-size: 14px;">
            <p>© 2025 Mujtaba Ahmed - All Rights Reserved</p>
            <p>This application is protected by advanced security measures</p>
          </div>
        </div>
      `;

      document.body[_SEC.c](overlay);

      // Auto-remove after 3 seconds
      setTimeout(() => {
        if (overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      }, 3000);
    }

    enableStrictMode() {
      // More aggressive protection
      document.body[_SEC.j].filter = 'blur(5px)';
      document.body[_SEC.j].pointerEvents = 'none';
      
      // Optional: redirect to blank page
      setTimeout(() => {
        window.location.href = 'about:blank';
      }, 5000);
    }

    logEvent(type, data) {
      this.securityEvents.push({
        type,
        data,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });

      // Keep only last 100 events
      if (this.securityEvents.length > 100) {
        this.securityEvents = this.securityEvents.slice(-100);
      }
    }

    initialize() {
      // Check if advanced security is enabled
      if (!window.ADVANCED_SECURITY || !window.ADVANCED_SECURITY.enabled) {
        console.log('🔓 Advanced security disabled - skipping initialization');
        return;
      }

      console.clear();
      console.log('%c🔒 ADVANCED SECURITY INITIALIZED', 'color: #00ff00; font-size: 16px; font-weight: bold;');
      console.log('%c© 2025 Mujtaba Ahmed - All Rights Reserved', 'color: #666; font-size: 12px;');

      // Initialize components
      if (window.ADVANCED_SECURITY.integrityCheck) {
        this.integrityChecker.startMonitoring();
      }

      if (window.ADVANCED_SECURITY.dynamicWatermark) {
        this.watermarkSystem.startDynamicWatermarking();
      }

      if (window.ADVANCED_SECURITY.antiTamper) {
        this.antiDebugger.initialize();
      }

      if (window.ADVANCED_SECURITY.networkMonitoring) {
        this.networkMonitor.monitorRequests();
      }

      // Set up NetworkMonitor singleton
      NetworkMonitor.instance = this.networkMonitor;

      this.logEvent('SECURITY_SYSTEM_INITIALIZED');
    }
  }

  // ===== INITIALIZATION =====
  const securityHandler = new SecurityHandler();
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => securityHandler.initialize());
  } else {
    securityHandler.initialize();
  }

  // Global exposure (minimal)
  window.ADVANCED_SECURITY_ACTIVE = true;
  window.SecurityHandler = SecurityHandler;

})();

// ===== ADDITIONAL PROTECTION LAYER =====
// This creates a secondary protection layer that monitors the primary security

setTimeout(() => {
  // Check if we're in development mode
  const isDevelopment = window.SECURITY_CONFIG && 
                       window.SECURITY_CONFIG.enableSecurity === false;
  
  if (isDevelopment) {
    console.log('🔧 Development Mode: Security tampering check skipped');
    return;
  }
  
  // Only check for tampering in production mode
  if (!window.SECURITY_ENABLED || !window.ADVANCED_SECURITY_ACTIVE) {
    console.error('Security system has been tampered with!');
    document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:monospace;color:red;font-size:24px;">SECURITY VIOLATION DETECTED</div>';
  }
}, 2000); 
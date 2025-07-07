import { defineConfig } from 'cypress';

/**
 * Cypress Configuration
 * Main configuration file for E2E testing against Amazon.com
 */
export default defineConfig({
  e2e: {
    // Base URL for all tests - Amazon homepage
    baseUrl: 'https://amazon.com',
    
    // Browser viewport settings for consistent test execution
    viewportWidth: 1920,    // Desktop resolution width
    viewportHeight: 1080,   // Desktop resolution height
    
    // Timeout configurations (in milliseconds)
    defaultCommandTimeout: 15000,  // Default wait time for commands
    requestTimeout: 15000,         // HTTP request timeout
    responseTimeout: 15000,        // HTTP response timeout
    pageLoadTimeout: 30000,        // Page load timeout (longer for Amazon)
    
    // Test retry configuration
    retries: {
      runMode: 2,   // Retry failed tests 2 times in CI/headless mode
      openMode: 0,  // No retries in interactive mode for debugging
    },
    
    // Recording and debugging settings
    video: true,                    // Record video of test execution
    screenshotOnRunFailure: true,   // Capture screenshots when tests fail
    
    // Node events and plugin setup
    setupNodeEvents(on, config) {
      // Setup Mochawesome reporter plugin for enhanced HTML reports
      return import('cypress-mochawesome-reporter/plugin').then((plugin) => {
        plugin.default(on);
      });
    },
    
    // Test reporting configuration
    reporter: 'cypress-mochawesome-reporter',  // Use Mochawesome for rich HTML reports
    reporterOptions: {
      reportDir: 'cypress/reports',  // Output directory for reports
      overwrite: false,              // Keep historical reports
      html: true,                    // Generate HTML report
      json: true,                    // Generate JSON report for CI integration
    },
  },
});
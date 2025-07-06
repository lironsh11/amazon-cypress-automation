import { defineConfig } from 'cypress'
const mochawesome = require('cypress-mochawesome-reporter/plugin');

export default defineConfig({
  e2e: {
    baseUrl: 'https://amazon.com',
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 15000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    pageLoadTimeout: 30000,
    retries: {
      runMode: 2,
      openMode: 0
    },
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      mochawesome(on)
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true
    }
  }
})

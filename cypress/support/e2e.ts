/**
 * Cypress Global Configuration and Setup
 * Handles application-wide test settings, error handling, and pre-test setup
 */

// Import custom commands to make them available across all tests
import './commands'

/**
 * Global error handler for Amazon's internal JavaScript errors
 * Prevents test failures from Amazon's own JS issues that don't affect functionality
 */
Cypress.on('uncaught:exception', (err, runnable) => {
  if (
    err.message.includes('cardModuleFactory') ||    // Card module errors
    err.message.includes('is not a function') ||    // Common JS function errors
    err.message.includes('Cannot read property') || // Property access errors
    err.message.includes('script error')            // Generic script errors
  ) {
    return false  // Ignore these errors - don't fail the test
  }
  return true     // Allow other errors to fail the test
})

/**
 * Global setup executed before each test
 * Ensures consistent starting state across all test cases
 */
beforeEach(() => {
  // Wait for page stability before any interactions
  cy.wait(2000)
  
  // Dismiss any "Continue shopping" modals that appear on page load
  cy.dismissContinueShoppingModal()
})

/**
 * Global cleanup executed after each test
 * Provides test completion logging and potential cleanup hooks
 */
afterEach(() => {
  // Log test completion for debugging and monitoring
  cy.log('Test completed')
})
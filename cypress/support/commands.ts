/// <reference types="cypress" />

/**
 * Custom Cypress Commands
 * Defines reusable commands for common cross-browser modal handling
 */

// TypeScript declaration for custom command
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      dismissContinueShoppingModal(): Chainable<void>  // Modal dismissal command
    }
  }
}

/**
 * Custom command to dismiss Amazon's "Continue shopping" modal
 * Handles modal that appears in certain browsers when navigating to Amazon
 */
Cypress.Commands.add('dismissContinueShoppingModal', () => {
  // Check if continue shopping modal exists before attempting to close
  cy.get('body').then(($body) => {
    if ($body.find('input[value="Continue shopping"]').length > 0) {
      // Click the continue shopping button to dismiss modal
      cy.contains('Continue shopping').click({ force: true });
    }
  });
});

export {}
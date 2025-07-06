/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      dismissContinueShoppingModal(): Chainable<void>
      clearCart(): Chainable<void>
      setLocationToHongKong(): Chainable<void>
      waitForPageLoad(): Chainable<void>
    }
  }
}

Cypress.Commands.add('dismissContinueShoppingModal', () => {
  cy.get('body').then(($body) => {
    if ($body.find('input[value="Continue shopping"]').length > 0) {
      cy.contains('Continue shopping').click({ force: true });
    }
  });
});

Cypress.Commands.add('clearCart', () => {
  cy.visit('/gp/cart/view.html')
  cy.get('body').then(($body: JQuery<HTMLElement>) => {
    const deleteButtons = $body.find('[value="Delete"]')
    if (deleteButtons.length > 0) {
      cy.get('[value="Delete"]').first().click({ force: true })
      cy.wait(1000)
      cy.clearCart()
    }
  })
})

Cypress.Commands.add('setLocationToHongKong', () => {
  cy.get('#nav-global-location-popover-link', { timeout: 10000 }).click()
  cy.wait(2000)
  cy.get('span.a-button-text.a-declarative[role="radiogroup"][data-action="a-dropdown-button"]', { timeout: 10000 }).click()
  cy.wait(1000)
  cy.get('a.a-dropdown-link[data-value*="HK"]', { timeout: 10000 }).click()
  cy.get('#GLUXCountryValue', { timeout: 5000 }).should('contain.text', 'Hong Kong')
  cy.get('button[name="glowDoneButton"]', { timeout: 10000 }).click()
  cy.wait(3000)
})

Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body', { timeout: 15000 }).should('be.visible')
  cy.wait(1000)
})

export {}
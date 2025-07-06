import { BasePage } from './BasePage'

export class HomePage extends BasePage {
  private readonly selectors = {
    searchBox: '#twotabsearchtextbox',
    customerServiceLink: 'Customer Service',
    locationButton: '#nav-global-location-popover-link'
  }

  constructor() {
    super('/')
  }

  searchForProduct(productName: string): this {
    this.typeText(this.selectors.searchBox, `${productName}{enter}`)
    return this
  }

goToCustomerService(): this {
  // Ensure the page body is rendered
  cy.get('body').should('be.visible');

  // Optionally trigger hover if menu requires it
  cy.get('#nav-link-accountList', { timeout: 10000 }).trigger('mouseover');

  // Click the Customer Service link, forcing the click in case it's hidden
  cy.contains(this.selectors.customerServiceLink, { timeout: 10000 })
    .click({ force: true });

  return this;
}
setLocationTo(countryCode: string, countryName: string): this {
    cy.get(this.selectors.locationButton, { timeout: 10000 }).click()
    cy.wait(2000)
    cy.get('span.a-button-text.a-declarative[role="radiogroup"]', { timeout: 10000 }).click()
    cy.wait(1000)
    cy.get(`a.a-dropdown-link[data-value*="${countryCode}"]`, { timeout: 10000 }).click()
    cy.get('#GLUXCountryValue', { timeout: 5000 }).should('contain.text', countryName)
    cy.get('button[name="glowDoneButton"]', { timeout: 10000 }).click()
    cy.wait(3000)
    return this
}

  validateMainMenu(): this {
    cy.contains('Today\'s Deals').should('be.visible')
    cy.contains('Customer Service').should('be.visible')
    cy.contains('Registry').should('be.visible')
    return this
  }
}
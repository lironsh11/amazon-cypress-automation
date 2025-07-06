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
    cy.contains(this.selectors.customerServiceLink).click()
    return this
  }

  setLocationToHongKong(): this {
    cy.get(this.selectors.locationButton, { timeout: 10000 }).click()
    cy.wait(2000)
    cy.get('span.a-button-text.a-declarative[role="radiogroup"]', { timeout: 10000 }).click()
    cy.wait(1000)
    cy.get('a.a-dropdown-link[data-value*="HK"]', { timeout: 10000 }).click()
    cy.get('#GLUXCountryValue', { timeout: 5000 }).should('contain.text', 'Hong Kong')
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
import { BasePage } from './BasePage'

/**
 * HomePage - Handles Amazon main homepage interactions
 * URL: / (root)
 */
export class HomePage extends BasePage {
  // Element selectors for homepage
  private readonly selectors = {
    searchBox: '#twotabsearchtextbox',              // Main product search input
    customerServiceLink: 'Customer Service',        // Customer service navigation link
    amazonLogo: '#nav-logo',                             // Amazon logo for page validation
    locationButton: '#nav-global-location-popover-link'  // Location/delivery settings button
  }

  /**
   * Initialize with homepage root URL
   */
  constructor() {
    super('/')
  }
  /**
   * Define the most stable element that indicates Amazon homepage loaded successfully
   * Uses the Amazon logo as it's always present and loads early in the page lifecycle
   * @returns string - CSS selector for Amazon logo element
   */
  getStableSelector(): string {
    return this.selectors.amazonLogo
  }
  /**
   * Search for products using main search box
   * @param productName - Product name or keywords to search
   * @returns this - For method chaining
   */
  searchForProduct(productName: string): this {
    // Type product name and press Enter to search
    this.typeText(this.selectors.searchBox, `${productName}{enter}`)
    return this
  }

  /**
   * Navigate to Customer Service page with enhanced stability
   * Handles potential hover menus and visibility issues
   * @returns this - For method chaining
   */
  goToCustomerService(): this {
    // Ensure page is fully loaded before interaction
    cy.get('body').should('be.visible')

    // Trigger hover on account menu in case Customer Service is in dropdown
    cy.get('#nav-link-accountList', { timeout: 10000 }).trigger('mouseover')

    // Force click Customer Service link to handle any overlay issues
    cy.contains(this.selectors.customerServiceLink, { timeout: 10000 })
      .click({ force: true })

    return this
  }

  /**
   * Set delivery location to specified country (generic method)
   * @param countryCode - Country code for selection (e.g., "HK", "US")
   * @param countryName - Country name for verification (e.g., "Hong Kong", "United States")
   * @returns this - For method chaining
   */
  setLocationTo(countryCode: string, countryName: string): this {
  // Step 1: Open location selection modal
  cy.get(this.selectors.locationButton, { timeout: 10000 }).click()
  cy.wait(2000)

  // Step 2: Open country dropdown
  cy.get('span.a-button-text.a-declarative[role="radiogroup"]', { timeout: 10000 }).click()
  cy.wait(1000)

  // Step 3: Filter by countryCode and click the one with correct countryName
  cy.get(`a.a-dropdown-link[data-value*="${countryCode}"]`, { timeout: 10000 })
    .should('have.length.greaterThan', 0)
    .then(($elements) => {
      const targetElement = Array.from($elements).find((el) =>
        el.textContent?.trim().includes(countryName)
      )

      if (targetElement) {
        cy.wrap(targetElement).click()
      } else {
        throw new Error(`Could not find country option for code "${countryCode}" and name "${countryName}"`)
      }
    })

  // Step 4: Verify the selection was applied correctly
  cy.get('#GLUXCountryValue', { timeout: 5000 }).should('contain.text', countryName)

  // Step 5: Save location settings and close modal
  cy.get('button[name="glowDoneButton"]', { timeout: 10000 }).click()
  cy.wait(3000)

  return this
}

  /**
   * Verify main navigation menu items are visible
   * @returns this - For method chaining
   */
  validateMainMenu(): this {
    // Check key navigation elements are present
    cy.contains('Today\'s Deals').should('be.visible')
    cy.contains('Customer Service').should('be.visible')
    cy.contains('Registry').should('be.visible')
    return this
  }
}
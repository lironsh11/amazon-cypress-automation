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
    locationButton: '#nav-global-location-popover-link'  // Location/delivery settings button
  }

  /**
   * Initialize with homepage root URL
   */
  constructor() {
    super('/')
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
    // Open location selection modal
    cy.get(this.selectors.locationButton, { timeout: 10000 }).click()
    cy.wait(2000)
    
    // Open country dropdown
    cy.get('span.a-button-text.a-declarative[role="radiogroup"]', { timeout: 10000 }).click()
    cy.wait(1000)
    
    // Select country by code
    cy.get(`a.a-dropdown-link[data-value*="${countryCode}"]`, { timeout: 10000 }).click()
    
    // Verify selection is displayed
    cy.get('#GLUXCountryValue', { timeout: 5000 }).should('contain.text', countryName)
    
    // Save location settings
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
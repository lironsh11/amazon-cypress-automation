import { BasePage } from './BasePage'

/**
 * HomePage - Handles Amazon main homepage interactions
 * 
 * This page object manages all interactions with Amazon's main homepage including
 * product search, navigation to customer service, location settings, and basic
 * homepage validation.
 * 
 * URL: / (root)
 */
export class HomePage extends BasePage {
  // Element selectors for homepage interactions
  private readonly selectors = {
    searchBox: '#twotabsearchtextbox',                    // Main product search input field
    customerServiceLink: 'Customer Service',              // Customer service navigation link text
    locationButton: '#nav-global-location-popover-link', // Location/delivery settings button
    amazonLogo: '#nav-logo',                             // Amazon logo for page validation
    navigationBar: '#navbar'                             // Main navigation bar
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
   * Types the product name and submits search via Enter key
   * @param productName - Product name or keywords to search for
   * @returns this - For method chaining
   */
  searchForProduct(productName: string): this {
    // Type product name and press Enter to execute search
    this.typeText(this.selectors.searchBox, `${productName}{enter}`)
    return this
  }

  /**
   * Navigate to Customer Service page with enhanced stability
   * Handles potential hover menus and visibility issues that may occur
   * in different browser environments or screen sizes
   * @returns this - For method chaining
   */
  goToCustomerService(): this {
    // Ensure page is fully loaded and stable before interaction
    cy.get('body').should('be.visible')

    // Trigger hover on account menu area in case Customer Service link
    // is hidden in a dropdown menu (common on mobile/responsive layouts)
    cy.get('#nav-link-accountList', { timeout: 10000 }).trigger('mouseover')

    // Force click Customer Service link to handle any overlay issues
    // Force flag ensures click works even if element is partially obscured
    cy.contains(this.selectors.customerServiceLink, { timeout: 10000 })
      .click({ force: true })

    return this
  }

  /**
   * Set delivery location to specified country (generic method for international testing)
   * This method supports any country by using country code and name parameters
   * @param countryCode - Two-letter country code for dropdown selection (e.g., "HK", "US", "UK")
   * @param countryName - Full country name for verification (e.g., "Hong Kong", "United Kingdome")
   * @returns this - For method chaining
   */
 /**
 * Set delivery location to specified country using data-value.stringVal (e.g., "GB", "HK", "US")
 * @param countryCode - The 2-letter country code inside data-value (e.g., "GB")
 * @param countryName - The visible country name (used for verification, e.g., "United Kingdom")
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
   * Verify main navigation menu items are visible and accessible
   * Validates core navigation elements to ensure homepage functionality
   * @returns this - For method chaining
   */
  validateMainMenu(): this {
    // Check that key navigation elements are present and visible
    // These elements are essential for basic Amazon navigation
    cy.contains('Today\'s Deals').should('be.visible')      // Deals section
    cy.contains('Customer Service').should('be.visible')    // Support access
    cy.contains('Registry').should('be.visible')           // Gift registry feature
    
    return this
  }

  /**
   * Verify search functionality is working
   * Additional validation method for search box functionality
   * @returns this - For method chaining
   */
  validateSearchBox(): this {
    // Verify search box is enabled and accepts input
    cy.get(this.selectors.searchBox).should('be.visible').and('not.be.disabled')
    
    // Verify placeholder text is present (indicates proper initialization)
    cy.get(this.selectors.searchBox).should('have.attr', 'placeholder')
    
    return this
  }

  /**
   * Verify homepage core elements loaded successfully
   * Comprehensive validation for homepage integrity
   * @returns this - For method chaining
   */
  validateHomepage(): this {
    // Verify Amazon logo is present (primary homepage identifier)
    this.verifyElementVisible(this.selectors.amazonLogo)
    
    // Verify main search box is available (core functionality)
    this.verifyElementVisible(this.selectors.searchBox)
    
    // Verify navigation bar loaded (essential for site navigation)
    this.verifyElementVisible(this.selectors.navigationBar)
    
    return this
  }
}
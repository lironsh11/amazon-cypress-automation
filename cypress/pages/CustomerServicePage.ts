import { BasePage } from './BasePage'

/**
 * CustomerServicePage - Handles Amazon customer service help center interactions
 * 
 * This class manages all interactions with Amazon's customer service help center,
 * including searching for help articles and verifying content display.
 * Extends BasePage to inherit common page interaction methods.
 * 
 * URL: /gp/help/customer/display.html
 */
export class CustomerServicePage extends BasePage {
  // Element selectors for customer service page interactions
  private readonly selectors = {
    searchInput: 'input[type="search"]',       // Help search input field
    helpSearchInput: '#hubHelpSearchInput',    // Primary help search input (more stable)
    helpArticleTitle: "Where's My Stuff?",     // Target help article title
    helpCenter: '#help-center'                // Main help center container
  }

  /**
   * Initialize with customer service page URL
   */
  constructor() {
    super('/gp/help/customer/display.html')
  }

  /**
   * Define the most stable element that indicates customer service page loaded successfully
   * Uses help search input as it's the primary functionality of the customer service page
   * @returns string - CSS selector for help search input element
   */
  getStableSelector(): string {
    return this.selectors.helpSearchInput
  }

  /**
   * Search for help articles and submit with Enter key
   * Uses the most reliable search input element for consistent functionality
   * @param query - Search terms (e.g., "where is my stuff")
   * @returns this - For method chaining
   */
  searchForHelp(query: string): this {
    // Type query and press Enter to search using primary search input
    this.typeText(this.selectors.helpSearchInput, `${query}{enter}`)
    return this
  }

  /**
   * Verify the expected help article is displayed in search results
   * Confirms that the correct help article was found and is visible to the user
   * @returns this - For method chaining
   */
  verifyHelpArticleDisplayed(): this {
    // Check that the target article title is visible on the page
    cy.contains(this.selectors.helpArticleTitle, { timeout: 10000 }).should('be.visible')
    return this
  }

  /**
   * Verify help center page loaded with core functionality
   * Additional validation method for help center page completeness
   * @returns this - For method chaining
   */
  validateHelpCenter(): this {
    // Verify main help center container is present
    this.verifyElementVisible(this.selectors.helpCenter)
    
    // Verify search functionality is available
    this.verifyElementVisible(this.selectors.helpSearchInput)
    
    return this
  }

  /**
   * Search for help with alternative search input (fallback method)
   * Provides backup search functionality if primary input is not available
   * @param query - Search terms to look for
   * @returns this - For method chaining
   */
  searchForHelpAlternative(query: string): this {
    // Use generic search input as fallback
    this.typeText(this.selectors.searchInput, `${query}{enter}`)
    return this
  }
}
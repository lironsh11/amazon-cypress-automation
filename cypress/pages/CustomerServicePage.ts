import { BasePage } from './BasePage'

/**
 * CustomerServicePage - Handles Amazon customer service help center interactions
 * URL: /gp/help/customer/display.html
 */
export class CustomerServicePage extends BasePage {
  // Element selectors for customer service page
  private readonly selectors = {
    searchInput: 'input[type="search"]',    // Help search input field
    helpArticleTitle: "Where's My Stuff?"   // Target help article title
  }

  /**
   * Initialize with customer service page URL
   */
  constructor() {
    super('/gp/help/customer/display.html')
  }

  /**
   * Search for help articles and submit with Enter key
   * @param query - Search terms (e.g., "where is my stuff")
   * @returns this - For method chaining
   */
  searchForHelp(query: string): this {
    // Type query and press Enter to search
    this.typeText(this.selectors.searchInput, `${query}{enter}`)
    return this
  }

  /**
   * Verify the expected help article is displayed
   * @returns this - For method chaining
   */
  verifyHelpArticleDisplayed(): this {
    // Check that article title is visible on page
    cy.contains(this.selectors.helpArticleTitle).should('be.visible')
    return this
  }
}
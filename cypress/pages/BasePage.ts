/**
 * BasePage - Abstract base class for all Page Object Model classes
 * 
 * This class provides common functionality that all page objects should inherit.
 * It implements the base methods for navigation, element interaction, and verification
 * that are used across all pages in the application.
 * 
 * Design Pattern: Page Object Model (POM)
 * Purpose: Reduce code duplication and provide consistent interface for page interactions
 */
export abstract class BasePage {
  // Protected property to store the page URL - accessible to child classes only
  protected readonly url: string

  /**
   * Constructor - Initialize the page with its specific URL
   * @param url - The relative URL path for this page (default: root '/')
   */
  constructor(url: string = '/') {
    this.url = url
  }

  /**
   * Navigate to the page URL and wait for basic page stability
   * @returns this - Returns the current page instance for method chaining
   */
  visit(): this {
    // Navigate to the page URL using Cypress visit command
    cy.visit(this.url)
    
    // Wait 2 seconds for page to stabilize and avoid timing issues
    cy.wait(2000)
    
    return this // Enable method chaining (e.g., page.visit().clickElement())
  }

  /**
   * Wait for an element to be present in the DOM with configurable timeout
   * @param selector - CSS selector string to locate the element
   * @param timeout - Maximum time to wait in milliseconds (default: 10000ms)
   * @returns Cypress chainable element for further actions/assertions
   */
  waitForElement(selector: string, timeout: number = 10000): Cypress.Chainable<JQuery<HTMLElement>> {
    // Return Cypress element with custom timeout for element availability
    return cy.get(selector, { timeout })
  }

  /**
   * Click on an element after ensuring it's available
   * @param selector - CSS selector string to locate the clickable element
   * @returns this - Returns the current page instance for method chaining
   */
  clickElement(selector: string): this {
    // Wait for element to be available, then perform click action
    this.waitForElement(selector).click()
    
    return this // Enable method chaining
  }

  /**
   * Clear existing text and type new text into an input element
   * @param selector - CSS selector string to locate the input element
   * @param text - Text string to type into the element
   * @returns this - Returns the current page instance for method chaining
   */
  typeText(selector: string, text: string): this {
    // Wait for element, clear any existing content, then type new text
    this.waitForElement(selector).clear().type(text)
    
    return this // Enable method chaining
  }

  /**
   * Verify that an element is visible on the page
   * @param selector - CSS selector string to locate the element
   * @returns this - Returns the current page instance for method chaining
   */
  verifyElementVisible(selector: string): this {
    // Wait for element and assert it's visible to the user
    this.waitForElement(selector).should('be.visible')
    
    return this // Enable method chaining
  }

  /**
   * Verify that an element contains specific text content
   * @param selector - CSS selector string to locate the element
   * @param text - Expected text content that should be present in the element
   * @returns this - Returns the current page instance for method chaining
   */
  verifyElementContainsText(selector: string, text: string): this {
    // Wait for element and assert it contains the expected text
    this.waitForElement(selector).should('contain.text', text)
    
    return this // Enable method chaining
  }
}
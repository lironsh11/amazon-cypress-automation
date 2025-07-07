import { BasePage } from './BasePage'

/**
 * ProductPage - Handles Amazon product detail page interactions
 * Used for product selection, adding to cart, and variant selection
 */
export class ProductPage extends BasePage {
  // Element selectors for product page
  private readonly selectors = {
    addToCartButton: '#add-to-cart-button',        // Main add to cart button
    addedToCartMessage: 'Added to Cart',           // Success confirmation message
    closeModal: '[aria-label="Close"]'             // Modal close button
  }

  /**
   * Add current product to shopping cart
   * Waits for button availability before clicking
   * @returns this - For method chaining
   */
  addToCart(): this {
    // Wait for add to cart button and verify it's visible
    this.waitForElement(this.selectors.addToCartButton, 15000).should('be.visible')
    
    // Click the add to cart button
    this.clickElement(this.selectors.addToCartButton)
    
    // Verify product was successfully added to cart
    cy.contains(this.selectors.addedToCartMessage, { timeout: 10000 }).should('exist')
    
    return this
  }


  /**
   * Select color option using custom selector (generic approach)
   * Allows flexibility for different product color selection methods
   * @param colorSelector - CSS selector for the specific color option
   * @returns this - For method chaining
   */
 selectColorOptionBySelector(colorSelector: string, expectedColorText: string): this {
  this.waitForElement(colorSelector, 10000).should('be.visible').click()
  cy.contains(expectedColorText, { timeout: 10000 }).should('exist')
  return this
}

  /**
   * Close modal dialogs that may appear after adding to cart
   * Handles accessories suggestions, warranty offers, etc.
   * @returns this - For method chaining
   */
  closeModalIfExists(): this {
    // Check if modal exists before attempting to close
    cy.get('body').then(($body) => {
      // Look for specific modal indicator (attach sidesheet)
      if ($body.find('[data-testid="attach-sidesheet-checkout-button"]').length > 0) {
        // Close the modal using close button
        cy.get(this.selectors.closeModal).first().click()
      }
    })
    return this
  }
}
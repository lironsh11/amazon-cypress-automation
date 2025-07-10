import { BasePage } from './BasePage'

/**
 * ProductPage - Handles Amazon product detail page interactions
 * 
 * This class provides methods for:
 * - Product selection and variant configuration
 * - Adding products to shopping cart
 * - Handling Prime-only pricing scenarios
 * - Managing modal dialogs and confirmations
 * 
 * Extends BasePage for common page interaction patterns
 */
export class ProductPage extends BasePage {
  /**
   * Element selectors for product page interactions
   * Organized by functionality for better maintainability
   */
  private readonly selectors = {
    addToCartButton: '#add-to-cart-button',        // Main add to cart button
    productTitle: '#productTitle',                 // Product title - stable loading indicator
    addedToCartMessage: 'Added to Cart',           // Success confirmation message
    closeModal: '[aria-label="Close"]'             // Modal close button
  }

  /**
   * Define the most stable element that indicates product page loaded successfully
   * Uses product title as it's always present and indicates full product data loaded
   * This is more reliable than add-to-cart button which may be conditionally available
   * 
   * @returns string - CSS selector for product title element
   */
  getStableSelector(): string {
    return this.selectors.productTitle
  }

  /**
   * Add current product to shopping cart
   * 
   * Process:
   * 1. Check if product has Prime-only pricing restriction
   * 2. If Prime-only, automatically select Regular Price option
   * 3. Wait for add to cart button to be available
   * 4. Click add to cart button
   * 5. Verify successful addition confirmation
   * 
   * @returns this - For method chaining
   */
  addToCart(): this {
    // Step 1: Check if this product has Prime-only pricing
    this.isPrimeOnlyPrice().then((isPrimeOnly) => {
      if (isPrimeOnly) {
        // Step 2: If Prime-only, select Regular Price option to proceed
        cy.contains('Regular Price')
          .parents('[role="button"]')
          .first()
          .scrollIntoView()
          .should('be.visible')
          .click({ force: true })
      }
    })

    // Step 3: Wait for add to cart button and verify it's visible
    this.waitForElement(this.selectors.addToCartButton, 15000).should('be.visible')
    
    // Step 4: Click the add to cart button
    this.clickElement(this.selectors.addToCartButton)
    
    // Step 5: Verify product was successfully added to cart
    cy.contains(this.selectors.addedToCartMessage, { timeout: 10000 }).should('exist')
    
    return this
  }

  /**
   * Select color option using custom selector (generic approach)
   * 
   * This method provides flexibility for different product color selection methods
   * as Amazon uses various UI patterns for color selection across different products
   * 
   * Process:
   * 1. Wait for color selector element to be available
   * 2. Click the specified color option
   * 3. Verify the expected color text appears (confirmation)
   * 
   * @param colorSelector - CSS selector for the specific color option
   * @param expectedColorText - Text that should appear after color selection
   * @returns this - For method chaining
   */
  selectColorOptionBySelector(colorSelector: string, expectedColorText: string): this {
    // Step 1: Wait for color selector and ensure it's visible
    this.waitForElement(colorSelector, 10000).should('be.visible').click()
    
    // Step 2: Verify the expected color text appears (selection confirmation)
    cy.contains(expectedColorText, { timeout: 10000 }).should('exist')
    
    return this
  }

  /**
   * Checks if the product is restricted to Prime members only
   * 
   * Amazon sometimes offers exclusive deals for Prime members, which can block
   * non-Prime users from purchasing at the displayed price. This method detects
   * such scenarios by checking for specific Prime-only messaging.
   * 
   * @returns Cypress.Chainable<boolean> - True if product is Prime-only
   */
  isPrimeOnlyPrice(): Cypress.Chainable<boolean> {
    return cy.document().then((doc) => {
      // Check entire page content for Prime-only restriction message
      const fullText = doc.body.innerText || ''
      return fullText.includes('This deal is exclusively for Amazon Prime members.')
    })
  }

  /**
   * Select Regular Price option when Prime-only pricing is detected
   * 
   * This method handles the scenario where a product shows Prime-only pricing
   * but also offers a Regular Price option for non-Prime users. It automatically
   * selects the Regular Price to allow the purchase to proceed.
   * 
   * Note: This method is currently unused but kept for potential future use
   */
  selectRegularPriceIfAvailable(): void {
    cy.contains('Regular Price')
      .parents('[role="button"]')
      .first()
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true })
  }

  /**
   * Close modal dialogs that may appear after adding to cart
   * 
   * Amazon often shows modal dialogs after adding items to cart, such as:
   * - Accessory suggestions
   * - Warranty offers
   * - Frequently bought together recommendations
   * 
   * This method detects and closes these modals to allow test flow to continue
   * 
   * @returns this - For method chaining
   */
  closeModalIfExists(): this {
    // Check if modal exists before attempting to close
    cy.get('body').then(($body) => {
      // Look for specific modal indicator (attach sidesheet)
      if ($body.find('[data-testid="attach-sidesheet-checkout-button"]').length > 0) {
        // Close the modal using the close button
        cy.get(this.selectors.closeModal).first().click()
      }
    })
    
    return this
  }
}
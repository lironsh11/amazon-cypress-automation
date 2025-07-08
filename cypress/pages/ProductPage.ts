import { BasePage } from './BasePage'

/**
 * ProductPage - Handles Amazon product detail page interactions
 * 
 * This page object manages all interactions with Amazon's product detail pages including
 * product variant selection, adding items to cart, handling post-purchase modals,
 * and validating product page integrity.
 * 
 * Used for: Product selection, cart operations, color/size variants, modal handling
 */
export class ProductPage extends BasePage {
  // Element selectors for product page interactions
  private readonly selectors = {
    addToCartButton: '#add-to-cart-button',        // Main add to cart button
    addedToCartMessage: 'Added to Cart',           // Success confirmation message text
    closeModal: '[aria-label="Close"]',            // Generic modal close button
    productTitle: '#productTitle',                 // Main product title for validation
    priceSection: '.a-price'                       // Price display section
  }

  /**
   * Define the most stable element that indicates product page loaded successfully
   * Uses add-to-cart button as it's the core functionality and indicates full product data loaded
   * @returns string - CSS selector for add to cart button element
   */
  getStableSelector(): string {
    return this.selectors.addToCartButton
  }

  /**
   * Add current product to shopping cart with comprehensive validation
   * Handles the complete add-to-cart flow including button availability,
   * clicking action, and success confirmation
   * @returns this - For method chaining
   */
  addToCart(): this {
    // Step 1: Wait for add to cart button and verify it's interactive
    // Extended timeout for slow-loading product pages
    this.waitForElement(this.selectors.addToCartButton, 15000).should('be.visible')
    
    // Step 2: Execute the add to cart action
    this.clickElement(this.selectors.addToCartButton)
    
    // Step 3: Verify successful addition with confirmation message
    // Amazon displays "Added to Cart" message on successful addition
    cy.contains(this.selectors.addedToCartMessage, { timeout: 10000 }).should('exist')
    
    return this
  }

  /**
   * Select color option using custom selector (generic approach)
   * Supports multiple product types with different color selection mechanisms
   * @param colorSelector - CSS selector for the specific color option to select
   * @param expectedColorText - Expected text confirmation after color selection
   * @returns this - For method chaining
   */
  selectColorOptionBySelector(colorSelector: string, expectedColorText: string): this {
    // Step 1: Wait for color option element and click it
    // Ensures element is visible and clickable before interaction
    this.waitForElement(colorSelector, 10000).should('be.visible').click()
    
    // Step 2: Verify color selection is reflected in the UI
    // Confirms that the selection was processed and displayed correctly
    cy.contains(expectedColorText, { timeout: 10000 }).should('exist')
    
    return this
  }

  /**
   * Close modal dialogs that may appear after adding products to cart
   * Handles various post-purchase modals including warranty offers,
   * accessory suggestions, and protection plans
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

  /**
   * Verify product information is completely loaded
   * Additional validation for product page completeness
   * @returns this - For method chaining
   */
  validateProductInfo(): this {
    // Verify essential product information is present
    this.verifyElementVisible(this.selectors.productTitle)   // Product name
    this.verifyElementVisible(this.selectors.priceSection)   // Pricing info
    this.verifyElementVisible(this.selectors.addToCartButton) // Purchase functionality
    
    return this
  }

  /**
   * Select product quantity if quantity selector is available
   * Generic method for setting product quantity before adding to cart
   * @param quantity - Number of items to select (1-10 typically)
   * @returns this - For method chaining
   */
  selectQuantity(quantity: number): this {
    // Check if quantity selector exists (not all products have this)
    cy.get('body').then(($body) => {
      if ($body.find('#quantity').length > 0) {
        // Select the specified quantity from dropdown
        cy.get('#quantity').select(quantity.toString())
      }
    })
    return this
  }

  /**
   * Verify specific product title matches expected text
   * Useful for confirming correct product was loaded
   * @param expectedTitle - Expected product title text
   * @returns this - For method chaining
   */
  verifyProductTitle(expectedTitle: string): this {
    // Verify the product title contains expected text
    this.verifyElementContainsText(this.selectors.productTitle, expectedTitle)
    return this
  }
}
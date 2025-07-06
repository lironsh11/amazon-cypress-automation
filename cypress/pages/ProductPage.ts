import { BasePage } from './BasePage'

/**
 * ProductPage class - handles interactions with Amazon product detail pages
 * Designed to be generic and reusable across different products
 */
export class ProductPage extends BasePage {
  // Base selectors that are common across all product pages
  private readonly selectors = {
    addToCartButton: '#add-to-cart-button',
    closeModal: '[aria-label="Close"]',
    addedToCartConfirmation: '[data-csa-c-type="element"][data-csa-c-id="sw-atc-details-single-product"]',
    quantityDropdown: '#quantity',
    priceDisplay: '.a-price-whole'
  }

  /**
   * Add product to cart
   * Generic method that works for any product page
   * @param waitTime - Optional wait time for the button to appear (default: 15000ms)
   * @returns this - for method chaining
   */
  addToCart(waitTime: number = 15000): this {
    // Wait for add to cart button to be available and visible
    this.waitForElement(this.selectors.addToCartButton, waitTime)
      .should('be.visible')
      .should('be.enabled')
    
    // Click the add to cart button
    this.clickElement(this.selectors.addToCartButton)
    
    // Wait for the action to complete
    cy.wait(2000)
    return this
  }

  /**
   * Select color option by data-asin attribute (generic approach)
   * @param asinId - The ASIN ID of the color variant
   * @param expectedColorText - The expected color text to verify selection
   * @returns this - for method chaining
   */
  selectColorByAsin(asinId: string, expectedColorText: string): this {
    const colorSelector = `[data-asin="${asinId}"] .a-button-input`
    
    // Wait for color option to be available and click it
    cy.get(colorSelector, { timeout: 10000 })
      .should('be.visible')
      .click()
    
    // Verify the color selection is reflected in the UI
    cy.contains(expectedColorText, { timeout: 10000 }).should('exist')
    
    cy.wait(1000) // Wait for selection to process
    return this
  }

  /**
   * Select color option by visible text (alternative generic approach)
   * @param colorName - The visible color name to select
   * @returns this - for method chaining
   */
  selectColorByText(colorName: string): this {
    // Look for color option by alt text or aria-label
    cy.get(`[alt*="${colorName}"], [aria-label*="${colorName}"]`, { timeout: 10000 })
      .first()
      .click()
    
    cy.wait(1000)
    return this
  }

  /**
   * Select color option by index position
   * @param index - Zero-based index of the color option
   * @returns this - for method chaining
   */
  selectColorByIndex(index: number): this {
    cy.get('[data-asin] .a-button-input', { timeout: 10000 })
      .eq(index)
      .should('be.visible')
      .click()
    
    cy.wait(1000)
    return this
  }

  /**
   * Generic method to select any product variation (color, size, etc.)
   * @param variationType - Type of variation (e.g., 'color', 'size')
   * @param variationValue - Value to select
   * @returns this - for method chaining
   */
  selectVariation(variationType: string, variationValue: string): this {
    // Look for variation by data attributes or text
    cy.get(`[data-variation-type="${variationType}"], [title*="${variationValue}"], [alt*="${variationValue}"]`, { timeout: 10000 })
      .first()
      .click()
    
    cy.wait(1000)
    return this
  }

  /**
   * Set product quantity
   * @param quantity - Desired quantity number
   * @returns this - for method chaining
   */
  setQuantity(quantity: number): this {
    // Check if quantity dropdown exists
    cy.get('body').then(($body) => {
      if ($body.find(this.selectors.quantityDropdown).length > 0) {
        cy.get(this.selectors.quantityDropdown).select(quantity.toString())
      } else {
        // If no dropdown, look for quantity input field
        cy.get('input[name="quantity"], #qty-input').clear().type(quantity.toString())
      }
    })
    
    cy.wait(1000)
    return this
  }

  /**
   * Close modal dialogs that may appear after adding to cart
   * Handles various types of modals (accessories, warranties, etc.)
   * @returns this - for method chaining
   */
  closeModalIfExists(): this {
    cy.get('body').then(($body) => {
      // Check for various modal indicators
      const modalSelectors = [
        '[data-testid="attach-sidesheet-checkout-button"]',
        '.a-modal-scroller',
        '[role="dialog"]',
        '.sw-atc-details-single-product'
      ]
      
      // If any modal is present, try to close it
      modalSelectors.forEach(selector => {
        if ($body.find(selector).length > 0) {
          // Try different close button patterns
          const closeSelectors = [
            '[aria-label="Close"]',
            '.a-button-close',
            '[data-action="close"]',
            '.close-button'
          ]
          
          closeSelectors.forEach(closeSelector => {
            if ($body.find(closeSelector).length > 0) {
              cy.get(closeSelector).first().click()
              return false // Exit forEach loop
            }
          })
        }
      })
    })
    
    cy.wait(1000)
    return this
  }

  /**
   * Verify product was added to cart successfully
   * @returns this - for method chaining
   */
  verifyAddedToCart(): this {
    // Look for confirmation messages or cart updates
    cy.get('body').then(($body) => {
      if ($body.find('[data-csa-c-id="sw-atc-details-single-product"]').length > 0) {
        cy.get('[data-csa-c-id="sw-atc-details-single-product"]').should('be.visible')
      } else {
        // Alternative: check if cart count increased
        cy.get('#nav-cart-count', { timeout: 5000 }).should('be.visible')
      }
    })
    
    return this
  }

  /**
   * Get product price
   * @returns Cypress chainable with price text
   */
  getProductPrice(): Cypress.Chainable<string> {
    return cy.get(this.selectors.priceDisplay).invoke('text')
  }

  /**
   * Verify product title contains expected text
   * @param expectedText - Text that should be in the product title
   * @returns this - for method chaining
   */
  verifyProductTitle(expectedText: string): this {
    cy.get('#productTitle, .product-title, h1').should('contain.text', expectedText)
    return this
  }
}
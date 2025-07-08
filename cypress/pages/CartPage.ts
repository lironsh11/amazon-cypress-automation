import { BasePage } from './BasePage'

/**
 * CartPage - Page Object Model class for Amazon shopping cart functionality
 * 
 * This class handles all interactions with the Amazon shopping cart page,
 * including item management, quantity changes, and shipping verification.
 * Extends BasePage to inherit common page interaction methods.
 * 
 * URL: /gp/cart/view.html
 */
export class CartPage extends BasePage {
  // Private selectors object - centralized element locators for maintainability
  private readonly selectors = {
   cartContainer: '#sc-active-cart',                              // Main cart container (always present)
    cartItems: '.sc-list-item',                                    // Individual cart item containers
    deleteButton: '[value="Delete"]',                              // Delete item button
    increaseQuantityButton: '[aria-label="Increase quantity by one"] > .a-icon', // Plus button for quantity
    emptyCartMessage: 'Your Amazon Cart is empty',                 // Message when cart is empty
    freeShippingMessage: 'Your order qualifies for FREE Shipping', // Free shipping qualified message
    addMoreForFreeShipping: 'of eligible items to your order for FREE Shipping' // Add more for free shipping message
  }

  /**
   * Constructor - Initialize CartPage with specific cart URL
   * Calls parent constructor with cart page path
   */
  constructor() {
    super('/gp/cart/view.html') // Set the cart page URL in BasePage
  }
   /**
   * Define the most stable element that indicates cart page loaded successfully
   * Uses active cart container as it's always present even with empty cart
   * @returns string - CSS selector for cart container element
   */
  getStableSelector(): string {
    return this.selectors.cartContainer
  }

  /**
   * Verify that the cart contains at least the specified number of items
   * Useful for ensuring setup steps completed successfully before running tests
   * 
   * @param minCount - Minimum number of items expected in cart
   * @returns this - For method chaining
   */
  verifyCartHasItems(minCount: number): this {
    // Wait for cart items to load and verify minimum count
    this.waitForElement(this.selectors.cartItems, 10000)
      .should('have.length.at.least', minCount) // Assert at least minCount items present
    
    return this // Enable method chaining
  }

  /**
   * Recursively clear all items from the shopping cart
   * 
   * This method implements a recursive approach to handle dynamic cart updates:
   * 1. Visit cart page to ensure fresh state
   * 2. Check if delete buttons exist
   * 3. Click first delete button if found
   * 4. Wait for page update
   * 5. Recursively call itself until no more items remain
   * 
   * @returns this - For method chaining
   */
  clearCart(): this {
    // Navigate to cart page to ensure we're on the right page
    this.visit()
    
    // Use jQuery to check DOM state without failing if elements don't exist
    cy.get('body').then(($body) => {
      // Check if any delete buttons are present in the current DOM
      if ($body.find(this.selectors.deleteButton).length > 0) {
        // Delete the first item found
        cy.get(this.selectors.deleteButton).first().click({ force: true })
        
        // Wait for the cart to update after deletion
        cy.wait(1000)
        
        // Recursive call - repeat until no more items to delete
        this.clearCart()
      }
      // If no delete buttons found, cart is empty and recursion stops
    })
    
    return this // Enable method chaining
  }

  /**
   * Verify that the cart is completely empty
   * Checks for the presence of Amazon's empty cart message
   * 
   * @returns this - For method chaining
   */
  verifyCartIsEmpty(): this {
    // Look for Amazon's standard empty cart message with timeout
    cy.contains(this.selectors.emptyCartMessage, { timeout: 10000 }).should('exist')
    
    return this // Enable method chaining
  }

  /**
   * Increase the quantity of a specific product multiple times
   * 
   * This method:
   * 1. Finds the product by name in the cart
   * 2. Locates its parent cart item container
   * 3. Finds the quantity increase button within that container
   * 4. Clicks it the specified number of times
   * 
   * @param productName - Part of the product name to search for (e.g., "Bostitch")
   * @param times - Number of times to increase quantity (number of + button clicks)
   * @returns this - For method chaining
   */
  increaseProductQuantity(productName: string, times: number): this {
    // Find the product by name text content
    cy.contains(productName)
      .parents(this.selectors.cartItems) // Navigate up to the cart item container
      .within(() => {                    // Scope all following commands to this container
        // Loop to click increase button multiple times
        for (let i = 0; i < times; i++) {
          cy.get(this.selectors.increaseQuantityButton).click() // Click the + button
          cy.wait(1000) // Wait for quantity update and price recalculation
        }
      })
    
    return this // Enable method chaining
  }

  /**
   * Verify free shipping status based on cart total and shipping threshold
   * 
   * Generic method that checks for appropriate shipping message:
   * - If shouldQualify = true: Expects "Your order qualifies for FREE Shipping"
   * - If shouldQualify = false: Expects "Add X more for FREE Shipping" message
   * 
   * @param shouldQualify - true if expecting free shipping, false if not qualified
   * @param timeout - Maximum time to wait for message (default: 10000ms)
   * @returns this - For method chaining
   */
  verifyFreeShippingStatus(shouldQualify: boolean, timeout: number = 10000): this {
    if (shouldQualify) {
      // Verify free shipping qualification message appears
      cy.contains(this.selectors.freeShippingMessage, { timeout }).should('exist')
    } else {
      // Verify "add more items" message appears
      cy.contains(this.selectors.addMoreForFreeShipping, { timeout }).should('exist')
    }
    
    return this // Enable method chaining
  }
}
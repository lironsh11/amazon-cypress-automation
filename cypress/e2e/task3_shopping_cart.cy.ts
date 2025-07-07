import { HomePage } from '../pages/HomePage'
import { ProductPage } from '../pages/ProductPage'
import { CartPage } from '../pages/CartPage'

/**
 * Task 3 - Shopping Cart Test Suite
 * 
 * This test suite validates Amazon's shopping cart functionality with focus on:
 * - Multi-product cart management
 * - Free shipping threshold validation
 * - Cart state persistence and cleanup
 * 
 * Test Strategy:
 * - BeforeEach: Setup cart with 2 products (pencil sharpener + scissors)
 * - Test: Verify free shipping qualification by increasing quantity
 * - AfterEach: Clean cart state for test isolation
 */
describe('Task 3 - Shopping Cart Test Suite', () => {
  // Initialize page objects for cart operations
  const homePage = new HomePage()
  const productPage = new ProductPage()
  const cartPage = new CartPage()

  /**
   * Test setup - executed before each test case
   * Creates consistent cart state with two specific products
   */
  beforeEach(() => {
    // Load test data from fixtures for maintainable test configuration
    cy.fixture('testData').then((data) => {
      // Step 1: Navigate to homepage
      homePage.visit()
      
      // Step 2: Search and add pencil sharpener to cart
      homePage.searchForProduct(data.products.pencilSharpener.name)
      
      // Step 3: Set shipping location (required for shipping calculations)
      homePage.setLocationTo(data.shipping.countryCode, data.shipping.location)
      
      // Step 4: Select pencil sharpener product from search results
      cy.get('img[alt*="Bostitch Office Personal Electric Pencil Sharpener"]', { timeout: 15000 })
        .first().click()
      
      // Step 5: Add pencil sharpener to cart with verification
      productPage.addToCart()
      
      // Step 6: Navigate to scissors product page
      cy.visit(data.products.scissors.url)
      
      // Step 7: Select specific color variant for scissors
      productPage.selectColorOptionBySelector(data.products.scissors.colorSelector, data.products.scissors.colorText)
      
      // Step 8: Add scissors to cart and handle any modal popups
      productPage.addToCart()
      productPage.closeModalIfExists()
      
      // Step 9: Verify cart setup is complete with both products
      cartPage.visit()
      cartPage.verifyCartHasItems(2)
    })
  })

  /**
   * Test cleanup - executed after each test case
   * Ensures clean cart state for test isolation
   */
  afterEach(() => {
    // Remove all items from cart using recursive deletion
    cartPage.clearCart()
    
    // Verify cart is completely empty
    cartPage.verifyCartIsEmpty()
  })

  /**
   * Main test case: Free shipping qualification validation
   * 
   * Tests the business logic where increasing cart value qualifies for free shipping.
   * Validates both negative case (no free shipping) and positive case (qualified).
   */
  it('should validate free shipping after increasing quantity', () => {
    // Navigate to cart page for quantity manipulation
    cartPage.visit()
    
    // Step 1: Verify initial state - should NOT qualify for free shipping
    // Cart should show "Add X more for free shipping" message
    cartPage.verifyFreeShippingStatus(false)
    
    // Step 2: Increase pencil sharpener quantity to meet shipping threshold
    // Adds 3 more units (total 4) to increase cart value above $49
    cartPage.increaseProductQuantity('Bostitch', 3)
    
    // Step 3: Verify cart now qualifies for free shipping
    // Should display "Your order qualifies for FREE Shipping" message
    cartPage.verifyFreeShippingStatus(true)
  })
})
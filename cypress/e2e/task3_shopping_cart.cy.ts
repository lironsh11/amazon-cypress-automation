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
      // Hong Kong used to test international shipping thresholds
      homePage.setLocationTo(data.shipping.countryCode, data.shipping.location)
      
      // Step 4: Select pencil sharpener product from search results
      // Uses alt text matching for reliable product identification
      cy.get('img[alt*="Bostitch Office Personal Electric Pencil Sharpener"]', { timeout: 15000 })
        .first().click()
      
      // Step 5: Add pencil sharpener to cart with verification
      // Includes automatic "Added to Cart" confirmation check
      productPage.addToCart()
      
      // Step 6: Navigate to scissors product page
      // Direct URL navigation to specific product variant
      cy.visit(data.products.scissors.url)
      
      // Step 7: Select specific color variant for scissors
      // Uses generic selector method for flexibility across products
      productPage.selectColorOptionBySelector(data.products.scissors.colorSelector, data.products.scissors.colorText)
      
      // Step 8: Add scissors to cart and handle any modal popups
      productPage.addToCart()
      productPage.closeModalIfExists() // Handles warranty/accessory suggestions
      
      // Step 9: Verify cart setup is complete with both products
      // Essential validation before test execution
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
    // Handles dynamic cart updates and multiple items
    cartPage.clearCart()
    
    // Verify cart is completely empty
    // Ensures clean state for subsequent test runs
    cartPage.verifyCartIsEmpty()
  })

  /**
   * Test Case 1: Validate initial cart state does NOT qualify for free shipping
   * 
   * Verifies that with base quantities (1 pencil sharpener + 1 scissors),
   * the cart total is below the free shipping threshold (~$49 USD)
   */
  it('should NOT qualify for free shipping with initial cart state', () => {
    // Navigate to cart to check current state
    cartPage.visit()
    
    // Verify "Add X more for free shipping" message appears
    cartPage.verifyFreeShippingStatus(false)
  })

  /**
   * Test Case 2: Validate free shipping qualification after quantity increase
   * 
   * Tests the core business logic: increasing pencil sharpener quantity
   * from 1 to 4 units should push cart total above free shipping threshold.
   * This validates Amazon's dynamic shipping calculation logic.
   */
  it('should qualify for free shipping after increasing pencil sharpener quantity', () => {
    // Navigate to cart for quantity manipulation
    cartPage.visit()
    
    // Increase pencil sharpener quantity by 3 (total becomes 4 units)
    // Target: Push cart total above $49 threshold for free shipping
    cartPage.increaseProductQuantity('Bostitch', 3)
    
    // Verify "Your order qualifies for FREE Shipping" message appears
    // Validates successful threshold crossing and UI update
    cartPage.verifyFreeShippingStatus(true)
  })
})
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
  cy.fixture('testData').then((data) => {
    homePage.visit();
    homePage.searchForProduct(data.products.pencilSharpener.name);
    homePage.setLocationTo(data.shipping.countryCode, data.shipping.location);

    cy.get('img[alt*="Bostitch Office Personal Electric Pencil Sharpener"]', { timeout: 15000 })
      .first()
      .click();

    // Step 5: Add pencil sharpener to cart, unless it's Prime-only
    productPage.isPrimeOnlyProduct().then((isPrimeOnly) => {
  if (isPrimeOnly) {
    throw new Error('❌ Scissors are Prime-only. Test cannot continue.');
  }

      productPage.addToCart();

      // Step 6: Navigate to scissors product
      cy.visit(data.products.scissors.url);

      // Step 7: Select color option
      productPage.selectColorOptionBySelector(
        data.products.scissors.colorSelector,
        data.products.scissors.colorText
      );

      // Step 8: Check if scissors are Prime-only
    productPage.isPrimeOnlyProduct().then((isPrimeOnly2) => {
  if (isPrimeOnly2) {
    throw new Error('❌ Scissors are Prime-only. Test cannot continue.');
  }

        // Step 9: Add scissors and validate cart
        productPage.addToCart();
        productPage.closeModalIfExists();
        cartPage.visit();
        cartPage.verifyCartHasItems(2);
      });
    });
  });
});

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
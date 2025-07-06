import { HomePage } from '../pages/HomePage'
import { ProductPage } from '../pages/ProductPage'
import { CartPage } from '../pages/CartPage'

describe('Task 3 - Shopping Cart Test Suite', () => {
  const homePage = new HomePage()
  const productPage = new ProductPage()
  const cartPage = new CartPage()

  beforeEach(() => {
    // Setup: Add two products to cart
    cy.fixture('testData').then((data) => {
      homePage.visit()
      
      // Search and add pencil sharpener
      homePage.searchForProduct(data.products.pencilSharpener.name)
      homePage.setLocationToHongKong()
      
      cy.get('img[alt*="Bostitch Office Personal Electric Pencil Sharpener"]', { timeout: 15000 })
        .first().click()
      
      productPage.addToCart()
      
      // Add scissors
      cy.visit(data.products.scissors.url)
    productPage.selectColorByAsin('B08T1GMKVF', 'Color: Red, Black, Blue')
      productPage.addToCart()
      productPage.closeModalIfExists()
      
      // Verify both products in cart
      cartPage.visit()
      cartPage.verifyCartHasItems(2)
    })
  })

  afterEach(() => {
    // Cleanup: Clear cart
    cartPage.clearCart()
    cartPage.verifyCartIsEmpty()
  })

  it('should validate free shipping after increasing quantity', () => {
    cartPage.visit()
    
    // Verify initially no free shipping
    cartPage.verifyFreeShippingNotQualified()
    
    // Increase sharpener quantity 3 times
    cartPage.increaseProductQuantity('Bostitch', 3)
    
    // Verify free shipping qualified
    cartPage.verifyFreeShippingQualified()
  })
})
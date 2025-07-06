import { BasePage } from './BasePage'

export class CartPage extends BasePage {
  private readonly selectors = {
    cartItems: '.sc-list-item',
    deleteButton: '[value="Delete"]',
    increaseQuantityButton: '[aria-label="Increase quantity by one"] > .a-icon',
    emptyCartMessage: 'Your Amazon Cart is empty',
    freeShippingMessage: 'Your order qualifies for FREE Shipping',
    addMoreForFreeShipping: 'of eligible items to your order for FREE Shipping'
  }

  constructor() {
    super('/gp/cart/view.html')
  }

  verifyCartHasItems(minCount: number): this {
    this.waitForElement(this.selectors.cartItems, 10000)
      .should('have.length.at.least', minCount)
    return this
  }

  clearCart(): this {
    this.visit()
    cy.get('body').then(($body) => {
      if ($body.find(this.selectors.deleteButton).length > 0) {
        cy.get(this.selectors.deleteButton).first().click({ force: true })
        cy.wait(1000)
        this.clearCart()
      }
    })
    return this
  }

  verifyCartIsEmpty(): this {
    cy.contains(this.selectors.emptyCartMessage, { timeout: 10000 }).should('exist')
    return this
  }

  increaseProductQuantity(productName: string, times: number): this {
    cy.contains(productName)
      .parents(this.selectors.cartItems)
      .within(() => {
        for (let i = 0; i < times; i++) {
          cy.get(this.selectors.increaseQuantityButton).click()
          cy.wait(1000)
        }
      })
    return this
  }

 verifyFreeShippingStatus(shouldQualify: boolean, timeout: number = 10000): this {
  if (shouldQualify) {
    cy.contains(this.selectors.freeShippingMessage, { timeout }).should('exist')
  } else {
    cy.contains(this.selectors.addMoreForFreeShipping, { timeout }).should('exist')
  }
  return this
}
}
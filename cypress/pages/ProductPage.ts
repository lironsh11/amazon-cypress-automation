import { BasePage } from './BasePage'

export class ProductPage extends BasePage {
  private readonly selectors = {
    addToCartButton: '#add-to-cart-button',
    colorText: 'Color: Red, Black, Blue',
    closeModal: '[aria-label="Close"]'
  }

  addToCart(): this {
    this.waitForElement(this.selectors.addToCartButton, 15000).should('be.visible')
    this.clickElement(this.selectors.addToCartButton)
    return this
  }

selectColorOptionBySelector(colorSelector: string): this {
    this.waitForElement(colorSelector, 10000).should('be.visible').click()
    cy.contains(this.selectors.colorText, { timeout: 10000 }).should('exist')
    return this
}

  closeModalIfExists(): this {
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="attach-sidesheet-checkout-button"]').length > 0) {
        cy.get(this.selectors.closeModal).first().click()
      }
    })
    return this
  }
}
export class CartHelper {
  static clearCart(): void {
    cy.visit('/gp/cart/view.html')
    cy.get('body').then(($body) => {
      if ($body.find('[value="Delete"]').length > 0) {
        cy.get('[value="Delete"]').first().click({ force: true })
        cy.wait(1000)
        CartHelper.clearCart()
      }
    })
  }
}
export abstract class BasePage {
  protected readonly url: string

  constructor(url: string = '/') {
    this.url = url
  }

  visit(): this {
    cy.visit(this.url)
    cy.wait(2000)
    return this
  }

  waitForElement(selector: string, timeout: number = 10000): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(selector, { timeout })
  }

  clickElement(selector: string): this {
    this.waitForElement(selector).click()
    return this
  }

  typeText(selector: string, text: string): this {
    this.waitForElement(selector).clear().type(text)
    return this
  }

  verifyElementVisible(selector: string): this {
    this.waitForElement(selector).should('be.visible')
    return this
  }

  verifyElementContainsText(selector: string, text: string): this {
    this.waitForElement(selector).should('contain.text', text)
    return this
  }
}
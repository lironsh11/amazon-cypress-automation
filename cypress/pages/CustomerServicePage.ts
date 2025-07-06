import { BasePage } from './BasePage'

export class CustomerServicePage extends BasePage {
  private readonly selectors = {
    searchInput: 'input[type="search"]',
    helpArticleTitle: "Where's My Stuff?"
  }

  constructor() {
    super('/gp/help/customer/display.html')
  }

  searchForHelp(query: string): this {
    this.typeText(this.selectors.searchInput, `${query}{enter}`)
    return this
  }

  verifyHelpArticleDisplayed(): this {
    cy.contains(this.selectors.helpArticleTitle).should('be.visible')
    return this
  }
}
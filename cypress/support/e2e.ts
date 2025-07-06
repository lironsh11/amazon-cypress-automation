import './commands'


Cypress.on('uncaught:exception', (err, runnable) => {
  if (
    err.message.includes('cardModuleFactory') ||
    err.message.includes('is not a function') ||
    err.message.includes('Cannot read property') ||
    err.message.includes('script error')
  ) {
    return false
  }
  return true
})


beforeEach(() => {
  cy.wait(2000)
  cy.dismissContinueShoppingModal()
})
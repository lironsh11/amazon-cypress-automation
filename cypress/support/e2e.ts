import './commands'

// הוסף beforeEach גלובלי שירוץ לפני כל טסט
beforeEach(() => {
  // וודא שהעמוד נטען לפני שמנסים לחפש את המודל
  cy.wait(2000)
  cy.dismissContinueShoppingModal()
})

// טיפול בשגיאות JavaScript
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
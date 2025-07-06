import { HomePage } from '../pages/HomePage'
import { CustomerServicePage } from '../pages/CustomerServicePage'

describe('Task 2 - Customer Service Help Search', () => {
  const homePage = new HomePage()
  const customerServicePage = new CustomerServicePage()

  it('should search and open the "Where is my stuff" help article', () => {
    homePage.visit()
    homePage.goToCustomerService()
    customerServicePage.searchForHelp('where is my stuff')
    customerServicePage.verifyHelpArticleDisplayed()
  })
})
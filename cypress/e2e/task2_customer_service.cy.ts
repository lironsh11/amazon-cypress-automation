import { HomePage } from '../pages/HomePage'
import { CustomerServicePage } from '../pages/CustomerServicePage'

/**
 * Task 2 - Customer Service Help Search Test Suite
 * 
 * This test validates Amazon's customer service help search functionality.
 * Specifically tests the ability to search for and locate the "Where's My Stuff?" help article.
 * 
 * Test Flow:
 * 1. Navigate to Amazon homepage
 * 2. Access Customer Service section
 * 3. Search for help article
 * 4. Verify correct article is displayed
 */
describe('Task 2 - Customer Service Help Search', () => {
  // Initialize page objects for test interactions
  const homePage = new HomePage()
  const customerServicePage = new CustomerServicePage()

  /**
   * Main test case for customer service help search functionality
   * 
   * Requirements tested:
   * - Navigation to customer service page works
   * - Help search functionality is operational
   * - Specific help article can be found and displayed
   * - "Where's My Stuff?" article is accessible to users
   */
  it('should search and open the "Where is my stuff" help article', () => {
    // Step 1: Navigate to Amazon homepage
    homePage.visit()
    
    // Step 2: Navigate to Customer Service page
    // Uses enhanced navigation with hover handling for menu stability
    homePage.goToCustomerService()
    
    // Step 3: Search for the specific help article
    // Searches for "where is my stuff" and submits with Enter key
    customerServicePage.searchForHelp('where is my stuff')
    
    // Step 4: Verify the correct help article is displayed
    // Confirms "Where's My Stuff?" article title is visible on page
    customerServicePage.verifyHelpArticleDisplayed()
  })
})
# Task 1 - Amazon Website Test Planning

## Website Exploration Summary
After exploring Amazon.com, I identified the core functionality and user flows that require testing coverage.

## Initial Health Check (Precondition Test)

### 0. **Site Availability and Homepage Health**
- Test Title: "Verify Amazon.com is up and homepage loads correctly"
- Priority: Critical
- Covers: General availability, homepage structure

## 5 Most Important Test Scenarios

### 1. **User Authentication and Account Management**
- Test Title: "Verify user login, registration, and account management functionality"
- Priority: Critical
- Covers: Login/logout, password reset, account creation, profile management

### 2. **Product Search and Discovery**
- Test Title: "Validate product search functionality and filtering capabilities"
- Priority: Critical
- Covers: Search functionality, filters, sorting, product recommendations

### 3. **Shopping Cart and Checkout Process**
- Test Title: "End-to-end shopping cart and purchase flow validation"
- Priority: Critical
- Covers: Add to cart, cart management, checkout process, payment integration

### 4. **Product Page Information and Reviews**
- Test Title: "Verify product details, images, reviews, and recommendations display"
- Priority: High
- Covers: Product information accuracy, image gallery, customer reviews, related products

### 5. **Navigation and Customer Service Features**
- Test Title: "Validate main navigation, help center, and customer service accessibility"
- Priority: High
- Covers: Menu navigation, help search, customer service tools, accessibility features

---

## Detailed Test Case: Shopping Cart and Checkout Process

### Test Case ID: TC_001
### Test Title: End-to-end shopping cart and purchase flow validation

**Objective:** 
Verify that users can successfully add products to cart, manage cart contents, and complete the checkout process.

**Preconditions:**
- User has access to Amazon.com
- User has a valid Amazon account (or can create one)
- Test products are available for purchase
- Valid payment method is available for testing

**Test Steps:**



1. **Navigate to Amazon Homepage**
   - Action: Open browser and go to https://amazon.com
   - Expected Result: Amazon homepage loads successfully with all main elements visible

2. **Search for Product**
   - Action: Enter "wireless headphones" in search box and press Enter
   - Expected Result: Search results page displays relevant wireless headphone products

3. **Select Product**
   - Action: Click on the first product in search results
   - Expected Result: Product detail page opens with complete product information

4. **Add Product to Cart**
   - Action: Click "Add to Cart" button
   - Expected Result: Product is added to cart, cart icon updates quantity, confirmation message appears

5. **View Cart**
   - Action: Click on cart icon in navigation
   - Expected Result: Cart page displays with added product, correct price, and quantity controls

6. **Modify Cart Quantity**
   - Action: Change quantity from 1 to 2 using quantity dropdown
   - Expected Result: Quantity updates, total price recalculates correctly

7. **Add Second Product**
   - Action: Search for "phone case", select a product, and add to cart
   - Expected Result: Cart now contains 2 different products with correct quantities and pricing

8. **Remove Product**
   - Action: Click "Delete" button for one of the products
   - Expected Result: Product is removed from cart, total recalculates correctly

9. **Proceed to Checkout**
   - Action: Click "Proceed to checkout" button
   - Expected Result: User is directed to login/shipping information page

10. **Enter Shipping Information**
    - Action: Fill in valid shipping address details
    - Expected Result: Address is accepted, shipping options are displayed

11. **Select Shipping Method**
    - Action: Choose standard shipping option
    - Expected Result: Shipping method is selected, delivery date is shown

12. **Enter Payment Information**
    - Action: Add valid payment method details
    - Expected Result: Payment method is accepted and validated

13. **Review Order**
    - Action: Review order summary page
    - Expected Result: All product details, quantities, prices, shipping, and total are correct

14. **Place Order (if using test environment)**
    - Action: Click "Place your order" button
    - Expected Result: Order confirmation page appears with order number

**Expected Results:**
- All cart operations work smoothly without errors
- Price calculations are accurate throughout the process
- User can successfully navigate through the entire checkout flow
- Appropriate confirmation messages appear at each step
- Order summary accurately reflects all selections

**Pass Criteria:**
- User can complete entire flow without encountering blocking errors
- All calculations are mathematically correct
- Page load times are acceptable (under 3 seconds per page)
- All required form validations work properly

**Fail Criteria:**
- Any step results in an error that prevents progression
- Incorrect price calculations at any point
- Missing or broken functionality in cart or checkout
- Page fails to load or crashes during the process

**Test Data Required:**
- Valid test account credentials
- Test shipping addresses
- Test payment information (if available)
- Product names/IDs for consistent testing

**Environment:**
- Browser: Chrome (latest version)
- Operating System: Windows 10/11
- Screen Resolution: 1920x1080
- Internet Connection: Stable broadband

**Notes:**
- This test should be executed in a test environment to avoid actual purchases
- Screenshots should be captured at each major step for documentation
- Test should be repeated across different browsers for compatibility
- Consider testing with both guest checkout and logged-in user scenarios
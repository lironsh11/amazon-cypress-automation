# Amazon Cypress Automation Project

## 📋 Project Overview

This project contains automated test suites for Amazon.com using Cypress with TypeScript and Page Object Model (POM) design pattern. The project was created as part of a QA automation assessment covering three main tasks: test planning, customer service functionality, and shopping cart operations.

## 🏗️ Project Structure

```
amazon-cypress-automation/
├── cypress/
│   ├── e2e/                          # Test files
│   │   ├── task2_customer_service.cy.ts # Customer service help search
│   │   └── task3_shopping_cart.cy.ts # Shopping cart test suite
│   ├── pages/                        # Page Object Model classes
│   │   ├── BasePage.ts               # Base class with common functionality
│   │   ├── HomePage.ts               # Amazon homepage interactions
│   │   ├── CustomerServicePage.ts    # Customer service page methods
│   │   ├── ProductPage.ts            # Product detail page operations
│   │   └── CartPage.ts               # Shopping cart functionality
│   ├── support/                      # Cypress configuration and commands
│   │   ├── commands.ts               # Custom Cypress commands
│   │   ├── e2e.ts                    # Global test configuration
│   │   └── helpers/                  # Helper utilities
│   │       └── CartHelper.ts         # Cart management utilities
│   └── fixtures/                     # Test data
│       └── testData.json             # Product and configuration data
├── docs/                             # Documentation
│   └── Task1_Test_Planning.md        # Task 1: Test planning and exploration
├── cypress.config.ts                 # Cypress configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Project dependencies and scripts
├── package-lock.json                 # Locked dependency versions
└── README.md                         # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Chrome browser (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd amazon-cypress-automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Open Cypress Test Runner**
   ```bash
   npm run cy:open
   ```

4. **Run tests in headless mode**
   ```bash
   npm run cy:run
   ```

## 📝 Available Scripts

```bash
# Interactive test runner
npm run cy:open

# Run all tests in headless mode
npm run cy:run

# Run specific task tests
npm run cy:run:task2          # Customer service tests
npm run cy:run:task3          # Shopping cart tests

# Run tests in Chrome browser
npm run cy:run:chrome
```

## 🎯 Test Tasks Overview

### Task 1: Test Planning (Documentation Only)
- **Location**: `docs/Task1_Test_Planning.md`
- **Description**: Comprehensive test planning document containing:
  - 5 most critical test scenarios for Amazon
  - Detailed test case for end-to-end shopping cart flow
  - Test preconditions, steps, and expected results

### Task 2: Customer Service Help Search
- **File**: `cypress/e2e/task2_customer_service.cy.ts`
- **Description**: Automated test for customer service help functionality
- **Test Flow**:
  1. Navigate to Amazon homepage
  2. Access Customer Service page
  3. Search for "where is my stuff"
  4. Verify "Where's My Stuff?" help article is displayed

### Task 3: Shopping Cart Operations
- **File**: `cypress/e2e/task3_shopping_cart.cy.ts`
- **Description**: Complex shopping cart test suite with setup and teardown
- **Test Flow**:
  - **Setup**: Add two products (pencil sharpener + scissors) to cart
  - **Test**: Increase quantity to qualify for free shipping
  - **Teardown**: Clear cart completely
- **Key Features**:
  - Location set to Hong Kong for shipping
  - Product color selection (Red, Black, Blue scissors)
  - Free shipping threshold validation

## 🏛️ Architecture & Design Patterns

### Page Object Model (POM)
- **BasePage**: Abstract base class with common functionality
- **HomePage**: Amazon homepage interactions (search, navigation, location)
- **CustomerServicePage**: Help search and article verification
- **ProductPage**: Product selection, add to cart, color options
- **CartPage**: Cart management, quantity changes, shipping verification

### Custom Commands
Located in `cypress/support/commands.ts`:
- `dismissContinueShoppingModal()` - Handle shopping modal popups
- `clearCart()` - Recursive cart cleanup
- `setLocationToHongKong()` - Location configuration
- `waitForPageLoad()` - Page stability verification

### Test Data Management
- Centralized test data in `cypress/fixtures/testData.json`
- Product information, search terms, and configuration
- Shipping thresholds and location settings

## 🛠️ Technical Features

### Error Handling
- Automatic handling of Amazon's internal JavaScript errors
- Modal dismissal for seamless test execution
- Robust element waiting and stability checks

### Cross-Browser Support
- Configured for Chrome, Firefox, and Edge
- Responsive design testing capabilities

### Reporting
- Screenshot capture on test failures
- Video recording of test execution
- Detailed test reports with timestamps

## 🎯 Key Test Scenarios

### Automated Tests
1. **Customer Service Navigation**: Verify help search functionality
2. **Shopping Cart Management**: Multi-product cart operations
3. **Free Shipping Validation**: Threshold-based shipping qualification
4. **Product Selection**: Color variant selection and verification
5. **Location Setting**: Delivery location configuration

### Manual Test Planning (Task 1)
1. User Authentication & Account Management
2. Product Search & Discovery
3. Shopping Cart & Checkout Process
4. Product Information & Reviews
5. Navigation & Customer Service

## 🔧 Configuration

### Cypress Configuration (`cypress.config.ts`)
- Base URL: `https://amazon.com`
- Viewport: 1920x1080
- Timeouts: 15s default, 30s page load
- Retries: 2 attempts in CI mode
- Video and screenshot capture enabled

### TypeScript Configuration
- ES2018 target with DOM libraries
- Strict mode disabled for compatibility
- Cypress types included

## 🧪 Test Execution Strategy

### BeforeEach Setup (Task 3)
1. Navigate to Amazon homepage
2. Dismiss any modal dialogs
3. Search and add pencil sharpener to cart
4. Set delivery location to Hong Kong
5. Navigate to scissors product page
6. Select color variant (Red, Black, Blue)
7. Add scissors to cart
8. Verify both products in cart

### AfterEach Cleanup (Task 3)
1. Recursively clear all cart items
2. Verify cart is completely empty
3. Ensure clean state for next test


## 🔍 Troubleshooting

### Common Issues

1. **Page Jumping/Instability**
   - Solution: Added wait times and stability checks
   - Modal dismissal on page load

2. **Element Selection Failures**
   - Solution: Multiple selector strategies
   - Force click options for stubborn elements

3. **Cart State Persistence**
   - Solution: Comprehensive cleanup in afterEach
   - Recursive deletion of cart items

### Debug Mode
```bash
# Run with debug output
npm run cy:open --env debug=true

# Run specific test with additional logging
npx cypress run --spec "cypress/e2e/task3_shopping_cart.cy.ts" --headed
```

## 📚 Documentation

- **Test Planning**: `docs/Task1_Test_Planning.md`
- **API Documentation**: Inline code comments
- **Architecture Decisions**: Documented in Page Object classes


## 📄 License

This project is created for educational and assessment purposes.

---

**Created by**: Liron Shiryon
**Date**: 7/6/25
**Purpose**: QA Automation Interview Assessment
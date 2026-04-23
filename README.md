# Playwright E-commerce Test Suite

A comprehensive Playwright-based end-to-end testing framework for e-commerce web applications. This project demonstrates automated testing using the Page Object Model pattern with tests for login, inventory management, and shopping cart functionality.

## Overview

This test suite automates user workflows for the Sauce Demo e-commerce platform, validating critical features including authentication, product browsing, and cart management across multiple browsers.

## Technologies

- **Playwright** (v1.57.0) - Cross-browser automation framework
- **Node.js** - JavaScript runtime

## Project Structure

```
playwright-ecommerce/
├── pages/                    # Page Object Model classes
│   ├── LoginPage.js         # Login page interactions
│   ├── InventoryPage.js     # Product inventory page interactions
│   └── CartPage.js          # Shopping cart page interactions
├── tests/
│   └── features/            # Feature-based test organization
│       ├── login/           # Login feature tests
│       ├── inventory/       # Inventory feature tests
│       └── cart/            # Cart feature tests
├── data/                    # Test data files
│   ├── loginData.json       # Login test scenarios
│   └── sortOptions.json     # Inventory sorting options
├── fixtures/                # Playwright fixtures (if any)
├── playwright.config.js     # Playwright configuration
└── package.json             # Project dependencies
```

## Features

### ✅ Login Testing
- Valid user login
- Invalid username/password scenarios
- Empty field validation
- Error message verification
- Password field masking

### ✅ Inventory Management
- Product browsing and filtering
- Product sorting capabilities
- Product details viewing

### ✅ Shopping Cart
- Add items to cart
- View cart contents
- Checkout process

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd playwright-ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (if needed):
```bash
cp .env.example .env
```

## Running Tests

### Run all tests across all browsers:
```bash
npx playwright test
```

### Run tests in a specific browser:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run a specific test file:
```bash
npx playwright test tests/features/login/login.spec.js
```

### Run tests in headed mode (see browser):
```bash
npx playwright test --headed
```

### Run tests in debug mode:
```bash
npx playwright test --debug
```

### View HTML test report:
```bash
npx playwright show-report
```

## Test Configuration

The `playwright.config.js` file contains:

- **Parallel execution**: Tests run in parallel by default
- **CI/CD integration**: Single worker on CI with 2 retries
- **HTML reporting**: Detailed test reports with screenshots
- **Trace collection**: Traces collected on first retry for debugging
- **Multi-browser support**: Tests run on Chromium, Firefox, and WebKit

## Test Data

Test scenarios are externalized in JSON files under `/data` for easy maintenance:

- **loginData.json**: Contains 6 login test scenarios covering success and various failure cases
- **sortOptions.json**: Contains product sorting options

## Page Object Model

The project uses the Page Object Model (POM) pattern for maintainability:

```javascript
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

## CI/CD Integration

The project includes Jenkins integration via the `jenkinsfile` for continuous testing. Tests run with:
- Single worker to avoid parallel issues
- 2 retries for flaky test handling
- HTML reports for detailed analysis

## Troubleshooting

### Tests timing out
- Increase timeout in `playwright.config.js` if testing slow networks
- Check if the target application is available

### Browser installation issues
```bash
npx playwright install
npx playwright install-deps
```

### Clear cache and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

## Contributing

1. Follow the existing Page Object Model pattern
2. Use descriptive test names
3. Externalize test data to JSON files
4. Add tests to the appropriate feature folder

## License

ISC

## Support

For issues or questions, please refer to the Playwright documentation: https://playwright.dev/

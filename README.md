# Swag Labs E2E Automation Suite 🚀

Professional test automation framework for SauceDemo (https://www.saucedemo.com/) built with Playwright, TypeScript, and Page Object Model (POM).

---

## 🛠️ Prerequisites & Installation

Before running the tests, ensure you have the following installed:

### 1. Node.js (Version 18 or higher)
Download it from nodejs.org. Verify your version with:
node -v

### 2. Project Setup
Clone the repository and install the required packages:
git clone https://github.com/jvergara9208/SauceLabProjectPW.git
cd SauceLabProjectPW
npm install

### 3. Playwright Browsers
Install the necessary browser binaries and system dependencies:
npx playwright install --with-deps

### 4. Optional: Codex CI (Terminal AI Assistant)
To install the AI assistant for terminal assistance:
npm install -g codex-ci

---

## 📂 Project Structure
Project Structure:
------------------
data/
  testData.ts             (Centralized test data)

fixtures/
  basePage.ts             (Dependency injection for POM)

pages/                    (Page Object Model classes)
  LoginPage.ts
  InventoryPage.ts
  ProductDetailsPage.ts
  CartPage.ts
  CheckoutPage.ts
  OverviewPage.ts
  CheckoutCompletePage.ts

playwright/
  .auth/
    user.json             (Session storage / cookies)

tests/
  auth.setup.ts           (Global authentication setup)
  auth.spec.ts
  inventory.spec.ts
  checkout.spec.ts

utils/
  helpers.ts              (Utility functions)

playwright.config.ts      (Main configuration)
llm-prompts.md            (AI Prompt Engineering log)
README.md                 (Project documentation)

---

## 🏃 Execution Guide (CLI Reference)

### 1. Base Execution
* Run all tests (Headless): npm run test
* Run on Chromium: npm run test -- --project=chromium
* Run on Firefox: npm run test -- --project=firefox
* Headed Mode: npm run test -- --headed
* UI Mode (Visual): npm run test -- --ui
* Debug Mode: npm run test -- --debug

### 2. Execution by File (Specs)
* Auth tests: npm run test -- tests/auth.spec.ts
* Inventory tests: npm run test -- tests/inventory.spec.ts
* Checkout tests: npm run test -- tests/checkout.spec.ts

### 3. Advanced Filtering
* By test name: npm run test -- -g "Login success"
* By Tag (@smoke): npm run test -- -g "@smoke"
* By Tag (@regression): npm run test -- -g "@regression"

### 4. Parallelism & Retries
* Specific workers: npm run test -- --workers=1
* Retries on failure: npm run test -- --retries=1
* Full Parallel: npm run test -- --fully-parallel

---

## 📊 Reporting

### Playwright HTML Report
* Generate & Open: npm run test:report
* Show manually: npx playwright show-report playwright-report

### Allure Report (Advanced)
* Run all and serve: npm run test:allure
* Generate static report: npm run allure:generate
* Open Allure server: npm run allure:serve

---

## 🏗️ Design Decisions

* POM & Fixtures: I implemented a basePage fixture to handle Page Object instantiation automatically. This keeps the test files clean, readable, and strictly focused on assertions.
* Test Isolation: Each test case operates in a fresh browser context via beforeEach hooks to prevent state leakage and ensure independent results.
* Storage State: Global authentication is handled in auth.setup.ts, saving session data to playwright/.auth/user.json. This avoids redundant login steps, significantly reducing execution time.
* Note on CI/CD: While the project includes configuration files, the core focus was placed on local execution stability, POM robustness, and detailed reporting (HTML/Allure).

---

## 🤖 Terminal AI Integration (Optional)

* Codex CI: npm install -g codex-ci
* Example: Type 'codex "How to run playwright in parallel?"' in your terminal.

---

## 📊 Interaction Log
Detailed Prompt Engineering strategy used for this project:
See llm-prompts.md
I use https://www.rich-text-to-markdown.com/ to create this markdown

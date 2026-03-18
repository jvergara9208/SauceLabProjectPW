Swag Labs E2E Automation Suite 🚀
=================================

Test automation framework for [SauceDemo](https://www.google.com/search?q=https://www.saucedemo.com/) built with **Playwright**, **TypeScript**, and **Page Object Model (POM)**.

🛠️ Prerequisites
-----------------

*   **Node.js:** v18.x or higher.
    
*   **Package Manager:** npm (included with Node.js).
    
*   **AI Tools (Optional):** Codex CI or GitHub Copilot CLI for terminal assistance.
    


🚀 Installation & Setup
-----------------------

1.  **Clone the repository:**git clone cd saucelabprojectpw
    
2.  **Install dependencies:**npm install
    
3.  **Install Playwright Browsers:**npx playwright install --with-deps
    

🏃 Execution Guide (CLI Reference)
----------------------------------

### 1\. Base Execution

*   **Run all tests:** npm run test
    
*   **Run on Chromium:** npm run test -- --project=chromium
    
*   **Headed Mode:** npm run test -- --headed
    
*   **UI Mode (Visual):** npm run test -- --ui
    
*   **Debug Mode:** npm run test -- --debug
    

### 2\. Execution by File (Specs)

*   **Auth:** npm run test -- tests/auth.spec.ts
    
*   **Inventory:** npm run test -- tests/inventory.spec.ts
    
*   **Checkout:** npm run test -- tests/checkout.spec.ts
    

### 3\. Advanced Filtering

*   **By test name:** npm run test -- -g "Login success"
    
*   **By Tag:** npm run test -- -g "@smoke"
    
*   **Parallelism:** npm run test -- --workers=1
    

📊 Reporting
------------

### Playwright HTML Report

*   **Generate & Open:** npm run test:report
    
*   **Show manually:** npx playwright show-report playwright-report
    

### Allure Report (Advanced)

*   **Run all and serve:** npm run test:allure
    
*   **Open Allure server:** npm run allure:serve
    

🏗️ Design Decisions
--------------------

*   **POM & Fixtures:** I implemented a basePage fixture to handle Page Object instantiation. This keeps the tests clean and focused on assertions.
    
*   **Test Isolation:** Each test operates in a fresh context. We use auth.setup.ts to save the session state in playwright/.auth/user.json, significantly reducing execution time by reusing the login session.
    
*   **Robust Locators:** Prioritized data-test attributes to ensure tests are resilient to UI changes.
    
*   **CI/CD Ready:** Includes configurations for both GitHub Actions and GitLab CI, ensuring the suite can run in any pipeline.
    

🤖 Terminal AI Integration (Optional)
-------------------------------------

*   **Codex CI:** npm install -g codex-ci
    
*   **Copilot CLI:** gh extension install github/gh-copilot
    
*   **Example:** gh copilot suggest "How to run playwright in parallel?"
    

📊 Interaction Log
------------------

Detailed Prompt Engineering strategy:👉 [**llm-prompts.md**](https://www.google.com/search?q=./llm-prompts.md)

I use https://www.rich-text-to-markdown.com/ to create this markdown

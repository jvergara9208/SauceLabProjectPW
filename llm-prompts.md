# `llm-prompts.md` - AI-Assisted Development Strategy

This document outlines the **Prompt Engineering** strategy used to accelerate the development of this automation framework while ensuring a Senior-level architecture that follows best practices in scalability, maintainability, and reliability.

---

## 1. Interaction Strategy
Instead of requesting generic code snippets, a **Context-First Prompting** approach was applied. The process was divided into three strategic phases to ensure the AI understood the architectural constraints before generating logic.

### Phase A: Architectural Baseline & Standards
The AI was provided with the specific technical stack (Playwright + TypeScript + POM) and strict design patterns to follow:
* **Test Isolation:** Mandatory use of `beforeEach` hooks for independent test execution.
* **Robust Locators:** Strict adherence to `data-test` attributes to minimize flakiness.
* **Strong Typing:** Pre-defining TypeScript interfaces in `testData.ts` to enforce data contract consistency.

### Phase B: Page Object Model (POM) Generation
Specific prompts were crafted for each page, focusing on **dynamic element abstraction**. For the `InventoryPage`, the instructions included:
* Programmatic construction of dynamic `data-test` selectors (e.g., mapping product names to button IDs).
* Data processing within the PO (e.g., returning `number[]` for prices) to keep the test layer purely focused on assertions.

### Phase C: Fixture-Based Test Generation
The AI was fed the exact structure of the `basePage.ts` fixture and the `testData.ts` schema. This ensured the generated tests were:
* **Modular:** Injecting page dependencies via Playwright fixtures.
* **Clean:** Referencing centralized data constants to avoid hardcoding strings.

---

## 2. Key Prompts Used

### For Inventory Logic & Data Abstraction (`InventoryPage.ts`)
> *"Act as a Senior QA Automation Engineer. Generate the POM for `InventoryPage.ts`. Use `data-test` attributes. Implement a method `addItemToCart(productName)` that constructs the selector dynamically (e.g., converting 'Sauce Labs Backpack' to 'add-to-cart-sauce-labs-backpack'). Ensure `getAllProductPrices()` returns a `number[]` for numerical sorting validation."*

### For Fixture-Integrated Test Suites (`tests/*.spec.ts`)
> *"Generate Playwright spec files using my `basePage` fixture and `testData.ts`. Ensure **Test Isolation** by navigating in a `beforeEach` hook. Scenarios must include: Full E2E checkout flow using multiple pages, sorting logic validation (numerical), and error message verification for 'Locked out' users and empty form fields using the messages defined in my data file."*

---

## 3. Human-in-the-Loop: Manual Refinement
While the AI provided a robust foundation, manual "Senior-level" refinements were made to ensure production-grade quality:
1.  **Regex Refinement:** Manually adjusted URL routes in `testData.ts` to use Regex for flexible environment matching.
2.  **State Management:** Fine-tuned the `auth.setup.ts` to correctly handle `storageState` persistence for the `standard_user`.
3.  **Assertion Optimization:** Refined the sorting logic assertions to handle floating-point precision when comparing product prices.

---

### Conclusion
By using AI as a **highly skilled pair programmer** rather than a simple code generator, the development time was reduced by approximately 60% without compromising the architectural integrity required for a scalable E2E suite.
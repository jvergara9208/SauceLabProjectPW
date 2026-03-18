# Swag Labs E2E Automation Suite

Professional Playwright + TypeScript automation framework for SauceDemo using Page Object Model (POM).

## Prerequisites
- Node.js 18+
- npm

## Installation
```bash
npm install
```

## Run Tests
```bash
npx playwright test
```

## Configuration Compliance (Task A)
- `baseURL`: `https://www.saucedemo.com`
- Browser projects: `chromium` and `firefox` (plus `setup` dependency project)
- Parallelism: enabled with `fullyParallel: true`; local workers auto, CI workers set to 1
- Retries: `retries: process.env.CI ? 1 : 0`
- Timeouts: `timeout: 30000`, `expect.timeout: 5000` (Playwright standard values)
- Artifacts directory: `outputDir: test-results/`
- Screenshot policy: `screenshot: 'only-on-failure'`
- Video policy: `video: 'retain-on-failure'`
- Trace policy: `trace: 'on-first-retry'`
- Reporters:
  - HTML -> `playwright-report/`
  - Allure -> `allure-results/`

## Useful Scripts
```bash
npm run test
npm run test:report
npm run test:allure
npm run allure:generate
npm run allure:serve
```

## Run by Scope
```bash
npm run test -- tests/auth.spec.ts
npm run test -- tests/inventory.spec.ts
npm run test -- tests/checkout.spec.ts
npm run test -- -g "@smoke"
npm run test -- -g "Login success"
```

## Design Notes
- POM split by flow: Login -> Inventory -> Cart -> Checkout.
- `auth.setup.ts` creates storage state used by test projects.
- `data-test` attributes are prioritized for selector stability.
- Test data is centralized in `data/testData.ts`.

## LLM Prompt Log
See `llm-prompts.md`.

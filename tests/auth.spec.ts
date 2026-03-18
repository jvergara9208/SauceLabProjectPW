import { test, expect } from '../fixtures/basePage';
import { testData } from '../data/testData';

test.describe('Authentication', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('Login success with a standard user', async ({ loginPage, page }) => {
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    await expect(page).toHaveURL(testData.routes.inventory);
  });

  test('Validation of locked out user error message', async ({ loginPage }) => {
    await loginPage.login(testData.users.lockedOut.username, testData.users.lockedOut.password);
    await expect(loginPage.errorMessage).toHaveText(testData.messages.lockedOut);
  });

  test('Form validation for empty username or password', async ({ loginPage }) => {
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toHaveText(testData.messages.usernameRequired);

    await loginPage.login(testData.users.standard.username, '');
    await expect(loginPage.errorMessage).toHaveText(testData.messages.passwordRequired);
  });
});

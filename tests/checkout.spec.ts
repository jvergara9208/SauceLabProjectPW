import { test, expect } from '../fixtures/basePage';
import { OverviewPage } from '../pages/OverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { testData } from '../data/testData';

test.describe('Checkout', () => {
  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    await expect(page).toHaveURL(testData.routes.inventory);
  });

  test('Full E2E flow: login, add items, checkout, and verify success', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
    page,
  }) => {
    for (const product of testData.products.checkoutTargets) {
      await inventoryPage.addItemToCart(product.name);
    }

    await inventoryPage.goToCart();
    await expect(cartPage.cartItems).toHaveCount(testData.products.checkoutTargets.length);

    await cartPage.clickCheckout();
    await checkoutPage.fillInformation(
      testData.checkoutInformation.firstName,
      testData.checkoutInformation.lastName,
      testData.checkoutInformation.postalCode,
    );

    const overviewPage = new OverviewPage(page);
    await overviewPage.finishOrder();

    const checkoutCompletePage = new CheckoutCompletePage(page);
    await expect(page).toHaveURL(testData.routes.checkoutComplete);
    await checkoutCompletePage.expectOrderCompleted();
  });

  test('State persistence: cart badge keeps item after refresh', async ({ inventoryPage, page }) => {
    await inventoryPage.addItemToCart(testData.products.persistenceTarget.name);
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await page.reload();
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('Negative flow: required checkout fields First Name and Zip Code', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
    page,
  }) => {
    await inventoryPage.addItemToCart(testData.products.negativeFlowTarget.name);
    await inventoryPage.goToCart();
    await cartPage.clickCheckout();

    await checkoutPage.lastNameInput.fill(testData.checkoutInformation.lastName);
    await checkoutPage.postalCodeInput.fill(testData.checkoutInformation.postalCode);
    await checkoutPage.continueButton.click();
    await expect(page.locator('[data-test="error"]')).toHaveText(testData.messages.firstNameRequired);

    await checkoutPage.firstNameInput.fill(testData.checkoutInformation.firstName);
    await checkoutPage.postalCodeInput.fill('');
    await checkoutPage.continueButton.click();
    await expect(page.locator('[data-test="error"]')).toHaveText(testData.messages.postalCodeRequired);
  });
});

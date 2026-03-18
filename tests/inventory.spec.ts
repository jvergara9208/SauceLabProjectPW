import { test, expect } from '../fixtures/basePage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { testData } from '../data/testData';

test.describe('Inventory', () => {
  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    await expect(page).toHaveURL(testData.routes.inventory);
  });

  test('Verify all product items are visible on the main page', async ({ page }) => {
    const itemNames = page.locator('[data-test="inventory-item-name"]');
    await expect(itemNames).toHaveCount(testData.products.all.length);

    for (const product of testData.products.all) {
      await expect(page.locator('[data-test="inventory-item-name"]', { hasText: product.name })).toBeVisible();
    }
  });

  test('Validate sorting logic for price low to high and name Z to A', async ({ inventoryPage, page }) => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getAllPrices();
    const expectedAscPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(expectedAscPrices);

    await inventoryPage.sortBy('za');
    const names = await page.locator('[data-test="inventory-item-name"]').allInnerTexts();
    const expectedDescNames = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(expectedDescNames);
  });

  test('Navigate to product details and verify name and price', async ({ page }) => {
    const targetName = testData.products.detailTarget.name;
    const targetItem = page.locator('[data-test="inventory-item"]').filter({
      has: page.locator('[data-test="inventory-item-name"]', { hasText: targetName }),
    });
    const expectedPrice = await targetItem.locator('[data-test="inventory-item-price"]').innerText();

    await targetItem.locator('[data-test="inventory-item-name"]').click();
    await expect(page).toHaveURL(testData.routes.productDetails);

    const productDetailsPage = new ProductDetailsPage(page);
    await productDetailsPage.expectProductDetails(targetName, expectedPrice);
  });
});

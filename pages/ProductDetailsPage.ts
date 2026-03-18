import { Locator, Page, expect } from '@playwright/test';

export class ProductDetailsPage {
  readonly page: Page;
  readonly backToProductsButton: Locator;
  readonly itemName: Locator;
  readonly itemDescription: Locator;
  readonly itemPrice: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;

    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');

    this.itemName = page.locator('[data-test="inventory-item-name"]');
    this.itemDescription = page.locator('[data-test="inventory-item-desc"]');
    this.itemPrice = page.locator('[data-test="inventory-item-price"]');

    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.removeButton = page.locator('[data-test="remove"]');
  }

  async getProductData() {
    return {
      name: await this.itemName.innerText(),
      description: await this.itemDescription.innerText(),
      price: await this.itemPrice.innerText(),
    };
  }

  async addItemToCart() {
    await this.addToCartButton.click();
  }

  async removeItem() {
    await this.removeButton.click();
  }

  async goBackToInventory() {
    await this.backToProductsButton.click();
  }


  async expectProductDetails(name: string, price: string) {
    await expect(this.itemName).toHaveText(name);
    await expect(this.itemPrice).toHaveText(price);
  }
}
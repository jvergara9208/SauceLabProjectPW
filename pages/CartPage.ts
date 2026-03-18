import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
  }

  async removeItem(productName: string) {

    const id = productName.toLowerCase().replace(/\s+/g, '-');
    await this.page.locator(`[data-test="remove-${id}"]`).click();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}
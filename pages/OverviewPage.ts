import { type Locator, type Page } from '@playwright/test';

export class OverviewPage {
  private readonly page: Page;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly inventoryItemName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.inventoryItemName = page.locator('[data-test="inventory-item-name"]');
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async getTotalValue(): Promise<string> {
    return await this.totalLabel.innerText();
  }
}

import { type Locator, type Page } from '@playwright/test';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage {
  private readonly page: Page;
  private readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  private readonly cartLink: Locator;
  private readonly inventoryItems: Locator;
  private readonly itemName: string;
  private readonly itemPrice: string;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.itemName = '[data-test="inventory-item-name"]';
    this.itemPrice = '[data-test="inventory-item-price"]';
  }

  // Converts UI product names into SauceDemo's slug format used by data-test ids.
  private toProductToken(productName: string): string {
    return productName.trim().toLowerCase().replace(/\s+/g, '-');
  }

  async addItemToCart(productName: string): Promise<void> {
    const token = this.toProductToken(productName);
    await this.page.locator(`[data-test="add-to-cart-${token}"]`).click();
  }

  async removeItemFromCart(productName: string): Promise<void> {
    const token = this.toProductToken(productName);
    await this.page.locator(`[data-test="remove-${token}"]`).click();
  }

  async selectSortOption(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  // Backward-compatible alias used by existing tests.
  async sortBy(option: SortOption): Promise<void> {
    await this.selectSortOption(option);
  }

  async getAllProductPrices(): Promise<number[]> {
    const rawPrices = await this.page.locator(this.itemPrice).allInnerTexts();
    return rawPrices.map((priceText) => Number.parseFloat(priceText.replace('$', '').trim()));
  }

  async getAllPrices(): Promise<number[]> {
    return this.getAllProductPrices();
  }

  // Returns "0" when the badge is not present (empty cart).
  async getCartBadgeCount(): Promise<string> {
    if (!(await this.cartBadge.isVisible())) {
      return '0';
    }

    const badgeText = (await this.cartBadge.textContent())?.trim() ?? '';
    return badgeText || '0';
  }

  async MapsToCart(): Promise<void> {
    await this.cartLink.click();
  }

  // Backward-compatible alias used by existing tests.
  async goToCart(): Promise<void> {
    await this.MapsToCart();
  }

  async clickProductTitle(productName: string): Promise<void> {
    const productCard = this.inventoryItems.filter({
      has: this.page.locator(this.itemName, { hasText: productName }),
    });

    await productCard.locator(this.itemName).click();
  }
}

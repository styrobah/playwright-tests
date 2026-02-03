export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator(".cart_item");
    this.checkoutButton = page.locator("#checkout");
    this.inventoryItemName = page.locator();
  }

  async waitForPageToLoad() {
    await this.page.locator(".title", { hasText: "Your Cart" }).waitFor();
  }

  async countCartItems() {
    return await this.cartItems.count();
  }

  async getCartProductNames() {
    return await this.cartItems
      .locator('[data-test="inventory-item-name"]')
      .allTextContents();
  }

  async removeProduct(productName) {
    const item = this.cartItems.filter({
      has: this.page.locator(".inventory_item_name", {
        hasText: productName,
      }),
    });
    await item.locator(".cart_button").click();
  }

  async goToCheckoutPage() {
    await this.checkoutButton.click();
  }
}

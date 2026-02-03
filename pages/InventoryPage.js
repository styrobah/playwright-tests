export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryList = page.locator(".inventory_list .inventory_item");
    this.productSortContainer = page.locator(".product_sort_container");
    this.inventoryPrices = page.locator(".inventory_item_price");
    this.shoppingCart = page.locator(".shopping_cart_link");
    this.inventoryItems = page.locator(".inventory_item");
  }

  async waitForPageToLoad() {
    await this.inventoryList.first().waitFor();
  }

  async countInventoryProducts() {
    return await this.inventoryList.count();
  }

  async goToCart() {
    await this.shoppingCart.click();
  }

  async selectSortOption(option) {
    await this.productSortContainer.selectOption(option);
  }

  async getAllPrices() {
    const count = await this.inventoryPrices.count();
    const prices = [];
    for (let i = 0; i < count; i++) {
      const priceText = await this.inventoryPrices.nth(i).textContent();
      prices.push(parseFloat(priceText.trim().replace("$", "")));
    }
    return prices;
  }

  async addProductToCart(productName) {
    const item = this.inventoryItems.filter({
      has: this.page.locator(".inventory_item_name", {
        hasText: productName,
      }),
    });

    await item.locator(".btn_inventory").click();
  }
}

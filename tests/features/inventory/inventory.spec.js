import { test, expect } from "../../../fixtures/auth.fixture";
import { InventoryPage } from "../../../pages/InventoryPage";
import sortOptions from "../../../data/sortOptions.json";


test.describe("Inventory Page Tests", () => {
  test("Products are displayed", async ({ authenticatedPage }) => {
    const inventoryPage = new InventoryPage(authenticatedPage);
    await inventoryPage.waitForPageToLoad();
    const productCount = await inventoryPage.countInventoryProducts();
    expect(productCount,"No products found on the inventory page").toBeGreaterThan(0);
  });

for (const sort of sortOptions) {
  test(`Sorting products by ${sort.description}`, async ({
    authenticatedPage,
  }) => {
    const inventoryPage = new InventoryPage(authenticatedPage);
    await inventoryPage.waitForPageToLoad();
    await inventoryPage.selectSortOption(sort.option);
    let prices = await inventoryPage.getAllPrices();

    if (sort.option === "lohi") {
      const isAscending = prices.every(
        (p, i, arr) => i === 0 || arr[i - 1] <= p
      );
      await expect(isAscending).toBeTruthy();
    } else if (sort.option === "hilo") {
      const isDescending = prices.every(
        (p, i, arr) => i === 0 || arr[i - 1] >= p
      );
      await expect(isDescending).toBeTruthy();
    }
  });
}
  

});

import { test, expect } from "../../../fixtures/auth.fixture";
import { InventoryPage } from "../../../pages/InventoryPage";
import { CartPage } from "../../../pages/CartPage";

test.describe("Cart Page Tests", () => {
  test("Shows empty cart message when no items added", async ({
    authenticatedPage,page
  }) => {
    const inventoryPage = new InventoryPage(authenticatedPage);
    const cartPage = new CartPage(page);
    await inventoryPage.waitForPageToLoad();
    await inventoryPage.goToCart();
    await cartPage.waitForPageToLoad();
    const numberOfCartItems = await cartPage.countCartItems();
    await expect(numberOfCartItems).toBe(0);
  });

  test("Displays added product in cart", async ({ authenticatedPage, page,}) => {
    const inventoryPage = new InventoryPage(authenticatedPage);
    const cartPage = new CartPage(page);
    await inventoryPage.waitForPageToLoad();
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.goToCart();
    await cartPage.waitForPageToLoad();
    const productsName = await cartPage.getCartProductNames();
    await expect(productsName).toContain("Sauce Labs Backpack");
    await expect(productsName.length).toEqual(1);
  });

  test("Removes product from cart", async ({ authenticatedPage, page }) => {
    const inventoryPage = new InventoryPage(authenticatedPage);
    const cartPage = new CartPage(page);
    await inventoryPage.waitForPageToLoad();
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.goToCart();
    await cartPage.waitForPageToLoad();
    await cartPage.removeProduct("Sauce Labs Backpack");
    const productsName = await cartPage.getCartProductNames();
    await expect(productsName.length).toEqual(0);
  });

  test("Navigates to checkout page", async ({ authenticatedPage, page }) => {
    const inventoryPage = new InventoryPage(authenticatedPage);
    const cartPage = new CartPage(page);
    await inventoryPage.waitForPageToLoad();
    await inventoryPage.goToCart();
    await cartPage.waitForPageToLoad();
    await cartPage.goToCheckoutPage();
    await expect(page.url()).toBe(
      "https://www.saucedemo.com/checkout-step-one.html"
    );
  });
});

import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {

    if (!process.env.USERNAME || !process.env.PASSWORD) {
      throw new Error("Missing USERNAME or PASSWORD environment variables");
    }
    
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.waitForPageToLoad();
    await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
    await use(page);
  },
});

export { expect } from "@playwright/test";

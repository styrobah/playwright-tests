import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/LoginPage";
import loginData from "../../../data/loginData.json";

test.describe("Login Page Tests", () => {
for (const data of loginData) {
  test(`${data.testName}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.waitForPageToLoad();
    await loginPage.login(data.username, data.password);

    if (data.shouldPass) {
      await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    }else{
      const errorText = await loginPage.getErrorMessage();
      await expect(errorText).toBe(data.errorText);
    }

  });
}
  test("Password field is masked by default", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.waitForPageToLoad();
    await expect(loginPage.passwordInput).toHaveAttribute("type", "password");
  });
});

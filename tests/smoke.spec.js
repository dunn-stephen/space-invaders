const { test, expect } = require("@playwright/test");

test("loads the menu and starts the game", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Space Invaders");
  await expect(page.locator("#btn-start")).toBeVisible();
  await expect(page.locator("#overlay")).not.toHaveClass(/hidden/);
  await expect(page.locator("#wave")).toHaveText("1");

  await page.locator("#btn-start").click();

  await expect(page.locator("#overlay")).toHaveClass(/hidden/);
  await expect(page.locator("#score")).toHaveText("0000");
  await expect(page.locator("#wave")).toHaveText("1");
});

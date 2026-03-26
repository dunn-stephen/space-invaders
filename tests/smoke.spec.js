const { test, expect } = require("@playwright/test");

async function openFreshPage(page) {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.clear();
  });
  await page.reload();
}

test("loads the menu and starts the game", async ({ page }) => {
  await openFreshPage(page);

  await expect(page).toHaveTitle("Space Invaders");
  await expect(page.locator("#btn-start")).toBeVisible();
  await expect(page.locator("#overlay")).not.toHaveClass(/hidden/);
  await expect(page.locator("#wave")).toHaveText("1");

  await page.locator("#btn-start").click();

  await expect(page.locator("#overlay")).toHaveClass(/hidden/);
  await expect(page.locator("#score")).toHaveText("0000");
  await expect(page.locator("#wave")).toHaveText("1");
});

test("persists a settings change across reload", async ({ page }) => {
  await openFreshPage(page);

  await page.locator("#btn-settings").click();
  await page.locator('[data-cfg="gameMode"][data-val="invincible"]').click();
  await page.locator("#cfg-back").click();

  await expect(page.getByText("MODE: INVINCIBLE")).toBeVisible();

  await page.reload();

  await expect(page.getByText("MODE: INVINCIBLE")).toBeVisible();
});

test("supports keyboard start, pause, and resume", async ({ page }) => {
  await openFreshPage(page);

  await page.keyboard.press("Enter");
  await expect(page.locator("#overlay")).toHaveClass(/hidden/);

  await page.keyboard.press("KeyP");
  await expect(page.getByText("PAUSED")).toBeVisible();

  await page.keyboard.press("KeyP");
  await expect(page.locator("#overlay")).toHaveClass(/hidden/);
});

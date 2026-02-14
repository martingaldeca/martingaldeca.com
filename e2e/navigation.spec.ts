import { test, expect } from "@playwright/test";



test.describe("Navigation and i18n", () => {
  
  test.use({ viewport: { width: 1280, height: 720 } });

  test("should navigate to projects page", async ({ page }) => {
    await page.goto("/en");

    
    await page.getByRole("link", { name: "Projects" }).click();

    
    await expect(page).toHaveURL(/\/en\/projects/);

    
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("should navigate to personal page", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("link", { name: "Personal" }).click();
    await expect(page).toHaveURL(/\/en\/personal/);
  });

  test("should switch language from EN to ES", async ({ page }) => {
    await page.goto("/en");

    
    const langSwitch = page.getByRole("link", { name: "ES", exact: true });
    await expect(langSwitch).toBeVisible();

    await langSwitch.click();

    
    await expect(page).toHaveURL(/\/es/);

    
    await expect(
      page.getByRole("link", { name: "EN", exact: true }),
    ).toBeVisible();
  });

  test("should switch language from ES to EN", async ({ page }) => {
    await page.goto("/es");

    const langSwitch = page.getByRole("link", { name: "EN", exact: true });
    await expect(langSwitch).toBeVisible();

    await langSwitch.click();

    await expect(page).toHaveURL(/\/en/);
    await expect(
      page.getByRole("link", { name: "ES", exact: true }),
    ).toBeVisible();
  });
});

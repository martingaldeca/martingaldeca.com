import { test, expect } from "@playwright/test";

test.describe("Homepage Content", () => {
  test("should render the header with logo", async ({ page }) => {
    await page.goto("/en");

    const header = page.locator("header");
    await expect(header).toBeVisible();
    await expect(header.getByText("<Martin />")).toBeVisible();
  });

  test("should render the hero section", async ({ page }) => {
    await page.goto("/en");

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test("should render the theme switch in header", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/en");

    const toggle = page.getByRole("switch", { name: "Toggle dark mode" });
    await expect(toggle).toBeVisible();
  });

  test("should have correct meta title", async ({ page }) => {
    await page.goto("/en");

    await expect(page).toHaveTitle(/Martín Galdeano/);
  });

  test("should be accessible on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/en");

    const header = page.locator("header");
    await expect(header).toBeVisible();

    const hamburger = page.locator("button.md\\:hidden");
    await expect(hamburger).toBeVisible();
  });
});

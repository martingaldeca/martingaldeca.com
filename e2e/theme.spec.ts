import { test, expect } from "@playwright/test";

test.describe("Theme Switcher Flow", () => {
  test.use({
    colorScheme: "dark",
    viewport: { width: 1280, height: 720 },
    storageState: { cookies: [], origins: [] },
  });

  test("should default to dark mode and toggle correctly", async ({ page }) => {
    await page.goto("/");

    const html = page.locator("html");
    await expect(html).toHaveClass(/dark/, { timeout: 10000 });

    const toggle = page.getByRole("switch", { name: "Toggle dark mode" });
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-checked", "true");

    await toggle.click();

    await expect(html).not.toHaveClass(/dark/, { timeout: 10000 });
    await expect(toggle).toHaveAttribute("aria-checked", "false");

    await page.reload();
    await expect(html).not.toHaveClass(/dark/, { timeout: 10000 });

    const toggleAfterReload = page.getByRole("switch", {
      name: "Toggle dark mode",
    });

    await expect(toggleAfterReload).toHaveAttribute("aria-checked", "false", {
      timeout: 10000,
    });

    await toggleAfterReload.click();
    await expect(html).toHaveClass(/dark/, { timeout: 10000 });
  });

  test("should persist light theme after explicit selection", async ({
    page,
  }) => {
    await page.goto("/");
    const html = page.locator("html");
    await expect(html).toHaveClass(/dark/, { timeout: 10000 });

    const toggle = page.getByRole("switch", { name: "Toggle dark mode" });
    await toggle.click();
    await expect(html).not.toHaveClass(/dark/, { timeout: 10000 });

    await page.goto("/en/projects");
    await expect(html).not.toHaveClass(/dark/, { timeout: 10000 });
  });
});

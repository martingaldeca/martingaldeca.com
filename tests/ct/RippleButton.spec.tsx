import { test, expect } from "@playwright/experimental-ct-react";
import RippleButton from "@/components/atoms/Button/RippleButton";

test.use({ viewport: { width: 500, height: 500 } });

test("RippleButton renders correctly as a button", async ({ mount }) => {
  const component = await mount(
    <RippleButton variant="primary" onClick={() => {}}>
      Click Me
    </RippleButton>,
  );

  await expect(component).toContainText("Click Me");
  await expect(component).toHaveClass(/shadow-lg/); 

  
  
  
  await component.click();
  
  
  
});

test("RippleButton renders as secondary variant", async ({ mount }) => {
  const component = await mount(
    <RippleButton variant="secondary">Secondary</RippleButton>,
  );

  await expect(component).toContainText("Secondary");
  
  await expect(component).toHaveCSS("border-style", "solid");
  
  await expect(component).toHaveAttribute("style", /border/);
});




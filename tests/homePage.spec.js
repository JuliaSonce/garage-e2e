// @ts-check
import { test, expect } from '@playwright/test';


test.describe('Open the main page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Hillel/);
  });
  test.only('Has All text on header buttons', async ({ page }) => {
    const expectedButtonsText = ["Home", "About", "Contacts", "Guest log in"];
    const buttons = page.locator(".header-link");
    const actualTexts = [];

    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      const test = await buttons.nth(i).innerText();
      actualTexts.push(test);
    }
    expect(actualTexts).toEqual(expectedButtonsText);
  });

});

// @ts-check
import { test, expect } from '@playwright/test';



test.describe("Login page tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })
  test.only("Login with invalid credentials", async ({ page }) => {
    const signInButton = page.locator('.header_signin', { hasText: 'Sign In' });
    await signInButton.click();
    const modalSignIn = page.locator('div.modal-dialog');
    const emailInput = modalSignIn.locator('input#signinEmail');
    const passwordInput = modalSignIn.locator('input#signinPassword');
    const loginButton = modalSignIn.locator('.btn-primary')
    await emailInput.fill('test123');
    await passwordInput.fill('Tester1952?');
    await expect(loginButton).toBeDisabled();
    await expect(modalSignIn.locator(('.invalid-feedback'))).toHaveText('Email is incorrect')


  })
});
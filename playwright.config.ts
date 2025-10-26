// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './e2e/tests',
    timeout: 30 * 1000,
    retries: 0,
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */

        baseURL: 'https://qauto2.forstudy.space',
        httpCredentials: {
            username: 'guest',
            password: 'welcome2qauto'
        },
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
        trace: 'on',
    },

    reporter: [['list'], ['html'], ['allure-playwright']]
});
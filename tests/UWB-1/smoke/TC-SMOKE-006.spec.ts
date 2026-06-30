import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('TC-SMOKE-006: Verify Expiration Date defaults to Effective Date + 1 year', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Verify Expiration Date defaults to Effective Date + 1 year', async ({ page }) => {
    // 1. Set Effective Date to 01/01/2027
    await page.getByLabel('Effective Date').fill('01/01/2027');
    await page.keyboard.press('Tab');

    // 2. Observe the Expiration Date field — Expected: 01/01/2028
    await expect(page.getByLabel('Expiration Date')).toHaveValue('01/01/2028', { timeout: 5000 });
  });
});

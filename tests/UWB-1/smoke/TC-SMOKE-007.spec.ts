import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

// KNOWN DEFECT DISC-003: Need By Date does NOT auto-populate when Effective Date is set.
// This test is expected to FAIL — wrapped with test.fail() to track the defect.

test.describe('TC-SMOKE-007: Verify Need By Date auto-population to Effective Date − 5 days', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Verify Need By Date auto-population to Effective Date − 5 days', async ({ page }) => {
    // This test is expected to FAIL due to DISC-003
    test.fail(true, 'DISC-003: Need By Date does not auto-populate. Field stays empty after Effective Date is set.');

    // 1. Set Effective Date to 01/15/2027
    await page.getByLabel('Effective Date').fill('01/15/2027');
    await page.keyboard.press('Tab');

    // 2. Leave Need By Date empty — do not interact with the field

    // 3. Observe the Need By Date field — Expected: 01/10/2027 (5 days before Effective Date)
    await expect(page.getByLabel('Need By Date')).toHaveValue('01/10/2027', { timeout: 5000 });
  });
});

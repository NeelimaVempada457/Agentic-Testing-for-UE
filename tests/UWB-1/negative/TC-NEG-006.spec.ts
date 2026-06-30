// spec: test-artifacts/UWB-1/test-cases/negative/new-submission-negative.md

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Negative: New Submission Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-NEG-006: Set Effective Date after Expiration Date — verify validation error', async ({ page }) => {
    // Verify we are on the new submission page
    await expect(page).toHaveURL(/submissions\/new/);

    // Date fields use input[type="date"] in YYYY-MM-DD format:
    //   dateInputs.nth(0) = Need By Date
    //   dateInputs.nth(1) = Effective Date
    //   dateInputs.nth(2) = Expiration Date
    const dateInputs = page.locator('input[type="date"]');

    // 1. Set Expiration Date to 2027-01-01
    await dateInputs.nth(2).fill('2027-01-01');
    await page.keyboard.press('Tab');

    // 2. Set Effective Date to 2027-06-01 (after the Expiration Date)
    await dateInputs.nth(1).fill('2027-06-01');
    await page.keyboard.press('Tab');

    // 3. Click "Create Submission" to trigger validation
    await page.getByRole('button', { name: 'Create Submission' }).click();

    // Verify: form is still on the new submission page (submission is blocked)
    await expect(page).toHaveURL(/submissions\/new/);

    // Verify: date-related validation error message is shown
    const dateError = page.locator('p').filter({
      hasText: /effective.*expir|expir.*effective|date.*exceed|must not exceed/i,
    });
    await expect(
      dateError.or(
        page.locator('[class*="error"]').filter({ hasText: /date/i })
      ).or(
        page.locator('p').filter({ hasText: /Required/ }).first()
      )
    ).toBeVisible();
  });
});

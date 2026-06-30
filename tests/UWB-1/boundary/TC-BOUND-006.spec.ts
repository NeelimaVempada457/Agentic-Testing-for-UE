// spec: test-artifacts/UWB-1/test-cases/boundary/new-submission-boundary.md
// TC-BOUND-006: Effective Date set to today's date

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

/** Returns today's date in YYYY-MM-DD format */
function today(): string {
  return new Date().toISOString().split('T')[0];
}

/** Returns a date N years from now in YYYY-MM-DD format */
function todayPlusOneYear(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().split('T')[0];
}

test.describe('Boundary: New Submission Form — Date Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-BOUND-006: Effective Date set to today\'s date', async ({ page }) => {
    const todayDate = today();
    const expectedExpiration = todayPlusOneYear();

    // Navigate to New Submission form
    await page.getByRole('link', { name: /new submission/i }).click();

    // Step 1: Set Effective Date = today
    await page.getByLabel(/effective date/i).fill(todayDate);

    // Step 2: Verify Expiration Date auto-populates to today + 1 year
    const expirationField = page.getByLabel(/expiration date/i);
    await expect(expirationField).toHaveValue(expectedExpiration, { timeout: 5000 });

    // Step 3: Fill remaining mandatory fields and submit
    await page.getByLabel(/submission type/i).selectOption({ index: 1 });
    await page.getByLabel(/account name/i).fill('Test Account');

    // Need By Date must be before Effective Date (today), so use yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    await page.getByLabel(/need by date/i).fill(yesterdayStr);

    await page.getByRole('button', { name: /create submission/i }).click();

    // Expected Result: Submission accepted — same-day effective date is valid
    await expect(
      page.getByText(/submission created/i).or(page.getByText(/successfully/i))
    ).toBeVisible({ timeout: 10000 });
  });
});

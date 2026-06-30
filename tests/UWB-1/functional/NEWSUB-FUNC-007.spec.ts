// spec: test-artifacts/UWB-1/test-cases/functional/new-submission-functional.md
// test case: NEWSUB-FUNC-007 | AC-06

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Expiration Date Auto-Default', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Expiration Date auto-defaults to Effective Date + 1 year', async ({ page }) => {
    // 2. Set Effective Date to 2027-06-15
    const effectiveDateField = page.getByLabel(/effective date/i);
    await effectiveDateField.fill('2027-06-15');
    await effectiveDateField.blur();

    // 3. Immediately observe Expiration Date — should auto-populate to 2028-06-15
    const expirationDateField = page.getByLabel(/expiration date/i);
    await expect(expirationDateField).toHaveValue('2028-06-15', { timeout: 3000 });
  });
});

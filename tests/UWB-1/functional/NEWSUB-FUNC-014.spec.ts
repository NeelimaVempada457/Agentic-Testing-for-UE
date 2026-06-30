// spec: test-artifacts/UWB-1/test-cases/functional/new-submission-functional.md
// test case: NEWSUB-FUNC-014 | AC-14

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Internal Notes Optional', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Internal Notes field is optional and does not block submission', async ({ page }) => {
    // 2. Fill all mandatory fields
    await page.getByRole('radio', { name: /new business/i }).click();

    const accountNameField = page.getByLabel(/account name/i);
    await accountNameField.fill('Edu');
    const firstOption = page.locator('[role="option"]').first();
    await expect(firstOption).toBeVisible({ timeout: 10000 });
    await firstOption.click();

    const productsDropdown = page.getByLabel(/product/i);
    await productsDropdown.click();
    await page.locator('[role="option"]').first().click();

    const effectiveDateField = page.getByLabel(/effective date/i);
    await effectiveDateField.fill('2027-06-15');
    await effectiveDateField.blur();

    // 3. Leave Internal Notes empty (do not fill it)
    const internalNotesField = page.getByLabel(/internal notes/i);
    await expect(internalNotesField).toHaveValue('');

    // 4. Click Create Submission
    await page.getByRole('button', { name: /create submission/i }).click();

    // 5. Verify submission succeeds — no validation error on Internal Notes
    await expect(
      page.locator('text=/submission created/i, text=/success/i, [data-testid="success-message"]').first()
    ).toBeVisible({ timeout: 15000 });

    // 6. Confirm no validation error is shown for Internal Notes
    await expect(page.locator('text=/internal notes.*required/i')).not.toBeVisible();
  });
});

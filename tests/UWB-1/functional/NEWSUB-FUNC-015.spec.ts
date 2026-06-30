// spec: test-artifacts/UWB-1/test-cases/functional/new-submission-functional.md
// test case: NEWSUB-FUNC-015 | AC-06
// Jira Ref: Comment 3 (Ziad Elharaoui): "yes, they can modify the expiration date"

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Expiration Date Manual Override', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Expiration Date auto-populated value can be manually overridden', async ({ page }) => {
    // 2. Fill mandatory fields
    await page.getByRole('radio', { name: /new business/i }).click();

    const accountNameField = page.getByLabel(/account name/i);
    await accountNameField.fill('Edu');
    const firstOption = page.locator('[role="option"]').first();
    await expect(firstOption).toBeVisible({ timeout: 10000 });
    await firstOption.click();

    const productsDropdown = page.getByLabel(/product/i);
    await productsDropdown.click();
    await page.locator('[role="option"]').first().click();

    // 3. Set Effective Date = 2027-01-01 (Expiration auto-populates to 2028-01-01)
    const effectiveDateField = page.getByLabel(/effective date/i);
    await effectiveDateField.fill('2027-01-01');
    await effectiveDateField.blur();

    const expirationDateField = page.getByLabel(/expiration date/i);
    await expect(expirationDateField).toHaveValue('2028-01-01', { timeout: 3000 });

    // 4. Manually set Expiration Date = 2027-06-01
    await expirationDateField.fill('2027-06-01');
    await expirationDateField.blur();
    await expect(expirationDateField).toHaveValue('2027-06-01');

    // 5. Submit the form
    await page.getByRole('button', { name: /create submission/i }).click();

    // 6. Verify submission succeeds with the modified Expiration Date (no error)
    await expect(
      page.locator('text=/submission created/i, text=/success/i, [data-testid="success-message"]').first()
    ).toBeVisible({ timeout: 15000 });

    await expect(page.locator('text=/expiration.*error/i, text=/invalid.*expiration/i')).not.toBeVisible();
  });
});

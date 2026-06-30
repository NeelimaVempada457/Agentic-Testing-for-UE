// spec: test-artifacts/UWB-1/test-cases/functional/new-submission-functional.md
// test case: NEWSUB-FUNC-002 | AC-02, AC-03

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Account Name Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Account Name search retrieves Salesforce results and enables account selection', async ({ page }) => {
    // 2. Type 3+ characters in Account Name field
    const accountNameField = page.getByLabel(/account name/i);
    await accountNameField.fill('Edu');

    // 3. Wait for dropdown results to appear
    const dropdown = page.locator('[role="listbox"], [role="option"], .autocomplete-results, .search-results');
    await expect(dropdown.first()).toBeVisible({ timeout: 10000 });

    // 4. Verify results list appears
    await expect(dropdown.first()).toBeVisible();

    // 5. Select the first account from the results
    const firstOption = page.locator('[role="option"]').first();
    const selectedAccountName = await firstOption.textContent();
    await firstOption.click();

    // 6. Verify Account Name field populates with the selected account
    await expect(accountNameField).not.toHaveValue('');
    if (selectedAccountName) {
      await expect(accountNameField).toHaveValue(new RegExp(selectedAccountName.trim().substring(0, 10), 'i'));
    }
  });
});

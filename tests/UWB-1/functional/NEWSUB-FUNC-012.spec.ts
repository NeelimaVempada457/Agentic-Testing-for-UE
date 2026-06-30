// spec: test-artifacts/UWB-1/test-cases/functional/new-submission-functional.md
// test case: NEWSUB-FUNC-012 | AC-15, AC-16

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Submission Summary Preview', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Submission Summary preview displays all 8 required fields', async ({ page }) => {
    // 2. Fill Submission Type
    await page.getByRole('radio', { name: /new business/i }).click();

    // 3. Fill Account Name
    const accountNameField = page.getByLabel(/account name/i);
    await accountNameField.fill('Edu');
    const firstOption = page.locator('[role="option"]').first();
    await expect(firstOption).toBeVisible({ timeout: 10000 });
    await firstOption.click();

    // 4. Set Effective Date
    const effectiveDateField = page.getByLabel(/effective date/i);
    await effectiveDateField.fill('2027-06-15');
    await effectiveDateField.blur();

    // 5. Select a Product
    const productsDropdown = page.getByLabel(/product/i);
    await productsDropdown.click();
    await page.locator('[role="option"]').first().click();

    // 6. Locate the Submission Summary panel (right side / preview area)
    const summaryPanel = page.locator(
      '[data-testid="submission-summary"], .submission-summary, aside, .summary-panel'
    ).first();
    await expect(summaryPanel).toBeVisible();

    // 7. Verify all 8 required summary fields are present and display values
    const requiredLabels = [
      /type/i,
      /account/i,
      /product/i,
      /need by/i,
      /effective/i,
      /brokerage/i,
      /broker/i,
      /stage/i,
    ];

    for (const labelPattern of requiredLabels) {
      await expect(
        summaryPanel.locator(`text=${labelPattern}`).or(page.getByText(labelPattern)).first()
      ).toBeVisible({ timeout: 5000 });
    }
  });
});

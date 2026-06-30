// spec: test-artifacts/UWB-1/test-cases/edge-cases/new-submission-edge.md
// TC-EDGE-011: Verify Submission Summary updates as fields are filled

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Verify Submission Summary updates as fields are filled', async ({ page }) => {
    // Navigate to New Submission form
    await page.getByRole('link', { name: /new submission/i }).click();

    const summaryPanel = page.locator(
      '[data-testid="submission-summary"], .submission-summary, [aria-label*="summary"]'
    ).first();

    // Step 1: Select Submission Type — observe Summary panel updates
    await page.getByLabel(/submission type/i).click();
    const submissionTypeOption = page.getByRole('option').first();
    const submissionTypeText = await submissionTypeOption.textContent();
    await submissionTypeOption.click();

    await expect(summaryPanel).toContainText(submissionTypeText?.trim() ?? '');

    // Step 2: Select Account — observe Summary panel updates
    await page.getByLabel(/account name/i).fill('Test');
    const accountOption = page.getByRole('option').first();
    const accountText = await accountOption.textContent();
    await accountOption.click();

    await expect(summaryPanel).toContainText(accountText?.trim() ?? '');

    // Step 3: Select Product(s) — observe Summary panel updates
    await page.getByLabel(/product\(s\)|products/i).click();
    const productOption = page.getByRole('option').first();
    const productText = await productOption.textContent();
    await productOption.click();

    // Products are shown as comma-separated list in summary
    await expect(summaryPanel).toContainText(productText?.trim() ?? '');

    // Step 4: Set Effective Date — observe Summary panel updates
    await page.getByLabel(/effective date/i).fill('01/01/2027');
    await page.getByLabel(/effective date/i).press('Tab');

    await expect(summaryPanel).toContainText('01/01/2027');

    // Final: Summary panel reflects current form state in real time
    await expect(summaryPanel).toBeVisible();
  });
});

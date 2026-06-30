// spec: test-artifacts/UWB-1/test-cases/edge-cases/new-submission-edge.md
// TC-EDGE-010: Search Account Name with special characters

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

const SPECIAL_INPUTS = ['&', "'", '%', '<script>'];

test.describe('New Submission Form — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Search Account Name with special characters', async ({ page }) => {
    // Navigate to New Submission form
    await page.getByRole('link', { name: /new submission/i }).click();

    const accountNameField = page.getByLabel(/account name/i);

    for (const input of SPECIAL_INPUTS) {
      // Clear previous input and type the special character
      await accountNameField.clear();
      await accountNameField.fill(input);

      // Wait briefly for any async search response
      await page.waitForTimeout(1000);

      // Verify no JavaScript error or page crash
      await expect(page.getByText(/javascript error|uncaught exception|typeerror/i)).not.toBeVisible();

      // Verify either results or a "no results" message is shown — not a blank crash
      const hasResults = await page.getByRole('option').count() > 0;
      const hasNoResultsMsg = await page.getByText(/no results|no accounts found/i).isVisible();
      expect(hasResults || hasNoResultsMsg).toBeTruthy();

      // Verify the page is still functional (form is still present)
      await expect(page.getByRole('button', { name: /create submission/i })).toBeVisible();
    }

    // Final check: <script> tag content should NOT have been executed as JavaScript
    // If XSS occurred the page title or body would change — assert the form is intact
    await expect(page.getByLabel(/account name/i)).toBeVisible();
  });
});

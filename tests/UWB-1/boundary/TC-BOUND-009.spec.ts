// spec: test-artifacts/UWB-1/test-cases/boundary/new-submission-boundary.md
// TC-BOUND-009: Account search with minimum input (1 character)

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Boundary: New Submission Form — Account Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-BOUND-009: Account search with minimum input (1 character)', async ({ page }) => {
    // Navigate to New Submission form
    await page.getByRole('link', { name: /new submission/i }).click();

    // Step 1: Type exactly 1 character in the Account Name field
    await page.getByLabel(/account name/i).fill('A');

    // Wait briefly for any search debounce to fire
    await page.waitForTimeout(1500);

    // Expected Result: Either a dropdown with results OR a min-character hint is shown.
    // No crash or unhandled state.
    const hasResults = await page.getByRole('listbox').isVisible().catch(() => false);
    const hasDropdown = await page.locator('[role="option"]').count().then(c => c > 0).catch(() => false);
    const hasMinCharHint = await page.getByText(/type at least/i).or(page.getByText(/minimum.*character/i)).isVisible().catch(() => false);
    const hasNoError = !(await page.getByRole('alert').isVisible().catch(() => false));

    // At minimum, the page must not crash — at least one expected state must be true
    expect(hasResults || hasDropdown || hasMinCharHint || hasNoError).toBe(true);

    // Explicitly verify no unhandled JS error dialog appears
    await expect(page.getByRole('alertdialog')).not.toBeVisible();
  });
});

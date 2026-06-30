// spec: test-artifacts/UWB-1/test-cases/edge-cases/new-submission-edge.md
// TC-EDGE-005: Remove a selected product card and verify it returns to dropdown

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Remove a selected product card and verify it returns to dropdown', async ({ page }) => {
    // Navigate to New Submission form
    await page.getByRole('link', { name: /new submission/i }).click();

    // Step 1: Select "Educators Legal Liability (ELL) - ML" from the dropdown
    await page.getByLabel(/product\(s\)|products/i).click();
    await page.getByRole('option', { name: /educators legal liability.*ell/i }).click();

    // Verify the ELL product card appears in the selected products area
    const ellCard = page.getByText(/educators legal liability.*ell/i).first();
    await expect(ellCard).toBeVisible();

    // Step 2: Click the remove (×) button on the ELL product card
    const removeButton = page.getByRole('button', { name: /remove.*ell|×|close/i }).first();
    await removeButton.click();

    // Verify ELL card is removed from the selected products area
    await expect(ellCard).not.toBeVisible();

    // Step 3: Re-open the Product(s) dropdown and verify ELL reappears as an available option
    await page.getByLabel(/product\(s\)|products/i).click();
    await expect(page.getByRole('option', { name: /educators legal liability.*ell/i })).toBeVisible();
  });
});

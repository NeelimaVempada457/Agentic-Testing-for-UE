// spec: test-artifacts/UWB-1/test-cases/edge-cases/new-submission-edge.md
// TC-EDGE-007: Leave Internal Notes empty — verify submission succeeds

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Leave Internal Notes empty — verify submission succeeds', async ({ page }) => {
    // Navigate to New Submission form
    await page.getByRole('link', { name: /new submission/i }).click();

    // Step 1: Fill all mandatory fields
    await page.getByLabel(/submission type/i).click();
    await page.getByRole('option').first().click();

    await page.getByLabel(/account name/i).fill('Test Account');
    await page.getByRole('option').first().click();

    await page.getByLabel(/effective date/i).fill('01/01/2027');
    await page.getByLabel(/effective date/i).press('Tab');

    await page.getByLabel(/product\(s\)|products/i).click();
    await page.getByRole('option').first().click();

    // Step 2: Leave Internal Notes completely empty — confirm the field has no value
    const notesField = page.getByLabel(/internal notes/i);
    await expect(notesField).toHaveValue('');

    // Step 3: Click "Create Submission"
    await page.getByRole('button', { name: /create submission/i }).click();

    // Verify submission is created successfully — no validation error on Notes field
    await expect(page.getByText(/internal notes.*required|notes.*cannot be empty/i)).not.toBeVisible();

    // Submission ID should be generated (success state)
    await expect(
      page.getByText(/submission.*created|submission id|successfully created/i)
    ).toBeVisible({ timeout: 15000 });
  });
});

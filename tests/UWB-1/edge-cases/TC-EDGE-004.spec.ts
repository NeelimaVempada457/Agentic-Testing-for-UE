// spec: test-artifacts/UWB-1/test-cases/edge-cases/new-submission-edge.md
// TC-EDGE-004: Select ALL available products in the multi-select dropdown

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

const ALL_PRODUCTS = [
  'Educators Legal Liability (ELL) - ML',
  'Directors & Officers (D&O)',
  'Employment Practices Liability (EPL)',
  'Commercial Crime',
  'Cyber Liability',
  'Fiduciary Liability',
  'Commercial General Liability (CGL)',
  'Commercial Property',
  'Commercial Auto',
  'Workers Compensation',
  'Umbrella / Excess',
  'Professional Liability',
  'Sexual Misconduct Liability',
  'Student Accident',
];

test.describe('New Submission Form — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Select ALL available products in the multi-select dropdown', async ({ page }) => {
    // Navigate to New Submission form
    await page.getByRole('link', { name: /new submission/i }).click();

    // Step 1: Open the Product(s) dropdown
    await page.getByLabel(/product\(s\)|products/i).click();

    // Step 2: Select all 14 available products one by one
    for (const product of ALL_PRODUCTS) {
      await page.getByRole('option', { name: product }).click();
    }

    // Step 3: Observe product cards and UI layout — all 14 should appear as removable cards
    for (const product of ALL_PRODUCTS) {
      await expect(page.getByText(product)).toBeVisible();
    }

    // UI should not break — verify the form container is still rendered
    await expect(page.getByRole('button', { name: /create submission/i })).toBeVisible();

    // Submission summary should update with all product names
    const summary = page.locator('[data-testid="submission-summary"], .submission-summary');
    await expect(summary).toBeVisible();
  });
});

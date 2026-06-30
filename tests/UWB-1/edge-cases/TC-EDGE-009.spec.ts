// spec: test-artifacts/UWB-1/test-cases/edge-cases/new-submission-edge.md
// TC-EDGE-009: Upload multiple documents in a single submission

import { test, expect } from '@playwright/test';
import path from 'path';

const APP_URL = 'https://united-educators-application.vercel.app';

// Fixture files should be placed in tests/UWB-1/fixtures/
const FIXTURES_DIR = path.resolve(__dirname, '../fixtures');
const FILES = [
  path.join(FIXTURES_DIR, 'doc1.pdf'),
  path.join(FIXTURES_DIR, 'doc2.xlsx'),
  path.join(FIXTURES_DIR, 'doc3.docx'),
];

test.describe('New Submission Form — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Upload multiple documents in a single submission', async ({ page }) => {
    // Navigate to New Submission form
    await page.getByRole('link', { name: /new submission/i }).click();

    // Fill mandatory fields so the form is submittable
    await page.getByLabel(/submission type/i).click();
    await page.getByRole('option').first().click();

    await page.getByLabel(/account name/i).fill('Test Account');
    await page.getByRole('option').first().click();

    await page.getByLabel(/effective date/i).fill('01/01/2027');
    await page.getByLabel(/effective date/i).press('Tab');

    await page.getByLabel(/product\(s\)|products/i).click();
    await page.getByRole('option').first().click();

    // Step 1: Upload doc1.pdf
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(FILES[0]);
    await expect(page.getByText(/doc1\.pdf/i)).toBeVisible({ timeout: 10000 });

    // Step 2: Upload doc2.xlsx
    await fileInput.setInputFiles(FILES[1]);
    await expect(page.getByText(/doc2\.xlsx/i)).toBeVisible({ timeout: 10000 });

    // Step 3: Upload doc3.docx
    await fileInput.setInputFiles(FILES[2]);
    await expect(page.getByText(/doc3\.docx/i)).toBeVisible({ timeout: 10000 });

    // Step 4: Verify all three documents are listed in the Submission Documents section
    await expect(page.getByText(/doc1\.pdf/i)).toBeVisible();
    await expect(page.getByText(/doc2\.xlsx/i)).toBeVisible();
    await expect(page.getByText(/doc3\.docx/i)).toBeVisible();

    // Step 5: Submit the form
    await page.getByRole('button', { name: /create submission/i }).click();

    // Verify submission succeeds with all 3 documents attached
    await expect(
      page.getByText(/submission.*created|successfully created/i)
    ).toBeVisible({ timeout: 15000 });
  });
});

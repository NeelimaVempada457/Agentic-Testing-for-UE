// spec: test-artifacts/UWB-1/test-cases/positive/new-submission-positive.md

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Create New Submission — New Business', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  // TC-POS-001: Create New Business submission — all mandatory fields only
  test('Create New Business submission — all mandatory fields only', async ({ page }) => {
    // 1. Navigate to Submissions > New Submission
    await page.getByRole('link', { name: /submissions/i }).click();
    await page.getByRole('link', { name: /new submission/i }).click();

    // 2. Select "New Business" card
    await page.getByRole('button', { name: /new business/i }).click();

    // 3. Search and select "Riverside Unified School District"
    await page.getByLabel(/account/i).fill('Riverside Unified School District');
    await page.getByRole('option', { name: /riverside unified school district/i }).click();

    // 4. Set Effective Date to 2027-07-01 (Expiration auto-fills to 2028-07-01)
    await page.getByLabel(/effective date/i).fill('2027-07-01');

    // KNOWN DEFECT DISC-003: Need By Date must be entered manually
    // 5. Manually enter Need By Date = 2027-06-26 (workaround for DISC-003)
    await page.getByLabel(/need by date/i).fill('2027-06-26');

    // 6. Select "Educators Legal Liability (ELL) - ML"
    await page.getByLabel(/product/i).click();
    await page.getByRole('option', { name: /educators legal liability.*ell/i }).click();

    // 7. Upload test.pdf
    await page.getByLabel(/upload|document/i).setInputFiles('test.pdf');

    // 8. Click "Create Submission"
    await page.getByRole('button', { name: /create submission/i }).click();

    // Expected Result: Submission created; unique Submission ID displayed; no errors.
    await expect(page.getByText(/submission id/i)).toBeVisible();
    await expect(page.getByRole('alert')).not.toBeVisible();
  });
});

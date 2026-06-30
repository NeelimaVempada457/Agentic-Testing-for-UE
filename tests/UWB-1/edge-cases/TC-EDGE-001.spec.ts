// spec: test-artifacts/UWB-1/test-cases/edge-cases/new-submission-edge.md
// TC-EDGE-001: Set Effective Date first — Need By Date auto-populates to −5 days

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Set Effective Date first — Need By Date auto-populates to −5 days', async ({ page }) => {
    // Navigate to New Submission form
    await page.getByRole('link', { name: /new submission/i }).click();

    // Step 1: Leave Need By Date empty (verify it is empty)
    const needByDate = page.getByLabel(/need by date/i);
    await expect(needByDate).toHaveValue('');

    // Step 2: Set Effective Date to 02/10/2027
    await page.getByLabel(/effective date/i).fill('02/10/2027');
    await page.getByLabel(/effective date/i).press('Tab');

    // Step 3: Observe Need By Date — should auto-populate to 02/05/2027 (5 days before)
    await expect(needByDate).toHaveValue('02/05/2027');
  });
});

// spec: test-artifacts/UWB-1/test-cases/functional/new-submission-functional.md
// test case: NEWSUB-FUNC-010 | AC-07

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

const EXPECTED_STAGES = [
  // Intake & Triage
  'Incomplete Submission',
  'Complete Submission',
  'Declined to Quote',
  // Underwriting
  'Information Gathering',
  'Review In Progress',
  'Referred',
  // Quoting
  'Quote In Progress',
  'Quote Sent',
  'Quote Negotiation',
  'Revised Quote',
  // Decision
  'Bound',
  'UE Non-Renewed',
  'Member Declined',
  'Member No Response',
  // Post-Bind
  'Pending Issuance',
  'Issued',
  'Cancelled',
  'Endorsed',
];

test.describe('New Submission Form — Stage List of Values', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Stage LOV contains all 17 defined Submission Stage values', async ({ page }) => {
    // 2. Click the Current Stage dropdown
    const stageField = page.getByLabel(/current stage/i).or(page.getByLabel(/^stage$/i));
    await stageField.click();

    // 3. List all available options and verify each expected stage is present
    const options = stageField.locator('option');
    const optionTexts = await options.allTextContents();

    for (const stage of EXPECTED_STAGES) {
      expect(optionTexts.some(text => text.trim() === stage),
        `Stage "${stage}" should be present in the dropdown`
      ).toBeTruthy();
    }

    // 4. Verify exactly 17 stages (excluding any blank/placeholder option)
    const nonEmptyOptions = optionTexts.filter(t => t.trim() !== '');
    expect(nonEmptyOptions.length).toBe(17);
  });
});

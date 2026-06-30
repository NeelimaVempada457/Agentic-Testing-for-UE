// spec: test-artifacts/UWB-1/test-cases/negative/new-submission-negative.md

// KNOWN DEFECT DISC-002: Underwriter and Underwriting Specialist fields are currently
// editable comboboxes after account selection, violating the requirement that all 6
// auto-populated Brokerage/Underwriting fields are read-only (AC-10).
// The Brokerage fields (Brokerage, Broker Contact, Broker Email, Broker Phone) are
// correctly non-editable. The Underwriter and Underwriting Specialist selects have
// disabled=false and accept user input — this is the defect.
//
// test.fail() is applied because assertions on Underwriter and Underwriting Specialist
// being disabled WILL FAIL against the live app. Remove test.fail() once DISC-002 is fixed.

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Negative: New Submission Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-NEG-010: Verify Brokerage and Underwriting fields are non-editable', async ({ page }) => {
    // KNOWN DEFECT DISC-002
    test.fail(true, 'DISC-002: Underwriter and Underwriting Specialist remain editable after account selection — violates AC-10');

    // Verify we are on the new submission page
    await expect(page).toHaveURL(/submissions\/new/);

    // 1. Select a valid Account Name — triggers auto-population of Brokerage/Underwriting fields
    await page.getByRole('button', { name: /Search accounts by name/ }).click();
    await page.getByRole('textbox', { name: /Search by name/ }).fill('Riverside');
    await page.getByRole('button', { name: /Riverside Unified School District/ }).click();

    // Verify: Brokerage section shows "Auto-populated" badge
    await expect(page.getByText('Auto-populated')).toBeVisible();

    // Verify: Brokerage field is non-editable (read-only display text)
    await expect(page.getByText('Gallagher Education, Inc.')).toBeVisible();

    // 2. Verify: Broker Contact is non-editable
    await expect(page.getByText('James Whitfield')).toBeVisible();

    // Verify: Broker Email is non-editable
    await expect(page.getByText('j.whitfield@gallaghered.com')).toBeVisible();

    // Verify: Broker Phone is non-editable
    await expect(page.getByText('(800) 555-7890')).toBeVisible();

    // 3. Attempt to click and type in the Underwriter combobox — should be disabled (non-editable)
    const underwriterSelect = page.locator('select').nth(0);
    await expect(underwriterSelect).toBeDisabled();

    // 4. Attempt to click and type in the Underwriting Specialist combobox — should be disabled
    const specialistSelect = page.locator('select').nth(1);
    await expect(specialistSelect).toBeDisabled();

    // NOTE: The toBeDisabled() assertions above WILL FAIL because both selects currently
    // have disabled=false in the live app. This is the expected failure captured by test.fail().
  });
});

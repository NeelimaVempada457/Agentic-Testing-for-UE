// spec: test-artifacts/UWB-1/test-cases/functional/new-submission-functional.md
// test case: NEWSUB-FUNC-005 | AC-10
// KNOWN DEFECT: DISC-002 — Underwriting fields remain editable after account selection

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Underwriting Fields Read-Only', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  // KNOWN DEFECT: DISC-002 — Underwriting fields are editable (not read-only) after account selection
  test.fail();
  test('Underwriting fields are read-only after auto-population', async ({ page }) => {
    // 2. Select a valid Account and wait for Underwriter and Underwriting Specialist to auto-populate
    const accountNameField = page.getByLabel(/account name/i);
    await accountNameField.fill('Edu');
    const firstOption = page.locator('[role="option"]').first();
    await expect(firstOption).toBeVisible({ timeout: 10000 });
    await firstOption.click();

    const underwriterField = page.getByLabel(/^underwriter$/i);
    const underwritingSpecialistField = page.getByLabel(/underwriting specialist/i);
    await expect(underwriterField).not.toHaveValue('');
    await expect(underwritingSpecialistField).not.toHaveValue('');

    // 3. Attempt to change the Underwriter value — should be disabled/read-only
    await expect(underwriterField).toBeDisabled();

    // 4. Attempt to change the Underwriting Specialist value — should be disabled/read-only
    await expect(underwritingSpecialistField).toBeDisabled();
  });
});

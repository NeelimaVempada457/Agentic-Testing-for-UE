// spec: test-artifacts/UWB-1/test-cases/functional/new-submission-functional.md
// test case: NEWSUB-FUNC-008
// KNOWN DEFECT: DISC-003 — Need By Date does not auto-populate when Effective Date is set

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Need By Date Auto-Default', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  // KNOWN DEFECT: DISC-003 — Need By Date auto-population logic not triggered after Effective Date is set
  test.fail();
  test('Need By Date auto-defaults to Effective Date − 5 days', async ({ page }) => {
    // 2. Set Effective Date to 2027-06-15
    const effectiveDateField = page.getByLabel(/effective date/i);
    await effectiveDateField.fill('2027-06-15');
    await effectiveDateField.blur();

    // 3. Observe Need By Date field — expected to auto-populate to 2027-06-10
    const needByDateField = page.getByLabel(/need by date/i);
    await expect(needByDateField).toHaveValue('2027-06-10', { timeout: 3000 });
  });
});

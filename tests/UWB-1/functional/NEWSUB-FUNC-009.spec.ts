// spec: test-artifacts/UWB-1/test-cases/functional/new-submission-functional.md
// test case: NEWSUB-FUNC-009 | AC-07, AC-13

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Current Stage Default', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Current Stage defaults to "Incomplete Submission" and is editable', async ({ page }) => {
    // 2. Verify Stage field default value is "Incomplete Submission"
    const stageField = page.getByLabel(/current stage/i).or(page.getByLabel(/^stage$/i));
    await expect(stageField).toHaveValue(/incomplete submission/i);

    // 3. Click Stage dropdown and change to "Information Gathering"
    await stageField.selectOption({ label: 'Information Gathering' });

    // 4. Verify change is accepted
    await expect(stageField).toHaveValue(/information gathering/i);
  });
});

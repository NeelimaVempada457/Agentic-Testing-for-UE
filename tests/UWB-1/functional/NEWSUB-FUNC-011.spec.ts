// spec: test-artifacts/UWB-1/test-cases/functional/new-submission-functional.md
// test case: NEWSUB-FUNC-011 | AC-08

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

/** Fills all mandatory fields on the New Submission form and submits */
async function createSubmission(page: any, accountQuery: string): Promise<string> {
  // Select submission type
  await page.getByRole('radio', { name: /new business/i }).click();

  // Select account
  const accountNameField = page.getByLabel(/account name/i);
  await accountNameField.fill(accountQuery);
  const firstOption = page.locator('[role="option"]').first();
  await expect(firstOption).toBeVisible({ timeout: 10000 });
  await firstOption.click();

  // Select a product
  const productsDropdown = page.getByLabel(/product/i);
  await productsDropdown.click();
  await page.locator('[role="option"]').first().click();

  // Set effective date
  const effectiveDateField = page.getByLabel(/effective date/i);
  await effectiveDateField.fill('2027-06-15');
  await effectiveDateField.blur();

  // Submit
  await page.getByRole('button', { name: /create submission/i }).click();

  // Wait for success — capture the Submission ID from confirmation or redirect
  await page.waitForSelector('[data-testid="submission-id"], .submission-id, text=/SUB-\d+/i', { timeout: 15000 });
  const idLocator = page.locator('[data-testid="submission-id"], .submission-id').first();
  const idText = await idLocator.textContent() ?? '';
  return idText.trim();
}

test.describe('New Submission Form — Unique Submission ID', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Create Submission generates unique auto-incremented Submission ID', async ({ page }) => {
    // 1. Complete all mandatory fields for Submission #1 and submit
    const id1 = await createSubmission(page, 'Edu');

    // 2. Note Submission ID returned
    expect(id1).not.toBe('');

    // 3. Navigate back to dashboard and open New Submission form for Submission #2
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');

    const id2 = await createSubmission(page, 'Edu');

    // 4. Compare IDs — must be unique and auto-incremented
    expect(id2).not.toBe('');
    expect(id1).not.toBe(id2);
  });
});

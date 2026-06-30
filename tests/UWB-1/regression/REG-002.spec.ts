// spec: test-artifacts/UWB-1/test-cases/regression/new-submission-regression.md
// regression-target: D-06 partial fix — .jpg/.jpeg added to accept attribute

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Regression — UWB-1: New Submission Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('REG-002: .jpg/.jpeg accepted in file picker', async ({ page }) => {
    // 2. Click the document upload area and inspect the file input accept attribute
    const fileInput = page.locator('input[type="file"]');
    await expect(fileInput).toBeAttached();

    const acceptAttr = await fileInput.getAttribute('accept');
    expect(acceptAttr).toBeTruthy();

    // 3. Verify accept attribute includes .jpg and .jpeg
    expect(acceptAttr).toContain('.jpg');
    expect(acceptAttr).toContain('.jpeg');
  });
});

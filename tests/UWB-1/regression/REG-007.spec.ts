// spec: test-artifacts/UWB-1/test-cases/regression/new-submission-regression.md
// regression-target: DISC-005 open defect — .doc extension still absent from file picker accept attribute
// KNOWN DEFECT: DISC-005

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Regression — UWB-1: New Submission Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  // KNOWN DEFECT: DISC-005
  test.fail();
  test('REG-007: .doc extension still absent from file picker (open defect DISC-005)', async ({ page }) => {
    // 2. Locate the document upload file input
    const fileInput = page.locator('input[type="file"]');
    await expect(fileInput).toBeAttached();

    // 3. Inspect accept attribute — per spec .doc should be present alongside .pdf, .docx, .xlsx, .jpg, .png
    const acceptAttr = await fileInput.getAttribute('accept');
    expect(acceptAttr).toBeTruthy();

    // Verify all required types are present including .doc
    expect(acceptAttr).toContain('.pdf');
    expect(acceptAttr).toContain('.docx');
    expect(acceptAttr).toContain('.xlsx');
    expect(acceptAttr).toContain('.jpg');
    expect(acceptAttr).toContain('.png');
    expect(acceptAttr).toContain('.doc');
  });
});

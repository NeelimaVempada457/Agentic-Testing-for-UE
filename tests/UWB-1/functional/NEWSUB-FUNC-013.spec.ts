// spec: test-artifacts/UWB-1/test-cases/functional/new-submission-functional.md
// test case: NEWSUB-FUNC-013
// KNOWN DEFECT: DISC-005 — .doc extension absent from file picker; UI hint text incomplete
// Status: PARTIAL FAIL — .pdf, .docx, .xlsx, .jpg, .png pass; .doc fails

import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import os from 'os';

const APP_URL = 'https://united-educators-application.vercel.app';

/** Creates a temporary dummy file with the given extension for upload testing */
function createTempFile(ext: string): string {
  const tmpDir = os.tmpdir();
  const filePath = path.join(tmpDir, `test-upload${ext}`);
  fs.writeFileSync(filePath, `dummy content for ${ext} upload test`);
  return filePath;
}

test.describe('New Submission Form — Document Upload Extensions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  // KNOWN DEFECT: DISC-005 — .doc extension is rejected or not presented in the file picker
  test.fail();
  test('Document upload accepts all allowed extensions', async ({ page }) => {
    const allowedExtensions = ['.pdf', '.doc', '.docx', '.xlsx', '.jpg', '.png'];
    const uploadInput = page.locator('input[type="file"]');

    for (const ext of allowedExtensions) {
      const tempFile = createTempFile(ext);

      // Upload one file of each type
      await uploadInput.setInputFiles(tempFile);

      // Verify file appears in the upload list without error
      const fileName = path.basename(tempFile);
      await expect(
        page.locator(`text=${fileName}`).or(page.locator('[data-testid*="uploaded-file"]')).first()
      ).toBeVisible({ timeout: 5000 });

      // Clean up the temp file
      fs.unlinkSync(tempFile);
    }
  });
});

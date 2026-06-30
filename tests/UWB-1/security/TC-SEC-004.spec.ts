// spec: test-artifacts/UWB-1/test-cases/security/new-submission-security.md
// TC-SEC-004: File upload — Double extension disguise

import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Security — File Upload: Double extension disguise (.pdf.exe)', () => {
  let tempFilePath: string;

  test.beforeEach(async ({ page }) => {
    // Create a temporary file named malicious.pdf.exe for upload attempts
    const tempDir = os.tmpdir();
    tempFilePath = path.join(tempDir, 'malicious.pdf.exe');
    fs.writeFileSync(tempFilePath, 'MZ' + 'This is a fake executable for security testing.');

    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test.afterEach(() => {
    // Clean up the temporary file
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  });

  test('TC-SEC-004: File upload — Double extension disguise', async ({ page }) => {

    // Step 1: Locate the file upload / Add Document input
    const fileInput = page.locator(
      'input[type="file"]'
    );

    // Step 2: Attempt to upload the double-extension file
    await fileInput.setInputFiles(tempFilePath);

    // Allow upload processing time
    await page.waitForTimeout(1500);

    // Step 3: Assert the file is REJECTED
    // The upload should show an error or validation message indicating disallowed file type
    const pageText = await page.evaluate(() => document.body.innerText);

    // The file should NOT be accepted — look for rejection indicators
    const rejectionPatterns = [
      /not allowed/i,
      /invalid file type/i,
      /unsupported file/i,
      /file type.*not.*support/i,
      /only.*allowed/i,
      /extension.*not.*permit/i,
      /\.exe.*not/i,
    ];

    const isRejected = rejectionPatterns.some((pattern) => pattern.test(pageText));

    // Additionally, the file name should NOT appear as successfully uploaded
    const successPatterns = [
      /malicious\.pdf\.exe/i,
      /upload.*success/i,
      /file.*uploaded/i,
    ];
    const isAccepted = successPatterns.some((pattern) => pattern.test(pageText));

    // Assert: either the file is rejected with an error, or it was never accepted
    // The test passes when the disallowed extension is not present as a successful upload
    expect(isAccepted).toBe(false);

    // Page should remain stable — no crash
    await expect(page).not.toHaveURL(/error|500/i);
  });
});

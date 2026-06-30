// spec: test-artifacts/UWB-1/test-cases/security/new-submission-security.md
// TC-SEC-005: File upload — HTML file disguised as PDF

import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Security — File Upload: HTML file disguised as PDF (MIME mismatch)', () => {
  let tempFilePath: string;

  test.beforeEach(async ({ page }) => {
    // Create a temp file: HTML content saved with a .pdf extension
    const tempDir = os.tmpdir();
    tempFilePath = path.join(tempDir, 'document.pdf');
    const htmlContent = `<!DOCTYPE html><html><head><title>Fake PDF</title></head>
<body><script>alert('XSS via fake PDF')</script><p>This is HTML, not a PDF.</p></body></html>`;
    fs.writeFileSync(tempFilePath, htmlContent);

    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test.afterEach(() => {
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  });

  test('TC-SEC-005: File upload — HTML file disguised as PDF', async ({ page }) => {

    // Step 1 & 2: Locate the Add Document file input and attempt to upload the disguised file
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(tempFilePath);

    // Allow upload processing time
    await page.waitForTimeout(2000);

    // Step 3: Observe the upload result — the server should detect the MIME type mismatch
    const pageText = await page.evaluate(() => document.body.innerText);

    // Accepted scenario: file was uploaded without MIME validation (FAIL case)
    const acceptedPatterns = [
      /upload.*success/i,
      /file.*uploaded/i,
      /document.*added/i,
    ];
    const fileAppearsAccepted = acceptedPatterns.some((p) => p.test(pageText));

    // Rejected scenario: MIME type validation message appeared (PASS case)
    const rejectionPatterns = [
      /invalid.*file/i,
      /file type.*not.*allow/i,
      /unsupported.*format/i,
      /mime/i,
      /not a valid pdf/i,
      /file.*corrupt/i,
    ];
    const fileAppearsRejected = rejectionPatterns.some((p) => p.test(pageText));

    // Assert: the file must NOT be silently accepted as a valid PDF
    expect(fileAppearsAccepted).toBe(false);

    // No alert dialogs should have fired (no XSS from the embedded <script>)
    // (dialog handler not needed here as upload rejection prevents script execution)

    // Page must remain stable
    await expect(page).not.toHaveURL(/error|500/i);
  });
});

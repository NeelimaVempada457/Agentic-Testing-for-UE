// spec: test-artifacts/UWB-1/test-cases/boundary/new-submission-boundary.md
// TC-BOUND-012: All mandatory fields filled except exactly one (boundary exclusion)

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

/**
 * Helper: fill all mandatory fields on the New Submission form with valid data.
 * Returns the page after all fields are populated.
 */
async function fillAllMandatoryFields(page: import('@playwright/test').Page) {
  await page.getByLabel(/submission type/i).selectOption({ index: 1 });
  await page.getByLabel(/account name/i).fill('Test Boundary Account');
  await page.getByLabel(/effective date/i).fill('2027-06-01');
  await page.getByLabel(/expiration date/i).fill('2028-06-01');
  await page.getByLabel(/need by date/i).fill('2027-05-31');

  // Products — select at least one checkbox or option
  const productOption = page.getByRole('checkbox').first();
  if (await productOption.isVisible().catch(() => false)) {
    await productOption.check();
  }

  // Add Document — attach a minimal file
  const fileInput = page.locator('input[type="file"]');
  if (await fileInput.isVisible().catch(() => false)) {
    await fileInput.setInputFiles({
      name: 'boundary-doc.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('%PDF-1.4\n1 0 obj\n<</Type /Catalog>>\nendobj\n'),
    });
  }
}

test.describe('Boundary: New Submission Form — Mandatory Field Exclusion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  // --- Sub-test 1: Clear Submission Type ---
  test('TC-BOUND-012a: Submission without Submission Type shows validation error', async ({ page }) => {
    await page.getByRole('link', { name: /new submission/i }).click();
    await fillAllMandatoryFields(page);

    // Clear Submission Type
    const submissionType = page.getByLabel(/submission type/i);
    await submissionType.selectOption('');

    await page.getByRole('button', { name: /create submission/i }).click();

    await expect(
      page.getByText(/submission type.*required/i)
        .or(page.getByText(/please select.*submission type/i))
        .or(page.getByRole('alert'))
    ).toBeVisible({ timeout: 10000 });
    await expect(page).not.toHaveURL(/confirmation|success/i);
  });

  // --- Sub-test 2: Clear Account Name ---
  test('TC-BOUND-012b: Submission without Account Name shows validation error', async ({ page }) => {
    await page.getByRole('link', { name: /new submission/i }).click();
    await fillAllMandatoryFields(page);

    // Clear Account Name
    await page.getByLabel(/account name/i).fill('');

    await page.getByRole('button', { name: /create submission/i }).click();

    await expect(
      page.getByText(/account name.*required/i)
        .or(page.getByText(/please.*account/i))
        .or(page.getByRole('alert'))
    ).toBeVisible({ timeout: 10000 });
    await expect(page).not.toHaveURL(/confirmation|success/i);
  });

  // --- Sub-test 3: Clear Need By Date ---
  test('TC-BOUND-012c: Submission without Need By Date shows validation error', async ({ page }) => {
    await page.getByRole('link', { name: /new submission/i }).click();
    await fillAllMandatoryFields(page);

    // Clear Need By Date
    await page.getByLabel(/need by date/i).fill('');

    await page.getByRole('button', { name: /create submission/i }).click();

    await expect(
      page.getByText(/need by date.*required/i)
        .or(page.getByText(/please.*need by/i))
        .or(page.getByRole('alert'))
    ).toBeVisible({ timeout: 10000 });
    await expect(page).not.toHaveURL(/confirmation|success/i);
  });

  // --- Sub-test 4: Clear Effective Date ---
  test('TC-BOUND-012d: Submission without Effective Date shows validation error', async ({ page }) => {
    await page.getByRole('link', { name: /new submission/i }).click();
    await fillAllMandatoryFields(page);

    // Clear Effective Date
    await page.getByLabel(/effective date/i).fill('');

    await page.getByRole('button', { name: /create submission/i }).click();

    await expect(
      page.getByText(/effective date.*required/i)
        .or(page.getByText(/please.*effective date/i))
        .or(page.getByRole('alert'))
    ).toBeVisible({ timeout: 10000 });
    await expect(page).not.toHaveURL(/confirmation|success/i);
  });

  // --- Sub-test 5: Clear Expiration Date ---
  test('TC-BOUND-012e: Submission without Expiration Date shows validation error', async ({ page }) => {
    await page.getByRole('link', { name: /new submission/i }).click();
    await fillAllMandatoryFields(page);

    // Clear Expiration Date
    await page.getByLabel(/expiration date/i).fill('');

    await page.getByRole('button', { name: /create submission/i }).click();

    await expect(
      page.getByText(/expiration date.*required/i)
        .or(page.getByText(/please.*expiration date/i))
        .or(page.getByRole('alert'))
    ).toBeVisible({ timeout: 10000 });
    await expect(page).not.toHaveURL(/confirmation|success/i);
  });

  // --- Sub-test 6: Clear Products ---
  test('TC-BOUND-012f: Submission without Product(s) shows validation error', async ({ page }) => {
    await page.getByRole('link', { name: /new submission/i }).click();
    await fillAllMandatoryFields(page);

    // Uncheck all product checkboxes
    const productCheckboxes = page.getByRole('checkbox');
    const count = await productCheckboxes.count();
    for (let i = 0; i < count; i++) {
      const cb = productCheckboxes.nth(i);
      if (await cb.isChecked()) {
        await cb.uncheck();
      }
    }

    await page.getByRole('button', { name: /create submission/i }).click();

    await expect(
      page.getByText(/product.*required/i)
        .or(page.getByText(/please select.*product/i))
        .or(page.getByRole('alert'))
    ).toBeVisible({ timeout: 10000 });
    await expect(page).not.toHaveURL(/confirmation|success/i);
  });

  // --- Sub-test 7: No Document attached ---
  test('TC-BOUND-012g: Submission without Add Document shows validation error', async ({ page }) => {
    await page.getByRole('link', { name: /new submission/i }).click();

    // Fill all fields EXCEPT the document upload
    await page.getByLabel(/submission type/i).selectOption({ index: 1 });
    await page.getByLabel(/account name/i).fill('Test Boundary Account');
    await page.getByLabel(/effective date/i).fill('2027-06-01');
    await page.getByLabel(/expiration date/i).fill('2028-06-01');
    await page.getByLabel(/need by date/i).fill('2027-05-31');
    const productOption = page.getByRole('checkbox').first();
    if (await productOption.isVisible().catch(() => false)) {
      await productOption.check();
    }
    // Intentionally skip document upload

    await page.getByRole('button', { name: /create submission/i }).click();

    await expect(
      page.getByText(/document.*required/i)
        .or(page.getByText(/please.*add.*document/i))
        .or(page.getByText(/attach.*document/i))
        .or(page.getByRole('alert'))
    ).toBeVisible({ timeout: 10000 });
    await expect(page).not.toHaveURL(/confirmation|success/i);
  });
});

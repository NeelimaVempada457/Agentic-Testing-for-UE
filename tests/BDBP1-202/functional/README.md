# BDBP1-202 Functional Test Suite

## Overview
This test suite validates the functional requirements of the Instruction Section page for BDBP1-202.

## Test Cases

| Test ID | Description | File Path |
|---------|-------------|-----------|
| INSTR-FUNC-001 | CARICOM accordion shows correct identification and address requirements | `INSTR-FUNC-001.spec.ts` |
| INSTR-FUNC-002 | Non-Nationals accordion shows 2 government IDs and address proof requirements | `INSTR-FUNC-002.spec.ts` |
| INSTR-FUNC-003 | Self-Employed accordion shows differentiated ID requirements | `INSTR-FUNC-003.spec.ts` |
| INSTR-FUNC-004 | General Instructions section displays all 4 mandatory bullet points | `INSTR-FUNC-004.spec.ts` |
| INSTR-FUNC-005 | Product description shows correct Ordinary Savings features and benefits | `INSTR-FUNC-005.spec.ts` |
| INSTR-FUNC-006 | Instructions displayed are specific to the selected product (Loans) | `INSTR-FUNC-006.spec.ts` |
| INSTR-FUNC-007 | Back to Home button returns user to the home page | `INSTR-FUNC-007.spec.ts` |
| INSTR-FUNC-008 | BOSL branding is consistent on the Instruction Section page | `INSTR-FUNC-008.spec.ts` |

## Prerequisites
- Node.js (v16 or higher)
- Playwright installed: `npm install -D @playwright/test`

## Configuration Required

Before running the tests, update the following in your `playwright.config.ts`:

1. **Base URL**: Update the base URL to match your application URL
2. **Selectors**: Update data-testid attributes or selectors to match your actual DOM structure
3. **Test Data**: Update expected text patterns to match your actual content

## Running the Tests

### Run all functional tests for BDBP1-202:
```bash
npx playwright test tests/BDBP1-202/functional
```

### Run a specific test:
```bash
npx playwright test tests/BDBP1-202/functional/INSTR-FUNC-001.spec.ts
```

### Run tests in UI mode (recommended for debugging):
```bash
npx playwright test --ui
```

### Run tests in headed mode:
```bash
npx playwright test tests/BDBP1-202/functional --headed
```

### Run tests with specific browser:
```bash
npx playwright test tests/BDBP1-202/functional --project=chromium
```

## Test Structure

Each test follows this structure:
1. **Navigation**: Navigate to the Instruction Section page
2. **Action**: Perform the required action (click, select, etc.)
3. **Verification**: Assert expected behavior and content

## Customization Notes

### Selectors
The tests use multiple selector strategies for resilience:
- `data-testid` attributes (recommended)
- Accessibility roles and labels
- CSS selectors (fallback)

Update these based on your actual implementation.

### Expected Content
Update the text patterns in assertions to match your exact content:
- Accordion content text
- Button labels
- Section headers
- Product descriptions

### Timeouts
Default timeouts are set in the config. Adjust if needed for slower environments.

## Best Practices Implemented

1. **Resilient Selectors**: Uses multiple selector strategies with `.or()` locators
2. **Accessibility**: Prioritizes role-based selectors (buttons, links, regions)
3. **Explicit Waits**: Uses Playwright's auto-waiting with explicit assertions
4. **Clear Comments**: Each step is documented with intent
5. **Modular Structure**: Each test is independent and can run in isolation
6. **Type Safety**: Written in TypeScript for better IDE support

## Troubleshooting

### Test Failures
- Verify the base URL is correct
- Check that selectors match your DOM structure
- Ensure the page is fully loaded before interactions
- Review screenshots/videos in `test-results/` folder

### Timeout Issues
- Increase timeout in `playwright.config.ts`
- Check network conditions
- Verify application performance

## Reporting

Generate HTML report after test run:
```bash
npx playwright show-report
```

## CI/CD Integration

Add to your CI pipeline:
```yaml
- name: Run Playwright Tests
  run: npx playwright test tests/BDBP1-202/functional
```

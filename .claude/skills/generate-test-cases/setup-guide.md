# Setup Guide — Generate Test Cases Skill

## System Requirements

| Requirement | Version | Notes |
|---|---|---|
| Node.js | 18.x or higher | Required for Playwright |
| npm | 8.x or higher | Package manager |
| Claude Code CLI | Latest | The skill host |
| Playwright | 1.40.0 or higher | Browser automation |
| Playwright browsers | Latest | Chromium, Firefox, WebKit |

---

## Step 1 — Verify Claude Code Installation

```bash
# Check Claude Code version
claude --version

# If not installed, install it
npm install -g @anthropic-ai/claude-code
```

---

## Step 2 — Verify Playwright Installation

```bash
# Check if Playwright is installed in your project
npx playwright --version

# If not installed
npm install -D @playwright/test

# Install browser binaries
npx playwright install

# Or install specific browsers only
npx playwright install chromium firefox webkit
```

---

## Step 3 — Verify Playwright-Test-Planner MCP Server

The skill requires the Playwright-Test-Planner MCP server to be configured.

Check your `.mcp.json` file in the project root:
```json
{
  "mcpServers": {
    "playwright-test": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

If the Playwright-Test-Planner is not configured, add it to `.mcp.json`:
```bash
# Verify the MCP server is available
npx @playwright/mcp --help
```

---

## Step 4 — Configure Environment Variables (Optional)

Create or update `.env` in the project root for default values:

```env
# Application under test
APP_URL=https://your-application.com
ENV_TYPE=QA

# Authentication (optional — can be provided interactively)
AUTH_USERNAME=your-test-username
AUTH_PASSWORD=your-test-password

# Test configuration
DEFAULT_BROWSER=chromium
HEADLESS=true
SLOW_MO=0

# Output paths (defaults shown)
TEST_ARTIFACTS_DIR=test-artifacts
FEATURES_DIR=features
```

> **Security Note:** Never commit credentials to version control. Add `.env` to `.gitignore`.

---

## Step 5 — Verify Skill Installation

The skill file should be located at:
```
.claude/skills/generate-test-cases.md
```

Verify in Claude Code by running:
```
/generate-test-cases
```

If the skill is not found, check:
1. The file exists at `.claude/skills/generate-test-cases.md`
2. Claude Code is running from the correct project directory
3. Claude Code has read access to the `.claude/skills/` directory

---

## Step 6 — Configure Playwright for the Project

Ensure `playwright.config.js` in the project root is correctly configured:

```javascript
// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 1,
  use: {
    baseURL: process.env.APP_URL || 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile responsive
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 13'] },
    },
  ],
});
```

---

## Step 7 — Verify Directory Permissions

Ensure Claude Code can write to the following directories:
```bash
# The skill will create these — verify the parent directory is writable
ls -la test-artifacts/ 2>/dev/null || echo "Will be created by skill"
ls -la features/ 2>/dev/null || echo "Will be created by skill"
```

---

## Running the Skill

### Basic Execution
```
/generate-test-cases
```

### What Happens During Execution
1. **Interactive questionnaire** — Claude asks 9 questions about your application
2. **Directory setup** — Output folders are created automatically
3. **Application analysis** — Playwright navigates and maps your application
4. **Test case generation** — All scenario categories are generated
5. **Gherkin generation** — Feature files are created for each test case
6. **Reports** — Coverage and risk reports are produced
7. **Summary** — Final summary is displayed with artifact locations

### Expected Runtime
| Application Complexity | Estimated Time |
|---|---|
| Simple (< 5 pages) | 2–5 minutes |
| Medium (5–20 pages) | 5–15 minutes |
| Complex (20+ pages) | 15–45 minutes |
| Enterprise (50+ pages) | 45–120 minutes |

---

## Verifying Output

After execution, verify these key files exist:

```bash
# Application analysis
cat test-artifacts/application-analysis/detected-modules.md
cat test-artifacts/application-analysis/app-flow-analysis.md

# Test cases (count files generated)
find test-artifacts/test-cases -name "*.md" | wc -l

# Feature files
find features -name "*.feature" | wc -l

# Reports
cat test-artifacts/reports/coverage-report.md
cat test-artifacts/reports/risk-analysis.md

# Execution log
cat test-artifacts/logs/execution.log
```

---

## Integration with CI/CD

Add the following to your CI pipeline to run generated Playwright tests:

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npx playwright test
        env:
          APP_URL: ${{ secrets.APP_URL }}
          AUTH_USERNAME: ${{ secrets.AUTH_USERNAME }}
          AUTH_PASSWORD: ${{ secrets.AUTH_PASSWORD }}
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Troubleshooting Installation

### Skill Not Found
```bash
# Verify file exists
ls -la .claude/skills/generate-test-cases.md

# Verify Claude Code sees it
claude /help
```

### Playwright Browser Not Found
```bash
npx playwright install --with-deps chromium
```

### MCP Server Not Connecting
```bash
# Restart Claude Code to reload MCP configuration
# Check .mcp.json syntax is valid JSON
cat .mcp.json | python3 -m json.tool
```

### Permission Denied Writing Artifacts
```bash
# Windows (PowerShell)
icacls test-artifacts /grant Users:F /T

# macOS/Linux
chmod -R 755 test-artifacts
```

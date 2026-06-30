<!--
  ╔══════════════════════════════════════════════════════════════════════════════════╗
  ║        AGENTIC QA AUTOMATION PLATFORM — TECHNICAL ARCHITECTURE                  ║
  ║        First Project Agentic  ·  v2.0  ·  Powered by Claude Code               ║
  ╚══════════════════════════════════════════════════════════════════════════════════╝
-->

# Agentic QA Automation Platform
## Technical Architecture — v2.0

> **Platform Summary**
> An enterprise-grade, AI-first QA automation platform that replaces manual test case writing, defect analysis, and test script authoring. Powered by Claude Code skills, Playwright browser automation, and deep Jira requirements traceability — delivering full-coverage test suites, Gherkin BDD scenarios, and Jira-linked defect reports from a single slash command.

---

## Architecture Overview

```
╔══════════════════════════════════════════════════════════════════════════════╗
║  LAYER 1 — USER EXPERIENCE & IDE INTERFACE                                  ║
║  Developer / QA Engineer  ·  VS Code / JetBrains  ·  Claude Code Extension  ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  ┌────────────────────┐  ┌──────────────────────┐  ┌─────────────────────┐  ║
║  │   CLAUDE CODE      │  │   SLASH COMMANDS      │  │  HUMAN REVIEW LOOP  │  ║
║  │   CLI / IDE EXT    │  │                      │  │                     │  ║
║  │  ──────────────    │  │ /fetch-jira-details  │  │ APPROVE  →  refine  │  ║
║  │  Interactive       │  │ /generate-test-cases │  │ EXCLUDE  →  remove  │  ║
║  │  Questionnaire     │  │ /generate-gherkin    │  │ MERGE    →  combine │  ║
║  │  Multi-step        │  │ /early-defect-       │  │ UPDATE   →  edit    │  ║
║  │  Workflow Engine   │  │   consolidator       │  │ COMMENT  →  note    │  ║
║  │  Context Window    │  │                      │  │ FINAL_APPROVE       │  ║
║  └────────────────────┘  └──────────────────────┘  │  └──▶ Jira bug     │  ║
║                                                     └─────────────────────┘  ║
║  ┌──────────────────────────────────────────────────────────────────────┐    ║
║  │  CONFIGURATION  ·  .env  ·  CLAUDE.md  ·  .claude/settings.local   │    ║
║  │  Credentials · Project Rules · Permission Allowlist · Memory System  │    ║
║  └──────────────────────────────────────────────────────────────────────┘    ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                  ↕  Prompt / Response  ·  Tool Calls  ·  Artifacts           ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  LAYER 2 — AI ORCHESTRATION ENGINE                                           ║
║  Claude claude-sonnet-4-6  ·  Skills  ·  Agents  ·  MCP Servers            ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  ┌─────────────────────────────────────────────────────────────────────┐    ║
║  │  SKILLS ENGINE  ·  .claude/skills/  +  .claude/commands/           │    ║
║  │                                                                     │    ║
║  │  ┌───────────────────┐  ┌───────────────────┐                      │    ║
║  │  │ fetch-jira-details│  │generate-test-cases│                      │    ║
║  │  │ ────────────────  │  │ ────────────────  │                      │    ║
║  │  │ 5-script engine   │  │ 9-step workflow   │                      │    ║
║  │  │ ADF→Markdown      │  │ JIRA+URL mode     │                      │    ║
║  │  │ Retry + backoff   │  │ Screenshot capture│                      │    ║
║  │  │ SHA-256 dedup     │  │ 9 test categories │                      │    ║
║  │  │ Batch tickets     │  │ Gherkin + RTM     │                      │    ║
║  │  └───────────────────┘  └───────────────────┘                      │    ║
║  │                                                                     │    ║
║  │  ┌───────────────────┐  ┌───────────────────┐                      │    ║
║  │  │ generate-gherkin  │  │ early-defect-     │                      │    ║
║  │  │ ────────────────  │  │ consolidator      │                      │    ║
║  │  │ AC→BDD transform  │  │ ────────────────  │                      │    ║
║  │  │ Scenario Outline  │  │ 10-step pipeline  │                      │    ║
║  │  │ Risk analysis     │  │ AC validation     │                      │    ║
║  │  │ Coverage JSON     │  │ Human-gated bug   │                      │    ║
║  │  └───────────────────┘  └───────────────────┘                      │    ║
║  └─────────────────────────────────────────────────────────────────────┘    ║
║                                                                              ║
║  ┌─────────────────────────────────────────────────────────────────────┐    ║
║  │  AGENT FLEET  ·  Specialized Subagent Types                        │    ║
║  │                                                                     │    ║
║  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │    ║
║  │  │ Playwright-     │  │ Playwright-     │  │ Playwright-     │    │    ║
║  │  │ Test-Planner    │  │ Test-Generator  │  │ Test-Healer     │    │    ║
║  │  │ ─────────────   │  │ ─────────────   │  │ ─────────────   │    │    ║
║  │  │ Live app crawl  │  │ .feature→.spec  │  │ Failing test    │    │    ║
║  │  │ Page inventory  │  │ Playwright TS   │  │ auto-diagnosis  │    │    ║
║  │  │ Form analysis   │  │ code generation │  │ Locator repair  │    │    ║
║  │  │ Discrepancy det.│  │ POM patterns    │  │ Selector regen  │    │    ║
║  │  │ Screenshot cap. │  │ Assertions      │  │ Re-run verify   │    │    ║
║  │  └─────────────────┘  └─────────────────┘  └─────────────────┘    │    ║
║  └─────────────────────────────────────────────────────────────────────┘    ║
║                                                                              ║
║  ┌─────────────────────────────────────────────────────────────────────┐    ║
║  │  MCP SERVER  ·  playwright-test  ·  50+ browser tool functions     │    ║
║  │  npx playwright run-test-mcp-server  ·  .mcp.json                  │    ║
║  │  navigate · snapshot · screenshot · click · fill · evaluate        │    ║
║  │  planner_setup · test_run · test_debug · tracing · video           │    ║
║  └─────────────────────────────────────────────────────────────────────┘    ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║              ↕  REST APIs  ·  File I/O  ·  Node.js Scripts  ·  Browser       ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  LAYER 3 — SYSTEM INTEGRATION & INFRASTRUCTURE                               ║
║  Jira  ·  Playwright Engine  ·  GitHub  ·  Live Applications  ·  File Store  ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────────────┐    ║
║  │ JIRA CLOUD │  │ PLAYWRIGHT │  │  GITHUB    │  │   TARGET APPS      │    ║
║  │            │  │  ENGINE    │  │            │  │                    │    ║
║  │ REST API v2│  │            │  │ Version    │  │ United Educators   │    ║
║  │ GET issue  │  │ Chromium   │  │ Control    │  │ Bank of St. Lucia  │    ║
║  │ GET comment│  │ Firefox    │  │ CI/CD      │  │ Any SaaS App       │    ║
║  │ GET attach.│  │ WebKit     │  │ PR checks  │  │                    │    ║
║  │ POST issue │  │ Mobile emu.│  │ Branch pol.│  │ Vercel · Salesforce│    ║
║  │ POST attach│  │ Parallel   │  │ Artifacts  │  │ Sandbox · UAT      │    ║
║  └────────────┘  └────────────┘  └────────────┘  └────────────────────┘    ║
║                                                                              ║
║  ┌─────────────────────────────────────────────────────────────────────┐    ║
║  │  ARTIFACT FILE SYSTEM  ·  Structured Output Store                  │    ║
║  │                                                                     │    ║
║  │  jira-output/     test-artifacts/    features/      test-results/  │    ║
║  │  └── [TICKET]/    └── [TICKET]/      └── [TICKET]/  └── results    │    ║
║  │      Summary/         test-cases/        smoke/         .json      │    ║
║  │      Comments/        application-       functional/   report.html │    ║
║  │      Attachments/       analysis/        negative/                 │    ║
║  │      Links/             screenshots/     edge-cases/               │    ║
║  │      Metadata/        reports/           boundary/                 │    ║
║  │      ★ complete_      logs/              regression/               │    ║
║  │        context.md                        security/                 │    ║
║  └─────────────────────────────────────────────────────────────────────┘    ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## Layer 1 — User Experience & IDE Interface

### 1.1 IDE Integration

| IDE | Integration | Capabilities |
|---|---|---|
| VS Code | Native extension | Inline chat, slash commands, file diffs, terminal |
| JetBrains | Plugin | Inline chat, slash commands, file diffs |
| Web (claude.ai/code) | Browser | Full chat interface |
| Terminal (CLI) | `claude` command | Full programmatic access |

The engineer stays in their IDE throughout the **entire QA workflow** — from requirements fetch to Jira bug creation. No context switching, no separate tooling.

---

### 1.2 Slash Command Interface

Each skill is exposed as a slash command registered under `.claude/commands/`. The skills directory (`.claude/skills/`) contains the execution logic; the commands directory registers them.

```
┌─────────────────────────────────────────────────────────────────────────┐
│  SLASH COMMAND                │  PURPOSE                                │
├───────────────────────────────┼─────────────────────────────────────────┤
│  /fetch-jira-details          │  Download complete Jira ticket context  │
│  TICKET-ID [TICKET-ID ...]    │  Supports batch · Caches locally        │
├───────────────────────────────┼─────────────────────────────────────────┤
│  /generate-test-cases         │  Full app analysis + test generation    │
│  TICKET-ID  APP-URL           │  Combines Jira AC + live app crawl      │
│                               │  Outputs test cases, Gherkin, RTM       │
├───────────────────────────────┼─────────────────────────────────────────┤
│  /generate-gherkin            │  Jira AC → Gherkin BDD scenarios        │
│  TICKET-ID                    │  No app URL required                    │
├───────────────────────────────┼─────────────────────────────────────────┤
│  /early-defect-consolidator   │  Validate + consolidate discrepancies   │
│  TICKET-ID                    │  Human-gated single Jira bug creation   │
└───────────────────────────────┴─────────────────────────────────────────┘
```

> **Mandatory Pairing Rule (CLAUDE.md):** Every `.claude/skills/<name>.md` must have a matching `.claude/commands/<name>.md`. The commands directory is what Claude Code reads to register slash commands.

---

### 1.3 Human Review Loop

The platform enforces a **human-in-the-loop** gate as a first-class architectural principle. No Jira bug is ever created without explicit human approval through the `FINAL_APPROVE` command.

```
  Report Generated (PENDING_REVIEW)
            │
            ▼
  ┌─────────────────────────────────────────────────┐
  │  Reviewer Commands:                             │
  │                                                 │
  │  APPROVE         Accept all findings            │
  │  EXCLUDE D3,D7   Remove specific defects        │
  │  MERGE D4,D5     Combine into one defect        │
  │  UPDATE D2 Severity=Low   Edit any field        │
  │  COMMENT D3 = [text]      Annotate finding      │
  │  REJECT          Abort — no bug created         │
  │                                                 │
  │  FINAL_APPROVE   ← ONLY trigger for Jira creation│
  └─────────────────────────────────────────────────┘
            │
   FINAL_APPROVE only
            │
            ▼
  Jira bug created + screenshots attached
  discrepancies.md updated with bug key
```

---

### 1.4 Configuration Layer

| Component | File | Purpose |
|---|---|---|
| Credentials | `.env` | JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN |
| Project Rules | `CLAUDE.md` | Skill rules, mandatory pairing rule, architecture |
| Permissions | `.claude/settings.local.json` | Tool allowlist, MCP server config |
| Memory | `.claude/projects/.../memory/` | Persistent user + feedback memories across sessions |
| TypeScript | `tsconfig.json` | Strict mode, ESNext target, commonjs modules |

---

## Layer 2 — AI Orchestration Engine

### 2.1 Skills Engine — Detailed Breakdown

#### Skill: `fetch-jira-details`

```
  Input: Jira Ticket ID(s)

  Scripts Orchestrated:
  ┌─────────────────────────────────────────────────────────────┐
  │  1. fetch-jira-details.js   CLI entrypoint + batch loop     │
  │  2. jira-client.js          Jira REST API v2 wrapper        │
  │     · GET /rest/api/2/issue/{key}                           │
  │     · GET /rest/api/2/issue/{key}/comment                   │
  │     · GET /rest/api/2/issue/{key}/attachment                │
  │     · Retry: 1s → 2s → 4s exponential backoff              │
  │     · Auth: Basic (email:apiToken → base64)                 │
  │  3. markdown-generator.js   ADF → Markdown conversion       │
  │     · Atlassian Document Format deep AST traversal          │
  │     · Tables, code blocks, inline marks, media nodes        │
  │  4. file-manager.js         SHA-256 dedup + folder setup    │
  │  5. logger.js               Colored console + file log      │
  └─────────────────────────────────────────────────────────────┘

  Output: jira-output/[TICKET-ID]/
  ├── Summary/ ticket_summary.md · description.md · acceptance_criteria.md
  ├── Comments/ comments.json · comments.md
  ├── Attachments/ [downloaded files] · attachments_manifest.json
  ├── Links/ linked_issues.json · dependency_graph.md (Mermaid)
  ├── Metadata/ issue_details.json · changelog.json
  ├── Subtasks/ subtasks.json
  ├── Logs/ execution.log
  └── ★ complete_ticket_context.md   ← AI golden source for all skills
```

**Key Capabilities:** Batch processing · ADF→Markdown conversion · SHA-256 dedup · Mermaid dependency graphs · Cloud vs. Server auto-detection · AC extraction from custom fields or description

---

#### Skill: `generate-test-cases`

```
  Input: TICKET-ID + APP-URL (or URL-only)

  Execution Steps:
  ┌────┬──────────────────────────────────────────────────────────────┐
  │ 0  │ Detect mode: URL_ONLY | JIRA_AND_URL | JIRA_ONLY            │
  │ 0A │ Load Jira context (if ticket provided)                       │
  │ 0B │ Set BASE_DIR = test-artifacts/[TICKET-ID]                   │
  │ 1  │ Interactive questionnaire (auth, scope, browsers, mobile)    │
  │ 2  │ Initialize directory structure                               │
  │ 3  │ Parse Jira ACs: identify positive / negative / boundary     │
  │    │ conditions; flag ambiguities; build requirements model       │
  │ 4  │ Spawn Playwright-Test-Planner agent:                        │
  │    │ · Navigate + authenticate live app                          │
  │    │ · Crawl all pages: forms, fields, flows, validation rules   │
  │    │ · Cross-reference live app vs Jira ACs                      │
  │    │ · MANDATORY: browser_take_screenshot per discrepancy        │
  │    │   Named: DISC-NNN-[short-slug].png                         │
  │    │ · Write discrepancies.md with Screenshot column             │
  │    │ · Write requirements-vs-app.md (VERIFIED / DIFFERS / GAP)   │
  │ 5  │ Generate test cases across 9 categories:                    │
  │    │ Smoke · Functional · Positive · Negative · Edge · Boundary  │
  │    │ Security · Accessibility · Regression                       │
  │ 6  │ Generate Gherkin .feature files (BDD)                       │
  │    │ · Scenario Outlines with Examples tables                    │
  │    │ · @known-defect @DISC-NNN tags for open defects            │
  │ 7  │ Generate reports:                                           │
  │    │ · coverage-report.md  · risk-analysis.md  · rtm.md         │
  │ 8  │ Final summary to user                                       │
  └────┴──────────────────────────────────────────────────────────────┘
```

---

#### Skill: `generate-gherkin`

```
  Input: Jira Ticket ID
  Prerequisites: jira-output/[TICKET-ID]/complete_ticket_context.md

  Supporting Assets:
  · analysis-framework.md    Requirements decomposition protocol
  · gherkin-rules.md         BDD syntax enforcement
  · scenario-templates.md    Given/When/Then pattern library

  Scripts:
  · prepare-context.js       Extract AC + metadata → structured JSON
  · setup-folders.js         Create features/ output hierarchy

  Output:
  · features/[TICKET-ID].feature              Gherkin BDD file
  · features/summaries/[TICKET-ID].md         Human-readable summary
  · features/coverage/[TICKET-ID].json        Machine-readable coverage
  · features/risks/[TICKET-ID].md             Risk assessment
```

---

#### Skill: `early-defect-consolidator`

```
  Input: Jira Ticket ID
  Prerequisites:
  · jira-output/[TICKET-ID]/complete_ticket_context.md
  · test-artifacts/[TICKET-ID]/application-analysis/discrepancies.md

  Validation Logic (per raw finding):
  ┌──────┬────────────────────────────────────────────────────────┐
  │ 4A   │ vs Acceptance Criteria                                │
  │ 4B   │ vs Business Rules                                     │
  │ 4C   │ vs Story Description                                  │
  │ 4D   │ vs Jira Comments (may confirm approved exceptions)    │
  │ 4E   │ vs Generated Test Cases                               │
  │ 4F   │ vs Coverage / Traceability Matrix                     │
  └──────┴────────────────────────────────────────────────────────┘

  Outcome labels:
  VALID_DEFECT · FALSE_POSITIVE · APPROVED_EXCEPTION
  USABILITY_ISSUE · REGRESSION_RISK · DUPLICATE · OUT_OF_SCOPE

  Bug Creation Script (create-jira-bug.js):
  · POST /rest/api/2/issue                 Create the bug
  · POST /rest/api/2/issue/{key}/attachments  Attach screenshots
  · Raw Buffer multipart (no form-data dependency)
  · Retry: exponential backoff (3 retries max)
  · Updates discrepancies.md with Jira bug key linkage
```

---

### 2.2 Agent Fleet

| Agent | Spawned By | Key Tools | Primary Output |
|---|---|---|---|
| **playwright-test-planner** | generate-test-cases (STEP 4) | All 50+ MCP playwright tools | discrepancies.md + screenshots + app-flow-analysis.md |
| **playwright-test-generator** | User request | Glob, Grep, Read, Write, Bash | tests/[TICKET]/[category]/*.spec.ts |
| **playwright-test-healer** | User request | browser_debug, test_run, browser_generate_locator | Healed .spec.ts files with updated selectors |

---

### 2.3 MCP Server — Tool Catalogue

```
  playwright-test MCP Server
  Command: npx playwright run-test-mcp-server
  Config: .mcp.json

  ┌────────────────┬─────────────────────────────────────────────────────┐
  │ NAVIGATION     │ navigate · navigate_back/forward · reload · close   │
  ├────────────────┼─────────────────────────────────────────────────────┤
  │ INTERACTION    │ click · type · hover · drag · drop · press_key      │
  │                │ fill_form · select_option · check · uncheck         │
  ├────────────────┼─────────────────────────────────────────────────────┤
  │ INSPECTION     │ snapshot · evaluate · generate_locator · highlight  │
  │                │ console_messages · network_requests · network_state │
  ├────────────────┼─────────────────────────────────────────────────────┤
  │ CAPTURE        │ take_screenshot · pdf_save                          │
  │                │ start_video · stop_video                            │
  │                │ start_tracing · stop_tracing                        │
  ├────────────────┼─────────────────────────────────────────────────────┤
  │ STATE MGMT     │ cookie_get/set/list/clear                           │
  │                │ localstorage_get/set · storage_state                │
  │                │ route (intercept) · network_state_set               │
  ├────────────────┼─────────────────────────────────────────────────────┤
  │ TEST RUNNER    │ test_run · test_list · test_debug                   │
  ├────────────────┼─────────────────────────────────────────────────────┤
  │ PLANNER        │ planner_setup_page · planner_save_plan              │
  │                │ planner_submit_plan                                 │
  └────────────────┴─────────────────────────────────────────────────────┘
```

---

### 2.4 Context & Memory System

| Component | Scope | Purpose |
|---|---|---|
| `CLAUDE.md` | Project-permanent | Rules, skill pairing mandate, test conventions, architecture |
| Auto-Memory (`memory/*.md`) | Cross-session | User profile · Feedback · Project state · References |
| `MEMORY.md` index | Cross-session | Pointer index loaded into every conversation |
| `complete_ticket_context.md` | Per-ticket | AC, business rules, comments — golden source for all skills |
| `.claude/settings.local.json` | Local env | Tool permission allowlist, MCP server config |

---

## Layer 3 — System Integration & Infrastructure

### 3.1 Jira Cloud Integration

| Aspect | Detail |
|---|---|
| Protocol | REST API v2 |
| Auth | Basic Auth: `base64(email:apiToken)` |
| Endpoints | GET issue, GET comment, GET attachment, POST issue, POST attachments |
| Resilience | Exponential backoff: 1s → 2s → 4s · Max 3 retries |
| Rate Limiting | Handles 429 with automatic retry delay |
| Timeouts | 30s request · 60s attachment upload |
| Data Formats | Atlassian Document Format (ADF) → Markdown via deep AST traversal |
| Deduplication | SHA-256 hash on attachment filenames |
| Cloud/Server | Auto-detected from JIRA_BASE_URL pattern |

**Jira Objects Consumed:**

| Object | Fields Extracted |
|---|---|
| Issue | summary, description (ADF), status, priority, type, assignee, reporter, labels, components |
| Acceptance Criteria | Extracted from custom field or parsed from description body |
| Comments | Author, date, body (ADF→Markdown) — used for approved exception detection |
| Attachments | All files downloaded; manifest with SHA-256 checksums |
| Subtasks | Key, summary, status for each subtask |
| Linked Issues | Relationship type, linked ticket key |
| Changelog | Full field change history |

---

### 3.2 Playwright Automation Engine

```
  Configuration (playwright.config.ts — active)
  ┌────────────────────────────────────────────────────────────┐
  │  testDir:            ./tests                               │
  │  Browser:            Chromium (Desktop Chrome)             │
  │  Test timeout:       30 seconds                            │
  │  Action timeout:     10 seconds                            │
  │  Navigation timeout: 30 seconds                            │
  │  Retries:            2 (CI) / 0 (local)                   │
  │  Workers:            1 (CI) / fully parallel (local)       │
  │  Trace:              on-first-retry                        │
  │  Screenshot:         only-on-failure                       │
  │  Video:              retain-on-failure                     │
  │  Reporters:          HTML + list + JSON                    │
  └────────────────────────────────────────────────────────────┘

  Test Suite Structure (tests/)
  ├── seed.spec.ts                        Page initialization
  └── BDBP1-202/functional/
      ├── helpers.ts                      Shared navigation + setup
      └── INSTR-FUNC-001 → 008.spec.ts   8 spec files per ticket

  Naming Convention
  · Spec files:  [TICKET]-[MODULE]-[NNN].spec.ts
  · Helpers:     helpers.ts (shared per ticket folder)
  · Gherkin:     [ticket]-[category].feature
```

---

### 3.3 GitHub Integration

| Capability | Implementation |
|---|---|
| Version Control | All skills, test cases, Gherkin, reports tracked |
| `.gitignore` | node_modules, .env, test-results/, playwright-report/ excluded |
| CI/CD | GitHub Actions workflow; Playwright runs on PR/push |
| CI Workers | 1 worker (resource-constrained CI environment) |
| Artifacts | HTML report + results.json persisted as GitHub Actions artifacts |
| Traceability | Jira ticket IDs in branch names and commit messages |

---

### 3.4 Target Application Support

| Application | URL | Jira Tickets | Backend |
|---|---|---|---|
| United Educators Portal | `united-educators-application.vercel.app` | UWB-1, UWB-2, UWB-3 | Salesforce API |
| Bank of St. Lucia Digital Portal | `bankofstlucia--digitalqa.sandbox.my.site.com` | BDBP1-202, BDBP1-204 | Digital Banking |
| Loan Processing Platform | (internal) | BOSLFS-1584, BOSLFS-1626 | Core Banking |

**Supported App Profiles:**
- SaaS web apps (Vercel, Salesforce-backed, sandbox, UAT)
- Auth-gated apps (username/password, MFA)
- Single-page applications with React synthetic events
- Multi-step wizard forms with conditional field logic
- API-integrated forms (Salesforce lookups, external data)
- File upload workflows with MIME type validation

---

### 3.5 Artifact File System

```
  jira-output/[TICKET-ID]/
  ├── Summary/   ticket_summary.md · description.md · acceptance_criteria.md
  ├── Comments/  comments.json · comments.md
  ├── Attachments/ [files] · attachments_manifest.json
  ├── Links/     linked_issues.json · dependency_graph.md
  ├── Metadata/  issue_details.json · changelog.json
  ├── Subtasks/  subtasks.json
  ├── Logs/      execution.log
  └── ★ complete_ticket_context.md   ← AI golden source

  test-artifacts/[TICKET-ID]/
  ├── application-analysis/
  │   ├── app-flow-analysis.md         Page inventory + user flows
  │   ├── detected-modules.md          Module/section catalogue
  │   ├── requirements-vs-app.md       AC × App Status cross-reference
  │   ├── ★ discrepancies.md           Bugs found + screenshot refs
  │   └── screenshots/                 DISC-NNN-[slug].png per discrepancy
  │       FULL-PAGE-*.png              Full-page references
  │       SECTION-[letter]-*.png       Section-level captures
  ├── test-cases/
  │   ├── smoke/ · functional/ · positive/ · negative/
  │   ├── edge-cases/ · boundary/ · security/ · accessibility/
  │   └── regression/
  ├── reports/
  │   ├── coverage-report.md           Module × Scenario coverage
  │   ├── risk-analysis.md             High-risk area identification
  │   ├── rtm.md                       Requirements Traceability Matrix
  │   └── EarlyDefectReviewReport.md   Consolidated defect review
  └── logs/ execution.log

  features/[TICKET-ID]/
  └── smoke/ functional/ negative/ edge-cases/ boundary/
      security/ accessibility/ regression/  → *.feature files

  test-results/  ← Playwright JSON + HTML execution results
  playwright-report/  ← Visual HTML test report
```

---

## End-to-End Data Flow

```
  QA Engineer in IDE
        │
        │  /fetch-jira-details UWB-1
        ▼
  ┌────────────────────────────────────────────────────────────────────┐
  │  JIRA CLOUD  ←→  fetch-jira-details skill                         │
  │  · GET /rest/api/2/issue/UWB-1                                    │
  │  · Download ACs, comments, attachments, subtasks                  │
  │  · ADF → Markdown conversion                                      │
  │  · Store: jira-output/UWB-1/complete_ticket_context.md           │
  └────────────────────────────────────────────────────────────────────┘
        │
        │  /generate-test-cases UWB-1 https://app.vercel.app
        ▼
  ┌────────────────────────────────────────────────────────────────────┐
  │  generate-test-cases skill  ←→  Playwright-Test-Planner agent     │
  │  · Load 18 Jira ACs → build requirements model                   │
  │  · MCP: browser_navigate → authenticate → crawl form             │
  │  · MCP: cross-reference live app vs Jira ACs                     │
  │  · MCP: browser_take_screenshot → DISC-NNN-[slug].png            │
  │  · Write: discrepancies.md (5 bugs, 10 screenshots)              │
  │  · Write: ~100 test cases across 9 categories                    │
  │  · Write: functional.feature, smoke.feature, regression.feature  │
  │  · Write: coverage-report.md, rtm.md, risk-analysis.md           │
  └────────────────────────────────────────────────────────────────────┘
        │
        │  /early-defect-consolidator UWB-1
        ▼
  ┌────────────────────────────────────────────────────────────────────┐
  │  early-defect-consolidator skill                                   │
  │  · Validate 6 raw findings against 18 ACs + comments             │
  │  · Remove FALSE_POSITIVE (D-03: confirmed automation issue)       │
  │  · Consolidate into 3 root-cause defects (D1 High, D2 Med, D3 Lo)│
  │  · Write: EarlyDefectReviewReport.md (PENDING_REVIEW)            │
  │                                                                    │
  │  ◀─── Human: APPROVE → [edits] → FINAL_APPROVE ───▶              │
  │                                                                    │
  │  · POST /rest/api/2/issue → Bug UWB-55 created                   │
  │  · POST attachments: DISC-001.png, DISC-002.png, DISC-003.png    │
  │  · Append "## Consolidated Jira Defect" to discrepancies.md      │
  └────────────────────────────────────────────────────────────────────┘
        │
        │  npx playwright test  (local or GitHub Actions)
        ▼
  ┌────────────────────────────────────────────────────────────────────┐
  │  PLAYWRIGHT ENGINE  ·  Chromium headless                          │
  │  · Run INSTR-FUNC-001 → INSTR-FUNC-008.spec.ts in parallel       │
  │  · Retry on failure (2x on CI)                                   │
  │  · Capture: trace · video · screenshot on failure                │
  │  · Output: test-results/results.json + playwright-report/        │
  └────────────────────────────────────────────────────────────────────┘
```

---

## Design Principles

| Principle | Implementation |
|---|---|
| **Human-in-the-Loop** | `FINAL_APPROVE` is the only gate for Jira creation. No automated bugs. Every consolidated defect requires explicit human sign-off. |
| **Traceability First** | Full chain preserved: Jira AC → Test Case → Live App Status → Discrepancy → Screenshot → Jira Bug. RTM generated automatically. |
| **Evidence-Driven QA** | Every discrepancy has a named screenshot (`DISC-NNN-[slug].png`). Screenshots auto-attached to Jira bugs via multipart API call. |
| **Single Bug Per Cycle** | One consolidated Jira bug per story review cycle. No bug flooding. Root-cause grouping eliminates duplicates. |
| **Skills as Programs** | Skills are versioned, step-structured, composable markdown programs — not one-off prompts. Each is reusable across projects. |
| **Mandatory Pairing** | Every `.claude/skills/<name>.md` must have a matching `.claude/commands/<name>.md`. Enforced in `CLAUDE.md`. |
| **Idempotent Runs** | Re-running any skill on an existing directory adds/updates without overwriting committed content. |
| **Fail Fast** | Prerequisites validated in STEP 0 of each skill. Clear error messages surface before expensive work begins. |
| **Resilient APIs** | All external HTTP calls use exponential backoff (1s→2s→4s). 429 and 5xx handled. Auth failures surfaced with actionable messages. |
| **Zero Unnecessary Deps** | Screenshot attachment uses raw `Buffer` multipart — no `form-data` package. Minimal `package.json` surface: only 4 devDependencies. |

---

## Technology Stack

| Layer | Technology | Version | Role |
|---|---|---|---|
| AI Model | Claude Sonnet 4.6 | `claude-sonnet-4-6` | Orchestration, reasoning, code generation |
| AI Framework | Claude Code | Latest | Skill runtime, IDE integration, agent spawning |
| Protocol | MCP (Model Context Protocol) | Latest | Browser tool exposure to AI |
| Browser Automation | Playwright | `1.60.0` | E2E execution + live app crawling |
| Language | TypeScript | ESNext/strict | Test scripts, type-safe helpers |
| Language | Node.js | 18+ | Skill scripts, API clients |
| HTTP Client | Axios | `1.7.0` | Jira REST API + attachment upload |
| Env Management | dotenv | `16.4.0` | Credential loading |
| Test Framework | `@playwright/test` | `1.60.0` | Runner, assertions, HTML/JSON reports |
| BDD Format | Gherkin | — | Feature files, Scenario Outlines, Examples |
| Requirements | Jira Cloud | REST API v2 | Ticket data, bug tracking, attachment storage |
| Version Control | GitHub | — | Source, CI/CD, PR checks |
| IDE | VS Code / JetBrains | Latest | Developer experience layer |
| CI/CD | GitHub Actions | — | Automated test execution on PR/push |
| Runtime OS | Windows 11 / cross-platform | — | Local dev environment |

---

## Execution Timeline (Typical Story)

```
  T+0:00   /fetch-jira-details UWB-1
  T+0:30   Jira API calls complete; ADF→Markdown done
  T+1:00   complete_ticket_context.md written

  T+1:00   /generate-test-cases UWB-1 https://app.url
  T+1:30   Questionnaire complete (auth, scope, browsers)
  T+2:00   Jira AC analysis: 18 ACs, requirements model built
  T+2:30   Playwright-Test-Planner agent spawned
  T+4:00   Live app crawled — all form sections mapped
  T+6:00   5 discrepancies found, 10 screenshots captured
  T+8:00   ~100 test cases generated across 9 categories
  T+9:30   Gherkin .feature files written
  T+10:30  Reports: coverage, RTM, risk analysis
  T+11:00  Summary displayed to engineer

  T+11:00  /early-defect-consolidator UWB-1
  T+11:30  Jira context + discrepancies loaded
  T+12:00  6 raw findings validated against 18 ACs
  T+12:30  3 root-cause defects consolidated
  T+13:00  EarlyDefectReviewReport.md ready for review

  [Human review: variable duration]
  T+??     FINAL_APPROVE received
  T+??     Jira bug created (e.g. UWB-55)
  T+??     3 screenshots attached to Jira bug
  T+??     discrepancies.md updated with bug key
```

---

*Agentic QA Automation Platform — Technical Architecture v2.0*
*First Project Agentic · Powered by Claude Code · Anthropic AI · 2026-05-28*

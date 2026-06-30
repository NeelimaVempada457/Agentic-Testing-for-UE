---
name: early-defect-consolidator
description: Analyze the Discrepancies.md file generated for a Jira User Story, validate all identified discrepancies against Jira story artifacts, generate a consolidated defect review report for human validation, and create a single Jira bug only after explicit FINAL_APPROVE. Updates Discrepancies.md with created Jira bug details and traceability information.
---

# Early Defect Consolidator Skill

## Trigger
`/early-defect-consolidator <TICKET-ID>`

## Overview
This skill reads the discrepancies captured during Playwright test generation, validates them against the full Jira story context, consolidates related findings into a single developer-ready defect, and guides the reviewer through a structured approval workflow before creating exactly one Jira bug.

---

## EXECUTION INSTRUCTIONS

Follow each step in sequence. Do not skip steps. Do not proceed to the next step until the current step is complete.

**CRITICAL RULE:** Do NOT create any Jira bug until the reviewer explicitly responds with `FINAL_APPROVE`. Any other response — including `APPROVE` — only advances the review workflow; it does not trigger Jira creation.

---

## STEP 0 — Parse Input and Resolve Paths

Extract `TICKET_ID` from the skill argument (e.g., `BDBP1-202`).

Define the following paths:

```
JIRA_DIR         = jira-output/[TICKET_ID]
ARTIFACTS_DIR    = test-artifacts/[TICKET_ID]
DISCREPANCIES    = test-artifacts/[TICKET_ID]/application-analysis/discrepancies.md
REVIEW_REPORT    = test-artifacts/[TICKET_ID]/reports/EarlyDefectReviewReport.md
```

### Validation checks (fail fast if any condition is unmet):

1. Verify `JIRA_DIR` exists and contains `complete_ticket_context.md`.
   - If missing: *"Jira data not found for [TICKET_ID]. Please run `/fetch-jira-details [TICKET_ID]` first."* — then stop.

2. Verify `DISCREPANCIES` exists.
   - If missing: *"Discrepancies.md not found at [DISCREPANCIES]. Please run `/generate-test-cases [TICKET_ID]` first."* — then stop.

3. Check if `REVIEW_REPORT` already exists.
   - If it exists AND contains a line matching `Review Status: FINAL_APPROVED`, tell the user:
     *"A FINAL_APPROVED review already exists for [TICKET_ID]. Check [REVIEW_REPORT] for the created Jira bug key."* — then stop.

---

## STEP 1 — Load Story Context

Read the following files from `JIRA_DIR`. Store their contents for use in all subsequent validation steps.

**Required:**
- `[JIRA_DIR]/complete_ticket_context.md`
- `[JIRA_DIR]/Summary/ticket_summary.md`
- `[JIRA_DIR]/Summary/description.md`
- `[JIRA_DIR]/Summary/acceptance_criteria.md`

**Read if they exist:**
- `[JIRA_DIR]/Comments/comments.md`
- `[JIRA_DIR]/Links/linked_issues.json`
- `[JIRA_DIR]/Links/dependency_graph.md`
- `[JIRA_DIR]/Metadata/issue_details.json`

From these files extract and store:

| Variable | Source field |
|---|---|
| `STORY_KEY` | Ticket ID / key field |
| `STORY_SUMMARY` | Ticket summary line |
| `STORY_DESCRIPTION` | Full description body |
| `ACCEPTANCE_CRITERIA` | All AC lines, numbered AC-01, AC-02… |
| `BUSINESS_RULES` | Business rules section if present |
| `JIRA_COMMENTS` | All comment entries with author + date |
| `JIRA_PRIORITY` | Jira priority field |
| `JIRA_LABELS` | Labels array |
| `JIRA_PROJECT_KEY` | Project key extracted from STORY_KEY |

Inform the user:
> "Story context loaded for **[STORY_KEY]**: [STORY_SUMMARY]
> Found **[N] acceptance criteria** and **[N] Jira comments** for validation."

---

## STEP 2 — Load Testing Artifacts

Read all available files from `ARTIFACTS_DIR`. Store for cross-reference.

**Read if they exist:**
- `[ARTIFACTS_DIR]/application-analysis/app-flow-analysis.md`
- `[ARTIFACTS_DIR]/application-analysis/detected-modules.md`
- `[ARTIFACTS_DIR]/application-analysis/requirements-vs-app.md`
- `[ARTIFACTS_DIR]/reports/coverage-report.md`
- `[ARTIFACTS_DIR]/reports/traceability-matrix.md`
- `[ARTIFACTS_DIR]/reports/risk-analysis.md`
- `[ARTIFACTS_DIR]/logs/execution.log`

**Always read:**
- `[DISCREPANCIES]`

Scan `[ARTIFACTS_DIR]/test-cases/` recursively for any `.md` files and note the test case IDs and titles found.

Inform the user:
> "Testing artifacts loaded. Discrepancies.md contains **[N] discrepancy entries**."

---

## STEP 3 — Parse Discrepancies

Parse `DISCREPANCIES` to extract every documented discrepancy. For each discrepancy item found, create a raw finding record:

```
RAW_FINDING:
  id:            [Sequential — e.g., RAW-001]
  area:          [Area / Field from table or detail section]
  expected:      [Expected behaviour / requirement]
  observed:      [Observed in live app]
  severity:      [High / Medium / Low from source file]
  disc_id:       [DISC-NNN from detail section if present]
  action:        [Action Required from source file]
  req_source:    [Jira AC reference if stated — e.g., AC-03 / N/A]
```

Categorize each raw finding into one or more of:
- Functional Defect
- Validation Defect
- Workflow Failure
- Missing Requirement
- Missing Validation
- Accessibility Finding
- UI Inconsistency
- Error Handling Issue
- Data Integrity Issue
- Navigation Issue
- Business Rule Violation

Log totals per category.

---

## STEP 4 — Validate Each Discrepancy Against Story Artifacts

For every raw finding from STEP 3, perform the following validation checks in order:

### 4A — Compare Against Acceptance Criteria
- Does this discrepancy violate an explicit acceptance criterion?
- Map to the specific AC number (e.g., AC-03) if yes.

### 4B — Compare Against Business Rules
- Does this discrepancy violate a documented business rule?
- Note the rule text if yes.

### 4C — Compare Against Story Description
- Does the story description implicitly require the missing/broken behaviour?
- Note the relevant excerpt if yes.

### 4D — Compare Against Jira Comments
- Do any Jira comments clarify this behaviour as expected, approved, or out of scope?
- If a comment confirms the observed behaviour is intentional — mark as **Approved Exception**.
- Reference the comment author and date.

### 4E — Compare Against Generated Test Cases
- Does a generated test case exist that covers this area?
- Note the test case ID if yes.

### 4F — Compare Against Coverage Matrix
- Is this area listed in the traceability matrix?
- Note coverage status (COVERED / NOT COVERED / REQUIREMENT GAP).

### Assign Validation Outcome

For each finding, assign one of:

| Outcome | Meaning |
|---|---|
| `VALID_DEFECT` | Violates an AC, business rule, or story description |
| `USABILITY_ISSUE` | Real problem but not a documented requirement violation |
| `ACCESSIBILITY_ISSUE` | WCAG or keyboard navigation gap |
| `REGRESSION_RISK` | Existing capability degraded |
| `DUPLICATE` | Same root cause as another finding |
| `FALSE_POSITIVE` | Observed behaviour is correct per Jira context |
| `APPROVED_EXCEPTION` | Confirmed by Jira comment or PO decision |
| `OUT_OF_SCOPE` | Not part of this story's scope |

For every `VALID_DEFECT`, `USABILITY_ISSUE`, `ACCESSIBILITY_ISSUE`, or `REGRESSION_RISK`:
- Record full traceability: `Finding → AC-XX → Business Rule → Jira Comment Ref`

---

## STEP 5 — Consolidate Findings

### 5A — Remove Duplicates
Group findings with the same root cause. Keep the finding with the highest severity as the primary; list others as related observations.

### 5B — Remove False Positives and Approved Exceptions
Drop all findings with outcome `FALSE_POSITIVE` or `APPROVED_EXCEPTION`.
Log each dropped finding with the reason.

### 5C — Group by Root Cause
For each cluster of related valid findings, create one consolidated defect `D[N]`:

```
CONSOLIDATED_DEFECT:
  id:              D1
  title:           [Short, developer-facing title]
  category:        [Primary category from STEP 3]
  severity:        [Highest severity among grouped findings]
  priority:        [Derived from severity and business impact]
  business_impact: [Effect on business process / user workflow]
  req_impact:      [AC or business rule violated]
  description:     [Root cause explanation]
  expected:        [What the requirement specifies]
  actual:          [What the live application does]
  traceability:
    ac_refs:       [AC-XX, AC-YY]
    business_rules:[Rule text or N/A]
    comment_refs:  [Author / Date / excerpt or N/A]
    test_case_ids: [TC-XXX or N/A]
  raw_findings:    [RAW-001, RAW-002] — original source findings
  evidence:        [Screenshots / logs / traces referenced in DISCREPANCIES]
```

### Severity Assignment

| Severity | Criteria |
|---|---|
| Critical | System unavailable / data loss / security issue / complete workflow blockage |
| High | Acceptance criteria failure / core functionality broken |
| Medium | Partial functionality failure / validation issues / business logic issues |
| Low | Cosmetic issues / minor usability concerns |

### Priority Assignment

| Severity | Priority |
|---|---|
| Critical | Highest |
| High | High |
| Medium | Medium |
| Low | Low |

---

## STEP 6 — Generate EarlyDefectReviewReport.md

Write the review report to `REVIEW_REPORT`.

Use the following exact structure:

```markdown
# Early Defect Review Report

**Story Key:** [STORY_KEY]
**Story Summary:** [STORY_SUMMARY]
**Generated:** [TIMESTAMP]
**Status:** PENDING_REVIEW

---

## Executive Summary

| Metric | Count |
|---|---|
| Total Discrepancies Identified | [N] |
| Valid Findings (after validation) | [N] |
| Duplicates Removed | [N] |
| False Positives / Approved Exceptions Removed | [N] |
| Consolidated Defects in This Report | [N] |

---

## Severity Distribution

| Severity | Count |
|---|---|
| Critical | [N] |
| High | [N] |
| Medium | [N] |
| Low | [N] |

---

## Requirement Traceability Matrix

| Acceptance Criterion | Consolidated Defect | Severity | Status |
|---|---|---|---|
| AC-01 — [brief text] | D1, D3 | High | Violated |
| AC-02 — [brief text] | — | — | No defect found |
| AC-03 — [brief text] | D2 | Medium | Violated |

---

## Consolidated Findings

[Repeat block below for each D1…DN]

---

### D[N] — [Title]

| Field | Details |
|---|---|
| **Defect ID** | D[N] |
| **Category** | [Category] |
| **Requirement Violated** | [AC-XX / Business Rule / N/A] |
| **Severity** | Critical / High / Medium / Low |
| **Priority** | Highest / High / Medium / Low |
| **Business Impact** | [Impact description] |

**Description:**
[Root cause explanation — developer-ready, precise]

**Expected Result:**
[What the requirement or spec defines]

**Actual Result:**
[What the live application currently does]

**Traceability:**
- Jira AC Reference: AC-XX — [AC text]
- Business Rule: [Rule text or N/A]
- Jira Comment Reference: [Author / Date / "Confirmed by PO" or N/A]
- Related Test Case: [TC-ID or N/A]

**Evidence:**
- Screenshots: [paths or N/A]
- Logs: [paths or N/A]
- Traces: [paths or N/A]

**Source Findings:** [RAW-001, RAW-002]

---

## Recommended Jira Bug Summary

[Early Defect Detection][[STORY_KEY]] Consolidated Defect Report - [STORY_SUMMARY]

---

## Recommended Jira Bug Description

**Story Reference:** [STORY_KEY] — [STORY_SUMMARY]

**Detection Method:** Agentic Playwright crawl and test generation — Early Defect Detection

**Consolidated Findings:**

[For each D[N], one-paragraph summary with severity and AC reference]

**Environment:** [ENV — detected from test-artifacts or "QA Sandbox"]

**Steps to Reproduce:**
[Aggregated from all consolidated findings]

**Expected Behaviour:**
[Aggregated expected results]

**Actual Behaviour:**
[Aggregated actual results]

**Acceptance Criteria Violated:**
[List AC references]

---

## Risks and Recommendations

[Summary of business risk if defects are not resolved]
[Recommended priority order for fixing]
[Any ambiguous ACs that need BA/PO clarification]

---

## Reviewer Actions

To proceed, respond with one of the following commands:

| Command | Effect |
|---|---|
| `APPROVE` | Accept all findings. Advances to final approval stage. Does NOT create Jira bug yet. |
| `REJECT` | Reject the report. No Jira bug will be created. |
| `EXCLUDE D3,D7` | Remove specific defect IDs from the report. |
| `MERGE D4,D5` | Combine findings into one root-cause defect. |
| `UPDATE D2 Severity=Low` | Adjust Severity, Priority, Description, Business Impact, Expected Result, or Actual Result. |
| `COMMENT D3 = Expected behaviour confirmed by PO` | Add a reviewer comment to a defect. |
| `FINAL_APPROVE` | **Only this command triggers Jira bug creation.** |

*After APPROVE + any edits, type `FINAL_APPROVE` to create the Jira bug.*
```

Inform the user:
> "Review report generated at **[REVIEW_REPORT]**.
> **[N] consolidated defects** ready for review.
> Please review and respond with a reviewer action command."

---

## STEP 7 — Human Review Loop

Present the report and wait for reviewer input. Do NOT create any Jira bug at this stage.

Process each reviewer response as follows:

### `APPROVE`
- Set review status to `APPROVED`.
- Confirm to the reviewer:
  > "All [N] findings accepted. Type `FINAL_APPROVE` when ready to create the Jira bug, or use EXCLUDE / MERGE / UPDATE / COMMENT to refine first."

### `REJECT`
- Set review status to `REJECTED`.
- Log the rejection.
- Do NOT create a Jira bug.
- Inform the reviewer:
  > "Review rejected. No Jira bug will be created. You may re-run `/early-defect-consolidator [TICKET_ID]` after further analysis."
- **STOP — end the skill.**

### `EXCLUDE <IDs>`
- Parse the comma-separated defect IDs (e.g., `EXCLUDE D3,D7,D10`).
- Remove those defects from the consolidated findings list.
- Log: "Excluded by reviewer: D3, D7, D10"
- Recalculate metrics and re-number remaining defect IDs sequentially (D1, D2…).
- Update traceability matrix rows affected.
- Regenerate `REVIEW_REPORT` with updated content.
- Present the updated report and ask for next reviewer action.

### `MERGE <IDs>`
- Parse the comma-separated defect IDs (e.g., `MERGE D4,D5`).
- Combine those defects into one entry under the first ID.
- Merge: descriptions, evidence lists, traceability refs, source findings.
- Assign the highest severity among merged defects.
- Recalculate metrics and re-number remaining defect IDs.
- Regenerate `REVIEW_REPORT` with updated content.
- Present the updated report and ask for next reviewer action.

### `UPDATE <ID> <Field>=<Value>`
- Parse the defect ID and field=value pair.
- Allowed fields: `Severity`, `Priority`, `Description`, `BusinessImpact`, `ExpectedResult`, `ActualResult`
- Apply the update to the specified defect.
- Regenerate `REVIEW_REPORT` with updated content.
- Confirm: "D[N] updated — [Field] set to [Value]."
- Present the updated report and ask for next reviewer action.

### `COMMENT <ID> = <Text>`
- Parse the defect ID and comment text.
- Append a **Reviewer Comment** field to that defect's table:
  `| **Reviewer Comment** | [Comment text] — [current timestamp] |`
- Regenerate `REVIEW_REPORT` with the comment appended.
- Confirm: "Comment added to D[N]."
- Present the updated report and ask for next reviewer action.

### `FINAL_APPROVE`
- Verify that at least one consolidated defect remains in the report.
  - If no defects remain (all excluded): Inform the user no defects are present and stop.
- Set review status to `FINAL_APPROVED`.
- Update `REVIEW_REPORT` header:
  - `Status: FINAL_APPROVED`
  - `Approved At: [TIMESTAMP]`
- **Proceed to STEP 8.**

### Any other response
- Treat as a clarification question or comment.
- Answer the question if possible.
- Re-display the available reviewer action commands.
- Continue waiting for a valid command.

---

## STEP 8 — Create Jira Bug

**Condition:** Execute this step ONLY after `FINAL_APPROVE` was received in STEP 7.

### 8A — Verify Jira Configuration

Read `.env` from the project root and extract:
- `JIRA_BASE_URL`
- `JIRA_EMAIL`
- `JIRA_API_TOKEN`

If any variable is missing, ask the user to provide it before continuing.

### 8B — Build Bug Payload

```
Summary:
  [Early Defect Detection][STORY_KEY] Consolidated Defect Report - STORY_SUMMARY

Issue Type: Bug

Priority: [Highest severity among all remaining consolidated defects]

Labels:
  - early-defect-detection
  - agentic-testing
  - playwright
  - consolidated-defect

Description: [Full Recommended Jira Bug Description from REVIEW_REPORT]
```

### 8C — Execute Jira Bug Creation

Run the creation script:

```powershell
node ".claude/skills/early-defect-consolidator/scripts/create-jira-bug.js" `
  --ticket "[STORY_KEY]" `
  --report "[REVIEW_REPORT]" `
  --discrepancies "[DISCREPANCIES]"
```

The script:
1. Reads `REVIEW_REPORT` for the summary and description
2. Calls the Jira REST API (`POST /rest/api/2/issue`) to create the bug
3. Parses screenshot paths from `DISCREPANCIES` (any `DISC-NNN-*.png` paths in the Screenshot column/field)
4. Uploads each existing screenshot as an attachment to the created bug via `POST /rest/api/2/issue/{key}/attachments`
5. Prints the created bug key and attachment count on success

### 8D — Capture Bug Key

Store the returned bug key as `JIRA_BUG_KEY` (e.g., `BDBP1-999`).

If creation fails:
- Log the full error.
- Inform the user of the exact failure.
- Do NOT update `DISCREPANCIES`.
- Ask whether to retry or abort.

---

## STEP 9 — Update Discrepancies.md

Append the following section to `DISCREPANCIES` after the existing content:

```markdown

---

## Consolidated Jira Defect

| Field | Value |
|---|---|
| **Jira Bug Key** | [JIRA_BUG_KEY] |
| **Jira Summary** | [Early Defect Detection][[STORY_KEY]] Consolidated Defect Report - [STORY_SUMMARY] |
| **Created Date** | [TIMESTAMP] |
| **Status** | Created |
| **Linked Story** | [STORY_KEY] |
| **Included Findings** | [D1, D2, D4…] |
| **Review Status** | FINAL_APPROVED |
| **Review Report** | [REVIEW_REPORT path] |
```

Persist the updated `DISCREPANCIES` file.

---

## STEP 10 — Final Output

Print the following summary to the user:

```
==================================================
EARLY DEFECT CONSOLIDATOR — COMPLETE
==================================================

Story:                   [STORY_KEY] — [STORY_SUMMARY]
Review Status:           FINAL_APPROVED
Jira Bug Created:        [JIRA_BUG_KEY]

─────────────────────────────────────────────────
FINDINGS SUMMARY
─────────────────────────────────────────────────
Total Raw Discrepancies: [N]
Duplicates Removed:      [N]
False Positives Removed: [N]
Excluded by Reviewer:    [N]
Merged:                  [N]
Included in Jira Bug:    [N]

Severity Breakdown:
  Critical:              [N]
  High:                  [N]
  Medium:                [N]
  Low:                   [N]

─────────────────────────────────────────────────
ARTIFACTS
─────────────────────────────────────────────────
Review Report:           [REVIEW_REPORT]
Updated Discrepancies:   [DISCREPANCIES]
Jira Bug:                [JIRA_BASE_URL]/browse/[JIRA_BUG_KEY]
Screenshots Attached:    [N] files
==================================================
```

---

## ERROR HANDLING

| Situation | Action |
|---|---|
| `jira-output/[TICKET_ID]` missing | Prompt user to run `/fetch-jira-details` first; stop |
| `discrepancies.md` missing | Prompt user to run `/generate-test-cases` first; stop |
| Discrepancies.md is empty / no discrepancies | Inform user, write empty report, stop without creating Jira bug |
| Jira API auth failure (401/403) | Check `.env` credentials; ask user to regenerate API token |
| Jira API 404 on project | Check `JIRA_PROJECT_KEY` and confirm project exists |
| Jira bug creation rate limit (429) | Wait and retry with exponential backoff (max 3 retries) |
| `REJECT` received | Log rejection, do not create Jira bug, stop |
| All defects excluded | Inform user no defects remain, do not create Jira bug, stop |
| Report already FINAL_APPROVED | Inform user, show existing bug key, stop |
| Attachment upload failure | Log warning; bug still created; note in report |

---

## RULES

1. Never create multiple Jira bugs for the same story review cycle.
2. Always require human validation via APPROVE (or direct editing) before FINAL_APPROVE.
3. Only `FINAL_APPROVE` permits Jira bug creation — no other command does.
4. Use Jira comments as part of requirement validation (they may confirm approved exceptions).
5. Consolidate related findings into root-cause defects — do not create one Jira bug per raw finding.
6. Remove duplicates and false positives before presenting the report.
7. Allow reviewers to EXCLUDE, MERGE, UPDATE, and COMMENT on findings freely.
8. Maintain complete traceability: Finding → AC → Business Rule → Jira Comment.
9. Update Discrepancies.md only after successful Jira bug creation.
10. If REJECT is received, stop immediately — do not ask for FINAL_APPROVE.
11. Generate developer-ready defect descriptions with reproducible evidence.
12. Regenerate and re-present the report after every reviewer action that modifies it.

---

## MODULAR DEPENDENCIES

Consumes output from:
- `/fetch-jira-details` — provides `jira-output/[TICKET_ID]/`
- `/generate-test-cases` — provides `test-artifacts/[TICKET_ID]/application-analysis/discrepancies.md`

Supporting script:
- `.claude/skills/early-defect-consolidator/scripts/create-jira-bug.js`

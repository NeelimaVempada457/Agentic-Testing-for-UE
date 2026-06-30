# Analysis Framework — Generate Gherkin Skill

This document defines the systematic analysis process Claude must follow before generating any Gherkin scenarios.

---

## Phase 1: Acceptance Criteria Decomposition

For **each acceptance criterion** (AC-N):

1. **Identify the actor** — who performs the action? (user role, system, API consumer)
2. **Identify the trigger** — what initiates the flow? (button click, form submit, API call, scheduled job)
3. **Identify the preconditions** — what must be true before the action? (logged in, data exists, permission granted)
4. **Identify the action** — what exactly happens?
5. **Identify the expected outcome** — what should the system do/show/return?
6. **Identify implicit rules** — what is NOT stated but implied by domain knowledge?

Output of this phase: a numbered list of decomposed AC items ready for scenario mapping.

---

## Phase 2: Requirement Gap Analysis

Scan the ticket for these gap patterns and flag each:

| Pattern | Flag |
|---------|------|
| AC says "valid input" without defining valid | ⚠️ Undefined boundary |
| AC says "error message" without specifying the message | ⚠️ Missing message text |
| AC references another ticket/system without link | ⚠️ External dependency |
| AC describes behavior for one role only | ⚠️ Missing role coverage |
| AC mentions "sometimes" / "may" / "should" | ⚠️ Ambiguous requirement |
| AC has no defined actor | ⚠️ Missing actor |
| AC mentions "performance" without SLA numbers | ⚠️ Unmeasurable criterion |
| Multiple ACs contradict each other | 🔴 Conflict detected |

All flagged items → `risk-analysis.md` and `test-summary.md` warnings section.

---

## Phase 3: Scenario Brainstorm Matrix

For each AC, generate scenarios across all relevant quadrants:

### Quadrant 1 — Positive (Happy Path)
- Minimal valid input → success
- All optional fields filled → success
- Each user role → their permitted happy path
- Boundary valid values (min allowed, max allowed)

### Quadrant 2 — Negative (Validation & Errors)
- Required field left empty
- Invalid format (email without @, negative number, future date where past required)
- Value below minimum
- Value above maximum
- Unauthorized role attempting a restricted action
- Already-exists / duplicate data
- Expired session / token
- Incorrect credentials
- CSRF / replay attack (if auth present)
- API called without required headers

### Quadrant 3 — Edge Cases (Boundary & State)
- Exactly at minimum boundary
- Exactly at maximum boundary
- Null/undefined/whitespace-only input
- Unicode / special characters / emoji in text fields
- Very long strings (1000+ chars)
- Concurrent duplicate submissions
- Rapid repeated button clicks (double-submit)
- Browser back button after action
- Page refresh mid-flow
- Timeout during long operation
- Network drop mid-request
- File upload: zero-byte file, max-size file, unsupported format

### Quadrant 4 — Non-Functional
- **Security**: Role escalation, direct URL access without auth, injection in all input fields
- **Accessibility**: All form fields have labels, keyboard tab order, screen reader announcements, color contrast
- **API**: Correct HTTP status codes (200/201/400/401/403/404/422/500), response schema, pagination, rate limiting

---

## Phase 4: Priority Assignment

Assign priority to each planned scenario:

| Priority | Criteria |
|----------|----------|
| `@HighPriority` | Auth, payments, data loss, core CRUD, main user flow |
| `@MediumPriority` | Secondary flows, optional features, search/filter, pagination |
| `@LowPriority` | Cosmetic UI, help text, non-critical informational pages |

Mark `@Smoke` on: the single most critical happy-path scenario per feature + the primary auth scenario.

---

## Phase 5: Reusability Analysis

Before writing individual `Scenario` blocks, check:

- Are 3+ scenarios sharing the same precondition? → Extract to `Background`
- Are 3+ scenarios differing only by input data? → Use `Scenario Outline` + `Examples`
- Are steps from existing feature files reusable? → Reuse exact phrasing for step definition reuse

---

## Phase 6: Coverage Mapping

Build a coverage matrix before writing scenarios:

```
| AC-ID | AC Text (short) | Positive | Negative | Edge | Security | Accessible |
|-------|-----------------|----------|----------|------|----------|------------|
| AC-1  | User can login  |    2     |    3     |  2   |    1     |     1      |
| AC-2  | ...             |    ...   |    ...   | ...  |    ...   |    ...     |
```

This matrix drives the coverage JSON and ensures nothing is missed.

---

## Phase 7: Risk Register

Build a risk register:

```
| Risk Area | Description | Risk Level | Mitigation Scenarios |
|-----------|-------------|------------|----------------------|
| Authentication | JWT expiry handling | High | SC-12, SC-13 |
| Input validation | XSS in comment field | High | SC-21 |
| Role permission | Manager accessing admin panel | High | SC-08 |
| Data integrity | Duplicate submission | Medium | SC-19 |
| UX | Form state lost on refresh | Medium | SC-17 |
```

Risk levels: **High** (auth/payments/data), **Medium** (flow logic), **Low** (cosmetic/informational).

---

## Analysis Output Checklist

Before generating Gherkin, confirm:
- [ ] All ACs are decomposed and numbered
- [ ] Gap analysis complete — all flags recorded
- [ ] Scenario brainstorm matrix filled for all ACs
- [ ] Priority assigned to every planned scenario
- [ ] Reusability opportunities identified (Background, Outline)
- [ ] Coverage matrix complete
- [ ] Risk register complete

Only when all boxes are checked → proceed to Gherkin generation.

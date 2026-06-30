# Smoke Test Cases — UWB-3: View Submissions in Tabular List
# Ticket: https://unitededucators.atlassian.net/browse/UWB-3
# Generated: 2026-05-21

---

## TC-UWB3-SMOKE-001: Submissions table renders on page load
| Field | Value |
|---|---|
| **ID** | TC-UWB3-SMOKE-001 |
| **Priority** | P0 |
| **Type** | Smoke |
| **AC** | AC-01 |

**Preconditions:** User is authenticated; navigated to `/submissions`

**Steps:**
1. Navigate to `/submissions`
2. Verify table is visible

**Expected Result:** Table renders with at least one row of submission data; no error state shown

---

## TC-UWB3-SMOKE-002: All required columns are present
| Field | Value |
|---|---|
| **ID** | TC-UWB3-SMOKE-002 |
| **Priority** | P0 |
| **Type** | Smoke |
| **AC** | AC-01 |

**Preconditions:** User is on `/submissions`

**Steps:**
1. Inspect column headers of the submissions table

**Expected Result:** Columns visible: Member/Institution, Type, Products, Stage, Underwriter, Appetite, Premium, Need By, Effective

---

## TC-UWB3-SMOKE-003: Member/Institution cell shows sub-details
| Field | Value |
|---|---|
| **ID** | TC-UWB3-SMOKE-003 |
| **Priority** | P0 |
| **Type** | Smoke |
| **AC** | AC-02 |

**Preconditions:** User is on `/submissions`; at least one row visible

**Steps:**
1. Inspect the first row's Member/Institution cell

**Expected Result:** Cell contains: account name text, SUB-ID (e.g. SUB-7842), state abbreviation (e.g. MD), brokerage name

---

## TC-UWB3-SMOKE-004: Clicking a row navigates to submission detail
| Field | Value |
|---|---|
| **ID** | TC-UWB3-SMOKE-004 |
| **Priority** | P0 |
| **Type** | Smoke |
| **AC** | AC-06 |

**Preconditions:** User is on `/submissions`; at least one row visible

**Steps:**
1. Click anywhere on the first submission row

**Expected Result:** Browser navigates to `/submission/{SUB-ID}`; page title/heading reflects that submission

**Note:** Live app uses `/submission/` (singular), not `/submissions/` as spec states — see discrepancy D-01

---

## TC-UWB3-SMOKE-005: Pagination controls are visible
| Field | Value |
|---|---|
| **ID** | TC-UWB3-SMOKE-005 |
| **Priority** | P0 |
| **Type** | Smoke |
| **AC** | AC-05 |

**Preconditions:** User is on `/submissions`; more than 5 total submissions exist

**Steps:**
1. Scroll to the bottom of the table
2. Locate the pagination footer

**Expected Result:** Pagination footer visible with "Showing X–Y of N submissions · Page Z of M" text; Previous and Next buttons present; page number buttons present

---

## TC-UWB3-SMOKE-006: Products column shows pill badges
| Field | Value |
|---|---|
| **ID** | TC-UWB3-SMOKE-006 |
| **Priority** | P1 |
| **Type** | Smoke |
| **AC** | AC-01 |

**Preconditions:** User is on `/submissions`; row with product tags visible

**Steps:**
1. Inspect the Products column of the first row

**Expected Result:** Product codes rendered as pill badges (e.g. EPL, ELL, ML); overflow shown as "+N"

---

# Boundary Test Cases — UWB-3: View Submissions in Tabular List
# Ticket: https://unitededucators.atlassian.net/browse/UWB-3
# Generated: 2026-05-21

---

## TC-UWB3-BNDRY-001: Page size boundary — exactly 5 rows on first page
| Field | Value |
|---|---|
| **ID** | TC-UWB3-BNDRY-001 |
| **Priority** | P1 |
| **Type** | Boundary |

**Steps:**
1. Navigate to `/submissions`
2. Count rows on page 1

**Expected Result:** Exactly 5 rows visible; footer shows "Showing 1 – 5 of N submissions"; "Next" is enabled (if N > 5)

---

## TC-UWB3-BNDRY-002: Single submission — entire table on one row
| Field | Value |
|---|---|
| **ID** | TC-UWB3-BNDRY-002 |
| **Priority** | P2 |
| **Type** | Boundary |

**Steps:**
1. In a test environment, set up exactly 1 submission
2. Navigate to `/submissions`

**Expected Result:** Table shows 1 row; footer shows "Showing 1 – 1 of 1 submissions · Page 1 of 1"; Previous and Next both disabled

---

## TC-UWB3-BNDRY-003: Premium value at $0
| Field | Value |
|---|---|
| **ID** | TC-UWB3-BNDRY-003 |
| **Priority** | P2 |
| **Type** | Boundary |

**Steps:**
1. Find or create a submission with $0 premium
2. Navigate to `/submissions` and locate that row

**Expected Result:** Premium cell shows "$0" or "$0.00"; sorting by Premium places it first (ascending) or last (descending)

---

## TC-UWB3-BNDRY-004: Need By date today
| Field | Value |
|---|---|
| **ID** | TC-UWB3-BNDRY-004 |
| **Priority** | P1 |
| **Type** | Boundary |

**Steps:**
1. Find or create a submission with Need By date = today
2. Navigate to `/submissions`; sort by Need By ascending

**Expected Result:** "Today" entry appears correctly; cell displays current date in consistent format; no "overdue" visual indicator assumed unless designed

---

## TC-UWB3-BNDRY-005: Products column with exactly 1 product
| Field | Value |
|---|---|
| **ID** | TC-UWB3-BNDRY-005 |
| **Priority** | P2 |
| **Type** | Boundary |

**Steps:**
1. Find a submission with exactly 1 product selected
2. Locate that row in the table

**Expected Result:** Single pill badge displayed; no "+0" overflow indicator shown

---

## TC-UWB3-BNDRY-006: Appetite at 0% and 100% boundaries
| Field | Value |
|---|---|
| **ID** | TC-UWB3-BNDRY-006 |
| **Priority** | P2 |
| **Type** | Boundary |

**Steps:**
1. Find or create submissions with 0% and 100% appetite scores
2. Navigate to `/submissions`

**Expected Result:** "0%" and "100%" display correctly in the Appetite column; no rendering error at extremes

---

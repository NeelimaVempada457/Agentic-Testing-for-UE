# Edge Case Test Cases — UWB-3: View Submissions in Tabular List
# Ticket: https://unitededucators.atlassian.net/browse/UWB-3
# Generated: 2026-05-21

---

## TC-UWB3-EDGE-001: Last page shows partial set of rows
| Field | Value |
|---|---|
| **ID** | TC-UWB3-EDGE-001 |
| **Priority** | P1 |
| **Type** | Edge Case |

**Steps:**
1. Navigate to `/submissions`
2. Click page 4 (last page) of 4 pages (18 total, last page has 3 rows)

**Expected Result:** Last page shows exactly 3 rows; footer reads "Showing 16 – 18 of 18 submissions · Page 4 of 4"; "Next" button is disabled

---

## TC-UWB3-EDGE-002: All submissions belong to one stage
| Field | Value |
|---|---|
| **ID** | TC-UWB3-EDGE-002 |
| **Priority** | P2 |
| **Type** | Edge Case |

**Steps:**
1. Filter table to show only "New" stage submissions
2. Check stage badge consistency

**Expected Result:** All visible rows show the same stage badge colour; stage badge renders correctly for single-stage view

---

## TC-UWB3-EDGE-003: Account name with very long text does not break table layout
| Field | Value |
|---|---|
| **ID** | TC-UWB3-EDGE-003 |
| **Priority** | P2 |
| **Type** | Edge Case |

**Steps:**
1. If possible, create or find a submission with an institution name > 50 characters
2. Locate that row in the table

**Expected Result:** Long name truncates with ellipsis or wraps within the cell; table layout is not broken; other columns remain aligned

---

## TC-UWB3-EDGE-004: Submission with all product types selected
| Field | Value |
|---|---|
| **ID** | TC-UWB3-EDGE-004 |
| **Priority** | P2 |
| **Type** | Edge Case |

**Steps:**
1. Find or create a submission with EPL, ELL, GL, Cyber, ML all selected
2. Locate that row in the table

**Expected Result:** Products cell shows some pills with "+N" overflow; cell height is consistent; no layout overflow into adjacent cells

---

## TC-UWB3-EDGE-005: Sort then paginate preserves sort order
| Field | Value |
|---|---|
| **ID** | TC-UWB3-EDGE-005 |
| **Priority** | P1 |
| **Type** | Edge Case |

**Steps:**
1. Sort table by "Need By" date ascending
2. Navigate to page 2

**Expected Result:** Page 2 continues the sorted order — rows on page 2 have later Need By dates than all rows on page 1

---

## TC-UWB3-EDGE-006: Exactly 5 total submissions — single page only
| Field | Value |
|---|---|
| **ID** | TC-UWB3-EDGE-006 |
| **Priority** | P2 |
| **Type** | Edge Case |

**Steps:**
1. In a test environment, set up exactly 5 submissions
2. Navigate to `/submissions`

**Expected Result:** All 5 rows show on page 1; footer reads "Showing 1 – 5 of 5 submissions · Page 1 of 1"; both Previous and Next buttons are disabled; no page number buttons beyond "1"

---

## TC-UWB3-EDGE-007: Tab switching changes table data correctly
| Field | Value |
|---|---|
| **ID** | TC-UWB3-EDGE-007 |
| **Priority** | P1 |
| **Type** | Edge Case |

**Steps:**
1. On `/submissions`, note the row count in "My Queue" tab
2. Click "All" tab
3. Compare row counts

**Expected Result:** "All" tab shows all submissions (not filtered to current user's queue); total count increases or matches total in subtitle; no data corruption on switch

---

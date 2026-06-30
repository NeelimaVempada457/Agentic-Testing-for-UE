# Description — UWB-12

**Navigation**:

_Homepage / Submissions / New Submission → on Account Selection (re-runs on Product change)_

**Story**

| **As an** | Underwriter or BD User |
| --- | --- |
| **I want to** | have the system automatically suggest the correct submission type (New Business, Cross-Sell, or Renewal) when I select an account — and re-evaluate if I change the selected products |
| **So that** | I spend less time on manual classification, reduce miscategorization errors, and ensure downstream workflows (legal notice eligibility, renewal automation, cross-sell flags) trigger correctly from the start |

**Context / Gap Note**

In UWB-1 (NB-01: Create New Submission for New Business and Cross Sell), the Submission Type field is a mandatory radio button (New Business / Cross-sell) that the user selects manually. Renewal is not covered in UWB-1. No system logic currently exists to auto-determine or suggest the correct type. This story adds that detection layer on top of the existing field — the field remains user-editable at all times.

**Detection Logic**



!image-20260601-111826.png|width=659,alt="image-20260601-111826.png"!

| Member Status | Current Year Submissions | Policy Number | Product Match | Decision |
| --- | --- | --- | --- | --- |
| Prospect / Prior Member | Any | Any | Any | New Business |
| Member | 1 Renewal | Same for all products | Same as expiring | Renewal |
| Member | 2 Renewals | Different per product | Same as expiring | Companion Policy |
| Member | 2 Renewals | Same for both | One matches expiring, one new | Cross-Sell |

**Key Rules:**

| # | Rule |
| --- | --- |
| 1 | If Member Status is **Prospect** or **Prior Member** → Always **New Business** (regardless of submissions, policy numbers, or products) |
| 2 | If Member Status is **Member** AND there is **exactly 1 Renewal Submission** with the **same policy number for all products** AND all products match the expiring policy → **Renewal** |
| 3 | If Member Status is **Member** AND there are **2 Renewal Submissions** with **different policy numbers** (one per product) AND all products match the expiring policy → **Companion Policy** |
| 4 | If Member Status is **Member** AND there are **2 Renewal Submissions** with the **same policy number** for both AND one product matches expiring policy, the other is new → **Cross-Sell** |
| 5 | Any submission type not matching Rules 1–4 → Not defined (error / manual review required) |

## Acceptance Criteria

### AC1 – New Business

| ID | Criterion |
| --- | --- |
| AC1.1 | When Member Status = **Prospect** → Submission Type defaults to **New Business** |
| AC1.2 | When Member Status = **Prior Member** → Submission Type defaults to **New Business** |
| AC1.3 | Current Year Submissions, Policy Number, and Product Match do **not** change the decision for Prospect or Prior Member |

### AC2 – Renewal

| ID | Criterion |
| --- | --- |
| AC2.1 | When Member Status = **Member** AND there is **only 1 Renewal Submission** for the current year → System checks that the same policy number applies to **all products** in the submission |
| AC2.2 | When the above is true AND every product matches the expiring policy → Submission Type = **Renewal** |
| AC2.3 | If there is 1 Renewal Submission but policy numbers differ by product → **Not a Renewal** (must evaluate other rules) |

### AC3 – Companion Policy

| ID | Criterion |
| --- | --- |
| AC3.1 | When Member Status = **Member** AND there are **exactly 2 Renewal Submissions** for the current year → System checks that each submission has a **different policy number** (one per product) |
| AC3.2 | When the above is true AND all products match the expiring policy → Submission Type = **Companion Policy** |

### AC4 – Cross-Sell

| ID | Criterion |
| --- | --- |
| AC4.1 | When Member Status = **Member** AND there are **exactly 2 Renewal Submissions** for the current year → System checks that both submissions share the **same policy number** |
| AC4.2 | When the above is true AND **exactly one** product matches the expiring policy while the **other product is new** (not in expiring package) → Submission Type = **Cross-Sell** |
| AC4.3 | If both products are new → Not a Cross-Sell per this table (undefined) |
| AC4.4 | If both products match expiring policy with same policy number → This would be **Renewal** (Rule 2), not Cross-Sell |

### AC5 – Edge Cases & Validation

| ID | Criterion |
| --- | --- |
| AC5.1 | If Member Status = **Member** but current year submissions do **not** match any of the three patterns (1 Renewal same PN, 2 Renewals different PNs, 2 Renewals same PN with one new product) → System returns **"Unable to determine – manual review required"** |
| AC5.2 | If Member Status = **Member** but there are **0 submissions** for current year → Not covered by this table (likely New Business or manual entry) |
| AC5.3 | If Member Status = **Member** but there are **3+ submissions** → Not covered by this table |
| AC5.4 | "Product Match" means: compare product codes in submission to product codes on the expiring policy (exact match required) |

**Dependencies:**

PCAS API (active and expiring policy lookup by account and product); Submission database (prior submission history); Salesforce (account record); configurable renewal window parameter in system settings
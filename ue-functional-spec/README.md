# UE Functional Spec

**Project:** United Educators (UE)
**Document Type:** Functional Requirements Specification
**Owner:** QA / Product Team

---

## Purpose

This folder is the single source of truth for all UE functional requirements. Requirements are captured here as they are provided, organized into **Modules** and **Features**, and used downstream to generate test cases, Gherkin scenarios, and traceability reports.

---

## Folder Structure

```
ue-functional-spec/
  README.md                      ← This file
  UE-FUNCTIONAL-SPEC-INDEX.md    ← Master requirements index (all modules)
  M1-<ModuleName>/
    MODULE.md                    ← Module overview, scope, actors
    F1-<FeatureName>/
      REQUIREMENTS.md            ← Feature-level requirements (FR, NFR, rules)
    F2-<FeatureName>/
      REQUIREMENTS.md
  M2-<ModuleName>/
    ...
```

### Naming Conventions

| Artifact | Convention | Example |
|---|---|---|
| Module folder | `M<N>-<PascalCaseName>` | `M1-UserRegistration` |
| Feature folder | `F<N>-<PascalCaseName>` | `F1-PasswordPolicy` |
| Module doc | `MODULE.md` | — |
| Feature requirements | `REQUIREMENTS.md` | — |

---

## How to Add Requirements

When you describe a requirement in a prompt, Claude Code will:
1. Identify which Module and Feature it belongs to (or create a new one).
2. Write it into the appropriate `REQUIREMENTS.md`.
3. Update `UE-FUNCTIONAL-SPEC-INDEX.md` to reflect the change.

---

## Downstream Usage

Each `REQUIREMENTS.md` is the input for:
- `/generate-test-cases` — generates Playwright spec files per feature
- `/generate-gherkin` — generates `.feature` BDD files per feature

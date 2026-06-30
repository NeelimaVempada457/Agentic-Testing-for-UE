# Complete Ticket Context: BOSLFS-1584

> **Generated:** 2026-05-15T09:54:23.958Z
> **Jira URL:** https://theksquaregroupglobal.atlassian.net/browse/BOSLFS-1584

---

## Summary

**Backlog Item: Vin number for vehicles is not being pulled to the Movable Asset Collateral Agreement**

| Field | Value |
|---|---|
| Status | UAT Complete |
| Priority | Highest |
| Type | Story |
| Assignee | Vernette Symphorien |
| Reporter | Vernette Symphorien |
| Story Points | N/A |
| Labels | BOSLLOS1.8.0 |
| Components | None |
| Created | 26/01/2026, 18:25:41 |
| Updated | 11/05/2026, 16:30:17 |

---

## Description

[~accountid:62e946413cc20c06c8ae8839] Vin number for vehicle loans is not pulling to the MACA form. In this scenario the vehicle does not have a Chassis no. but it does have a Vin. The Vin number must also pull onto the MACA form. This happened in the live environment [~accountid:712020:56ae8e42-105a-42ca-975d-78458889866f] 

[^Missing VIN on MACA.pdf]

[~accountid:626ff8c876b8d3006872261d]   Edit the Document to Place the Chasis NO / VIN NO: and add a conditional if the System read that the Chasis NO is Populated, will add this information, if is Blank and the VIN No is populated will add this information instead.

As system, I want to

!image-20260225-145800 (f63cad8d-723a-4722-8337-10f88e8339cd).png|width=659,alt="image-20260225-145800.png"!

---

## Acceptance Criteria

_No explicit acceptance criteria found_

---

## Comments (16)

### 1. jean.lopez — 27/01/2026, 19:17:12

Hello @Vernette Symphorien, We can include the VIN number as part of the Document. but we need to validate were should we allocate the VIN number field since is not part of the initial scope in the doc? 

!image-20260127-191708.png|width=539,alt="image-20260127-191708.png"!

### 2. jean.lopez — 29/01/2026, 18:04:32

@Vernette Symphorien @Deepthi Kolli @Dwain Peter , we need the confirmation of where the VIN Number will be located. 

### 3. Vernette Symphorien — 18/02/2026, 14:01:38

@jean.lopez @Carlene Charlemagne @Marcia George The Vin number should be located below “Year Model”. Where there is a VIN number, the Engine and Chassis number *should NOT appear on the MACA.*

Where there is Engine and Chassis number, the VIN number should not be available or should be hidden.

### 4. jean.lopez — 18/02/2026, 14:58:07

@Vernette SymphorienGood day,

Since the generated document templates only support a single sample, I recommend creating a new *MACA - VIN Number* form to meet this requirement. So the Officers will Choose to generate the Doc with the Chasis Number or the one with the VIN.

*Proposed Form Changes:*

* *Add Field:* "VIN Number" (to be placed directly below "Year Model").
* *Remove Fields:* "Engine Number" and "Chassis Number."

Please let me know if you approve this approach so we can proceed with the update.

@Marcia George @Carlene Charlemagne @Deepthi Kolli 

### 5. Vernette Symphorien — 25/02/2026, 14:48:31

@jean.lopez @Marcia George @Dwain Peter We do not need a new form; can you include a login that if the Chassis number field is blank and a value is entered in the Vin number field that the information pulled to the MACA would automatically be the Vin number. The opposite would apply if the Vin number field were blank; confirming that it’s either Chassis/Vin number.

### 6. jean.lopez — 25/02/2026, 14:58:06

@Vernette Symphorien What we can do is to the Edit the Document to Place the Chasis NO / VIN NO: and add a conditional if the System read that the Chasis NO is Populated, will add this information, if is Blank and the VIN No is populated will add this information instead. 

!image-20260225-145800.png|width=659,alt="image-20260225-145800.png"!

### 7. Vernette Symphorien — 02/03/2026, 12:59:41

@jean.lopez @Dwain Peter @Monette Johny Labanard @Marcia GeorgeTHE TEAM HAS AGREED WITH THE FOLLOWING SUGGESTION : *“What we can do is to the Edit the Document to Place the Chassis NO / VIN NO: and add a conditional if the System read that the Chassis NO is Populated, will add this information, if is Blank and the VIN No is populated will add this information instead.”* 

### 8. Shivaji Gundabattina — 13/04/2026, 15:09:12

Hi @jean.lopez / @Amarnath Marupilla ,
QA estimate for this ticket is 3hrs.

### 9. Alexander Peña Melikhov — 24/04/2026, 13:01:30

@jean.lopez @Amarnath Marupilla Is there a specific record I can use to replicate he issue with all the data set?

### 10. Alexander Peña Melikhov — 28/04/2026, 09:25:31

@jean.lopez @Shivaji Gundabattina Added VIN NO Validation for document.[^2378 - Mortgage - Digital Technology INC-Movable Asset Collateral Agreement - Many Assets-a1JWA000007a6xJ2AQ.pdf] 

### 11. Shivaji Gundabattina — 29/04/2026, 06:58:55

Hi @jean.lopez / @Alexander Peña Melikhov/ @Vernette Symphorien  , I see Chasis NO & VIN NO are getting populated correctly. Please review the below test cases.

*Test Cases:*

# As a Docugenius Officer when I generated *MACA* document, I should see *Chasis NO* getting printed on the document when the *Automobile* asset has both *Chasis NO* and *VIN NO* populated on it.
Asset
!image-20260429-082326.png|width=529,alt="image-20260429-082326.png"!
Movable Asset Collateral Agreement
!image-20260429-082439.png|width=529,alt="image-20260429-082439.png"!
Movable Asset Collateral Agreement - Many Assets
!image-20260429-082537.png|width=529,alt="image-20260429-082537.png"!
# As a Docugenius Officer when I generated *MACA* document, I should see *VIN NO* getting printed on the document when the *Automobile* asset has *VIN NO* populated and *Chasis NO* left blank.
Asset
!image-20260429-083602.png|width=529,alt="image-20260429-083602.png"!
Movable Asset Collateral Agreement
!image-20260429-083747.png|width=529,alt="image-20260429-083747.png"!
Movable Asset Collateral Agreement - Many Assets
!image-20260429-083906.png|width=529,alt="image-20260429-083906.png"!
# As a Docugenius Officer when I generated *MACA* document, I should see *Chasis NO* getting printed on the document when the *Automobile* asset has *Chasis NO* populated and *VIN NO* left blank.
Asset
!image-20260429-084111.png|width=529,alt="image-20260429-084111.png"!
Movable Asset Collateral Agreement
!image-20260429-083817.png|width=529,alt="image-20260429-083817.png"!
Movable Asset Collateral Agreement - Many Assets
!image-20260429-084018.png|width=529,alt="image-20260429-084018.png"!
# As a Docugenius Officer when I generated *MACA* document, I should see *Blank* for *Chasis NO/VIN NO* field in the document when the Automobile asset has *Chasis NO* populated and *VIN NO* left blank.
Asset
!image-20260429-084223.png|width=529,alt="image-20260429-084223.png"!
Movable Asset Collateral Agreement
!image-20260429-084321.png|width=529,alt="image-20260429-084321.png"!
Movable Asset Collateral Agreement - Many Assets
!image-20260429-084330.png|width=529,alt="image-20260429-084330.png"!



*Observation:*
Automobile Asset information indentation is not starting at the same point for all the assets in MACA Document.

!image-20260429-091825.png|width=553,alt="image-20260429-091825.png"!

### 12. Alexander Peña Melikhov — 05/05/2026, 08:57:02

@Shivaji Gundabattina @jean.lopez  Fixed movable asset collateral agreement, automobile asset data alignment [^2340 - Mortgage - Techland Limited-Movable Asset Collateral Agreement - Many Assets-a1JWA000007MCrJ2AW.pdf] [^2373 - Mortgage - Gareth Edwards-Movable Asset Collateral Agreement - Many Assets-a1JWA000007XR3p2AG.pdf] 

### 13. Alexander Peña Melikhov — 05/05/2026, 08:58:05

@jean.lopez  @Shivaji Gundabattina  @Amarnath Marupilla  Fixed information alignment 

!image-20260505-085759.png|width=425,alt="image-20260505-085759.png"!

### 14. Shivaji Gundabattina — 05/05/2026, 16:19:39

Hi @jean.lopez / @Alexander Peña Melikhov/ @Vernette Symphorien  , Now I see the information of Assets are correctly aligned in the MACA document.
Movable Asset Collateral Agreement - Many Assets

!image-20260505-161701.png|width=578,alt="image-20260505-161701.png"!

Movable Asset Collateral Agreement


!image-20260505-161850.png|width=561,alt="image-20260505-161850.png"!

### 15. Vernette Symphorien — 07/05/2026, 12:53:28

@jean.lopez @Deepthi Kolli @Monette Johny Labanard @Marcia George This ticket can be closed

### 16. Monette Johny Labanard — 07/05/2026, 12:54:43

@Deepthi Kolli @jean.lopez Approved

---

## Linked Issues

_No linked issues_

---

## Subtasks (0)

_No subtasks_

---

## Attachments (0)

_No attachments_

---

## Important Observations

- ℹ️ **No components** assigned
- 🔴 **Highest priority** ticket

---

*Auto-generated by fetch-jira-details skill · 2026-05-15T09:54:23.958Z*
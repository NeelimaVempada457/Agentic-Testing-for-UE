# Complete Ticket Context: BDBP1-204

> **Generated:** 2026-05-18T12:51:05.648Z
> **Jira URL:** https://theksquaregroupglobal.atlassian.net/browse/BDBP1-204

---

## Summary

**Registration Form: Select Product **

| Field | Value |
|---|---|
| Status | UAT Deployed |
| Priority | Highest |
| Type | Story |
| Assignee | Namratha Matcha |
| Reporter | Prachi Jangid |
| Story Points | N/A |
| Labels | None |
| Components | None |
| Created | 09/11/2025, 04:58:36 |
| Updated | 25/02/2026, 10:12:39 |

### Epic

**BDBP1-153:** Digital Portal (Customer)  |  User Journey
Status: To Do

---

## Description

*As a* Customer,
*I want* to view and interact with the Select Product section in the Registration Form, grouped by category, and optionally add additional products,
*So that* I can select the products I need and proceed to the next step in the application process.

Note: Products and product related information need to be displayed dynamically by pulling information from salesforce for latest product details.

*Screen UI:*

The complete screen of which the +Select Products+ will be a part of-

!image-20260122-084117.png|width=764,alt="image-20260122-084117.png"!

!image-20260122-084049.png|width=776,alt="image-20260122-084049.png"!

This screen is the Registration Form screen, and the Select Products component will be placed within this screen as shown above.

+Products and product Information+ : [Product Details Information.xlsx|https://ecfhbosl.sharepoint.com/:x:/r/sites/DigitalBranchExpericeneCloudforDigitalbranch/Shared%20Documents/Digital%20Branch%20Expericene%20Cloud%20for%20Digital%20branch/1-Initiation/Product%20Details%20Information.xlsx?d=wf9304aff1a0d4948bb94d0c1ce901c83&csf=1&web=1&e=sE1uMl]

h3. *Acceptance Criteria*

* Haeder and Footer" should be consistent on the community theme covered in story [https://theksquaregroupglobal.atlassian.net/browse/BDBP1-94|https://theksquaregroupglobal.atlassian.net/browse/BDBP1-94|smart-link]  
* Left Side component is consistent on the community theme covered by Jira Ticket [https://theksquaregroupglobal.atlassian.net/browse/BDBP1-95|https://theksquaregroupglobal.atlassian.net/browse/BDBP1-95|smart-link]
* *Category Cards*
** Bank Accounts
** Debit Cards
** Credit Cards
** Loans
** When a user clicks a category card:
*** Highlight the selected card.
*** Display related products below the cards based on category:
**** Bank Accounts → A+ Club, Regular Savings, Home Start
**** Debit Cards → BOSL International Debit Card
**** Credit Cards → BOSL VISA Credit Card
**** Loans → Demand Loan, Land Loan, Mortgage Loan, Personal Loan, Vehicle Loan - New, Vehicle Loan - Old
* Additional Products Section
** Display a section titled:
_“Before you continue, need anything else?”_
** Show checkboxes for optional products:
*** BOSL VISA Credit Card
*** Personal Loan
*** BOSL International Debit Card
** The “Additional Products” section will display optional cross-sell products.
If the customer has already selected a product as the primary product, that same product must not be displayed again as an optional checkbox in the Additional Products section.
* Validation
** If no primary product is selected, display error message:
“Please select a product to continue.”
** Validation occurs when the user tries to switch to next screen.
* Design Compliance
** BOSL branding (colors, fonts, logo) applied consistently.
* *Behaviour*:
** If triggered from the Landing Page when Customer clicks on Start Application, the product won’t be auto selected.
** If triggered from specific Product Detail Page on +Our Products+, the respective Product must be auto selected when the user is navigated to this screen.

!image-20251109-045900.png|width=831,alt="image-20251109-045900.png"!

*Significance*

This section is critical for guiding customers to select the correct product category and related products. It improves user experience by offering clear grouping, optional add-ons, and intuitive navigation, reducing errors and enhancing engagement.

*Definition of Done*

* Category cards implemented per Figma design and clickable.
* Related products displayed dynamically based on selected category on the Open An Account Form.
* Additional products section with checkboxes implemented and functional.
* Navigation buttons (Continue, Save Progress, Back to Dashboard) work as expected.
* Validation ensures at least one product is selected before proceeding.
* Continue button redirects to Instructions screen.
* QA validates responsiveness and usability across devices.
* Smoke tests pass successfully in staging environment.
* UAT sign-off obtained from BOSL team.

*Dependencies*

* BOSL branding guidelines and reusable header/footer components.
* Mapping of product categories and related products from Salesforce Product2 object.
* Backend readiness for saving product selections.

*Risks*

* Incorrect mapping of products to categories may display wrong options.
* Validation errors could allow users to proceed without selecting a product.
* Navigation issues may block progress to the next section.
* Branding inconsistencies may reduce trust and user confidence.

Cards items referenced in this story are included in the attached folder *card.zip*.

Figma Design Link [https://www.figma.com/design/qnSIfJ2qLOZQiEAZzasyDl/BOSL-%E2%80%93-Web-Banking%E2%80%8B?node-id=1185-31061&t=IadMaXkVs8eytvpR-4|https://www.figma.com/design/qnSIfJ2qLOZQiEAZzasyDl/BOSL-%E2%80%93-Web-Banking%E2%80%8B?node-id=1185-31061&t=IadMaXkVs8eytvpR-4|smart-link] [https://www.figma.com/design/qnSIfJ2qLOZQiEAZzasyDl/BOSL-%E2%80%93-Web-Banking%E2%80%8B?node-id=1185-31814&t=IadMaXkVs8eytvpR-4|https://www.figma.com/design/qnSIfJ2qLOZQiEAZzasyDl/BOSL-%E2%80%93-Web-Banking%E2%80%8B?node-id=1185-31814&t=IadMaXkVs8eytvpR-4|smart-link] [https://www.figma.com/design/qnSIfJ2qLOZQiEAZzasyDl/BOSL-%E2%80%93-Web-Banking%E2%80%8B?node-id=1183-27370&t=IadMaXkVs8eytvpR-4|https://www.figma.com/design/qnSIfJ2qLOZQiEAZzasyDl/BOSL-%E2%80%93-Web-Banking%E2%80%8B?node-id=1183-27370&t=IadMaXkVs8eytvpR-4|smart-link] 

---

## Acceptance Criteria

*

* Haeder and Footer" should be consistent on the community theme covered in story [https://theksquaregroupglobal.atlassian.net/browse/BDBP1-94|https://theksquaregroupglobal.atlassian.net/browse/BDBP1-94|smart-link]  
* Left Side component is consistent on the community theme covered by Jira Ticket [https://theksquaregroupglobal.atlassian.net/browse/BDBP1-95|https://theksquaregroupglobal.atlassian.net/browse/BDBP1-95|smart-link]
* *Category Cards*
** Bank Accounts
** Debit Cards
** Credit Cards
** Loans
** When a user clicks a category card:
*** Highlight the selected card.
*** Display related products below the cards based on category:
**** Bank Accounts → A+ Club, Regular Savings, Home Start
**** Debit Cards → BOSL International Debit Card
**** Credit Cards → BOSL VISA Credit Card
**** Loans → Demand Loan, Land Loan, Mortgage Loan, Personal Loan, Vehicle Loan - New, Vehicle Loan - Old
* Additional Products Section
** Display a section titled:
_“Before you continue, need anything else?”_
** Show checkboxes for optional products:
*** BOSL VISA Credit Card
*** Personal Loan
*** BOSL International Debit Card
** The “Additional Products” section will display optional cross-sell products.
If the customer has already selected a product as the primary product, that same product must not be displayed again as an optional checkbox in the Additional Products section.
* Validation
** If no primary product is selected, display error message:
“Please select a product to continue.”
** Validation occurs when the user tries to switch to next screen.
* Design Compliance
** BOSL branding (colors, fonts, logo) applied consistently.
* *Behaviour*:
** If triggered from the Landing Page when Customer clicks on Start Application, the product won’t be auto selected.
** If triggered from specific Product Detail Page on +Our Products+, the respective Product must be auto selected when the user is navigated to this screen.

!image-20251109-045900.png|width=831,alt="image-20251109-045900.png"!

*Significance*

This section is critical for guiding customers to select the correct product category and related products. It improves user experience by offering clear grouping, optional add-ons, and intuitive navigation, reducing errors and enhancing engagement.

*Definition of Done*

* Category cards implemented per Figma design and clickable.
* Related products displayed dynamically based on selected category on the Open An Account Form.
* Additional products section with checkboxes implemented and functional.
* Navigation buttons (Continue, Save Progress, Back to Dashboard) work as expected.
* Validation ensures at least one product is selected before proceeding.
* Continue button redirects to Instructions screen.
* QA validates responsiveness and usability across devices.
* Smoke tests pass successfully in staging environment.
* UAT sign-off obtained from BOSL team.

*Dependencies*

* BOSL branding guidelines and reusable header/footer components.
* Mapping of product categories and related products from Salesforce Product2 object.
* Backend readiness for saving product selections.

*Risks*

* Incorrect mapping of products to categories may display wrong options.
* Validation errors could allow users to proceed without selecting a product.
* Navigation issues may block progress to the next section.
* Branding inconsistencies may reduce trust and user confidence.

Cards items referenced in this story are included in the attached folder *card.zip*.

Figma Design Link [https://www.figma.com/design/qnSIfJ2qLOZQiEAZzasyDl/BOSL-%E2%80%93-Web-Banking%E2%80%8B?node-id=1185-31061&t=IadMaXkVs8eytvpR-4|https://www.figma.com/design/qnSIfJ2qLOZQiEAZzasyDl/BOSL-%E2%80%93-Web-Banking%E2%80%8B?node-id=1185-31061&t=IadMaXkVs8eytvpR-4|smart-link] [https://www.figma.com/design/qnSIfJ2qLOZQiEAZzasyDl/BOSL-%E2%80%93-Web-Banking%E2%80%8B?node-id=1185-31814&t=IadMaXkVs8eytvpR-4|https://www.figma.com/design/qnSIfJ2qLOZQiEAZzasyDl/BOSL-%E2%80%93-Web-Banking%E2%80%8B?node-id=1185-31814&t=IadMaXkVs8eytvpR-4|smart-link] [https://www.figma.com/design/qnSIfJ2qLOZQiEAZzasyDl/BOSL-%E2%80%93-Web-Banking%E2%80%8B?node-id=1183-27370&t=IadMaXkVs8eytvpR-4|https://www.figma.com/design/qnSIfJ2qLOZQiEAZzasyDl/BOSL-%E2%80%93-Web-Banking%E2%80%8B?node-id=1183-27370&t=IadMaXkVs8eytvpR-4|smart-link]

---

## Comments (12)

### 1. Ankit Bhatia — 02/02/2026, 07:26:42

@Prachi Jangid 
For the additional products section are the below listed products fixed


* Additional Products Section
** Display a section titled:
_“Before you continue, need anything else?”_
** Show checkboxes for optional products:
*** BOSL VISA Credit Card
*** Personal Loan
*** BOSL International Debit Card

So for any product that the customer selects we are always going to show the above 3 products?

@Namratha Matcha 

### 2. Namratha Matcha — 04/02/2026, 16:47:48

@Ankit Bhatia Thank you for bringing this to our notice. 
@Arnav Gaddam The “Additional Products” section will display optional cross-sell products.
If the customer has already selected a product as the primary product, that same product must not be displayed again as an optional checkbox in the Additional Products section.

### 3. Arnav Gaddam — 09/02/2026, 08:58:00

@Prachi Jangid, @Namratha Matcha Can you please provide the Icons mentioned in this user story  

### 4. Namratha Matcha — 10/02/2026, 11:03:29

@Arnav Gaddam As product information is currently not present please use this sample text wherever needed
”Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.”

### 5. Arnav Gaddam — 11/02/2026, 11:36:03

As @Prachi Jangid , mentioned for the description related to the Sub Products will be different from the one mentioned in Figma Because it is fetched dynamically from the Description field of the Product Object.

The data which needs to be populated is yet to be given by the client.

CC : @Ankit Bhatia , @Yusuf Khan , @Neelima Vempada , @Nirdesh Banala , @Madhu Latha Gaddam , @Amarnath Marupilla 

### 6. Arnav Gaddam — 11/02/2026, 11:54:21

!image-20260211-114345.png|width=879,alt="image-20260211-114345.png"!

!image-20260211-114412.png|width=864,alt="image-20260211-114412.png"!



When we select “BOSL VISA Credit Card “ and “BOSL International Debit Card “, below their products are visible for selection this is because we are creating the records for “BOSL VISA Credit Card” and “BOSL International Debit Card”.
This is fine and acceptable as discussed with @Prachi Jangid.
CC :  @Ankit Bhatia , @Yusuf Khan , @Neelima Vempada , @Namratha Matcha , @Nirdesh Banala , @Madhu Latha Gaddam 

### 7. Arnav Gaddam — 12/02/2026, 17:08:45

As discussed with @Ankit Bhatia, we are using the “Description” field (Standard) for the “Product Card Description” and “Help Text” field (Standard) for Overall Description of the Product for storing and displaying the Information regarding those Products.

CC : @Yusuf Khan, @Prachi Jangid, @Namratha Matcha

### 8. Yusuf Khan — 16/02/2026, 15:53:38

as i can see the story is in Testing under QA moving to RDQA

### 9. Madhu Latha Gaddam — 16/02/2026, 16:13:01

@Yusuf Khan There is an Open bug, but for task there are only 3 statuses available, hence QA task is showing In Progress. Moving back to dev.

### 10. Madhu Latha Gaddam — 20/02/2026, 14:40:49

This story is currently *blocked by* [[BDBP1-157] Our Products Tab with Product Details - Landing Page - Jira|https://theksquaregroupglobal.atlassian.net/browse/BDBP1-157]. The dependent story is planned for *Sprint 4*, and the responsible developer has confirmed an *ETA of Monday*. After the development of the dependent story, an additional point still needs to be developed, which is required before testing can proceed. As aligned with Prachi, this story *cannot be closed until all dependent development and testing are completed*.
Moving this back to Dev.
CC: @Arnav Gaddam @Prachi Jangid @Neelima Vempada @Yusuf Khan 

### 11. Madhu Latha Gaddam — 24/02/2026, 09:36:22

The behaviour where the *respective product will be auto‑selected when the user navigates from a specific Product Detail Page* will be handled in a separate task that has already been created and linked to the corresponding _Our Products_ story.

This is as confirmed by @Prachi Jangid @Neelima Vempada @Namratha Matcha @Arnav Gaddam 

### 12. Madhu Latha Gaddam — 24/02/2026, 09:41:13

As the related bug has been closed and the functionality is working as expected as per the given requirements, proceeding to move the ticket to *UAT Deployed*.
CC: @Arnav Gaddam @Prachi Jangid @Neelima Vempada @Yusuf Khan 

---

## Linked Issues

- **Relates** → `BDBP1-99` Landing Page: Application to Approval Simplified Section  *(UAT Deployed)*
- **Blocks** → `BDBP1-408` Controlled Step Navigation for Account Registration Flow *(UAT Deployed)*
- **Blocks** → `BDBP1-410` Repurpose *(Backlog)*
- **Relates** → `BDBP1-159` Design Login Page and Sign Up Navigation *(UAT Deployed)*
- **Relates** → `BDBP1-491` BOSL Digital QA Bug – Select Product screen UI and component configuration do not meet design requirements *(Completed)*

---

## Subtasks (4)

- ✅ `BDBP1-385` Ability to navigate to Login Page from Start application on Digital site — *Done*
- ✅ `BDBP1-436` Dev- Registration form: Select products — *Done*
- ✅ `BDBP1-458` QA Task : Registration Form: Select Product — *Done*
- ✅ `BDBP1-480` Update Product Records for Displaying on Digital  — *Done*

---

## Attachments (7)

- ✅ **Cards.zip** (application/zip, 6.1 KB) uploaded by Richard Mena on 09/11/2025, 04:59:43
- ✅ **image-20251109-045900.png** (image/png, 102.2 KB) uploaded by Richard Mena on 09/11/2025, 04:59:06
- ✅ **image-20260122-084049.png** (image/png, 859.7 KB) uploaded by Prachi Jangid on 22/01/2026, 09:19:49
- ✅ **image-20260122-084117.png** (image/png, 36.2 KB) uploaded by Prachi Jangid on 22/01/2026, 09:19:49
- ✅ **image-20260211-114345.png** (image/png, 37.3 KB) uploaded by Arnav Gaddam on 11/02/2026, 11:54:20
- ✅ **image-20260211-114412.png** (image/png, 36.8 KB) uploaded by Arnav Gaddam on 11/02/2026, 11:54:19
- ✅ **image-20260225-101239.png** (image/png, 75.6 KB) uploaded by Prachi Jangid on 25/02/2026, 10:12:38

---

## Important Observations

- ℹ️ **No labels** set
- ℹ️ **No components** assigned
- 🔴 **Highest priority** ticket
- ⏰ **Stale** — last comment was 83 days ago
- 🚫 **2 blocker(s)** detected in linked issues
- 📸 **6 screenshot(s)** attached

---

*Auto-generated by fetch-jira-details skill · 2026-05-18T12:51:05.648Z*
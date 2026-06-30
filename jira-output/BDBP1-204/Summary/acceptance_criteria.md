# Acceptance Criteria — BDBP1-204

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
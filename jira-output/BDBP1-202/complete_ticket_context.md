# Complete Ticket Context: BDBP1-202

> **Generated:** 2026-05-18T12:54:12.551Z
> **Jira URL:** https://theksquaregroupglobal.atlassian.net/browse/BDBP1-202

---

## Summary

**Registration Form: Instruction Section **

| Field | Value |
|---|---|
| Status | UAT Deployed |
| Priority | Medium |
| Type | Story |
| Assignee | Prachi Jangid |
| Reporter | Prachi Jangid |
| Story Points | N/A |
| Labels | None |
| Components | None |
| Created | 09/11/2025, 04:01:04 |
| Updated | 04/03/2026, 09:34:20 |

### Epic

**BDBP1-153:** Digital Portal (Customer)  |  User Journey
Status: To Do

---

## Description

*As a* Customer,
*I want to* view and interact with the Instruction section, access picture requirements and compliance information, and navigate easily,
*So that* I can understand the required steps, review applicable requirements, and proceed confidently to complete the application process.

*Screen UI:*
The complete screen of which the Instructions Section will be a part of-

!image-20260129-122424.png|width=1208,alt="image-20260129-122424.png"!

This screen is the Registration Form screen, and the Instructions component will be placed within this screen as shown above.

h3. *Acceptance Criteria*

# Haeder and Footer" should be consistent on the Registration Page covered in story [https://theksquaregroupglobal.atlassian.net/browse/BDBP1-94|https://theksquaregroupglobal.atlassian.net/browse/BDBP1-94|smart-link] 
# Left Side component is consistent on the Registration Page covered by Jira Ticket [https://theksquaregroupglobal.atlassian.net/browse/BDBP1-95|https://theksquaregroupglobal.atlassian.net/browse/BDBP1-95|smart-link] 
# Instruction Section:
## !image-20260122-080238.png|width=1138,alt="image-20260122-080238.png"!
## Based on the products selected in the previous Select Product screen, product-specific instructions must appear as documented in:
##* [*Objects and Fields Details*|https://ksquaregroup.sharepoint.com/:x:/r/sites/ValueStreamManagement/_layouts/15/doc2.aspx?sourcedoc=%7BE4ECCB46-59DA-4F94-BCB1-851D50BEADA0%7D&file=Objects%20and%20Fields%20Details.xlsx&action=default&mobileredirect=true&DefaultItemOpen=1][ |https://ksquaregroup.sharepoint.com/:x:/r/sites/ValueStreamManagement/_layouts/15/doc2.aspx?sourcedoc=%7BE4ECCB46-59DA-4F94-BCB1-851D50BEADA0%7D&file=Objects%20and%20Fields%20Details.xlsx&action=default&mobileredirect=true&DefaultItemOpen=1](Products)
##* [*Product Details Information.xlsx*|https://ecfhbosl.sharepoint.com/:x:/r/sites/DigitalBranchExpericeneCloudforDigitalbranch/Shared%20Documents/Digital%20Branch%20Expericene%20Cloud%20for%20Digital%20branch/1-Initiation/Request%20from%20KSquare/Product%20Details%20Information.xlsx?d=w31b58cedcacf448385de724e493720b4&csf=1&web=1&e=2ldmkU] (Instructions tab)
## Important Compliance notice for U.S. citizens/residents regarding FATCA.
## Buttons Presented will be applicable for the different applicant’s residency types
### Individual (National) of ECCU Territories
### Resident Nationals of CARICOM (except ECCU territories)
### Non-Nationals/Residents Outside CARICOM
### Self –Employed Individuals
# *On Button Click*
#* Clicking on the applicable button to see documentation requirements

||{color:#ffffff}*Customer Type/Button Label*{color}||{color:#ffffff}*Identification*{color}||{color:#ffffff}*Residential Address*{color}||{color:#ffffff}*Additional Notes*{color}||
|# Individual (National) of ECCU Territories|One form of Valid (Unexpired) Government-Issued Picture Identification:
* Passport
* National Identification Card
* Social Security card
* Driver’s license
* Voter’s card|*NO PROOF OF ADDRESS REQUIRED:*
a. For Saint Lucian Nationals and Residents unless Customer type is listed as Companies / Unlisted Corporations|*Specific to Minors*
* Accounts on behalf of minors with no picture identification: parent/legal guardian subject to standard KYC requirements
* Birth certificate of minor|
|Resident Nationals of CARICOM
(except ECCU territories)|One Form of Valid (unexpired) Government Issued Identification:
* Passport and
* Driver’s License or National identification Card|Confirmation of Residential Address is required by any of the following documents:
* Original utility bill in the Customer’s Name dated within the last 3 months
* Tenancy agreement in the Customer’s Name
* Reference Letter from a Regulated Financial Institution stating Permanent Residential
\\
Address. (The relationship must be in existence for at least 1 year);
* Letter from Employer Confirming Address
* For persons with combined living arrangements, a letter issued by the utility bill owner,
\\
along with copy of the ID of utility bill owner, and the original utility bill dated within the
last 3 months.
* Bank statement issued within the last three (3) months showing the customer’s address.|N/A|
|Non-Nationals/
Residents
Outside
CARICOM|Two forms of valid (unexpired) Government Issued Identification
* Passport
* National Identification Card
* Social Security card
* Driver’s license
* Voter’s card|Confirmation of Residential Address by way of any one of the following documents
* Original utility bill in the Customer’s Name dated within the last 3 months
* Tenancy agreement in the Customer’s Name
* Reference Letter from a Regulated Financial Institution stating Permanent Residential
\\
Address. (The relationship must be in existence for at least 1 year);
* Letter from Employer Confirming Address
* For persons with combined living arrangements, a letter issued by the utility bill owner,
\\
along with copy of the ID of utility bill owner, and the original utility bill dated within the
last 3 months.
* Bank statement issued within the last three (3) months showing the customer’s address.|N/A|
|Self –
Employed
Individuals|* One (1) form of Government-Issued Picture Identification in the case of
Nationals/Residents of ECCU and CARICOM.
* Two (2) forms of Government- Issued Picture Identification in the case of NonNationals/ Residents Outside of CARICOM|Confirmation of Residential Address by way of any one of the following documents
* Original utility bill in the Customer’s Name dated within the last 3 months
* Tenancy agreement in the Customer’s Name
* Reference Letter from a Regulated Financial Institution stating Permanent Residential Address. (The relationship must be in existence for at least 1 year)
* Letter from Employer Confirming Address
* For persons with combined living arrangements, a letter issued by the utility bill owner, along with copy of the ID of utility bill owner, and the original utility bill dated within the
last 3 months.
* Bank statement issued within the last three (3) months showing the customer’s address.|N/A|

* *Behaviour*
** A collapsible accordion component must be provided for document requirement categories
** Only one accordion section can be expanded at a time
** The Accordion can be auto closed when another accordion is opened

!image-20260212-135841.png|width=644,alt="image-20260212-135841.png"!
* *Navigation*
** +Continue+ button navigates to the next section: Personal Information.
* *Design Compliance*
** BOSL branding (colors, fonts, logo) applied consistently.
** Responsive design verified across desktop and mobile.

*Significance*

This section ensures customers understand application requirements and compliance obligations before proceeding. It improves transparency, reduces errors, and supports regulatory compliance while maintaining a consistent user experience.

*Definition of Done*

* Instruction section implemented per Figma design.
* All hyperlinks and buttons open in a new tab and point to correct URLs.
* FATCA link displayed under compliance notice and opens correctly.
* Navigation buttons (Continue, Save Progress, Back to Dashboard) function as expected.
* QA validates responsiveness and usability across devices.
* Smoke tests pass successfully in staging environment.
* UAT sign-off obtained from BOSL team.

*Dependencies*

* BOSL branding guidelines and reusable header/footer components.
* Verified URLs for picture requirements, FATCA, and applicant requirement pages.
* Backend readiness for saving progress and navigation logic.

*Risks*

* Incorrect or broken links may prevent users from accessing compliance information.
* Navigation issues may block progress to the next section.
* Branding inconsistencies may reduce trust and user confidence.



* Figma Design Link
* [https://www.figma.com/design/qnSIfJ2qLOZQiEAZzasyDl/BOSL-%E2%80%93-Web-Banking%E2%80%8B?node-id=1752-13933&t=OrDVZQ9W5ZMS9Syh-4|https://www.figma.com/design/qnSIfJ2qLOZQiEAZzasyDl/BOSL-%E2%80%93-Web-Banking%E2%80%8B?node-id=1752-13933&t=OrDVZQ9W5ZMS9Syh-4|smart-link] 
*  [https://www.figma.com/design/qnSIfJ2qLOZQiEAZzasyDl/BOSL-%E2%80%93-Web-Banking%E2%80%8B?node-id=1182-6388&t=OrDVZQ9W5ZMS9Syh-4|https://www.figma.com/design/qnSIfJ2qLOZQiEAZzasyDl/BOSL-%E2%80%93-Web-Banking%E2%80%8B?node-id=1182-6388&t=OrDVZQ9W5ZMS9Syh-4|smart-link] 

---

## Acceptance Criteria

*

---

## Comments (14)

### 1. Richard Mena — 20/11/2025, 20:59:19

Changes made as confirmed with @Creselda Alexander based on the [^Retail & Corporate KYC Checklist 2025 (1).pdf]  for the applicable residency type

cc: @Prachi Jangid 

### 2. Creselda Alexander — 20/11/2025, 23:00:03

🎉 Looks good!

### 3. Creselda Alexander — 21/11/2025, 23:46:05

@Richard Mena thank you 

### 4. Yusuf Khan — 04/02/2026, 12:20:28

Need clarifications on how to display instructions 

### 5. Namratha Matcha — 04/02/2026, 17:16:05

@Yusuf Khan Lets connect on this

### 6. Yusuf Khan — 18/02/2026, 09:56:09

All i see is the instructions for Savings account are these instructions same for the loans and credit card and other products 
cc: @Prachi Jangid  @Namratha Matcha 

### 7. Namratha Matcha — 18/02/2026, 10:54:33

@Yusuf Khan No, Instructions need to be dynamically pulled from Salesforce. Savings is just for reference

### 8. Prachi Jangid — 18/02/2026, 13:23:08

*Loans:*
Ensure that all of your life's moments and milestone are as you dreamed they would be. A BOSL Personal Loan is an affordable way to get you the funds you need to do the things you that matter to you!

Our experienced Loans Officers will ensure you have a response within 24-hours of application and your loan payments are affordable to you.

Checklist

* Picture I.D. (2 forms for first time customers)
* Letter from Employer – Stating Length of Service
* Salary Slip (Recent)

Interest rates and terms on will vary so come in and talk to us today. Ask us today for detailed information about our Personal Loan Services.

*For other products, the word documents are attached.*

### 9. Prachi Jangid — 18/02/2026, 13:47:27

@Prachi Jangid 

!image-20260218-132413.png|width=726,alt="image-20260218-132413.png"!

!image-20260218-132349.png|width=757,alt="image-20260218-132349.png"!



!image-20260218-132511.png|width=719,alt="image-20260218-132511.png"!

*General Instructions*

!image-20260218-133053.png|width=747,alt="image-20260218-133053.png"!

### 10. Prachi Jangid — 20/02/2026, 14:39:02

@Prachi Jangid 
Homestart-

!image-20260220-143838.png|width=555,alt="image-20260220-143838.png"!

Regular/Ordinary-

!image-20260220-143823.png|width=555,alt="image-20260220-143823.png"!

### 11. Arnav Gaddam — 23/02/2026, 13:50:24

Hi Team, 
Since we are using the Instructions to be displayed when we select a product as in bullet points as suggested by @Prachi Jangid, we changed the Product Instructions (Product_Instructions__c) field from Text Area Long to Rich Text Area. 
CC : @Ankit Bhatia , @Yusuf Khan 

### 12. Arnav Gaddam — 25/02/2026, 14:00:16

@Madhu Latha Gaddam, You can continue testing this ticket as PR is raised and deployed to DigitalQA. It is updated for fetching multiple Product Instructions as suggested by @Prachi Jangid .

CC : @Nirdesh Banala 

### 13. Arnav Gaddam — 03/03/2026, 13:02:46

@Madhu Latha Gaddam, As confirmed by @Prachi Jangid the ordering of instructions 3 and 4 is fine and developed as given by Prachi. Disclaimer also needs to be added. Moving it to Ready for QA.

### 14. Madhu Latha Gaddam — 04/03/2026, 09:34:20

As the Related bug got fixed and is as per the Requirements and all the Specified instructions are also as per the Requirements,
Proceeding to Move the story to UAT Deployed.

!image-20260304-093045.png|width=930,alt="image-20260304-093045.png"!

!image-20260304-093100.png|width=911,alt="image-20260304-093100.png"!

!image-20260304-093113.png|width=911,alt="image-20260304-093113.png"!

!image-20260304-093131.png|width=911,alt="image-20260304-093131.png"!

!image-20260304-093146.png|width=911,alt="image-20260304-093146.png"!

!20260304-0932-05.1000314.mp4|width=911,alt="20260304-0932-05.1000314.mp4"!

All the Products and Residency types are working as expected.
CC: @Prachi Jangid 

---

## Linked Issues

- **Blocks** → `BDBP1-408` Controlled Step Navigation for Account Registration Flow *(UAT Deployed)*
- **Relates** → `BDBP1-529` BOSL Digital QA Bug – Instruction Section content and formatting do not match approved specifications *(Completed)*

---

## Subtasks (2)

- ✅ `BDBP1-445` Dev - Registration Form: Instruction Section — *Done*
- ✅ `BDBP1-516` QA Task: Registration Form: Instruction Section — *Done*

---

## Attachments (16)

- ✅ **20260304-0932-05.1000314.mp4** (video/mp4, 12378.6 KB) uploaded by Madhu Latha Gaddam on 04/03/2026, 09:34:18
- ✅ **image-20260122-080238.png** (image/png, 91.0 KB) uploaded by Prachi Jangid on 22/01/2026, 08:19:59
- ✅ **image-20260129-122424.png** (image/png, 703.3 KB) uploaded by Namratha Matcha on 29/01/2026, 12:24:38
- ✅ **image-20260212-135841.png** (image/png, 414.8 KB) uploaded by Namratha Matcha on 12/02/2026, 14:01:17
- ✅ **image-20260218-132349.png** (image/png, 23.8 KB) uploaded by Prachi Jangid on 18/02/2026, 13:47:25
- ✅ **image-20260218-132413.png** (image/png, 26.4 KB) uploaded by Prachi Jangid on 18/02/2026, 13:47:26
- ✅ **image-20260218-132511.png** (image/png, 21.0 KB) uploaded by Prachi Jangid on 18/02/2026, 13:47:26
- ✅ **image-20260218-133053.png** (image/png, 33.7 KB) uploaded by Prachi Jangid on 18/02/2026, 13:47:25
- ✅ **image-20260220-143823.png** (image/png, 74.9 KB) uploaded by Prachi Jangid on 20/02/2026, 14:39:01
- ✅ **image-20260220-143838.png** (image/png, 89.7 KB) uploaded by Prachi Jangid on 20/02/2026, 14:39:01
- ✅ **image-20260304-093045.png** (image/png, 194.1 KB) uploaded by Madhu Latha Gaddam on 04/03/2026, 09:34:19
- ✅ **image-20260304-093100.png** (image/png, 185.9 KB) uploaded by Madhu Latha Gaddam on 04/03/2026, 09:34:19
- ✅ **image-20260304-093113.png** (image/png, 188.8 KB) uploaded by Madhu Latha Gaddam on 04/03/2026, 09:34:20
- ✅ **image-20260304-093131.png** (image/png, 174.2 KB) uploaded by Madhu Latha Gaddam on 04/03/2026, 09:34:19
- ✅ **image-20260304-093146.png** (image/png, 159.0 KB) uploaded by Madhu Latha Gaddam on 04/03/2026, 09:34:18
- ✅ **Retail & Corporate KYC Checklist 2025 (1).pdf** (application/pdf, 256.9 KB) uploaded by Richard Mena on 20/11/2025, 20:59:18

---

## Important Observations

- ℹ️ **No labels** set
- ℹ️ **No components** assigned
- ⏰ **Stale** — last comment was 75 days ago
- 🚫 **1 blocker(s)** detected in linked issues
- 📸 **14 screenshot(s)** attached
- 📄 **1 PDF(s)** attached

---

*Auto-generated by fetch-jira-details skill · 2026-05-18T12:54:12.551Z*
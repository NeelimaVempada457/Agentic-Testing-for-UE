# Description — BDBP1-202

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
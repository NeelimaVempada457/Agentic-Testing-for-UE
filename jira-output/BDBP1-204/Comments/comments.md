# Comments (12)

## 1. Ankit Bhatia — 02/02/2026, 07:26:42

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

---

## 2. Namratha Matcha — 04/02/2026, 16:47:48

@Ankit Bhatia Thank you for bringing this to our notice. 
@Arnav Gaddam The “Additional Products” section will display optional cross-sell products.
If the customer has already selected a product as the primary product, that same product must not be displayed again as an optional checkbox in the Additional Products section.

---

## 3. Arnav Gaddam — 09/02/2026, 08:58:00

@Prachi Jangid, @Namratha Matcha Can you please provide the Icons mentioned in this user story  

---

## 4. Namratha Matcha — 10/02/2026, 11:03:29

@Arnav Gaddam As product information is currently not present please use this sample text wherever needed
”Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.”

---

## 5. Arnav Gaddam — 11/02/2026, 11:36:03

As @Prachi Jangid , mentioned for the description related to the Sub Products will be different from the one mentioned in Figma Because it is fetched dynamically from the Description field of the Product Object.

The data which needs to be populated is yet to be given by the client.

CC : @Ankit Bhatia , @Yusuf Khan , @Neelima Vempada , @Nirdesh Banala , @Madhu Latha Gaddam , @Amarnath Marupilla 

---

## 6. Arnav Gaddam — 11/02/2026, 11:54:21

!image-20260211-114345.png|width=879,alt="image-20260211-114345.png"!

!image-20260211-114412.png|width=864,alt="image-20260211-114412.png"!



When we select “BOSL VISA Credit Card “ and “BOSL International Debit Card “, below their products are visible for selection this is because we are creating the records for “BOSL VISA Credit Card” and “BOSL International Debit Card”.
This is fine and acceptable as discussed with @Prachi Jangid.
CC :  @Ankit Bhatia , @Yusuf Khan , @Neelima Vempada , @Namratha Matcha , @Nirdesh Banala , @Madhu Latha Gaddam 

---

## 7. Arnav Gaddam — 12/02/2026, 17:08:45

As discussed with @Ankit Bhatia, we are using the “Description” field (Standard) for the “Product Card Description” and “Help Text” field (Standard) for Overall Description of the Product for storing and displaying the Information regarding those Products.

CC : @Yusuf Khan, @Prachi Jangid, @Namratha Matcha

---

## 8. Yusuf Khan — 16/02/2026, 15:53:38

as i can see the story is in Testing under QA moving to RDQA

---

## 9. Madhu Latha Gaddam — 16/02/2026, 16:13:01

@Yusuf Khan There is an Open bug, but for task there are only 3 statuses available, hence QA task is showing In Progress. Moving back to dev.

---

## 10. Madhu Latha Gaddam — 20/02/2026, 14:40:49

This story is currently *blocked by* [[BDBP1-157] Our Products Tab with Product Details - Landing Page - Jira|https://theksquaregroupglobal.atlassian.net/browse/BDBP1-157]. The dependent story is planned for *Sprint 4*, and the responsible developer has confirmed an *ETA of Monday*. After the development of the dependent story, an additional point still needs to be developed, which is required before testing can proceed. As aligned with Prachi, this story *cannot be closed until all dependent development and testing are completed*.
Moving this back to Dev.
CC: @Arnav Gaddam @Prachi Jangid @Neelima Vempada @Yusuf Khan 

---

## 11. Madhu Latha Gaddam — 24/02/2026, 09:36:22

The behaviour where the *respective product will be auto‑selected when the user navigates from a specific Product Detail Page* will be handled in a separate task that has already been created and linked to the corresponding _Our Products_ story.

This is as confirmed by @Prachi Jangid @Neelima Vempada @Namratha Matcha @Arnav Gaddam 

---

## 12. Madhu Latha Gaddam — 24/02/2026, 09:41:13

As the related bug has been closed and the functionality is working as expected as per the given requirements, proceeding to move the ticket to *UAT Deployed*.
CC: @Arnav Gaddam @Prachi Jangid @Neelima Vempada @Yusuf Khan 

---

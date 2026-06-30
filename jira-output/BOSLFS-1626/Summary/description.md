# Description — BOSLFS-1626

*As a* System Administrator,

*I want to* configure a specific " Credit Administrator" Role and Permission Set,

*So that* external users can audit Disbursed loan applications without accessing sensitive "New" or "Proposed" data.

h3. *Business Context*

Currently, Credit Risk require a view that mimics the Boarding perspective but with restricted scope. They must be nested within the *Credit and Risk Department* hierarchy to ensure proper data visibility and reporting alignment.

----

h3. *Technical Requirements*

# *Role Hierarchy:* Create a new Role: {{ Credit Administrator}}. Parent Role must be {{Credit and Risk Department}}.
# *Permission Set:* Create {{Credit_Administrator_Read_Only}}.
#* *Clone Source:* Use {{Boarding}} as a base template  and update the fields to be (Read-Only).
#* *Object Permissions:* Read-only access to Loan Applications and related objects.
#** Loan Package
#** Loan 
#** Party Involveld in Trasanction
#** Party Liabilities
#** Party Monthly Commitments
#** Party Monthly Income
#** Party Additional Income
#** Other Liabilities
#** Pay off Assigments
#** Cash Configurations 
#** Collateral Loan Application
#** Collaterals
#** Disbursement Conditions
#** Disbursement Transactions
#** Special Condisitions
#** Recommendations
#** Approval
#** Fee
#** Loan Terms and Conditions
#** Commitment Letter Statements
# *Data Filtering:*  Auditors must *only* see Loan Applications where {{Status = Completed}}. 
#* Exclude all records where {{Status}} is  {{In progress}}, {{Declined, Amenmdment, Cancelled}}.
#* _Note: This may require a Sharing Rule or a Scoping Rule depending on your Org's OWD (Org-Wide Defaults)._
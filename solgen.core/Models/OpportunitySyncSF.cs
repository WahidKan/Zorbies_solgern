using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public class OpportunitySyncSF
    {
        public string OpportunityId { get; set; }
        public string ProposalId { get; set; }
        public string System_Size_kW { get; set; }
        public string Total_System_Cost { get; set; }


        public string coPhone { get; set; }
        public string Downpayment_Amount { get; set; }
        public string Loan_Amount { get; set; }
        public string Price_Per_Watt_Calc { get; set; }
        public string Term { get; set; }
        public string Default_Payment { get; set; }
        public string ContactId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MailingState { get; set; }
        public string MailingCity { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string MobilePhone { get; set; }
        public string AccountId { get; set; }
        public string BillingStreet { get; set; }
        public string BillingState { get; set; }
        public string BillingCity { get; set; }
        public string BillingPostalCode { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string ReqFrom { get; set; }
        public long CompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string ContractId { get; set; }
        public string LoanProductId { get; set; }
        public string Financial_InstitutionId { get; set; }
        public string SIN { get; set; }
        public string DOB { get; set; }
        public string coFirstname { get; set; }
        public string coLastname { get; set; }
        public string coDOB { get; set; }
        public string coSSN { get; set; }
        public string coMobilePhone { get; set; }
        public string coEmail { get; set; }
        public string coDINumber { get; set; }
        public string coDLState { get; set; }
        public string coDLStateLabel { get; set; }
        public string coHousingStatus { get; set; }
        public string coStreetName { get; set; }
        public string coAptSt { get; set; }
        public string coStreetType { get; set; }
        public string coRuralRoute { get; set; }
        public string coPOBox { get; set; }
        public string coState { get; set; }
        public string coCity { get; set; }
        public string coZip { get; set; }
        public string coYearsACA { get; set; }
        public string coMonthsACA { get; set; }
        public string coRentMortage { get; set; }
        public string coBusinessPhone { get; set; }
        public string coEmployerType { get; set; }
        public string coEmployer { get; set; }
        public string coOccupation { get; set; }
        public string coYearsACE { get; set; }
        public string coMonthsACE { get; set; }
        public string coPTI { get; set; }
        public string coDTI { get; set; }
        public string coGrossIncome { get; set; }
        public string coIncomeFreq { get; set; }
        public string coOIncomeMonthly { get; set; }
        public string coOIncomeSource { get; set; }
        public string MonthsACE { get; set; }
        public string YearsACE { get; set; }
        public string Occupation { get; set; }
        public string Employer { get; set; }
        public string RentMortage { get; set; }
        public string EmployerType { get; set; }
        public string YearsACA { get; set; }
        public string MonthsACA { get; set; }
        public string BusinessPhone { get; set; }
        public string PTI { get; set; }
        public string DTI { get; set; }
        public string GrossIncome { get; set; }
        public string IncomeFreq { get; set; }
        public string OIncomeMonthly { get; set; }
        public string OIncomeSource { get; set; }

        public string SSN { get; set; }
        public string NoofMortgages { get; set; }
        public string CoNoofMortgages { get; set; }
        public string coSIN { get; set; }
        public string AutoPayment { get; set; }
        public string Owntheproperty { get; set; }

        public string CoIncome { get; set; }
        public string coOIncome { get; set; }
        public string CoOIncomeFreq { get; set; }
        public string OIncomeFreq { get; set; }
        public string Income { get; set; }
        public string IsDocsSigned { get; set; }
        public bool Iscoapplicant { get; set; }
        public string CustomerSignedDate { get; set; }
        public string OppOwnerId { get; set; }

        public bool IsOE { get; set; }

        public string PEmployerName { get; set; }
        public string PYearsACE { get; set; }
        public string PMonthsACE { get; set; }

        public bool coIsOE { get; set; }
        public string coPEmployerName { get; set; }
        public string coPYearsACE { get; set; }
        public string coPMonthsACE { get; set; }

        public string coMailingState { get; set; }
        public string coMailingCity { get; set; }
        public string coMailingStreet { get; set; }
        public string coMailingPostalCode { get; set; }
        public string POccupation { get; set; }
        public string coPOccupation { get; set; }
        public string PYearACR { get; set; }
        public long? PMonthACR { get; set; }
        public string PRcountry { get; set; }
        public string PRstate { get; set; }
        public string PRCity { get; set; }
        public string PRStreet { get; set; }
        public string PRPostalCode { get; set; }
        public string coPYearACR { get; set; }
        public long? coPMonthACR { get; set; }
        public string coPRcountry { get; set; }
        public string coPRstate { get; set; }
        public string coPRCity { get; set; }
        public string coPRStreet { get; set; }
        public string coPRPostalCode { get; set; }
        public string PHousingStatus { get; set; }
        public string CoPHousingStatus { get; set; }

        public string SalesRep { get; set; }
        public string DealerName { get; set; }

    }


    public class RequestDesignModel
    {
        public long OpportunityId { get; set; }
        public string designNotes { get; set; }
        public string adderNotes { get; set; }
        public DateTime RequestDate { get; set; }
        public string loanProduct { get; set; }
        public string mountingLocation { get; set; }
        public bool? mainPanelUpgrade { get; set; }
        public string shopHasElectricalSubPanel { get; set; }
        public bool? insulationUpgrade { get; set; }
        public bool? smartThermostatInstallation { get; set; }
        public bool? maxRUpgrade { get; set; }
        public bool? ledLightbulbUpgrade { get; set; }
        public string roofMaterial { get; set; }
        public string reRoofNeeded { get; set; }
        public string roofType { get; set; }
        public TimeSpan FromTime { get; set; }
        public string redisgnReason { get; set; }
        public bool isredisgn { get; set; }
        public Guid? CreatedBy { get; set; }
        public long? CompanyId { get; set; }
    }


    public class SendLoanHomiDetailModel
    {
        public string FormJsonData { get; set; }
        public string AuthToken { get; set; }
    }

    public class SaveUtilityModel
    {
        public long Utility_Proposal_Id { get; set; }
        public string utility_Company { get; set; }
        public string utility_Account_Number { get; set; }
        public string utility_Meter_Number { get; set; }
        public string Annual_kwh_Usage { get; set; }
        public string Last_Utility_bill_URL { get; set; }
        public string Home_Sqft { get; set; }
        public string Sales_Tax_Rate { get; set; }
        public string FTC_Not_Eligible { get; set; }
        public string Billing_City { get; set; }
        public string Billing_Street { get; set; }
        public string Billing_State { get; set; }
        public string Billing_Country { get; set; }
        public string Billing_PostalCode { get; set; }
        public string Full_Utility_Bill { get; set; }
        public string No_Utility_Account_or_Meter_Number { get; set; }
    }
    public class welcomeNoteOpportunityModel
    {
        public  string WelcomeCallNote { get; set; }
        public Guid? userid { get; set; }
        public long companyid { get; set; }
        public long opid { get; set; }
        public bool Submitforwelcomecal { get; set; }
    }
}

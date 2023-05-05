using System.ComponentModel;

namespace Solgen.Core.Models
{
    class enumModel
    {
    }
    public enum enumTableModel
    {
        tblVendor = 0,
        tblBank = 1,
    }
    public enum enumNotificationType
    {
        [Description("LEASE_ADDED")]
        LeaseAdded,

        [Description("LEASE_UPDATED")]
        LeaseUpdated,

        [Description("LEASE_DELETED")]
        LeaseDeleted,

        [Description("LEASE_REQUEST_DELETED")]
        LEASEREQUESTDELETED,

        [Description("LEASE_REQUEST_ADDED")]
        LeaseRequestAdded,

        [Description("LEASE_REQUEST_UPDATED")]
        LeaseRequestUpdated,

        [Description("REVIEW_SUPPORTING_DOCUMENT")]
        ReviewSupportingDocument,

        [Description("CONTACT_ADDED")]
        ContactAdded,

        [Description("LEASE_SEND_FOR_BANK_APPROVAL")]
        LeaseSendForBankApproval,

        [Description("LEASE_APPROVE_FOR_PURCHASE")]
        LeaseApproveForPurchase,

        [Description("LEASE_SEND_FUNDING_PACKAGE_TO_BANK")]
        LeaseSendFundingPackageToBank,

        [Description("LEASE_FUND_APPROVE")]
        LeaseFundApprove,

        [Description("DOCUSIGN_SENDDOCUMENT")]
        docuSignSendDocument,

        [Description("CREATE_INSURANCE_REQUEST")]
        CreateInsuranceRequest,

        [Description("CREATE_TITLE_WORK_REQUEST")]
        CreateTitleWorkRequest,

        [Description("DOWNLOAD_PDF_WET_SIG")]
        DownloadToPDFWetSig,
        [Description("UPLOADED_PDF_WET_SIG")]
        UploadedToPDFWetSig,

        [Description("PREPARE_UCC_FILING_REQUEST")]
        PrepareUCCFilingRequest,

        [Description("UCC_FILING_REMINDER")]
        UCCFilingReminder,

        [Description("CREDIT_CHECK")]
        CreditCheck,

        [Description("CREATE_INSURANCE_REQUEST_DOC")]
        CreateInsuranceRequestDocument,

        [Description("CREATE_TITLE_WORK_REQUEST_DOC")]
        CreateTitleWorkRequestDocument,

        [Description("WELCOME_PACKAGE")]
        WelcomePackage,

        [Description("CONFIRM_ACCOUNT")]
        ConfirmAccount,
    }
    public enum enumNotificationUserType
    {
        [Description("usertype01")]
        SuperAdminUser,

        [Description("usertype02")]
        OperationUser,

        [Description("usertype03")]
        SalesUser,

        [Description("usertype04")]
        BankUser,

        [Description("usertype05")]
        CustomerUser,
        [Description("usertype06")]
        AdminUser,
    }

    public enum enumActivityLogType
    {
        [Description("Delete")]
        Delete,

        [Description("Add")]
        Add,

        [Description("Edit")]
        Edit,
        [Description("Active")]
        Enable,
        [Description("In-Active")]
        Disable,
        [Description("Error")]
        Error,

        [Description("Approved For Purchase")]
        ApprovedForPurchase,
        [Description("Review Supporting Documents")]
        ReviewSupporting,
        [Description("Review Lease Documents")]
        ReviewLeaseDoc,
        [Description("Generate Lease")]
        GenerateLease,
        [Description("DocuSign")]
        DocuSign,
        [Description("Send For Bank Approval")]
        SendForBankApproval,
    }

    public enum enumFileFolder
    {
        [Description("UserProfilePick")]
        user,
        [Description("AccountdealerDocument")]
        accountDealerlogo,
        [Description("LeaseDocument")]
        leasedocpdf,
        [Description("UploadDocuments")]
        UploadDocuments,

        [Description("LeaseDocumentWithoutWebRootPath")]
        leaseWebRootPathdocpdf,
        [Description("UploadServiceResourceData")]
        serviceResourceFile,
        [Description("UploadAppointmentViewData")]
        appointmentFile,
        [Description("UploadLeadViewData")]
        leadViewData,
        [Description("UploadWorkorderViewData")]
        workorderViewData,
        [Description("UploadServiceCrewViewData")]
        serviceCrewViewData,
        [Description("UploadOpportunityViewData")]
        opportunityViewData,
        [Description("UploadProposalViewDataGetList")]
        propsoalFileDataGetData,
        [Description("UploadProposalViewDataSave")]
        propsoalFileDataSave,
        [Description("CommunicationAudio")]
        communicationAudio,
        [Description("InstallStepDocuments")]
        InstallStepDocuments,
        [Description("ChangeOrderDocument")]
        changeOrderDocument,
        [Description("DocumentMaker")]
        DocumentMaker,
    }

}

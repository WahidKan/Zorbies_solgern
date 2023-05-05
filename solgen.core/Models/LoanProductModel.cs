using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public class LoanProductModel
    {
        public long Id { get; set; }
        public string BureauName { get; set; }
        public bool IsEnableSoftPull { get; set; }
        public bool IsEnableHardPull { get; set; }
    }
    public class PrerequisiteLoanProductDocumentTypeModel
    {
        public string DocumentId { get; set; }
        public long DocumentTypeId { get; set; }
        public string DocumentName { get; set; }
        public bool Mendatory { get; set; }
        public bool Mandatory { get; set; }
        public bool Visibility { get; set; }
    }
    public class LoanProductDocumentTypeNamesModel
    {
        public string DocumentId { get; set; }
        public string DocumentName { get; set; }
        public bool Mendatory { get; set; }
        public string Discount { get; set; }
    }
    public class LoanApplicationProductModel
    {
        public long? companyId { get; set; }
        public long? ProductId { get; set; }
        public String ModuleName { get; set; }
        public string SubmoduleName { get; set; }
        public string fieldsData { get; set; }
        public string ImageFileName { get; set; }
        public string BrochureFileName { get; set; }
        public string DocumentTypeFileImage { get; set; }
        public string DocumentTypeFileBrochure { get; set; }
        public string fileNameImage { get; set; }
        public string CreatedBy { get; set; }
        public string ApplicableCB { get; set; }
        public string FieldsPrerequisiteLoan { get; set; }
        public string LoanProductDiscountCategory { get; set; }
    }

    public class FileUploadList
    {
        //public long? Id { get; set; }
        //public string User { get; set; }
        //public string FileUrl { get; set; }
        //public string RefId { get; set; }
        //public string Description { get; set; }
        //public long module { get; set; }
        //public long submodule { get; set; }
        //public string CompanyId { get; set; }
        //public string type { get; set; }
        //public int PageNo { get; set; }

        //public long FileSize
        //{ get; set; }
        //public string FileName { get; set; }
        //public string ThumbnailUrl { get; set; }

        public long? Id { get; set; }
        public string UserId { get; set; }
        public string FileUrl { get; set; }
        public long Module { get; set; }
        public long SubModule { get; set; }
        public string AccountId { get; set; }
        public string Type { get; set; }
        public string FileName { get; set; }
        public long FileSize { get; set; }
        public string RefId { get; set; }
        public string ThumbnailUrl { get; set; }
        public string Description { get; set; }
        public string CompanyId { get; set; }
        public string StatusId { get; set; }
        public string CreateOn { get; set; }
        public string CreatedBy { get; set; }


    }

    public class ComapanyModel
    {
        public string CompanyId { get; set; }
        public string CompanyName { get; set; }
    }
    public class PresiteDocumentModel
    {
        public string LoanProductId { get; set; }

        public string DocumentId { get; set; }
        public string DocumentName { get; set; }

        //----commenting for spelling mistake and not get value from formbody
        //public bool Mendatory { get; set; }
        public bool Mandatory { get; set; }

        public bool Visibility { get; set; }
        public string EmploymentType { get; set; }
        public string CreatedBy { get; set; }
        public string CompanyId { get; set; }
    }

    public class DeletePresiteDocumentModel
    {
        public string DocumentId { get; set; }
        public string LoanProductId { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public string CompanyId { get; set; }
    }


    public class UpdatePresiteDocumentModel
    {
        public long? DocumentId { get; set; }
        public long? ProductId { get; set; }
        public long DocumentTypeId { get; set; }
        public string DocumentName { get; set; }
        public bool Mandatory { get; set; }
        public string EmploymentType { get; set; }
        public bool Visibility { get; set; }
        public string ModifiedBy { get; set; }
    }

    public class LoanProductPrerequisiteDocumentModel
    {
        public string Id { get; set; }
        public string DocumentId { get; set; }
        public string DocumentTypeId { get; set; }
        public bool Mandatory { get; set; }
        public bool Visibility { get; set; }
        public string DocumentName { get; set; }
        public string employmentType { get; set; }
    }
    public class LoanLoanProductDiscounCategoryModel
    {
        public string Id { get; set; }
        public string CategoryId { get; set; }
        public bool mendatory { get; set; }
        public string Discount { get; set; }
        public string CategoryName { get; set; }
    }

    public class AccountViewModelList
    {
        public string AccountId { get; set; }
        public string contactID { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string MobilePhone { get; set; }
        public string phone { get; set; }
        public bool isPrimary { get; set; }
        public bool EnableUser { get; set; }
        public long Role { get; set; }
        public string UserId { get; set; }
    }

    public class JavascriptSerlization
    {
        public List<AccountViewModelList> list { get; set; }
    }
}

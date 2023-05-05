using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class BankModel
    {
        public string ID { get; set; }
        public string BankName { get; set; }
        public string City { get; set; }
        public string County { get; set; }
        public string StateID { get; set; }
        public string StateName { get; set; }
        public string StatusID { get; set; }
        public string Status { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string ZipCode { get; set; }
        public string CreatedByID { get; set; }
        public Guid? AssociateUser { get; set; }
        public long CompanyID { get; set; }
    }
    public class CustomFieldModel
    {
       public string ModuleName {get;set;}
        public string SubModuleName { get; set; }
        public string FieldName { get; set; }
        public string CustText { get; set; }
        public string CustInteger { get; set; }
        public string CustDecimalLength { get; set; }
        public string CustLogInterger { get; set; }
        public string Description { get; set; }
        public string CustUrl { get; set; }
        public string CustSelectList { get; set; }
        public Int64 Id { get; set; }
        public string IsRequired { get; set; }
        public string CreatedByID { get; set; }
        public string CompanyID { get; set; }
        public string DataTypeCode { get; set; }
        public string Length { get; set; }
        public string SelectDrpList { get; set; }
        public string DecimalPlaceValue { get; set; }
    }

    public class opportunitystage
    {
        public int stageid { get; set; }
        public string stageName { get; set; }
        public string RowNo1 { get; set; }

        public int activeTab { get; set; }
    }
    public class ManageViewModel
    {
        public string ModuleName { get; set; }
        public string SubModuleName { get; set; }
        public string radiogroup { get; set; }
        public string select { get; set; }

        //public string selectedFields { get; set; }
        public string customWhereCondition { get; set; }
        public string Id { get; set; }
        public string CreatedByID { get; set; }
        public string selectedFields { get; set; }
        public string view_searchFilterJson { get; set; }
    }

    public class ManageViewModelWithCompany
    {
        public string ModuleName { get; set; }
        public string SubModuleName { get; set; }
        public string radiogroup { get; set; }
        public string select { get; set; }

        //public string selectedFields { get; set; }
        public string customWhereCondition { get; set; }

        public string customOrderCondition { get; set; }
        public string Id { get; set; }
        public string CreatedByID { get; set; }
        public string selectedFields { get; set; }
        public string view_searchFilterJson { get; set; }
        public string view_searchOrderJson { get; set; }
        public long CompanyID { get; set; }
        public string Roles { get; set; }
    }


    public class SelectClassField
    {
        public string text { get; set; }
        public string value { get; set; }
        public string isChecked { get; set; }
    }
    public class BankInformationModel
    {
        public Guid? ContactBankId { get; set; }
        public string ContactBankName { get; set; }
        public string ContactBankAddress { get; set; }
        public string ContactBankAccountNum { get; set; }
        public string ContactBankRoutingNumber { get; set; }
        public string ContactBankCity { get; set; }
        public Guid? ContactBankState { get; set; }
        public string ContactBankCounty { get; set; }
        public string ContactBankZipcode { get; set; }
        public Guid? CreatedByID { get; set; }
    }
    


}

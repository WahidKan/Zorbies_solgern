using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class SystemInformationModel
    {
        public string SysInfoId { get; set; }
        public decimal? KWCapacity { get; set; }
        public decimal? InstalledInvoice { get; set; }
        public decimal? OptionalDown { get; set; }
        public decimal? RequestedAmount { get; set; }
        public decimal? CostPerWatt { get; set; }
        public string UserId { get; set; }
        public long CompanyId { get; set; }
        public decimal? SalesPrice { get; set; }
        public decimal? CashDown { get; set; }
        public decimal? NetTrade { get; set; }
        public decimal? Rebate { get; set; }
        public decimal? UnpaidBalance { get; set; }
        public decimal? ServiceContracts { get; set; }
        public decimal? Gap { get; set; }
        public decimal? AmountFinanced { get; set; }
        public decimal? Term { get; set; }
        public decimal? APR { get; set; }
        public decimal? Payment { get; set; }
        public decimal? LTV { get; set; }
        public decimal? PTI { get; set; }
        public decimal? DTI { get; set; }
        public string ReferenceNo { get; set; }
        public long? LoanProductType { get; set; }
        public string SaleRepFirstName { get; set; }
        public string SaleRepLastName { get; set; }
        public string SaleRepEmail { get; set; }
        public string SaleRepPhone { get; set; }

    }
}

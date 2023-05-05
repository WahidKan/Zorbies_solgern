using System;
using System.Collections.Generic;
using Solgen.Core;

namespace Solgen.Service
{
    public interface IManageInsuranceService
    {
        PagedData GetInsuranceList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID);
        ChangeStatusModel DeleteInsurance(string insuranceId);
        CommonStatusModel ChangeStatus(Guid? id);
        InsuranceDetailsModel GetInsuranceByInsuranceId(string insuranceId);
        int AddEditInsurance(InsuranceDetailsModel model);
        List<SelectItemModel> GetStateList();
        List<ReportToModel> GetReportToList(long CompanyID);
        List<SelectItemModel> GetCountryList();
        PagedData GetInsuranceRequestList(string name, Guid? listFilter, string sortColumn, string sortDir, int page, int pageSize, Guid? userId);
        List<SelectItemModel> GetInsuranceDropList(long companyID);
        string IsEmailExist(Guid? InsuranceId, string AgentEmail);
        InsuranceDetailsModel GetInsuranceDetailByInsuranceContactId(string insuranceContactId);
        Guid SaveInsuranceDetail(InsuranceDetailsModel model);
        List<SelectItemModelIso> GetCountryListIso();
    }
}

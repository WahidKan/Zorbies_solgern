using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Solgen.Core;
using Solgen.Core.Models;

namespace Solgen.Service
{
    public interface IReportService
    {
        PagedData GetLeaseTrakingReport(string name, DateTime? expFrom, DateTime? expTo, DateTime? expFundFrom, DateTime? expFundTo,
            Guid? bankName, string sortColumn, string sortDir, int page, int pageSize, Guid? userId);
        PagedData GetCreditScoreTrackingReportList(string name, DateTime? expFrom, DateTime? expTo, string sortColumn, string sortDir, int page, int pageSize, Guid? userId);
        PagedData GetCommssionPaidReportList(string name, DateTime? expFrom, DateTime? expTo, string sortColumn, string sortDir, int page, int pageSize, Guid? userId);
        MonthlyLeaseTrackingReport GetLeaseTrackingAmount(string userId);
        PagedData InsuranceTrackingReport(string searchText, DateTime? expFrom, DateTime? expTo, string sortColumn, string sortDir, int pageNo, int pageSize, Guid? userId);
        PagedData GetLeaseVolumeReportList(DateTime? expFrom, DateTime? expTo, string sortColumn, string sortDir, int page, int pageSize, Guid? userId, string reportFor = "");
        Task<PagedData> GetNestReport(string name, string deliveryId, string accountId, string stateId, string stageId, DateTime? From, DateTime? To, string accountStatusId, DateTime? DeliverDateFrom, DateTime? DeliverDateTo, string sortColumn, string sortDir, int page, int pageSize, string companyId, string userId, Boolean isGraph);
        Task<PagedData> GetServiceAppointmentReportList(string nameSearch,string wareHouse,string serviceTerritoryId, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyId, DateTime? From, DateTime? To, string workTypeId,string StatusIdChk, int AttchmentId, bool IsExport, long? ExportTotalRecoards);
        string AddEditDeliveryDate(tblReportDeliveryModel model);

        PagedData CallLogList(Guid User_id, string accountId, string contactId, string vendor, int hasRecaoding, string fromNumber, string ToNumber, DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageSizeValue, int pageSize, long CompanyID,bool isExport);
    }
}

using System;
using System.Threading.Tasks;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;

namespace Solgen.Service
{
    public class ReportService : IReportService
    {
        private readonly IReportRepository _repository;
        public ReportService(IReportRepository repository)
        {
            _repository = repository;
        }
        /*! 
     * \brief   GetLeaseTrackingAmount
     * \details  Get Lease Tracking Amount
     * \author  Kiran Bala 
     * \date    13 Sep 2019
     * \version 1.0    
     */
        public MonthlyLeaseTrackingReport GetLeaseTrackingAmount(string userId)
        {
            return _repository.GetLeaseTrackingAmount(userId);
        }
        /*! 
     * \brief   GetLeaseTrakingReport
     * \details  Get Lease Traking Report
     * \author  Kiran Bala 
     * \date    13 Sep 2019
     * \version 1.0    
     */
        public PagedData GetLeaseTrakingReport(string name, DateTime? expFrom, DateTime? expTo, DateTime? expFundFrom, DateTime? expFundTo,
            Guid? bankName, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            return _repository.GetLeaseTrakingReport(name, expFrom, expTo, expFundFrom, expFundTo, bankName, sortColumn, sortDir, page, pageSize, userId);
        }
        public PagedData GetCreditScoreTrackingReportList(string name, DateTime? expFrom, DateTime? expTo, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            return _repository.GetCreditScoreTrackingReportList(name, expFrom, expTo, sortColumn, sortDir, page, pageSize, userId);
        }
        public PagedData GetCommssionPaidReportList(string name, DateTime? expFrom, DateTime? expTo, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            return _repository.GetCommssionPaidReportList(name, expFrom, expTo, sortColumn, sortDir, page, pageSize, userId);
        }
        /*! 
   * \brief   Get the list of InsuranceTrackingReport
   * \details Get the list of InsuranceTrackingReport
   * \author  Surendra Maurya
   * \date    11 Dec 2019
   * \version 1.0    
   */
        public PagedData InsuranceTrackingReport(string searchText, DateTime? expFrom, DateTime? expTo, string sortColumn, string sortDir, int pageNo, int pageSize, Guid? userId)
        {
            try
            {
                if (pageSize == 0)
                    pageSize = 10;
                return _repository.InsuranceTrackingReport( searchText, expFrom, expTo, sortColumn, sortDir, pageNo, pageSize, userId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public PagedData GetLeaseVolumeReportList(DateTime? expFrom, DateTime? expTo, string sortColumn, string sortDir, int page, int pageSize, Guid? userId, string reportFor = "")
        {
            try
            {
                if (pageSize == 0)
                    pageSize = 10;
                return _repository.GetLeaseVolumeReportList(expFrom, expTo, sortColumn, sortDir, page, pageSize, userId, reportFor);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<PagedData> GetNestReport(string name, string deliveryId, string accountId, string stateId, string stageId, DateTime? From, DateTime? To, string accountStatusId, DateTime? DeliverDateFrom, DateTime? DeliverDateTo, string sortColumn, string sortDir, int page, int pageSize, string companyId, string userId,Boolean isGraph)
        {
            try
            {
                if (pageSize == 0)
                    pageSize = 10;
                return await _repository.GetNestReport( name, deliveryId, accountId,  stateId,  stageId, From, To, accountStatusId, DeliverDateFrom, DeliverDateTo, sortColumn,   sortDir,  page,  pageSize,companyId,userId, isGraph);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<PagedData> GetServiceAppointmentReportList(string nameSearch, string wareHouse,string serviceTerritoryId,  string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyId, DateTime? From, DateTime? To, string workTypeId,string StatusIdChk, int AttchmentId, bool IsExport, long? ExportTotalRecoards)
        {
            return await _repository.GetServiceAppointmentReportList(nameSearch, wareHouse, serviceTerritoryId, sortColumn, sortDir, pageIndex, pageSize, userId, companyId, From,  To, workTypeId, StatusIdChk, AttchmentId,  IsExport,  ExportTotalRecoards);
        }
        public string AddEditDeliveryDate(tblReportDeliveryModel model)
        {
            return _repository.AddEditDeliveryDate(model);

        }

        public PagedData CallLogList(Guid User_id, string accountId, string contactId, string vendor, int hasRecaoding, string fromNumber, string ToNumber, DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageSizeValue, int pageSize, long CompanyID,bool isExport)
        {
            return _repository.CallLogList(User_id, accountId, contactId,  vendor,hasRecaoding,fromNumber,ToNumber, From, To, sortColumn, sortDir, pageSizeValue, pageSize, CompanyID, isExport);
        }
    }
}

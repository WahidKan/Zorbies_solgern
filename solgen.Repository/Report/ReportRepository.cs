using Dapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using Solgen.Core;
using System.Threading.Tasks;
using Solgen.Core.Models;

namespace Solgen.Repository
{
    public class ReportRepository : IReportRepository
    {
        private readonly SolgenDbContext _dbContext;
        public ReportRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public MonthlyLeaseTrackingReport GetLeaseTrackingAmount(string userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                MonthlyLeaseTrackingReport rpt = new MonthlyLeaseTrackingReport();
                List<MonthlyLeaseTrackingTotalLeaseAmountModel> dataList = new List<MonthlyLeaseTrackingTotalLeaseAmountModel>();
                connection.Open();
                LeaseTrackGraphEndDateAndStartDate reportsata = new LeaseTrackGraphEndDateAndStartDate();

                using (var multi = connection.QueryMultiple("sp_solgen_LeaseTrackingReportGraph", commandType: CommandType.StoredProcedure))
                {
                    
                    rpt.MonthlyLeaseTrackingTotalLeaseAmountModel.AddRange(multi.Read<MonthlyLeaseTrackingTotalLeaseAmountModel>());
                    rpt.LeaseTrackGraphEndDateAndStartDate = (multi.ReadSingleOrDefault<LeaseTrackGraphEndDateAndStartDate>());
                    return rpt;
                }
                
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
      * \brief   Get the Lease Traking Report
      * \details Function is used to fetch the list of Lease Traking Report
      * \author  Surendra Maurya 
      * \date    11 Dec 2019
      * \version 1.0    
      */
        public PagedData GetLeaseTrakingReport(string name, DateTime? expFrom, DateTime? expTo, DateTime? expFundFrom, DateTime? expFundTo,
            Guid? bankName, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var dataList = connection.Query("sp_solgen_GetLeaseTrackingReport",
                   param: new
                   {
                       Name = name,
                       FromDateSearch= expFrom,
                       ToDateSearch= expTo,
                       FromFundDateSearch = expFundFrom,
                       ToFundDateSearch = expFundTo,
                       SortDir = sortDir,
                       BankName= bankName,
                       SortColumn = sortColumn,
                       PageNo = page,
                       PageSize = pageSize,
                       UserId = userId
                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, page, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
       * \brief   Get the Credit Score Tracking Report List
       * \details Function is used to fetch the list of Credit Score Tracking Report List
       * \author  Surendra Maurya 
       * \date    11 Dec 2019
       * \version 1.0    
       */
        public PagedData GetCreditScoreTrackingReportList(string name, DateTime? expFrom, DateTime? expTo, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var dataList = connection.Query("sp_solgen_GetLeaseCreditScoreTrackingReport",
                   param: new
                   {
                       SearchText = name,
                       FromDateSearch = expFrom,
                       ToDateSearch = expTo,
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = page,
                       PageSize = pageSize,
                       UserId = userId
                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, page, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        /*! 
        * \brief   Get the Commssion Paid Report List
        * \details Function is used to fetch the list of Get Commssion Paid Report List
        * \author  Surendra Maurya 
        * \date    11 Dec 2019
        * \version 1.0    
        */
        public PagedData GetCommssionPaidReportList(string name, DateTime? expFrom, DateTime? expTo, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var dataList = connection.Query("sp_solgen_CommsionPaidReport",
                   param: new
                   {
                       SearchText = name,
                       FromDateSearch = expFrom,
                       ToDateSearch = expTo,
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = page,
                       PageSize = pageSize,
                       UserId = userId
                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, page, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
        * \brief   Get the Insurance Tracking Report
        * \details Function is used to fetch the list of Insurance Tracking Report
        * \author  Surendra Maurya 
        * \date    11 Dec 2019
        * \version 1.0    
        */
        public PagedData InsuranceTrackingReport(string searchText, DateTime? expFrom, DateTime? expTo, string sortColumn, string sortDir, int pageNo, int pageSize, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var dataList = connection.Query("sp_solgen_Insurancetracking",
                   param: new
                   {
                       SearchText = searchText,
                       FromDateSearch = expFrom,
                       ToDateSearch = expTo,
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = pageNo,
                       PageSize = pageSize,
                       UserId = userId,
                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, pageNo, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
       * \brief   Get the Lese Request List
       * \details Function is used to fetch the list of Lease Volumes(Amount of lease)
       * \author  Deepak jha
       * \date    11 Dec 2019
       * \version 1.0    
       */
        public PagedData GetLeaseVolumeReportList(DateTime? expFrom, DateTime? expTo, string sortColumn, string sortDir, int page, int pageSize, Guid? userId,string reportFor="")
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var dataList = connection.Query("sp_solgen_LeaseVolumeTrackingReport",
                   param: new
                   {
                       FromDateSearch = expFrom,
                       ToDateSearch = expTo,
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = page,
                       PageSize = pageSize,
                       UserId = userId,
                       ReportFor = reportFor
                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, page, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        public async Task<PagedData> GetNestReport(string name, string deliveryId, string accountId, string stateId, string stageId, DateTime? From, DateTime? To, string accountStatusId, DateTime? DeliverDateFrom, DateTime? DeliverDateTo, string sortColumn, string sortDir, int page, int pageSize,string companyId,string userId,Boolean isGraph)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                if (stateId == "undefined" || stateId == "null")
                {
                    stateId = null;
                }
                if (accountId == "undefined" || accountId == "null")
                {
                    accountId = null;
                }
                if (stageId == "undefined" || stageId == "null")
                {
                    stageId = null;
                }
                if (name == "undefined" || name == "null")
                {
                    name = null;
                }
                if(deliveryId == "undefined" || deliveryId == "null")
                {
                    deliveryId = null;
                }
                if (accountStatusId == "undefined" || accountStatusId == "null")
                {
                    accountStatusId = null;
                }

                var dataList = await Task.FromResult(connection.Query("sp_solgen_GetNestReportListing",
                   param: new
                   {
                       FromDateSearch = From,
                       ToDateSearch = To,
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = page,
                       PageSize = pageSize,
                       Productname = name,
                       accountId = accountId,
                       stateId=stateId,
                       stageId= stageId,
                       companyId= Convert.ToInt32(companyId),
                       userId=userId,
                       accountStatusId= accountStatusId,
                        DeliverDateFrom= DeliverDateFrom,
                       DeliverDateTo= DeliverDateTo,
                       deliveryId= deliveryId,
                       isGraph = isGraph
                   },
                   commandType: CommandType.StoredProcedure).ToList());

                return new PagedData(dataList, page, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public async Task<PagedData> GetServiceAppointmentReportList(string nameSearch,string wareHouse, string serviceTerritoryId, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyId, DateTime? From, DateTime? To, string workTypeId,string StatusIdChk, int AttchmentId,bool IsExport,long? ExportTotalRecoards)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                if (workTypeId == "undefined" || workTypeId == "null")
                {
                    workTypeId = null;
                }
                if (StatusIdChk == "undefined" || StatusIdChk == "null")
                {
                    StatusIdChk = null;
                }
                
                if (serviceTerritoryId == "undefined" || serviceTerritoryId == "null")
                {
                   serviceTerritoryId=null;
                }

                if (wareHouse == "undefined" || wareHouse == "null")
                {
                    wareHouse = null;
                }

                connection.Open();
                var dataList = await Task.FromResult(connection.Query("sp_solgen_GetServiceAppointmentReportListing", param: new
                {
                    
                    userId = userId,
                    companyId = companyId,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageSize = pageSize,
                    PageNo = pageIndex,
                    Search = nameSearch,
                    wareHouse= wareHouse,
                    serviceTerritoryId= serviceTerritoryId,
                    FromDateSearch = From,
                    ToDateSearch = To,
                    workTypeId= workTypeId,
                    StatusIdChk= StatusIdChk,
                    AttchmentId= AttchmentId,
                    IsExport= IsExport,
                    ExportTotalRecoards=ExportTotalRecoards
                }
                , commandTimeout: 0, commandType: CommandType.StoredProcedure).ToList());
               return new PagedData(dataList, pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

       
        public string AddEditDeliveryDate(tblReportDeliveryModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ProductRequiredId", model.productRequiredId);
                parameters.Add("@deliveryDate", (model.deliveryDate));
                parameters.Add("@UserId", model.UserId);
                parameters.Add("@companyId", model.CompanyId);
                string data = connection.QueryFirstOrDefault<string>("Sp_Solgen_NestReportDeliveryDateUpdate"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public PagedData CallLogList(Guid User_id, string accountId, string contactId, string vendor, int hasRecaoding, string fromNumber, string ToNumber, DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageSizeValue, int pageSize, long CompanyID,bool isExport)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                //connection.ClearAllPools();
                if (accountId=="null")
                {
                    accountId = null;
                }
                if(contactId=="null")
                {
                    contactId = null;
                }
                if (vendor == "null")
                {
                    vendor = null;
                }
                if(ToNumber!=null)
                {
                    ToNumber = ToNumber.Replace(" ","");
                }
                var dataList = connection.Query("sp_solgen_GetCallLogList",
                   param: new
                   {
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = pageSizeValue,
                       PageSize = pageSize,
                       CompanyId = CompanyID,
                       FromDateSearch = From,
                       ToDateSearch = To,
                       AccountId = accountId,
                       ContactId = contactId,
                       vendor= vendor,
                       hasRecaoding=hasRecaoding,
                       fromNumber=fromNumber,
                       ToNumber=ToNumber,
                       isExport= isExport
                   }
                  , commandTimeout: 0, commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, pageSizeValue, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
    }
}

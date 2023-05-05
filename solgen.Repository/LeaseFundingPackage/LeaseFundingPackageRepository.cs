using Dapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using Solgen.Core;

namespace Solgen.Repository
{
   public class LeaseFundingPackageRepository:ILeaseFundingPackageRepository
    {
        private readonly SolgenDbContext _dbContext;
        public LeaseFundingPackageRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /*! 
              * \brief   Get the list of LeaseFundingPackage
              * \details Fetch the list of LeaseFundingPackage
              * \author  Deepak jha 
              * \date    6 Nov 2019
              * \version 1.0    
              */
        public PagedData GetLeaseFundingPackageList(string searchText, string leaseStatus, string saleMan, DateTime? expFrom, DateTime? expTo, DateTime? commFrom, DateTime? commTo, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string contactId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            if (string.IsNullOrEmpty(contactId) || contactId == "undefined") { contactId= Guid.Empty.ToString(); }
            if (string.IsNullOrEmpty(leaseStatus) || leaseStatus == "undefined" || leaseStatus=="" || leaseStatus=="null")
            { leaseStatus = Guid.Empty.ToString(); }
            Guid? contactID = Guid.Parse(contactId);
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetFundingPackageList",
                   param: new
                   {
                       LeaseStatus = (leaseStatus=="null")?Guid.Empty:Guid.Parse(leaseStatus),
                       Salesman = (saleMan== "undefined"? saleMan=null: saleMan),
                       ExpFromDateSearch = expFrom,
                       ExpToDateSearch = expTo,
                       comFromDateSearch = commFrom,
                       ComToDateSearch = commTo,
                       SearchText = (searchText== "undefined"? searchText=null: searchText),
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = pageIndex,
                       PageSize = pageSize,
                       UserId = userId,
                       ContactId = contactID
                   },
                   commandType: CommandType.StoredProcedure).ToList();

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
        public BankApprovalModel ChangeLeaseStatusForApprove(Guid leaseId, string userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                BankApprovalModel ret = connection.Query<BankApprovalModel>("sp_solgen_ChangeLeaseStatusApproveForFundedLease", new { leaseId, userId }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return ret;
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

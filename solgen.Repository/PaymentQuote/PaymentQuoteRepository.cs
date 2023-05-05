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
    public class PaymentQuoteRepository : IPaymentQuoteRepository
    {
        private readonly SolgenDbContext _dbContext;

        public PaymentQuoteRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;

        }

        /*! 
        * \brief   save payment quote
        * \details it will save save payment quote data
        * \author  Dheeraj 
        * \date    09 Sep 2019
        * \Parameter   entity:contains all data
        * \version 1.0    
        */
        public Guid Save(PaymentQuote entity)
        {
            Guid id = Guid.Empty;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                id = connection.ExecuteScalar<Guid>("sp_solgen_SavePaymentQuote",
                    param: new
                    {
                        PaymentQuoteId = entity.PaymentQuoteId,
                        PaymentQuoteName = entity.PaymentQuoteName,
                        PaymentQuoteEmail = entity.PaymentQuoteEmail,
                        PaymentQuotePurpose = entity.Leases[0].LeaseUseType,
                        PaymentQuoteDescription1 = entity.Leases[0].LeaseDescription,
                        PaymentQuoteLeasRate = entity.Leases[0].LeaseRate,
                        PaymentQuoteFeePercentage = entity.Leases[0].LeaseFeePercentage,
                        PaymentQuoteResidualPercentage = entity.Leases[0].LeaseResidualPercentage,
                        PaymentQuoteLeasTerm1 = entity.Leases[0].LeaseTerm,
                        PaymentQuoteEquipmentMSRP = entity.Leases[0].LeaseEquipmentMSRP,
                        PaymentQuoteEquipmentCost = entity.Leases[0].LeaseEquipmentCost,
                        PaymentQuoteAdditions1 = entity.Leases[0].LeaseAdditions1,
                        PaymentQuoteAdditions2 = entity.Leases[0].LeaseAdditions2,
                        PaymentQuoteTotalEquipmentMSRP = entity.Leases[0].LeaseTotalEquipmentMSRP,
                        PaymentQuoteSalesTax = entity.Leases[0].LeaseSalesTax,
                        PaymentQuoteResidualAmount = entity.Leases[0].LeaseResidualAmount,
                        PaymentQuoteExtendedWarranty = entity.Leases[0].LeaseWarranty,
                        PaymentQuoteOther = entity.Leases[0].LeaseOther,
                        PaymentQuotePlacementFee = entity.Leases[0].LeasePlacementFee,
                        PaymentQuoteTotalLeaseAmount = entity.Leases[0].LeaseTotalAmount,
                        PaymentQuoteDescription2 = entity.Leases[0].LeaseOtherDescription,
                        PaymentQuoteLeaseTerm2 = Guid.Empty,
                        PaymentQuoteMonthlyRentalPayment = entity.Leases[0].LeaseMonthlyRentalPayment,
                        PaymentQuoteAmountDueAtSigning = entity.Leases[0].LeaseAmountDueAtSigining,
                        UserID = entity.PaymentQuoteCreatedBy,
                    },
                    commandType: CommandType.StoredProcedure);

                return id;
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

        /*! 
      * \brief   Get the Payment Quote List
      * \details Fetch the list of Payment Quote
      * \author  dheeraj 
      * \date    09 Sep 2019
      * \Parameter   
      * \version 1.0    
      */
        public PagedData GetPaymentQuoteList(string name, DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetPaymentQuoteList",
                    param: new
                    {
                        Name = name,
                        FromDateSearch = From,
                        ToDateSearch = To,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = userId
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
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public Guid GetContactId(string email)
        {
            DbConnection _connection = _dbContext.Database.GetDbConnection();
            try
            {
                var data = _connection.QueryFirstOrDefault<Guid>("sp_solgen_AddLeaseFromPaymentQuote", new { PaymentQuoteEmail = email }, commandType: System.Data.CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

    
    }
}

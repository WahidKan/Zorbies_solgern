using Dapper;
using Microsoft.EntityFrameworkCore;
using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository.CustomerAnnouncement
{
    public class CustomerAnnouncementRepository : ICustomerAnnouncementRepository
    {
        private readonly SolgenDbContext _dbContext;
        public CustomerAnnouncementRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public int AddEditCustomerAnnouncement(int Id, string UserId, string model, string CompanyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Id", Id);
                parameters.Add("@UserId", UserId);
                parameters.Add("@CompanyId", CompanyId);
                parameters.Add("@json", model);
                int data = connection.QueryFirstOrDefault<int>("sp_addEdit_customer_announcement"
                                                                     , parameters, commandType: CommandType.StoredProcedure);
                return data;
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

        public bool DeleteCustomerAnnouncement(int Id, string UserId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@id", Id);
                parameters.Add("@userId", UserId);
                bool data = connection.QueryFirstOrDefault<bool>("sp_delete_customer_announcement",
                    parameters, commandType: CommandType.StoredProcedure);
                return data;
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

        public string GetCustomerAnnouncementById(int id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters param = new DynamicParameters();
                string data = connection.QueryFirstOrDefault<string>("sp_customer_announcement_getById",
                    param: new
                    {
                        customerAnnId = id
                    }, commandType: CommandType.StoredProcedure);
                return data;
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

        public PagedData GetCustomerAnnouncementList(int pageNo, int totalPage, string sortCol, string sortDir, string seacrh)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query<dynamic>("sp_customer_announcement_list", param: new
                {
                    pageNo = pageNo,
                    totalPage = totalPage,
                    sortCol = sortCol,
                    sortDir = sortDir,
                    seacrh = seacrh
                }
                , commandType: CommandType.StoredProcedure).AsList();
                return new PagedData(dataList, pageNo, totalPage);
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

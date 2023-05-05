using Dapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Solgen.Core;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;

namespace Solgen.Repository.Subscription
{
    public class SubscriptionRepository : ISubscriptionRepository
    {
        private readonly SolgenDbContext _dbContext;
        public SubscriptionRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public int AddCompanySubscription(string UserId, CompanySubscriptionModel model)
        {
         DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                string json = JsonConvert.SerializeObject(model);
                var parameters = new DynamicParameters();
                parameters.Add("@Id", model.id);
                parameters.Add("@UserId", UserId);
                parameters.Add("@json", json);
                return connection.Query<int>("sp_solgen_CompanySubscriptionSave_V2", parameters,
                 commandType: CommandType.StoredProcedure).FirstOrDefault();

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

        public PagedData GetSubscriptionList(string sortCol, string sortOrder, int totalPage, int pageNum, string searchBy,string searchIndustry, bool? isForSuperAdminDashboard, string fromDate, string toDate)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                //fromDate = fromDate != "null" ? DateTime.Parse(fromDate).ToShortDateString() : fromDate;
                //toDate = toDate != "null" ? DateTime.Parse(toDate).ToShortDateString() : toDate;
                var dataList = connection.Query("sp_GetSubscriptionList",
                    param: new
                    {
                        sortCol= sortCol,
                        sortOrder= sortOrder,
                        totalPage= totalPage,
                        pageNum= pageNum,
                        searchBy= searchBy,
                        searchIndustry= searchIndustry,
                        isForSuperAdminDashboard = isForSuperAdminDashboard,
                        fromDate = fromDate,
                        toDate = toDate
                    },
                    commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, pageNum, totalPage);
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
        public string CheckEmailDuplicate(string Email)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.QueryFirstOrDefault<string>("sp_solgen_Check_Duplicate_Email_Subscription", new
                {
                    Email = Email
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

        public bool DeleteSubscription(int Id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.QueryFirstOrDefault<bool>("sp_DeleteSubscription", new
                {
                    Id = Id
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

        public string CreateCompany(int Id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.QueryFirstOrDefault<string>("sp_solgen_Save_Left_Menu_For_New_Company", new
                {
                    subscriptionId = Id
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
        public string GetSubscriptionApi(string CompanyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.QueryFirstOrDefault<string>("sp_solgen_GetSubscriptionApi", new
                {
                    companyId=CompanyId
                }, commandType:CommandType.StoredProcedure);
                return data;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        //public string GetAdOnsList()
        //{
        //    DbConnection connection = _dbContext.Database.GetDbConnection();
        //    try
        //    {
        //        connection.Open();
        //        var list = connection.Query<string>("sp_solgen_GetAdOnsList",
        //            commandType: CommandType.StoredProcedure).FirstOrDefault();
        //        return list;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }
        //    finally
        //    {
        //        if (connection.State == System.Data.ConnectionState.Open)
        //            connection.Close();
        //    }
        //}

        //public string GetPackageList()
        //{
        //    DbConnection connection = _dbContext.Database.GetDbConnection();
        //    try
        //    {
        //        connection.Open();
        //        var list = connection.Query<string>("sp_solgen_GetPackageList",
        //            commandType: CommandType.StoredProcedure).FirstOrDefault();
        //        return list;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }
        //    finally
        //    {
        //        if (connection.State == System.Data.ConnectionState.Open)
        //            connection.Close();
        //    }
        //}
    }
}

using Dapper;
using Microsoft.EntityFrameworkCore;
using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository.FbCampaign
{
    public class FbCampaignRepository: IFbCampaignRepository
    {

        private readonly SolgenDbContext _dbContext;
        public FbCampaignRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<PagedData> GetCampaignList(string name, DateTime? fromDate, DateTime? toDate, string sortColumn, string sortDir, int pageIndex, string pageSize, long companyID)
        {
           
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var dataList = await connection.QueryAsync("sp_solgen_GetFacebookCampaignList",
                                           param: new
                                           {
                                               Name = name,                                              
                                               SortDir = sortDir,
                                               SortColumn = sortColumn,
                                               PageNo = Convert.ToInt32(pageIndex),
                                               PageSize = Convert.ToInt32(pageSize),
                                               StartDate = fromDate,
                                               EndDate = toDate,
                                               CompanyID = companyID
                                              
                                           },
                                commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, Convert.ToInt32(pageIndex), Convert.ToInt32(pageSize));
                return _data;

               
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
        public async Task<PagedData> GetAddsList(string name, DateTime? fromDate, DateTime? toDate, string sortColumn, string sortDir, string pageIndex, string pageSize, long companyID)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var dataList = await connection.QueryAsync("sp_solgen_GetFacebookAdsList",
                                           param: new
                                           {
                                               Name = name,
                                               SortDir = sortDir,
                                               SortColumn = sortColumn,
                                               PageNo = Convert.ToInt32(pageIndex),
                                               PageSize = Convert.ToInt32(pageSize),
                                               StartDate = fromDate,
                                               EndDate = toDate,
                                               CompanyID = companyID

                                           },
                                commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, Convert.ToInt32(pageIndex), Convert.ToInt32(pageSize));
                return _data;


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
        public async Task<PagedData> GetAddSetsList(string name, DateTime? fromDate, DateTime? toDate, string sortColumn, string sortDir, string pageIndex, string pageSize, long companyID)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var dataList = await connection.QueryAsync("sp_solgen_GetFacebookAdsetList",
                                           param: new
                                           {
                                               Name = name,
                                               SortDir = sortDir,
                                               SortColumn = sortColumn,
                                               PageNo = Convert.ToInt32(pageIndex),
                                               PageSize = Convert.ToInt32(pageSize),
                                               StartDate = fromDate,
                                               EndDate = toDate,
                                               CompanyID = companyID

                                           },
                                commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, Convert.ToInt32(pageIndex), Convert.ToInt32(pageSize));
                return _data;


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

        

        public async Task<string> GetCampaignDetailsById(string id, string moduleName, string submoduleName)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetProposalById",
                    new
                    {
                        ProposalId = id,
                        moduleName = moduleName,
                        submoduleName = submoduleName

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
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

        public string AddEditCampaign(JsonModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Ids", model.Id);
                //parameters.Add("@JSON", (model.FormJsonData));
                parameters.Add("@JSON", (model.FormJsonData.Replace("'", "\''")));
                parameters.Add("@USER_ID", (model.userId));
                parameters.Add("@module_code", (model.ModuleCode));
                parameters.Add("@submodule_code", (model.SubModuleCode));
                parameters.Add("@companyId", (model.companyId));
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_AddEditProposal_custom"
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
    }

}

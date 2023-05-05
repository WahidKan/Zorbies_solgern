
using Dapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using Solgen.Core;
using Newtonsoft.Json;
using System.Threading.Tasks;
using Solgen.Core.Models;

namespace Solgen.Repository
{
    public class RequirementsRepository : IRequirementsRepository
    {
        private readonly SolgenDbContext _dbContext;
        public RequirementsRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<string> getRequirementsList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, bool isAllRecords)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_Requirements_Listing", param: new
                {
                    VIEWER_ID = userId,
                    COMPANY_ID = companyId,
                    SORT_BY = sortDir,
                    SORT_EXP = sortColumn,
                    PAGESIZE = pageSize,
                    PAGENUMBER = pageIndex,
                    SEARCH_CONDITION = nameSearch,
                    ModuleName = moduleName,
                    subModuleName = submoduleName,
                    view_port_id = custom_view_id,
                    isAllRecords = isAllRecords
                }
                , commandType: CommandType.StoredProcedure).FirstOrDefault());
                return dataList;
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


        public string AddEditRequirement(ProjectModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Ids", model.Id);
                //parameters.Add("@JSON", model.FormJsonData);
                parameters.Add("@JSON", (model.FormJsonData.Replace("'", "\''")));
                parameters.Add("@USER_ID", (model.userId));
                parameters.Add("@module_code", (model.ModuleCode));
                parameters.Add("@submodule_code", (model.SubModuleCode));
                parameters.Add("@COMPANY_ID", (model.companyId));
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_AddEditRequirement_custom"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

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


        public string GetTypeOnBaseRecordType(string MasterIdAuto, string SerchText, long length, long ID, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_Get_RequirementMasterType",
                    new
                    {
                        MasterIdAuto = MasterIdAuto,
                        SerchText = SerchText,
                        length = length,
                        companyId = companyId,
                        ID = ID
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
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

        //public List<MasterItems> GetTypeOnBaseRecordType(string MasterIdAuto, string SerchText, long length, long ID, long companyId)
        //{
        //    DbConnection connection = _dbContext.Database.GetDbConnection();
        //    try
        //    {
        //        List<MasterItems> dataList = new List<MasterItems>();
        //        connection.Open();
        //        dataList = connection.Query<MasterItems>("sp_solgen_Get_RequirementMasterType",
        //            new { MasterIdAuto = MasterIdAuto, SerchText = SerchText, length = length, companyId = companyId, ID = ID },
        //            commandType: System.Data.CommandType.StoredProcedure).ToList();

        //        return dataList;
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

using Dapper;
using Microsoft.EntityFrameworkCore;
using Solgen.Core;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;

namespace Solgen.Repository.CompanySetting
{
    public class CompanyIntegrationSettingRepository : ICompanyIntegrationSettingRepository
    {
        private readonly SolgenDbContext _dbContext;

        public CompanyIntegrationSettingRepository(SolgenDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

       
        public string GetCompanyIntegrationSetting(string companyId, string userId, string moduleName, string strType, string displayCode)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                //if (PrimaryId == "undefined")
                //{
                //    PrimaryId = null;
                //}
                var data = connection.Query<string>("sp_solgen_Get_Custom_Fields_Dynamic_With_View_Init",
                    new
                    {
                        PRIMARY_KEY_VALUE = 0,
                        COMPANY_ID = Convert.ToInt32(companyId),
                        MODULE_NAME = moduleName,
                        SUB_MODULE_CODE = strType,
                        OTHER_DATA = "",
                        USER_ID = userId,
                        displayCode = displayCode,

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



        public string AddEditCompanyIntegrationSetting(CompanyIntegrationSettingModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@COMPANY_ID", model.CompanyId);
                //parameters.Add("@JSON", model.FormJsonData);
                parameters.Add("@JSON", (model.FormJsonData.Replace("'", "\''")));
                parameters.Add("@USER_ID", (model.UserId));
                parameters.Add("@Ids", 0);
                parameters.Add("@module_code", (model.ModuleCode));
                parameters.Add("@submodule_code", (model.SubModuleCode));
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_AddEditCompanyIntegrationSetting_custom"
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


        public SettingModel GetCompanyIntegrationSettingById(string companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
              
                var data = connection.Query<SettingModel>("sp_solgen_CompanyIntegrationSettingByCompanyId",
                    new
                    {
                        companyId = companyId,
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
    }
}

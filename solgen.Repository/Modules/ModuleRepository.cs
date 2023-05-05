using System;
using System.Collections.Generic;
using System.Text;
using Solgen.Core;
using Dapper;
using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Data;

namespace Solgen.Repository
{
    public class ModuleRepository : IModuleRepository
    {
        private readonly SolgenDbContext _dbContext;

        public ModuleRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<ModuleModel> GetModuleList(string userId,string companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<ModuleModel> returnModules = new List<ModuleModel>();

                connection.Open();
                var allModules = connection.Query<ModuleModel>("sp_solgen_GetRolesForUser", new { userID = userId, companyid = companyid, isApplyRole = CommonSettings.AppSetting["CommonSettings:IsApplyRole"],forLeftMenu=true }, commandType: System.Data.CommandType.StoredProcedure).ToList();
                var parentModules = allModules.Where(m => m.ModuleParentModuleId == null).Distinct().ToList();

                foreach (var item in parentModules)
                {
                    var child = allModules.Where(m => m.ModuleParentModuleId == item.ModuleId).ToList();
                    if (child.Count != 0)
                        item.SubModules = child;

                    if (allModules.Any(m => m.ModuleParentModuleId == item.ModuleId) && child.Count > 0)
                        returnModules.Add(item);
                    else if (!allModules.Any(m => m.ModuleParentModuleId == item.ModuleId) && child.Count == 0)
                        returnModules.Add(item);
                }
                return returnModules;
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

        public string getRoleModuleList(long companyId, Guid userId, bool isApplyRole, bool fromMobile)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            
            {
                connection.Open();
                string data = connection.Query<string>("sp_solgen_GetLeftMenuList",
                    new
                    {
                        COMPANY_ID = companyId,
                        USER_ID = userId,
                        isApplyRole= isApplyRole,
                        fromMobile = fromMobile
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

        public string GetSubModuleDetails(int companyId, string subModuleCode, string userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_GetSubModuleFields",
                    new
                    {
                        COMPANY_ID = companyId,                        
                        SUB_MODULE_CODE = subModuleCode,
                        OTHER_DATA = "",
                        USER_ID = userId                        
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

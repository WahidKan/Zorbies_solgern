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
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public class ConfigurationSettingRepository: IConfigurationSettingRepository 
    {
        private readonly SolgenDbContext _dbContext;

        public ConfigurationSettingRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public PagedData GetConfigurationSettings(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyID, string custom_view_id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_ConfigurationSetting",
                param: new
                {
                    NameSearch = name,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageNo = pageIndex,
                    PageSize = pageSize,
                    UserId = userId,
                    CompanyID = companyID
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

        public CompanySetupModel getcompanySetupDetail(long CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

               // Guid InsuranceId = new Guid(insuranceId);
                InsuranceDetailsModel dataList = new InsuranceDetailsModel();
                connection.Open();
                var data = connection.QueryFirstOrDefault<CompanySetupModel>("sp_solgen_GetCompanySetupByCompanyId", new { CompanyID }, commandType: System.Data.CommandType.StoredProcedure);

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

        public int AddOrUpdateCompanySetup(CompanySetupModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                //var data = 0;
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CompanyId", model.CompanyId);
                parameters.Add("@Name", model.CompanyName);
                parameters.Add("@AddressLineOne", model.AddressLineOne);
                parameters.Add("@AddressLineTwo", model.AddressLineTwo);
                parameters.Add("@Status", 1001);
                parameters.Add("@CompanyLogo", model.CompanyLogo);
                parameters.Add("@companyType", model.companyType);
                parameters.Add("@ReferenceInterval", model.ReferenceInterval);
                parameters.Add("@autoSaveInterval", model.autoSaveInterval);
                parameters.Add("@Phone", model.Phone);
                parameters.Add("@City", model.City);
                parameters.Add("@Country", model.Country);
                parameters.Add("@State", model.State);
                parameters.Add("@ZipCode", model.ZipCode);
                parameters.Add("@SMTPHost", model.SMTPHost);
                parameters.Add("@SMTP_username", model.SMTPusername);
                parameters.Add("@SMTP_password", model.SMTPpassword);
                parameters.Add("@SMTP_port", model.SMTPport);
                parameters.Add("@FromEmail", model.FromEmail);
                parameters.Add("@createdBy", model.CreatedBy);
                parameters.Add("@DocumentType", model.DocumentType);
                parameters.Add("@EmailTemplateLogo", model.EmailTemplateLogo);
                parameters.Add("@IsTLS", model.IsTLS);
                parameters.Add("@IsEnableSSL", model.IsEnableSSL);
                parameters.Add("@SignerType", model.signerType);
                connection.Open();
				var data = connection.QueryFirstOrDefault<int>("sp_solgen_AddUpdateCompanySetup", parameters, commandType: System.Data.CommandType.StoredProcedure);

				//var data = 0;
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
        public int AddOrUpdateManageStatus(ManageStatusModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                //var data = 0;
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@masterId", model.masterId);
                parameters.Add("@ModuleId", model.ModuleId);
                parameters.Add("@SubModuleId", model.SubModuleId);
                parameters.Add("@FieldsData", model.FieldsData);
                parameters.Add("@Controls", model.Controls);
                parameters.Add("@UserId", model.UserId);
                parameters.Add("@CompanyId", model.CompanyId);
                connection.Open();
                var data = connection.QueryFirstOrDefault<int>("sp_solgen_AddUpdateManageStatus", parameters, commandType: System.Data.CommandType.StoredProcedure);
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

        public StatusModelDetails GetManageStatusDetail(string moduleId, string subModuleId, string fieldId,string CompanyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                StatusModelDetails contactFormModel = new StatusModelDetails();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@moduleId", moduleId);
                parameters.Add("subModuleId", subModuleId);
                parameters.Add("@fieldId", fieldId);
                parameters.Add("@CompanyId", CompanyId);
                using (var multi = connection.QueryMultiple("sp_solgen_GetStatusDetailBymoduleIdAndSubModuleIdAndFieldId", parameters, commandType: CommandType.StoredProcedure))
                {
                    contactFormModel.StatusSingleModels.Add(multi.ReadSingleOrDefault<StatusSingleModels>());
                    contactFormModel.addmoreFields.AddRange(multi.Read<StatusModels>());
                    return contactFormModel;
                }
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

        public List<CustomFieldDropDown> GetModuleAndSubModuleData(string moduleId, string subModuleId, string companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<CustomFieldDropDown>("sp_solgen_GetCustomfieldForSelect", new { moduleId = moduleId, companyId = companyId, subModuleId = subModuleId }, commandType: CommandType.StoredProcedure).ToList();

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

        public PagedData getStagesList( string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID, long moduleid, long submoduleid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                   
                connection.Open();
                var data = connection.Query("[sp_solgen_GetLoanApllicationStagesList_1]", param: new
                {
                  
                    SortDir = SortDir,
                    SortColumn = SortColumn,
                    PageNo = PageNo,
                    PageSize = PageSize,
                    UserId = userId,
                    CompanyID = companyID,
                    moduleid= moduleid,
                    submoduleid= submoduleid
                },
                  commandType: System.Data.CommandType.StoredProcedure).ToList();

                return new PagedData(data, PageNo, PageSize);

            }

            catch (Exception ex)
            {

                throw ex;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    connection.Close();
                }

            }
        }

        public List<MasterItems> GetStagePages(Guid userid, long CompanyID, long moduleid, long submoduleid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<MasterItems>("sp_solgen_GetStagePages_v1", param: new
                {
                    userid = userid,
                    CompanyID = CompanyID,
                    moduleid= moduleid,
                    submoduleid= submoduleid
                },commandType: CommandType.StoredProcedure).ToList();
                return data;

            }
            catch (Exception ex)
            {

                throw ex;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    connection.Close();
                }

            }
        }
        public  string AddStageForm(StageFormSubmitModel data, long comanyId, Guid userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
         

                connection.Open();
                var Responsedata = connection.Query<string>("sp_solgen_AddStageForm", param: new
                {
                    Userid = userId,
                    CompanyID = comanyId,
                    JSON = data.json,
                    ModuleId = data.moduleid,
                    SubModuleId=data.subModuleId,
                    Formname = data.formname,
                    FormMasterId=data.formMasterId,
                    ClassType = data.classType,
                }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return Responsedata;

            }
            catch (Exception ex)
            {

                throw ex;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    connection.Close();
                }

            }
        }

        public StatusModelDetails GetDocumentsFromMaster()
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                StatusModelDetails contactFormModel = new StatusModelDetails();
                DynamicParameters parameters = new DynamicParameters();                
                using (var multi = connection.QueryMultiple("sp_solgen_GetDocumentsFromMaster", parameters, commandType: CommandType.StoredProcedure))
                {
                    contactFormModel.StatusSingleModels.Add(multi.ReadSingleOrDefault<StatusSingleModels>());
                    contactFormModel.addmoreFields.AddRange(multi.Read<StatusModels>());
                    return contactFormModel;
                }
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

        public int AddUpdateDocumentsMaster(ManageStatusModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                //var data = 0;
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@masterId", model.masterId);                
                parameters.Add("@FieldsData", model.FieldsData);                
                parameters.Add("@UserId", model.UserId);
                connection.Open();
                var data = connection.QueryFirstOrDefault<int>("sp_solgen_AddUpdateDocumentsMaster", parameters, commandType: System.Data.CommandType.StoredProcedure);
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

        public string GetStageFormDetail(string companyId, Guid userId, long formId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_Get_Stage_FormDetail",
                    new
                    {
                        CompanyId= companyId,
                        UserId= userId,
                        FormId= formId
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

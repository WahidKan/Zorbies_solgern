
using Dapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using Solgen.Core;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public class EmailTemplateRepository : IEmailTemplateRepository
    {
        private readonly SolgenDbContext _dbContext;

        public EmailTemplateRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
          
        }

        /*! 
        * \brief   change status of emai template
        * \details it will chnage  status of emai template to activat/deactive
        * \author  Dheeraj 
        * \date    09 Sep 2019
        * \Parameter   id:template id,statusid:active/inactive
        * \version 1.0    
        */
        public CommonStatusModel ChangeStatus(Guid? id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
             
                connection.Open();
                CommonStatusModel _status = connection.Query<CommonStatusModel>("sp_solgen_ActiveDeactiveEmailTemplateByID", new {EmailTemplateId = id}, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return _status;
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
        public EmailTemplateModel GetEmailTemplteByTemplateName(string templateName, string companyId = "")
        {
            
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                var data = connection.QueryFirstOrDefault<EmailTemplateModel>("sp_solgen_GetEmailTemplateByTemplateName", new { EmailTemplateName = templateName,companyId=companyId }, commandType: System.Data.CommandType.StoredProcedure);

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


        /*! 
     * \brief   delete email template by template id
     * \details it will set DEleted column to delete but not delete template physically
     * \author  Dheeraj 
     * \date    09 Sep 2019
     * \Parameter   id:template id
     * \version 1.0    
     */
        public ChangeStatusModel Delete(Guid id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                
                connection.Open();
                ChangeStatusModel ret = connection.Query<ChangeStatusModel>("sp_solgen_DeleteTemplateByID", new { EmailTemplateId = id }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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
        
        /*! 
       * \brief   Get the email template by template id
       * \details Fetch the template for edit
       * \author  Dheeraj 
       * \date    09 Sep 2019
       * \Parameter   id:template id
       * \version 1.0    
       */
        public EmailTemplates GetById(long id)
        {
            DbConnection _connection = _dbContext.Database.GetDbConnection();
            try
            {
                EmailTemplates data = _connection.QuerySingleOrDefault<EmailTemplates>("sp_solgen_GetEmailTemplateById", new { EmailTemplateId= id }, commandType: System.Data.CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        /*! 
       * \brief   Get the email templates list
       * \details Fetch the list of templates
       * \author  Dheeraj 
       * \date    09 Sep 2019
       * \Parameter   
       * \version 1.0    
       */
        public List<EmailTemplates> GetList(int pageIndex, int pageSize)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<EmailTemplates> dataList = new List<EmailTemplates>();
                connection.Open();
                dataList = connection.Query<EmailTemplates>("sp_solgen_GetEmailTemplates",new { pageindex=pageIndex,pagesize=pageSize}, commandType: System.Data.CommandType.StoredProcedure).ToList();

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


        /*! 
      * \brief   Get the email templates list
      * \details Fetch the list of templates
      * \author  Dheeraj 
      * \date    09 Sep 2019
      * \Parameter   
      * \version 1.0    
      */
        public PagedData GetList(string emailTemplateName, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetEmailTemplateList",
                    param: new
                    {
                        EmailTemplateName = emailTemplateName,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = userId,
                        CompanyId = companyId
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


        /*! 
        * \brief   save email template 
        * \details it will save save email template data
        * \author  Dheeraj 
        * \date    09 Sep 2019
        * \Parameter   entity:contains all data
        * \version 1.0    
        */
        public Guid Save(EmailTemplates entity)
        {
            Guid id = Guid.Empty;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                id= connection.ExecuteScalar<Guid>("sp_solgen_SaveEmailTemplate",
                    param: new
                    {
                        EmailTemplateId = entity.EmailTemplateId,
                        EmailTemplateName = entity.EmailTemplateName,
                        EmailTemplateSubject = entity.EmailTemplateSubject,
                        UserID = entity.EmailTemplateCreatedBy,
                        EmailTemplateStatusId = entity.EmailTemplateStatusId,
                        Template = entity.Template,
                        EmailTemplateIsDefault = entity.EmailTemplateIsDefault,
                        CompanyId=entity.CompanyID,
                        ModuleName = entity.selectedValue,
                        SubModuleName = entity.selectedSubModuleValue
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

        public List<MasterItems> GettemplatetDll(Guid userid, long companyid, string objectname)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                var data = connection.Query<MasterItems>("sp_solgen_gettemplateddl_leadview", new
                {
                   
                    userid = userid,
                    companyid = companyid,
                    objectname = objectname
                }, commandType: CommandType.StoredProcedure).ToList();


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


        public async Task<string> GetHtmlContentFromDatabase(bool? isDefaultView,long? Id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                //connection.Open();
                //DynamicParameters parameters = new DynamicParameters();
                //parameters.Add("@isDefaultView", isDefaultView);
                //parameters.Add("@Id", Id);
                ////parameters.Add("@CSS", (model.css));
                ////parameters.Add("@UserId", model.CreatedBy);
                ////parameters.Add("@companyId", model.CompanyID);
                //string data = connection.QueryFirstOrDefault<string>("Sp_Solgen_GetHtmlContentFromDatabase"
                //                                                     , commandType: CommandType.StoredProcedure);

                //return data;
                connection.Open();
                string data = connection.QueryFirstOrDefault<string>("Sp_Solgen_GetHtmlContentFromDatabase", new
                {
                    Id = Id,
                    isDefaultView = isDefaultView
                }, commandType: CommandType.StoredProcedure).ToString();
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


        public async Task<string> SaveHtmlBuilderData(GrapesJsModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ID", model.id);
                parameters.Add("@HTML", (model.html));
                parameters.Add("@CSS", (model.css));
                parameters.Add("@IsDefault", (model.isDefault));
                parameters.Add("@Name", (model.Name));
                parameters.Add("@Description", (model.Description));
                parameters.Add("@LinkWithCustomerPortal", (model.linkWithCustomerPortal));
                parameters.Add("@UserId", model.CreatedBy);
                parameters.Add("@companyId", model.CompanyID);
                parameters.Add("@statusId", model.statusId);
                string data = connection.QueryFirstOrDefault<string>("Sp_Solgen_SaveHtmlBuilderData"
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
        public long VerifyDuplicateName(string name, long id, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@id", id);
                parameters.Add("@name", name);
                parameters.Add("@companyId", companyId);
                return connection.ExecuteScalar<int>("sp_DocumentMaker_HTMLTemplateNameExist"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

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
        public long CloneTemplete(long id, long companyId, string userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ID", id);
                parameters.Add("@UserId", userId);
                parameters.Add("@companyId", companyId);
                return connection.ExecuteScalar<int>("Sp_Solgen_CloneHtmlBuilderData"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

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

        public string SavePlaceHolder(string PlaceHolders, long Id)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                
                var parameters = new DynamicParameters();
                parameters.Add("@Id", Id);
                parameters.Add("@placeholders", PlaceHolders);

                var data = connection.Query<string>("Sp_Solgen_Update_DocumentMakerFromHtmlTemplate",
                    parameters,
                    commandType: CommandType.StoredProcedure).FirstOrDefault();

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

        public async Task<PagedData> GetHtmlContentListingData(string name, string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("Sp_Solgen_GetHtmlContentListingData",
            param: new
            {
                Searchname = name,
                SortColumn = sortColumn,
                SortDir = sortDir,
                PageNo = Convert.ToInt32(PageNo),
                PageSize = Convert.ToInt32(pageSize),
                CompanyId = companyId,
                UserId = UserId
            },
            commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, Convert.ToInt32(PageNo), Convert.ToInt32(pageSize));
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


    }
}

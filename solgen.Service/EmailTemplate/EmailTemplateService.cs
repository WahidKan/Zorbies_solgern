
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Solgen.Core;
using Solgen.Repository;

namespace Solgen.Service
{
    public class EmailTemplateService : IEmailTemplateService
    {
        private readonly IEmailTemplateRepository repository;

        
        public EmailTemplateService(IEmailTemplateRepository repository)
        {
            this.repository = repository;
        }

        /*! 
       * \brief  Change Status by id .
       * \details function is used to Change Status by id.
       * \author Anish K.
       * \date    16 Sept 2019
       * \version 1.0    
       */
        public CommonStatusModel ChangeStatus(Guid? id)
        {
            try
            {
                return repository.ChangeStatus(id);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        /*! 
       * \brief  Change Status by Delete by id.
       * \details function is used to Change Status by Delete by id.
       * \author Anish K.
       * \date    16 Sept 2019
       * \version 1.0    
       */
        public ChangeStatusModel Delete(Guid guid)
        {
            try
            {
                return repository.Delete(guid);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        /*! 
        * \brief  Get by  id.
        * \details function is used to Get by Get by id.
        * \author Anish K.
        * \date    16 Sept 2019
        * \version 1.0    
        */

        public EmailTemplates GetById(long id)
        {
            try
            {
                return repository.GetById(id);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        /*! 
       * \brief  Get List.
       * \details function is used to Get List.
       * \author Anish K.
       * \date    16 Sept 2019
       * \version 1.0    
       */
        public List<EmailTemplates> GetList(int pageIndex, int pageSize)
        {
            try
            {
                return repository.GetList(pageIndex, pageSize);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        /*! 
       * \brief  Add update Email template.
       * \details function is used to Add update Email template.
       * \author Anish K.
       * \date    16 Sept 2019
       * \version 1.0    
       */
        public Guid Save(EmailTemplates entity)
        {
            try
            {
                return repository.Save(entity);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        /*! 
       * \brief  Get list of email template.
       * \details function is used to Get list of email template.
       * \author Anish K.
       * \date    16 Sept 2019
       * \version 1.0    
       */
        public PagedData GetList(string emailTemplateName, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyId)
        {
            try
            {
                return repository.GetList(emailTemplateName, sortColumn, sortDir, pageIndex, pageSize, userId, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        /*! 
       * \brief  Get EmailTemplte By TemplateName.
       * \details function is used to Get EmailTemplte By TemplateName.
       * \author Anish K.
       * \date    16 Sept 2019
       * \version 1.0    
       */
        public EmailTemplateModel GetEmailTemplteByTemplateName(string templateName)
        {
            return repository.GetEmailTemplteByTemplateName(templateName);
        }

        public List<MasterItems> GettemplatetDll(Guid userid, long companyid, string objectname)
        {
            return repository.GettemplatetDll(userid,companyid,objectname);
        }
        public async Task<string> GetHtmlContentFromDatabase(bool? isDefaultView, long? Id)
        {
            return await repository.GetHtmlContentFromDatabase(isDefaultView, Id);
        }
        public async Task<string> SaveHtmlBuilderData(GrapesJsModel model)
        {
            return await repository.SaveHtmlBuilderData(model);
        }
        public long VerifyDuplicateName(string name, long id, long companyId)
        {
            try
            {
                return repository.VerifyDuplicateName(name, id, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public long CloneTemplete(long id, long companyId, string userId)
        {
            try
            {
                return repository.CloneTemplete(id, companyId, userId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<PagedData> GetHtmlContentListingData(string name, string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId)
        {
            return await repository.GetHtmlContentListingData(name, sortColumn, sortDir, PageNo, pageSize, companyId, UserId);
        }
      //  string SavePlaceHolder(string PlaceHolders, long Id);
        public string SavePlaceHolder(string PlaceHolders, long Id)
        {
            try
            {
                return repository.SavePlaceHolder(PlaceHolders, Id);
            }
            catch (System.Exception ex)
            {

                throw new System.Exception(ex.Message);
            }
        }
    }
}

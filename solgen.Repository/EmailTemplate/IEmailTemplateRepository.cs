
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Solgen.Core;

namespace Solgen.Repository
{
    public interface IEmailTemplateRepository
    {
        CommonStatusModel ChangeStatus(Guid? id);
        EmailTemplates GetById(long id);

        List<EmailTemplates> GetList(int pageIndex, int pageSize);
        Guid Save(EmailTemplates entity);
        ChangeStatusModel Delete(Guid guid);
        PagedData GetList(string emailTemplateName, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyId);
        EmailTemplateModel GetEmailTemplteByTemplateName(string templateName, string companyId = "");
        List<MasterItems> GettemplatetDll(Guid userid, long companyid, string objectname);
        Task<string> GetHtmlContentFromDatabase(bool? isDefaultView,long? Id);
        Task<string> SaveHtmlBuilderData(GrapesJsModel model);
        long VerifyDuplicateName(string routeName, long id, long companyId);
        long CloneTemplete(long id, long companyId, string userId);
        Task<PagedData> GetHtmlContentListingData(string name, string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId);
        string SavePlaceHolder(string PlaceHolders, long Id);
    }
}

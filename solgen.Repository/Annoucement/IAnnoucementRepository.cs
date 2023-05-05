using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using Solgen.Core;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public interface IAnnoucementRepository
    {
        Task<List<AnnoucementModel>> GetAnnoucementForDashboardByUserTypeId(long UserTypeId, long CompanyId, bool isFirstTime);
     
        PagedData GetAnnouncementList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, string userId, long companyID);
        string ChangeStatus(string userid, string tableName, string primaryKeyColumn, string ids, long statusId);
        string DeleteAnnoucement(string userid, string tableName, string primaryKeyColumn, string ids);
        Task<int> saveAnnouncement(AnnouncementModel data, long CompanyId);
        AnnouncementModel GetAnnouncementDetailById(long? id, long? companyId, Guid? userId);
        PagedData CallLogList(Guid User_id, string accountId, string contactId, DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageSizeValue, int pageSize, long CompanyID);

    }
}

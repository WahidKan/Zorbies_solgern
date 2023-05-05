using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Solgen.Core;
using Solgen.Repository;


namespace Solgen.Service
{
    public class AnnoucementService :IAnnoucementService
    {
        private readonly IAnnoucementRepository _annoucementRepository;
        public AnnoucementService(IAnnoucementRepository annoucementRepository)
        {
            _annoucementRepository = annoucementRepository;
        }

        public async Task<List<AnnoucementModel>> GetAnnoucementForDashboardByUserTypeId(long UserTypeId, long CompanyId, bool isFirstTime)
        {
            return await _annoucementRepository.GetAnnoucementForDashboardByUserTypeId(UserTypeId, CompanyId, isFirstTime);
        }

        public async Task<int> saveAnnouncement(AnnouncementModel data, long CompanyId)
        {
            return await _annoucementRepository.saveAnnouncement(data, CompanyId);
        }

        public PagedData GetAnnouncementList(string title, string sortColumn, string sortDir, int pageIndex, int pageSize, string userId, long companyID)
        {
            try
            {
                return _annoucementRepository.GetAnnouncementList(title, sortColumn, sortDir, pageIndex, pageSize, userId, companyID);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string ChangeStatus(string userid, string tableName, string primaryKeyColumn, string ids, long statusId)
        {
            try
            {
                return _annoucementRepository.ChangeStatus(userid, tableName, primaryKeyColumn, ids, statusId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public string DeleteAnnouncement(string userid, string tableName, string primaryKeyColumn, string ids)
        {
            return _annoucementRepository.DeleteAnnoucement(userid, tableName, primaryKeyColumn, ids);
        }

        public AnnouncementModel GetAnnouncementDetailById(long? id, long? companyId, Guid? userId)
        {
            return _annoucementRepository.GetAnnouncementDetailById(id, companyId, userId);
        }

        public PagedData CallLogList(Guid User_id, string accountId, string contactId, DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageSizeValue, int pageSize, long CompanyID)
        {
            return _annoucementRepository.CallLogList(User_id,  accountId,  contactId,  From,  To, sortColumn,  sortDir,  pageSizeValue,  pageSize,  CompanyID);
        }
    }
}

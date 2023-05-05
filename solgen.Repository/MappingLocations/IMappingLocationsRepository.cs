using System;
using System.Collections.Generic;
using System.Text;
using Solgen.Core;

namespace Solgen.Repository
{
    public interface IMappingLocationsRepository
    {
        Guid Save(NotesHistory entity);
        string NewMappingLocationSave(JsonModel model);
        PagedData GetList(string notesComment, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId);
        PagedData getMappingLocationslist(long locationId ,string SortColumn, string SortDir, int PageNo, int PageSize, long companyID);
        PagedData GetMappingMembersList(long locationId ,string SortColumn, string SortDir, int PageNo, int PageSize, long companyID);
        List<dynamic> GetRelatedMappingWareHouse(long id, long companyID);
        PagedData getNoteslistForCardView(long leadid, string submodulename, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID);
        int DeleteMappingLocation(string id, Guid? userId, long? companyId);
        int DeleteMappingMember(string id, Guid? userId, long? companyId);
        string SetNotesToRead(string noteid, string companyId);
        int SaveFileUploadingDetails(List<UploadFileModelList> list);
        List<UploadFileModelList> GetNoteImageList(string noteId, string modulename, string objectRefId, string companyID, string userId);
        int deleteMulipleUploadingImageImage(string Id, string noteId, string modulename, string objectRefId, string companyID, string userId);
        IEnumerable<dynamic> GetWorkOrderTypeBasedonWorkorder(string accountId, string objectRefId, string userId, string companyId, string submoduleName);
        IEnumerable<dynamic> GetLocationDropdownBasedOnLocationType(string id, string userId, string companyId);
        string  getNoteslistForCardViewgetNoteslistForNotesThreadsByNoteId(long leadid, string NotesId, long companyID, string submodulename, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId);
    }
}

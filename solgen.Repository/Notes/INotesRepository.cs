using System;
using System.Collections.Generic;
using System.Text;
using Solgen.Core;

namespace Solgen.Repository
{
    public interface INotesRepository
    {
        Guid Save(NotesHistory entity);
        int NewNoteSave(Notes note);
        PagedData GetList(string notesComment, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId);
        PagedData getNoteslist(long leadid, string searchText, string submodulename, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID, Boolean view);
        PagedData getNoteslistForCardView(long leadid, string submodulename, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID);
        int DeleteNote(string id, Guid? userId);
        string SetNotesToRead(string noteid, string companyId);
        int SaveFileUploadingDetails(List<UploadFileModelList> list);
        List<UploadFileModelList> GetNoteImageList(string noteId, string modulename, string objectRefId, string companyID, string userId);
        int deleteMulipleUploadingImageImage(string Id, string noteId, string modulename, string objectRefId, string companyID, string userId);
        IEnumerable<dynamic> GetWorkOrderTypeBasedonWorkorder(string accountId, string objectRefId, string userId, string companyId, string submoduleName);
       string  getNoteslistForCardViewgetNoteslistForNotesThreadsByNoteId(long leadid, string NotesId, long companyID, string submodulename, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId);
        string GetChangeStatusForAddmin(string objectRefId, string userId, string companyId, string notesId,string status);
        string GetNoteCurentDataList(string leadid, string NotesId, string companyID, Guid? userId);
        int PinNote(string id, string userId, long companyID);
    }
}

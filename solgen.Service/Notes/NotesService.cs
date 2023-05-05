using System;
using System.Collections.Generic;
using System.Text;
using Solgen.Core;
using Solgen.Repository;

namespace Solgen.Service
{
    public class NotesService: INotesService  
    {
        private readonly INotesRepository repository;

        public NotesService(INotesRepository repository)
        {
            this.repository = repository;
        }
        /*! 
 * \brief   Add notes
 * \details  Get Module List
 * \author  Deepak jha 
 * \date    16 Sept 2019
 * \version 1.0    
 */
        public Guid Save(NotesHistory entity)
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
 * \brief   GetList
 * \details  Get notes List
 * \author  Deepak jha 
 * \date    16 Sept 2019
 * \version 1.0    
 */
        public PagedData GetList(string notesComment, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            try
            {
                return repository.GetList(notesComment, sortColumn, sortDir, pageIndex, pageSize, userId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public int NewNoteSave(Notes note)
        {
            try
            {
                return repository.NewNoteSave(note);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public PagedData getNoteslist(long leadid, string searchText, string submodulename, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID, Boolean view)
        {
            return repository.getNoteslist(leadid, searchText, submodulename, objectname, SortColumn, SortDir, PageNo, PageSize, userId, companyID, view);
        }
        public PagedData getNoteslistForCardView(long leadid, string submodulename, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID)
        {
            return repository.getNoteslistForCardView(leadid,  submodulename, objectname, SortColumn, SortDir, PageNo, PageSize, userId, companyID);
        }
        public int DeleteNote(string id, Guid? userId)
        {
            try
            {
                return repository.DeleteNote(id,userId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public string  SetNotesToRead(string noteid, string companyId)
        {
            try
            {
                return repository.SetNotesToRead(noteid, companyId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public int  SaveFileUploadingDetails(List<UploadFileModelList> list)
        {
            try
            {
                return repository.SaveFileUploadingDetails(list);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public List<UploadFileModelList> GetNoteImageList(string noteId, string modulename, string objectRefId, string companyID, string userId)
        {
            try
            {
                return repository.GetNoteImageList(noteId, modulename, objectRefId, companyID,  userId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public int deleteMulipleUploadingImageImage(string Id, string noteId, string modulename, string objectRefId, string companyID, string userId)
        {
            try
            {
                return repository.deleteMulipleUploadingImageImage(Id,noteId, modulename, objectRefId, companyID, userId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public IEnumerable<dynamic> GetWorkOrderTypeBasedonWorkorder(string accountId, string objectRefId, string userId, string companyId, string submoduleName)
        {
            return repository.GetWorkOrderTypeBasedonWorkorder( accountId,  objectRefId,  userId,  companyId,submoduleName);
        }
        public string  getNoteslistForCardViewgetNoteslistForNotesThreadsByNoteId(long leadid, string NotesId, long companyID, string submodulename, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId)
        {
            return repository.getNoteslistForCardViewgetNoteslistForNotesThreadsByNoteId(leadid,  NotesId,  companyID, submodulename,  objectname,  SortColumn,  SortDir,  PageNo,  PageSize,  userId);
        }
        public string GetNoteCurentDataList(string leadid, string NotesId, string companyID, Guid? userId)
        {
            return repository.GetNoteCurentDataList(leadid,  NotesId,  companyID,  userId);
        }
        public string GetChangeStatusForAddmin(string objectRefId, string userId, string companyId, string notesId, string status)
        {
            return repository.GetChangeStatusForAddmin(objectRefId, userId, companyId, notesId,status);
        }
        public int PinNote(string id, string userId, long companyID)
        {
            return repository.PinNote( id,  userId,  companyID);
        }
    }
}

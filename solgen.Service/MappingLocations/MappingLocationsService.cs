using System;
using System.Collections.Generic;
using System.Text;
using Solgen.Core;
using Solgen.Repository;

namespace Solgen.Service
{
    public class MappingLocationsService: IMappingLocationsService  
    {
        private readonly IMappingLocationsRepository repository;

        public MappingLocationsService(IMappingLocationsRepository repository)
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

        public string NewMappingLocationSave(JsonModel note)
        {
            try
            {
                return repository.NewMappingLocationSave(note);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public PagedData getMappingLocationslist(long locationId, string SortColumn, string SortDir, int PageNo, int PageSize, long companyID)
        {
            return repository.getMappingLocationslist(locationId, SortColumn, SortDir, PageNo, PageSize, companyID);
        } 
        public PagedData GetMappingMembersList(long locationId, string SortColumn, string SortDir, int PageNo, int PageSize, long companyID)
        {
            return repository.GetMappingMembersList(locationId, SortColumn, SortDir, PageNo, PageSize, companyID);
        }
        public List<dynamic> GetRelatedMappingWareHouse(long id, long companyID)
        {
            return repository.GetRelatedMappingWareHouse(id, companyID);
        }
        public PagedData getNoteslistForCardView(long leadid, string submodulename, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID)
        {
            return repository.getNoteslistForCardView(leadid, submodulename, objectname, SortColumn, SortDir, PageNo, PageSize, userId, companyID);
        }
        public int DeleteMappingLocation(string id, Guid? userId, long companyId)
        {
            try
            {
                return repository.DeleteMappingLocation(id,userId,companyId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        } 
        public int DeleteMappingMember(string id, Guid? userId, long companyId)
        {
            try
            {
                return repository.DeleteMappingMember(id,userId,companyId);
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
        public IEnumerable<dynamic> GetLocationDropdownBasedOnLocationType(string id, string userId, string companyId)
        {
            return repository.GetLocationDropdownBasedOnLocationType(id, userId, companyId);
        }
        public string  getNoteslistForCardViewgetNoteslistForNotesThreadsByNoteId(long leadid, string NotesId, long companyID, string submodulename, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId)
        {
            return repository.getNoteslistForCardViewgetNoteslistForNotesThreadsByNoteId(leadid,  NotesId,  companyID, submodulename,  objectname,  SortColumn,  SortDir,  PageNo,  PageSize,  userId);
        }
    }
}

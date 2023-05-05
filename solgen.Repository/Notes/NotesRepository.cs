using Dapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using Solgen.Core;

namespace Solgen.Repository
{
    public class NotesRepository : INotesRepository
    {
        private readonly SolgenDbContext _dbContext;

        public NotesRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;

        }

        /*! 
     * \brief   Get the notes history list
     * \details Fetch the list of notes
     * \author  Anish 
     * \date    20 Sep 2019
     * \Parameter   
     * \version 1.0    
     */
        public PagedData GetList(string notesComment, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetNotesList",
                    param: new
                    {
                        NotesComment = notesComment,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = userId
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
        * \brief   save comment
        * \details it will save comment data
        * \author  Anish 
        * \date    20 Sep 2019
        * \Parameter   entity:contains all data
        * \version 1.0    
        */
        public Guid Save(NotesHistory entity)
        {
            Guid id = Guid.Empty;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                id = connection.ExecuteScalar<Guid>("sp_solgen_SaveNotes",
                    param: new
                    {
                        NotesHistoryId = entity.NotesHistoryId,
                        NotesComments = entity.NotesComments,
                        UserID = entity.NotesAddedById,
                        NotesAddedForId = entity.NotesAddedForId
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

        public int NewNoteSave(Notes note)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                long replyNoteId = 0;
                if (note.notifyTo == "null")
                {
                    note.notifyTo = null;
                }
                if (note.assignTo == "null")
                {
                    note.assignTo = null;
                }
                if (note.status == "null")
                {
                    note.status = null;
                }
                if (note.workType == "null")
                {
                    note.workType = null;
                }
                if (note.AccountId == "undefined" || note.AccountId == "null")
                {
                    note.AccountId = null;
                }
                if (note.isReplyNotes == true)
                {
                    replyNoteId = note.noteid;
                    note.noteid = 0;
                }

                int id = connection.ExecuteScalar<int>("sp_solgen_Save_Notes",
                    param: new
                    {

                        objectrefid = note.objectrefid,
                        noteid = note.noteid,
                        title = note.title,
                        status = note.status,
                        assignTo = note.assignTo,
                        notesComments = note.notesComments,
                        //moduleName = note.moduleName,
                        submoduleName = note.submoduleName,
                        userid = note.userid,
                        Companyid = note.Companyid,
                        fileName = note.fileName,
                        notifyUser = note.notifyTo,
                        workType = note.workType,
                        resourseType = note.resourseType,
                        AccountId = note.AccountId,
                        replyNoteId = replyNoteId
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
        public PagedData getNoteslist(long leadid, string searchText, string submodulename, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID, Boolean view)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                if (searchText == null)
                {
                    searchText = "";
                }
                var data = connection.Query("sp_solgen_Get_Notes_List", param: new
                {

                    SortDir = SortDir,
                    SortColumn = SortColumn,
                    PageNo = PageNo,
                    PageSize = PageSize,
                    UserId = userId,
                    CompanyID = companyID,
                    leadid = leadid,
                    submodulename = submodulename,
                    searchText = searchText ?? "",
                    objectname = objectname,
                    view = view
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
        public PagedData getNoteslistForCardView(long leadid, string submodulename, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                var data = connection.Query("sp_solgen_Get_Notes_ListForCardView", param: new
                {

                    SortDir = SortDir,
                    SortColumn = SortColumn,
                    PageNo = PageNo,
                    PageSize = PageSize,
                    UserId = userId,
                    CompanyID = companyID,
                    leadid = leadid,
                    submodulename = submodulename,

                    objectname = objectname
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
        public int DeleteNote(string id, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<int>("[sp_solgen_Delete_Notes_Accountview]", new
                {
                    noteid = id,

                    userid = userId,

                }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
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

        public string SetNotesToRead(string noteid, string companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_GerReadNoteByNoteId", new
                {
                    noteid = noteid,
                    companyId = companyId,

                }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
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
        public int SaveFileUploadingDetails(List<UploadFileModelList> list)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                //Note:-  UserId and CompanyId travel in Table Type, no need of passing it
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CompanyId", "");
                parameters.Add("@UserId", "");
                parameters.AddTable("@MultipleNotesFileUploading", "dbo.MultipleNotesFileUploading", list);
                var data = connection.QueryFirstOrDefault<int>("sp_solgen_AddOrUpdateMultipleNotesFileUploading"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

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
        public List<UploadFileModelList> GetNoteImageList(string noteId, string modulename, string objectRefId, string companyID, string userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<UploadFileModelList>("sp_solgen_GetNoteImageList",
                    new
                    {
                        UserId = userId,
                        noteId = noteId,
                        modulename = modulename,
                        objectRefId = objectRefId,
                        companyID = companyID
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
        public int deleteMulipleUploadingImageImage(string Id, string noteId, string modulename, string objectRefId, string companyID, string userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<int>("sp_solgen_Delete_Notes_MultipleDocuments", new
                {
                    noteid = noteId,
                    Id = Id,
                    userid = userId,
                    modulename = modulename,
                    objectRefId = objectRefId,
                    companyID = companyID,


                }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
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
        public IEnumerable<dynamic> GetWorkOrderTypeBasedonWorkorder(string accountId, string objectRefId, string userId, string companyId, string submoduleName)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                dynamic data = connection.Query<dynamic>("sp_solgen_GetWorkOrderTypeBasedonWorkorder",
                    new
                    {
                        userId = userId,
                        companyId = companyId,
                        accountId = accountId,
                        objectRefId = objectRefId,
                    }
                   , commandType: CommandType.StoredProcedure).ToList();
                return data;
            }
            catch (Exception ex)
            {
                //throw new Exception(ex.Message);
                return null;
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public string getNoteslistForCardViewgetNoteslistForNotesThreadsByNoteId(long leadid, string NotesId, long companyID, string submodulename, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_GetNoteslistForNotesThreadsByNoteId", new
                {
                    noteid = NotesId,
                    companyID = companyID,


                }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
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
        public string GetNoteCurentDataList(string leadid, string NotesId, string companyID, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_Get_Notes_CurentThreadsByNoteId", new
                {
                    noteid = NotesId,
                    companyID = companyID,
                    userId = userId,
                    ObjectRef = leadid

                }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
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
        public int PinNote(string id, string userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<int>("sp_solgen_Get_Notes_AddUpdatePinNoteById", new
                {
                    noteid = id,
                    companyID = companyID,
                    userId = userId,

                }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
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
        public string GetChangeStatusForAddmin(string objectRefId, string userId, string companyId, string notesId, string status)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_SetStatusFromNoteForAdminChange", new
                {
                    noteid = notesId,
                    companyID = companyId,
                    objectRefId = objectRefId,
                    status = status


                }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
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
    }
}

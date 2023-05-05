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
    public class MappingLocationsRepository : IMappingLocationsRepository
    {
        private readonly SolgenDbContext _dbContext;

        public MappingLocationsRepository(SolgenDbContext dbContext)
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

        public string NewMappingLocationSave(JsonModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Id", model.Id);
                parameters.Add("@JSON", (model.FormJsonData));
                parameters.Add("@USER_ID", (model.userId));
                parameters.Add("@companyId", (model.companyId));
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_SaveLocationMapping"
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
        public List<dynamic> GetRelatedMappingWareHouse(long id, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                
                var data = connection.Query("[sp_solgen_Get_WareHouseLocationMapping]", param: new
                {
                    CompanyID = companyID,
                    locationId = id,
                },
                  commandType: System.Data.CommandType.StoredProcedure).ToList();

                return data;

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
        public PagedData getMappingLocationslist(long locationId, string SortColumn, string SortDir, int PageNo, int PageSize, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                var data = connection.Query("[sp_solgen_Get_tblLocationMapping_Listing]", param: new
                {

                    SortDir = SortDir,
                    SortColumn = SortColumn,
                    PageNo = PageNo,
                    PageSize = PageSize,
                    CompanyID = companyID,
                    locationId = locationId,
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
        public PagedData GetMappingMembersList(long locationId, string SortColumn, string SortDir, int PageNo, int PageSize, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                var data = connection.Query("[sp_solgen_GetResourceLocationMapping]", param: new
                {

                    SortDir = SortDir,
                    SortColumn = SortColumn,
                    PageNo = PageNo,
                    PageSize = PageSize,
                    CompanyID = companyID,
                    id = locationId,
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
        public int DeleteMappingMember(string id, Guid? userId, long? companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<int>("[sp_solgen_DeleteResourceLocationMapping]", new
                {
                    id = id,
                    companyId = companyId,
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
        public int DeleteMappingLocation(string id, Guid? userId,long? companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<int>("[sp_solgen_DeletetblLocationMapping]", new
                {
                    id = id,
                    companyId = companyId,
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
        public IEnumerable<dynamic> GetWorkOrderTypeBasedonWorkorder(string accountId, string objectRefId, string userId, string companyId,string submoduleName)
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
                        accountId= accountId,
                        objectRefId= objectRefId,
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
         public IEnumerable<dynamic> GetLocationDropdownBasedOnLocationType(string id, string userId, string companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                dynamic data = connection.Query<dynamic>("[sp_solgen_GetRelatedLocationList]",
                    new
                    {
                        id = id,
                        companyId = companyId,
                        userId = userId,
     
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
        public string getNoteslistForCardViewgetNoteslistForNotesThreadsByNoteId(long leadid, string NotesId,long companyID, string submodulename, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId)
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
    }
}

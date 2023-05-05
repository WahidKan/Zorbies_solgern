using System;
using System.Collections.Generic;
using System.Text;
using Solgen.Core;
using Solgen.Core.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Data.Common;
using System.Data;
using Dapper;
using Newtonsoft.Json;

namespace Solgen.Repository
{
    public class AnnoucementRepository :IAnnoucementRepository
    {
        private readonly SolgenDbContext _dbContext;
        public AnnoucementRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<AnnoucementModel>> GetAnnoucementForDashboardByUserTypeId(long UserTypeId,long CompanyId,bool isFirstTime)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data =await connection.ExecuteScalarAsync<string>("sp_solgen_GetAnnoucementsForDashboardByUserTypeId", param: new
                {
                    UserTypeId = UserTypeId,
                    CompanyId = CompanyId,
                    IsFirstTime = isFirstTime,
                }, commandType: System.Data.CommandType.StoredProcedure);

                if(string.IsNullOrEmpty(data))
                {
                    List<AnnoucementModel> lst = new List<AnnoucementModel>();
                    return lst;
                }
                else
                {
                    var _result = JsonConvert.DeserializeObject<List<AnnoucementModel>>(data); 
                    return _result;
                }
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

        public async Task<int> saveAnnouncement(AnnouncementModel data, long CompanyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                DateTime dateTime;
                var endDate = data.EndDate;
                if (DateTime.TryParse(data.EndDate, out dateTime))
                    endDate = Convert.ToDateTime(data.EndDate).ToString();


                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Id", data.Id);
                parameters.Add("Title", data.Title);
                parameters.Add("Message", data.Message);
                parameters.Add("AcknowledgmentRequired", data.AcknowledgmentRequired);
                parameters.Add("Filename", data.FileName);
                parameters.Add("StartDate", Convert.ToDateTime(data.StartDate));
                parameters.Add("EndDate", endDate);
                parameters.Add("RecuringType", data.RecuringType);
                parameters.Add("USER_ID", data.User_id);
                parameters.Add("CompanyId", CompanyId);
                parameters.Add("UserType", data.Usertype);
                parameters.Add("Status", data.Status == true ? 1001 : 1002);
                parameters.Add("FilePath", data.File);

                int returndata = connection.QueryFirstOrDefault<int>("sp_solgen_AddUpdateAnnouncement", parameters, commandType: CommandType.StoredProcedure);
                return returndata;
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

        public PagedData GetAnnouncementList(string title, string sortColumn, string sortDir, int pageIndex, int pageSize, string userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetAnnouncementList",
                    param: new
                    {
                        Title = title,  
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = userId,
                        CompanyID = companyID
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

        public string ChangeStatus(string userid, string tableName, string primaryKeyColumn, string ids, long statusId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var _status = connection.Query<string>("sp_solgen_common_update_status", new { MODIFIEDBY = userid, TABLENAME = tableName, PRIMARYCOLUMNNAME = primaryKeyColumn, UPDATEIDS = ids, STATUSID = statusId }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
                return _status;
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

        public string DeleteAnnoucement(string userid, string tableName, string primaryKeyColumn, string ids)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var _status = connection.Query<string>("sp_solgen_common_delete_status", new { MODIFIEDBY = userid, TABLENAME = tableName, PRIMARYCOLUMNNAME = primaryKeyColumn, @DELETEIDS = ids }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
                return _status;
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

        public AnnouncementModel GetAnnouncementDetailById(long? id, long? companyId, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                AnnouncementModel dataList = new AnnouncementModel();
                connection.Open();
                var data = connection.QueryFirstOrDefault<AnnouncementModel>("sp_solgen_GetAnnouncementDetailById", new { AnnouncementId=id,CompanyId= companyId,UserId= userId }, commandType: System.Data.CommandType.StoredProcedure);

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
        public PagedData CallLogList(Guid User_id, string accountId, string contactId, DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageSizeValue, int pageSize, long CompanyID)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var dataList = connection.Query("sp_solgen_GetCallLogList",
                   param: new
                   {
                       SortDir =sortDir,
                       SortColumn =sortColumn,
                       PageNo = pageSizeValue,
                       PageSize  = pageSizeValue,
                       CompanyId =CompanyID,
                       FromDateSearch =From,
                       ToDateSearch=To,
                       AccountId =accountId,
                       ContactId =contactId
                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, pageSizeValue, pageSize);
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

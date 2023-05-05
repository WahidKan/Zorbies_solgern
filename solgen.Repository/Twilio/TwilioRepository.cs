using Dapper;
using Microsoft.EntityFrameworkCore;
using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public class TwilioRepository:ITwilioRepository
    {
        private readonly SolgenDbContext _dbContext;

        public TwilioRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }
       
        public async Task<string> GetPhoneNumber(long primaryId, long refId, string columnName, string refTable, string refColumn)
        { 
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetPhoneNumberForCall",
                    new
                    {
                        primaryId = primaryId,
                        refId = refId,
                        columnName = columnName,
                        refTable= refTable,
                        refColumn= refColumn

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
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
        public async Task<string> statusCallBack(dynamic request, string fromNumber,long CompanyId, string userId,string AccountId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_Solgen_AddUpdateTwillioAddUpdateCallLogDetiail_v1",
                    new
                    {
                        Uri = request.RecordingUrl ?? "",
                        Id = request.CallSid??"",
                        SessionId = request.RecordingSid??"",//request.SessionId,
                        StartTime ="",//request.StartTime,
                        Duration =request.CallDuration?? "",
                        Type ="",//request.Type,
                        Direction =request.Direction??"",
                        Action ="",//request.Action,
                        Result =request.CallStatus ?? string.Empty,
                        To_PhoneNumber =request.Called ?? string.Empty,
                        To_Location =request.ToCountry??"",
                        From_Name =request.CallerName??"",
                        From_PhoneNumber = fromNumber,

                        RecordingDuration = request.RecordingDuration??"",
                        From_ExtensionId ="",//request.From_ExtensionId,
                        Recording_Uri =request.RecordingUrl??"" ,
                        Recording_Id = request.RecordingSid??"",
                        Recording_Type = "",//request.Recording_Type,
                        Recording_ContentUri = "",//request.Recording_ContentUri,
                        TelephonySessionId = "",//request.TelephonySessionId,
                        RecordingFilePath = "",//request.RecordingFilePath,
                        CompanyId = CompanyId,
                        CallStatus = request.CallStatus ?? string.Empty,
                        UserId =userId,
                        AccountId= AccountId,
                        ObjectName = ""

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
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

        public async Task<string> VideoCallLogHistory( string json)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_Solgen_VideoCallLogHistory",
                    new
                    {
                        JSON = json

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
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

        public string statusCallBackForCompany(dynamic request, string fromNumber, long CompanyId, string userId, string AccountId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_Solgen_AddUpdateTwillioAddUpdateCallLogDetiail_v1",
                    new
                    {
                        Uri = request.TranscriptionUrl ?? "",
                        Id = request.CallSid ?? "",
                        SessionId = "",//request.SessionId,
                        StartTime = "",//request.StartTime,
                        Duration = "",//request.CallDuration ?? "",
                        Type = "",//request.Type,
                        Direction = request.Direction ?? "",
                        Action = "",//request.Action,
                        Result = request.CallStatus,
                        To_PhoneNumber =request.To,// request.Called,
                        To_Location = request.ToCountry ?? "",
                        From_Name = "",//request.CallerName ?? "",
                        From_PhoneNumber = fromNumber,// request.Caller,

                        RecordingDuration = request.RecordingDuration ?? "",
                        From_ExtensionId = "",//request.From_ExtensionId,
                        Recording_Uri = request.RecordingUrl ?? "",
                        Recording_Id = request.RecordingSid ?? "",
                        Recording_Type = "",//request.Recording_Type,
                        Recording_ContentUri = "",//request.Recording_ContentUri,
                        TelephonySessionId = "",//request.TelephonySessionId,
                        RecordingFilePath = "",//request.RecordingFilePath,
                        CompanyId = request.CompanyId,
                        CallStatus = request.CallStatus,
                        UserId = request.UserId,
                        AccountId = request.AccountId,
                        ObjectName= request.ObjectName

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
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
    }
}

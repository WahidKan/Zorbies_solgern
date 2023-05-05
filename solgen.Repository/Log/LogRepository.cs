using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;
using Solgen.Core;
using Microsoft.EntityFrameworkCore;
using Dapper;
using System.Data;

namespace Solgen.Repository
{
    public class LogRepository :ILogRepository
    {
        private readonly SolgenDbContext _dbContext;
        public LogRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;

        }
        public Guid Save(LogModel model)
        {
            Guid id = Guid.Empty;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                id = connection.ExecuteScalar<Guid>("sp_solgen_SaveLog",
                    param: new
                    {
                        LogId = model.LogId,
                        LogType = model.LogType,
                        LogShortMessage = model.LogShortMessage,
                        LogLongMessage = model.LogLongMessage,
                        LogIpAddress = model.LogIpAddress,
                        LogPageUrl = model.LogPageUrl,
                        LogReferrerUrl = model.LogReferrerUrl,
                        LogCreatedBy=model.LogCreatedBy,
                        LogCreatedOn=model.LogCreatedOn,
                        ObjectRefId=model.ObjectRefId
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
    }
}

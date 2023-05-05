using System;
using Solgen.Core;
using Dapper;
using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace Solgen.Repository
{
    public class EmailSettingsRepository : IEmailSettingsRepository
    {
        private readonly SolgenDbContext _dbContext;

        public EmailSettingsRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public EmailSettingsModel GetEmailSettings(Guid userId,string companyId="")
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.QueryFirstOrDefault<EmailSettingsModel>("sp_solgen_GetEmailSettings",new { UserId= userId, companyId= companyId }, commandType: System.Data.CommandType.StoredProcedure);
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

        public int SaveEmailSettings(EmailSettingsModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                //parameters.Add("@userID", model.EmailSettingCreatedBy);
                //parameters.Add("@settingID", model.EmailSettingId ?? Guid.Empty);
                //parameters.Add("@smtpUsername", model.SMTPUserName);
                //parameters.Add("@smtpPassword", model.SMTPPassword);
                //parameters.Add("@smtpPort", model.SMTPPort);
                //parameters.Add("@fromEmailID", model.FromEmailId);
                //parameters.Add("@companyId", model.CompanyId);

                parameters.Add("@SMTP_username", model.SMTPUserName);
                parameters.Add("@SMTP_password", model.SMTPPassword);
                parameters.Add("@SMTP_port", model.SMTPPort);
                parameters.Add("@FromEmail", model.FromEmailId);
                parameters.Add("@CompanyId", model.CompanyId);
                parameters.Add("@SMTPHost", model.SMTPServer);
                parameters.Add("@IsEnableSSL", model.IsEnableSSL);
                connection.Open();
				//var data = connection.QueryFirstOrDefault<Guid>("sp_solgen_AddOrUpdateEmailSettings", parameters, commandType: System.Data.CommandType.StoredProcedure);

				var data = connection.QueryFirstOrDefault<int>("sp_solgen_SaveEmailSettings", parameters, commandType: System.Data.CommandType.StoredProcedure);
				
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

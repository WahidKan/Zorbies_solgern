using FluentFTP;
using Microsoft.Extensions.Configuration;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;
using Solgen.Repository.CompanySetting;
using Solgen.Service;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;


 

namespace Solgen.WebApi.Services
{
    public class SFTPService : ISFTPService
    {
        private ILeadService _leadService;
        private readonly ILoanApplicationRepository _repository;

        private readonly ICompanyIntegrationSettingRepository _companyIntegrationSetting;
        private SettingModel _settings;

        public ILogService logService { get; }
        private readonly IConfiguration _configuration;
        public SFTPService(ILogService logService, ILeadService leadService, ILoanApplicationRepository repository, IConfiguration configuration, ICompanyIntegrationSettingRepository companyIntegrationSetting)
        {

            _companyIntegrationSetting = companyIntegrationSetting;
            this.logService = logService;
            _leadService = leadService;
            _repository = repository;
            _configuration = configuration;
        }
        public async Task<bool> GetDocumentList(long leadid, int submoduleid, Guid userid, int companyid,string folderPath)
        {
            try
            { 
           var lst = _leadService.getImages(leadid, submoduleid, userid, companyid);
             
            string path = "";
            List<string> doclist = new List<string>();
            foreach (var item in lst)
            {
                if (item.MasterValue != "Change Order")
                {
                   WebClient webClient = new WebClient();
                   byte[] bytes = webClient.DownloadData(item.UrlLink);
                    //path = "D:\\TestImg\\" + item.FileName + item.FileExtension;

                        
                    path = folderPath + item.FileName + item.FileExtension;
                    File.WriteAllBytes(path, bytes);
                    doclist.Add(path);
                }
            }

                return true;
             }
            catch(Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting Document Path for SFTP",
                    LogLongMessage = ex.Message,
                    LogIpAddress = "",
                    LogPageUrl = "",
                    LogReferrerUrl = "",
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return false;

            }
                   
        }

        public async Task<int> TransferDocs(long leadid, int submoduleid, Guid userid, int companyid, string ApplicationNumber, byte[] fileContents)
        {
           try
            {

                var rPath = _configuration["VerityFTP:RemotePath"];
                var fPath = _configuration["VerityFTP:FolderPath"];

                _settings = _companyIntegrationSetting.GetCompanyIntegrationSettingById(companyid.ToString());

                if (_settings != null && !string.IsNullOrEmpty(_settings.remotePath))
                {
                    rPath = _settings.remotePath;

                }

                if (_settings != null && !string.IsNullOrEmpty(_settings.folderPath))
                {
                    fPath = _settings.folderPath;

                }


                string RemotePath = rPath + DateTime.UtcNow.ToString("MM-dd-yyyy")+"/"+ApplicationNumber;


                var folderPath = fPath + DateTime.UtcNow.ToString("MM-dd-yyyy")+"\\"+ApplicationNumber + "\\";
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                System.IO.File.WriteAllBytes(folderPath + ApplicationNumber + ".csv", fileContents);


                // IEnumerable<string> multi_files = null;

                bool status = false;

                status = await GetDocumentList(leadid,submoduleid,userid,companyid, folderPath);

                 //multi_files.Append(folderPath+ ApplicationNumber + ".csv");

               // multi_files.Add(folderPath + ApplicationNumber + ".csv");
                int resultcount = 0;
              
                if (status)
                {
                     

                    FtpClient client = new FtpClient { Host = _configuration["VerityFTP:Server"], Port = Convert.ToInt32(_configuration["VerityFTP:Port"]), Credentials = new NetworkCredential(_configuration["VerityFTP:User"], _configuration["VerityFTP:Password"]) };

					if(_settings != null && !string.IsNullOrEmpty(_settings.server))
					{
                        client.Host = _settings.server;

                    }

                    if (_settings != null && _settings.port > 0)
                    {
                        client.Port = _settings.port;
                    }

                    if (_settings != null && !string.IsNullOrEmpty(_settings.password))
                    {
                        client.Credentials.Password = _settings.password;
                    }

                    if (_settings != null && !string.IsNullOrEmpty(_settings.userName))
                    {
                        client.Credentials.UserName = _settings.userName;
                    }


                    client.EncryptionMode = FtpEncryptionMode.None;
                     await client.ConnectAsync();
                    client.RetryAttempts = 3;



                    var result = await client.UploadDirectoryAsync(folderPath, RemotePath, FtpFolderSyncMode.Update, FtpRemoteExists.Overwrite);

                    List<VerityFileModel> verityFileModel = new List<VerityFileModel>();
                    VerityFileModel verityModel = new VerityFileModel();

                    foreach (var item in result)
                    {
                        verityModel = new VerityFileModel();
                        verityModel.Name = item.Name;
                        verityModel.RemotePath = item.RemotePath;
                        verityModel.IsSuccess = item.IsSuccess;
                        verityModel.IsFailed = item.IsFailed;
                        verityModel.IsSkipped = item.IsSkipped;
                       // verityModel.Exceptionmsg = item.Exception.Message;

                        verityFileModel.Add(verityModel);

                        //result = "Remote Path: " + item.RemotePath + " IsSuccess: " + item.IsSuccess + " Name " + item.Name + "  " + item.IsFailed + item.IsSkipped;
                    }

                    var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(verityFileModel);

                    var tempData = _repository.SaveVerityFileTransferDetail(leadid, userid, companyid, RemotePath, jsonString);


                     client.DisconnectAsync();
                }
               

                return resultcount;
            }
            catch(Exception ex)
            {

                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception occured during TransferDocs using SFTP",
                    LogLongMessage = ex.Message,
                    LogIpAddress = "",
                    LogPageUrl = "",
                    LogReferrerUrl = "",
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return 0;
            }

            
        }
     
    }
}

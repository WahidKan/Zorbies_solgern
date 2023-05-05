using Solgen.Repository.FileConfiguration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Service.FileConfiguration
{
    public class FileConfigurationService : IFileConfigurationService
    {
        private readonly IFileConfigurationRepository _repository;
        public FileConfigurationService(IFileConfigurationRepository repository)
        {
            _repository = repository;
        }
        public List<dynamic> GetFileExtensionList(long companyId)
        {
            try
            {
                return _repository.GetFileExtensionList(companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public List<dynamic> GetFileConfigurationList(long companyId)
        {
            try
            {
                return _repository.GetFileConfigurationList(companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public bool Save(string jsondata, string userid, long companyId)
        {
            try
            {
                return _repository.Save(jsondata, userid, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

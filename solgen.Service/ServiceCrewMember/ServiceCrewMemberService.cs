using Newtonsoft.Json.Linq;
using Solgen.Core;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class ServiceCrewMemberService : IServiceCrewMemberService
    {
        private readonly IServiceCrewMemberRepository _repository;
        public ServiceCrewMemberService(IServiceCrewMemberRepository repository)
        {
            _repository = repository;
        }
        
        public async Task<string> GetServiceCrewMemberList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            return await _repository.GetServiceCrewMemberList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
        }
        public async Task<string> ManageServiceCrewMember(ServiceCrewMemberModel model)
        {
            return await _repository.ManageServiceCrewMember(model);
        }

        public async Task<PagedData> GetServiceCrewMemberListByServiceCrewId(string sortColumn, string sortDir, int pageNo, int pageSize, long crewId, Guid? userId, long companyId)
        {
            return await _repository.GetServiceCrewMemberListByServiceCrewId(sortColumn, sortDir, pageNo, pageSize, crewId, userId, companyId);
        }
        public async Task<PagedData> GetServiceAppointmentListByServiceCrewId(string sortColumn, string sortDir, int pageNo, int pageSize, long crewId, Guid? userId, long companyId)
        {
            return await _repository.GetServiceAppointmentListByServiceCrewId(sortColumn, sortDir, pageNo, pageSize, crewId, userId, companyId);
        }

        public async Task<PagedData> GetServiceCrewMembersWithResourceType(string searchtxt, string sortColumn, string sortDir, int pageNo, int pageSize, long crewId, Guid? userId, long companyId)
        {
            return await _repository.GetServiceCrewMembersWithResourceType(searchtxt,sortColumn, sortDir, pageNo, pageSize, crewId, userId, companyId);
        }

        public async Task<string> GetServiceResourcesByServiceCrewId(long crewId)
        {
            return await _repository.GetServiceResourcesByServiceCrewId(crewId);

        }    

        public ServiceResourceAvailabilityModel ConvertForCheckResourceAvailability(string json)
        {
            try
            {
                Dictionary<string, string> _dictonary = new Dictionary<string, string>();
                var jsonObject = JObject.Parse(json);

                foreach (var item in jsonObject)
                {
                    string key = item.Key;
                    key = key.Split('_').Last();
                    _dictonary.Add(key, item.Value.ToString());
                }
                ServiceResourceAvailabilityModel model = new ServiceResourceAvailabilityModel();
                model.ServiceResourceId = _dictonary.FirstOrDefault(x => x.Key == "ServiceResourceId").Value;
                model.StartDate = _dictonary.FirstOrDefault(x => x.Key == "StartDate").Value;
                model.EndDate = _dictonary.FirstOrDefault(x => x.Key == "EndDate").Value;
                return model;
            }
            catch
            {
                ServiceResourceAvailabilityModel model = new ServiceResourceAvailabilityModel();
                return model;

            }
        }

        public async Task<string> CheckResourceAvailability(ServiceResourceAvailabilityModel model)
        {
            return await _repository.CheckResourceAvailability(model);
        }
    }
}

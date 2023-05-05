using Microsoft.Extensions.DependencyInjection;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{ 
    public class LeadService : ILeadService
    {
        private readonly ILeadRepository _repository;
        private readonly IServiceScopeFactory _serviceScopeFactory;

        public LeadService(ILeadRepository repository, IServiceScopeFactory serviceScopeFactory)
        {
            _repository = repository;
            _serviceScopeFactory = serviceScopeFactory;
        }

        public async Task<int> AssociteProduct(string productids, long leadid, Guid userid, int companyid, int submoduleid, string objectname, bool isLoanapp)
        {
            return await _repository.AssociteProduct(productids,leadid, userid, companyid, submoduleid, objectname,isLoanapp);
        }

        public int DeleteNote(string id, long leadid, int submoduleid, string objectname, Guid? userId, long companyID)
        {
            return _repository.DeleteNote(id, leadid, submoduleid, objectname, userId, companyID);
        }   
        public int DeleteContact(string id, long leadid, int submoduleid, string objectname, Guid? userId, long companyID)
        {
            return _repository.DeleteContact(id, leadid, submoduleid, objectname, userId, companyID);
        }
        public int DeleteAssociateProductbyid(string id, long leadid, int submoduleid, string objectname, Guid? userId, long companyID)
        {
            return _repository.DeleteAssociateProductbyid(id,leadid, submoduleid, objectname, userId, companyID);
        }

        public PagedData GetAssociateProductList(long leadid, int submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID)
        {
            return _repository.GetAssociateProductList(leadid,submoduleid,objectname,nameSearch, SortColumn, SortDir, PageNo, PageSize, userId, companyID);
        }

        public IEnumerable<dynamic> GetLeadAccountdata(long leadid, Guid userid, int companyid, int submoduleid, string objectname)
        {
            return _repository.GetLeadAccountdata(leadid, userid, companyid, submoduleid, objectname);
        }

        public IEnumerable<dynamic> GetLeadappointments(long leadid, Guid userid, int companyid, int submoduleid, string objectname)
        {
            return _repository.GetLeadappointments(leadid, userid, companyid, submoduleid, objectname);
        }

        public PagedData getNoteslist(long leadid, int submoduleid, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID)
        {
            return _repository.getNoteslist(leadid, submoduleid, objectname, SortColumn, SortDir, PageNo, PageSize, userId, companyID);
        }

        public PagedData GetProductList(long leadid, int submoduleid, string objectname,string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID)
        {
            return _repository.GetProductList(leadid, submoduleid, objectname, nameSearch, SortColumn, SortDir, PageNo, PageSize, userId, companyID);
        }

        public int saveNotes(leadNotesModel model)
        {
            return _repository.saveNotes(model);
        }
        public string saveEmail(leadEmailModel model)
        {
            return _repository.saveEmail(model);
        }
        public PagedData getEmaillist(long leadid, int submoduleid, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID)
        {
            return _repository.getEmaillist(leadid, submoduleid, objectname, SortColumn, SortDir, PageNo, PageSize, userId, companyID);
        }

        public PagedData getContactList(long leadid, int submoduleid, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID)
        {
            return _repository.getContactList(leadid, submoduleid, objectname, SortColumn, SortDir, PageNo, PageSize, userId, companyID);
        }

        public long saveLeadConvert(leadConvertModel model)
        {
            return _repository.saveLeadConvert(model);
        }
         public string saveLeadConvertproduct(leadConvertModel model)
        {
            return _repository.saveLeadConvertproduct(model);
        }

        public IEnumerable<dynamic> getLeadConvertData(long leadid, Guid userid, int companyid)
        {
            return _repository.getLeadConvertData(leadid, userid, companyid);
        }
        public List<leadImagesModel> getImages(long leadid, int submoduleid, Guid userid, int companyid)
        {
            return _repository.getImages(leadid, submoduleid, userid, companyid);
        }

        public List<MasterItems> GetContactDll(long leadid, int submoduleid, Guid userid, long companyid, string objectname)
        {
            return _repository.GetContactDll(leadid, submoduleid, userid, companyid,objectname);
        }

        public int updateLeadStatus(long leadstatus, long leadid, Guid userid, long companyid)
        {
            return _repository.updateLeadStatus(leadstatus, leadid, userid, companyid); 
        }

        public int Deleteimage(string id, Guid? userId, long companyID)
        {
            return _repository.Deleteimage(id, userId, companyID);
        }

        public IEnumerable<dynamic> getLeadConvertModuleWizard(Guid userid, long companyid)
        {
            return _repository.getLeadConvertModuleWizard( userid, companyid);
        }

        public int updatecreatedBy(string ownerid, long leadid, Guid userid, long companyid)
        {
            return _repository.updatecreatedBy(ownerid, leadid, userid, companyid);
        }

        public async Task<string> GetLeadById(long leadId, long companyID, Guid userid)
        {
            return await _repository.GetLeadById(leadId, companyID, userid);
        }
        public async Task<string> CheckRequiredDataOnLeadConvert(long leadId, long companyID, Guid userid)
        {
            return await _repository.CheckRequiredDataOnLeadConvert(leadId, companyID, userid);
        }

        public async Task<string> GetMandatoryDocumentsByLoanId(long loanId, long stageid, long companyID)
        {
            return await _repository.GetMandatoryDocumentsByLoanId(loanId, stageid, companyID);
        }

        public PagedData getLeadSMSlist(long leadid, int submoduleid, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID)
        {
            return _repository.getLeadSMSlist(leadid, submoduleid, objectname, SortColumn, SortDir, PageNo, PageSize, userId, companyID);
        }

        public bool CheckEmailNotExistInOthersTypeAccount(string email, int companyId)
        {
            try
            {
                return _repository.CheckEmailNotExistInOthersTypeAccount(email, companyId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public List<MasterItems> GetLeadConvertAccountDll(Guid userid, long companyid, string id, int length, string serchText)
        {
            return _repository.GetLeadConvertAccountDll(userid, companyid, id, length, serchText);
        }
        public List<MasterItems> GetLeadConvertContactDll(Guid userid, long companyid, string id, int length, string serchText, bool isLead)
        {
            return _repository.GetLeadConvertContactDll(userid, companyid, id, length, serchText,  isLead);
        }
        public long saveLeadConvertopportunity(leadConvertModelopportunity model)
        {
            return _repository.saveLeadConvertopportunity(model);
        }

        public SourceDestinationResponseModel GetSourceDestinationLocations(long opportunityId, long companyId, string type)
        {
            return _repository.GetSourceDestinationLocations(opportunityId,companyId,type);
        }

        public async Task<string> UpdateAccountLocation(SourceDestinationCopmarisonModel model)
        {
            model.Distance = Math.Round(Convert.ToDouble(Convert.ToDouble(model.Steps) / 1000)).ToString();
            model.Time = (Convert.ToDouble(Convert.ToDouble(model.TotalSeconds) / 3600)).ToString("0.00");
            return await _repository.UpdateAccountLocation(model);
        }

        public async Task<string> UpdateAccountZoneLocation(SourceDestinationCopmarisonModel model)
        {
            return await _repository.UpdateAccountZoneLocation(model);
        }

        public int SetNearbyWarehouseAndLocation(long opportunityId, long companyId)
        {
            try
            {
                _ = Task.Run(async () =>
                {
                    var scope = _serviceScopeFactory.CreateScope();
                    var mapservice = scope.ServiceProvider.GetRequiredService<IMapService>();
                    var leadservice = scope.ServiceProvider.GetRequiredService<ILeadService>();

                    var _resultWarehouse = await SetNearbyWarehouseinAccount(opportunityId, companyId, mapservice, leadservice);
                    var _resultSiteSurveyZone = await SetNearbySiteSurveyZoneinAccount(opportunityId, companyId, mapservice, leadservice);

                });
                return 1;
            }
            catch (Exception ex)
            {
                var error = ex.Message.ToString();
                return -1;
            }
        }
        public async Task<long> SetNearbyWarehouseinAccount(long opportunityId, long companyId, IMapService mapService, ILeadService leadService)
        {
            try
            {
                var _finalResult = "0";
                var jsonResult = leadService.GetSourceDestinationLocations(opportunityId, companyId, "warehouse");

                var source = jsonResult.source;// warehouses
                var destination = jsonResult.destination; // account addess
                List<SourceDestinationCopmarisonModel> model = new List<SourceDestinationCopmarisonModel>();
                foreach (var item in source)
                {
                    SourceDestinationCopmarisonModel resp = new SourceDestinationCopmarisonModel();
                    var distance = mapService.GetDuration(item.Address, destination.Address);

                    resp.AccountId = destination.Id;
                    resp.AccountAddress = destination.Address;
                    resp.LocationId = item.Id;
                    resp.LocationAddress = item.Address;
                    resp.Time = distance.Time;
                    resp.Steps = distance.Steps;
                    resp.TotalSeconds = distance.TotalSeconds;
                    resp.Distance = distance.Distance;

                    model.Add(resp);
                }
                if (model.Count > 0)
                {
                    var minValue = model.Find(x => x.Steps == model.Min(item => item.Steps));

                    _finalResult = await leadService.UpdateAccountLocation(minValue);
                }

                return Convert.ToInt32(_finalResult);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return -1;
            }
        }
        public async Task<long> SetNearbySiteSurveyZoneinAccount(long opportunityId, long companyId, IMapService mapService, ILeadService leadService)
        {
            try
            {
                var _finalResult = "0";
                var jsonResult = leadService.GetSourceDestinationLocations(opportunityId, companyId, "sitesurvey");

                var source = jsonResult.source;// site survey zones
                var destination = jsonResult.destination; // account address
                List<SourceDestinationCopmarisonModel> model = new List<SourceDestinationCopmarisonModel>();
                foreach (var item in source)
                {
                    SourceDestinationCopmarisonModel resp = new SourceDestinationCopmarisonModel();
                    var distance = mapService.GetDuration(item.Address, destination.Address);

                    resp.AccountId = destination.Id;
                    resp.AccountAddress = destination.Address;
                    resp.LocationId = item.Id;
                    resp.LocationAddress = item.Address;
                    resp.Time = distance.Time;
                    resp.Steps = distance.Steps;
                    resp.TotalSeconds = distance.TotalSeconds;
                    resp.Distance = distance.Distance;

                    model.Add(resp);
                }
                if (model.Count > 0)
                {
                    var minValue = model.Find(x => x.Steps == model.Min(item => item.Steps));

                    _finalResult = await leadService.UpdateAccountZoneLocation(minValue);
                }
                return Convert.ToInt32(_finalResult);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return -1;
            }

        }
        public int SendBackStatus(long companyId, long LeadId)
        {
            return _repository.SendBackStatus(companyId, LeadId);
        }

    }
}

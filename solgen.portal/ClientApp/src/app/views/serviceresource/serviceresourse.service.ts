import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceresourseService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  editPage: any;
  customFieldsList: any;
  constructor(private http: HttpClient) { }

  onDeleteTask(taskId: string, sectionName: string): Observable<any> {

    return this.http.get(`${this.baseUri}Task/DeleteTask?taskID=${taskId}&sectionName=${sectionName}`)
      .pipe(
        map((response: any) => {


          return true;
        })
      );
  }

  GetServiceResourseServiceList(listFiltertext: any, searchUserType: any, sortColumn: any, sortDir: any, currentPage: any, pageSizeValue: any, loginuserid: any, custom_view_id: any, searchFilter: any, moduleName: any, submoduleName: any, companyId: any, isCheckboxTick: any): Observable<any> {
      return this.http.get(`${this.baseUri}workorder/GetServiceResourseServiceList?listFiltertext=${listFiltertext}&moduleName=${moduleName}&submoduleName=${submoduleName}&searchUserType=${searchUserType}&sortColumn=${sortColumn}&sortDir=${sortDir}&currentPage=${currentPage}&pageSizeValue=${pageSizeValue}&custom_view_id=${custom_view_id}&isAllRecords=${isCheckboxTick}`)
  }
  GetServiceResourceDetail(UserId:string){
    return this.http.get(`${this.baseUri}workorder/GetServiceResourceDetail?UserId=${UserId}`)
  }
  GetCustomFieldsList(modulename: any, submoduleName: any, companyId: any, Id: any, displayType: any) {
    return this.http.get(`${this.baseUri}vendor/GetCustomFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&PrimaryId=${Id}&displayCode=${displayType}`)
      .pipe(
        map((response: any) => {
          this.customFieldsList = response;
          return true;
        })
      );
  }
  DeleteRecords(deleteId: any, tableName: any, ) {
    return this.http.get(this.baseUri + `common/DeleteRecords?primaryKey=${deleteId}&tableName=${tableName}`)
      .pipe(
        map((response: any) => {
          this.editPage = response;
          return true;
        })
      );
  }
  getCountryList() {
    return this.http.get(this.baseUri + `ManageInsurance/GetCountryList`);
  }
  addOrUpdateserviceResource(resourceJsonData: resourceServiceJsonData) {
    return this.http.post(this.baseUri + `workorder/AddOrUpdateResourceService`, resourceJsonData);
  }

  GetServiceTerritoryList(contId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `workorder/GetServiceTerritoryList?ServiceId=${contId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  refreshAppointmentList(contId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `workorder/GetServiceAppointmentList?ServiceId=${contId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  GetServiceServiceCrewList(contId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `workorder/GetServiceServiceCrewList?ServiceId=${contId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  GetServiceGetAbcenseList(contId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `workorder/GetServiceGetAbcenseList?ServiceId=${contId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  GetServiceGetFileList(contId, sortColumn, sortDir, pageIndex, pageSize,modulename,submoduleName): Observable<any> {
    return this.http.get(this.baseUri + `workorder/GetServiceGetFileList?ServiceId=${contId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}&modulename=${modulename}&submoduleName=${submoduleName}`);
  }
  refreshSkillsList(contId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `workorder/GetServiceSkillList?ServiceId=${contId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  GetRelatedMappingWareHouse(id:any): Observable<any> {
    ;
    return this.http.get(this.baseUri + `mappinglocation/GetRelatedMappingWareHouse?id=${id}`);
  }

  addeditServiceSKill(model: Skillmodel) {
    return this.http.post(this.baseUri + `workorder/SaveServiceSkill`, model);
  }
  addeditServiceCrewSKill(model: Skillmodel) {
    return this.http.post(this.baseUri + `workorder/SaveServiceCrewSkill`, model);
  }
  addeditServiceTerritory(model: ServiceTerritorymodel) {
    return this.http.post(this.baseUri + `workorder/SaveServiceTerritory`, model);
  }
  addeditServiceCrew(model: addeditServiceCrew) {
    return this.http.post(this.baseUri + `workorder/SaveServiceCrew`, model);
  }
  GetServiceCrewDll() {
    return this.http.get(this.baseUri+`serviceappointment/GetServiceCrewDll`);
  }
  GetEstimatedTravelTimeFromAndToSourceDll() {
    return this.http.get(this.baseUri+`serviceappointment/GetEstimatedTravelTimeFromAndToSourceDll`);
  }
  saveAssignedResource(assignedResources: addAssignedResourcesModel) {
    return this.http.post(this.baseUri + `serviceappointment/SaveAssignedResources`, assignedResources);
  }
  addeditServiceabcense(model: AbcenseModel) {
    return this.http.post(this.baseUri + `workorder/SaveServiceAbcense`, model);

  }
  addOrUpdateFiles(CompanySetUpModel: FormData) {

    return this.http.post(this.baseUri + `workorder/addOrUpdateFiles`, CompanySetUpModel);

  }
  GetZonesLocationsList(offset = 0, searchText = '') {
    return this.http.get(this.baseUri + `workorder/GetZonesLocationsList?offset=${offset}&searchText=${searchText}`);
  }
  GetSiteZonePriorityList(sortColumn, sortDir, pageNo, pageSize, primaryKey) {
    return this.http.get(this.baseUri + `workorder/GetSiteZonePriorityList?sortColumn=${sortColumn}&sortDir=${sortDir}&pageNo=${pageNo}&pageSize=${pageSize}&primaryKey=${primaryKey}`);
  }
  ManagetSiteSurveyZonePriority(siteSurveyModel: siteSurveyModel) {
    return this.http.post(this.baseUri + `workorder/ManagetSiteSurveyZonePriority`, siteSurveyModel);
  }

  

  GetSiteZonePriorityListForEdit(primaryKey) {
    return this.http.get(this.baseUri + `workorder/GetSiteZonePriorityListForEdit?primaryKey=${primaryKey}`);
  }
  
  
}
export class siteSurveyModel {
  id: number;
  FormJsonData: string;
  EditMode: boolean;
  constructor() {
    this.id = 0;
    this.FormJsonData = "";
    this.EditMode = false;
  }
}
export class resourceServiceJsonData {
  id: string;
  FormJsonData: string;
  moduleCode: string;
  subModuleCode: string;
  companyId: string;
  userId: string;
  constructor() {
    this.id = "";
    this.FormJsonData = "";
    this.moduleCode = "";
    this.subModuleCode = "";
    this.companyId = "";
    this.userId = "";
  }
}
export class Skillmodel {
  skillId: string;
  serviceResource: string;
  skill: string;
  skillLevel: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  constructor() {
    this.skillId = '';
    this.serviceResource = '';
    this.skill = '';
    this.skillLevel = '';
    this.startDate = '';
    this.startTime = '';
    this.endDate = '';
    this.endTime = '';
  }
}
export class ServiceTerritorymodel {
  territoryId: string;
  serviceResource: string;
  serviceTerritoryId: string;
  territoryType: string;
  address: string;
  country: string;
  addressDes: string;
  city: string;
  state: string;
  zipCode: string;
  operatingHours: string;
  startDate: string;
  endDate: string;
  constructor() {
    this.territoryId = '';
    this.serviceResource= '';
    this.serviceTerritoryId = '';
    this.territoryType = '';
    this.address = '';
    this.country = '';
    this.addressDes = '';
    this.city = '';
    this.state = '';
    this.zipCode = '';
    this.operatingHours = '';
    this.startDate = '';
    this.endDate = '';
    }
}

export class addeditServiceCrew {
  crewMemberId: string;
  serviceResource: string;
  serviceCrew: string;
  isLeader: boolean;
  startDate: string;
  endDate: string;

  constructor() {
    this.crewMemberId = '';
    this.serviceResource = '';
    this.serviceCrew = '';
    this.isLeader = false;
    this.startDate = '';
    this.endDate = '';
  }
}
export class addAssignedResourcesModel {
  Id: number;
  serviceAppointment: string;
  serviceResourceId: string;
  estimatedTravelTime: string;
  actualTravelTime: string;
  serviceCrewId: string;
  estimatedTravelTimeFromSourceId: string;
  approximateTravelDistanceForm: string;
  estimatedTravelTimeToSourceId: string;
  approximateTravelDistanceTo: string;
  lastUpdatedEpoch: string;
  approximateTravelTimeForm: string;
  isUpdatedByOptimization: string;
  calculatedDurationMinutes: string;
  isServiceResource: boolean;


  constructor() {
    this.serviceAppointment = '';
    this.serviceResourceId = '';
    this.estimatedTravelTime = '';
    this.actualTravelTime = '';
    this.serviceCrewId = '';
    this.estimatedTravelTimeFromSourceId = '';
    this.approximateTravelDistanceForm = '';
    this.estimatedTravelTimeToSourceId = '';
    this.approximateTravelDistanceTo = '';
    this.lastUpdatedEpoch = '';
    this.approximateTravelTimeForm = '';
    this.isUpdatedByOptimization = '';
    this.calculatedDurationMinutes = '';
    this.Id = 0;
    this.isServiceResource = false;
  }
}


export class AbcenseModel {
  id: string;
  recordType: string;
  serviceResource: string;
  type: string;
  startDate: string;
  endDate: string;
  description: string;

  ganttLabel: string;
  country: string;
  addressDes: string;
  city: string;
  state: string;
  zipCode: string;
  constructor() {
    this.id = '';;
    this.recordType = '';
    this.serviceResource = '';
    this.type = '';
    this.startDate = '';
    this.endDate = '';
    this.description = '';
    this.ganttLabel = '';
    this.country = '';
    this.addressDes = '';
    this.city = '';
    this.state = '';
    this.zipCode = '';
  }
}

export class ZonesList {
  id: string;
  priority: string;
  zone: string;
  constructor() {
    this.id = '',
    this.priority = '';
    this.zone = '';
  }
}

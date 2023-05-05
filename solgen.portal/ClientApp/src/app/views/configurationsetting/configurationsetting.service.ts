import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConfigurationsettingService {

  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  customFieldsList: any;
  company: any;
  StageFormFieldsList: any;
  constructor(private http: HttpClient) { }

  //GetConfigurationSettings(name: string, userType: string, sortColumn: string, sortDir, page: number, pageSize: number, loginuserid: string, custom_view_id: string, searchFilter: string, moduleName: string, submoduleName: string, companyId: number): Observable<any> {
  //  if (typeof name == "undefined" || name == null) { name = null; }
  //  else { name = encodeURIComponent((name)); }

  //  return this.http.get(`${this.baseUri}configurationsetting/GetConfigurationSettingList?nameSearch=${name}&userType=${userType}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${loginuserid}&custom_view_id=${custom_view_id}&searchFilter=${searchFilter}&moduleName=${moduleName}&submoduleName=${submoduleName}&companyId=${companyId}`)

  //  //return this.http.get(`${this.baseUri}Bank/GetLeadlist?name=${name}&userType=${userType}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}`)
  //  //  .pipe(
  //  //    map((response: any) => {
  //  //      this.pagedData = response;
  //  //      return true;
  //  //    })
  //  //  );
  //}

  GetConfigurationSettings(name: string, userType: string, sortColumn: string, sortDir, page: number, pageSize: number, loginuserid: string, custom_view_id: string, searchFilter: string, moduleName: string, submoduleName: string, companyId: number): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(this.baseUri + `ConfigurationSetting/GetConfigurationSettings?nameSearch=${name}&userType=${userType}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${loginuserid}&custom_view_id=${custom_view_id}&searchFilter=${searchFilter}&moduleName=${moduleName}&submoduleName=${submoduleName}&companyId=${companyId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  GetCustomFieldsList(modulename: any, submoduleName: any, companyId: any, displayCode:any) {
    return this.http.get(`${this.baseUri}vendor/GetCustomFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&displayCode=${displayCode}`)
      .pipe(
        map((response: any) => {
          this.customFieldsList = response;
          return true;
        })
      );
  }
  GetStageFormDetail(formId: any) {
    return this.http.get(this.baseUri + `ConfigurationSetting/GetStageFormDetail?formId=${formId}`)
      .pipe(
        map((response: any) => {
          // console.log('Serviceresponse', response)
          this.StageFormFieldsList = response;
          return true;
        })
      );
  }
  addOrUpdateManageStatus(manageStatusModel: ManageStatusModel) {
    return this.http.post(this.baseUri + `ConfigurationSetting/AddOrUpdateManageStatus`, manageStatusModel);

  }
  getManageStatusDetail(moduleId: any, submoduleName: any, field: any) {
    return this.http.get(this.baseUri + `ConfigurationSetting/GetManageStatusDetail?moduleId=${moduleId}&submoduleId=${submoduleName}&fieldId=${field}`);
  }

  GetDocumentsFromMaster() {
    return this.http.get(this.baseUri + `ConfigurationSetting/GetDocumentsFromMaster`);
  }

  AddUpdateDocumentsMaster(manageStatusModel: ManageStatusModel) {
    return this.http.post(this.baseUri + `ConfigurationSetting/AddUpdateDocumentsMaster`, manageStatusModel);

  }

  //GetModuleAndSubModuleData(moduleId: any, subModuleId: any, companyId: any) {
  //  return this.http.get(this.baseUri + `ConfigurationSetting/GetModuleAndSubModuleData?moduleId=${moduleId}&submoduleId=${subModuleId
  //    }&companyId=${companyId}`);
  //}
  GetModuleAndSubModuleData(moduleId: any, subModuleId: any, companyId: any): Observable<any> {
    return this.http.get(this.baseUri + `ConfigurationSetting/GetModuleAndSubModuleData?moduleId=${moduleId}&submoduleId=${subModuleId
      }&companyId=${companyId}`)
      .pipe(
        map((response: any) => {
          this.company = response;

        })
      );
    //return this.http.get(this.baseUri + `loanproduct/GetSolgenUser/`).pipe(
    //  map((response: any) => {
    //    this.company = response;

    //  })
    //);
  }
  // Start Configuration Lead Setting Section
  GetLeadConfigurationDetails(CompanyId: any): Observable<any> {
    return this.http.get(this.baseUri + `Common/GetLeadConfigurationDetails?CompanyId=${CompanyId}`);
  }

  GetStagePages(moduleid: any, submoduleid: any): Observable<any> {
    return this.http.get(this.baseUri + `ConfigurationSetting/GetStagePages?moduleId=${moduleid}&subModuleId=${submoduleid}`);
  }

  ManageLeadConfiguration(leadConfigurationModel: LeadConfigurationModel) {
    return this.http.post(this.baseUri + `Common/ManageLeadConfiguration`, leadConfigurationModel);
  } 
// End Configuration Lead Setting Section ManageLeadConfiguration


  //stage config
  savesubstageconfig(model: savesubstageModel) {

    return this.http.post(this.baseUri + `loan/savestages`, model);
  }

  saveSubstageConfigFromSolgen(model: savesubstageModel) {

    return this.http.post(this.baseUri + `loan/SaveStagesFromSolgen`, model);
  }

  AddStageForm(model: any) {

    return this.http.post(this.baseUri + `ConfigurationSetting/AddStageForm`, model);
  }
  getloansubstage(batchid:any,modeuleid:any,submoduleid:any) {
    return this.http.get(this.baseUri + `loan/getloansubstage?batchid=${batchid}&modeuleid=${modeuleid}&submoduleid=${submoduleid}`);
  }
  GetSubStageDll(): Observable<any> {
    return this.http.get(`${this.baseUri}loan/GetSubStageDll`)
  }

  getStagesList( sortColumn: string, sortDir: string, page: number, pageSize: number,moduleid:any,submoduleid:any): Observable<any> {
   
    return this.http.get(`${this.baseUri}ConfigurationSetting/getStagesList?nameSearch=${name}&SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}&moduleid=${moduleid}&submoduleid=${submoduleid}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  //end
}

export class savesubstageModel {
  batchid: number;
  stagedata: string;
  sequencemandatory: boolean;
  moduleId: number;
  subModuleId: number;

  constructor() {
    this.batchid = 0;
    this.subModuleId = 0;
    this.moduleId = 0;
    this.stagedata = '';
    this.sequencemandatory = false;   
  }
} 

export class ManageStatusModel {
  moduleId: string;
  subModuleId: string;
  controls: string;
  fieldsData: string;
  masterId: string;
  constructor() {
    this.moduleId = "";
    this.subModuleId = "";
    this.controls = "";
    this.fieldsData = "";
    this.masterId = "";
  }
}


export class Guarantor {
  masterId: any;
  description: string;
  chooseColor: string;
  status: string;
  isSystemGenerated: boolean;
  constructor() {
    this.status = null;
    this.description = "";
    this.status = "";
    this.masterId = "";
    this.isSystemGenerated = false;
  }
}

export class LeadConfigurationModel {
  Id: any;
  IsLoanapplication: boolean;
  IsOpportunity: boolean;
  IsAccount: boolean;
  IsContact: boolean;
  CompanyId: any;
  moduleWizard:string;
  constructor() {
    this.Id = null;
    this.IsLoanapplication = false;
    this.IsOpportunity = false;
    this.IsAccount = false;
    this.IsContact = false;
    this.CompanyId = null;
    this.moduleWizard = '';
  }
}


export class SubstageModel {
  fields: substage[];


}
export class substage {
  id: number;
  stagename: string;
  substageid: number;
  mandatory: boolean;
  duedays: number;
  pages: number;
  usertype: string;

}


export class stagepagelinks {
  id: number;
  values: string;
  constructor() {
    this.id = 0;
    this.values = "";
  }

}

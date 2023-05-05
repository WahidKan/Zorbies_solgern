import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServicesappointmentService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  editPage: any;
  customFieldsList: any;
  public objectdata: object[]= [];
  questionariesModel: Questionnaire = new Questionnaire();
  constructor(private http: HttpClient) { }
  GetServiceAppointmentList(nameSearch: string, sortColumn: string, page: number, pageSize: number, sortDir: string, loginuserid: string, moduleName: string, submoduleName: string, companyId: number, custom_view_id: string, searchFilter: string, form_type: string, displaydate: any, isDaySelected: any, searchColumn: string, isWeekSelected: any, isCheckboxTick: any, isExport: boolean,exportToatlSize:any): Observable<any>
  {
    if (typeof nameSearch == "undefined" || nameSearch == null) { nameSearch = null; }
    else {
      nameSearch = encodeURIComponent((nameSearch));
    }
    return this.http.get(`${this.baseUri}serviceappointment/GetServiceAppointmentList?nameSearch=${nameSearch}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${loginuserid}&moduleName=${moduleName}&submoduleName=${submoduleName}&companyId=${companyId}&custom_view_id=${custom_view_id}&searchFilter=${searchFilter}&form_type=${form_type}&displaydate=${displaydate}&isDaySelected=${isDaySelected}&searchColumn=${searchColumn}&isWeekSelected=${isWeekSelected}&isAllRecords=${isCheckboxTick}&isExport=${isExport}&exportToatlSize=${exportToatlSize}`)
  }
  GetServiceAppointmentDetails(id: any, moduleName: any, submoduleName: any, companyId: number, userId: string) {
    return this.http.get(this.baseUri + `serviceappointment/GetServiceAppointmentById?id=${id}&moduleName=${moduleName}&submoduleName=${submoduleName}`)
      .pipe(
        map((response: any) => {
          this.editPage = response;
          return true;
        })
      );
  }
  GetCustomFieldsList(modulename: any, submoduleName: any, companyId: any, Id: any, displayType: string) {
    return this.http.get(`${this.baseUri}vendor/GetCustomFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&PrimaryId=${Id}&displayCode=${displayType}`)
      .pipe(
        map((response: any) => {
          this.customFieldsList = response;
          return true;
        })
      );
  }
  addEditForm(serviceAppointmentJsonData: ServiceAppointmentJsonData) {
    return this.http.post(this.baseUri + `serviceappointment/AddEditServiceAppointment`, serviceAppointmentJsonData);
  }
  createDublicateServiceAppt(Id:any) {
    return this.http.get(this.baseUri + `serviceappointment/createDublicateServiceAppt?serviceApptId=${Id}`);
  }

  GeServiceAppointmentListing() {
    return this.http.get(`${this.baseUri}Common/GeServiceAppointmentListing`)
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
  GetAppointmentViewFileList(contId, sortColumn, sortDir, pageIndex, pageSize, modulename, submoduleName): Observable<any> {
    return this.http.get(this.baseUri + `workorder/GetServiceGetFileList?ServiceId=${contId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}&modulename=${modulename}&submoduleName=${submoduleName}`);
  }
  GetServiceResourceDll(id: any, length: any, serchText: string, departmentid:any=null) {
    return this.http.get(`${this.baseUri}serviceappointment/GetServiceResourceDll?id=${id}&length=${length}&serchText=${serchText}&departmentid=${departmentid}`);
  }

  addOrUpdateFiles(AppointmentSetUpModel: FormData) {
    return this.http.post(this.baseUri + `appointment/addOrUpdateFiles`, AppointmentSetUpModel);

  }
  GetServiceCrewDll(id: any, length: any, serchText: string) {
    return this.http.get(`${this.baseUri}serviceappointment/GetServiceCrewDll?id=${id}&length=${length}&serchText=${serchText}`);
  }
  GetEstimatedTravelTimeFromAndToSourceDll() {
    return this.http.get(`${this.baseUri}serviceappointment/GetEstimatedTravelTimeFromAndToSourceDll`);
  }
  saveAssignedResource(assignedResources: addAssignedResourcesModel) {

    return this.http.post(this.baseUri + `serviceappointment/SaveAssignedResources`, assignedResources);
  }
  SaveShuduleAppointAndResources(assignedResources: addAssignedResourcesModel) {
    return this.http.post(this.baseUri + `serviceappointment/SaveShuduleAppointAndResources`, assignedResources);
  }
  GetAssignedResourcesList(servicesappointmentid, sortColumn, page: number, sortDir, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `serviceappointment/GetAssignedResourcesList?servicesappointmentid=${servicesappointmentid}&sortColumn=${sortColumn}&pageIndex=${page}&sortDir=${sortDir}&pageSize=${pageSize}`);
  }
  GetServiceapoointDetails(Id:any) {
    return this.http.get(`${this.baseUri}serviceappointment/GetServiceapoointDetails?Id=${Id}`);
  }

  GetServiceAppointmentsForCalendar(condition: string, manageviewcond:any): Observable<any> {
    return this.http.get(`${this.baseUri}ServiceAppointment/GetServiceAppointmentsForCalendar?condition=${condition}&manageviewcond=${manageviewcond}`);
  }

  auditReviewData(Id: number) {
    return this.http.get(`${this.baseUri}serviceappointment/AuditReviewData?Id=${Id}`);
  }
  AttendanceData(Id: number) {
    return this.http.get(`${this.baseUri}serviceappointment/AttendanceData?Said=${Id}`);
  }

  auditChecklistDetail(checkList_Id:number,Id: number) {
    return this.http.get(`${this.baseUri}serviceappointment/AuditChecklistDetail?checkList_Id=${checkList_Id}&Id=${Id}`);
  }

  addEditAudit(serviceAppointmentJsonData: ServiceAppointmentJsonData) {

    return this.http.post(this.baseUri + `serviceappointment/addEditAudit`, serviceAppointmentJsonData);
  }
  saveAttendanceData(attendancedata: attendancedata) {

    return this.http.post(this.baseUri + `serviceappointment/saveAttendanceData`, attendancedata);
  }
  SaveQuestionariesGroups(QuestionariesGroup: any, CheckListId :string) {
     this.questionariesModel =  QuestionariesGroup;
     this.questionariesModel.checkListId = CheckListId;
    return this.http.post(this.baseUri + `serviceappointment/AddEditAuditCheckList`,this.questionariesModel );
  }
  GetCustomFieldsListBySubModuleCode(moduleCode: any, subModuleCode: any) {
    return this.http.get(`${this.baseUri}serviceappointment/GetCustomFieldBySubModuleNameCode?moduleCode=${moduleCode}&subModuleCode=${subModuleCode}`);
  }

  GetListingGridData(name: string, sortColumn: string, sortDir, page: number, pageSize: number): Observable<any> {
    if (typeof name == "undefined" || name == null)
    { name = null; }
    else
    { name = encodeURIComponent((name)); }

    return this.http.get(`${this.baseUri}serviceappointment/GetListingGridData?name=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}`)
  }

  deleteQuestionnaire(id: any) {
    return this.http.get(this.baseUri + `serviceappointment/DeleteQuestionnaire?Id=${id}`)
  }
  deleteQuestionnaires(Ids: string) {
    return this.http.get(this.baseUri + `serviceappointment/DeleteMultipleQuestionnaire?Ids=${Ids}`)
  }
  GetCheckListDetail(id: any) {
    return this.http.get(this.baseUri + `serviceappointment/GetCheckListDetail?Id=${id}`)
  }
  GetUnscheduledApptList(filterId: any = null, filtersearch:any=null) {
    return this.http.get(`${this.baseUri}serviceappointment/GetUnscheduledApptList?filterId=${filterId}&filtersearch=${filtersearch}`);
  }

  GetCrewResourceList(viewType: any, starttime: any = null, endTime: any = null, filterId: any = null) {
    if (viewType == 'Map Type View') {
      viewType = 'Resource Type View';
    }
    return this.http.get(`${this.baseUri}serviceappointment/GetCrewResourceList?viewType=${viewType}&starttime=${starttime}&endTime=${endTime}&filterId=${filterId}`);
  }
  GetCrewResourceCalenderList(viewType:any,cuurentdate: any, lastdate: any, isFirstTime: boolean = true,filters:any=null) {

    return this.http.get(`${this.baseUri}serviceappointment/GetCrewResourceCalenderList?viewType=${viewType}&cuurentdate=${cuurentdate}&lastdate=${lastdate}&isFirstTime=${isFirstTime}&filters=${filters}`).pipe(
      map((response: any) => {
        this.objectdata = JSON.parse(response);
        return true;
      })
    );
  }
  AddUpdateAssignedServiceAppointment(data: addupdateassignedResourceModel) {
    return this.http.post(this.baseUri + `serviceappointment/AddUpdateAssignedServiceAppointment`, data);

  }
  GetServiceCrewAndResourceDll(id: any, length: any, serchText: string, isCrew:any) {
    return this.http.get(`${this.baseUri}serviceappointment/GetServiceCrewAndResourceDll?id=${id}&length=${length}&serchText=${serchText}&isCrew=${isCrew}`);
  }



  GetChecklistAutoSaveintervalInSeconds() {
    return this.http.get(this.baseUri + `serviceappointment/GetChecklistAutoSaveintervalInSeconds`);
  }



  auditChecklistCheckBox(checkListId: number, serviceAppointmentId: number, checkBox: boolean) {
    return this.http.get(`${this.baseUri}serviceappointment/auditChecklistCheckBox?checkListId=${checkListId}&serviceAppointmentId=${serviceAppointmentId}&checkBox=${checkBox}`);
  }
  GetCrewListForGanttView(viewType: any = null, starttime: any = null, endtime: any = null, filterId: any = null) {
    return this.http.get(`${this.baseUri}serviceappointment/GetCrewListForGanttView?viewType=${viewType}&starttime=${starttime}&endtime=${endtime}&filterId=${filterId}`);
  }
  SaveGhantViewFilter(model: saveSa_Data) {
    return this.http.post(`${this.baseUri}serviceappointment/SaveGhantViewFilter`, model);
  }
  getGhantViewFilter() {
    return this.http.get(`${this.baseUri}serviceappointment/getGhantViewFilter`);
  }
  GetMapGhantviewData( starttime: any = null, endTime: any = null, filterId: any = null) {
    return this.http.get(`${this.baseUri}serviceappointment/GetMapGhantviewData?starttime=${starttime}&endTime=${endTime}&filterId=${filterId}`);
  }
  saveTimeZone(timezoneId:any) {
    return this.http.get(`${this.baseUri}serviceappointment/saveTimeZone?timezoneId=${timezoneId}`);
  }
  GetGhantViewTimeZone(teritoryid: any = null) {
    return this.http.get(`${this.baseUri}serviceappointment/GetGhantViewTimeZone?teritoryid=${teritoryid}`);
  }
  GetTimeZoneGhantView(id: any = null) {
    return this.http.get(`${this.baseUri}serviceappointment/GetTimeZoneGhantView?id=${id}`);
  }
  GetSchdeuleSaListOnAccountId(accountid: any, SANo:any) {
    return this.http.get(`${this.baseUri}serviceappointment/GetSchdeuleSaListOnAccountId?accountid=${accountid}&SANo=${SANo}`).pipe(
      map((response: any) => {
        this.pagedData = response;
        return true;
      })
    );
  
  }

  GetServiceAppointmentDetailById(id: string){
    debugger
    return this.http.get(`${this.baseUri}serviceappointment/GetWorkorderDetailById?id=${id}`);
  }
}
//export class JsonData {
//  Id: string;
//  FormJsonData: string;
//  moduleCode: string;
//  subModuleCode: string;
//  companyId: string;
//  userId: string;
//  constructor() {
//    this.Id = "";
//    this.FormJsonData = "";
//    this.moduleCode = "";
//    this.subModuleCode = "";
//    this.companyId = "";
//    this.userId = "";
//  }
//}
export class saveSa_Data {
  filterdata: string;
  Sa_viewtype: number;
  ghantviewtype: number;
  constructor() {
    this.filterdata = '';
    this.Sa_viewtype =0 ;
    this.ghantviewtype= 0;

  }
}

export class attendancedata {
  serviceappointmentid: number;
  jsondata: string;
  constructor() {
    this.serviceappointmentid = 0;
    this.jsondata = '';
  }
}

export class ServiceAppointmentJsonData {
  serviceAppointmentId: string;
  FormJsonData: string;
  moduleCode: string;
  subModuleCode: string;
  constructor() {
    this.serviceAppointmentId = "";
    this.FormJsonData = "";
    this.moduleCode = "";
    this.subModuleCode = "";
  }
}

export class CheckboxData {
  controlname: string;
  controlvalues: string;

  constructor() {
    this.controlname = "";
    this.controlvalues = "";
  }
}

export class addAssignedResourcesModel {
  Id: string;
  serviceAppointment: string;
  serviceResourceId: number;
  estimatedTravelTime: string;
  actualTravelTime: string;
  serviceCrewId: number;
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
    this.serviceResourceId = 0;
    this.estimatedTravelTime = '';
    this.actualTravelTime = '';
    this.serviceCrewId =0;
    this.estimatedTravelTimeFromSourceId = '';
    this.approximateTravelDistanceForm = '';
    this.estimatedTravelTimeToSourceId = '';
    this.approximateTravelDistanceTo = '';
    this.lastUpdatedEpoch = '';
    this.approximateTravelTimeForm = '';
    this.isUpdatedByOptimization = '';
    this.calculatedDurationMinutes = '';
    this.Id = '';
    this.isServiceResource = false;
  }
}

export class AssignSheduleAppointmentModel {
  Id: string;
  serviceAppointment: string;
  serviceResourceId: number;
  estimatedTravelTime: string;
  actualTravelTime: string;
  serviceCrewId: number;
  equipmentResourceId: number;
  estimatedTravelTimeFromSourceId: string;
  approximateTravelDistanceForm: string;
  estimatedTravelTimeToSourceId: string;
  approximateTravelDistanceTo: string;
  lastUpdatedEpoch: string;
  approximateTravelTimeForm: string;
  isUpdatedByOptimization: string;
  calculatedDurationMinutes: string;
  isServiceResource: boolean;

  description: string;
  accountId: string;
  statusId: string;
  subject: string;
  workType: string;
  WorkOrder: string;
  arrivalWindowStartTime: string;
  arrivalWindowEndTime: string;
  scheduledStartTime: string;
  scheduledEndTime: string;


  constructor() {
    this.serviceAppointment = '';
    this.serviceResourceId = 0;
    this.estimatedTravelTime = '';
    this.actualTravelTime = '';
    this.serviceCrewId = 0;
    this.estimatedTravelTimeFromSourceId = '';
    this.approximateTravelDistanceForm = '';
    this.estimatedTravelTimeToSourceId = '';
    this.approximateTravelDistanceTo = '';
    this.lastUpdatedEpoch = '';
    this.approximateTravelTimeForm = '';
    this.isUpdatedByOptimization = '';
    this.calculatedDurationMinutes = '';
    this.Id = '';
    this.isServiceResource = false;
   this. description = '';
   this. accountId = '';
   this. statusId = '';
   this. subject = '';
   this. workType = '';
   this. WorkOrder = '';
   this. arrivalWindowStartTime = '';
   this. arrivalWindowEndTime = '';
   this. scheduledStartTime = '';
   this. scheduledEndTime = '';
  }
}


export class AuditCheckListSubmitModel {
  comment: string;
  sectionId: string;
  questionId: string;
  isCorrect: string;
  serviceAppointmnentId:string
  constructor() {
    this.comment = "";
    this.sectionId = "";
    this.questionId = "";
    this.isCorrect = "";
    this.serviceAppointmnentId = "";
  }
}


export class questionaries {
  mainSection: mainSection[];
  checkListName: any;
  questionType: any;
  workTypeId: any;
  statusId: any;
  checkListId: any;
  constructor() {
    this.mainSection = [];
    this.checkListName = null;
    this.questionType = null;
    this.workTypeId = null;
    this.statusId = null;
    this.checkListId = null;
  }
}
//---------------- MNasir--------------------
export class Questionnaire {
  mainSection: mainSection[];
  checkListName: any;
  resourceType: any;
  workTypeId: any;
  statusId: any;
  questionType: any;
  checkListId: any;
  constructor() {
    this.mainSection = [];
    this.checkListName = null;
    this.resourceType = null;
    this.workTypeId = null;
    this.statusId = null;
    this.checkListId = null;
  }
}



export class addupdateassignedResourceModel {

  jsondata: any;
  viewtype: string;

  constructor() {

    this.jsondata = null;
    this.viewtype= null;
  }

}

export class mainSection {
  mainSubSection: mainSubSection[];
  SectionName: any;
  sectionId: any;
  sectionRef: number;
  statusId : string;
  sectionIndex : number;
  constructor() {
    this.mainSubSection = [];
    this.SectionName = null;
    this.sectionId = null;
    this.sectionId = null;
    this.statusId = '1010';
    this.sectionIndex = null;
  }

}
export class mainSubSection {
  sectionType: string;
  //-if section type if   question
  question:QuestionAns;
  //-if section type if   section
  subSectionName: string;
  mainSubSectionId: any;
  sectionId: string;
  display_order: number;
  sectionRef: number;
  mainSubSectionRef : number;
  statusId : string;
  SubSectionQuestionAns: QuestionAns[];
  constructor() {
    this.SubSectionQuestionAns = [];
    this.subSectionName = null;
    this.mainSubSectionId = null;
    this.sectionId = null;
    this.sectionRef = null;
    this.mainSubSectionId = null;
    this.statusId = '1010';
    this.question=new QuestionAns();

  }
}
export class QuestionAns {
  mainSubSectionRef: number;
  isDirty: any;
  form_field_id: any;
  sql_type: any;
  name: any;
  dt_code: any;
  display_name: any;
  class_name: any;
  display_order: any;
  actual_data_type: any;
  id: any;
  required: any;
  length: any;
  picklist_options: any;
  field_type: any;
  default_value: '';
  questionId: any;
  statusId : string;
  dependent_id:string;
  is_dependent:boolean;
  form_field_visibility:string;
  dependent_value : string;
  dependent_type : string;
  is_aync_with_object : boolean;
  is_sync_with_object_field_id : any;
  constructor() {
    this.mainSubSectionRef = null;
    this.isDirty = null;
    this.form_field_id=null;
    this.sql_type = null;
    this.name = null;
    this.display_name = null;
    this.dt_code = 'default';
    this.class_name = null;
    this.display_order = null;
    this.actual_data_type = null;
    this.id = null;
    this.required = null;
    this.length = null;
    this.picklist_options = null;
    this.field_type = null;
    this.default_value = null;
    this.questionId = null;
    this.statusId = '1010';
    this.dependent_id =  null;
    this.is_dependent = null;
    this.form_field_visibility =  null;
    this.dependent_value = null;
    this.dependent_type = null;
    this.is_aync_with_object = null;
    this.is_sync_with_object_field_id = null;
  }
}
//---------------- End --------------------



export class droped {
  //isDirty: any;
  form_field_id: any;
  sql_type: any;
  name: any;
  dt_code: any;
  display_name: any;
  class_name: any;
  display_order: any;
  actual_data_type: any;
  id: any;
  required: any;
  length: any;
  picklist_options: any;
  field_type: any;
  default_value: '';
  questionId: any;
  statusId : any;
  constructor() {
    //this.isDirty = null;
    this.form_field_id=null;
    this.sql_type = null;
    this.name = null;
    this.display_name = null;
    this.dt_code = null;
    this.class_name = null;
    this.display_order = null;
    this.actual_data_type = null;
    this.id = null;
    this.required = null;
    this.length = null;
    this.picklist_options = null;
    this.field_type = null;
    this.default_value = null;
    this.questionId = null;
    this.statusId = '1001';
  }
}



export class GroupControlQuestion {
  display_order: number;
  index: string;
  name: string;
  label: string;
  display_name: string;
  form_field_id: number;
  group_id: number;
  group_name: string;
  group_display_name: string;
  group_is_system_generated: boolean;
  data_type_id: number;
  data_type_name: string;
  code: string;
  sql_type: string;
  class_name: string;
  form_field_visibility: string;
  list_field_visibility: string;
  length: number;
  is_required: boolean;
  required: boolean;
  picklist_options: string;
  decimal_places: string;
  dt_code: string;
  table_name: string;
  ColumnName: string;
  value: string;
  select_value: string;
  validation_type: string;
  range_from: string;
  range_to: string;
  form_controlName: string;
  regular_expression: string;
  is_updated: number;
  is_inserted: number;
  is_include_in_post_jon: string;
  is_system_generated: boolean;
  group_display_order: number;
  layout_type: any;
  system_is_required: boolean;
  field_code: string; actual_data_type: string; selectlistvalues: [];
  dropdown_type: any;
  select_options: any;
  parent_id: any;
  dependent_type: any;
  dependent_show_type: number;
  is_email_template: number;
  user_guide: string;
  cultureDetails: string;
  field_mapping_id: number;
  formfield: boolean;
  id: number; is_readOnly: string;
  field_type: string;
  default_value: string;
  dependent_id: string;
  dependent_value: string;
  is_dependent: boolean;


  constructor() {
    this.display_order = 0; this.selectlistvalues = [];
    this.name = "";
    this.id = 0; this.is_readOnly = "";
    this.index = ""; this.actual_data_type = "";
    this.label = "";
    this.display_name = "";
    this.form_field_id = 0;
    this.group_id = 0;
    this.group_name = "";
    this.class_name = "";
    this.group_display_name = "";
    this.group_is_system_generated = false;
    this.data_type_id = 0;
    this.data_type_name = "";
    this.code = "";
    this.sql_type = "";
    this.form_field_visibility = "";
    this.list_field_visibility = "";
    this.length = 0;
    this.is_required = false;
    this.required = false;
    this.picklist_options = "";
    this.decimal_places = "";
    this.dt_code = "";
    this.table_name = "";
    this.ColumnName = "";
    this.value = "";
    this.select_value = "";
    this.validation_type = "";
    this.range_from = "";
    this.range_to = "";
    this.form_controlName = "";
    this.regular_expression = "";
    this.is_updated = 0;
    this.is_inserted = 0;
    this.is_include_in_post_jon = "";
    this.is_system_generated = false;
    this.group_display_order = 0;
    this.layout_type = "";
    this.system_is_required = false;
    this.field_code = "";
    this.dropdown_type = "";
    this.select_options = "";
    this.parent_id = "";
    this.dependent_type = "";
    this.dependent_show_type = 0;
    this.is_email_template = 0;
    this.user_guide = "";
    this.cultureDetails = "";
    this.field_mapping_id = 0;
    this.formfield = false;
    this.field_type = "";
    this.default_value = "";
    this.dependent_id = "";
    this.dependent_value = "";
    this.is_dependent = false;

  }
}


export enum ListingViews {
  Ghant = 'Gantt View',
  Calender = 'Calender View',
  Map = 'Map View',
  List = 'List View',
  
}

export class filterData {


  crewid: number;
  resourceid: number;
  departmentid: number;
  worktypeid: any;
  accountid: number;
  teritoryid: number;
  categoryid: number;
  warehouseid: any;
  sitesurveyZone: number;
  testAccount: boolean;

  constructor() {


    this.crewid=0;
    this.resourceid = 0;
    this.departmentid = 0;
    this.worktypeid = 0;
    this.accountid = 0;
    this.teritoryid = 0;
    this.categoryid = 0;
    this.warehouseid = 0;
    this.sitesurveyZone = 0;
    this.testAccount = false;
  }
}

export let blockData: Object[] = [
  { Id: 1, Subject: 'SA-10390', StartTime: new Date(2021, 4, 1, 10, 0), EndTime: new Date(2021, 4, 1, 12, 0), IsAllDay: true, IsBlock: false, EmployeeId: 1  },
  { Id: 10, Subject: 'SA-8552', StartTime: new Date(2021, 4, 2, 10, 0), EndTime: new Date(2021, 4, 2, 12, 0), IsAllDay: true, IsBlock: false,  EmployeeId: 4}
  , { Id: 11, Subject: 'SA-8552', StartTime: new Date(2021, 4, 3, 10, 0), EndTime: new Date(2021, 4, 3, 12, 0), IsAllDay: true, IsBlock: false,  EmployeeId: 5},
  { Id: 14, Subject: 'SA-10390', StartTime: new Date(2021, 4, 4, 10, 0), EndTime: new Date(2021, 4, 4, 12, 0), IsAllDay: true, IsBlock: false, EmployeeId: 4 }

  //{
  //  Id: 1,
  //  Subject: 'Not Available',
  //  StartTime: new Date(2018, 7, 1, 10, 0),
  //  EndTime: new Date(2018, 7, 1, 12, 0),
  //  IsAllDay: false,
  //  IsBlock: true,
  //  EmployeeId: 1
  //}, {
  //  Id: 2,
  //  Subject: 'Not Available',
  //  StartTime: new Date(2018, 7, 1, 16, 0),
  //  EndTime: new Date(2018, 7, 1, 20, 0),
  //  IsAllDay: false,
  //  IsBlock: true,
  //  EmployeeId: 2
  //}, {
  //  Id: 3,
  //  Subject: 'Not Available',
  //  StartTime: new Date(2018, 7, 1, 12, 0),
  //  EndTime: new Date(2018, 7, 1, 14, 0),
  //  IsAllDay: false,
  //  IsBlock: true,
  //  EmployeeId: 3
  //}, {
  //  Id: 4,
  //  Subject: 'Not Available',
  //  StartTime: new Date(2018, 7, 4, 11, 0),
  //  EndTime: new Date(2018, 7, 5, 10, 0),
  //  IsAllDay: true,
  //  IsBlock: true,
  //  EmployeeId: 4
  //}, {
  //  Id: 5,
  //  Subject: 'Not Available',
  //  StartTime: new Date(2018, 7, 10, 11, 0),
  //  EndTime: new Date(2018, 7, 12, 10, 0),
  //  IsAllDay: false,
  //  IsBlock: true,
  //  EmployeeId: 5
  //}, {
  //  Id: 6,
  //  Subject: 'Not Available',
  //  StartTime: new Date(2018, 7, 8),
  //  EndTime: new Date(2018, 7, 11),
  //  IsAllDay: false,
  //  IsBlock: true,
  //  EmployeeId: 6
  //}, {
  //  Id: 9,
  //  Subject: 'Client Meeting',
  //  StartTime: new Date(2018, 7, 3, 8, 0),
  //  EndTime: new Date(2018, 7, 3, 10, 30),
  //  IsAllDay: false,
  //  EmployeeId: 3
  //}, {
  //  Id: 10,
  //  Subject: 'Conference',
  //  StartTime: new Date(2018, 7, 2, 13, 30),
  //  EndTime: new Date(2018, 7, 2, 15, 0),
  //  IsAllDay: false,
  //  EmployeeId: 4
  //}, {
  //  Id: 11,
  //  Subject: 'Employee Recruitment',
  //  StartTime: new Date(2018, 7, 1, 10, 0),
  //  EndTime: new Date(2018, 7, 1, 13, 0),
  //  IsAllDay: false,
  //  EmployeeId: 5
  //}, {
  //  Id: 12,
  //  Subject: 'Data Analyzing',
  //  StartTime: new Date(2018, 7, 1, 15, 0),
  //  EndTime: new Date(2018, 7, 1, 17, 0),
  //  IsAllDay: false,
  //  EmployeeId: 6
  //}, {
  //  Id: 13,
  //  Subject: 'Content Writting',
  //  StartTime: new Date(2018, 7, 2, 14, 0),
  //  EndTime: new Date(2018, 7, 2, 16, 0),
  //  IsAllDay: false,
  //  EmployeeId: 1
  //}, {
  //  Id: 14,
  //  Subject: 'Meeting',
  //  StartTime: new Date(2018, 7, 1, 9, 0),
  //  EndTime: new Date(2018, 7, 1, 11, 0),
  //  IsAllDay: false,
  //  EmployeeId: 4
  //}, {
  //  Id: 15,
  //  Subject: 'Not Available',
  //  StartTime: new Date(2018, 7, 29, 11, 0),
  //  EndTime: new Date(2018, 7, 31, 10, 0),
  //  IsAllDay: false,
  //  IsBlock: true,
  //  EmployeeId: 4
  //}, {
  //  Id: 16,
  //  Subject: 'Not Available',
  //  StartTime: new Date(2018, 7, 12),
  //  EndTime: new Date(2018, 7, 15),
  //  IsAllDay: false,
  //  IsBlock: true,
  //  EmployeeId: 3
  //}
];

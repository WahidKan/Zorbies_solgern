import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { strategy } from '@angular-devkit/core/src/experimental/jobs';
import { FormArray, FormBuilder, RequiredValidator, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomLayoutService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  customFieldsList: any;
  customFieldsListData: any;
  editPage: any;
  constructor(private http: HttpClient, private fb: FormBuilder) { }

  SaveUserDefinedCustomField(viewId:any, userDefinedControl: any){
    let url = `${this.baseUri}common/SaveUserDefinedCustomField`;
    return this.http.post(url,{'userDefinedControl': JSON.stringify(userDefinedControl),'viewId': viewId})
  }

  GetLayoutList(name: string, sortColumn: string, sortDir: string, page: number, pageSize: number, userId: string, modulecode: number): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.baseUri}layout/GetLayoutList?nameSearch=${name}&SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}&userId=${userId}&modulecode=${modulecode}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  GetCustomFieldsList(modulename: any, submoduleName: any, companyId: any) {
    return this.http.get(`${this.baseUri}vendor/GetLayoutCustomFieldByModuleNameAndSubModule?moduleName=${modulename}&subModuleName=${submoduleName}&companyId=${companyId}`)
      .pipe(
        map((response: any) => {
          this.customFieldsList = response;
          return true;
        })
      );
  }

  GetCustomFieldsData(viewId: any, companyId: any) {

    return this.http.get(`${this.baseUri}common/GetCustomFieldsData?viewId=${viewId}&companyId=${companyId}`)
      .pipe(
        map((response: any) => {
          this.customFieldsListData = response;
          return true;
        })
      );
  }


  GetModulesNameList(module_id: any) {
    return this.http.get(`${this.baseUri}common/GetModulesNameList?module_id=${module_id}`)
      .pipe(
        map((response: any) => {
          this.customFieldsList = response;
          return true;
        })
      );
  }

  saveLayoutType(layoutControlModel: LayoutForm) {
    let url = `${this.baseUri}common/saveLayoutType`;
    return this.http.post(url, layoutControlModel);
  }

  saveLayoutRoles(JsonData: JsonData) {
    return this.http.post(this.baseUri + `role/saveLayoutRoles`, JsonData);
  }

  checkRoleNameExist(JsonData: JsonData) {
    return this.http.post(`${this.baseUri}role/CheckLayoutRolesExist`, JsonData);
  }


  SaveLAyourData(formSControlModel: Group[], moduleid: any, submoduleid: any) {
    let url = `${this.baseUri}layout/SaveFormControls?modulecode=${moduleid}&submodulecode=${submoduleid}`;
    return this.http.post(url, formSControlModel);
  }

  SaveCustomLayoutData(model: ManageCustomLayoutModel) {
    let url = `${this.baseUri}common/SaveCustomLayoutData`;
    return this.http.post(url, model);
  }



  GetSubModulesNameList(page: number, pageSize: number, userId: string, modulecode: number, submodulecode: number, deviceType: string, layoutType: string, sortDir: string, sortColumn: string, filterText: string): Observable<any> {
    return this.http.get(`${this.baseUri}common/GetSubModulesNameList?PageNo=${page}&PageSize=${pageSize}&modulecode=${modulecode}&submodulecode=${submodulecode}&deviceType=${deviceType}&layoutType=${layoutType}&sortDir=${sortDir}&sortColumn=${sortColumn}&filterText=${filterText}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  getSubModuleListByModuleId(moduleId: any): Observable<any> {
    return this.http.get(this.baseUri + `layout/GetModuleSubModuleByCompany?moduleId=${moduleId}`);
  }


  DeleteRecords(deleteId: any, tableName: any,) {
    return this.http.get(this.baseUri + `common/DeleteRecords?primaryKey=${deleteId}&tableName=${tableName}`)
      .pipe(
        map((response: any) => {
          this.editPage = response;
          return true;
        })
      );
  }
  UpdateCustomLayoutDefaultStatus(model: updateDefaultStatus) {
    // console.log("mnodel", model);
    let url = `${this.baseUri}layout/UpdateCustomLayoutDefaultStatus`;
    return this.http.post(url, model);
  }

  isFlowExistInLayout(flowId: any, automationFlowName: any, customViewId: any){
    return this.http.get(this.baseUri+ `layout/isFlowExistInLayout?flowId=${flowId}&automationFlowName=${automationFlowName}&customViewId=${customViewId}`)
  }


  BuildFlowRecordComponent(data = null) {

    let flow = this.fb.group({
      id: [null],
      flowName: [null,[Validators.required]],
      flowlayoutType: [null],
      statusId: [1001],
      visibilityCondition : [1],
      filterConditions: this.fb.array([this.BuildflowFilterConditions()]),

    });
    if (data) {
        flow.patchValue({
          id: data.id,
          flowName: Number(data.automationFlowId),
          flowlayoutType: data.flowlayoutType,
          visibilityCondition: Number(data.visibilityCondition),
        //  filterCondition: data.filterCondition ? Number(data.filterCondition) : null,
        });
        while ((flow.get('filterConditions') as FormArray).length != 0) {
          (flow.get('filterConditions') as FormArray).removeAt(0);
        }
        if (data.filterConditions) {
          data.filterConditions.forEach((filterConditions: any) => {
            (flow.get('filterConditions') as FormArray).push(this.BuildflowFilterConditions(filterConditions));
          });
        }
    }
    return flow;
  }
  BuildflowFilterConditions(data = null) {
    let filter = this.fb.group({
      id: [null],
      field: [null],
      operator: [null],
      value: [null],
      statusId: [1001]
    });
    if (data) {

      filter.patchValue({
        id: data.id,
        field:data.field? Number(data.field) : null,
        operator: data.operator,
        value: data.value,
      });
    }
    return filter;
  }

}
export class Container1 {
  constructor(public id: number, public name: string, public widgets: Array<Widget>) { }
}

export class Widget {
  constructor(public name: string) { }
}

export class GroupControls1 {
  constructor(public name: string, public groupName: string, public type: string, public classname: string, public order: number, public datatype: string, public id: number, public required: boolean, public length: string, public index: string, public system_is_required: boolean) { }
}

export class Group {
  constructor(
    public id: number, public group_id: number, public group_name: string, public group_display_name: string, public group_layout_type: string, public layout_type: string,
    public table_name: string,
    public is_inserted: number,
    public is_updated: number,
    public display_order: number,
    public visibility_condition: string,
    public visibility_condition_label: string,
    public default_value: string,
    public controls: Array<GroupControls>

  ) { }
}






export class LayoutControlModel {
  id: number;
  group_id: number; group_name: string; group_display_name: string;
  is_inserted: number; is_updated: number; display_order: number;
  controls: Array<GroupControls>[];
  constructor() {
    this.id = 0;
    this.controls = [];
  }
}

export class GroupControls {
  display_order: number;
  index: string;
  name: string;
  label: string;
  display_name: string;
  custom_field_id: number;
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
  has_dependent: number;
  is_email_template: number;
  user_guide: string;
  cultureDetails: string;
  field_mapping_id: number;
  customfield: boolean;
  id: number; is_readOnly: string;

  constructor() {
    this.display_order = 0; this.selectlistvalues = [];
    this.name = "";
    this.id = 0; this.is_readOnly = "";
    this.index = ""; this.actual_data_type = "";
    this.label = "";
    this.display_name = "";
    this.custom_field_id = 0;
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
    this.has_dependent = 0;
    this.is_email_template = 0;
    this.user_guide = "";
    this.cultureDetails = "";
    this.field_mapping_id = 0;
    this.customfield = false;
  }
}

export class SelectListArray {
  id: number;
  value: string;
  name: string;
  color: string;
  isinserted: number;
  constructor() {
    this.id = 0;
    this.value = "";
    this.name = "";
    this.color = "";
    this.isinserted = 0;
  }
}

export class LayoutForm {
  displayName: string;
  layoutName: string;
  moduleid: string;
  submoduleid: string;
  layoutNameDesc: string;
  deviceid: string;
  layoutTypeid: string;
  constructor() {
    this.displayName = '';
    this.layoutName = '';
    this.moduleid = '';
    this.submoduleid = '';
    this.layoutNameDesc = '';
    this.deviceid = '';
    this.layoutTypeid = '';
  }
}
export class JsonData {
  Id: string;
  FormJsonData: string;
  moduleCode: string;
  subModuleCode: string;
  companyId: string;
  userId: string;
  constructor() {
    this.Id = "";
    this.FormJsonData = "";
    this.moduleCode = "";
    this.subModuleCode = "";
    this.companyId = "";
    this.userId = "";
  }
}
export class dataRelated {
  object_related_id: number;
  custom_view_id: string;
  view_name: string;
  related_code: string;
  groups: Group[];
  visibility_condition: string;
  visibility_condition_label: string;
  default_value: string;
  constructor() {
    this.object_related_id = 0;
    this.custom_view_id = "";
    this.view_name = "";
    this.related_code = "";
    this.groups = [];
    this.visibility_condition = "";
    this.visibility_condition_label = "";
    this.default_value = "";
  }
}
export class ManageCustomLayoutModel {
  group: Group[];
  relation: string;
  view: string;
  flowAutomation: string;
  constructor() {
    this.group = [];
    this.relation = "";
    this.view = "";
    this.flowAutomation = "";
  }
}

export class fieldsJson {
  dt_code: string;
  column_name: string;
  column_display_name: string;
  operator: string;
  operatorId: string;
  display_value: string;
  value: string;
  second_value: string;
  extended_operator: string;
  constructor() {
    this.dt_code = "";
    this.column_name = "";
    this.column_display_name = "";
    this.operator = "";
    this.operatorId = "";
    this.display_value = "";
    this.value = "";
    this.second_value = "";
    this.extended_operator = "";
  }
}

export class updateDefaultStatus {
  sub_module_id: number;
  device_type: string;
  layout_type: string;
  custom_view_id: number;
  is_remove_role : boolean;
  constructor() {
    this.sub_module_id = 0;
    this.device_type = "";
    this.layout_type = "";
    this.custom_view_id = 0;
    this.is_remove_role = false;
  }
}

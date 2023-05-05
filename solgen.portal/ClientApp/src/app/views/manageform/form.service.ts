import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  customFieldsList: any = "";
  constructor(private http: HttpClient) { }
  GetFormList(name: string, sortColumn: string, sortDir: string, page: number, pageSize: number, userId: string, moduleId: string, subModuleId: string): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.baseUri}layout/GetFormList?nameSearch=${name}&SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}&userId=${userId}&moduleId=${moduleId}&subModuleId=${subModuleId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  GetFormList_finance(name: string, sortColumn: string, sortDir: string, page: number, pageSize: number, userId: string, moduleId: string, subModuleId: string): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.baseUri}layout/GetFormList_finance?nameSearch=${name}&SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  GetFormFieldsList(modulename: any, submoduleName: any, formMasterId, companyId: any) {
    return this.http.get(`${this.baseUri}vendor/GetLayoutFormFieldByModuleNameAndSubModule?moduleName=${modulename}&subModuleName=${submoduleName}&formMasterId=${formMasterId}&companyId=${companyId}`)
      .pipe(
        map((response: any) => {
          this.customFieldsList = response;
          return true;
        })
      );
  }
  getModuleList(): Observable<any> {
    return this.http.get(this.baseUri + `layout/GetModuleSubModuleByCompany?moduleId=0`);
  }getFinanceModuleList(): Observable<any> {
    return this.http.get(this.baseUri + `layout/GetfinanceModuleSubModuleByCompany?moduleId=0`);
  }
  getSubModuleListByModuleId(moduleId: any): Observable<any> {
    return this.http.get(this.baseUri + `layout/GetModuleSubModuleByCompany?moduleId=${moduleId}`);
  }
  GetfinanceModuleSubModuleByCompany(moduleId: any): Observable<any> {
    return this.http.get(this.baseUri + `layout/GetfinanceModuleSubModuleByCompany?moduleId=${moduleId}`);
  }

  GetFormEditData(formMasterId: any): Observable<any> {
    return this.http.get(this.baseUri + `layout/GetFormEditData?formMasterId=${formMasterId}`);
  }


  DeleteRecords(deleteId: any, tableName: any, loggedInId: any) {
    return this.http.get(this.baseUri + `common/DeleteRecords?primaryKey=${deleteId}&tableName=tblform_master&deletedBy=${loggedInId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  deleteForm(module, submdoule, formMasterId): Observable<any> {
    return this.http.get(this.baseUri + `layout/deleteForm?module=${module}&submodule=${submdoule}&formMasterId=${formMasterId}`);
  }
  deleteFormMultiple(formMasterId): Observable<any> {
    return this.http.get(this.baseUri + `layout/deleteFormMultiple?deleteFormIds=${formMasterId}`);
  }

  SaveLAyourData(formSControlModel: Group[], moduleid: any, submoduleid: any, formMasterId) {
    debugger;
    let url = `${this.baseUri}layout/SaveFormControls?modulecode=${moduleid}&submodulecode=${submoduleid}&formMasterId=${formMasterId}`;
    return this.http.post(url, formSControlModel);
  }

  saveNewSubModule(GroupAddFormModel: GroupAddForm, loginuserid: any, companyId: any) {
    let url = `${this.baseUri}layout/SaveNewSubModule?userid=${loginuserid}&companyId=${companyId}`;
    return this.http.post(url, GroupAddFormModel);
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
  constructor(public id: number, public group_id: number, public group_name: string, public group_display_name: string, public group_layout_type: string, public table_name: string,
    public is_inserted: number, public is_updated: number, public display_order: number, public controls: Array<GroupControls>) { }
}

export class GroupAddForm {
  moduleName: string;
  moduleId: string;
  subModuleId: string;
  Id: string;
  constructor() {
    this.moduleName = '';
    this.moduleId = '';
    this.subModuleId = '';
    this.Id = '';
  }
}


export class FormControlModel {
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
  form_field_id: number;
  customFieldId:number;
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
  field_code: string; actual_data_type: string;
  selectlistvalues: any;
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
  is_aync_with_object: boolean;
  is_sync_with_object_field_id: any;
  is_edit_prog: boolean;
  PrimaryTableColumn: string;

  constructor() {
    this.display_order = 0; this.selectlistvalues = [];
    this.name = "";
    this.PrimaryTableColumn = "";
    this.id = 0; this.is_readOnly = "";
    this.index = ""; this.actual_data_type = "";
    this.label = "";
    this.display_name = "";
    this.form_field_id = 0;
    this.customFieldId=0;
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
    this.is_aync_with_object = null;
    this.is_sync_with_object_field_id = null;
  }
}

export class SelectListArray {
  id: number;
  value: string;
  color: string;
  isinserted: number;
  constructor() {
    this.id = 0;
    this.value = "";
    this.color = "";
    this.isinserted = 0;
  }
}

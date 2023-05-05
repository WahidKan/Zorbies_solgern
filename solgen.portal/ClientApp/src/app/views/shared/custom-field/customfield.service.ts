import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class CustomFieldService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  customFieldsList: any;
  customFieldsLeadList: any;
  editPage: any;
  leadEditPage: any;
  constructor(private http: HttpClient) { }

  toFormGroup(questions: CustomFormBase<string>[]) {
    const group: any = {};
    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
  GetManageViewCustomFieldsLeadList(fieldlistFilter:any ,modulename: any, submoduleName: any, companyId: any, controlname: any, sortable: any) {
    return this.http.get(`${this.baseUri}vendor/GetManageViewCustomFieldsList?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&controlName=${controlname}&sortable=${sortable}&fieldlistFilter=${fieldlistFilter}`)
      .pipe(
        map((response: any) => {
          this.customFieldsLeadList = response;
          return true;
        })
      );
  }
  GetCustomFieldsList(modulename: any, submoduleName: any, companyId: any) {
    return this.http.get(`${this.baseUri}vendor/GetCustomFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}`)
      .pipe(
        map((response: any) => {
          this.customFieldsList = response;
          return true;
        })
      );
  }

  GetCustomFieldsListDisplay(modulename: any, submoduleName: any, companyId: any, displayCode: any, isRef:any) {
    return this.http.get(`${this.baseUri}vendor/GetCustomFieldsManage?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&displayCode=${displayCode}&isRef=${isRef}`)
      .pipe(
        map((response: any) => {
          this.customFieldsList = response;
          return true;
        })
      );
  }




  GetCustomFieldsLeadList(modulename: any, submoduleName: any, companyId: any, controlname: any, sortable: any) {
    return this.http.get(`${this.baseUri}vendor/GetCustomFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&controlName=${controlname}&sortable=${sortable}`)
      .pipe(
        map((response: any) => {
          this.customFieldsLeadList = response;
          return true;
        })
      );
  }
  addEditForm(formjson: string, departmentId: string) {
    //let Records = JSON.stringify(vendorModel);

    return this.http.post(this.baseUri + `common/AddDataFormJsonFormat/${departmentId}`, formjson);
  }

  GetDepartmentDetails(id: any) {
    return this.http.get(this.baseUri + `common/GetDepartmentsById?id=${id}`)
      .pipe(
        map((response: any) => {
          //// // console.log("responseService12", response);
          this.editPage = response;
          return true;
        })
      );
  }
  GetLeadsDetails(id: any) {
    return this.http.get(this.baseUri + `common/GetLeadsById?id=${id}`)
      .pipe(
        map((response: any) => {
          //// // console.log("responseService12", response);
          this.leadEditPage = response;
          return true;
        })
      );
  }
}

export class CustomFormBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  options: { key: string, value: string }[];

  constructor(options: {
    value?: T;
    key?: string;
    label?: string;
    required?: boolean;
    order?: number;
    controlType?: string;
    type?: string; 
    options?: { key: string, value: string }[];
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
  }
}
export class DropdownQuestion extends CustomFormBase<string> {
  controlType = 'dropdown';
}
export class TextboxQuestion extends CustomFormBase<string> {
  controlType = 'textbox';
}

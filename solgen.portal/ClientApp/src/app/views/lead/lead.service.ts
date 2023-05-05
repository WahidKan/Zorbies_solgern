import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TextboxQuestion, CustomFormBase, DropdownQuestion} from '../shared/custom-field/customfield.service';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  customFieldsList: any;
  leadEditPage: any;
  constructor(private http: HttpClient) { }


  getFormCustomFields1() {
    return this.http.get(this.baseUri + `UserProfile/GetCustomFieldsData`);
  }

  getFormCustomFields() {



    const questions: CustomFormBase<string>[] = [
      new DropdownQuestion({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' }
        ],
        order: 4
      }),

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1
      }),
      new TextboxQuestion({
        key: 'lastname',
        label: 'Last Name',
        value: 'Deepak',
        required: true,
        order: 3
      }),
      new TextboxQuestion({
        key: 'RoleNo',
        label: 'Role Number',
        value: 'Deepak',
        required: true,
        order: 3
      }),
      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];

    return of(questions.sort((a, b) => a.order - b.order));

  }

  GetCustomFieldsList(modulename: any, submoduleName: any, companyId: any, leadId: any, displayType: string) {
    return this.http.get(`${this.baseUri}vendor/GetCustomFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&PrimaryId=${leadId}&displayCode=${displayType}`)
      .pipe(
        map((response: any) => {
          this.customFieldsList = response;
          return true;
        })
      );
  }

  GetLeadsDetails(id: any, moduleName: any, submoduleName: any, companyId: number, userId: string) {
    return this.http.get(this.baseUri + `common/GetLeadsById?id=${id}&moduleName=${moduleName}&submoduleName=${submoduleName}`)
      .pipe(
        map((response: any) => {
          this.leadEditPage = response;
          return true;
        })
      );
  }
  addEditForm(LeadJsonData: LeadJsonData) {
    return this.http.post(this.baseUri + `Lease/AddEditLead`, LeadJsonData);
  }
  callSalesForceApi(ref_code: any) {
    return this.http.get("http://45.35.44.173:8080/"+`Scheduledtask/Home/UpdateByID?Id=${ref_code}`)
  }

  DeleteRecords(deleteId: any, tableName: any, ) {
    return this.http.get(this.baseUri + `common/DeleteRecords?primaryKey=${deleteId}&tableName=${tableName}`)
      .pipe(
        map((response: any) => {
          this.leadEditPage = response;
          return true;
        })
      );
  }

  GetAppointmentViewFileList(contId,categoryId, sortColumn, sortDir, pageIndex, pageSize, modulename, submoduleName): Observable<any> {
    return this.http.get(this.baseUri + `workorder/GetServiceGetFileList?ServiceId=${contId}&categoryId=${categoryId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}&modulename=${modulename}&submoduleName=${submoduleName}`);
  }
  addOrUpdateFiles(AppointmentSetUpModel: FormData) {
    return this.http.post(this.baseUri + `workorder/addOrUpdateFiles`, AppointmentSetUpModel);

  }

  CheckEmailNotExistInOthersTypeAccount(email: string) {
    return this.http.get(`${this.baseUri}lead/CheckEmailNotExistInOthersTypeAccount?email=${email}`)
  }

  getType(SearchText: any,length: any,ID:any,Type:string): Observable<any> {  
    return this.http.get(this.baseUri + `opportunity/GetTypeOnBaseType?SerchText=${SearchText}&length=${length}&ID=${ID}&Type=${Type}`);
  }
}

export class LeadJsonData {
  leadId: string;
  FormJsonData: string;
  moduleCode: string;
  subModuleCode: string;
  companyId: string;
  userId: string;
  permission: string;
  constructor() {
    this.leadId = "";
    this.FormJsonData = "";
    this.moduleCode = "";
    this.subModuleCode = "";
    this.companyId = "";
    this.userId = "";
    this.permission = "";
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

import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';

@Injectable({
  providedIn: 'root'
})
export class EmailTemplateService {
  public emailTemplateUri = `${environment.WebApiBaseUrl}EmailTemplate`;
  public baseUri = `${environment.WebApiBaseUrl}`;
  emailTemplates: EmailTemplate[] = [];
  pagedData: any;
  customFieldsList: any;

  constructor(private http: HttpClient,
    private commonService: CommonService) {
  }
  getEmailTemplates(): Observable<boolean> {
    return this.http.get(this.emailTemplateUri)
      .pipe(
        map((response: any) => {
          this.emailTemplates = response;
          return true;
        })
      );
  }

  getEmailTemplatesList(emailTemplateName: string, sortColumn: string, sortDir, page: number, pageSize: number, userId: string): Observable<any> {
    return this.http.get(`${this.emailTemplateUri}/GetList?emailTemplateName=${emailTemplateName}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      ); 
  }

  getEmailTemplateById(id: string): Observable<EmailTemplate> {
    if (id === null) {
      return of(this.initializeEmailTemplate());
    }
    return this.http.get<EmailTemplate>(`${this.emailTemplateUri}/${id}`);
  }

  deleteEmailTemplate(id: any) {
    const url = `${this.emailTemplateUri}/${id}`;
    return this.http.delete(url);
  }

  saveEmailTemplate(emailTemplate: EmailTemplate) {
    return this.http.post(this.emailTemplateUri, emailTemplate);
  }
  GetCustomFieldsList(modulename: any, submoduleName: any, companyId: any, PrimaryId: any) {
    return this.http.get(`${this.baseUri}vendor/GetCustomFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&PrimaryId=${PrimaryId}`)
      .pipe(
        map((response: any) => {
          this.customFieldsList = response;
          return true;
        })
      );
  }
  GetCustomFormFieldList(modulename: any, submoduleName: any, companyId: any, Id: any) {
    return this.http.get(`${this.baseUri}WebMerge/GetFormFields`)
        .pipe(
          map((response: any) => {
            this.customFieldsList = response;
            return true;
          })
        );
    //return this.http.get(`${this.baseUri}controller/GetFormFields`).pipe(
    //    map((response: any) => {
    //      this.customFieldsList = response;
    //      return true;
    //    })
    //);
  }
  changeStatus(id: string) {
    return this.http.post(`${this.emailTemplateUri}/ChangeStatus/${id}`, null);
  }

  // Default email template value initializer
  private initializeEmailTemplate(): EmailTemplate {
    // Return an initialized object
    return {
      emailTemplateId: null,
      emailTemplateName: null,
      emailTemplateSubject: null,
      template: null,
      emailTemplateStatusId: null,
      emailTemplateUserType: null,
      emailTemplateCreatedOn: null,
      emailTemplateCreatedBy: null,
      emailTemplateModifiedBy: null,
      emailTemplateModifiedOn: null,
      userName: null,
      enabled: false,
      IsActive: false,
      userId: null,
      emailTemplateIsDeleted: false,
      emailTemplateIsDefault: false,
      selectedValue: null,
      selectedSubModuleValue: null,
      moduleName: null,
      subModuleName: null
    }
    };
}

export class EmailTemplate {
  emailTemplateId: string;
  emailTemplateName: string;
  emailTemplateSubject: string;
  template: string;
  emailTemplateStatusId: string;
  emailTemplateUserType?: any;
  userName: string;
  emailTemplateCreatedOn: string;
  emailTemplateCreatedBy?: any;
  emailTemplateModifiedBy?: any;
  emailTemplateModifiedOn?: any;
  userId: any;
  enabled?: boolean;
  IsActive: boolean;
  emailTemplateIsDeleted: boolean;
  emailTemplateIsDefault: boolean;
  selectedValue: string;
  selectedSubModuleValue: string;
  moduleName: string;
  subModuleName: string;


  constructor() {
    this.emailTemplateId = '';
    this.emailTemplateName = '';
    this.template = '';
    this.emailTemplateSubject = '';
    this.emailTemplateStatusId = null;
    this.emailTemplateUserType = '';
    this.emailTemplateCreatedOn = '';
    this.emailTemplateCreatedBy = '';
    this.emailTemplateModifiedBy = '';
    this.emailTemplateModifiedOn = '';
    this.userName = '';
    this.enabled = true;
    this.IsActive = false;
    this.userId = '';
    this.emailTemplateIsDeleted = false;
    this.emailTemplateIsDefault = false;
    this.selectedValue = '';
    this.selectedSubModuleValue = '';
    this.moduleName = '';
    this.subModuleName = '';
  }
}

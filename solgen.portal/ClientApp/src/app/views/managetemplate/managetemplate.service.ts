import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { environment } from '../../../environments/environment';
import { map, debounce } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagetemplateService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  constructor(private http: HttpClient, private commonService: CommonService) { }

  //function used to fatch Lease Template List
  getManageLeaseTemplateList(searchText: any, sortColumn: string, sortDir, pageIndex: number, pageSize: number, userId: string) {
    return this.http.get(this.baseUri + `Lease/GetManageLeaseTemplateList?searchText=${searchText}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  getManageTemplateById(id: string) {
    if (id === null) {
      return of(this.InitializeManageTemplate());
    }
    return this.http.get(`${this.baseUri}Lease/GetManageLeaseTemplateById?id=${id}`);
  }

  UpdateManageTemplate(manageTemplateModel: ManageTemplate) {
    return this.http.post(this.baseUri + `Lease/AddEditManageTemplate`, manageTemplateModel);
  }

  changeStatus(id: string) {
    return this.http.post(this.baseUri + `Lease/ChangeStatus/${id}`, null);
  }

  deleteLeaseTemplatebyId(id) {
    return this.http.get(`${this.baseUri}Lease/DeleteLeaseTemplatebyId?id=${id}`);
  }
  
  private InitializeManageTemplate(): ManageTemplate {
    return {
      templateId: null,
      templateName: null,
      templateContent: null,  
      templateCreatedOn: null,
      templateCreatedBy: null,
      templateModifiedOn: null,
      templateModifiedBy: null,
      templateIsDeleted: null,
      templateIsActive: null,
      statusId :null,
      enabled: false,
      userId: null,
      IsActive: false
    }
  }
}

export class ManageTemplate {
  templateId: string;
  templateName: string;
  templateContent: string;
  templateCreatedOn: string;
  templateCreatedBy: string;
  templateModifiedOn: string;
  templateModifiedBy: string;
  templateIsDeleted: string;
  templateIsActive: string;
  userId: any;
  statusId: any;
  enabled?: boolean;
  IsActive: boolean;
  constructor() {
    this.templateId = '';
    this.templateName = '';
    this.templateContent = '';
    this.templateCreatedOn = '';
    this.templateCreatedBy = '';
    this.templateModifiedOn = '';
    this.templateModifiedBy = '';
    this.templateIsActive = '';
    this.enabled = true;
    this.statusId=null;
    this.IsActive = false;
    this.userId = '';
  }
}

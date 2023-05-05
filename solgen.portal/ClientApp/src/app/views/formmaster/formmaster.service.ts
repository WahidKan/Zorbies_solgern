import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Group } from '../managelayout/layout.service';


@Injectable({
  providedIn: 'root'
})
export class FormmasterService {

  public baseUri = `${environment.WebApiBaseUrl}`;
  public formmasterURI = `${environment.WebApiBaseUrl}FormMaster`;
  pagedData: any;
  customFieldsList: any;

  constructor(private http: HttpClient) { }

  getFormMasterById(id: string) {
    return this.http.get<tblformMasterModel>(`${this.formmasterURI}/${id}`);
  }

  getFormsList() {
    return this.http.get(this.baseUri + `FormMaster/GetFormsList`);

  }

  getFormDetail() {
    return this.http.get(this.baseUri + `FormMaster/GetFormDetail`)
  }
  addOrUpdateFormData(FormdataModel: FormData) {
    // // console.log('FormdataModel', FormdataModel);
    return this.http.post(this.baseUri + `FormMaster/AddUpdateFormMaster`, FormdataModel);

  }

  getproductDropDown() {
    return this.http.get(this.baseUri + `FormMaster/GetProductDropDown/`)
  }

  getformmasterList(name: string, sortColumn: string, sortDir, page: number, pageSize: number, userId: string): Observable<any> {
    return this.http.get(this.baseUri + `FormMaster/GetFormsList?name=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  GetCustomFieldsList(formid: any, companyId: any) {
    return this.http.get(`${this.baseUri}FormMaster/GetLayoutCustomFieldByModuleNameAndSubModule?formid=${formid}&companyId=${companyId}`)
      .pipe(
        map((response: any) => {
          this.customFieldsList = response;
          return true;
        })
      );
  }


  SaveLAyourData(layoutControlModel: Group[], formid: any) {
    let url = `${this.baseUri}FormMaster/SaveLayoutControls?formid=${formid}`;

    // // console.log('urll', url);
    return this.http.post(url, layoutControlModel);
    // (`${this.baseUri}Lease/UpdateLeaseStatus?leaseStatus=${leaseStatus}&leaseId=${leaseId}&calledFrom=${calledFrom}`, leaseStatus, leaseId);
  }


}


export class tblformMasterModel {
  form_master_id: string;
  name: string;
  description: string;
  company_id: number;
  loanproductsids: string;
  createdby: string;
  

  constructor() {
    this.form_master_id = "";
    this.name = "";
    this.description = "";
    this.company_id = 0;
    this.createdby = "";
    this.loanproductsids ="" ;
    
  }



}









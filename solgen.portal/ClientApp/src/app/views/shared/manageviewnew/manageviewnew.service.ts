import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class ManageViewNewService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any = {
    pager: {},
    data: []
  };
  constructor(private http: HttpClient) {
  }

  getViewList(name: string, userType: string, sortColumn: string, sortDir, page: number, pageSize: number, ModuleName: any, SubModuleName: any, companyId: number) {
    
    return this.http.get(this.baseUri + `Common/GetCustomViewName?nameSearch=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&ModuleName=${ModuleName}&SubModuleName=${SubModuleName}&companyId=${companyId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  DeleteRecords(deleteId: any, tableName: any,) {
    //;
    return this.http.get(this.baseUri + `common/DeleteRecords?primaryKey=${deleteId}&tableName=${tableName}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }


  GetcustomDefaultView(view_Id: any, moduleName :any,submoduleName:any) {
    return this.http.get(this.baseUri + `Common/GetcustomDefaultView?view_Id=${view_Id}&moduleName=${moduleName}&submoduleName=${submoduleName}`); 
  }
  GetCustomViewbyId(id: any) {
    return this.http.get(this.baseUri + `Common/GetCustomViewbyId?id=${id}`); 
  }

  SaveManageViewField(ManageViewModel: ManageViewModel) {
    return this.http.post(this.baseUri + `Bank/SaveCustomManagePopup`, ManageViewModel); 
  }
  checkDublicateViewName(ManageViewModel: ManageViewModel) {
    return this.http.post(this.baseUri + `Bank/checkDublicateViewName`, ManageViewModel);
  }
}

export class ManageViewModel {
  moduleName: string;
  Id: string;
  subModuleName: string;
  //first form
  radiogroup: string;
  select: string;
  //second options
  selectedFields: any = []; 
  //third options
  customWhereCondition: any;
  customOrderCondition: any;
  view_searchFilterJson: any;
  view_searchOrderJson: any;
  Roles: any;

  constructor() {
    this.moduleName = "";
    this.Id = '';
    this.subModuleName = "";
    this.radiogroup = "";
    this.select = "";
    this.customWhereCondition = "";
    this.customOrderCondition = "";
    this.view_searchFilterJson = '';
    this.view_searchOrderJson = '';
    this.Roles = '';
  }
}


export class sorting {
  sortbyAsc: boolean;
  sortbyDesc: boolean;
  isChecked: boolean;
  text: string;
  value: string;
  sortbyText: string;
  constructor() {
    this.sortbyDesc = false;
    this.sortbyAsc = false;
    this.isChecked = false;
    this.text = '';
    this.value = '';
    this.sortbyText = '';
  }
}

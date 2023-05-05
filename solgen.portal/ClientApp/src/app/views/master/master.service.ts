import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class MasterService {
  masterNames: MasterNames[] = [];
  pagedData: any;
  public baseUri = `${environment.WebApiBaseUrl}`;
  public masterUri = `${environment.WebApiBaseUrl}ManageMaster`;


  constructor(private http: HttpClient) {
  }

  getMasterById(id: string) {
    return this.http.get<tblMasterModel>(`${this.masterUri}/${id}`);
  }

  getNames(){
    return this.http.get(this.baseUri + `MasterName/GetMasterNameList/`);
  }

  getMasterDropDown(){
    return this.http.get(this.baseUri + `ManageMaster/GetMasterDropDown/`)
  }

  getMasterList(masterNames: string, masternameId: string, sortColumn: string, sortDir, page: number, pageSize: number, userId: string): Observable<any> {
    return this.http.get(this.baseUri + `ManageMaster/GetMasterList?masterNames=${masterNames}&masternameId=${masternameId}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  GetStatus() {
    return this.http.get(this.baseUri + `ManageMaster/GetCommonStatus/`).pipe(
      map((response: any) => {
        return response;
      })
    );

  }

  AddManageMaster(tblMasterModel: tblMasterModel) {
    return this.http.post(this.baseUri + `ManageMaster/AddUpdateMaster`,tblMasterModel);
  }

  
  setMasterStatus(masterid: any, status: any) {
    return this.http.get(this.baseUri + `ManageMaster/ChangedMasterStatusById?masterid=${masterid}&InStatus=${status}`)
  }
  DeleteMaster(masterid: any) {
    return this.http.get(this.baseUri + `ManageMaster/DeletedMasterById?masterid=${masterid}`)
  }


}


export class MasterNames {
  masterNameId: string;
  masterNameValue: string;
  masterNameTitle: string;
  constructor() {
    this.masterNameId = '';
    this.masterNameValue = '';
    this.masterNameTitle = '';
  }
}


export class tblMasterModel {
  masterId: string;
  masterNameId: string;
  masterKey: string;
  masterNames: string;
  masterValue: string;
  image: string;
  masterNameValue: string;
  masterStatusId: any;
  masterIsDeleted?: boolean;
  masterCreatedOn: string;
  masterCreatedBy: string;
  masterModifyBy: string;
  masterModifiedOn: string;
  isFrontEnd: string;
  modifiedByType: string;
  masterDescription: string;

  constructor() {
    this.masterId = "";
    this.masterNameId = "";
    this.masterKey = "";
    this.masterValue = "";
    this.masterNames = "";
    this.masterNameValue = "";
    this.image = "";
    this.masterStatusId = "";
    this.masterIsDeleted = false;
    this.masterCreatedOn = "";
    this.masterCreatedBy = "";
    this.masterModifyBy = "";
    this.masterModifiedOn = "";
    this.isFrontEnd = "";
    this.modifiedByType = "";
    this.masterDescription = "";
  }


}
export class Masters {
  masterId: string;
  masterValue: string;

  constructor() {
    this.masterId = '';
    this.masterValue = '';
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class MasternameService {
  public baseUri = `${environment.WebApiBaseUrl}`;

  pagedData: any;
  constructor(private http: HttpClient) {
  }

  getMasterNameList(masterNameValue: string, sortColumn: string, sortDir, page: number, pageSize: number, userId: string): Observable<any> {
    return this.http.get(this.baseUri + `MasterName/GetMasterNameList?masterNameValue=${masterNameValue}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }


  getMasterNameDetail(id: any) {
    return this.http.get(this.baseUri + `MasterName/GetMasterNameById?id=${id}`)
  }

  AddEditMasterName(MasterName: MasterName) {
    return this.http.post(this.baseUri + `MasterName/AddUpdateMasterName`, MasterName);
  }
}
export class MasterName {

  masterNameId: string;
  masterNameValue: string;
  masterNameTitle: string;
  constructor() {
    this.masterNameId = '';
    this.masterNameValue = '';
    this.masterNameTitle = '';
  }
}

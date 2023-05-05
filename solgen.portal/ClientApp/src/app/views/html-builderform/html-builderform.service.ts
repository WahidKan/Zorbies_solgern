import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { strategy } from '@angular-devkit/core/src/experimental/jobs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class HtmlBuilderformService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  public emailTemplateUri = `${environment.WebApiBaseUrl}EmailTemplate`;
  leadEditPage: any;


  constructor(private http: HttpClient) { }


  getHtmlContentFromDatabase(isDefaultView, id) {
    return this.http.get(`${this.emailTemplateUri}/GetHtmlContentFromDatabase?isDefaultView=${isDefaultView}&Id=${id}`);
  }

  saveHtmlBuilderData(htmlBuilderModel: htmlBuilderDataModel) {
    return this.http.post(`${this.emailTemplateUri}/SaveHtmlBuilderData`, htmlBuilderModel);
  };
  VerifyDuplicateName(name: string, id: string) : Observable<any>{
    return this.http.get(`${this.emailTemplateUri}/VerifyDuplicateName?Name=${name}&Id=${id}`);
  }
  GetHtmlContentListingData(name: string, sortColumn: string, sortDir, page: number, pageSize: number): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }

    return this.http.get(`${this.emailTemplateUri}/GetHtmlContentListingData?name=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}`)
  };
  CloneTemplete(Id: string) : Observable<any>{
    return this.http.post(`${this.emailTemplateUri}/CloneTemplete`,null,{
      params: { Id },
    });
  }
  
  deleteTemplete(deleteId: any, tableName: any,) {
    ;
    return this.http.get(this.baseUri + `common/DeleteRecords?primaryKey=${deleteId}&tableName=${tableName}`)
      .pipe(
        map((response: any) => {
          this.leadEditPage = response;
          return true;
        })
      );
  }

  DeleteRecords(deleteId: any, tableName: any,) {
    return this.http.get(this.baseUri + `common/DeleteRecords?primaryKey=${deleteId}&tableName=${tableName}`)
  }

  savePlaceHolder(data: any) : Observable<any> {
    return this.http.post(`${this.emailTemplateUri}/SavePlaceHolder`, data);
  }
};




export class PlaceHolderList{
  Id: string;
  PlaceHolders: string;

}


export class htmlBuilderDataModel {
  id: string;
  html: string;
  css: string;
  isDefault: boolean;
  Name: string;
  Description: string;
  linkWithCustomerPortal: boolean;
  statusId : any;
  constructor() {
    this.id = "";
    this.html = "";
    this.css = "";
    this.isDefault = false;
    this.Name = '';
    this.Description = '';
    this.linkWithCustomerPortal = false;
    this.statusId =  null;
  }
}

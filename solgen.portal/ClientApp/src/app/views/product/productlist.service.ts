import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  //prodctEditPage: any;
  pagedData: any;
  editPage: any;
  customFieldsList: any;
  constructor(private http: HttpClient) { }

  GetProductList(nameSearch: string, sortColumn: string, page: number, pageSize: number, sortDir: string, loginuserid: string, moduleName: string, submoduleName: string, companyId: number, custom_view_id: string, searchFilter: string): Observable<any> {
    if (typeof nameSearch == "undefined" || nameSearch == null) { nameSearch = null; }
    else {
      //nameSearch = "ProductName like '%" + nameSearch + "%'";
      nameSearch = encodeURIComponent((nameSearch));
    }
    return this.http.get(`${this.baseUri}product/GetProductList?nameSearch=${nameSearch}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${loginuserid}&moduleName=${moduleName}&submoduleName=${submoduleName}&companyId=${companyId}&custom_view_id=${custom_view_id}&searchFilter=${searchFilter}`)
  }

  GetProductDetails(id: any, moduleName: any, submoduleName: any, companyId: number, userId: string) {
    return this.http.get(this.baseUri + `product/GetProductById?id=${id}&moduleName=${moduleName}&submoduleName=${submoduleName}`)
      .pipe(
        map((response: any) => {
          //// // console.log("responseService12", response);
          this.editPage = response;
          return true;
        })
      );
  }

  GetCustomFieldsList(modulename: any, submoduleName: any, companyId: any, Id: any, displayType: string) {
    return this.http.get(`${this.baseUri}vendor/GetCustomFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&PrimaryId=${Id}&displayCode=${displayType}`)
      .pipe(
        map((response: any) => {
          this.customFieldsList = response;
          return true;
        })
      );
  }
  addEditForm(JsonData: JsonData) {
    return this.http.post(this.baseUri + `product/AddEditProduct`, JsonData);
  }

  GeProductListing() {
    return this.http.get(`${this.baseUri}Common/GeProductListing`)


  }
  DeleteRecords(deleteId: any, tableName: any, ) {
    return this.http.get(this.baseUri + `common/DeleteRecords?primaryKey=${deleteId}&tableName=${tableName}`)
      .pipe(
        map((response: any) => {
          this.editPage = response;
          return true;
        })
      );
  }

  GetPriceBookList(name: string, sortColumn: string, sortDir: string, page: number, pageSize: number, productid: any): Observable<any> {
    //;
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.baseUri}product/GetPriceBookList?nameSearch=${name}&SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}&productid=${productid}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  GetProductPriceBooksList(productId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `product/GetProductsPriceBooksList?productId=${productId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  GetProductCampaignsList(productId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `product/GetProductCampaignsList?productId=${productId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }


}
  export class JsonData {
  Id: string;
  FormJsonData: string;
  moduleCode: string;
  subModuleCode: string;
  companyId: string;
  userId: string;
  constructor() {
    this.Id = "";
    this.FormJsonData = "";
    this.moduleCode = "";
    this.subModuleCode = "";
    this.companyId = "";
    this.userId = "";
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

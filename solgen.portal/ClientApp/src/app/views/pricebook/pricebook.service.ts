import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LowerCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PricebookService {

  public baseUri = `${environment.WebApiBaseUrl}`;
  public userUri = `${environment.WebApiBaseUrl}Company`;
  pagedData: any;
  masters: any;
  constructor(private http: HttpClient) { }

  GetPriceBookList(name: string, sortColumn: string, sortDir, page: number, pageSize: number, userId: string): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.userUri}/GetPriceBookList?name=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  delete(ids: string) {
    return this.http.get(this.baseUri + `Company/DeleteBookPrice?ids=${ids}`)
  }
  deleteMultiplePriceBook(ids: string) {
    return this.http.get(this.baseUri + `Company/deleteMultiplePriceBook?ids=${ids}`)
  }
  addOrUpdatePriceBook(priceBookmodel: FormData) {

    return this.http.post(this.baseUri + `Company/addOrUpdatePriceBook`, priceBookmodel);

  }
  getPriceBookById(id: any) {
    return this.http.get(this.baseUri + `Company/GetPriceBookById?id=${id}`)
  }

  GetAssociateProductList(priceBookId: any, opportunityId: any, submoduleid: any, objectname: any, name: string, sortColumn: string, sortDir: string, page: number, pageSize: number, userId: string): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.baseUri}Company/GetAssociateProductList?priceBookId=${priceBookId}&opportunityId=${opportunityId}&submoduleid=${submoduleid}&objectname=${objectname}&nameSearch=${name}&SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  DeleteProduct(selected: string) {
    return this.http.get(this.baseUri + `proposal/DeleteProduct?productId=${selected}`)
  }
  DeleteAssociateProduct(pricemapId,priceBookId) {
    return this.http.get(this.baseUri + `Company/DeleteAssociateProduct?pricemapId=${pricemapId}&priceBookId=${priceBookId}`)
  }
  AddUpdateLineItem(lineItemModel: FormData) {
    return this.http.post(this.baseUri + `Company/AddUpdateLineItem`, lineItemModel);

  }
  GetAssociateDocumentList(id) {
    return this.http.get(this.baseUri + `Company/GetAssociateDocumentList?priceBookId=${id}`);
  }
}

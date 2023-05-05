import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CommonService } from '../shared/common.service';

@Injectable({
  providedIn: 'root'
})
export class ProductrequiredserviceService {

  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  pagedataGraph: any;
  constructor(private http: HttpClient, private commonService: CommonService, private router: Router) { }
  SearchProductRequiredList(pNameAndNumber: string,sortColumn: string, sortDir, page: number, pageSize: number, From: any, To: any, workTypeId: any) {
    if (typeof From == "undefined" || From == null) { From = null; }
    else { From = From.toDateString(); }

    if (typeof To == "undefined" || To == null) { To = null; }
    else { To = To.toDateString(); }
    return this.http.get(this.baseUri + `product/GetProductRequiredList?pNameAndNumber=${pNameAndNumber}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&workTypeId=${workTypeId}&From=${From}&To=${To}`)
    //.pipe(
    //  map((response: any) => {          
    //      this.pagedData = response;
    //      return true;          
    //  })
    //);
  }

  GetProductRequiredById(id: any) {
    return this.http.get(this.baseUri + `product/GetProductRequiredDetailById?id=${id}`)
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../shared/common.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NestreportserviceService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  pagedataGraph: any;
  constructor(private http: HttpClient, private commonService: CommonService, private router: Router) { }

  getNestReport(name: any, deliveryId:any, accountId, stateId, stageId, From: any, To: any, accountStatusId: any, DeliverDateFrom: any, DeliverDateTo: any, sortColumn: string, sortDir, page: number, pageSize: number, isGraph: boolean) {
    if (typeof From == "undefined" || From == null) { From = null; }
    else { From = From.toDateString(); }

    if (typeof To == "undefined" || To == null) { To = null; }
    else { To = To.toDateString(); }
    if (typeof DeliverDateFrom == "undefined" || DeliverDateFrom == null) { DeliverDateFrom = null; }
    else { DeliverDateFrom = DeliverDateFrom.toDateString(); }
    if (typeof DeliverDateTo == "undefined" || DeliverDateTo == null) { DeliverDateTo = null; }
    else { DeliverDateTo = DeliverDateTo.toDateString(); }

    return this.http.get(this.baseUri + `Report/GetNestReport?name=${name}&deliveryId=${deliveryId}&accountId=${accountId}&stateId=${stateId}&stageId=${stageId}&From=${From}&To=${To}&accountStatusId=${accountStatusId}&DeliverDateFrom=${DeliverDateFrom}&DeliverDateTo=${DeliverDateTo}
&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&isGraph=${isGraph}`)
    //.pipe(
    //  map((response: any) => {

    //      this.pagedData = response;
    //      return true;

    //  })
    //);
  }

  AddEditDeliveryDate(model: DeliveryDateModel) {
    return this.http.post(this.baseUri + `Report/AddEditDeliveryDate`, model);
  }
}


export class DeliveryDateModel {
  productRequiredId: string;
  deliveryDate: string;
  constructor() {
    this.productRequiredId = '';
    this.deliveryDate = '';
  }
}

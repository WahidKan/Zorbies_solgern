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
export class ServiceappointmentreportserviceService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  pagedataGraph: any;
  constructor(private http: HttpClient, private commonService: CommonService, private router: Router) { }
  getServiceAppointmentReport(serviceAppointmentSearch: any, wareHouse: any, serviceTerritoryId: any, sortColumn: string, sortDir, page: number, pageSize: number, From: any, To: any, workTypeId: any, StatusIdChk: any, AttchmentId: any, isExport: boolean, ExportTotalRecoards:any) {
    if (typeof From == "undefined" || From == null)
    { From = null; }
    else { From = From.toDateString(); }

    if (typeof To == "undefined" || To == null) { To = null; }
    else { To = To.toDateString(); }
    return this.http.get(this.baseUri + `Report/GetServiceAppointmentReportList?serviceAppointmentSearch=${serviceAppointmentSearch}&wareHouse=${wareHouse}&serviceTerritoryId=${serviceTerritoryId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&workTypeId=${workTypeId}&From=${From}&To=${To}&StatusIdChk=${StatusIdChk}&AttchmentId=${AttchmentId}&isExport=${isExport}&ExportTotalRecoards=${ExportTotalRecoards}`)
      //.pipe(
      //  map((response: any) => {          
      //      this.pagedData = response;
      //      return true;          
      //  })
      //);
  }
}

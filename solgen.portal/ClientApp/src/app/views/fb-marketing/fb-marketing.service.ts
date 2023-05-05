import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class FbMarketingService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  constructor(private http: HttpClient) { }

  GetCampaignList(listFilter, From: any, To: any, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    if (typeof From == "undefined" || From == null) { From = null; }
    else { From = From.toDateString(); }

    if (typeof To == "undefined" || To == null) { To = null; }
    else { To = To.toDateString(); }

    return this.http.get(
      this.baseUri + `FbCampaign/GetCampaignList?name=${listFilter}&fromDate=${From}&toDate=${To}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  }
  GetOpportunityList(id, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `FbCampaign/GetOpportunityList?Id=${id}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  GetLeadsList(id, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `FbCampaign/GetLeadList?Id=${id}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  GetAdsetListByCampaignId(id, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `FbCampaign/GetAdsetListByCampaignId?Id=${id}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  GetAdsList(id, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `FbCampaign/GetAdList?Id=${id}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  GetAddSetsList(listFilter, From: any, To: any, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    if (typeof From == "undefined" || From == null) { From = null; }
    else { From = From.toDateString(); }

    if (typeof To == "undefined" || To == null) { To = null; }
    else { To = To.toDateString(); }

    return this.http.get(
      this.baseUri + `FbCampaign/GetAddSetsList?name=${listFilter}&fromDate=${From}&toDate=${To}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  }
  GetAddsList(listFilter, From: any, To: any, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    if (typeof From == "undefined" || From == null) { From = null; }
    else { From = From.toDateString(); }

    if (typeof To == "undefined" || To == null) { To = null; }
    else { To = To.toDateString(); }

    return this.http.get(
      this.baseUri + `FbCampaign/GetAddsList?name=${listFilter}&fromDate=${From}&toDate=${To}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  }
  GetAdById(id): Observable<any> {
    return this.http.get(
      this.baseUri + `FbCampaign/GetAdById?id=${id}`
    );
  }
  GetCampaignDetailsById(id): Observable<any> {    
    return this.http.get(
      this.baseUri + `FbCampaign/GetFacebookCampaignDetails?id=${id}`
    );
  }
  GetFacebookCampaignAdSetDetails(id): Observable<any> {    
    return this.http.get(
      this.baseUri + `FbCampaign/GetFacebookCampaignAdSetDetails?id=${id}`
    );
  }
  GetAdSetDetailsById(id): Observable<any> {    
    return this.http.get(
      this.baseUri + `FbCampaign/GetFacebookAdSetDetails?id=${id}`
    );
  }
  GetAdDetails(id): Observable<any> {    
    return this.http.get(
      this.baseUri + `FbCampaign/GetAdDetails?id=${id}`
    );
  }

  GetAdSetById(id): Observable<any> {    
    return this.http.get(
      this.baseUri + `FbCampaign/GetAdsetById?id=${id}`
    );
  }

  GetCampaignById(id): Observable<any> {
    return this.http.get(
      this.baseUri + `FbCampaign/GetCampaignById?id=${id}`
    );
  }

  GetFacebookCampaignsDDL(): Observable<any> {
    return this.http.get(
      this.baseUri + `FbCampaign/GetFacebookCampaignsDDL`
    );
  }

  GetFacebookadsetsDDL(): Observable<any> {
    return this.http.get(
      this.baseUri + `FbCampaign/GetFacebookadsetsDDL`
    );
  }
  saveFbAdSet(Model: FormData): Observable<any> {
    
    return this.http.post(`${this.baseUri}FbCampaign/SaveFacebookadsets`,Model);
  }

  SaveFbAd(fbjson: any): Observable<any> {
    return this.http.post(`${this.baseUri}FbCampaign/SaveFbAd`, fbjson);
  }

  UpdateFbAd(fbjson: any): Observable<any> {
    return this.http.post(`${this.baseUri}FbCampaign/UpdateFbAd`, fbjson);
  }

  updateFbAdSet(Model: FormData): Observable<any>
  { return this.http.post(this.baseUri + `FbCampaign/updateFacebookadsets`, Model);}
 
  saveCampaign(Model: FormData): Observable<any> {
    return this.http.post(this.baseUri + `FbCampaign/SaveCampaign`, Model);
  }
  updateCampaign(Model: FormData): Observable<any> {
    return this.http.post(this.baseUri + `FbCampaign/UpdateCampaign`, Model);
  }
  deleteCampaign(id): Observable<any> {
    return this.http.delete(this.baseUri + `FbCampaign/DeleteCampaign?id=${id}`);
  }
  deleteselectedCampaign(ids: string): Observable<any> {
    return this.http.post(`${this.baseUri}FbCampaign/deleteselectedCampaign`, null, {
      params: { ids },
    });
  }
  deleteAdset(id): Observable<any> {
    return this.http.delete(this.baseUri + `FbCampaign/DeleteAdset?id=${id}`);
  }
  deleteselectedAdset(ids: string):Observable<any> {
    return this.http.post(`${this.baseUri}FbCampaign/deleteselectedAdset`, null, {
      params: { ids },
    });
  }
  deleteselectedAds(ids: string):Observable<any> {
    return this.http.post(`${this.baseUri}FbCampaign/deleteselectedAds`, null, {
      params: { ids },
    });
  }
  deleteAds(id): Observable<any> {
    return this.http.delete(this.baseUri + `FbCampaign/DeleteAds?id=${id}`);
  }

  GetFacebookAdCreativeDDL(): Observable<any> {
    return this.http.get(
      this.baseUri + `FbCampaign/GetFacebookAdCreativeDDL`
    );
  }

  
}

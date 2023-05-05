import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  constructor(private http: HttpClient) { }
  saveAnnouncement(CompanySetUpModel: FormData) {
    return this.http.post(this.baseUri + `announcement/saveAnnouncement`, CompanySetUpModel);
  }
  getAnnouncementList(name: string, sortColumn: string, sortDir, page: number, pageSize: number): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.baseUri}announcement/GetAnnouncementList?title=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  changeStatus(ids: string, STATUSID: number) {
    return this.http.post(`${this.baseUri}announcement/ChangeStatus?ids=${ids}&statusId=${STATUSID}`, null);
  }
  delete(ids: string) {
    return this.http.get(this.baseUri + `announcement/Delete?ids=${ids}`)
  }
  deleteMultipleAnnouncements(ids: string) {
    return this.http.get(this.baseUri + `announcement/DeleteMultipleAnnouncements?ids=${ids}`)
  }

  getAnnouncementDetail(id: any) {
    return this.http.get(this.baseUri + `announcement/GetAnnouncementDetailById?id=${id}`)
  }
}

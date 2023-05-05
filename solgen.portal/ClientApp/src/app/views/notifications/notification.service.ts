import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public notificationUri = `${environment.WebApiBaseUrl}Notification`;
    pagedData: any;
  constructor(private http: HttpClient) { }

  getNotificationList(name: any, From: any, To: any, sortColumn: string, sortDir, page: number, pageSize: number, userId: string, isDashBoard: boolean): Observable<any> {
    if (typeof From == "undefined" || From == null) { From = null; }
    else { From = From.toDateString(); }

    if (typeof To == "undefined" || To == null) { To = null; }
    else { To = To.toDateString(); }

    return this.http.get(`${this.notificationUri}/GetNotificationList?name=${name}&From=${From}&To=${To}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}&isDashBoard=${isDashBoard}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  setNotificationToRead(noificationId: any) {
    return this.http.get(`${this.notificationUri}/SetNotificationToRead?noificationId=${noificationId}`)
  }
}

export class NotificationModel
{
  id: string;
  subject: string; 
  message: string;
  senderName: string;
  receiverName: string;
  createdOn: string;
  constructor() {
    this.id = "";
    this.subject = "";
    this.message = "";
    this.senderName = "";
    this.receiverName = "";
    this.createdOn = "";
  }
}

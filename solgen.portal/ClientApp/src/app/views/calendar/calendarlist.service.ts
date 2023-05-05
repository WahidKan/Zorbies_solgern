import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarlistService {

  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  editAppointment = new Subject();
  constructor(private http: HttpClient) { }
  GetAssignedUsers() {

    return this.http.get(`${this.baseUri}Task/TaskGetAssignedUsers`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;

          return response;
        })
      );
  }
  addeditannouncement(model: any) {
    return this.http.post(this.baseUri + `appointment/Save`, model);
  }
  CheckScheduledAppointmentTime(startDate, startTime, AppointmentIdAuto): Observable<any> {

    return this.http.get(this.baseUri + 'appointment/CheckScheduledAppointmentTimeAgaintstUser',
      {
        params: {
          startDate: startDate,
          startTime: startTime,
          AppointmentIdAuto: AppointmentIdAuto
        }
      });
  }



  GetAppointmentSAgaintstUser(id, appId): Observable<any> {

    return this.http.get(this.baseUri + 'appointment/GetScheduleAppointmentAgaintstUser',
      {
        params: {
          leadId: id,
          AppId: appId
        }

      });

  }
  GetAppointments(sortColumn: string, sortDir: string, page: number, pageSize: number, userId: string, day: string, month: string, year: string,listFiltertext:string,customerId:string,appointmentStatusId: string, isWeek: boolean): Observable<any> {



    return this.http.get(`${this.baseUri}appointment/GetAppointments?SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}&userId=${userId}&month=${month}&year=${year}&day=${day}&listFiltertext=${listFiltertext}&customerId=${customerId}&appointmentStatusId=${appointmentStatusId}&isweek=${isWeek}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  GetAppointmentsForCalendar(condition: string): Observable<any> {
    return this.http.get(`${this.baseUri}appointment/GetAppointmentsForCalendar?week=${condition}`)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  getcustomerList(appointmentWith: any, LeadId: any): Observable<any> {
    return this.http.get(this.baseUri + `appointment/GetContactsForAppointment/${appointmentWith}/${LeadId}`);
  }
  getcustomerListForCalender(): Observable<any> {
    return this.http.get(this.baseUri + `appointment/getcustomerListForCalender`);
  }

  deleteAppointment(id: any) {
    const url = `${this.baseUri}appointment/${id}`;
    return this.http.delete(url);
  }

  getAppointmentHistory(leadId: any, appointmentId, submoduleName) {
    const url = `${this.baseUri}appointment/GetAppointmentHistory?leadId=${leadId}&appointmentId=${appointmentId}&submoduleCode=${submoduleName}`;
    return this.http.get(url);
  }
  getAppointmentById(id: any): Observable<any> {
    ;
    return this.http.get(this.baseUri + `appointment/GetAppointmentById?id=${id}`);
  }

  GetAppointmentsBySubmodule(primaryKey, submoduleName, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(
      this.baseUri + `appointment/GetAppointmentsBySubmodule?Id=${primaryKey}&submoduleCode=${submoduleName}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  }

  set setAditAppointment(id) {
    ;
    this.editAppointment.next(id);
  }

  get getAditAppointment() {
    return this.editAppointment;
  }
}
export class appointmentmodel {
  AppointmentID: string;
  AppointmentTypeID: string;
  AppointmentNumber: string;
  AppointmentType: string;
  AppointmentStatusID: number;
  AppointmentStatus: string;
  CustomerID: string;
  appointmentWith: number;
  ModuleName: string;
  customer: number;
  customerName: string;
  customerGuid:string;
  description: string;
  AppointmentDueDate: string;
  FromTime: string;
  ToTime: string;
  Email: string;
  userEmail: string;
  calenderId: string;
  Subject: string;
  /////////Date Time For Notification Start//////////
  AppointmentDueDate_Notification: any;
  FromTime_Notification: any;
  ToTime_Notification: any;
  /////////End//////////
  constructor() {
    this.AppointmentID = '';
    this.AppointmentTypeID = '';
    this.AppointmentType = '';
    this.AppointmentStatusID = 0;
    this.AppointmentStatus = '';
    //this.CustomerID = '',
    this.appointmentWith = 0;
    this.AppointmentDueDate = '';
    this.customer = 0;
    this.description = '';
    this.FromTime = '';
    this.ToTime = '';
    this.Email = '';
    this.userEmail = '';
    this.calenderId = '';
  }
}

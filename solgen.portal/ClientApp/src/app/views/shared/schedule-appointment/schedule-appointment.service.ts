import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleAppointmentService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  constructor(private http:HttpClient) { }
  
  GetScheduleAppointment(): Observable<any> {
    
    return this.http.get(this.baseUri +'Common/GetScheduleAppointment');
  }
  UpdateScheduledAppointmentStatus(appointmentId:any,status:string) {
   
    return this.http.post(this.baseUri + `Common/UpdateScheduledAppointmentStatus`,
    null,{
      params:{AppointmentId: appointmentId,
        status :status}
     
    });

  }

}

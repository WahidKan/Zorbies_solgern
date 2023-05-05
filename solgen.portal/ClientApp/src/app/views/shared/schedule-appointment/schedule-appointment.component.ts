import { Router } from '@angular/router';
import { ScheduleAppointmentService } from './schedule-appointment.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { any } from 'underscore';
import { strictEqual } from 'assert';

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.scss']
})
export class ScheduleAppointmentComponent implements OnInit {
  @ViewChild('AppointmentScheduleModal', { static: false }) AppointmentScheduleModal: ModalDirective;  //#replyNotesmodel

  AppoointmId:any;
  status:string;
  leadId:any;
  constructor(private scheduleApintServ:ScheduleAppointmentService,private routerService: Router) { }
  ngOnInit() {

   // this.StartAppointment();
  }
  show(leadId:any,AppointmentID:any) {   
    this.AppoointmId=AppointmentID;
    this.leadId= leadId;
    localStorage.setItem("AppoointmId",AppointmentID);
    this.AppointmentScheduleModal.show();
    // this.initForm();
    // this.addMappingLocationForm.reset();
    // this.getLocationsList();
    // this.loadSave = false;
    // this.proposalmappingModal.show();
  }
  close() {
    
    this.AppointmentScheduleModal.hide();
   }
   StartAppointment(){
    this.scheduleApintServ.GetScheduleAppointment().subscribe((result: any) => {
      if (result) {
       
        // console.log(result);
        this.AppoointmId=result[0].AppointmentIDAuto;
        this.leadId= result[0].Contact_Id;
        localStorage.setItem("AppoointmId",result[0].AppointmentIDAuto);
      }

    });
   }   
   UpdateScheduledAppointmentStatus(statusval) {
    ;
    this.status=statusval;
    // console.log(this.AppoointmId,this.leadId);
      this.scheduleApintServ.UpdateScheduledAppointmentStatus(this.AppoointmId,this.status).subscribe((result: any) => {
        if (result.statusCode == 200) {
        
          if(this.status=='start')
          {
          this.routerService.navigateByUrl('lead/view/'+this.leadId+'?AppId='+this.AppoointmId);
          }
          else
          {
            this.close();
          }

        }
       
      }, error => {
      });
   

  }

}

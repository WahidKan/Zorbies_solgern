import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../common.service';
import { ScheduleAppointmentService } from '../schedule-appointment/schedule-appointment.service';
import { any } from 'underscore';

@Component({
  selector: 'app-start-appointment',
  templateUrl: './start-appointment.component.html',
  styleUrls: ['./start-appointment.component.scss']
})
export class StartAppointmentComponent implements OnInit {
  @Input("Minimize") isDialerMinimize: boolean = true;
  @Output() refreshParentEmitter = new EventEmitter();
  @ViewChild('AppointmentScheduleModal', { static: false }) AppointmentScheduleModal: ModalDirective;

  status: string;
  endAppoint: boolean = false;
  startAppoint: boolean = true;
  AppointmentListingData: any = [];
  selectedId: any = 0;
  title: any = "Solgen Appointments";
  constructor(private commonService: CommonService, private scheduleApintServ: ScheduleAppointmentService,
    private toastr: ToastrService,
    private router: Router) {
  }

  ngOnInit() {


    var appointmentrec = localStorage.getItem('Appointment');
    if (appointmentrec != null) {
      var obj = JSON.parse(appointmentrec)
      this.selectedId = obj.AppointmentIDAuto;
      this.AppointmentListingData.push(obj);
      this.title = 'Appointment in Progress';
    }
    this.onAppointmentNotification();
    setInterval(() => {
      this.onAppointmentNotification();
      this.commonService.setRefreshAppointsHistory = true;
    }, 180000)
    this.prepareSignalR();
  }
  prepareSignalR() {
    this.commonService.hubConnection.on("onAppointmentStartedNotifyClient", (isShowToaster: boolean) => {
      this.onAppointmentNotification();
    });
  }



  onAppointmentNotification() {
    this.commonService.getAppointmentNotification().subscribe((meeting: any) => {
      this.AppointmentListingData = [];
      meeting.forEach((item) => {

        this.AppointmentListingData.find(x => x.AppointmentIDAuto == item.AppointmentIDAuto)
        let apt = this.AppointmentListingData.find(x => x.AppointmentIDAuto == item.AppointmentIDAuto)
        if (apt == null) {
          this.AppointmentListingData.push(item);
          if (item.isStarted) {
            this.selectedId = item.AppointmentIDAuto;
            localStorage.setItem('Appointment', JSON.stringify(item));
            this.title = 'Appointment in Progress';
          }
        }
      });
      if (meeting.length == 0) {
        localStorage.removeItem('Appointment');
        this.title = 'Solgen Appointments';
        this.selectedId = 0;
      }
    });
  }

  onToggleClick() {
    if (this.isDialerMinimize) {
      this.isDialerMinimize = false;

    }
    else {
      this.isDialerMinimize = true;

      //this.onHangUpClick();
    }
  }

  UpdateScheduledAppointmentStatus(statusval, AppoointmId, leadId, subModuleName, OpportunityId) {
    
    this.title = 'Appointment in Progress';
    this.status = statusval;
    // console.log(AppoointmId, leadId);
    this.scheduleApintServ.UpdateScheduledAppointmentStatus(AppoointmId, this.status).subscribe((result: any) => {
      if (result.statusCode == 200) {

        if (this.status == 'start') {
          let apt = this.AppointmentListingData.find(x => x.AppointmentIDAuto == AppoointmId)
          apt.isStarted = true;
          this.selectedId = apt.AppointmentIDAuto;
          localStorage.setItem('Appointment', JSON.stringify(apt));
          // this.startAppoint = false;
          // this.endAppoint = true;
          if (subModuleName.toLowerCase() == "opportunity") {
            this.router.navigateByUrl('opportunity/viewOpportunity/' + leadId);
          }

          else if (subModuleName.toLowerCase() == "lead") {
            this.router.navigateByUrl('lead/view/' + leadId + '?AppId=' + AppoointmId);
          }
          else if (subModuleName.toLowerCase() == "proposal") {
            this.router.navigateByUrl('proposal-list/viewproposal/' + leadId);
          }
          else if (subModuleName.toLowerCase() == "workorder") {
            this.router.navigateByUrl('workorder/view/' + leadId);
          }
          else if (subModuleName.toLowerCase() == "contract") {
            this.router.navigateByUrl('contract/view/' + leadId);
          }
          else if (subModuleName.toLowerCase() == "account") {
            this.router.navigateByUrl('accountslist/view/' + leadId);
          }
        }
        else {
          this.close();
        }

      }

    }, error => {
    });


  }

  CancelAppointment(statusval, AppoointmId, leadId) {
    this.scheduleApintServ.UpdateScheduledAppointmentStatus(AppoointmId, statusval).subscribe((result: any) => {
      if (result.statusCode == 200) {
        this.AppointmentListingData = this.AppointmentListingData.filter(x => x.AppointmentIDAuto != AppoointmId);
        this.commonService.setRefreshAppointsHistory = true;
      }

    }, error => {
    });


  }
  EndAppointment(statusval, AppoointmId, leadId, subModuleName) {
    this.title = 'Solgen Appointments';
    localStorage.removeItem('Appointment');
    this.selectedId = 0;
    // console.log(AppoointmId, leadId);
    this.scheduleApintServ.UpdateScheduledAppointmentStatus(AppoointmId, statusval).subscribe((result: any) => {
      if (result.statusCode == 200) {

        this.AppointmentListingData = this.AppointmentListingData.filter(x => x.AppointmentIDAuto != AppoointmId)
        if (subModuleName.toLowerCase() == "opportunity") {
          this.router.navigateByUrl('opportunity');
        }
        else if (subModuleName.toLowerCase() == "lead") {
          this.router.navigateByUrl('lead');
        }
        else if (subModuleName.toLowerCase() == "proposal") {
          this.router.navigateByUrl('proposal-list');
        }
        else if (subModuleName.toLowerCase() == "workorder") {
          this.router.navigateByUrl('workorder');
        }
        else if (subModuleName.toLowerCase() == "contract") {
          this.router.navigateByUrl('contract');
        }
        else if (subModuleName.toLowerCase() == "account") {
          this.router.navigateByUrl('accountslist');
        }
      }

    }, error => {
    });


  }
  close() {
    this.AppointmentScheduleModal.hide();
  };

}

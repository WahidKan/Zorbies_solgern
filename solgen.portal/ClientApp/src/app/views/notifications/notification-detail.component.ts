import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationModel, NotificationService } from './notification.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';
import { DateTimeToLocalPipeForAppointment } from '../../pipes/datetime.pipe';
import moment from 'moment';
import { LoanapplicationserviceService } from '../loanapplication/loanapplicationservice.service';
@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss']
})
export class NotificationDetailComponent implements OnInit {
  @ViewChild('notificationDetailModal', { static: false }) modalnotif: ModalDirective;
  notifications = new NotificationModel();
  dataNoti: any;
  active = false;
  loading = false;
  pagedData: any = {
    pager: {},
    data: []
  };
  constructor(private notificationService: NotificationService, private routerService: Router, private dateTimeToLocal: DateTimeToLocalPipeForAppointment, private loanapplicationservice: LoanapplicationserviceService) { }

  ngOnInit() {
    if(this.loanapplicationservice.notificationArray.length > 0){
      this.show(this.loanapplicationservice.notificationArray)
    }
  }

  close() {
    this.active = false;
    this.modalnotif.hide();
  }
  show(param) {
    ;
    if (param) {
      var row = JSON.parse(JSON.stringify(param));
      this.dataNoti = row;
      this.dataNoti.Message = row.leadMessage != null ? row.leadMessage : row.Message;
      /////Subject/////////      
      let indxsubjdt = 5 + ((row.Subject.length) - 21);
      let subjdtString = row.Subject.substr(indxsubjdt, 21);
      let subjdateString = this.dateTimeToLocal.transform(subjdtString, '');
      if (subjdateString != "Invalid date") {
        let subjdueDate = moment(subjdateString).format('MM/DD/yyyy');
        row.Subject = row.Subject.replace(subjdtString, subjdueDate);
      }
      /////Date/////////      
      if (row.Message.indexOf('Date:</b>') > 0) {
        let indxdt = 9 + (row.Message.indexOf('Date:</b>'));
        let dtString = row.Message.substr(indxdt, 16);
        let dateString = this.dateTimeToLocal.transform(dtString, '');
        let dueDate = moment(dateString).format('MM-DD-YYYY');
        row.Message = row.Message.replace(dtString, dueDate);
      }
      /////FromTime/////////
      if (row.Message.indexOf('Start Time:</b>') > 0) {
        let indxfromTime = 16 + (row.Message.indexOf('Start Time:</b>'));
        let fromTimeString = row.Message.substr(indxfromTime, 16);
        let fromTimeDateString = this.dateTimeToLocal.transform(fromTimeString, '');
        let fromTime = moment(fromTimeDateString).format('hh:mm A');

        row.Message = row.Message.replace(fromTimeString, fromTime);
      }
      //////////End Time////////////
      if (row.Message.indexOf('End Time:</b> ') > 0) {
        let indxtoTime = 14 + (row.Message.indexOf('End Time:</b> '));
        let toTimeString = row.Message.substr(indxtoTime, 16);
        let toTimeDateString = this.dateTimeToLocal.transform(toTimeString, '');
        let toime = moment(toTimeDateString,).format('hh:mm A');
        row.Message = row.Message.replace(toTimeString, toime);
      }
      this.modalnotif.show();
    }
    this.active = true;

  }

  redirectToSource(row: any) {
    ;
    // console.log(row);

    this.notificationService.setNotificationToRead(row.UserNotificationId).subscribe(m => {
      this.close();
      this.routerService.navigateByUrl(row.RouteUrl)

    });
  }
}

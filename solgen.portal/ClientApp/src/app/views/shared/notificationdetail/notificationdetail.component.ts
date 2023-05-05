import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-notificationdetail',
  templateUrl: './notificationdetail.component.html',
  styleUrls: ['./notificationdetail.component.scss']
})
export class NotificationdetailComponent implements OnInit {
  @ViewChild('dashboarNotificationDetailModal', { static: false }) modalnotif: ModalDirective;
  dataNoti: any;
  active = false;
  constructor() { }

  ngOnInit() {
  }
  close() {
    this.active = false;
    this.modalnotif.hide();
  }

  show(row) {
    if (row) {
      this.dataNoti = row
      this.modalnotif.show();
    }
    this.active = true;

  }
}

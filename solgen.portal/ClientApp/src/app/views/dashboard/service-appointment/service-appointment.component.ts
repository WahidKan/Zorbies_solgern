import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-service-appointment',
  templateUrl: './service-appointment.component.html',
  styleUrls: ['./service-appointment.component.scss']
})
export class ServiceAppointmentComponent implements OnInit {

  serviceAppoinmentList: any;
  showServiceAppoinment: boolean = false
  @ViewChild('serviceAppoinment', { static: false }) serviceAppoinment: ModalDirective;
  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {

  }

  GetServiceAppointments(id: any) {
    this.dashboardService.GetServiceAppointmentData(id).subscribe((result: any) => {
      this.serviceAppoinmentList = result;
      this.showServiceAppoinment = true;
      this.serviceAppoinment.show();
    })
  }

  CloseserviceAppoinment() {
    this.serviceAppoinment.hide();
    this.showServiceAppoinment = false;;
  }
}

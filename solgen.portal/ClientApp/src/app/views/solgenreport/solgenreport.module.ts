import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { SolgenreportRoutingModule } from './solgenreport-routing.module';
import { NestreportserviceService } from './nestreport/nestreportservice.service';
import { NestreportlistComponent } from './nestreport/nestreportlist.component';
import { ChartModule } from 'primeng/chart';
import { ServiceappointmenreportlistComponent } from './serviceappointmentreport/serviceappointmentreportlist.component';
import { ServiceappointmentreportserviceService } from './serviceappointmentreport/serviceappointmentreportservice.service';
import { AuditchecklistpopupComponent } from '../servicesappointment/auditchecklistpopup/auditchecklistpopup.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CustomreportsComponent } from './customreports/customreports.component';
import { AddeditcustomreportComponent } from './customreports/addeditcustomreport.component';
import { CustomreportviewComponent } from './customreports/customreportview.component';

@NgModule({
  declarations: [
    NestreportlistComponent,
    ServiceappointmenreportlistComponent,
    CustomreportsComponent,
    AddeditcustomreportComponent,
    CustomreportviewComponent
  ],
  imports: [
    CommonModule,
    SolgenreportRoutingModule, ChartModule,
    SharedModule, ModalModule
  ],
  providers: [
    NestreportserviceService,
    ServiceappointmentreportserviceService,
    AuditchecklistpopupComponent
  ]
})
export class SolgenreportModule { }

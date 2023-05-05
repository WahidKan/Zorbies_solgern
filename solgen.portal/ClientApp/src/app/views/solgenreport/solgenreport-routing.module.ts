import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NestreportlistComponent } from './nestreport/nestreportlist.component';
import { ServiceappointmentComponent } from '../serviceresource/serviceappointment/serviceappointment.component';
import { ServiceappointmenreportlistComponent } from './serviceappointmentreport/serviceappointmentreportlist.component';
import { AuthGuard } from '../../auth/auth.guard';
import { CustomreportsComponent } from './customreports/customreports.component';
import { AddeditcustomreportComponent } from './customreports/addeditcustomreport.component';
import { CustomreportviewComponent } from './customreports/customreportview.component';

const routes: Routes = [
  { path: 'nestreport', component: NestreportlistComponent, canActivate: [AuthGuard], data: { title: 'Nest Report' } },
  { path: 'serviceappointmentreport', component: ServiceappointmenreportlistComponent, canActivate: [AuthGuard], data: { title: 'Service Appointment Report' } },
  { path: 'customreports', component: CustomreportsComponent, canActivate: [AuthGuard], data: { title: 'Custom Report' } },
  { path: 'addeditcustomreport', component: AddeditcustomreportComponent, canActivate: [AuthGuard] },
  { path: 'addeditcustomreport/edit/:id', component: AddeditcustomreportComponent },
  { path: 'customreportview/:id', component: CustomreportviewComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolgenreportRoutingModule { }

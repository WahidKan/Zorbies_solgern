import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesappointmentlistComponent } from './servicesappointmentlist.component';
import { ViewservicesappointmentComponent } from './viewservicesappointment.component';
import { AddeditservicesappointmentComponent } from './addeditservicesappointment.component';
import { ServicesappointmentMapViewComponent } from './servicesappointmentmapview.component';
import { ManagequestionnaireComponent } from './managequestionnaire/managequestionnaire.component';
import { ManagequestionnaireListComponent } from './managequestionnaire/managequestionnaire-list.component';
import { AuthGuard } from '../../auth/auth.guard';
import { ServiceappointmenreportlistComponent } from '../solgenreport/serviceappointmentreport/serviceappointmentreportlist.component';

const routes: Routes = [
  { path: '', component: ServicesappointmentlistComponent, canActivate: [AuthGuard]},
  { path: 'addeditservicesappointment', component: AddeditservicesappointmentComponent, canActivate: [AuthGuard]},
  { path: 'addeditservicesappointment/:id', component: AddeditservicesappointmentComponent, canActivate: [AuthGuard] },
  { path: 'map', component: ServicesappointmentMapViewComponent, canActivate: [AuthGuard] },
  { path: 'view/:id', component: ViewservicesappointmentComponent, canActivate: [AuthGuard]},
  { path: 'serviceappointment', component: ServicesappointmentlistComponent, canActivate: [AuthGuard]},
  // { path: 'managequestionnaire/:id', component: ManagequestionnaireComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesappointmentRoutingModule { }

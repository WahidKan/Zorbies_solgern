import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceresourselistComponent } from './serviceresourselist.component';
import { AddeditresourseserviceComponent } from './addeditresourseservice.component';
import { ServiceresourceviewComponent } from './serviceresourceview.component';
import { AuthGuard } from '../../auth/auth.guard';



const routes: Routes = [
  { path: '', component: ServiceresourselistComponent, canActivate: [AuthGuard] },
  { path: 'addserviceresource', component: AddeditresourseserviceComponent, canActivate: [AuthGuard], data: { privilegeCode: 'SERVICERESOURCEADD' } },
  { path: 'editserviceresource/:id', component: AddeditresourseserviceComponent, canActivate: [AuthGuard], data: { privilegeCode: 'SERVICERESOURCEUPDATE' } },
  { path: 'view/:id', component: ServiceresourceviewComponent, canActivate: [AuthGuard] }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceresourceRoutingModule { }

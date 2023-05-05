import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignationlistComponent } from './designationlist.component';
import { DesignationaddComponent } from './designationadd.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: DesignationlistComponent, canActivate: [AuthGuard]},
  { path: 'adddesignation', component: DesignationaddComponent, canActivate: [AuthGuard], data: { privilegeCode: 'DESIGNATIONADD' } },
  { path: 'editdesignation/:id', component: DesignationaddComponent, canActivate: [AuthGuard], data: { privilegeCode: 'DESIGNATIONUPDATE' } }
  
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationRoutingModule { }

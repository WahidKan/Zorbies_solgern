import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EditemployeeComponent } from './editemployee.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: EmployeeComponent, canActivate: [AuthGuard] },
  //{ path: 'addlead', component: LeadAddEditComponent },
  { path: 'edit/:id', component: EditemployeeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }  

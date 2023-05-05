import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditUserComponent } from './addedituser.component';
import { ListUsersComponent } from './listusers.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: ListUsersComponent, canActivate: [AuthGuard]},
  { path: 'adduser', component: AddEditUserComponent,  canActivate: [AuthGuard], data: { privilegeCode: 'UserAdd' }},
  { path: 'edituser/:id', component: AddEditUserComponent, canActivate: [AuthGuard], data: { privilegeCode: 'USERUPDATE' }} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

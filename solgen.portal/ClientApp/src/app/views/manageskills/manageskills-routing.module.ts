import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { ManageskillListComponent } from './manageskill-list.component';

const routes: Routes = [
  { path: '', component: ManageskillListComponent, canActivate: [AuthGuard] }//,
  //{ path: 'addManageskills', component: ManageskillsAddEditComponent, canActivate: [AuthGuard], data: { privilegeCode: 'AddManageskills' } }//,
  //{ path: 'edituser/:id', component: AddEditUserComponent, canActivate: [AuthGuard], data: { privilegeCode: 'USERUPDATE' } }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ManageskillsRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StateManagementComponent } from './state-management.component';
import { StageconfigComponent } from '../loanapplication/stageconfiguration/stageconfig.component';
import { AddEditstatemanagementComponent } from './add-editstatemanagement.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [

  { path: '', component: StateManagementComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddEditstatemanagementComponent, canActivate: [AuthGuard]},

];
@NgModule({   
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})   
export class StatemanagementroutingModule { }

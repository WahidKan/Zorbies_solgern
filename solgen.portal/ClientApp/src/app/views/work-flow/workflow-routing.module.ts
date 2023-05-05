import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkFlowComponent } from './work-flow.component';
import { WorkflowAddEditComponent } from './workflow-add-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: WorkFlowComponent, canActivate: [AuthGuard]},
  { path: 'add-flow', component: WorkflowAddEditComponent, canActivate: [AuthGuard]},
  {
    path: 'edit/:id', component: WorkflowAddEditComponent, canActivate: [AuthGuard]  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowRoutingModule { }

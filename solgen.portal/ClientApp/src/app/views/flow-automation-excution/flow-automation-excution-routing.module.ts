import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { PendingChangesGuard } from '../flow-builder/pending-changes-guard';
import { FlowAutomationExecutionViewComponent } from './flow-automation-execution-view/flow-automation-execution-view.component';
import { ScreenExecutionComponent } from './screen-execution/screen-execution.component';


const routes: Routes = [
  { path: 'execution/:id/:id2', component: FlowAutomationExecutionViewComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowAutomationExcutionRoutingModule { }

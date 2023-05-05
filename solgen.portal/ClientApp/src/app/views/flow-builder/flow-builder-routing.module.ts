import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { AutomationFlowListComponent } from './automation-flow-list/automation-flow-list.component';
import { FlowBuilderViewComponent } from './flow-builder-view/flow-builder-view.component';
import { PendingChangesGuard } from './pending-changes-guard';


const routes: Routes = [
  { path: '', component: AutomationFlowListComponent, canActivate: [AuthGuard] },
  { path: 'add', component: FlowBuilderViewComponent, canActivate: [AuthGuard], canDeactivate: [PendingChangesGuard] },
  { path: 'edit/:id', component: FlowBuilderViewComponent, canActivate: [AuthGuard], canDeactivate: [PendingChangesGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  
  exports: [RouterModule]
})
export class FlowBuilderRoutingModule { }

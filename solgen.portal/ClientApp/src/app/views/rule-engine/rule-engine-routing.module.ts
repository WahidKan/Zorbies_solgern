import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RuleEngineAddOrEditComponent } from './rule-engine-add-or-edit.component';
import { RuleEngineListComponent } from './rule-engine-list.component';
import { RuleEngineSummaryComponent } from './rule-engine-summary.component';

import { AuthGuard } from '../../auth/auth.guard';
const routes: Routes = [
  { path: '', component: RuleEngineListComponent, canActivate: [AuthGuard], data: { title: 'Rule Engine' } },
  { path: 'add-rule', component: RuleEngineAddOrEditComponent, canActivate: [AuthGuard], data: { title: 'Add Rule Engine' } },
  {
    path: 'edit/:id', component: RuleEngineAddOrEditComponent, canActivate: [AuthGuard], data: { title: 'Edit Rule Engine' }
  },
  {
    path: 'summary', component: RuleEngineSummaryComponent, canActivate: [AuthGuard], data: { title: 'Rule Engine Summary' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RuleEngineRoutingModule { }

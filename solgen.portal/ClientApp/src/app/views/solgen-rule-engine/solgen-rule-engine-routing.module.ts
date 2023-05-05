import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SolgenRuleEngineAddOrEditComponent } from "./solgen-rule-engine-add-or-edit.component";
import { SolgenRuleEngineListComponent } from "./solgen-rule-engine-list.component";
import { SolgenRuleEngineSummaryComponent } from "./solgen-rule-engine-summary.component";
import { AuthGuard } from '../../auth/auth.guard';
import { RuleEngineFormulListComponent } from "./rule-engine-formul-list/rule-engine-formul-list.component";


const routes: Routes = [
  { path: '', component: SolgenRuleEngineListComponent, canActivate: [AuthGuard], data: { title: 'Rule Engine' } },
  { path: 'RuleEngineFormula-list', component: RuleEngineFormulListComponent, canActivate: [AuthGuard], data: { title: 'Rule Engine Formula' } },
  { path: 'add-rule', component: SolgenRuleEngineAddOrEditComponent, canActivate: [AuthGuard], data: { title: 'Add Rule Engine' } },
    {
      path: 'edit/:id', component: SolgenRuleEngineAddOrEditComponent, canActivate: [AuthGuard], data: { title: 'Edit Rule Engine' }
    },
    {
      path: 'view/:vwRuleId', component: SolgenRuleEngineAddOrEditComponent, canActivate: [AuthGuard], data: { title: 'View Rule Engine' }
    },
    {
      path: 'summary', component: SolgenRuleEngineSummaryComponent, canActivate: [AuthGuard], data: { title: 'Rule Engine Summary' }
    },
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class SolgenRuleEngineRoutingModule { }

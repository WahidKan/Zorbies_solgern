import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SettingRuleEngineAddOrEditComponent } from "./setting-rule-engine-add-or-edit.component";
import { SettingRuleEngineListComponent } from "./setting-rule-engine-list.component";
import { SettingRuleEngineSummaryComponent } from "./setting-rule-engine-summary.component";
import { AuthGuard } from '../../auth/auth.guard';


const routes: Routes = [
  { path: '', component: SettingRuleEngineListComponent, canActivate: [AuthGuard], data: { title: 'Rule Engine' } },
  { path: 'add-rule', component: SettingRuleEngineAddOrEditComponent, canActivate: [AuthGuard], data: { title: 'Add Rule Engine' } },
    {
      path: 'edit/:id', component: SettingRuleEngineAddOrEditComponent, canActivate: [AuthGuard], data: { title: 'Edit Rule Engine' }
    },
    {
      path: 'summary', component: SettingRuleEngineSummaryComponent, canActivate: [AuthGuard], data: { title: 'Rule Engine Summary' }
    },
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class SettingRuleEngineRoutingModule { }

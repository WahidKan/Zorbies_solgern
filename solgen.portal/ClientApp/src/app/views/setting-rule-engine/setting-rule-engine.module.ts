import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SettingRuleEngineRoutingModule } from './setting-rule-engine-routing.module';
import { SettingRuleEngineConditionComponent } from './component/setting-rule-engine-condition.component';
import { SettingRuleEngineTargetComponent } from './component/setting-rule-engine-target.component';
import { SettingRuleEngineResultComponent } from './component/setting-rule-engine-result.component';
import { SettingRuleEngineResultTableFieldComponent } from './component/setting-rule-engine-result-table-field.component';
import { SettingRuleEngineResultCalculationComponent } from './component/setting-rule-engine-result-calculation.component';
import { SettingRuleEngineAddOrEditComponent } from './setting-rule-engine-add-or-edit.component';
import { SettingRuleEngineListComponent } from './setting-rule-engine-list.component';
import { SettingRuleEngineSummaryComponent } from './setting-rule-engine-summary.component';

@NgModule({
  declarations: [SettingRuleEngineConditionComponent, 
    SettingRuleEngineTargetComponent, 
    SettingRuleEngineResultComponent, 
    SettingRuleEngineResultTableFieldComponent, 
    SettingRuleEngineResultCalculationComponent, 
    SettingRuleEngineAddOrEditComponent, 
    SettingRuleEngineListComponent, 
    SettingRuleEngineSummaryComponent],
  imports: [
    CommonModule,
    SettingRuleEngineRoutingModule,     
    SharedModule,
    ModalModule.forRoot()
  ]
})
export class SettingRuleEngineModule { }

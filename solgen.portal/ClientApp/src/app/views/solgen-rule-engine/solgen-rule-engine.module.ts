import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SolgenRuleEngineRoutingModule } from './solgen-rule-engine-routing.module';
import { SolgenRuleEngineTargetComponent } from './component/solgen-rule-engine-target.component';
import { SolgenRuleEngineResultComponent } from './component/solgen-rule-engine-result.component';
import { SolgenRuleEngineResultTableFieldComponent } from './component/solgen-rule-engine-result-table-field.component';
import { SolgenRuleEngineResultCalculationComponent } from './component/solgen-rule-engine-result-calculation.component';
import { SolgenRuleEngineAddOrEditComponent } from './solgen-rule-engine-add-or-edit.component';
import { SolgenRuleEngineListComponent } from './solgen-rule-engine-list.component';
import { SolgenRuleEngineSummaryComponent } from './solgen-rule-engine-summary.component';
import { SolgenRuleConditionCalculationComponent } from './component/solgen-rule-condition-calculation.component';
import { SolgenRuleEngineConditionComponent } from './component/solgen-rule-engine-condition.component';
import { SolgenRuleEngineCustomFormulaComponent } from './solgen-rule-engine-custom-formula/solgen-rule-engine-custom-formula.component';
import { RuleEngineFormulListComponent } from './rule-engine-formul-list/rule-engine-formul-list.component';

@NgModule({
  declarations: [
    SolgenRuleEngineListComponent,
    SolgenRuleEngineConditionComponent,
    SolgenRuleEngineTargetComponent,
    SolgenRuleEngineResultComponent,
    SolgenRuleEngineResultTableFieldComponent,
    SolgenRuleEngineResultCalculationComponent,
    SolgenRuleEngineAddOrEditComponent,
    SolgenRuleEngineSummaryComponent, SolgenRuleConditionCalculationComponent, SolgenRuleEngineCustomFormulaComponent, RuleEngineFormulListComponent],
  imports: [
    CommonModule,
    SolgenRuleEngineRoutingModule,
    SharedModule,
    ModalModule.forRoot()
  ]
})
export class SolgenRuleEngineModule { }

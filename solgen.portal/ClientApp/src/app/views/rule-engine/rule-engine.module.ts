import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuleEngineRoutingModule } from './rule-engine-routing.module';
import { RuleEngineListComponent } from './rule-engine-list.component';
import { RuleEngineAddOrEditComponent } from './rule-engine-add-or-edit.component';
import { RuleEngineTargetComponent } from './component/rule-engine-target.component';
import { RuleEngineResultComponent } from './component/rule-engine-result.component';
import { RuleEngineConditionComponent } from './component/rule-engine-condition.component';
import { SharedModule } from '../shared/shared.module';
import { RuleEngineResultTableFieldComponent } from './component/rule-engine-result-table-field.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RuleEngineSummaryComponent } from './rule-engine-summary.component'; 
import { RuleEngineResultCalculationComponent } from './component/rule-engine-result-calculation.component';

@NgModule({
  declarations: [RuleEngineListComponent,
    RuleEngineAddOrEditComponent,
    RuleEngineTargetComponent,
    RuleEngineResultComponent,
    RuleEngineConditionComponent,
    RuleEngineResultTableFieldComponent,
    RuleEngineSummaryComponent,
    RuleEngineResultCalculationComponent
  ],
  imports: [
    CommonModule,
    RuleEngineRoutingModule,     
    SharedModule,
    ModalModule
  ]
})
export class RuleEngineModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolgenQueueRoutingModule } from './solgen-queue-routing.module';
import { SolgenQueueListComponent } from './solgen-queue-list/solgen-queue-list.component';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SolgenAddEditQueueComponent } from './solgen-add-edit-queue/solgen-add-edit-queue.component';
import { SolgenQueueTargetComponent } from './components/solgen-queue-target/solgen-queue-target.component';
import { SolgenQueueConditionsComponent } from './components/solgen-queue-conditions/solgen-queue-conditions.component';
import { SolgenQueueResultsComponent } from './components/solgen-queue-results/solgen-queue-results.component';
import { SolgenQueueResultFieldsComponent } from './components/solgen-queue-result-fields/solgen-queue-result-fields.component';
import { SolgenQueueConditionCalculationsComponent } from './components/solgen-queue-condition-calculations/solgen-queue-condition-calculations.component';
import { SolgenQueueResultCalculationsComponent } from './components/solgen-queue-result-calculations/solgen-queue-result-calculations.component';
import { SolgenQueueCustomFormulaComponent } from './components/solgen-queue-custom-formula/solgen-queue-custom-formula.component'


@NgModule({
  declarations: [SolgenQueueListComponent, SolgenAddEditQueueComponent, SolgenQueueTargetComponent, SolgenQueueConditionsComponent, SolgenQueueResultsComponent, SolgenQueueResultFieldsComponent, SolgenQueueConditionCalculationsComponent, SolgenQueueResultCalculationsComponent, SolgenQueueCustomFormulaComponent],
  imports: [
    CommonModule,
    SolgenQueueRoutingModule,
    SharedModule,
    ModalModule.forRoot(),
  ]
})
export class SolgenQueueModule { }

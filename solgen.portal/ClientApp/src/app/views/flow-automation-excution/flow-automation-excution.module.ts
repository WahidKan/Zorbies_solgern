import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FlowAutomationExcutionRoutingModule } from './flow-automation-excution-routing.module';
import { FlowAutomationExecutionViewComponent } from './flow-automation-execution-view/flow-automation-execution-view.component';
import { ScreenExecutionComponent } from './screen-execution/screen-execution.component';
import { CalendarListModule } from '../calendar/calendarlist.module';


@NgModule({
  declarations: [FlowAutomationExecutionViewComponent, ScreenExecutionComponent],
  imports: [
    CommonModule,
    FlowAutomationExcutionRoutingModule,
    SharedModule,
    CalendarListModule
  ]
})
export class FlowAutomationExcutionModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkFlowTargetComponent } from './workflowmodels/work-flow-target.component';
import { WorkFlowResultComponent } from './workflowmodels/work-flow-result.component';
import { WorkFlowResultCalculationComponent } from './workflowmodels/work-flow-result-calculation.component';
import { WorkFlowConditionComponent } from './workflowmodels/work-flow-condition.component';
import { WorkflowAddEditComponent } from './workflow-add-edit.component';
import { WorkFlowComponent } from './work-flow.component';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { WorkflowRoutingModule } from './workflow-routing.module';
import { WorkFlowResultTableFieldComponent } from './workflowmodels/work-flow-result-table-field.component';
import { ScreenComponent } from './workflowmodels/screen.component';
import { WorkFlowDescisionComponent } from './workflowmodels/work-flow-descision.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { WorkFlowDeleteComponent } from './workflowmodels/work-flow-delete.component';
import { MappingpopupComponent } from './mappingpopup/mappingpopup.component'; 
@NgModule({
  declarations: [WorkFlowComponent, WorkflowAddEditComponent, WorkFlowTargetComponent, WorkFlowResultComponent, WorkFlowResultCalculationComponent, WorkFlowConditionComponent, WorkFlowResultTableFieldComponent, ScreenComponent, WorkFlowDescisionComponent, WorkFlowDeleteComponent, MappingpopupComponent],
  imports: [
    CommonModule,
    WorkflowRoutingModule,
    FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule, ModalModule
  ]
})
export class WorkflowModule { }

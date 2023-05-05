import { DialogAllModule } from '@syncfusion/ej2-angular-popups';

import { AccumulationChartModule } from '@syncfusion/ej2-angular-charts';

import { AccumulationAnnotationService, AccumulationDataLabelService, AccumulationLegendService, AccumulationTooltipService, ChartAllModule } from '@syncfusion/ej2-angular-charts';

import { DiagramAllModule, SymbolPaletteAllModule, OverviewAllModule } from '@syncfusion/ej2-angular-diagrams';

import { GridAllModule } from '@syncfusion/ej2-angular-grids';

import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';

import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';

import { CircularGaugeModule } from '@syncfusion/ej2-angular-circulargauge';

import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';

import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';

import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';

import { NumericTextBoxModule, ColorPickerModule, UploaderModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';

import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';

import { ButtonModule, CheckBoxModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';


import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';

import { CommonModule } from '@angular/common';
import { FlowBuilderRoutingModule } from './flow-builder-routing.module';
import { FlowBuilderViewComponent } from './flow-builder-view/flow-builder-view.component';
import { NgModule } from '@angular/core';
import { ScreenComponent } from './screen/screen.component';
import { ActionComponent } from './action/action.component';
import { SubflowComponent } from './subflow/subflow.component';
import { AssignComponent } from './assign/assign.component';
import { DecisionComponent } from './decision/decision.component';
import { LoopComponent } from './loop/loop.component';
import { SortComponent } from './sort/sort.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { GetComponent } from './get/get.component';
import { DeleteComponent } from './delete/delete.component';
import { RollbackComponent } from './rollback/rollback.component';
import { AutomationFlowListComponent } from './automation-flow-list/automation-flow-list.component';
import { FlowTypeSelectionComponent } from './flow-type-selection/flow-type-selection.component';
import { SaveModalComponent } from './save-modal/save-modal.component';
import { FilterComponent } from './filter/filter.component';
import { DragDropModule } from 'primeng/dragdrop';
import { ComponentVisiblityConditionComponent } from './component-visiblity-condition/component-visiblity-condition.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { ResourcesListComponent, AddEditResourceComponent } from './resources';
import { DecisionOutcomeMappingComponent } from './decision-outcome-mapping/decision-outcome-mapping.component';
import { LoopConnectorModalComponent } from './loop-connector-modal/loop-connector-modal.component';
import { PauseComponent } from './pause/pause.component';

@NgModule({
  declarations: [FlowBuilderViewComponent, ScreenComponent, ActionComponent, SubflowComponent, AssignComponent, DecisionComponent, LoopComponent, SortComponent, CreateComponent, UpdateComponent, GetComponent, DeleteComponent, RollbackComponent, AutomationFlowListComponent, FlowTypeSelectionComponent, SaveModalComponent, FilterComponent, ComponentVisiblityConditionComponent, DecisionOutcomeMappingComponent, ResourcesListComponent, AddEditResourceComponent, LoopConnectorModalComponent, PauseComponent],
  imports: [
    CommonModule,
    FlowBuilderRoutingModule,
    DiagramAllModule,
    ChartAllModule,
    GridAllModule,
    SymbolPaletteAllModule,
    OverviewAllModule,
    ButtonModule,
    ColorPickerModule,
    DateRangePickerModule,
    CheckBoxModule,
    AccumulationChartModule,
    ToolbarModule,
    DropDownButtonModule,
    UploaderModule,
    CircularGaugeModule,
    DropDownListAllModule,
    ListViewAllModule,
    DialogAllModule,
    TextBoxModule,
    RadioButtonModule,
    MultiSelectModule,
    NumericTextBoxModule,
    ModalModule,
    DragDropModule,
    SharedModule,
    CKEditorModule
  ],

  providers: []
})
export class FlowBuilderModule { }

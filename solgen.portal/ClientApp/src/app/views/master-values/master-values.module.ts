import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterValuesRoutingModule } from './master-values-routing.module';
import { AddEditMasterValuesComponent } from './add-edit-master-values/add-edit-master-values.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from 'primeng/dragdrop';
import { ColorPickerModule } from 'primeng/colorpicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [AddEditMasterValuesComponent],
  imports: [
    CommonModule,
    MasterValuesRoutingModule,
    SharedModule,
    ColorPickerModule,DragDropModule,
    FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule,
  ]
})
export class MasterValuesModule { }

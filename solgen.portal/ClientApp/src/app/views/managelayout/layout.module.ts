import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import { LayoutlistComponent } from './layoutlist.component';
import { AddeditlayoutComponent } from './addeditlayout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { DragDropModule } from 'primeng/components/dragdrop/dragdrop';
import { ColorPickerModule } from 'primeng/colorpicker';
import {OrderListModule} from 'primeng/orderlist';

@NgModule({
  declarations: [AddeditlayoutComponent, LayoutlistComponent],
  imports: [
    CommonModule, ColorPickerModule,
    LayoutRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, DragDropModule, OrderListModule,NgxDatatableModule, SharedModule, ModalModule
  ]
})
export class LayoutModule { }

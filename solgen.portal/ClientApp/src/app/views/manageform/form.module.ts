import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AddeditformComponent } from './addeditform.component';
import { PropertiespopupformComponent } from './viewpopupwindowform/propertiespopupform.component';
import { FormRoutingModule } from './form-routing.module';
import { DragDropModule } from 'primeng/components/dragdrop/dragdrop';
import { ColorPickerModule } from 'primeng/colorpicker';
import {OrderListModule} from 'primeng/orderlist';
import { FormlistComponent } from './formlist.component';

@NgModule({
  declarations: [AddeditformComponent, FormlistComponent, PropertiespopupformComponent],
  imports: [
    CommonModule, ColorPickerModule,
    FormRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, DragDropModule, OrderListModule,NgxDatatableModule, SharedModule, ModalModule
  ]
})
export class FormModule { }

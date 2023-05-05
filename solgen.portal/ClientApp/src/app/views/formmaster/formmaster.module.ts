import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormmasterRoutingModule } from './formmaster-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared/shared.module';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { FormmasterlistComponent } from './formmasterlist.component';
import { FormmasterComponent } from './formmaster.component';
import { FormbuilderComponent } from './formbuilder.component';
import { OrderListModule } from 'primeng/orderlist';
import { DragDropModule } from 'primeng/components/dragdrop/dragdrop';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  declarations: [FormmasterlistComponent, FormmasterComponent, FormbuilderComponent],
  imports: [
    CommonModule, ModalModule, ColorPickerModule, DragDropModule,FormmasterRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, SharedModule, OrderListModule,NgxPasswordToggleModule
  ]
})
export class FormmasterModule { }

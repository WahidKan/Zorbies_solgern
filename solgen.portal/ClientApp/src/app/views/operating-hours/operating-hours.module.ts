import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OperatingHoursRoutingModule } from './operating-hours-routing.module';
import { OperatingHoursListComponent } from './operating-hours-list/operating-hours-list.component';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DragDropModule } from 'primeng/components/dragdrop/dragdrop';
import { OrderListModule } from 'primeng/orderlist';
//import { SharedModule } from 'primeng/primeng';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { OperatingHoursViewComponent } from './operating-hours-view/operating-hours-view.component';
import { AddEditOperatingHourModalComponent } from './add-edit-operating-hour-modal/add-edit-operating-hour-modal.component';



@NgModule({
  declarations: [OperatingHoursListComponent, OperatingHoursViewComponent, AddEditOperatingHourModalComponent],
  imports: [
    CommonModule,
    OperatingHoursRoutingModule,
    ColorPickerModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    DragDropModule,
    OrderListModule,
    SharedModule,
    ModalModule,
  ],
  providers: [DatePipe],
})
export class OperatingHoursModule {}

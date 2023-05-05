import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkorderComponent } from './workorder.component';
import { WorkOrderRoutingModule } from './workorder-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ManageworkorderComponent } from './manageworkorder.component';
import { ViewworkorderComponent } from './viewworkorder.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { RequirementsModule } from '../requirementslist/requirements.module';


import { WorkOrderLineItemPopupComponent } from './work-order-line-item-popup/work-order-line-item-popup.component';



@NgModule({
  declarations: [WorkorderComponent, ManageworkorderComponent, ViewworkorderComponent, WorkOrderLineItemPopupComponent],
  imports: [
    CommonModule,
    WorkOrderRoutingModule,
    CarouselModule,
    RequirementsModule,
 
    FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule, ModalModule
  ]
})
export class WorkorderModule { }

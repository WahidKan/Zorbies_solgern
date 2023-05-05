import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddeditqueueComponent } from './addeditqueue.component';
import { QueuelistComponent } from './queuelist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { QueueRoutingModule } from './queue-routing.module';
import { OrderListModule } from 'primeng/orderlist';
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [AddeditqueueComponent, QueuelistComponent],
  imports: [
    CommonModule, QueueRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule, OrderListModule, ModalModule
  ]
})
export class QueueModule { }

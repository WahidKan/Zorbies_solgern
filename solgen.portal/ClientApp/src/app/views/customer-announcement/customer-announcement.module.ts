import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerAnnouncementRoutingModule } from './customer-announcement-routing.module';
import { CustomerAnnouncementComponent } from './customer-announcement/customer-announcement.component';
import { CustomerAnnouncementListComponent } from './customer-announcement-list/customer-announcement-list.component';



@NgModule({
  declarations: [CustomerAnnouncementComponent, CustomerAnnouncementListComponent],
  imports: [
    CommonModule,
    CustomerAnnouncementRoutingModule,
    SharedModule,
    ModalModule,
    NgxDatatableModule
  ]
})
export class CustomerAnnouncementModule { }

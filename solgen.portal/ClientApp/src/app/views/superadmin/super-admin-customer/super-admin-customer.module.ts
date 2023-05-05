import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminCustomerRoutingModule } from './super-admin-customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { AddEditCustomerComponent } from './add-edit-customer/add-edit-customer.component';
import { ContactPersonComponent } from './contact-person/contact-person.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RemarksComponent } from './remarks/remarks.component';
import { RecentActivitiesComponent } from './recent-activities/recent-activities.component';


@NgModule({
    declarations: [CustomerListComponent, AddEditCustomerComponent, ViewCustomerComponent, ContactPersonComponent, RemarksComponent, RecentActivitiesComponent],
  imports: [
    CommonModule,
    SuperAdminCustomerRoutingModule,
    SharedModule,
    ModalModule,

  ]
})
export class SuperAdminCustomerModule { }

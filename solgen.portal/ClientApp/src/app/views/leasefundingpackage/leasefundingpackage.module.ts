import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SharedModule } from '../shared/shared.module';
import { LeaseFundingPackageRoutingModule } from './leasefundingpackage-routing.module';
import { LeasefundingpackagelistService } from './leasefundingpackagelist.service';
import { LeasefundingpackagelistComponent } from './leasefundingpackagelist.component';
import { LeasefundingpackagedetailComponent } from './leasefundingpackageview/leasefundingpackagedetail.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LeaseFundingStatusDetailComponent } from './lease-funding-status-detail/lease-funding-status-detail.component';

@NgModule({
  declarations: [
    LeasefundingpackagelistComponent,
    LeasefundingpackagedetailComponent,
    LeaseFundingStatusDetailComponent
  ],
  imports: [
    CommonModule,
    LeaseFundingPackageRoutingModule,
    SharedModule, ModalModule
  ],
  providers: [
    LeasefundingpackagelistService
  ]
})
export class LeaseFundingPackageModule { }

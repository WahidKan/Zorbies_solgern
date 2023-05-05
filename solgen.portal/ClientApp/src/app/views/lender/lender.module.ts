import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LenderlistComponent } from './lenderlist.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared/shared.module';
import { LeadlistComponent } from '../lead/leadlist.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LenderRouting } from './lenderrouting.module';
import { AddlenderComponent } from './addlender.component';
import { DocumentmappingComponent } from './documentmapping/documentmapping.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { DataRoutingComponent } from './data-routing/data-routing.component';
import { RoutingDeliveryComponent } from './routing-delivery/routing-delivery.component';


@NgModule({
  declarations: [LenderlistComponent, AddlenderComponent, DocumentmappingComponent, UploadDocumentComponent, DataRoutingComponent, RoutingDeliveryComponent],
  imports: [
    CommonModule,
    LenderRouting,
    FormsModule, ReactiveFormsModule, NgSelectModule, SharedModule, ModalModule
  ],
  exports: [
    DocumentmappingComponent, UploadDocumentComponent, DataRoutingComponent, RoutingDeliveryComponent
  ]
})
export class LenderModule {

  constructor() {
    
  }
}

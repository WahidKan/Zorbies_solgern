import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ModalModule } from 'ngx-bootstrap/modal';
import { UploaddocsComponent } from './uploaddocs.component';
import { SharedModule } from '../shared/shared.module';
import { UploaddocsRoutingModule } from './uploaddocs-routing.module';
import { CustomerDocumentsComponent } from './customer-documents/customer-documents.component';

@NgModule({
  declarations: [UploaddocsComponent, CustomerDocumentsComponent],
 
   imports: [
     CommonModule, UploaddocsRoutingModule, FormsModule, SharedModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule,
    ModalModule
  ]//,
  //exports: [UploaddocsComponent]
})
export class UploaddocsModule { }

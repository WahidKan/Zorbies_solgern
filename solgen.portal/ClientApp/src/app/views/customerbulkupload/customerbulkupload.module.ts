import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulkuploadComponent } from './bulkupload.component';
import { CustomerbulkuploadRoutingModule } from './customerbulkupload-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [BulkuploadComponent],
  imports: [
    CommonModule,
    CustomerbulkuploadRoutingModule,
    SharedModule, ModalModule
  ]
})
export class CustomerbulkuploadModule { }

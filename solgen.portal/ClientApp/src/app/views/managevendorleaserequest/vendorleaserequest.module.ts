import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { VendorLeaseRequestRoutingModule } from './vendorleaserequest-routing.module';
import { VendorleaserequestlistService } from './vendorleaserequestlist.service';
import { VendorleaserequestlistComponent } from './vendorleaserequestlist.component';
import { UploaddovendordocumentComponent } from './uploaddovendordocument.component';
import { VendorrequestdetailComponent } from './vendorrequestdetail/vendorrequestdetail.component';

@NgModule({
  declarations: [
    VendorleaserequestlistComponent,
    UploaddovendordocumentComponent,
    VendorrequestdetailComponent,
  ],
  imports: [
    CommonModule,
    VendorLeaseRequestRoutingModule,
    SharedModule, ModalModule
  ],
  providers: [
    VendorleaserequestlistService
  ]
})
export class VendorLeaseRequestModule { }

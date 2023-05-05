import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared/shared.module';
import { InsurancerequestlistComponent } from './insurancerequestlist.component';
import { InsuranceRequestRoutingModule } from './insurancerequest-routing.module';
import { InsurancerequestdetailComponent } from './insurancerequestdetail/insurancerequestdetail.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [InsurancerequestlistComponent,
    InsurancerequestdetailComponent,],
  imports: [
    CommonModule,
    InsuranceRequestRoutingModule,
    SharedModule, ModalModule
  ]
})
export class InsuranceRequestModule { }

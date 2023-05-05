import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddeditcontractComponent } from './addeditcontract.component';
import { ContractlistComponent } from './contractlist.component';
import { ContractRoutingModule } from './contract-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { ViewContractComponent } from './viewcontract.component';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  declarations: [ContractlistComponent, AddeditcontractComponent, ViewContractComponent],
  imports: [
    CKEditorModule, CommonModule, ContractRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule, ModalModule,
  ]
})
export class ContractModule { }

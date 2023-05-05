import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';
//import { ListbankComponent } from './listbank.component';
//import { AddeditbankComponent } from './addeditbank.component';
import { SharedModule } from '../shared/shared.module';
import { AccountslistComponent } from './accountslist.component';
import { InternalAccountRoutingModule } from './internalaccount-routing.module';
import { AddeditaccountsComponent } from './addeditaccounts.component';
import { AccountviewdetailComponent } from './accountviewdetail.component';
import { AccountviewdetailNewComponent } from './accountviewdetailNew.component';
import { LenderModule } from '../lender/lender.module';
import { RequirementsModule } from '../requirementslist/requirements.module';
import { accountJurisdiction } from './JurisdictionPopup/AccountJurisdictioncomponent';





@NgModule({
  declarations: [accountJurisdiction,AccountslistComponent, AddeditaccountsComponent, AccountviewdetailComponent, AccountviewdetailNewComponent],  
  imports: [
    CommonModule, 
    InternalAccountRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule
    , LenderModule, ModalModule,RequirementsModule,

  ]
  ,
  exports:[accountJurisdiction]
})
export class InternalAccountModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceRequestComponent } from './service-request/service-request.component';
import { TotalContractsComponent } from './total-contracts/total-contracts.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { SignedLoanDocumentComponent } from './signed-loan-document/signed-loan-document.component';
import { SettingsComponent } from './settings/settings.component';
import { RouterModule } from '@angular/router';
import { MobileRoutingModule } from './mobile-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import { LayoutModule } from 'src/app/layout/layout.module';
import { LoanApplicationModule } from '../loanapplication/loanapplication.module';
import { DashboardModule } from '../dashboard/dashboard.module';


@NgModule({
  declarations: [ServiceRequestComponent, TotalContractsComponent, DocumentUploadComponent, SignedLoanDocumentComponent, SettingsComponent],
  imports: [
    CommonModule,
    RouterModule,
    MobileRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    CommonModule,
    FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule, ModalModule ,LayoutModule,LoanApplicationModule,DashboardModule
 
  ]
})
export class MobileModule { }

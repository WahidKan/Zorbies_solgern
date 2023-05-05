import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageleaseRoutingModule } from './managelease-routing.module';
import { ManageleaseComponent } from './managelease.component';
import { AddeditleaseComponent } from './addeditlease.component';
import { SharedModule } from '../shared/shared.module';
import { InprogressleaseComponent } from './inprogresslease/inprogresslease.component';
import { ApprovedleaseComponent } from './approvedlease/approvedlease.component';
import { LeasedetailComponent } from './leasedetail/leasedetail.component';
import { LeasecontactdocsComponent } from './leasecontactdocs/leasecontactdocs.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LeasedocsComponent } from './leasedocs/leasedocs.component';
import { LeasereviewdocsComponent } from './leasereviewdocs/leasereviewdocs.component';
import { GenerateleasedocsComponent } from './generateleasedocs/generateleasedocs.component';
import { BankapprovalComponent } from './bankApproval/bankapproval.component';
import { GenerateleaseformComponent } from './generateleaseform/generateleaseform.component';
import { docpdfforwetsigComponent } from './docpdfforwetsig/docpdfforwetsig.component';
import { AddeditleaserequestComponent } from './leaserequest/addeditleaserequest.component';
import { ManagleaserequestlistComponent } from './leaserequest/managleaserequestlist.component';
import { LeasedocspdfviewComponent } from './leasedocspdfview/leasecontactdocs.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FundingpackagetobankComponent } from './fundingpackage/fundingpackagetobank.component';
import { TitleworkrequestComponent } from './titleworkrequest/titleworkrequest.component';
import { DocumentuploadedComponent } from './leasedocumentforuploaded/documentuploaded.component';
import { LeaseapproveforpurchasedetailComponent } from './leaseapproveforpurchasedetail/leaseapproveforpurchasedetail.component';
import { CreditscoredetailComponent } from './creditscoredetail/creditscoredetail.component';
import { UploadDocuSignComponent } from './upload-docu-sign/upload-docu-sign.component';
import { PrepareUccFillingComponent } from './prepare-ucc-filling/prepare-ucc-filling.component';
import { UpdateLeaseStatusComponent } from './update-lease-status/update-lease-status.component';
import { LeaseformoldComponent } from './leaseformold/leaseformold.component';
@NgModule({
  declarations: [
    ManageleaseComponent,
    AddeditleaseComponent, InprogressleaseComponent,
    ApprovedleaseComponent, LeasecontactdocsComponent, LeasedetailComponent, LeasedocsComponent, LeasereviewdocsComponent, GenerateleaseformComponent, GenerateleasedocsComponent, BankapprovalComponent, docpdfforwetsigComponent, AddeditleaserequestComponent, ManagleaserequestlistComponent, LeasedocspdfviewComponent, FundingpackagetobankComponent, TitleworkrequestComponent, DocumentuploadedComponent,
    LeaseapproveforpurchasedetailComponent, UploadDocuSignComponent, CreditscoredetailComponent, PrepareUccFillingComponent, UpdateLeaseStatusComponent, LeaseformoldComponent
  ],
  imports: [
    CommonModule,
    ManageleaseRoutingModule, PdfViewerModule,
    SharedModule, ModalModule.forRoot()
  ]
})
export class ManageleaseModule { }

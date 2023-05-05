import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddeditproposalComponent } from './addeditproposal.component';
import { ProposallistComponent } from './proposallist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { ProposalRoutingModule } from './proposal-routing.module';
import { ProposalviewComponent } from './proposalview.component';
import { ProposallineitempopupComponent } from './productlineitempopup/proposallineitempopup.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PricebooklistpopupComponent } from './pricebooklistpopup/pricebooklistpopup.component';
import { ViewProposalNewComponent } from './viewProposalNew.component';
import { SendEmailTestComponent } from './send-email-test/send-email-test.component';
import { CKEditorModule } from 'ng2-ckeditor';
@NgModule({
  declarations: [AddeditproposalComponent, ProposallistComponent, ProposalviewComponent, ProposallineitempopupComponent,
    PricebooklistpopupComponent, ViewProposalNewComponent, SendEmailTestComponent],
  imports: [
    CKEditorModule, CommonModule, ProposalRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule, ModalModule
  ]
})
export class ProposalModule { }

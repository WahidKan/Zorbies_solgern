import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
//import { BankRoutingModule } from './bank-routing.module';
//import { ListbankComponent } from './listbank.component';
//import { AddeditbankComponent } from './addeditbank.component';
import { SharedModule } from '../shared/shared.module';
import { LoanApplicationRoutingModule } from './loanapplication-routing.module';
import { LoanapplicationlistComponent } from './loanapplicationlist.component';
import { LoanapplicationdetailComponent } from './loanapplicationdetail.component';
import { LoanapplicationpopupComponent } from './loanapplicationpopup/loanapplicationpopup.component';
import { ModalModule } from 'ngx-bootstrap';
//import { CoapplicantdetailComponent } from './coapplicantdetail/coapplicantdetail/coapplicantdetail.component';

import { CbilscoreComponent } from './cbilscore/cbilscore.component';
import { OrderListModule } from 'primeng/orderlist';
import { SystemInfoComponent } from './systeminfo/systeminfo.component';
import { InstallationpropertyComponent } from './installationproperty/installationproperty.component';
import { ApplicantComponent } from './applicant/applicant.component';
import { InstallerrepComponent } from './installerrep/installerrep.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { DealdataComponent } from './dealdata/dealdata.component';
import { CoapplicantComponent } from './coapplicant/coapplicant.component';
//import { CarouselModule } from 'ngx-owl-carousel-o';
import { StageinfoComponent } from './stageinfo/stageinfo.component';
import { CoapplicantdetailComponent } from './coapplicantdetail/coapplicantdetail.component';
import { PaymentinfoComponent } from './paymentinfo/paymentinfo.component';
import { LoanProductComponent } from './loan-product/loan-product.component';
import { ViewProductInfoComponent } from './view-product-info/view-product-info.component';
import { NtpComponent } from './ntp/ntp.component';
import { ExpansesComponent } from './expanses/expanses.component';
import { ReleasefundsComponent } from './releasefunds/releasefunds.component';
import { NotificationpopupComponent } from './notifications/notificationpopup/notificationpopup.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormInfoComponent } from './Common/forminfo.component';
import { CommenthistoryComponent } from './commenthistory/commenthistory.component';
import { AddcommenthistoryComponent } from './commenthistory/addmorecommenthistory/addcommenthistory.component';
import { RuleenginehistoryComponent } from './ruleEngineHistory/ruleenginehistory.component';
import { FollowUpPopupComponent } from './commenthistory/followuppopup/followuppopup.component';
import { SliderModule } from 'primeng/slider';
import { ChartModule } from 'primeng/chart';
import { NotesComponent } from './notes/notes.component';
import { DownloaddocumentComponent } from './downloaddocument/downloaddocument.component';
import { LoandocsComponent } from './loandocs/loandocs.component';
import { SendmailpopupComponent } from './loandocs/sendmailpopup/sendmailpopup.component';
import { AssigneduserlistComponent } from './commenthistory/assigneduserlist/assigneduserlist.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { LoanapplicationpendingdocumentComponent } from './loanapplicationpendingdoc/loanapplicationpendingdocument.component';
import { CanceledloanapplciationComponent } from './canceledloanapplciation/canceledloanapplciation.component';
import { CreditReportComponent } from './credit-report/credit-report.component';
import { ApplicationverificationComponent } from './applicationverification/applicationverification.component';
import { BankverificationComponent } from './bankverification/bankverification.component';
import { BankapplicantinfoComponent } from './bankapplicantinfo/bankapplicantinfo.component';
import { CustomHttpParamEncoder } from '../../services/customHttpParamEncoder ';
import { StageconfigComponent } from './stageconfiguration/stageconfig.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { NewLoanApplicationListComponent } from './new-loan-application-list/new-loan-application-list.component';
import { UtcToPstDatePipe } from '../../pipes/utctolocal.pipe';
import { CompletedLoanApplicationComponent } from './completed-loan-application/completed-loan-application.component';
import { ChangeorderComponent } from './changeorder/changeorder.component';
import { NtpchangeorderComponent } from './ntpchangeorder/ntpchangeorder.component';
import { TransferloanapplicationComponent } from './transferloanapplication/transferloanapplication.component';
import { TranfertodealerComponent } from './tranfertodealer/tranfertodealer.component';
import { PropertysearchComponent } from './propertysearch/propertysearch.component';
import { MasstransferComponent } from './masstransfer/masstransfer.component';
import { SFTPLogsComponent } from './sftplogs/sftplogs.component';



@NgModule({
    
  declarations: [RuleenginehistoryComponent, LoanapplicationlistComponent, LoanapplicationdetailComponent, FormInfoComponent, LoanapplicationpopupComponent, CoapplicantdetailComponent, CbilscoreComponent, SystemInfoComponent, InstallationpropertyComponent, ApplicantComponent, InstallerrepComponent, NotificationsComponent, DealdataComponent, CoapplicantComponent, StageinfoComponent, PaymentinfoComponent, LoanProductComponent, ViewProductInfoComponent, NtpComponent, ExpansesComponent, ReleasefundsComponent, NotificationpopupComponent, CommenthistoryComponent, AddcommenthistoryComponent, FollowUpPopupComponent, NotesComponent, DownloaddocumentComponent, LoandocsComponent, SendmailpopupComponent, AssigneduserlistComponent, FileuploadComponent, LoanapplicationpendingdocumentComponent, CanceledloanapplciationComponent, CreditReportComponent, ApplicationverificationComponent, BankverificationComponent, BankapplicantinfoComponent, StageconfigComponent, NewLoanApplicationListComponent, CompletedLoanApplicationComponent, ChangeorderComponent, NtpchangeorderComponent, TransferloanapplicationComponent, TranfertodealerComponent, PropertysearchComponent, MasstransferComponent, SFTPLogsComponent],
  imports: [
    CommonModule, OrderListModule,
    LoanApplicationRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule,
    SharedModule, ModalModule.forRoot(), CKEditorModule, SliderModule, ChartModule, NgxJsonViewerModule
  ],
  exports: [StageinfoComponent, SystemInfoComponent, LoandocsComponent,SendmailpopupComponent, ApplicantComponent, FormInfoComponent, ExpansesComponent, NtpComponent, ReleasefundsComponent, CommenthistoryComponent, AddcommenthistoryComponent,FileuploadComponent]
  , providers: [CustomHttpParamEncoder, UtcToPstDatePipe]

})
export class LoanApplicationModule {

}

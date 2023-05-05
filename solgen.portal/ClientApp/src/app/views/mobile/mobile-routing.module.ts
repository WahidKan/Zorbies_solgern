import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { ServiceRequestComponent } from './service-request/service-request.component';
import { SettingsComponent } from './settings/settings.component';
import { SignedLoanDocumentComponent } from './signed-loan-document/signed-loan-document.component';
import { TotalContractsComponent } from './total-contracts/total-contracts.component';
const routes: Routes = [
  { path: 'service-request', component: ServiceRequestComponent},
  { path: 'total-contracts', component: TotalContractsComponent},
  { path: 'document-upload', component: DocumentUploadComponent},
  { path: 'signed-loan-document', component: SignedLoanDocumentComponent},
  { path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
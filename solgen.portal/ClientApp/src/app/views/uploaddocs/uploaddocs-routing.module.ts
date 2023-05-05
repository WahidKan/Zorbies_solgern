import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploaddocsComponent } from './uploaddocs.component';
import { AuthGuard } from '../../auth/auth.guard';
import { CustomerDocumentsComponent } from './customer-documents/customer-documents.component';
const routes: Routes = [

  { path: 'upload/:id/:accid', component: UploaddocsComponent },
  { path: 'customer-documents/:accid/:companyid', component: CustomerDocumentsComponent },
  { path: 'a/:encryptid', component: UploaddocsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploaddocsRoutingModule { }

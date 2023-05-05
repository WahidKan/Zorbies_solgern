import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageleaseComponent } from './managelease.component';
import { AddeditleaseComponent } from './addeditlease.component';
import { InprogressleaseComponent } from './inprogresslease/inprogresslease.component';
import { ApprovedleaseComponent } from './approvedlease/approvedlease.component';
import { LeasedetailComponent } from './leasedetail/leasedetail.component';
import { ManagleaserequestlistComponent } from './leaserequest/managleaserequestlist.component';
import { AddeditleaserequestComponent } from './leaserequest/addeditleaserequest.component';
import { DocumentuploadedComponent } from './leasedocumentforuploaded/documentuploaded.component';


const routes: Routes = [
  { path: '', component: ManageleaseComponent },
  { path: 'addlease', component: AddeditleaseComponent },
  { path: 'inprogresslease', component: InprogressleaseComponent, data: { moduleCode: '4510' } },
  { path: 'approvedlease', component: ApprovedleaseComponent },
  { path: 'editlease/:leaseId', component: AddeditleaseComponent },
  { path: 'leasedetail/:leaseId', component: LeasedetailComponent },
  { path: 'addleaserequest', component: AddeditleaserequestComponent },
  { path: 'editleaserequest/:leaserequestId', component: AddeditleaserequestComponent },
  { path: 'uploadeddocument/:leaseId', component: DocumentuploadedComponent },
  { path: 'leaserequestlist', component: ManagleaserequestlistComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageleaseRoutingModule { }

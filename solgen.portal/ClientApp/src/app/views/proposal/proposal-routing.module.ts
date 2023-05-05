import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProposallistComponent } from './proposallist.component';
import { AddeditproposalComponent } from './addeditproposal.component';
import { Routes, RouterModule } from '@angular/router';
import { ProposalviewComponent } from './proposalview.component';
import { AuthGuard } from '../../auth/auth.guard';
import { ViewProposalNewComponent } from './viewProposalNew.component';

const routes: Routes = [
  { path: '', component: ProposallistComponent, canActivate: [AuthGuard] },
  { path: 'editproposal/:id', component: AddeditproposalComponent, canActivate: [AuthGuard], data: { privilegeCode: 'PROPOSALADD' } },
  { path: 'addproposal', component: AddeditproposalComponent, canActivate: [AuthGuard], data: { privilegeCode: 'PROPOSALUPDATE' } },
  { path: 'addproposal/opportunity/:opid', canActivate: [AuthGuard], component: AddeditproposalComponent },
  { path: 'view/:id', component: ProposalviewComponent, canActivate: [AuthGuard] },
  { path: 'viewproposal/:id', component: ViewProposalNewComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProposalRoutingModule { }

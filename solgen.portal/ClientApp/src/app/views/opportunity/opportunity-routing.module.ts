import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OpportunityListComponent } from './opportunitylist.component';
import { AddeditopportunityComponent } from './addeditopportunity.component';
import { OpportunityviewComponent } from './opportunityview.component';
import { OpportunityViewNewComponent } from './opportunityviewNew.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: OpportunityListComponent, canActivate: [AuthGuard] },
  { path: 'addOpportunity', component: AddeditopportunityComponent, canActivate: [AuthGuard]},
  { path: 'editOpportunity/:id', component: AddeditopportunityComponent, canActivate: [AuthGuard] },
  { path: 'view/:id', component: OpportunityviewComponent, canActivate: [AuthGuard] },
  { path: ':id', component: OpportunityListComponent, canActivate: [AuthGuard]},
  { path: 'viewOpportunity/:id', component: OpportunityViewNewComponent, canActivate: [AuthGuard] },
];  
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpportunityListRoutingModule { }

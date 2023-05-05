import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignlistComponent } from './campaignlist.component';
import { AddeditcampaignComponent } from './addeditcampaign/addeditcampaign.component';
import { viewcampaignComponent } from './viewcampaign.component';
import { AuthGuard } from '../../auth/auth.guard';
const routes: Routes = [
  { path: '', component: CampaignlistComponent, canActivate: [AuthGuard]},
  { path: 'addcampaign', component: AddeditcampaignComponent, canActivate: [AuthGuard]},
  { path: 'editcampaign/:id', component: AddeditcampaignComponent, canActivate: [AuthGuard]},
  { path: 'view/:id', component: viewcampaignComponent, canActivate: [AuthGuard]},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }

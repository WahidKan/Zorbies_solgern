import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { AdSetViewComponent } from './ad-set-view/ad-set-view.component';
import { AddeditCampaignComponent } from './addedit-campaign/addedit-campaign.component';
import { AddeditFbaddSetComponent } from './addedit-fbadd-set/addedit-fbadd-set.component';
import { AddeditFbaddComponent } from './addedit-fbadd/addedit-fbadd.component';
import { AddsListingComponent } from './adds-listing/adds-listing.component';
import { AddsSetListingComponent } from './adds-set-listing/adds-set-listing.component';
import { CampaignListingComponent } from './campaign-listing/campaign-listing.component';
import { CampaignViewComponent } from './campaign-view/campaign-view.component';
import { AdViewComponent } from './ad-view/ad-view.component';
const routes: Routes = [
  { path: 'campaigns-list', component: CampaignListingComponent, canActivate: [AuthGuard]},
  { path: 'addcampaign', component: AddeditCampaignComponent, canActivate: [AuthGuard]},
  { path: 'editcampaign/:id', component: AddeditCampaignComponent, canActivate: [AuthGuard]},
  { path: 'campaign-view/:id', component: CampaignViewComponent},
  
  { path: 'ads-list', component: AddsListingComponent, canActivate: [AuthGuard]},
  { path: 'addAd', component: AddeditFbaddComponent, canActivate: [AuthGuard]},
  { path: 'editAd/:id', component: AddeditFbaddComponent, canActivate: [AuthGuard]},
  { path: 'adsSet-list', component: AddsSetListingComponent, canActivate: [AuthGuard]},
  { path: 'addfbAddSet', component: AddeditFbaddSetComponent, canActivate: [AuthGuard]},
  { path: 'editAdSet/:id', component: AddeditFbaddSetComponent, canActivate: [AuthGuard]},
  { path: 'adSet-view/:id', component: AdSetViewComponent},
  { path: 'ad-view/:id', component: AdViewComponent},


  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FbMarketingRoutingModule { }

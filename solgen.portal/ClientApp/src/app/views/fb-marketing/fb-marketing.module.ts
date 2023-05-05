import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignListingComponent } from './campaign-listing/campaign-listing.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FbMarketingRoutingModule } from './fb-marketing.routing.module';
import { AddsSetListingComponent } from './adds-set-listing/adds-set-listing.component';
import { AddsListingComponent } from './adds-listing/adds-listing.component';
import { AddeditCampaignComponent } from './addedit-campaign/addedit-campaign.component';
import { AddeditFbaddSetComponent } from './addedit-fbadd-set/addedit-fbadd-set.component';
import { AddeditFbaddComponent } from './addedit-fbadd/addedit-fbadd.component';
import { CampaignViewComponent } from './campaign-view/campaign-view.component';
import { AdSetViewComponent } from './ad-set-view/ad-set-view.component';
import { AdViewComponent } from './ad-view/ad-view.component';



@NgModule({
  declarations: [CampaignListingComponent,AddsSetListingComponent,AddsListingComponent, AddeditCampaignComponent, AddeditFbaddSetComponent, AddeditFbaddComponent, CampaignViewComponent,AdSetViewComponent, AdViewComponent],
  imports: [
    CKEditorModule, CommonModule, FbMarketingRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule, ModalModule
  ]

})
export class FbMarketingModule { }

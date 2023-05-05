import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignRoutingModule } from './campaign-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { CampaignlistComponent } from './campaignlist.component';
import { AddeditcampaignComponent } from './addeditcampaign/addeditcampaign.component';
import { viewcampaignComponent } from './viewcampaign.component';

@NgModule({
  declarations: [ CampaignlistComponent,AddeditcampaignComponent,viewcampaignComponent],
  imports: [
    CommonModule,
    CampaignRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, SharedModule, NgxPasswordToggleModule, ModalModule
  ]
})
export class CampaignModule { }

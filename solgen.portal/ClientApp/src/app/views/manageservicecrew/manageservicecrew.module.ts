import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddeditservicecrewpopupComponent } from './addeditservicecrewpopup/addeditservicecrewpopup.component';
import { ServicecrewlistComponent } from './servicecrewlist.component';
import { ManageservicecrewRoutingModule } from './manageservicecrew-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared/shared.module';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ViewservicecrewComponent } from './viewservicecrew.component';
import { AddeditservicecrewmemberComponent } from './manageservicecrewmemberpopup/addeditservicecrewmember.component';
//import { ServiceCrewMembersPopupComponent } from './service-crew-members-popup/service-crew-members-popup.component';
import { ResourceskillComponent } from './resourceskill/resourceskill.component';



@NgModule({
  declarations: [AddeditservicecrewpopupComponent, ServicecrewlistComponent, ViewservicecrewComponent, ResourceskillComponent, AddeditservicecrewmemberComponent],
  imports: [
    CommonModule, ManageservicecrewRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, SharedModule, NgxPasswordToggleModule, ModalModule
  ],
 // exports :[ServiceCrewMembersPopupComponent]
})
export class ManageservicecrewModule { }

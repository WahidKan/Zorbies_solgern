import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ServiceresourselistComponent } from './serviceresourselist.component';
import { AddeditresourseserviceComponent } from './addeditresourseservice.component';
import { ServiceresourceviewComponent } from './serviceresourceview.component';
import { ServiceresourceRoutingModule } from './serviceresource-routing.module';
import { ResourceskillComponent } from './resourceskill/resourceskill.component';
import { ServiceresourceterritoryviewComponent } from './resourceserviceterritory/serviceresourceterritoryview.component';
import { ServicecrewaddeditComponent } from './resourceserviicecrew/servicecrewaddedit.component';
import { ServiceappointmentComponent } from './serviceappointment/serviceappointment.component';
import { AbcenseaddeditComponent } from './abcenseaddeditpopup/abcenseaddedit.component';
import { ZonePriorityPopupComponent } from './zone-priority-popup/zone-priority-popup.component';

import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [ServiceresourselistComponent, AddeditresourseserviceComponent, ServiceresourceviewComponent, ResourceskillComponent, ServiceresourceterritoryviewComponent, ServicecrewaddeditComponent, ServiceappointmentComponent, AbcenseaddeditComponent, ZonePriorityPopupComponent, ZonePriorityPopupComponent
   ],
  imports: [
    CommonModule,
    ServiceresourceRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule, ModalModule, TableModule
  ]
})
export class ServiceresourceModule { }

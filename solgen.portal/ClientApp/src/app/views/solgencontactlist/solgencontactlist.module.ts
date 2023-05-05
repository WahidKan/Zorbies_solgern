import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomcontactlistComponent } from './customcontactlist.component';
import { CustomContactListRouting } from './sologencontactlist-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { AddeditcustomcontactComponent } from './addeditcustomcontact.component';
import { ViewsolgencontactdetailComponent } from './viewsolgencontactdetail.component';
import { LeadModule } from '../lead/lead.module';

@NgModule({
  declarations: [CustomcontactlistComponent, AddeditcustomcontactComponent, ViewsolgencontactdetailComponent],
  imports: [
    CommonModule, CustomContactListRouting, LeadModule,
    FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule, ModalModule
  ]
})
export class SolgencontactlistModule { }




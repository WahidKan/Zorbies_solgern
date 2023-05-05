import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SharedModule } from '../shared/shared.module';
import { TrackerlistComponent } from './trackerlist.component';
import {  TrackerlistRoutingModule } from './tracker-routing.module';
import { TrackerlistService } from './trackerlist.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TrackerdetailComponent } from './trackerdetail.component';

@NgModule({
  declarations: [
    TrackerlistComponent,
    TrackerdetailComponent
  ],
  imports: [
    CommonModule,
    TrackerlistRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule, ModalModule
  ],
  providers: [
    TrackerlistService
  ]
})
export class TrackerModule { }

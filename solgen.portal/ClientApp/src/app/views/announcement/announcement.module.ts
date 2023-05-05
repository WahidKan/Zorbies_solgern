import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementComponent } from './announcement.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddEditAnnouncementComponent } from './add-edit-announcement.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AnnouncementRoutingModule } from './announcement-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';

  
@NgModule({
  declarations: [AnnouncementComponent, AddEditAnnouncementComponent],
  imports: [          
    CommonModule,
    FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, AnnouncementRoutingModule, SharedModule, CalendarModule, ModalModule
  ]
})      
export class AnnouncementModule { }

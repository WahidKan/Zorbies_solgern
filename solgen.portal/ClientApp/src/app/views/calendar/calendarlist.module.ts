import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CalendarListRoutingModule } from './calendarlist-routing.module';
import { CalendarListComponent } from './calendarlist.component';
import { FullCalendarModule } from 'ng-fullcalendar';
import { MakeappointmentComponent } from './makeappointment/makeappointment.component';
import { CallandardetailComponent } from './callanderdetail/callandardetail.component';


@NgModule({
  declarations: [CalendarListComponent, MakeappointmentComponent, CallandardetailComponent],
  imports: [
    CommonModule,
    FullCalendarModule,
    CalendarListRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule, ModalModule
  ],
  exports: [MakeappointmentComponent]
})
export class CalendarListModule { }

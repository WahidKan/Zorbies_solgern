import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleforcesyncstatuslistComponent } from './saleforcesyncstatuslist.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SaleforcesyncstatusRoutingModule } from './saleforcesyncstatus-routing.module';

@NgModule({
  declarations: [SaleforcesyncstatuslistComponent],
  imports: [
    CommonModule,
    SaleforcesyncstatusRoutingModule,
    FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule, CalendarModule, ModalModule
  ]
})
export class SaleforceSyncStatusModule { }

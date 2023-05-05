import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ListNotificationComponent } from './listnotification.component';
import { NotificationService } from './notification.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationDetailComponent } from './notification-detail.component';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    ListNotificationComponent,
    NotificationDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NotificationRoutingModule, CalendarModule, FormsModule, NgSelectModule, SharedModule,
    ModalModule,
  ],
  exports: [NotificationDetailComponent],
  providers: [NotificationService],
  bootstrap: [ListNotificationComponent]
})
export class NotificationModule { }


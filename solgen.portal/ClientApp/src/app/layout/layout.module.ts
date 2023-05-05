import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule, Router } from '@angular/router';
import { SharedModule } from '../views/shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { VideocallheaderComponent } from './videocallheader/videocallheader.component';
import { NotificationDetailComponent } from '../views/notifications/notification-detail.component';
import { NotificationModule } from '../views/notifications/notification.module';
import { DateTimeToLocalPipeForAppointment } from '../pipes/datetime.pipe';
import { MobileSidebarComponent } from './mobile-sidebar/mobile-sidebar.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from '../views/dashboard/dashboard.module';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, VideocallheaderComponent,MobileSidebarComponent],
  imports: [
    CommonModule,
    RouterModule,    
    SharedModule,
    NotificationModule,
    CommonModule,
     FormsModule, ReactiveFormsModule, SharedModule, ModalModule,DashboardModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    VideocallheaderComponent,
    MobileSidebarComponent,
    
  ],
  entryComponents: [MobileSidebarComponent],
  providers:[DateTimeToLocalPipeForAppointment]
})
export class LayoutModule { }

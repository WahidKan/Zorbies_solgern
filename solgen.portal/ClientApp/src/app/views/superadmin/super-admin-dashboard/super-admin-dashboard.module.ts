import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ButtonModule } from 'primeng/primeng';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SuperAdminDashboardComponent } from './super-admin-dashboard.component';
import { AddEditSuperAdminDashboardWidgetComponent } from './add-edit-super-admin-dashboard-widget.component';
import { SuperAdminDashboardRoutingModule } from './super-admin-dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [ 
    SuperAdminDashboardComponent, AddEditSuperAdminDashboardWidgetComponent
  ],
 
  imports: [
    FormsModule,
    HttpClientModule,
    ButtonModule,
    CommonModule,
    SuperAdminDashboardRoutingModule,
    NgxDatatableModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class SuperAdminDashboardModule { }

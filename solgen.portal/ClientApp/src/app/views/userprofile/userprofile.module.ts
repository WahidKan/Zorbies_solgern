import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserprofileComponent } from './userprofile.component';
import { UserprofileService } from './userprofile.service';
import { UserRoutingModule } from './userprofile-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { DashboardModule } from '../dashboard/dashboard.module';
@NgModule({
  declarations: [
    UserprofileComponent 
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    NgSelectModule, NgxPasswordToggleModule,
    NgxDatatableModule, FormsModule, SharedModule,DashboardModule

  ]
  
})
export class UserModule { }

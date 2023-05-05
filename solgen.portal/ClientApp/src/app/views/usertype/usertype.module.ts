import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserTypeRoutingModule } from './usertype-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { UsertypelistComponent } from './usertypelist.component';
import { UsertypeaddComponent } from './usertypeadd.component';

@NgModule({
  declarations: [UsertypelistComponent, UsertypeaddComponent ],
  imports: [
    CommonModule,
    UserTypeRoutingModule,
    ReactiveFormsModule,
    NgSelectModule, NgxPasswordToggleModule,
    NgxDatatableModule, FormsModule, SharedModule
  ]
})
export class UserTypeModule { }

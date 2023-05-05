import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
//import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { EditemployeeComponent } from './editemployee.component';

@NgModule({
  declarations: [EmployeeComponent, EditemployeeComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, SharedModule
  ]
})
export class EmployeeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { DesignationRoutingModule } from './designation-routing.module';
import { DesignationlistComponent } from './designationlist.component';
import { DesignationaddComponent } from './designationadd.component';

@NgModule({
  declarations: [DesignationlistComponent, DesignationaddComponent],
  imports: [
    CommonModule,
    DesignationRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule
  ]
})
export class DesignationModule { }

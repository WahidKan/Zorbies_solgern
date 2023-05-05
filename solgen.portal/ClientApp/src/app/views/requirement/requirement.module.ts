import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { requirementComponent } from './requirement.component';
import { requirementRoutingModule } from './requirement-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';    
import { TableModule } from 'primeng/table';
import { requirementAddEditComponent } from './requirement-add-edit.component';
import { ViewRequirementComponent } from './viewrequirement.component';




@NgModule({
  declarations: [requirementComponent,requirementAddEditComponent,ViewRequirementComponent
  ],
  imports: [
    CommonModule,
    requirementRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule, ModalModule, TableModule
  ]
})

export class requirementModule { }

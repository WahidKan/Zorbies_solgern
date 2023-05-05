import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from './project-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';    
import { TableModule } from 'primeng/table';
import { ProjectAddEditComponent } from './project-add-edit.component';
import { ViewprojectComponent } from './viewproject.component';




@NgModule({
  declarations: [ProjectComponent, ProjectAddEditComponent, ViewprojectComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule, ModalModule, TableModule
  ]
})

export class ProjectModule { }

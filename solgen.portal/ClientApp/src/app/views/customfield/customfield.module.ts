import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import { CustomFieldRoutingModule } from './customfield-routing.module';
import { AddeditcustomfieldComponent } from './addeditcustomfield.component';
import { CustomfieldlistComponent } from './customfieldlist.component';

@NgModule({
  declarations: [AddeditcustomfieldComponent, CustomfieldlistComponent],
  imports: [
    CommonModule,
    CustomFieldRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule, ModalModule
  ]
})
export class CustomFieldModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProductrequiredlistComponent } from './productrequiredlist.component';
import { ProductrequiredRoutingModule } from './productrequired-routing.module';
import { ProductrequireddetailComponent } from './productrequireddetail.component';


@NgModule({
  declarations: [ProductrequiredlistComponent, ProductrequireddetailComponent],
  imports: [
    CommonModule,
    ProductrequiredRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule, ModalModule
  ]
})
export class ProductrequiredModule { }

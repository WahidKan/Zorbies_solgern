import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './productlist.component';
import { ProductListRoutingModule } from './product-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AddeditproductComponent } from './addeditproduct.component';
import { ViewproductComponent } from './viewproduct.component';

@NgModule({
  declarations: [ProductListComponent, AddeditproductComponent, ViewproductComponent],
  imports: [
    CommonModule,
    ProductListRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule, ModalModule
  ]
})
export class ProductsModule { }

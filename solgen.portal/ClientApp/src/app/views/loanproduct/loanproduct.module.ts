import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
//import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';

import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { LoanProductRoutingModule } from './loanproduct-routing.module';
import { LoanproductlistComponent } from './loanproductlist.component';
import { AddeditloanproductComponent } from './addeditloanproduct.component';
import { AddprerequisitedocumentComponent } from './addprerequisitedocument/addprerequisitedocument.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DiscountcategoryComponent } from './discountcategory/discountcategory.component';
import { UpdateprerequisitedocumentComponent } from './updateprerequisitedocument/updateprerequisitedocument.component';


@NgModule({
  declarations: [LoanproductlistComponent, AddeditloanproductComponent, AddprerequisitedocumentComponent, DiscountcategoryComponent, UpdateprerequisitedocumentComponent],
  imports: [
    CommonModule,
    LoanProductRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, SharedModule, NgxPasswordToggleModule, ModalModule
  ]
})
export class LoanproductModule { }

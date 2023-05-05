import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
//import { BankRoutingModule } from './bank-routing.module';
//import { ListbankComponent } from './listbank.component';
//import { AddeditbankComponent } from './addeditbank.component';
import { SharedModule } from '../shared/shared.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import { TestRoutingModule } from './test-routing.module';
import { TestdynamicformsComponent } from './testdynamicforms.component';


@NgModule({
  declarations: [TestdynamicformsComponent],
  imports: [
    CommonModule,
    TestRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule, ModalModule
  ]
})
export class TestModule { }

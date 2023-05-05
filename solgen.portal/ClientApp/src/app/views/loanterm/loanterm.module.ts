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
import { LoanTermRoutingModule } from './loanterm-routing.module';
import { LoantermlistComponent } from './loantermlist.component';
import { LoantermaddComponent } from './loantermadd.component';

@NgModule({
  declarations: [LoantermlistComponent, LoantermaddComponent],
  imports: [
    CommonModule,
    LoanTermRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule
  ]
})
export class LoanTermModule { }

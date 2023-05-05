import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankInformationRoutingModule } from './bank-information-routing.module';
import { BankInformationComponent } from './bank-information.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BankInformationComponent],
  imports: [
    CommonModule,
    BankInformationRoutingModule,
    SharedModule
  ]
})
export class BankInformationModule { }

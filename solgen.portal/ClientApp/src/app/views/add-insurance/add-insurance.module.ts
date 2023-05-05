import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddInsuranceComponent } from './add-insurance.component';
import { AddInsuranceRoutingModule } from './add-insurance-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AddInsuranceComponent],
  imports: [
    CommonModule,
    AddInsuranceRoutingModule,
    SharedModule
  ]
})
export class AddInsuranceModule { }

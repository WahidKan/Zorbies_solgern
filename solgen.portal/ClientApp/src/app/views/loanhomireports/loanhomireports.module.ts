import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanapplicationreportComponent } from './loanapplicationreport.component';
import { LoanhomireportsRoutingModule } from './loanhomireports-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ChartModule } from 'primeng/chart';



@NgModule({
  declarations: [LoanapplicationreportComponent],
  imports: [
    CommonModule,
    LoanhomireportsRoutingModule,
    ChartModule,
    SharedModule
    
 
  ]
})
export class LoanhomireportsModule { }

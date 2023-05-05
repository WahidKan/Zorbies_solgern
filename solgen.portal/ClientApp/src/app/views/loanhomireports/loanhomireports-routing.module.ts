import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoanapplicationreportComponent } from './loanapplicationreport.component';

const routes: Routes = [
  { path: '', component: LoanapplicationreportComponent },
  { path: 'edit/:id', component: LoanapplicationreportComponent }
  
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanhomireportsRoutingModule { }

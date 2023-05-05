import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddInsuranceComponent } from './add-insurance.component';

const routes: Routes = [
  { path: '', component: AddInsuranceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddInsuranceRoutingModule { }

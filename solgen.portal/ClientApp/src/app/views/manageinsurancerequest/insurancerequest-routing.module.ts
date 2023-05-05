import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsurancerequestlistComponent } from './insurancerequestlist.component';



const routes: Routes = [
  { path: '', component: InsurancerequestlistComponent },
  { path: 'insurancerequest', component: InsurancerequestlistComponent }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRequestRoutingModule { }

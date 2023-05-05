import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsurancelistComponent } from './insurancelist.component';
import { AddeditinsuranceComponent } from './addeditinsurance.component';


const routes: Routes = [
  { path: '', component: InsurancelistComponent },
  { path: 'addinsurance', component: AddeditinsuranceComponent },
  { path: 'editinsurance/:insuranceId', component: AddeditinsuranceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }

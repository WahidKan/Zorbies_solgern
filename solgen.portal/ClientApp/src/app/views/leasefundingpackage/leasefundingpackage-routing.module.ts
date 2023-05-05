import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeasefundingpackagelistComponent } from './leasefundingpackagelist.component';


const routes: Routes = [
  { path: '', component: LeasefundingpackagelistComponent, data: { title: 'List Funding Package' } }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaseFundingPackageRoutingModule { }

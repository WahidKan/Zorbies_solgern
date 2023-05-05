import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorleaserequestlistComponent } from './vendorleaserequestlist.component';



const routes: Routes = [
  { path: '', component: VendorleaserequestlistComponent, data: { title: 'List Funding Package' } }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorLeaseRequestRoutingModule { }

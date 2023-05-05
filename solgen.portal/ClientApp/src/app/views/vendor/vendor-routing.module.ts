import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListvendorComponent } from './listvendor.component';
import { AddeditvendorComponent } from './addeditvendor.component';

const routes: Routes = [
  { path: '', component: ListvendorComponent },
  { path: 'addvendor', component: AddeditvendorComponent },
  { path: 'editvendor/:id', component: AddeditvendorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }

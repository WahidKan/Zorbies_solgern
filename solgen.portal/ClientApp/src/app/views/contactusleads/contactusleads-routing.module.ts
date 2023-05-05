import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactusleadsComponent } from './contactusleads.component';


const routes: Routes = [
  { path: '', component: ContactusleadsComponent},
  { path: 'contactusleads', component: ContactusleadsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactusleadsRoutingModule { }

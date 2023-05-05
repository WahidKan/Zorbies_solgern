import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddeditcustomfieldComponent } from './addeditcustomfield.component';
import { CustomfieldlistComponent } from './customfieldlist.component';

//import { ListbankComponent } from './listbank.component';
//import { AddeditbankComponent } from './addeditbank.component';
import { AuthGuard } from '../../auth/auth.guard';
const routes: Routes = [
  { path: '', component: CustomfieldlistComponent, canActivate: [AuthGuard]},
  { path: 'addcustomfield', component: AddeditcustomfieldComponent, canActivate: [AuthGuard] },
  { path: 'editcustomfield/:id', component: AddeditcustomfieldComponent, canActivate: [AuthGuard] }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomFieldRoutingModule { }

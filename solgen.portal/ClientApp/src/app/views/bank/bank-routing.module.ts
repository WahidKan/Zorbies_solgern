import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListbankComponent } from './listbank.component';
import { AddeditbankComponent } from './addeditbank.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: ListbankComponent, canActivate: [AuthGuard]},
  { path: 'addbank', component: AddeditbankComponent, canActivate: [AuthGuard]},
  { path: 'editbank/:id', component: AddeditbankComponent, canActivate: [AuthGuard]} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }

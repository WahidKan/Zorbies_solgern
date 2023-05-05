import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoantermlistComponent } from './loantermlist.component';
import { LoantermaddComponent } from './loantermadd.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: LoantermlistComponent, canActivate: [AuthGuard]},
  { path: 'editloanTerm/:id', component: LoantermaddComponent, canActivate: [AuthGuard]},
  { path: 'loanTermAdd', component: LoantermaddComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanTermRoutingModule { }

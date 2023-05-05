import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankInformationComponent } from './bank-information.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: BankInformationComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankInformationRoutingModule { }

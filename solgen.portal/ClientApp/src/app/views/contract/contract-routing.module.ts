import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractlistComponent } from './contractlist.component';
import { AddeditcontractComponent } from './addeditcontract.component';
import { ViewContractComponent } from './viewcontract.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: ContractlistComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddeditcontractComponent, canActivate: [AuthGuard]},
  { path: 'edit/:id', component: AddeditcontractComponent, canActivate: [AuthGuard] },
  { path: 'view/:id', component: ViewContractComponent, canActivate: [AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }

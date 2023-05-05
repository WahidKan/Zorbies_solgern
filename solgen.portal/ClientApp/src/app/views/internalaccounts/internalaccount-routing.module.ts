import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountslistComponent } from './accountslist.component';
import { AddeditaccountsComponent } from './addeditaccounts.component';
import { AccountviewdetailComponent } from './accountviewdetail.component';
import { AccountviewdetailNewComponent } from './accountviewdetailNew.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: AccountslistComponent, canActivate: [AuthGuard]},
  {path:  'sub-dealer', component: AccountslistComponent,canActivate: [AuthGuard]},
  {path:  'customer', component: AccountslistComponent,canActivate: [AuthGuard]},
  { path: 'addaccount', component: AddeditaccountsComponent, canActivate: [AuthGuard], data: { privilegeCode: 'ACCOUNTADD' } },
  { path: 'addaccount/:accountType', component: AddeditaccountsComponent, canActivate: [AuthGuard], data: { privilegeCode: 'ACCOUNTADD' } },
  { path: 'editaccount/:id/:accountType', component: AddeditaccountsComponent, canActivate: [AuthGuard], data: { privilegeCode: 'ACCOUNTUPDATE' } },

  //{ path: 'editaccount/:id', component: AddeditaccountsComponent, canActivate: [AuthGuard], data: { privilegeCode: 'ACCOUNTUPDATE' } },
  { path: 'viewaccount/:id/:accountType', component: AccountviewdetailComponent, canActivate: [AuthGuard]  },
  { path: 'view/:id/:accountType', component: AccountviewdetailNewComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalAccountRoutingModule { }

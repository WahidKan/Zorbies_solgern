import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanproductlistComponent } from './loanproductlist.component';
import { AddeditloanproductComponent } from './addeditloanproduct.component';
import { AuthGuard } from '../../auth/auth.guard';





const routes: Routes = [
  { path: '', component: LoanproductlistComponent, canActivate: [AuthGuard] },
  { path: 'addloanproduct', component: AddeditloanproductComponent, canActivate: [AuthGuard], data: { privilegeCode: 'LOANPRODUCTADD' } },
  { path: 'editloanproduct/:id', component: AddeditloanproductComponent, canActivate: [AuthGuard], data: { privilegeCode: 'LOANPRODUCTUPDATE' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanProductRoutingModule { }  

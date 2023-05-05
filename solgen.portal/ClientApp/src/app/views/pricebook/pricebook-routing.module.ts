import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PricebookComponent } from './pricebook.component';
import { AddeditpricebookComponent } from './addeditpricebook.component';
import { AuthGuard } from '../../auth/auth.guard';



const routes: Routes = [
  { path: '', component: PricebookComponent, canActivate: [AuthGuard], data: { title: 'List Proce Book' } },
  { path: 'addpricebook', component: AddeditpricebookComponent, canActivate: [AuthGuard], data: { privilegeCode: 'pricebookAdd' } },
  { path: 'editpricebook/:id', component: AddeditpricebookComponent, canActivate: [AuthGuard], data: { privilegeCode: 'pricebookUpdate' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricebookRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductrequiredlistComponent } from './productrequiredlist.component';
import { ProductrequireddetailComponent } from './productrequireddetail.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: ProductrequiredlistComponent, canActivate: [AuthGuard] },
  //{ path: 'addProduct', component: AddeditproductComponent },
  { path: 'viewProductRequired/:id', component: ProductrequireddetailComponent, canActivate: [AuthGuard] },
  //{ path: 'viewproducts/:id', component: ViewproductComponent },
  //{ path: 'editProduct/:Id', component: AddeditproductComponent },
];
   
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductrequiredRoutingModule { }

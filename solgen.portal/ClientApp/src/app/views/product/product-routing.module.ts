import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './productlist.component';
import { AddeditproductComponent } from './addeditproduct.component';
import { ViewproductComponent } from './viewproduct.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'addProduct', component: AddeditproductComponent, canActivate: [AuthGuard]},
  { path: 'viewProduct/:id', component: AddeditproductComponent, canActivate: [AuthGuard]},
  { path: 'viewproducts/:id', component: ViewproductComponent, canActivate: [AuthGuard] },
  { path: 'editProduct/:Id', component: AddeditproductComponent, canActivate: [AuthGuard] },
];
   
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductListRoutingModule { }

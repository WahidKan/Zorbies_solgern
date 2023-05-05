import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditCustomerComponent } from './add-edit-customer/add-edit-customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
// import { SuperAdminAccessGuard } from 'src/app/auth/auth.guard';


const routes: Routes = 
[
    { path: '',        component: CustomerListComponent ,    data: { usertype:  "usertypesuperadmin" }, canActivate: [AuthGuard]},
    { path: 'Add',     component: AddEditCustomerComponent , data: { usertype:  "usertypesuperadmin" }, canActivate: [AuthGuard] },
    { path: 'view',    component: ViewCustomerComponent ,    data: { usertype:  "usertypesuperadmin" }, canActivate: [AuthGuard] },
    { path:'Edit/:id', component: AddEditCustomerComponent , data: { usertype:  "usertypesuperadmin" }, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminCustomerRoutingModule { }

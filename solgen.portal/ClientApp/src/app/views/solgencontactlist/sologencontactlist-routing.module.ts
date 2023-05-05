import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomcontactlistComponent } from './customcontactlist.component';
import { AddeditcustomcontactComponent } from './addeditcustomcontact.component';
import { ViewsolgencontactdetailComponent } from './viewsolgencontactdetail.component';
import { AuthGuard } from '../../auth/auth.guard';



const routes: Routes = [
  { path: '', component: CustomcontactlistComponent, canActivate: [AuthGuard]},
  { path: 'editContact/:id', component: AddeditcustomcontactComponent, canActivate: [AuthGuard], data: { privilegeCode: 'ContactAdd' } },
  { path: 'addContact', component: AddeditcustomcontactComponent, canActivate: [AuthGuard], data: { privilegeCode: 'ContactUpdate' } },
  { path: 'addContact/:eid', component: AddeditcustomcontactComponent, canActivate: [AuthGuard], data: { privilegeCode: 'ContactAdd' } },//leadid
  { path: 'addContact/opportunity/:oid', component: AddeditcustomcontactComponent, canActivate: [AuthGuard], data: { privilegeCode: 'ContactAdd' }},//leadid
  { path: 'addContact/account/:aid', component: AddeditcustomcontactComponent, canActivate: [AuthGuard], data: { privilegeCode: 'accountviewAdd', moduleCode: '4008'  } },//accountid    
  { path: 'view/:id', component: ViewsolgencontactdetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomContactListRouting { }

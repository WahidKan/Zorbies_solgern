import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact.component';
import { AddeditcontactComponent } from './addeditcontact.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: ContactComponent, canActivate: [AuthGuard]},
  { path: 'addcontact', component: AddeditcontactComponent, canActivate: [AuthGuard]},
  { path: 'edit/:id', component: AddeditcontactComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }

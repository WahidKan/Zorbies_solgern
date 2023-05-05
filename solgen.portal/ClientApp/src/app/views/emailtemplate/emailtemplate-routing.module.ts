import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailtemplateListingComponent } from './emailtemplate-listing.component';
import { EmailtemplateAddEditComponent } from './emailtemplate-add-edit.component';
import { AuthGuard } from '../../auth/auth.guard';


const routes: Routes = [
  {
    path: '', component: EmailtemplateListingComponent, canActivate: [AuthGuard], data: { title: 'Email Template' }
  },
  {
    path: 'edit/:id', component: EmailtemplateAddEditComponent, canActivate: [AuthGuard], data: { privilegeCode: 'EMAILTEMPLATEUPDATE' }
  },
  {
    path: 'create', component: EmailtemplateAddEditComponent, canActivate: [AuthGuard], data: { privilegeCode: 'EMAILTEMPLATEADD' }
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailtemplateRoutingModule { }

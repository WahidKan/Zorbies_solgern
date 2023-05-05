import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanylistComponent } from './companylist.component';
import { AddeditcompayComponent } from './addeditcompay.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: CompanylistComponent, canActivate: [AuthGuard], data: { title: 'List Role' } },
  { path: 'addcompany', component: AddeditcompayComponent, canActivate: [AuthGuard]},
  { path: 'editcompany/:id', component: AddeditcompayComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagecompanyRoutingModule { }

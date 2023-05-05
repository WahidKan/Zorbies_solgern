import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeadAddEditComponent } from './addeditlead.component';
import { LeadlistComponent } from './leadlist.component';
import { ViewleadComponent } from './viewlead.component';
import { ViewleadNewComponent } from './viewleadNew.component';
import { AuthGuard } from '../../auth/auth.guard';


const routes: Routes = [
  { path: '', component: LeadlistComponent, canActivate: [AuthGuard]},
  { path: 'addlead', component: LeadAddEditComponent, canActivate: [AuthGuard], data: { privilegeCode: 'LEADADD' } },
  { path: 'editlead/:id', component: LeadAddEditComponent, canActivate: [AuthGuard], data: { privilegeCode: 'LEADUPDATE' } },
  { path: 'viewlead/:id', component: ViewleadComponent, canActivate: [AuthGuard]},
  { path: 'view/:id', component: ViewleadNewComponent, canActivate: [AuthGuard]},
  //{ path: ':id', component: LeadlistComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadRoutingModule { }  

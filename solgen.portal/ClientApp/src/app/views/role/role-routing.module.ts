import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleComponent } from './role.component';
import { RoleAddOrEditComponent } from './role-add-or-edit.component';
import { RoleeditComponent } from './roleedit.component';
import { AuthGuard } from '../../auth/auth.guard';
import { RoleViewComponent } from './role-view.component';


const routes: Routes = [
  { path: '', component: RoleComponent, canActivate: [AuthGuard], data: { title: 'List Role' } },
  { path: 'addrole', component: RoleeditComponent, canActivate: [AuthGuard], data: { privilegeCode: 'RolesAdd' }},
  { path: 'editrole/:id', component: RoleeditComponent, canActivate: [AuthGuard], data: { privilegeCode: 'RolesUpdate' }},
  { path: 'editrole123/:id', component: RoleAddOrEditComponent, canActivate: [AuthGuard] },
  { path: 'editrole123', component: RoleAddOrEditComponent, canActivate: [AuthGuard] },
  { path: 'view/:id', component: RoleViewComponent, canActivate: [AuthGuard] }
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { } 

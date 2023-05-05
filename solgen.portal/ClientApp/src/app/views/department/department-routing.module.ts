import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentlistComponent } from './departmentlist.component';
import { AddeditdepartmentComponent } from './addeditdepartment.component';
import { AuthGuard } from '../../auth/auth.guard';



const routes: Routes = [
  { path: '', component: DepartmentlistComponent, canActivate: [AuthGuard]},
  { path: 'adddepartment', component: AddeditdepartmentComponent, canActivate: [AuthGuard], data: { privilegeCode: 'DEPARTMENTADD' } },
  { path: 'editdepartment/:id', component: AddeditdepartmentComponent, canActivate: [AuthGuard], data: { privilegeCode: 'DEPARTMENTUPDATE' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }  

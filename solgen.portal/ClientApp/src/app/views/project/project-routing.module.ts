import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project.component';
import { AuthGuard } from '../../auth/auth.guard';
import { ProjectAddEditComponent } from './project-add-edit.component';
import { ViewprojectComponent } from './viewproject.component';



const routes: Routes = [
  { path: '', component: ProjectComponent, canActivate: [AuthGuard] },
  { path: 'editProject/:id', component: ProjectAddEditComponent, canActivate: [AuthGuard] },
  { path: 'addProject', component: ProjectAddEditComponent, canActivate: [AuthGuard] },
  { path: 'view/:id', component: ViewprojectComponent, canActivate: [AuthGuard] }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }

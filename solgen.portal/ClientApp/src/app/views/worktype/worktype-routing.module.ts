import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WorktypelistComponent } from './worktypelist.component';
import { AuthGuard } from '../../auth/auth.guard';
import { AddeditworktypeComponent } from './addeditworktype.component';
import { WorktypeviewComponent } from './worktypeview.component';

const routes: Routes = [
  { path: '', component: WorktypelistComponent, canActivate: [AuthGuard] },
  { path: 'addworktype', component: AddeditworktypeComponent, canActivate: [AuthGuard], data: { privilegeCode: 'WorkTypeAdd' } },
  { path: 'editworktype/:id', component: AddeditworktypeComponent, canActivate: [AuthGuard], data: { privilegeCode: 'WorkTypeUpdate' } },
  { path: 'worktypeview/:id', component: WorktypeviewComponent, canActivate: [AuthGuard]},
];

@NgModule({
  //declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class WorktypeRoutingModule { }

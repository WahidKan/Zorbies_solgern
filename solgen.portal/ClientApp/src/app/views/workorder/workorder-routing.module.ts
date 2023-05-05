import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkorderComponent } from './workorder.component';
import { ManageworkorderComponent } from './manageworkorder.component';
import { ViewworkorderComponent } from './viewworkorder.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: WorkorderComponent, canActivate: [AuthGuard]},
  { path: 'add', component: ManageworkorderComponent, canActivate: [AuthGuard]},
  { path: 'edit/:id', component: ManageworkorderComponent, canActivate: [AuthGuard]},
  { path: 'view/:id', component: ViewworkorderComponent, canActivate: [AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkOrderRoutingModule { }

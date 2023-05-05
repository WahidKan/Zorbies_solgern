import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardInitializerComponent } from './dashboard-initializer.component';
import { AddEditdashboardwidgetComponent } from './otheruserdashboard/add-editdashboardwidget.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: DashboardInitializerComponent, canActivate: [AuthGuard]},
  { path: 'add', component: AddEditdashboardwidgetComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

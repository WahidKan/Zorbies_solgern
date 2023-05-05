import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperAdminAccessGuard } from 'src/app/auth/superAdminAccessGuard.guard';
import { AddEditSuperAdminDashboardWidgetComponent } from './add-edit-super-admin-dashboard-widget.component';
import { SuperAdminDashboardComponent } from './super-admin-dashboard.component';

const routes: Routes = [
  { path: '',          component: SuperAdminDashboardComponent, canActivate: [SuperAdminAccessGuard]},
  { path: 'add-edit-super-admin-dashboard', component: AddEditSuperAdminDashboardWidgetComponent, canActivate: [SuperAdminAccessGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminDashboardRoutingModule { }

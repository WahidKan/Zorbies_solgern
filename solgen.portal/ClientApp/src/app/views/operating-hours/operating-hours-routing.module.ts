import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperatingHoursListComponent } from './operating-hours-list/operating-hours-list.component';
import { OperatingHoursViewComponent } from './operating-hours-view/operating-hours-view.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: OperatingHoursListComponent, canActivate: [AuthGuard],
    data: { title: 'Manage Operating Hours' }
  },
  {
    path: 'view/:id',
    component: OperatingHoursViewComponent, canActivate: [AuthGuard],
    data: { title: 'Manage Operating Hours View' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperatingHoursRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListNotificationComponent } from './listnotification.component';
import { AuthGuard } from '../../auth/auth.guard';
const routes: Routes = [
  { path: '', component: ListNotificationComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }

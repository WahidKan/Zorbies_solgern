import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserprofileComponent } from './userprofile.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: UserprofileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

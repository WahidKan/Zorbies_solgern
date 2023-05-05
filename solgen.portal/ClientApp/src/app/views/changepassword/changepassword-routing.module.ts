import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangepasswordComponent } from './changepassword.component';
import { AuthGuard } from '../../auth/auth.guard';


const routes: Routes = [
  { path: '', component: ChangepasswordComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangepasswordRoutingModule { }  

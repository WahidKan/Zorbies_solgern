import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalllogdetaillistComponent } from './calllogdetaillist.component';
import { AuthGuard } from '../../auth/auth.guard';






const routes: Routes = [
  
  { path: '', component: CalllogdetaillistComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})
export class CalllogdetailRoutingModule { }

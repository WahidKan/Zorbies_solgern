import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagemodulesComponent } from './managemodules.component';
import { AuthGuard } from '../../auth/auth.guard';
const routes: Routes = [
  { path: '', component: ManagemodulesComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }

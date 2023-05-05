import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicecrewlistComponent } from './servicecrewlist.component';
import { ViewservicecrewComponent } from './viewservicecrew.component';
import { AuthGuard } from '../../auth/auth.guard';
const routes: Routes = [
  { path: '', component: ServicecrewlistComponent, canActivate: [AuthGuard] },
  { path: 'view/:id', component: ViewservicecrewComponent, canActivate: [AuthGuard]},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageservicecrewRoutingModule { }

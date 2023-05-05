import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationlistComponent } from './locationlist.component';
import { AddeditLocationComponent } from './addeditlocation.component';
import { LocationviewdetailComponent } from './locationviewdetail.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: LocationlistComponent, canActivate: [AuthGuard] },
  { path: 'addlocation', component: AddeditLocationComponent, canActivate: [AuthGuard]},
  { path: 'editlocation/:id', component: AddeditLocationComponent, canActivate: [AuthGuard]},
  { path: 'view/:id', component: LocationviewdetailComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }

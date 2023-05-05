import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationtypelistComponent } from './locationtypelist.component';
import { LocationtypeaddComponent } from './locationtypeadd.component';
import { AuthGuard } from '../../auth/auth.guard';


const routes: Routes = [
  { path: '', component: LocationtypelistComponent, canActivate: [AuthGuard]},
  { path: 'locationtypeAdd', component: LocationtypeaddComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationTypeRoutingModule { }

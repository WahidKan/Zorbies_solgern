import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceTerritorylistComponent } from './serviceterritorylist.component';
import { AddeditserviceterritoryComponent } from './addeditserviceterritory.component';
import { ServiceterritoryviewComponent } from './serviceterritoryview.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: ServiceTerritorylistComponent, canActivate: [AuthGuard] },
  { path: 'addserviceterritory', component: AddeditserviceterritoryComponent, canActivate: [AuthGuard], data: { privilegeCode: 'MANAGESERVICETERRITORYADD' } },
  { path: 'editserviceterritory/:id', component: AddeditserviceterritoryComponent, canActivate: [AuthGuard], data: { privilegeCode: 'SERVICETERRITORYUPDATE' } },
  { path: 'view/:id', component: ServiceterritoryviewComponent, canActivate: [AuthGuard] }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceTerritoryRoutingModule { }

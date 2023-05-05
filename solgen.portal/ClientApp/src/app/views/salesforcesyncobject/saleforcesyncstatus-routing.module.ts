import { NgModule } from '@angular/core';
import { SaleforcesyncstatuslistComponent } from './saleforcesyncstatuslist.component';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: SaleforcesyncstatuslistComponent, canActivate: [AuthGuard]},
  
];  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleforcesyncstatusRoutingModule { }

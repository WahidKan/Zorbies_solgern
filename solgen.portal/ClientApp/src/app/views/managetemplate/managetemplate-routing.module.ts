import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagetemplateComponent } from './managetemplate.component';
import { ManagetemplateaddeditComponent } from './managetemplateaddedit.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: ManagetemplateComponent, canActivate: [AuthGuard]},
  { path: 'edit/:id', component: ManagetemplateaddeditComponent, canActivate: [AuthGuard], data: { title: 'Edit Lease Template' }}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagetemplateRoutingModule { }

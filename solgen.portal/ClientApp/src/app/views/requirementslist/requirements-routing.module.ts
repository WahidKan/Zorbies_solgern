import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RequirementslistComponent } from './requirementslist.component';
import { AuthGuard } from '../../auth/auth.guard';
const routes: Routes = [
  { path: '', component: RequirementslistComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RequirementsRoutingModule { }

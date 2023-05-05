import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ManagetimezoneComponent } from './managetimezone.component';
import { AuthGuard } from '../../auth/auth.guard';
const routes: Routes = [
  { path: '', component: ManagetimezoneComponent, canActivate: [AuthGuard] }//,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ManagetimezoneroutingModule { }

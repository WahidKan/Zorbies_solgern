import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueuelistComponent } from './queuelist.component';
import { AddeditqueueComponent } from './addeditqueue.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
const routes: Routes = [
  { path: '', component: QueuelistComponent, canActivate: [AuthGuard]},
  { path: 'editqueue/:id', component: AddeditqueueComponent, canActivate: [AuthGuard]},
  { path: 'addqueue', component: AddeditqueueComponent, canActivate: [AuthGuard]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueueRoutingModule { }

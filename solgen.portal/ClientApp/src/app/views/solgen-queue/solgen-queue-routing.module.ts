import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolgenAddEditQueueComponent } from './solgen-add-edit-queue/solgen-add-edit-queue.component';
import { SolgenQueueListComponent } from './solgen-queue-list/solgen-queue-list.component';


const routes: Routes = [
  { path: '', component: SolgenQueueListComponent },
  { path: 'editqueue/:id', component: SolgenAddEditQueueComponent },
  { path: 'addqueue', component: SolgenAddEditQueueComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolgenQueueRoutingModule { }

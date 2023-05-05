import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { MasternameComponent } from './mastername.component';
import { MasternameListComponent } from './mastername-list.component';

const routes: Routes = [
  { path: '', component: MasternameListComponent, data: { title: 'List Master Name' } },
  { path: 'create', component: MasternameComponent, data: { title: 'Add Master Name' } },
  { path: 'edit/:id', component: MasternameComponent, data: { title: 'Edit Master Name' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasternameRoutingModule { }

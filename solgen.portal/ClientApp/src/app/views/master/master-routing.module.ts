import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMasterComponent } from './list-master/list-master.component';
import { CreateMasterComponent } from './create-master/create-master.component';

const routes: Routes = [
  { path: '', component: ListMasterComponent, data: { title: 'List Master' } },
  { path: 'create', component: CreateMasterComponent, data: { title: 'Add Master' } },
  { path: 'edit/:id', component: CreateMasterComponent, data: { title: 'Edit Master' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }

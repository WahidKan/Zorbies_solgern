import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasklistComponent } from './tasklist.component';
import { AddedittaskComponent } from './addedittask.component';
//import { ListbankComponent } from './listbank.component';
//import { AddeditbankComponent } from './addeditbank.component';

const routes: Routes = [
  { path: '', component: TasklistComponent },
  { path: 'addtask', component: AddedittaskComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }

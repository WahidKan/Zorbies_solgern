import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestdynamicformsComponent } from './testdynamicforms.component';

const routes: Routes = [
  { path: '', component: TestdynamicformsComponent },
  //{ path: 'addtask', component: AddedittaskComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }

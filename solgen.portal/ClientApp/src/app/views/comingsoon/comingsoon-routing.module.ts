import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComingSoonComponent } from './comingsoon.component';


const routes: Routes = [
  { path: '', component: ComingSoonComponent },
  { path: 'comingsoon', component: ComingSoonComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComingSoonRoutingModule { }  

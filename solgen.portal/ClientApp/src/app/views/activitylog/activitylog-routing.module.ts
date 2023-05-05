import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListactivitylogComponent } from './listactivitylog.component';

const routes: Routes = [{ path: '', component: ListactivitylogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitylogRoutingModule { }

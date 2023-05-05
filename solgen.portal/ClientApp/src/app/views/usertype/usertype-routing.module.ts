import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsertypelistComponent } from './usertypelist.component';
import { UsertypeaddComponent } from './usertypeadd.component';


const routes: Routes = [
  { path: '', component: UsertypelistComponent },
  { path: 'AdduserType', component: UsertypeaddComponent },
  { path: 'edituserType/:id', component: UsertypeaddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTypeRoutingModule { }

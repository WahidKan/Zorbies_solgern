import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { SendtoloanhomiComponent } from './sendtoloanhomi.component';


const routes: Routes = [
  { path: '', component: SendtoloanhomiComponent },
  //{ path: 'application', component: SendtoloanhomiComponent },
  { path: 'application/:id', component: SendtoloanhomiComponent },
  { path: 'application/:companyId/:accountId/:id', component: SendtoloanhomiComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SendtoloanhomiRoutingModule { }

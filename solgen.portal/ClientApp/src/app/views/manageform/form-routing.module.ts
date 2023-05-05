import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddeditformComponent } from './addeditform.component';
import { FormlistComponent } from './formlist.component';
import { AuthGuard } from '../../auth/auth.guard';

//import { ListbankComponent } from './listbank.component';
//import { AddeditbankComponent } from './addeditbank.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'formlist', pathMatch: 'full'},
  { path: '', component: FormlistComponent, canActivate: [AuthGuard]},
  { path: 'manageform', component: FormlistComponent, canActivate: [AuthGuard]},
  //{ path: 'manageform/:id', component: FormlistComponent },
  { path: 'addform', component: AddeditformComponent, canActivate: [AuthGuard] },
  { path: 'editform/:module/:subModule/:formMasterId', canActivate: [AuthGuard], component: AddeditformComponent },
  { path: 'editform/:module/:subModule', canActivate: [AuthGuard], component: AddeditformComponent }

  //{ path: '', component: FormlistComponent },
  //{ path: 'formlist/:id', component: FormlistComponent }
  //{ path: 'addlayout', component: AddeditformComponent },
  //{ path: 'editlayout/:id/:sid', component: AddeditformComponent },
 
  // {
  //   path: '', redirectTo: 'layoutlist', pathMatch: 'full'

  //},
  //{
  //  path: 'formlist', component: FormlistComponent
  //}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }

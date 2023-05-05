import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddeditlayoutComponent } from './addeditlayout.component';
import { LayoutlistComponent } from './layoutlist.component';
import { AuthGuard } from '../../auth/auth.guard';

//import { ListbankComponent } from './listbank.component';
//import { AddeditbankComponent } from './addeditbank.component';

const routes: Routes = [
 
  //{ path: '', component: LayoutlistComponent  },
  { path: 'addlayout', component: AddeditlayoutComponent, canActivate: [AuthGuard] },
  { path: 'editlayout/:id/:sid', component: AddeditlayoutComponent, canActivate: [AuthGuard]},
 
   {
     path: '', redirectTo: 'layoutlist', pathMatch: 'full'

  },
  {
    path: 'layoutlist', component: LayoutlistComponent, canActivate: [AuthGuard]
  },
  { path: 'layoutlist/:id', component: LayoutlistComponent, canActivate: [AuthGuard] }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }

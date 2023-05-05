import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomLayoutlistComponent } from './managecustomlayoutlist.component';
import { AddeditcustomlayoutComponent } from './addeditcustomlayout.component';
import { AuthGuard } from '../../auth/auth.guard';
const routes: Routes = [
 
  { path: '', redirectTo: 'customlayoutlist', pathMatch: 'full'},
  {
    path: 'customlayoutlist', component: CustomLayoutlistComponent, canActivate: [AuthGuard]
  },
  { path: 'customlayoutlist/:id', component: CustomLayoutlistComponent, canActivate: [AuthGuard]},
  { path: 'customlayout/:view', component: AddeditcustomlayoutComponent, canActivate: [AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomLayoutRoutingModule { }

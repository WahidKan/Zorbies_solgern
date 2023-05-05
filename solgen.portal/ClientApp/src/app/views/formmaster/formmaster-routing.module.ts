import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormmasterComponent } from './formmaster.component';
import { FormmasterlistComponent } from './formmasterlist.component';
import { FormbuilderComponent } from './formbuilder.component';
import { AuthGuard } from '../../auth/auth.guard';



const routes: Routes = [
  { path: '', component: FormmasterlistComponent, canActivate: [AuthGuard]},
  { path: 'add', component: FormmasterComponent, canActivate: [AuthGuard]},
  { path: 'edit/:id', component: FormmasterComponent, canActivate: [AuthGuard] },
  { path: 'editform/:id', component: FormbuilderComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormmasterRoutingModule { }  

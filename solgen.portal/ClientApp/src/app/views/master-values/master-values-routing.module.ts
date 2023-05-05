import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { AddEditMasterValuesComponent } from './add-edit-master-values/add-edit-master-values.component';


const routes: Routes = [
  { path: '', component: AddEditMasterValuesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterValuesRoutingModule { }

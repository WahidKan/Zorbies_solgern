import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { requirementComponent } from './requirement.component';
import { AuthGuard } from '../../auth/auth.guard';
import { requirementAddEditComponent } from './requirement-add-edit.component';
import { ViewRequirementComponent } from './viewrequirement.component';




const routes: Routes = [
  { path: '', component: requirementComponent, canActivate: [AuthGuard] },
   { path: 'editrequirement/:id', component: requirementAddEditComponent, canActivate: [AuthGuard] },
   { path: 'addrequirement', component: requirementAddEditComponent, canActivate: [AuthGuard] },
   { path: 'viewrequirement/:id', component: ViewRequirementComponent, canActivate: [AuthGuard] },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class requirementRoutingModule { }

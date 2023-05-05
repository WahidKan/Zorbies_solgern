import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanysetupComponent } from './companysetup.component';
import { AuthGuard } from '../../auth/auth.guard';



const routes: Routes = [
  { path: '', component: CompanysetupComponent, canActivate: [AuthGuard]},
  //{ path: 'addlead', component: LeadAddEditComponent },
  //{ path: 'editlead/:id', component: LeadAddEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanySetupRoutingModule { }  

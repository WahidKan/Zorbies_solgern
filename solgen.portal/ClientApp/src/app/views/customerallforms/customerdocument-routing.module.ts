import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerdocumentlistComponent } from './customerdocumentlist.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: CustomerdocumentlistComponent, canActivate: [AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerDocumentRoutingModule { }

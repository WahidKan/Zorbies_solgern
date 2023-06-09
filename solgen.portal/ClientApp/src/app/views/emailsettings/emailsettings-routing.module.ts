import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailsettingsComponent } from './emailsettings.component';
import { AuthGuard } from '../../auth/auth.guard';
const routes: Routes = [
  { path: '', component: EmailsettingsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailsettingsRoutingModule { }

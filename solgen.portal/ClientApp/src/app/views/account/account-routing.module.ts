import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SetpasswordComponent } from './setpassword/setpassword.component';
import { ForgotPasswordComponent } from '../account/forgot-password/forgot-password.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { UserProfile } from '../shared/user.service';
import { LoginuserlistComponent } from './loginuserlist/loginuserlist.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'setpassword', component: SetpasswordComponent} ,
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'resetpassword', component: ResetpasswordComponent},
//  { path: 'setpassword', component: ResetpasswordComponent},
  { path: 'multipleuserlogin', component: LoginuserlistComponent}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }

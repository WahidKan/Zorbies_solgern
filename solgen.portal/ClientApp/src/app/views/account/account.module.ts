import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SetpasswordComponent } from './setpassword/setpassword.component';
import { ForgotPasswordComponent } from '../account/forgot-password/forgot-password.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SharedModule } from '../shared/shared.module';
import { LoginuserlistComponent } from './loginuserlist/loginuserlist.component';
import { LoginComponent } from './login/login.component';
import { LoaderBlackComponent } from 'src/app/components/loader/loader-black.component';
import { LoaderWhiteComponent } from 'src/app/components/loader/loader-white.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';

@NgModule({
 
  declarations: [
    ForgotPasswordComponent, SetpasswordComponent, ResetpasswordComponent, LoginuserlistComponent, LoginComponent,
  
    // LoaderBlackComponent,
    // LoaderWhiteComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule, 
    ReactiveFormsModule,
    //LoginComponent
    //SharedModule
  ], 
  entryComponents: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccountModule { }

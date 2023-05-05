import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AddEditUserComponent } from './addedituser.component';

import { ListUsersComponent } from './listusers.component';

import { ManageUserService } from './addedituser.service';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AddEditUserComponent,
    ListUsersComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule, ModalModule
 
  ],
  providers: [ManageUserService],
  bootstrap: [AddEditUserComponent]
})
export class UserModule { }

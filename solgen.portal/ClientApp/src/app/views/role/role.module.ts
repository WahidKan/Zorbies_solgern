import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RoleComponent } from './role.component';
import { RoleService } from './role.service';
import { RoleRoutingModule } from './role-routing.module';
import { RoleAddOrEditComponent } from './role-add-or-edit.component';
import { TreeModule } from 'primeng/tree';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RoleeditComponent } from './roleedit.component';
import { RoleViewComponent } from './role-view.component';
import { UserListingPopUpComponent } from './userlistingpopup/userlistingpopup.component';
@NgModule({
  declarations: [
    RoleComponent,
    RoleAddOrEditComponent,
    RoleeditComponent,
    RoleViewComponent,
    UserListingPopUpComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    TreeModule,
    ModalModule,  
    SharedModule
  ],
  providers: [
    RoleService
  ]
})
export class RoleModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TreeModule } from 'primeng/tree';
import { ModalModule } from 'ngx-bootstrap/modal';
import {  ManagecompanyRoutingModule } from './company-routing.module';
import { CompanylistComponent } from './companylist.component';
import { CompanyserviceService } from './companyservice.service';
import { AddeditcompayComponent } from './addeditcompay.component';
@NgModule({
  declarations: [
    CompanylistComponent,
    AddeditcompayComponent,
   // RoleAddOrEditComponent
  ],
  imports: [
    CommonModule,
    ManagecompanyRoutingModule,
    TreeModule,
    ModalModule,  
    SharedModule
  ],
  providers: [
    CompanyserviceService
  ]
})
export class CompanyModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
//import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { CompanySetupRoutingModule } from './CompanySetup-routing.module';
import { CompanysetupComponent } from './companysetup.component';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  declarations: [CompanysetupComponent],
  imports: [  
    CommonModule,
    CompanySetupRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, ModalModule, SharedModule, NgxPasswordToggleModule, KeyFilterModule
  ]
})
export class CompanysetupModule { }

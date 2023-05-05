import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { CompanyIntegrationSettingRoutingModule } from './company-integration-setting-routing.module';
import { CompanyIntegrationSettingComponent } from './company-integration-setting/company-integration-setting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/primeng';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [CompanyIntegrationSettingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    CompanyIntegrationSettingRoutingModule,
    NgSelectModule,
    NgxDatatableModule, 
    SharedModule,
    ModalModule,
    

  ]
})
export class CompanyIntegrationSettingModule { }

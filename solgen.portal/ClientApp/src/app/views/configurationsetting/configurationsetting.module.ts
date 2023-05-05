import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
//import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { ConfigurationSettingRoutingModule } from './configurationsetting-routing.module';
import { ConfigurationsettingComponent } from './configurationsetting.component';
import { ColorPickerModule } from 'primeng/colorpicker';
import { StageconfigComponent } from './stageconfig.component';
import { LeadconfigsettingComponent } from './leadconfigsetting.component';
import { LoanApplicationModule } from '../loanapplication/loanapplication.module';
import { DocumentsMasterComponent } from './documents-master/documents-master.component';

@NgModule({
  declarations: [ConfigurationsettingComponent, StageconfigComponent, LeadconfigsettingComponent, DocumentsMasterComponent],
  imports: [
    CommonModule, ColorPickerModule,
    ConfigurationSettingRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, SharedModule, LoanApplicationModule
  ],
  exports: [StageconfigComponent]
})

export class ConfigurationSettingModule { }

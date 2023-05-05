import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateManagementComponent } from './state-management.component';
import { SharedModule } from '../shared/shared.module';
import { StatemanagementroutingModule } from './statemanagementrouting.module';
import { StageconfigComponent } from '../configurationsetting/stageconfig.component';
import { ConfigurationSettingModule } from '../configurationsetting/configurationsetting.module';
import { AddEditstatemanagementComponent } from './add-editstatemanagement.component';

@NgModule({
  declarations: [StateManagementComponent, AddEditstatemanagementComponent],
  imports: [
    StatemanagementroutingModule, CommonModule, SharedModule, ConfigurationSettingModule
  ]

})
export class StatemanagementModule { }

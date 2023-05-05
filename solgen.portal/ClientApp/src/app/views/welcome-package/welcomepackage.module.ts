import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomepackageRoutingModule } from './welcomepackage-routing.module';
import { GenerateWelcomePackageComponent } from './generate-welcome-package.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [GenerateWelcomePackageComponent],
  imports: [
    CommonModule,
    WelcomepackageRoutingModule,
    SharedModule
  ]
})
export class WelcomepackageModule { }

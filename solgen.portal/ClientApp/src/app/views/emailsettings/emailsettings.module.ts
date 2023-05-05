import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailsettingsRoutingModule } from './emailsettings-routing.module';
import { EmailsettingsComponent } from './emailsettings.component';
import { EmailsettingsService } from './emailsettings.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [EmailsettingsComponent],
  imports: [
    CommonModule,
    EmailsettingsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [EmailsettingsService]
})
export class EmailsettingsModule { }

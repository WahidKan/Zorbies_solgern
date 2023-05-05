import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ContactRoutingModule } from './contact-routing.module';
import { AddeditcontactComponent } from './addeditcontact.component';
import { ContactComponent } from './contact.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GuarantoroldComponent } from './guarantorold/guarantorold.component';

@NgModule({
  declarations: [
    AddeditcontactComponent
    , ContactComponent
    , InsuranceComponent, GuarantoroldComponent],
  imports: [
    CommonModule
    , ContactRoutingModule
    , SharedModule, ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactModule { }

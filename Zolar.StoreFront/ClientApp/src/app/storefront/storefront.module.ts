import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorefrontRoutingModule } from './storefront-routing.module';
import { IndexComponent } from './index/index.component';
import { PricingComponent } from './pricing/pricing.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestademomodelComponent } from './requestademomodel/requestademomodel.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import {InputMaskModule} from 'primeng/inputmask';
import { NgImageSliderModule } from 'ng-image-slider';
@NgModule({
  declarations: 
  [
    IndexComponent, 
    PricingComponent, 
    ContactUsComponent, 
    AboutUsComponent,
    HeaderComponent, 
    FooterComponent, 
    RequestademomodelComponent
  ],
  imports: 
  [
    CommonModule,
    NgSelectModule,
    InputMaskModule,
    StorefrontRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    NgImageSliderModule
    ]
})
export class StorefrontModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { IndexComponent } from './index/index.component';
import { PricingComponent } from './pricing/pricing.component';


const routes: Routes = [
  {
    path: '', component: IndexComponent,
  },
  {
    path: 'home', component: IndexComponent,
  },
  {
    path: 'pricing', component: PricingComponent,
  },
  {
    path:'contactus',component:ContactUsComponent,
  },
  {
    path:'aboutus',component:AboutUsComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorefrontRoutingModule { }

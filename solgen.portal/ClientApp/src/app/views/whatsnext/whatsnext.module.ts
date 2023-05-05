import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { WhatsnextRoutingModule } from './whatsnext-routing.module';
import { WhatsnextlistComponent } from './whatsnextlist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WhatsNextDetailComponent } from './whats-next-detail.component';

@NgModule({
  declarations: [WhatsnextlistComponent, WhatsNextDetailComponent],
  imports: [
    CommonModule,
    WhatsnextRoutingModule, ReactiveFormsModule, SharedModule
  ]
})
export class WhatsnextModule { }

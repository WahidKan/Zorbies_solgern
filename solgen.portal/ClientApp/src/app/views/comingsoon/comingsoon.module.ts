import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared/shared.module';
import { ComingSoonComponent } from './comingsoon.component';
import { ComingSoonRoutingModule } from './comingsoon-routing.module';

@NgModule({
  declarations: [ComingSoonComponent],
  imports: [
    CommonModule,
    ComingSoonRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, SharedModule
  ]
})
export class comingsoonModule {
}

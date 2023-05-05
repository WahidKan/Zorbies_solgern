import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SendtoloanhomiComponent } from './sendtoloanhomi.component';
import { SendtoloanhomiRoutingModule } from './sendtoloanhomi-routing.module';
import { SendtoloanhomiService } from './sendtoloanhomi.service';
import { DecimalPipe } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';

@NgModule({
  providers: [DecimalPipe, Title],
  declarations: [SendtoloanhomiComponent],
  imports: [
    CommonModule,
    SendtoloanhomiRoutingModule,
    SharedModule, ModalModule
  ]
})
export class SendtoloanhomiModule { }

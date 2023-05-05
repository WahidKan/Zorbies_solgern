import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MangeskillsService } from './mangeskills.service';
import { ManageskillsRoutingModule } from './manageskills-routing.module';
import { ManageskillListComponent } from './manageskill-list.component';
@NgModule({
  declarations: [ManageskillListComponent],
  imports: [
    CommonModule,
    ManageskillsRoutingModule,
    SharedModule, ModalModule
  ],
  providers: [MangeskillsService],
  bootstrap: []
})
export class ManageskillsModule { }

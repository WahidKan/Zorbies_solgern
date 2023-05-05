import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagetimezoneComponent } from './managetimezone.component';
import { ManagetimezoneroutingModule } from './managetimezonerouting.module';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ManagetimezoneService } from './managetimezone.service';


@NgModule({
  declarations: [ManagetimezoneComponent],
  imports: [
    CommonModule,
    ManagetimezoneroutingModule,
    SharedModule, ModalModule
  ],
  providers: [ManagetimezoneService],
  bootstrap: []
})
export class ManagetimezoneModule { }

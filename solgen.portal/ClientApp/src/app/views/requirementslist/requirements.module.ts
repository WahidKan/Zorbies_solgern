import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequirementslistComponent } from './requirementslist.component';
import { RequirementsService } from './requirements.service';
import { RequirementsRoutingModule } from './requirements-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AddeditrequirementsComponent } from './addeditrequirements/addeditrequirements.component';
import { addeditprojectrequirements } from './addeditprojectrequirement/addeditprojectrequirements.component';

@NgModule({
  declarations: [RequirementslistComponent, AddeditrequirementsComponent,addeditprojectrequirements],
  imports: [
    CommonModule,
    RequirementsRoutingModule,
    SharedModule, ModalModule
  ],
  exports: [AddeditrequirementsComponent,addeditprojectrequirements],

  providers: [RequirementsService],
  bootstrap:[]
})
export class RequirementsModule { }





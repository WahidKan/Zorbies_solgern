import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import { LocationRoutingModule } from './location-routing.module';
import { AddeditLocationComponent } from './addeditlocation.component';
import { LocationlistComponent } from './locationlist.component';
import { LocationviewdetailComponent } from './locationviewdetail.component';
import { ColorPickerModule } from 'primeng/colorpicker';

@NgModule({
  declarations: [LocationlistComponent, AddeditLocationComponent, LocationviewdetailComponent],
  imports: [
    CommonModule,
    LocationRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule, ModalModule, ColorPickerModule
  ]
})
export class LocationModule { }

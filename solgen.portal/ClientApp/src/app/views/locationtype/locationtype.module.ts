import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { LocationTypeRoutingModule } from './locationtype-routing.module';
import { LocationtypelistComponent } from './locationtypelist.component';
import { LocationtypeaddComponent } from './locationtypeadd.component';


@NgModule({
  declarations: [LocationtypelistComponent, LocationtypeaddComponent],
  imports: [
    CommonModule,
    LocationTypeRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule
  ]
})
export class LocationTypeModule { }

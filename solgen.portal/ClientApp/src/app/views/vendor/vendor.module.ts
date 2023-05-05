import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ListvendorComponent } from './listvendor.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { VendorRoutingModule } from './vendor-routing.module';
import { VendorService } from './vendor.service';
import { AddeditvendorComponent } from './addeditvendor.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ListvendorComponent, AddeditvendorComponent],
  imports: [
    CommonModule, FormsModule, NgxDatatableModule, ReactiveFormsModule, VendorRoutingModule, NgSelectModule, SharedModule
  ],
  providers: [VendorService],
  bootstrap: [ListvendorComponent]
})
export class VendorModule { }

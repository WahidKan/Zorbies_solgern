import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactusleadsRoutingModule } from './contactusleads-routing.module';
import { ContactusleadsComponent } from './contactusleads.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [ContactusleadsComponent],
  imports: [
    CommonModule,
    ContactusleadsRoutingModule,
    NgxDatatableModule,
    FormsModule,
    NgSelectModule
  ]
})
export class ContactusleadsModule { }

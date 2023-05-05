import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsurancelistComponent } from './insurancelist.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { InsuranceRoutingModule } from './insurance-routing.module';
import { AddeditinsuranceComponent } from './addeditinsurance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [InsurancelistComponent, AddeditinsuranceComponent],
  imports: [
    CommonModule,
    InsuranceRoutingModule,
    SharedModule
  ]
})
export class insuranceModule { }

import { NgModule } from '@angular/core';
import { CreateMasterComponent } from './create-master/create-master.component';
import { ListMasterComponent } from './list-master/list-master.component';
import { MasterService } from './master.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MasterRoutingModule } from './master-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CreateMasterComponent,
    ListMasterComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    SharedModule
  ],
  providers: [
    MasterService
  ]
})
export class MasterModule { }

import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable'; 
import { MasternameRoutingModule } from './mastername-routing.module';
import { MasternameComponent } from './mastername.component';
import { MasternameListComponent } from './mastername-list.component';
import { MasternameService } from './mastername.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
     MasternameComponent,
    MasternameListComponent
  ],
  imports: [CommonModule,
    MasternameRoutingModule,
    ReactiveFormsModule, 
    NgxDatatableModule,
    SharedModule
  ],
  providers: [
    MasternameService
  ]
})
export class MasternameModule { }

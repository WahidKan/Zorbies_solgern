import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalllogdetailRoutingModule } from './calllogdetail-routing.module';
import { CalllogdetaillistComponent } from './calllogdetaillist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap';



@NgModule({
  declarations: [CalllogdetaillistComponent],
  imports: [CommonModule, CalllogdetailRoutingModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule, ModalModule.forRoot()]
})
export class calllogdetailModule {
  
}

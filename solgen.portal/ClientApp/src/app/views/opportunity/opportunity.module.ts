import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
//import { BankRoutingModule } from './bank-routing.module';
//import { ListbankComponent } from './listbank.component';
//import { AddeditbankComponent } from './addeditbank.component';
import { SharedModule } from '../shared/shared.module';

//import { CarouselModule } from 'ngx-owl-carousel-o';
import { OpportunityListComponent } from './opportunitylist.component';
import { OpportunityListRoutingModule } from './opportunity-routing.module';
import { OpportunityviewComponent } from './opportunityview.component';
import { AddeditopportunityComponent } from './addeditopportunity.component';
import { MakeappointmentComponent } from '../calendar/makeappointment/makeappointment.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { ModalModule } from 'ngx-bootstrap/modal';
import { KanbanviewpopupComponent } from './kanbanviewpopup/kanbanviewpopup.component';
import { OpportunityViewNewComponent } from './opportunityviewNew.component'; 
import { CalendarListModule } from '../calendar/calendarlist.module';
import { SendtoloanhomimodelpopupComponent } from './sendtoloanhomimodelpopup/sendtoloanhomimodelpopup.component';
import { StagemanagementComponent } from '../shared/stagemanagement/stagemanagement.component';
import { DecimalPipe } from '@angular/common';

@NgModule({
  providers: [StagemanagementComponent, DecimalPipe],
  declarations: [OpportunityListComponent ,OpportunityviewComponent, AddeditopportunityComponent, KanbanviewpopupComponent, OpportunityViewNewComponent, SendtoloanhomimodelpopupComponent],
  imports: [
    CommonModule,
    OpportunityListRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule, ModalModule, CKEditorModule,  CalendarListModule,SharedModule
  ]
})
export class OpportunityListModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { GMapModule } from 'primeng/gmap';
import { SharedModule } from '../shared/shared.module';
import { LeadRoutingModule } from './lead-routing.module';
import { LeadlistComponent } from './leadlist.component';
import { LeadAddEditComponent } from './addeditlead.component';
import { ViewleadNewComponent } from './viewleadNew.component';
import { ViewleadComponent } from './viewlead.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CKEditorModule } from 'ng2-ckeditor';
import { LoanApplicationModule } from '../loanapplication/loanapplication.module';
import { LeadconvertpopupComponent } from './leadconvertpopup.component';
import { CalendarListModule } from '../calendar/calendarlist.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';


@NgModule({
  declarations: [LeadlistComponent, LeadAddEditComponent, ViewleadComponent, ViewleadNewComponent, LeadconvertpopupComponent],
  imports: [
    CommonModule,CarouselModule,
    LeadRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, SharedModule, LoanApplicationModule, ModalModule, CKEditorModule, GMapModule, CalendarListModule,
    NgxDatatableModule
  ]
})
export class LeadModule { }

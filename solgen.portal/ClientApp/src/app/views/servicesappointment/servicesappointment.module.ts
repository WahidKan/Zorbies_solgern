import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesappointmentRoutingModule } from './servicesappointment-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { ServicesappointmentlistComponent } from './servicesappointmentlist.component';
import { ViewservicesappointmentComponent } from './viewservicesappointment.component';
import { AddeditservicesappointmentComponent } from './addeditservicesappointment.component';
import { ServicesappointmentMapViewComponent } from './servicesappointmentmapview.component';

import { GMapModule } from 'primeng/gmap';

import { FullCalendarModule } from 'ng-fullcalendar';
import { AuditpopupComponent } from './auditpopup/auditpopup.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { DragDropModule } from 'primeng/dragdrop';
import { PropertiespopupformComponent } from './managequestionnaire/viewpopupwindowform/propertiespopupform.component';
import { ColorPickerModule } from 'primeng/colorpicker';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { FilterpopupComponent } from './filterpopup/filterpopup.component';


@NgModule({
  declarations: [ServicesappointmentlistComponent, ViewservicesappointmentComponent, AddeditservicesappointmentComponent, ServicesappointmentMapViewComponent, AuditpopupComponent, FilterpopupComponent],
  imports: [
    FormsModule, ColorPickerModule, CommonModule, ScheduleModule, TreeViewModule, FullCalendarModule, CKEditorModule,  
    ServicesappointmentRoutingModule, ReactiveFormsModule, NgSelectModule, SharedModule, NgxPasswordToggleModule, DragDropModule, GMapModule, ModalModule
  ]

})
export class ServicesappointmentModule { }

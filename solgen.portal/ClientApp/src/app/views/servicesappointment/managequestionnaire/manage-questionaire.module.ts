import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageQuestionaireRoutingModule } from './manage-questionaire-routing.module';
import { ManagequestionnaireListComponent } from './managequestionnaire-list.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { ColorPickerModule, DragDropModule, GMapModule } from 'primeng/primeng';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { FullCalendarModule } from 'ng-fullcalendar';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { ManagequestionnaireComponent } from './managequestionnaire.component';
import { PropertiespopupformComponent } from './viewpopupwindowform/propertiespopupform.component';

@NgModule({
  declarations: [
    ManagequestionnaireListComponent, ManagequestionnaireComponent ,PropertiespopupformComponent
  ],
  imports: [
    FormsModule,ManageQuestionaireRoutingModule, ColorPickerModule, CommonModule, ScheduleModule, TreeViewModule, FullCalendarModule, CKEditorModule,  
    ReactiveFormsModule, NgSelectModule, SharedModule, NgxPasswordToggleModule, DragDropModule, GMapModule, ModalModule
  ]
})
export class ManageQuestionaireModule { }

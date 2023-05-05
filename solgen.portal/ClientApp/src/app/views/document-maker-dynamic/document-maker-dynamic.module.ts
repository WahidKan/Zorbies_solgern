import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentMakerDynamicRoutingModule } from './document-maker-dynamic-routing.module';
import { CanvasComponent } from './canvas/canvas.component';
import { ContentComponent } from './content/content.component';
import { DocumentComponent } from './document/document.component';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from 'primeng/dragdrop';
import { ImageDynamicComponent } from '../shared/components/document-dynamic/image-dynamic/image-dynamic.component';
import { TextDynamicComponent } from '../shared/components/document-dynamic/text-dynamic/text-dynamic.component';
import { VideoDynamicComponent } from '../shared/components/document-dynamic/video-dynamic/video-dynamic.component';
import { TextFieldDynamicComponent } from '../shared/components/document-dynamic/text-field-dynamic/text-field-dynamic.component';
import { TableDynamicComponent } from '../shared/components/document-dynamic/table-dynamic/table-dynamic.component';
import { CheckBoxDynamicComponent } from '../shared/components/document-dynamic/check-box-dynamic/check-box-dynamic.component';
import { DropDownDynamicComponent } from '../shared/components/document-dynamic/drop-down-dynamic/drop-down-dynamic.component';
import { PricingTableDynamicComponent } from '../shared/components/document-dynamic/pricing-table-dynamic/pricing-table-dynamic.component';
import { DateDynamicComponent } from '../shared/components/document-dynamic/date-dynamic/date-dynamic.component';
import { DocumentMakerListComponent } from './document-maker-list/document-maker-list.component';
import { DocumentMakerAdddocumentTypeComponent } from './document-maker-adddocument-type/document-maker-adddocument-type.component';
import { ModalModule } from "ngx-bootstrap/modal";
import { TestSyncfusionAngularComponent } from './test-syncfusion-angular/test-syncfusion-angular.component';
import { DocumentEditorAllModule, DocumentEditorContainerModule } from '@syncfusion/ej2-angular-documenteditor';
import { GrapejsComponent } from './grapejs/grapejs.component';

@NgModule({
  declarations: [CanvasComponent, ContentComponent, DocumentComponent, DocumentMakerListComponent, DocumentMakerAdddocumentTypeComponent, DocumentMakerAdddocumentTypeComponent, TestSyncfusionAngularComponent, GrapejsComponent, GrapejsComponent],
  entryComponents: [ImageDynamicComponent, TextDynamicComponent, VideoDynamicComponent,
    TextFieldDynamicComponent, TableDynamicComponent, CheckBoxDynamicComponent, DropDownDynamicComponent,
    DateDynamicComponent, PricingTableDynamicComponent],
  imports: [CommonModule,DocumentMakerDynamicRoutingModule,SharedModule, DragDropModule,ModalModule,DocumentEditorContainerModule, DocumentEditorAllModule]
})
export class DocumentMakerDynamicModule { }

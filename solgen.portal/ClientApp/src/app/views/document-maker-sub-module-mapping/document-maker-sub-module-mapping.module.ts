import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentMakerSubModuleMappingRoutingModule } from './document-maker-sub-module-mapping-routing.module';
import { DocumentMakerSubModuleMappingListComponent } from './document-maker-sub-module-mapping-list/document-maker-sub-module-mapping-list.component';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DocumentMakerAddEditSubModuleMappingComponent } from './document-maker-add-edit-sub-module-mapping/document-maker-add-edit-sub-module-mapping.component';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  declarations: [DocumentMakerSubModuleMappingListComponent, DocumentMakerAddEditSubModuleMappingComponent],
  imports: [
    CommonModule,
    DocumentMakerSubModuleMappingRoutingModule,
    SharedModule,
    ModalModule.forRoot(),
    CKEditorModule
  ]
})
export class DocumentMakerSubModuleMappingModule { }

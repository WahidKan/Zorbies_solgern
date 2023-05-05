import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagetemplateComponent } from './managetemplate.component';
import { ManagetemplateRoutingModule } from './managetemplate-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ManagetemplateaddeditComponent } from './managetemplateaddedit.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { ManagetemplatedetailComponent } from './managetemplatedetail.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations:
    [
      ManagetemplateComponent,
      ManagetemplateaddeditComponent,
      ManagetemplatedetailComponent
    ],
  imports: [
    CommonModule,
    ManagetemplateRoutingModule,
    SharedModule,
    CKEditorModule, ModalModule
  ]
})
export class ManageTemplateModule { }

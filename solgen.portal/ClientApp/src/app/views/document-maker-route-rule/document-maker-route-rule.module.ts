import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentMakerRouteRuleListComponent } from './document-maker-route-rule-list/document-maker-route-rule-list.component';
import { AddEditDocumentMakerRouteRuleComponent } from './add-edit-document-maker-route-rule/add-edit-document-maker-route-rule.component';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DocumentMakerRouteRuleRoutingModule } from './document-maker-route-rule-routing.module';



@NgModule({
  declarations: [
    DocumentMakerRouteRuleListComponent, 
    AddEditDocumentMakerRouteRuleComponent
  ],
  imports: [
    CommonModule,
    DocumentMakerRouteRuleRoutingModule,
    SharedModule,
    ModalModule.forRoot()
  ]
})
export class DocumentMakerRouteRuleModule { }

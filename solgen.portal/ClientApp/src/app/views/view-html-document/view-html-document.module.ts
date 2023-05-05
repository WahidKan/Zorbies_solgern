import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GethtmldocComponent } from './gethtmldoc/gethtmldoc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/primeng';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ViewHtmlDocumentRoutingModule } from './view-html-document-routing.module';



@NgModule({
  declarations: [GethtmldocComponent],
  imports: [

    CommonModule, ViewHtmlDocumentRoutingModule, FormsModule, SharedModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule
  ]
})
export class ViewHtmlDocumentModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentMakerAdddocumentTypeComponent } from './document-maker-adddocument-type/document-maker-adddocument-type.component';
import { DocumentMakerListComponent } from './document-maker-list/document-maker-list.component';
import {DocumentComponent} from './document/document.component';
import { GrapejsComponent } from './grapejs/grapejs.component';
import { TestSyncfusionAngularComponent } from './test-syncfusion-angular/test-syncfusion-angular.component';


const routes: Routes = [
  {
    path: '',
    component: DocumentMakerListComponent,
    data: {title: 'Document List'}
  },
  {
    path: 'add/:id',
    component: DocumentComponent,
    data: {title: 'Document maker'}
  },
  {
    path: 'add-pdf',
    component: DocumentMakerAdddocumentTypeComponent,
    data: {title: 'Document maker'}
  },
  {
    path: 'edit-pdf/:id',
    component: DocumentMakerAdddocumentTypeComponent
  },
  {
    path: 'syncfusion-angular',
    component: TestSyncfusionAngularComponent
  },
  {
    path: 'grapes',
    component: GrapejsComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentMakerDynamicRoutingModule { }

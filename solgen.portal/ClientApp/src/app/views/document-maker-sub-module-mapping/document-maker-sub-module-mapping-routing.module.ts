import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentMakerAddEditSubModuleMappingComponent } from './document-maker-add-edit-sub-module-mapping/document-maker-add-edit-sub-module-mapping.component';
import { DocumentMakerSubModuleMappingListComponent } from './document-maker-sub-module-mapping-list/document-maker-sub-module-mapping-list.component';



const routes: Routes = [
  { path: '', component: DocumentMakerSubModuleMappingListComponent },
  { path: 'editdocumentmapping/:id', component: DocumentMakerAddEditSubModuleMappingComponent },
  { path: 'adddocumentmapping', component: DocumentMakerAddEditSubModuleMappingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentMakerSubModuleMappingRoutingModule { }

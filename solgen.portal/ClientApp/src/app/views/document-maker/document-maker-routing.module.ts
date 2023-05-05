import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DocumentComponent } from "./document/document.component";
import { DocumentPreviewComponent } from "./document-preview/document-preview.component";

const routes: Routes = [
  {
    path: "",
    component: DocumentComponent,
    data: { title: "Document maker" },
  },
  {
    path: "preview",
    component: DocumentPreviewComponent,
    data: { title: "Document Preview" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentMakerRoutingModule {}

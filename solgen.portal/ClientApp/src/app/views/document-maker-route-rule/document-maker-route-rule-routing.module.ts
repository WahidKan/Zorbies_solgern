import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from '../../auth/auth.guard';
import { AddEditDocumentMakerRouteRuleComponent } from "./add-edit-document-maker-route-rule/add-edit-document-maker-route-rule.component";
import { DocumentMakerRouteRuleListComponent } from "./document-maker-route-rule-list/document-maker-route-rule-list.component";

const routes: Routes = [
  { path: '', component: DocumentMakerRouteRuleListComponent },
  { path: 'editrouterule/:id', component: AddEditDocumentMakerRouteRuleComponent },
  { path: 'addrouterule', component: AddEditDocumentMakerRouteRuleComponent},
];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class DocumentMakerRouteRuleRoutingModule { }

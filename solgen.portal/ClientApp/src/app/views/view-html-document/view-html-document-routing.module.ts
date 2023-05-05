import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { GethtmldocComponent } from './gethtmldoc/gethtmldoc.component';
const routes: Routes = [

  { path: ':proposalId/:type', component: GethtmldocComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewHtmlDocumentRoutingModule { }

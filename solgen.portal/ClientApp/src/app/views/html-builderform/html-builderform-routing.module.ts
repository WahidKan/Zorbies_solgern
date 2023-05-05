import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { HtmlBuilderformComponent } from './html-builderform.component';
import { HtmlBuilderlistComponent } from './html-builderlist.component';

const routes: Routes = [
  { path: '', component: HtmlBuilderlistComponent, canActivate: [AuthGuard] },
  { path: 'addEditHtmlBuilder', component: HtmlBuilderformComponent, canActivate: [AuthGuard] },
  { path: 'editHtmlBuilder/:id', component: HtmlBuilderformComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HtmlBuilderformRoutingModule { }

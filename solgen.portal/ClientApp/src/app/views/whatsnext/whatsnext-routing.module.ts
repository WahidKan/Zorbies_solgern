import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WhatsnextlistComponent } from './whatsnextlist.component';
import { WhatsNextDetailComponent } from './whats-next-detail.component';

const routes: Routes = [
  { path: '', component: WhatsnextlistComponent },
  { path: 'checkprogress/:id', component: WhatsNextDetailComponent, data: { title: 'next' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhatsnextRoutingModule { }

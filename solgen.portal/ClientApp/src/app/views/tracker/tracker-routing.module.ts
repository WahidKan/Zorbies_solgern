import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackerlistComponent } from './trackerlist.component';
import { TrackerdetailComponent } from './trackerdetail.component';

const routes: Routes = [
  { path: '', component: TrackerlistComponent, data: { title: 'Tracker List' } },
  { path: 'Detail', component: TrackerdetailComponent, data: { title: 'Tracker List' } },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackerlistRoutingModule { }

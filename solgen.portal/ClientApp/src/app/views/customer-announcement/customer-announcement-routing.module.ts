import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerAnnouncementListComponent } from './customer-announcement-list/customer-announcement-list.component';
import { CustomerAnnouncementComponent } from './customer-announcement/customer-announcement.component';


const routes: Routes = [
  { path: 'AddAnnouncement', component: CustomerAnnouncementComponent},
  { path: 'edit/:id', component: CustomerAnnouncementComponent },
  { path: '', component: CustomerAnnouncementListComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerAnnouncementRoutingModule { }

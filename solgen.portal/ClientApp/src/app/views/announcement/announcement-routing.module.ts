import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementComponent } from './announcement.component';
import { Routes, RouterModule } from '@angular/router';
import { AddEditAnnouncementComponent } from './add-edit-announcement.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: AnnouncementComponent, canActivate: [AuthGuard]},
  { path: 'addannouncement', component: AddEditAnnouncementComponent, canActivate: [ AuthGuard], data: { privilegeCode: 'ANNOUNCEMENTADD' } },
  { path: 'editannouncement/:id', component: AddEditAnnouncementComponent, canActivate: [AuthGuard], data: { privilegeCode: 'ANNOUNCEMENTUPDATE' } },
  
];  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementRoutingModule { }

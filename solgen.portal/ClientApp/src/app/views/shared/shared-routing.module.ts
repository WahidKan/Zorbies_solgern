import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AddNotesComponent } from './notes/add-notes.component';
import { NotesListComponent } from './notes/notes-list.component';
import { NotesPartialViewComponent } from './notes/notes-partial-view.component';
import { DocumentlistComponent } from './uploaddocument/documentlist.component';
import { UploadComponent } from './uploaddocument/upload.component';
import { ManageviewComponent } from './manageview/manageview.component';
import { DragDropModule } from 'primeng/dragdrop';
import { HomeComponent } from './twilio/home/home.component';

const routes: Routes = [
  {
    path: '', component: NotesPartialViewComponent, data: { title: 'Notes' }
  },
  {
    path: 'list', component: NotesListComponent, data: { title: 'Notes List' }
  },

  {
    path: "unauthorized", component: UnauthorizedComponent
  },
  {
    path: '', component: UploadComponent, data: { title: 'Documents' }
  },
  {
    path: 'Documentlist', component: DocumentlistComponent, data: { title: 'Documents List' }
  },
  {
    path: 'video', component: HomeComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes), DragDropModule],
  exports: [RouterModule]
})
export class SharedRoutingModule { }

import { Component, OnInit, Input } from '@angular/core';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-notes-partial-view',
  templateUrl: './notes-partial-view.component.html',
  styleUrls: ['./notes-partial-view.component.scss']
})
export class NotesPartialViewComponent implements OnInit {
  @Input("contactId") contactId: any;
  @Input("addOrUpdatePermission") addOrUpdatePermission: any;
  noteList: any = {
    pager: {},
    data: []
  };
  id = "";
  sortDir = 'asc';
  sortColumn = 'NotesCreatedOn';
  loading = false;
  loadSave: boolean = false;
  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.getNotes();
  }

  
  getNotes() {
    this.loading = true;
    this.notesService.getNotesList('', this.sortColumn, this.sortDir, 0, 10, this.contactId).subscribe(response => {
      this.noteList = this.notesService.pagedData;
      this.loading = false;

    }, error => {
      this.loading = false;
    })
  }

}

import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NotesService } from './notes.service';

@Component({
  selector: 'NotesList',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit, OnChanges {
  @Input("contactId") contactId: any;
  id = "";
  sortDir = 'asc';
  sortColumn = 'NotesCreatedOn';
  @Input() pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  searchTxt = '';
  pageSizeValue: number;
  @Input("loading") loading = false
  loadSave: boolean = false;

  constructor(private notesService: NotesService) { }

  ngOnChanges(): void {
    
  }

  ngOnInit() {
    
  }

 

}

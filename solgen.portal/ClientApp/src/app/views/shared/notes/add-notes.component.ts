import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Notes, NotesService } from './notes.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'addNotes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {
  @Input("contactId") contactId: any;
  id = "";
  sortDir = 'asc';
  sortColumn = 'NotesCreatedOn';
  noteList: any = {
    pager: {},
    data: []
  };
  loadSave = false;
  @Output() refresh = new EventEmitter();
  listFilter = '';
  searchTxt = '';
  pageSizeValue: number;
  noteForm: FormGroup;

  notes: Notes = new Notes();
  constructor(private fb: FormBuilder, private notesService: NotesService,
    private toaster: ToastrService, private commonService: CommonService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  save() {
    this.loadSave = true;
    if (this.noteForm.valid) {
      
      this.notesService.saveNotes(this.noteForm.value, this.contactId).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.notesComments.reset();
          this.refresh.emit();
          this.loadSave = false;
        }
        else {
          this.toaster.error(result.responseMessage);
          this.loadSave = false;
        }
      },
        error => {
          this.loadSave = false;
        })
    }
    else {
      this.commonService.validateAllFormFields(this.noteForm);
      this.loadSave = false;
    }
  }
  
  private initForm() {
    this.noteForm = this.fb.group({
      'notesComments': [this.notes.notesComments, [Validators.required, Validators.maxLength(5000)]],
    });
  }
 
  get notesComments() { return this.noteForm.get('notesComments'); }
}

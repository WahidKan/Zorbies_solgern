import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { CommonService } from '../../shared/common.service';
import { LeadlistService, noteModel } from '../../lead/leadlist.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  @Input() offset: number;
  @ViewChild('AddNotes', { static: false }) AddNotesModal: ModalDirective;
  @ViewChild('notedetail', { static: false }) notedetail: ModalDirective;
  notemodel: noteModel = new noteModel();
  NotespagedData: any = {
    pager: {},
    data: []
  };
  usertype: string;
  isflag = false;
  notedesc: any;
  objectname: any = 'loanapplication';
  loadSave: boolean = false;
  submoduleid: any = 1;
  sortColumn = 'createdon';
  sortDir = 'desc';
  pageSizeValuenotes: number;
  lstPageSizeNotes: any;
  currentPage: number;
  loading = false;
  loanId: any;
  is_converted: any;
  @Input('IsLACanceledFlag') IsLACanceledFlag: any;

  constructor(private route: ActivatedRoute,
    private dialogService: ConfirmationDialogService,
    private commonService: CommonService,
    private leadservice: LeadlistService,
    private fb: FormBuilder,
    private router: Router,
    private toaster: ToastrService) { }

  ngOnInit() {
    this.usertype = localStorage.getItem("usertype");
    //// console.log('this.leadconvert', this.leadconvert);
   
    
    if (this.usertype.toLocaleLowerCase() !='usertypebanker') {
        this.isflag = true;
      }
    if (this.IsLACanceledFlag) {
      this.isflag = false;
    }
  
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.loanId = id;
        
      });
    this.pageSizeValuenotes = 10;
    this.currentPage = 1;
    this.getPageSizes();
    this.getNoteslist();
  }

  getNoteslist() {
    this.loading = true;
    this.leadservice.getNoteslist(this.loanId, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValuenotes, '').subscribe(response => {
         
      this.NotespagedData = this.leadservice.pagedData;
      this.offset = this.currentPage;
      this.loading = false;
    })
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
     
      this.lstPageSizeNotes = this.commonService.masters;
     
    })
  }
  DeleteNote(Id: any) {
    const message = `Are you sure you want to delete Note?`;
    this.dialogService.confirm('Delete Note', message).subscribe(confirmed => {
      if (confirmed) {

        this.leadservice.DeleteNote(Id, this.loanId, this.submoduleid, this.objectname).subscribe(r => {
          this.toaster.success(`Note has been deleted successfully..`);

          this.getNoteslist();
        }, error => {
        });
      }
    });
  }
  setPage($event) {
    this.loading = true;
    this.currentPage = $event.page;
    this.getNoteslist();
    //this.lstPageSizeNotes = $event.page - 1;
    //this.leadservice.getNoteslist(this.loanId, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.lstPageSizeNotes, this.pageSizeValuenotes,'').subscribe(response => {

    //  this.NotespagedData = this.leadservice.pagedData;
    //  // // console.log('NotespagedData', this.NotespagedData);

    //}) 
  }
  addNoteForm = this.fb.group({
    // note: ['', Validators.required],
    noteDescription: ['', Validators.required],
    isPrivate: ['0']

  })
  get noteDescription() { return this.addNoteForm.get('noteDescription'); }
  get isPrivate() { return this.addNoteForm.get('isPrivate'); }

  onChangeNotes($event) {
    this.currentPage = 1;
    this.getNoteslist();
    //this.leadservice.getNoteslist(this.loanId, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValuenotes, '').subscribe(response => {

    //  this.NotespagedData = this.leadservice.pagedData;
    //  // console.log('NotespagedData', this.NotespagedData);

    //})
  }
  closenotedesc() {
    //this.addNoteForm.reset({ isPrivate: "1" });
    this.notedetail.hide();
  }

  SaveNotes() {
    if (this.addNoteForm.valid) {
      this.loadSave = true;
      this.notemodel.note_description = this.addNoteForm.value.noteDescription;
      this.notemodel.object_ref_id = this.loanId;
      this.notemodel.object_name = this.objectname
      this.notemodel.object_id = this.submoduleid;
      this.notemodel.isPrivate = this.addNoteForm.value.isPrivate;
      this.leadservice.saveNotes(this.notemodel).subscribe((result: any) => {

        if (result.statusCode == 200) {
          //setTimeout(() => {  // console.log('notes') }, 3000);
          this.loadSave = false;
          this.toaster.success(result.responseMessage);
          this.addNoteForm.reset();
          //this.addNoteForm.patchValue({
          //  isPrivate: '0'
          //})
          this.getNoteslist();

          this.AddNotesModal.hide();


        }
        else {
          this.loadSave = false; 
          this.toaster.error(result.responseMessage);
        }

        //}, error => {
        //  //this.loadSave = false;
      });
    }
    else {
      this.loadSave = false;
      this.commonService.validateAllFormFields(this.addNoteForm);
    }
  }
  showNotesPopup() {
    this.AddNotesModal.show();

  }
  displaynotedetail(data: any) {
    this.notedesc = data.note_description;
    // // console.log('notedesc', this.notedesc);
    this.notedetail.show();
  }

  close() {
    this.AddNotesModal.hide();
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = 1;
    this.loading = true;
    this.getNoteslist();
  }
  get curPage(): number {
    return this.offset;
  }

}

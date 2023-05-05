import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { NotesService, newNotesModel } from '../notes/notes.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../common.service';
import { NavigationEnd, Router } from '@angular/router';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LeadlistService, noteModel } from '../../lead/leadlist.service';


@Component({
  selector: 'app-newnoteslist',
  templateUrl: './newnoteslist.component.html',
  styleUrls: ['./newnoteslist.component.scss']
})
export class NewnoteslistComponent implements OnInit {
  @ViewChild('notesmodel', { static: false }) notesmodel: ModalDirective;  //#replyNotesmodel
  @ViewChild('replyNotesmodel', { static: false }) replyNotesmodel: ModalDirective;
  @ViewChild('fileInput', { static: false }) fileInput;
  @ViewChild('notesCardViewDetailModal', { static: false }) modalnoteCardView: ModalDirective;
  @ViewChild('previewModelPoup', { static: false }) previewModal: ModalDirective;
  //@ViewChild('notes') notesList: NewnoteslistComponent;  #ViewAllnotesCardViewDetailModal
  @ViewChild('ViewAllnotesCardViewDetailModal', { static: false }) ViewAllnotesCardViewDetailModal: ModalDirective;
  @ViewChild('NotesPopupModel', { static: false }) addNotesPopupModels: ModalDirective;

  countChanged: EventEmitter<number> = new EventEmitter();
  @Input() offset: number;
  @Input() DisplayOnEmpty: boolean = false;currentRoute: any;
;
  isEnableComments = false;
  @Output() newItemEvent = new EventEmitter<number>();
  assignToList: any;
  statusList: any;
  isEmitedValues = false;
  addNotesForm: FormGroup;
  notifyUserId: any;
  cardNotifyUserId: any;
  cardNotifyUserIdOne: any;
  CommentsData: any;
  noteStatusCloseOrHold: any;
  CardnotestatusId: any;
  CardnotestatusIdOne: any;
  isEditFromViewAllListing = false;
  loadSave: boolean = false;
  iscommentsModel = false;
  modeltitle: string = '';
  cardName: any;
  NotesStatusId: any = '';
  editNotifyUserData: any;
  isNoteListPoup = false;
  replyMessage: any = '';
  JsonStringDataForReply = [];
  JsonStringDataForReplyOne = [];
  objectid: any;
  cardNoteIdOne;
  cardCreatedByOne: any;
  ticksForId: any = (new Date()).getTime();
  cardCreatedBy: any;
  cardCretedOn: any;
  imageExtension: any;
  previewImage: any;
  userProfilePick: any = '\\\src\\\\assets\\Uploads\\UserProfilePick\\';
  siteurl = document.location.origin;
  isReplyNotification: boolean = false;
  cardCretedOnOne: any;
  SenderIdOne: any;
  SenderId: any;
  cardSender: any;
  noteWorktypeTo: any = '';
  displayDetailNotificationMethods = false;
  ViewAllNotesOnPopupMethods = false;
  cardSenderOne: any;
  NotificationListData = [];
  ReplyMessageData = [];
  cardNoteId: any;
  isDropdownDisabled: boolean = false;
  workTypeList: any;
  imageLink: any = '';
  isWorkType = false;
  isViewNote = false;
  objFileUploadData: any[] = [];
  objReplyFileUploadData: any[] = [];
  notesTitle: any;
  noteAssignTo: any;
  resourseTypeValue: any;
  noteNotifyUser: any;
  notesStatus: any;
  notesDescription: any;
  notes: newNotesModel = new newNotesModel();
  sortDir = 'desc';
  sortColumn = 'createdon';
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  searchTxt = '';
  noteId: any;
  cardTitle: any = '';
  cardStatus: any;
  cardAssignedTo: any;
  cardResource: any;
  cardNotify: any;
  cardDesc: any;

  cardTitleOne: any = '';
  cardStatusOne: any;
  cardAssignedToOne: any;
  cardResourceOne: any;
  cardNotifyOne: any;
  currentURL: any;
  upperCaseLoginUserId: any;
  cardDescOne: any;
  lstPageSize: any
  pageSizeValue: number;
  Id: any;
  loginuserid: string;
  fileName: any;
  datalentgh: number;
  companyLogo: any;
  pageSizeValuenotes: number = 4;
  currentPageNotes: number = 1;

  NotespagedData: any = {
    pager: {},
    data: []
  };

  NotespagedData1: any = {
    pager: {},
    data: []
  };


  NotespagedDataCardView: any = {
    pager: {},
    data: []
  };
  NotesCount: number = 0;

  headTitle: any = '';
  notemodel: noteModel = new noteModel();
  fileTypesGroup: any;
  fileSize: number = 5;
  fileExtension: string = '';

  @Input('subModuleName') submoduleName: string;
  @Input('ObjectRefId') ObjectRefId: string;
  @Input('AccountId') AccountId: string;
  @Input('view') view: boolean = false;
  constructor(private notesService: NotesService,
    private toaster: ToastrService, private commonService: CommonService,
    private router: Router, private dialogService: ConfirmationDialogService, private fb: FormBuilder,
    private leadservice: LeadlistService
  ) {
   

  }

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.getConfigurationTypeFileExtensions();
    this.Id = parseInt(this.ObjectRefId);

    this.getLoginDetails();
    this.currentPageNotes = 1;
    this.isEmitedValues = false;
    this.getNoteslistCardView();
    this.pageSizeValue = 10;
    this.initForm();
    this.getPageSizes();

    this.getNoteslist();
    this.getWorkType();
    this.addNotesForm.get('notifyTo').disable();//replySendUser
    this.addNotesForm.get('replySendUser').disable();
    this.currentURL = window.location.href;

    if (this.view) {
      this.displayViewAllNotes();
    }

  }


  getConfigurationTypeFileExtensions() {
    this.commonService.getConfigurationTypeFileExtensions('Notes').subscribe((result: any) => {
      if (result && result.FileTypesGroup != '') {
        this.fileSize = result.FileSize;
        this.fileTypesGroup = JSON.parse(result.FileTypesGroup);
        this.fileTypesGroup.forEach((obj, index) => {
          if (obj.FileTypes) {
            let extension = obj.FileTypes.map(x => x.Name);
            this.fileExtension += (index > 0 && this.fileExtension != "") ? ", " : "";
            this.fileExtension += extension.join(", ");
          }
        });
      }
    });
  }

  //==========================================Notes Section ===============================================

  private initForm() {
    this.addNotesForm = this.fb.group({
      note_id: [null],
      title: ['', Validators.required,],
      status: [null, Validators.required],
      assignTo: [null, Validators.required],
      notifyTo: [null],
      notifyToExtra: [null],
      replySendUser: [null],
      resourseType: ['AssignTo', Validators.required],
      workType: [null, Validators.nullValidator],
      'notesComments': [this.notes.notesComments, [Validators.required]],
    });
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  getWorkType() {
    this.commonService.getMasterItemsList("WorkType").subscribe((res: any) => {
      this.workTypeList = this.commonService.masters;
    })
  }
  SetDropdoenValues(events) {
    if (events == 'WorkType') {
      this.isWorkType = true;
      this.addNotesForm.controls["assignTo"].setValidators(Validators.nullValidator);
      this.addNotesForm.controls["assignTo"].updateValueAndValidity();
      this.addNotesForm.controls["workType"].setValidators(Validators.required);
      this.addNotesForm.controls["workType"].updateValueAndValidity();
      this.assignTo.setValue(null);
      if (this.submoduleName == 'account' || this.submoduleName == 'Contract' || this.submoduleName == 'serviceappointment') {
        this.notesService.GetWorkOrderTypeBasedonWorkorder(this.AccountId, this.ObjectRefId, this.submoduleName).subscribe((res: any) => {
          if (res != null && res != '') {
            this.workTypeList = res;
            this.resourseType.setValue("Work Type");
          }
          else {
            this.isWorkType = false;
            this.workType.disable();
            this.resourseType.setValue("Assign To");
            this.toaster.error("No work type is available for this account. Please assign resourse!");
          }


        })
      }
      else {
        this.isWorkType = true;
        this.resourseType.setValue("Work Type");
      }
    }
    else {
      this.isWorkType = false;
      this.addNotesForm.controls["workType"].setValidators(Validators.nullValidator);
      this.addNotesForm.controls["workType"].updateValueAndValidity();
      this.addNotesForm.controls["assignTo"].setValidators(Validators.required);
      this.addNotesForm.controls["assignTo"].updateValueAndValidity();
      this.resourseType.setValue("Assign To");

    }

  }
  //getNoteslist() {
  //  this.notesService.getNoteslist(this.ObjectRefId, this.submoduleName, this.submoduleName, this.sortColumn, this.sortDir, this.currentPageNotes, this.pageSizeValuenotes, this.loginuserid).subscribe(response => {

  //    this.pagedData = this.notesService.pagedData;
  //    this.newItemEvent.emit(this.pagedData.pager.totalItems);
  //    this.datalentgh = this.pagedData.data.length;
  //    this.offset = this.currentPageNotes;
  //  })
  //}

  getNoteslist() {

    this.loadSave = true;
    this.notesService.getNoteslist(this.ObjectRefId, this.searchTxt, this.submoduleName, this.submoduleName, this.sortColumn, this.sortDir, this.currentPageNotes, this.pageSizeValuenotes, this.loginuserid, this.view).subscribe(response => {
      this.NotespagedData = this.notesService.pagedData;
      if (this.isEmitedValues == false) {

        //this.newItemEvent.emit(this.NotespagedData.pager.totalItems);
      }

      this.datalentgh = this.NotespagedData.data.length;
      this.NotesCount = this.notesService.pagedData.pager.totalItems;
      this.offset = this.currentPageNotes;
      this.addNotesPopupModels.hide();


      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }
  getNoteslistCardView() {
    this.loadSave = true;
    this.notesService.getNoteslistCardView(this.ObjectRefId, this.submoduleName, this.submoduleName, this.sortColumn, this.sortDir, this.currentPageNotes, this.pageSizeValuenotes, this.loginuserid).subscribe(response => {
      this.NotespagedDataCardView = this.notesService.pagedDataNewCardView;
      if (this.NotespagedDataCardView.data[0]) {
        this.cardTitle = this.NotespagedDataCardView.data[0].note_name;
        this.cardNoteId = this.NotespagedDataCardView.data[0].note_id;
        this.cardAssignedTo = this.NotespagedDataCardView.data[0].AssignTo;
        this.cardResource = this.NotespagedDataCardView.data[0].WorkTypeName;
        this.cardNotify = this.NotespagedDataCardView.data[0].notifyUserNames;
        this.cardDesc = this.NotespagedDataCardView.data[0].note_description;
        this.cardStatus = this.NotespagedDataCardView.data[0].Status;
        this.cardSender = this.NotespagedDataCardView.data[0].Sender;
        this.SenderId = this.NotespagedDataCardView.data[0].SenderId;
        this.cardCretedOn = this.NotespagedDataCardView.data[0].created_on;

        this.JsonStringDataForReply = this.NotespagedDataCardView.data[0].Reply;
      }
      if (this.NotespagedDataCardView.data[1]) {
        this.cardTitleOne = this.NotespagedDataCardView.data[1].note_name;
        this.cardNoteIdOne = this.NotespagedDataCardView.data[1].note_id;
        this.cardAssignedToOne = this.NotespagedDataCardView.data[1].AssignTo;
        this.cardResourceOne = this.NotespagedDataCardView.data[1].WorkTypeName;
        this.cardNotifyOne = this.NotespagedDataCardView.data[1].notifyUserNames;
        this.cardDescOne = this.NotespagedDataCardView.data[1].note_description;
        this.cardStatusOne = this.NotespagedDataCardView.data[1].Status;
        this.cardSenderOne = this.NotespagedDataCardView.data[1].Sender;
        this.SenderIdOne = this.NotespagedDataCardView.data[1].SenderId;
        this.cardCretedOnOne = this.NotespagedDataCardView.data[1].created_on;
        this.JsonStringDataForReplyOne = this.NotespagedDataCardView.data[1].Reply;
      }
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
    //this.cardTitle = this.NotespagedDataCardView.data[0].note_name;

  }
  //setPageNotes($event) {
  //  this.loadSave = true;
  //  this.currentPageNotes = $event.page - 1;
  //  this.getNoteslist();
  //  this.currentPageNotes = $event.page
  //}

  setNotesPageNo($event) {
    this.loadSave = true;
    this.currentPageNotes = $event.page;
    this.getNoteslist();
  }
  readNotes() {

  }
  setPageNotes($event) {
    this.loadSave = true;
    this.currentPageNotes = $event.page;
    this.getNoteslist();
    // this.currentPageNotes = $event.page;
  }

  onSortNotes($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPageNotes = 1;
    //this.loadSave = true;
    this.getNoteslist();
  }

  get curPageNotes(): number {
    return this.offset;
  }

  //onSortNotes($event) {
  //  const sort = $event.sorts[0]
  //  this.sortDir = sort.dir;
  //  this.sortColumn = sort.prop;
  //  this.currentPageNotes = 0;
  //  this.loadSave = true;
  //  this.getNoteslist();
  //}

  //get curPageNotes(): number {
  //  return this.offset + 1;
  //}
  //EditNotes(row) {
  //  this.notesmodel.EditNotes(row);
  //}
  deleteNotes(id) {
    const message = `Are you sure you want to delete Note?`;
    this.dialogService.confirm('Delete Note', message).subscribe(confirmed => {
      if (confirmed) {
        this.notesService.DeleteNote(id).subscribe((res: any) => {
          this.toaster.success(`Note has been deleted successfully..`);
          //this.newItemEvent.emit(this.pagedData.pager.totalItems);
          this.getNoteslist();
          this.getNoteslistCardView();
        });
      }
    });
  }

  PinNotes(id) {
    this.isEmitedValues = true;
    this.getNoteslist();
    //this.getNoteslistCount();
    //this.getNoteslistCardView();
    /// same section has been used


    this.ViewAllnotesCardViewDetailModal.hide();
    this.isNoteListPoup = true;
    const message = `Are you sure you want to pin Note?`;
    this.dialogService.confirm('Delete Note', message).subscribe(confirmed => {
      if (confirmed) {

        this.notesService.PinNotes(id).subscribe((res: any) => {
          this.toaster.success(`Note has been pin successfully..`);
          //this.newItemEvent.emit(this.pagedData.pager.totalItems);
          this.getNoteslist();
          this.ViewAllnotesCardViewDetailModal.show();
          //setTimeout(function () { this.getNoteslist(); }, 1000);

        });
      }
      else {
        this.getNoteslist();
        this.ViewAllnotesCardViewDetailModal.show();
      }
    });

  }






  get note_id() { return this.addNotesForm.get('note_id'); }
  get title() { return this.addNotesForm.get('title'); }
  get status() { return this.addNotesForm.get('status'); }
  get assignTo() { return this.addNotesForm.get('assignTo'); }
  get notifyTo() { return this.addNotesForm.get('notifyTo'); }
  get notifyToExtra() { return this.addNotesForm.get('notifyToExtra'); }
  get replySendUser() { return this.addNotesForm.get('replySendUser'); }
  get notesComments() { return this.addNotesForm.get('notesComments'); }
  get resourseType() { return this.addNotesForm.get('resourseType'); }
  get workType() { return this.addNotesForm.get('workType'); }
  //  resourseType: [null, Validators.required],
  //workType: [null],
  show(id: number) {
    if (id != null) {
      this.objFileUploadData.length = 0;
      this.isReplyNotification = false;
      this.objFileUploadData = [];
      this.currentPageNotes = 1;
      this.noteId = "";
      this.isViewNote = false;
      this.modeltitle = 'ADD NOTE'
      this.initForm();
      this.addNotesForm.reset();
      this.resourseType.setValue('Assign To');

      this.getStatusList();
      this.resourseTypeValue = "Assign To";
      this.getAssignToUsersList();
      this.fileName = '';
      this.isDropdownDisabled = false;
      if (this.fileInput != 'undefined' && typeof this.fileInput != 'undefined') {
        this.fileInput.nativeElement.value = "";
      }

      this.imageLink = '';
      this.notesmodel.show();
      this.notes.objectrefid = id;
      this.objectid = id;
    }

  }
  getStatusList() {
    this.commonService.getMasterItemsList("NotesStatus").subscribe((result: any) => {
      this.statusList = this.commonService.masters;
      //this.assignToList = this.statusList;
    })
  }

  private prepareFormDataForDocument() {
    const input = new FormData();
    input.append('noteid', this.addNotesForm.value.note_id);
    input.append('title', this.addNotesForm.value.title);
    if (this.NotesStatusId != null && this.NotesStatusId != '') {
      input.append('status', this.NotesStatusId);
    }
    else {
      input.append('status', this.addNotesForm.value.status);
    }

    input.append('assignTo', this.addNotesForm.value.assignTo);
    if (this.isReplyNotification == true) {
      input.append('notesComments', this.CommentsData);
    }
    else {
      input.append('notesComments', this.addNotesForm.value.notesComments);
    }

    input.append('moduleName', '');//objectrefid
    input.append('objectrefid', this.ObjectRefId);//objectrefid
    input.append('submoduleName', this.submoduleName);
    input.append("DomainName", this.currentURL)
    input.append('resourseType', this.addNotesForm.value.resourseType == null ? this.resourseTypeValue : this.addNotesForm.value.resourseType);
    input.append('AccountId', this.AccountId);
    input.append('workType', this.addNotesForm.value.workType == null ? null : this.addNotesForm.value.workType);

    input.append('isReplyNotes', this.isReplyNotification.toString());


    if (this.addNotesForm.value.note_id == null || this.addNotesForm.value.note_id == 0) {
      //this.notes.notifyTo = this.addNotesForm.value.notifyTo
      input.append('notifyTo', this.addNotesForm.value.notifyToExtra);
    }

    else {
      //this.notes.notifyTo = this.editNotifyUserData;
      input.append('notifyTo', this.editNotifyUserData);
    }

    if (this.commonService.isUploadImageValid) {
      if (this.fileName.value !== null) {
        input.append('filename', this.fileName);

      }
    }

    const fileBrowser = this.fileInput.nativeElement;
    //if (fileBrowser.files && fileBrowser.files[0]) {
    //  input.append('file', fileBrowser.files);
    //}
    for (let i = 0; i < fileBrowser.files.length; i++) {
      input.append(fileBrowser.files[i].name, fileBrowser.files[i])
    }
    return input;
  }
  save() {
    this.loadSave = true;
    if (this.addNotesForm.valid) {
      this.notes.noteid = this.addNotesForm.value.note_id == null ? this.notes.noteid : this.addNotesForm.value.note_id;
      this.notes.title = this.addNotesForm.value.title;
      this.notes.status = this.addNotesForm.value.status;
      this.notes.assignTo = this.addNotesForm.value.assignTo;
      this.notes.notesComments = this.addNotesForm.value.notesComments;
      this.notes.moduleName = '';
      this.notes.submoduleName = this.submoduleName;
      if (this.notes.noteid == null || this.notes.noteid == 0) {
        this.notes.notifyTo = this.addNotesForm.value.notifyTo
      }
      else {
        this.notes.notifyTo = this.editNotifyUserData;
      }
      const data = this.prepareFormDataForDocument();
      this.notesService.saveNewNotes(data).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);

          this.addNotesForm.reset();
          this.notesComments.reset();
          this.notesmodel.hide();
          this.fileName = '';
          this.isEmitedValues = false;
          this.isWorkType = false;
          this.fileInput.nativeElement.value = "";
          //this.newItemEvent.emit(this.pagedData.pager.totalItems);
          this.getNoteslist();

          this.loadSave = false;
          this.getNoteslistCardView();
          // this.notesList.refresh(this.objectid, this.submoduleName)
          this.countChanged.emit(1);
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
      this.commonService.validateAllFormFields(this.addNotesForm);
      this.loadSave = false;
    }
  }
  close() {
    this.notesmodel.hide();
    this.isWorkType = false;
    this.isEmitedValues = true;
    this.isReplyNotification = false;
    this.addNotesForm.reset();
  }
  getAssignToUsersList() {
    this.commonService.getMasterItemsList("NoteUsers").subscribe((result: any) => {
      this.assignToList = this.commonService.masters;
    });
  }

  EditNotes(row: any) {
    this.objFileUploadData.length = 0;
    this.isReplyNotification = false;
    this.objFileUploadData = [];
    this.initForm();
    this.modeltitle = 'EDIT NOTE';
    this.isViewNote = false;
    this.addNotesForm.get('notifyTo').disable();
    this.notifyTo.disable();
    this.getStatusList();
    this.getAssignToUsersList();
    this.isDropdownDisabled = true;
    this.imageLink = row.fileUrl;

    this.fileName = "";
    this.noteId = row.note_id;
    this.isDropdownDisabled = true;
    this.notesService.GetImageList(row.note_id, 'notes', this.ObjectRefId).subscribe((result: any) => {
      this.imageLink = result.fileUrl
      result.forEach(t => {
        let obj = {
          AttchementId: t.id,
          NoteId: t.noteId,
          AccountId: t.accountId,
          ParentType: t.parentType,
          fileUrl: t.fileUrl,
          FileName: t.fileName,
          Id: t.id,
          fileExtension: t.extension

        }
        this.objFileUploadData.push(obj);
      });
    });
    let notifyUsers = row.notifyUser == null ? null : row.notifyUser.split(',');
    this.editNotifyUserData = row.notifyUser;
    if (row.AssignToType == "Work Type") {
      this.isWorkType = true;
    }
    else {
      this.isWorkType = false;
    }
    if (row.Assign_to != null && row.Assign_to != '') {
      row.AssignToType = 'Assign To';
    }
    else {
      row.AssignToType = 'Work Type';
    }
    this.addNotesForm.patchValue({

      title: row.note_name,

      note_id: row.note_id,
      status: row.notestatus == null ? null : row.notestatus.toString(),
      assignTo: row.Assign_to == null ? null : row.Assign_to.toUpperCase(),
      notesComments: row.note_description,
      notifyTo: notifyUsers,
      workType: row.WorkTypeId == null ? null : row.WorkTypeId.toString(),
      resourseType: row.AssignToType,
      //resourseType:row.
    });

    this.addNotesForm.get('notifyTo').disable();
    this.notifyTo.disable();
    this.isEditFromViewAllListing = true;
    this.ViewAllnotesCardViewDetailModal.hide();
    this.notesmodel.show();

  }
  delImage(data) {
    this.noteId = data.NoteId;
    this.notesService.delImage(data.Id, data.NoteId, 'notes', data.AccountId).subscribe((result: any) => {
      this.uploadRefreshedImage();
    })
  }
  uploadRefreshedImage() {
    this.loadSave = true;
    this.objFileUploadData.length = 0;
    this.objFileUploadData = [];
    this.notesService.GetImageList(this.noteId, 'notes', this.ObjectRefId).subscribe((result: any) => {
      this.imageLink = result.fileUrl
      result.forEach(t => {
        let obj = {
          AttchementId: t.id,
          NoteId: t.noteId,
          AccountId: t.accountId,
          ParentType: t.parentType,
          fileUrl: t.fileUrl,
          FileName: t.fileName,
          Id: t.id,
          fileExtension: t.extension
        }
        this.objFileUploadData.push(obj);
      });
      this.loadSave = false;
    });

  }
  ViewNotes(row: any) {
    this.isViewNote = true;
    this.noteId = row.note_id;
    this.uploadRefreshedImage();
    this.modeltitle = 'VIEW NOTE'
    this.notesTitle = row.note_name;
    this.notesDescription = row.note_description;
    this.noteAssignTo = row.AssignTo;
    this.notesStatus = row.Status;
    this.noteNotifyUser = row.notifyUserNames;
    this.noteWorktypeTo = row.WorkTypeName,
      this.imageLink = row.fileUrl;
    this.notesmodel.show();
  }
  setFile($event): void {
    this.commonService.validUploadDocumentType($event.target.files[0].name, $event.target.accept);
    this.commonService.validUploadDocumentSize($event.target.files[0].size, this.fileSize);
    this.fileName = '';
    //this.fileName = null;
    if (this.commonService.isFileValid && this.commonService.isFileExtensionValid) {
      const fileBrowser = this.fileInput.nativeElement;
      for (let i = 0; i < fileBrowser.files.length; i++) {
        this.fileName += fileBrowser.files[i].name;
      }
    }
  }

  redirectToSource() {
    this.notesService.setNotesToRead(this.cardNoteId).subscribe(m => {
      this.getNoteslistCardView();
    });
  }
  getLoginDetails() {
    //this.commonService.getLoggedInName.subscribe((userdetail: any) => {
    //  this.loginuserid = userdetail.id.toUpperCase();

    //  this.upperCaseLoginUserId = userdetail.id.toLowerCase();
    //});

    let usrdata = this.commonService.TryJsonParse(localStorage.getItem("userinfo"));
    this.loginuserid = usrdata.id.toLowerCase();
    this.upperCaseLoginUserId = usrdata.id.toLowerCase();

  };

  displayDetailNotificationHistory(cardname, Id, ObjectRefId) {
    this.cardNoteId = Id;
    this.ObjectRefId = ObjectRefId;
    this.displayDetailNotification(cardname, Id);
  }

  displayDetailNotification(cardname, Id) {
    this.isEmitedValues = true;
    this.cardName = cardname;
    this.noteId = Id;
    this.getStatusList();
    this.getLoginDetails();
    this.CommentsData = '';
    this.displayDetailNotificationMethods = true;
    this.ViewAllNotesOnPopupMethods = false;
    this.objFileUploadData.length = 0;
    this.ReplyMessageData.length = 0;
    this.ReplyMessageData = [];
    this.objFileUploadData = [];
    this.objReplyFileUploadData.length = 0;
    this.objReplyFileUploadData = [];
    this.notesService.GetImageList(Id, 'notes', this.ObjectRefId).subscribe((result: any) => {
      this.imageLink = result.fileUrl
      result.forEach(t => {
        let obj = {
          AttchementId: t.id,
          NoteId: t.noteId,
          AccountId: t.accountId,
          ParentType: t.parentType,
          fileUrl: t.fileUrl,
          FileName: t.fileName,
          Id: t.id,
          fileExtension: t.extension

        }
        this.objFileUploadData.push(obj);
      });
    });
    if (cardname == 'itenone') {
      ;
      this.notesService.GetNoteCurentDataList(this.cardNoteId, this.ObjectRefId).subscribe((result: any) => {
        let currentData = JSON.parse(result);
        if (currentData[0] != null && currentData[0] != '') {
          var obj = {
            title: currentData[0].title,
            noteId: currentData[0].noteId,
            description: currentData[0].description,
            senderName: currentData[0].senderName,
            senderId: currentData[0].senderId,
            CreatedOn: currentData[0].CreatedOn,
            Status: currentData[0].Status,
            createdBy: currentData[0].createdBy.toUpperCase()
          }
          this.NotificationListData.push(obj);
          this.notifyUserId = currentData[0].notifyUserId;
          this.cardTitle = currentData[0].title;
          this.cardNoteId = currentData[0].noteId;
          this.cardDesc = currentData[0].description;
          this.cardSender = currentData[0].senderName;
          this.SenderId = currentData[0].senderId;
          this.cardCretedOn = currentData[0].CreatedOn;
          this.cardStatus = currentData[0].Status;
          this.cardCreatedBy = currentData[0].createdBy;
          this.NotesStatusId = currentData[0].NotesStatusId == null ? null : currentData[0].NotesStatusId.toString();
          this.JsonStringDataForReply = [];
          this.JsonStringDataForReply.push(currentData[0].Reply);
        }
      })

      //var obj = {
      //  title: this.cardTitle,
      //  noteId: this.cardNoteId,
      //  description: this.cardDesc,
      //  senderName: this.cardSender,
      //  senderId: this.SenderId,
      //  CreatedOn: this.cardCretedOn,
      //  Status: this.cardStatus,
      //  createdBy: this.cardCreatedBy.toUpperCase()
      //}
      //this.NotificationListData.push(obj);
      //this.notifyUserId = this.cardNotifyUserId;

      //this.NotesStatusId = this.CardnotestatusId == null ? null : this.CardnotestatusId.toString();

      this.notesService.GetNoteThreadList(this.cardNoteId, this.ObjectRefId).subscribe((reply: any) => {

        // // console.log("ReplyAll", reply);
        if (reply != null && reply != '') {
          JSON.parse(reply).forEach((t, index) => {
            this.notesService.GetImageList(t.note_id, 'notes', this.ObjectRefId).subscribe((result: any) => {
              this.imageLink = result.fileUrl
              // // console.log("resultMultipleFile", result)
              result.forEach(t => {
                let obj = {
                  AttchementId: t.id,
                  NoteId: t.noteId,
                  AccountId: t.accountId,
                  ParentType: t.parentType,
                  fileUrl: t.fileUrl,
                  FileName: t.fileName,
                  Id: t.id,
                  fileExtension: t.extension

                }
                this.objReplyFileUploadData.push(obj);
              });
            });

            var objReplyMessageContent = {
              noteReplyParentId: t.noteReplyParentId,
              noteId: t.note_id,
              message: t.note_description,
              displayOrder: index + 1,
              ReplyFileData: this.objReplyFileUploadData,
              CreatedOn: t.CreatedOn,
              Sender: t.Sender,
              noteStatusCloseOrHold: t.noteStatusCloseOrHold,
              userProfilePick: this.siteurl + this.userProfilePick + t.UserProfilePick,
              alterNatePick: t.UserProfilePick
            }
            if (t.noteStatusId != null && t.noteStatusId != '') {
              this.NotesStatusId = t.noteStatusId.toString();
            }
            this.noteStatusCloseOrHold = t.noteStatusCloseOrHold;
            this.ReplyMessageData.push(objReplyMessageContent);
            this.objReplyFileUploadData.length = 0;
            this.objReplyFileUploadData = [];
          });
        }
      })
      //if (this.displayDetailNotificationMethods == false) {
      this.modalnoteCardView.show();
      //}

      this.notesService.setNotesToRead(this.cardNoteId).subscribe(m => {

      });
      this.isEmitedValues = false;
      this.getNoteslist();
      /// same section has been used
    }
    else {


      this.notesService.GetNoteCurentDataList(this.cardNoteIdOne, this.ObjectRefId).subscribe((result: any) => {
        // // console.log("resultOftheC", JSON.parse(result));
        let currentData = JSON.parse(result);
        if (currentData[0] != null && currentData[0] != '') {
          var obj = {
            title: currentData[0].title,
            noteId: currentData[0].noteId,
            description: currentData[0].description,
            senderName: currentData[0].senderName,
            senderId: currentData[0].senderId,
            CreatedOn: currentData[0].CreatedOn,
            Status: currentData[0].Status,
            createdBy: currentData[0].createdBy.toUpperCase()
          }
          this.NotificationListData.push(obj);
          this.notifyUserId = currentData[0].notifyUserId;
          this.cardTitleOne = currentData[0].title;
          this.cardNoteIdOne = currentData[0].noteId;
          this.cardDescOne = currentData[0].description;
          this.cardSenderOne = currentData[0].senderName;
          this.SenderIdOne = currentData[0].senderId;
          this.cardCretedOn = currentData[0].CreatedOn;
          this.cardStatusOne = currentData[0].Status;
          this.cardCreatedByOne = currentData[0].createdBy;
          this.NotesStatusId = currentData[0].NotesStatusId == null ? null : currentData[0].NotesStatusId.toString();
          this.JsonStringDataForReplyOne = [];
          this.JsonStringDataForReplyOne.push(currentData[0].Reply);
        }
      })
      //var obj = {
      //  title: this.cardTitleOne,
      //  noteId: this.cardNoteIdOne,
      //  senderId: this.SenderIdOne,
      //  description: this.cardDescOne,
      //  senderName: this.cardSenderOne,
      //  CreatedOn: this.cardCretedOnOne,
      //  Status: this.cardStatusOne,
      //  createdBy: this.cardCreatedByOne.toUpperCase()

      //}
      //this.NotificationListData.push(obj);
      //this.notifyUserId = this.cardNotifyUserIdOne;
      //this.NotesStatusId = this.CardnotestatusIdOne == null ? null : this.CardnotestatusIdOne.toString();

      this.notesService.GetNoteThreadList(this.cardNoteIdOne, this.ObjectRefId).subscribe((reply: any) => {
        //// console.log("ReplyAll", reply);
        if (reply != null && reply != '') {
          JSON.parse(reply).forEach((t, index) => {
            this.notesService.GetImageList(t.note_id, 'notes', this.ObjectRefId).subscribe((result: any) => {
              this.imageLink = result.fileUrl
              //// console.log("resultMultipleFile", result)
              result.forEach(t => {
                let obj = {
                  AttchementId: t.id,
                  NoteId: t.noteId,
                  AccountId: t.accountId,
                  ParentType: t.parentType,
                  fileUrl: t.fileUrl,
                  FileName: t.fileName,
                  Id: t.id,
                  fileExtension: t.extension

                }
                this.objReplyFileUploadData.push(obj);
              });
            });

            var objReplyMessageContent = {
              noteReplyParentId: t.noteReplyParentId,
              noteId: t.note_id,
              message: t.note_description,
              displayOrder: index + 1,
              ReplyFileData: this.objReplyFileUploadData,
              CreatedOn: t.CreatedOn,
              Sender: t.Sender,
              noteStatusCloseOrHold: t.noteStatusCloseOrHold,
              userProfilePick: this.siteurl + this.userProfilePick + t.UserProfilePick,
              alterNatePick: t.UserProfilePick
            }
            if (t.noteStatusId != null && t.noteStatusId != '') {
              this.NotesStatusId = t.noteStatusId.toString();
            }
            this.noteStatusCloseOrHold = t.noteStatusCloseOrHold;
            this.ReplyMessageData.push(objReplyMessageContent);
            this.JsonStringDataForReplyOne.push(this.ReplyMessageData);
            this.objReplyFileUploadData.length = 0;
            this.objReplyFileUploadData = [];
          });
        }
      })

      this.modalnoteCardView.show();
      this.notesService.setNotesToRead(this.cardNoteIdOne).subscribe(m => {

      });
      this.isEmitedValues = false;
      this.getNoteslist();
    }

    setTimeout(() => {
      var element = document.getElementById("allcommentsnotes");
      if (element != null) {
        element.scrollIntoView({ behavior: 'smooth' });
        element.scrollTop = element.scrollHeight;
      }
      //element.scrollIntoView({ behavior: 'smooth' });
      //element.scrollTop = element.scrollHeight;
    }, 1000)




  }

  closeNoteCardView() {
    this.objFileUploadData.length = 0;
    this.objFileUploadData = [];
    this.NotificationListData.length = 0;
    this.isEnableComments = false;

    if (this.view) {
      this.modalnoteCardView.hide();
      this.isWorkType = false;
    }
    else {
      if (this.isNoteListPoup == true) {
        this.modalnoteCardView.hide();
        this.ViewAllnotesCardViewDetailModal.show();
        this.isWorkType = false;
      }
      else {
        if (this.isEmitedValues == false) {
          this.newItemEvent.emit(0);
        }

        this.isWorkType = false;
        this.modalnoteCardView.hide();
      }
    }
    this.getNoteslist();
  }

  displayViewAllNotes() {
    this.pageSizeValuenotes = 10;
    this.isEmitedValues = true;
    this.getNoteslist();
    this.ViewAllnotesCardViewDetailModal.show();
  }

  closeViewAllNoteCardView() {
    this.ViewAllnotesCardViewDetailModal.hide();
    this.objFileUploadData.length = 0;
    this.objFileUploadData = [];
    this.searchTxt = '';

    this.isNoteListPoup = false;
  }
  ViewAllNotesOnPopup(row) {
    this.ViewAllNotesOnPopupMethods = true;
    this.displayDetailNotificationMethods = false;
    this.NotificationListData.length = 0;
    this.NotificationListData = [];


    this.isEmitedValues = true;
    this.objFileUploadData.length = 0;
    this.ReplyMessageData.length = 0;
    this.ReplyMessageData = [];
    this.objFileUploadData = [];
    this.objReplyFileUploadData.length = 0;
    this.objReplyFileUploadData = [];
    this.notesService.GetImageList(row.note_id, 'notes', this.ObjectRefId).subscribe((result: any) => {
      this.imageLink = result.fileUrl
      //// console.log("resultMultipleFile", result)
      result.forEach(t => {
        let obj = {
          AttchementId: t.id,
          NoteId: t.noteId,
          AccountId: t.accountId,
          ParentType: t.parentType,
          fileUrl: t.fileUrl,
          FileName: t.fileName,
          Id: t.id,
          fileExtension: t.extension

        }
        this.objFileUploadData.push(obj);
      });
      // // console.log("objFileUploadData", this.objFileUploadData)
    });

    var obj = {
      title: row.note_name,
      noteId: row.note_id,
      description: row.note_description,
      senderName: row.Sender,
      senderId: row.SenderId,
      CreatedOn: row.created_on,
      Status: row.Status,
      createdBy: row.created_by.toUpperCase()

    }
    this.NotesStatusId = row.noteStatusId == null ? null : row.noteStatusId.toString();
    this.NotificationListData.push(obj);
    this.notifyUserId = row.notifyUserId;
    //var objReplyMessage = {
    //  noteReplyParentId: 0,
    //  noteId: this.cardNoteId,
    //  message: this.cardDesc,
    //  displayOrder:0
    //}
    //this.ReplyMessageData.push(objReplyMessage);

    this.notesService.GetNoteThreadList(row.note_id, this.ObjectRefId).subscribe((reply: any) => {

      if (reply != null && reply != '') {
        JSON.parse(reply).forEach((t, index) => {
          this.notesService.GetImageList(t.note_id, 'notes', this.ObjectRefId).subscribe((result: any) => {
            this.imageLink = result.fileUrl
            //// console.log("resultMultipleFile", result)
            result.forEach(t => {
              let obj = {
                AttchementId: t.id,
                NoteId: t.noteId,
                AccountId: t.accountId,
                ParentType: t.parentType,
                fileUrl: t.fileUrl,
                FileName: t.fileName,
                Id: t.id

              }
              this.objReplyFileUploadData.push(obj);
            });
          });

          var objReplyMessageContent = {
            noteReplyParentId: t.noteReplyParentId,
            noteId: t.note_id,
            message: t.note_description,
            displayOrder: index + 1,
            ReplyFileData: this.objReplyFileUploadData,
            CreatedOn: t.CreatedOn,
            Sender: t.Sender,
            noteStatusCloseOrHold: t.noteStatusCloseOrHold,
            userProfilePick: this.siteurl + this.userProfilePick + t.UserProfilePick,
            alterNatePick: t.UserProfilePick
          }
          this.noteStatusCloseOrHold = t.noteStatusCloseOrHold;
          if (t.noteStatusId != null && t.noteStatusId != '') {
            this.NotesStatusId = t.noteStatusId.toString();
          }
          this.ReplyMessageData.push(objReplyMessageContent);
          this.objReplyFileUploadData.length = 0;
          this.objReplyFileUploadData = [];
        });
      }
    })

    //// console.log("jsonData", this.ReplyMessageData)
    this.modalnoteCardView.show();
    this.notesService.setNotesToRead(row.note_id).subscribe(m => {

    });
    this.isEmitedValues = true;
    this.getNoteslist();
    //this.getNoteslistCount();
    //this.getNoteslistCardView();
    /// same section has been used


    this.ViewAllnotesCardViewDetailModal.hide();
    this.isNoteListPoup = true;

    setTimeout(() => {
      var element = document.getElementById("allcommentsnotes");
      element.scrollIntoView({ behavior: 'smooth' });
      element.scrollTop = element.scrollHeight;
    }, 1000)
    this.modalnoteCardView.show();
  }

  AddReply(item) {
    this.isReplyNotification = true;
    this.isViewNote = false;
    this.modeltitle = "Reply Note";

    this.objFileUploadData.length = 0;
    this.isReplyNotification = false;
    this.objFileUploadData = [];
    this.currentPageNotes = 1;
    this.noteId = "";
    this.isViewNote = false;
    this.initForm();
    this.addNotesForm.reset();
    this.resourseType.setValue('Assign To');

    this.getStatusList();
    this.resourseTypeValue = "Assign To";
    this.getAssignToUsersList();
    this.fileName = '';
    this.isDropdownDisabled = false;
    if (this.fileInput != 'undefined' && typeof this.fileInput != 'undefined') {
      this.fileInput.nativeElement.value = "";
    }

    this.imageLink = '';
    this.assignTo.setValue(item.senderId);

    this.title.setValue(item.title);
    this.resourseType.setValue('Assign To');

    this.note_id.setValue(item.noteId);
    this.replySendUser.setValue(item.senderId.toUpperCase());
    //this.replyMessage = item.description;
    //this.modalnoteCardView.hide();
    //this.replyNotesmodel.show();
  }

  closeReplyPopup() {
    this.replyNotesmodel.hide();
    this.modalnoteCardView.show();
  }

  saveReply(item) {
    this.loadSave = true;
    if (this.CommentsData == '' || this.CommentsData == null || typeof this.CommentsData == 'undefined') {
      this.iscommentsModel = true;
    }
    else {
      this.iscommentsModel = false;

      this.AddReply(item);
      this.isReplyNotification = true;
      this.addNotesForm.controls["title"].setValidators(Validators.nullValidator);
      this.addNotesForm.controls["title"].updateValueAndValidity();
      this.addNotesForm.controls["notesComments"].setValidators(Validators.nullValidator);
      this.addNotesForm.controls["notesComments"].updateValueAndValidity();
      this.addNotesForm.controls["workType"].setValidators(Validators.nullValidator);
      this.addNotesForm.controls["workType"].updateValueAndValidity();
      this.addNotesForm.controls["assignTo"].setValidators(Validators.nullValidator);
      this.addNotesForm.controls["assignTo"].updateValueAndValidity();
      this.addNotesForm.controls["status"].setValidators(Validators.nullValidator);
      this.addNotesForm.controls["status"].updateValueAndValidity();
      this.addNotesForm.controls["resourseType"].setValidators(Validators.nullValidator);
      this.addNotesForm.controls["resourseType"].updateValueAndValidity();


      if (this.addNotesForm.valid && !this.iscommentsModel) {
        this.notes.noteid = this.addNotesForm.value.note_id == null ? this.notes.noteid : this.addNotesForm.value.note_id;
        this.notes.title = this.addNotesForm.value.title;
        this.notes.status = this.addNotesForm.value.status;
        this.notes.assignTo = this.addNotesForm.value.assignTo;
        this.notes.notesComments = this.addNotesForm.value.notesComments;
        this.notes.moduleName = '';
        this.notes.submoduleName = this.submoduleName;
        if (this.notes.noteid == null || this.notes.noteid == 0) {
          this.notes.notifyTo = this.addNotesForm.value.notifyTo
        }
        else {
          this.notes.notifyTo = this.editNotifyUserData;
        }

        //// console.log('notes', item)
        const data = this.prepareFormDataForDocument();
        this.notesService.saveNewNotes(data).subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success(result.responseMessage);


            // this.notesList.refresh(this.objectid, this.submoduleName)
            if (this.displayDetailNotificationMethods == true) {
              this.ViewAllNotesOnPopupMethods = false;
              this.CommentsData = '';
              // this.getNoteslistCardView();
              this.RefreshdisplayDetailNotification(this.cardName, item.noteId);

              //this.modalnoteCardView.hide();
            }
            else {
              this.displayDetailNotificationMethods = false;
              this.getNoteslistCardView();
              this.CommentsData = '';
              this.RefreshViewAllNotesOnPopup(item);
              //this.modalnoteCardView.hide();
            }
          }
          else {
            this.toaster.error(result.responseMessage);

          }
        },
          error => {
            this.loadSave = false;
          })

      }
      else {
        this.commonService.validateAllFormFields(this.addNotesForm);
        this.loadSave = false;
      }
    }
    this.loadSave = false;
  }
  checkPin(events) {
    this.iscommentsModel = false;
  }

  RefreshdisplayDetailNotification(cardname, Id) {
    this.getNoteslistCardView();

    //setTimeout(function () { 
    this.isEmitedValues = true;
    this.cardName = cardname;
    this.noteId = Id;
    this.NotificationListData.length = 0;
    this.NotificationListData = [];
    //this.displayDetailNotificationMethods = false;
    //this.ViewAllNotesOnPopupMethods = false;
    this.objFileUploadData.length = 0;
    this.ReplyMessageData.length = 0;
    this.ReplyMessageData = [];
    this.objFileUploadData = [];
    this.objReplyFileUploadData.length = 0;
    this.objReplyFileUploadData = [];
    this.notesService.GetImageList(Id, 'notes', this.ObjectRefId).subscribe((result: any) => {
      this.imageLink = result.fileUrl
      //// console.log("resultMultipleFile", result)
      result.forEach(t => {
        let obj = {
          AttchementId: t.id,
          NoteId: t.noteId,
          AccountId: t.accountId,
          ParentType: t.parentType,
          fileUrl: t.fileUrl,
          FileName: t.fileName,
          Id: t.id,
          fileExtension: t.extension

        }
        this.objFileUploadData.push(obj);
      });
      //// console.log("objFileUploadData", this.objFileUploadData)
    });
    if (cardname == 'itenone') {
      var obj = {
        title: this.cardTitle,
        noteId: this.cardNoteId,
        description: this.cardDesc,
        senderName: this.cardSender,
        senderId: this.SenderId,
        CreatedOn: this.cardCretedOn,
        Status: this.cardStatus,
        createdBy: this.cardCreatedBy.toUpperCase()
      }
      this.NotificationListData.push(obj);
      this.notifyUserId = this.cardNotifyUserId;

      this.notesService.GetNoteThreadList(this.NotificationListData[0].noteId, this.ObjectRefId).subscribe((reply: any) => {
        if (reply != '' && reply != null) {
          JSON.parse(reply).forEach((t, index) => {
            this.notesService.GetImageList(t.note_id, 'notes', this.ObjectRefId).subscribe((result: any) => {
              this.imageLink = result.fileUrl
              //// console.log("resultMultipleFile", result)
              result.forEach(t => {
                let obj = {
                  AttchementId: t.id,
                  NoteId: t.noteId,
                  AccountId: t.accountId,
                  ParentType: t.parentType,
                  fileUrl: t.fileUrl,
                  FileName: t.fileName,
                  Id: t.id

                }
                this.objReplyFileUploadData.push(obj);
              });
            });

            var objReplyMessageContent = {
              noteReplyParentId: t.noteReplyParentId,
              noteId: t.note_id,
              message: t.note_description,
              displayOrder: index + 1,
              ReplyFileData: this.objReplyFileUploadData,
              CreatedOn: t.CreatedOn,
              Sender: t.Sender,
              noteStatusCloseOrHold: t.noteStatusCloseOrHold,
              userProfilePick: this.siteurl + this.userProfilePick + t.UserProfilePick,
              alterNatePick: t.UserProfilePick
            }
            this.noteStatusCloseOrHold = t.noteStatusCloseOrHold;
            if (t.noteStatusId != null && t.noteStatusId != '') {
              this.NotesStatusId = t.noteStatusId.toString();
            }
            this.ReplyMessageData.push(objReplyMessageContent);
            this.objReplyFileUploadData.length = 0;
            this.objReplyFileUploadData = [];
            //this.JsonStringDataForReply.length = 0;
            //this.JsonStringDataForReply = [];
          });
        }
      })
    }
    else {
      var obj = {
        title: this.cardTitleOne,
        noteId: this.cardNoteIdOne,
        senderId: this.SenderIdOne,
        description: this.cardDescOne,
        senderName: this.cardSenderOne,
        CreatedOn: this.cardCretedOnOne,
        Status: this.cardStatusOne,
        createdBy: this.cardCreatedByOne.toUpperCase()

      }
      this.NotificationListData.push(obj);
      this.notifyUserId = this.cardNotifyUserIdOne;
      //// console.log("JsonStringDataForReplyOne", this.JsonStringDataForReplyOne)
      this.notesService.GetNoteThreadList(this.NotificationListData[0].noteId, this.ObjectRefId).subscribe((reply: any) => {
        if (reply != '' && reply != null) {
          JSON.parse(reply).forEach((t, index) => {
            this.notesService.GetImageList(t.note_id, 'notes', this.ObjectRefId).subscribe((result: any) => {
              this.imageLink = result.fileUrl
              //// console.log("resultMultipleFile", result)
              result.forEach(t => {
                let obj = {
                  AttchementId: t.id,
                  NoteId: t.noteId,
                  AccountId: t.accountId,
                  ParentType: t.parentType,
                  fileUrl: t.fileUrl,
                  FileName: t.fileName,
                  Id: t.id

                }
                this.objReplyFileUploadData.push(obj);
              });
            });

            var objReplyMessageContent = {
              noteReplyParentId: t.noteReplyParentId,
              noteId: t.note_id,
              message: t.note_description,
              displayOrder: index + 1,
              ReplyFileData: this.objReplyFileUploadData,
              CreatedOn: t.CreatedOn,
              Sender: t.Sender,
              noteStatusCloseOrHold: t.noteStatusCloseOrHold,
              userProfilePick: this.siteurl + this.userProfilePick + t.UserProfilePick,
              alterNatePick: t.UserProfilePick
            }
            if (t.noteStatusId != null && t.noteStatusId != '') {
              this.NotesStatusId = t.noteStatusId.toString();
            }
            this.noteStatusCloseOrHold = t.noteStatusCloseOrHold;
            this.ReplyMessageData.push(objReplyMessageContent);
            this.objReplyFileUploadData.length = 0;
            this.objReplyFileUploadData = [];
          });
          // this.JsonStringDataForReplyOne.length = 0;
          //this.JsonStringDataForReplyOne = [];
          //this.isEmitedValues = false;
          // this.getNoteslist();
        }
      })
    }
    setTimeout(() => {
      var element = document.getElementById("allcommentsnotes");
      element.scrollIntoView({ behavior: 'smooth' });
      element.scrollTop = element.scrollHeight;
    }, 1000)
    this.modalnoteCardView.show();
  }

  RefreshViewAllNotesOnPopup(row) {
    // console.log("viewAll", row);
    this.ViewAllNotesOnPopupMethods = true;
    this.displayDetailNotificationMethods = false;
    this.NotificationListData.length = 0;
    this.NotificationListData = [];


    this.isEmitedValues = true;
    this.objFileUploadData.length = 0;
    this.ReplyMessageData.length = 0;
    this.ReplyMessageData = [];
    this.objFileUploadData = [];
    this.objReplyFileUploadData.length = 0;
    this.objReplyFileUploadData = [];
    this.notesService.GetImageList(row.noteId, 'notes', this.ObjectRefId).subscribe((result: any) => {
      this.imageLink = result.fileUrl
      //// console.log("resultMultipleFile", result);
      //// console.log("imageLink", this.imageLink);
      result.forEach(t => {
        let obj = {
          AttchementId: t.id,
          NoteId: t.noteId,
          AccountId: t.accountId,
          ParentType: t.parentType,
          fileUrl: t.fileUrl,
          FileName: t.fileName,
          Id: t.id,
          fileExtension: t.extension

        }
        this.objFileUploadData.push(obj);
      });
      //// console.log("objFileUploadData", this.objFileUploadData)
    });

    var obj = {
      title: row.title,
      noteId: row.noteId,
      description: row.description,
      senderName: row.senderName,
      senderId: row.senderId,
      CreatedOn: row.CreatedOn,
      Status: row.Status,
      createdBy: row.createdBy.toUpperCase()
    }
    this.NotificationListData.push(obj);
    this.notifyUserId = row.notifyUserId;
    //var objReplyMessage = {
    //  noteReplyParentId: 0,
    //  noteId: this.cardNoteId,
    //  message: this.cardDesc,
    //  displayOrder:0
    //}
    //this.ReplyMessageData.push(objReplyMessage);
    this.notesService.GetNoteThreadList(this.NotificationListData[0].noteId, this.ObjectRefId).subscribe((reply: any) => {
      //// console.log("ReplyAll", reply);
      if (reply != null && reply != '') {
        JSON.parse(reply).forEach((t, index) => {
          this.notesService.GetImageList(t.note_id, 'notes', this.ObjectRefId).subscribe((result: any) => {
            this.imageLink = result.fileUrl
            //// console.log("resultMultipleFile", result)
            result.forEach(t => {
              let obj = {
                AttchementId: t.id,
                NoteId: t.noteId,
                AccountId: t.accountId,
                ParentType: t.parentType,
                fileUrl: t.fileUrl,
                FileName: t.fileName,
                Id: t.id

              }
              this.objReplyFileUploadData.push(obj);
            });
          });

          var objReplyMessageContent = {
            noteReplyParentId: t.noteReplyParentId,
            noteId: t.note_id,
            message: t.note_description,
            displayOrder: index + 1,
            ReplyFileData: this.objReplyFileUploadData,
            CreatedOn: t.CreatedOn,
            Sender: t.Sender,
            noteStatusCloseOrHold: t.noteStatusCloseOrHold,
            userProfilePick: this.siteurl + this.userProfilePick + t.UserProfilePick,
            alterNatePick: t.UserProfilePick
          }
          if (t.noteStatusId != null && t.noteStatusId != '') {
            this.NotesStatusId = t.noteStatusId.toString();
          }
          this.noteStatusCloseOrHold = t.noteStatusCloseOrHold;
          this.ReplyMessageData.push(objReplyMessageContent);
          this.objReplyFileUploadData.length = 0;
          this.objReplyFileUploadData = [];
        });
      }
    });



    //// console.log("jsonData", this.ReplyMessageData)
    this.modalnoteCardView.show();
    this.notesService.setNotesToRead(this.cardNoteId).subscribe(m => {

    });
    setTimeout(() => {
      var element = document.getElementById("allcommentsnotes");
      element.scrollIntoView({ behavior: 'smooth' });
      element.scrollTop = element.scrollHeight;
    }, 1000)
    this.modalnoteCardView.show();
  }

  AddNotes() {
    this.headTitle = "Add Note";
    this.isViewNote = false;
    this.addNoteForm.reset();
    this.show(this.Id);
  }
  //========================Getting Note Form Value=============================
  //get note_id() { return this.addNoteForm.get('note_id'); }
  get noteTitle() { return this.addNoteForm.get('noteTitle'); }
  get noteDescription() { return this.addNoteForm.get('noteDescription'); }
  //=============================================================================
  addNoteForm = this.fb.group({
    note_id: [null],
    noteTitle: ['', Validators.required],
    noteDescription: ['', Validators.required]
  });

  SaveNote() {
    this.loadSave = true;
    if (this.addNoteForm.valid) {


      this.notemodel.note_id = this.addNoteForm.value.note_id;
      this.notemodel.note_name = this.addNoteForm.value.noteTitle;
      this.notemodel.note_description = this.addNoteForm.value.noteDescription;
      this.notemodel.object_name = "WorkOrder";
      this.notemodel.object_ref_id = this.Id;
      this.notemodel.object_id = 234;
      this.leadservice.saveNotes(this.notemodel).subscribe((result: any) => {

        if (result.statusCode == 200) {
          this.loadSave = false;
          this.toaster.success(result.responseMessage);
          this.addNoteForm.reset();
          this.getNoteslist();
          //this.addNotesPopupModel.hide();
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      });
    }
    else {
      this.commonService.validateAllFormFields(this.addNoteForm);
      this.loadSave = false;
    }
  }


  closeNotesPopupModelPopup() {
    this.addNotesPopupModels.hide();
    //this.addNoteForm.reset();
  }





  open(imageList: any, index: number = 0): void {
    this.imageExtension = imageList.split('.').pop();
    this.previewImage = '';
    this.previewImage = imageList;
    this.modalnoteCardView.hide();
    this.previewModal.show();

  }

  downloadFile(e: any, url: string) {
    this.loadSave = true;
    e.preventDefault();
    var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
      var a = document.createElement('a');
      a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
      a.download = filename; // Set the file name.
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    xhr.open('GET', url);
    xhr.send();
    this.loadSave = false;
  };

  closePreview() {
    this.modalnoteCardView.show();
    this.previewModal.hide();

  };

}

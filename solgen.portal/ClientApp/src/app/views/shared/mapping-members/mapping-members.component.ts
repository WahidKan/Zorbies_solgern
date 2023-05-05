import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../common.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { JsonData, MappingMembersService } from './mapping-members.service';
import { ServiceresourseService } from '../../serviceresource/serviceresourse.service';
import { MappingLocationService } from '../mapping-locations/mapping-location.service';

@Component({
  selector: 'app-mapping-members',
  templateUrl: './mapping-members.component.html',
  styleUrls: ['./mapping-members.component.scss']
})
export class MappingMembersComponent implements OnInit {

  @ViewChild('mappingLocationModal', { static: false }) mappingLocationModal: ModalDirective;  //#replyNotesmodel
  countChanged: EventEmitter<number> = new EventEmitter();
  @Input() offset: number;

  assignToList: any;
  statusList: any;
  isEmitedValues = false;
  
  CommentsData: any;
  loadSave: boolean = false;
  iscommentsModel = false;
  
  cardName: any;
  editNotifyUserData: any;
  isNoteListPoup = false;
  replyMessage: any = '';
  JsonStringDataForReply: any;
  JsonStringDataForReplyOne: any;
  objectid: any;
  cardNoteIdOne;
  cardCretedOn: any;
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
  //notes: newNotesModel = new newNotesModel();
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
  cardDescOne: any;
  lstPageSize: any
  pageSizeValue: number;
  Id: any;
  loginuserid: any;
  fileName: any;
  companyLogo: any;
  @Input('LocationType') LocationType: any;
  @Input('LocationId') LocationId: any;
  @Output() newMappingMemberItemEvent = new EventEmitter<number>();
  mappingMemberCount: number = 0;
  mappingMemberPagedData: any = {
    pager: {},
    data: []
  };
  pageSizeValueMappingMembers: number = 4;
  currentPageMappingMembers: number = 1;
  datalentgh: number;
  addMappingMemberForm: FormGroup;
  modeltitle: string = 'Add Mapping Members';
  membersList : any;
  JsonData: JsonData = new JsonData();

  constructor(private mappingMembersService: MappingMembersService, private serviceresourseService : ServiceresourseService, private toaster: ToastrService, private commonService: CommonService,
    private router: Router, private dialogService: ConfirmationDialogService, private fb: FormBuilder,private mappingLocationService: MappingLocationService) { }

  ngOnInit() {
    this.getMappingMembersList();
    this.mappingLocationService.getUpdatedMembersEvent().subscribe(()=>{
    this.getMappingMembersList();
    })
  }
  deleteMappingMember(row: any) {
    ;
    const message = `Are you sure you want to delete service Resource  "${row.name}"?`;
      this.dialogService.confirm('Delete service Resource', message).subscribe(confirmed => {
        if (confirmed) {
          this.loadSave = true;
          this.mappingMembersService.DeleteMappingMember(row.resourceId).subscribe(r => {
            this.toaster.success(`Service Resource "${row.name}" has been deleted successfully`);
            this.loadSave = false;
            this.getMappingMembersList();
          }, error => {
          });
        }
      });
    

  }
  getMappingMembersList() {
    this.loadSave = true;
    this.mappingMembersService.getMappingMembersList(this.LocationId, this.sortColumn, this.sortDir, this.currentPageMappingMembers, this.pageSizeValueMappingMembers).subscribe(response => {
      ;
      this.mappingMemberPagedData = this.mappingMembersService.pagedData;
      if (this.isEmitedValues == false) {
        this.newMappingMemberItemEvent.emit(this.mappingMemberPagedData.pager.totalItems);
      }
      this.datalentgh = this.mappingMemberPagedData.data.length;
      this.mappingMemberCount = this.mappingMemberPagedData.pagedData.pager.totalItems;
      this.offset = this.currentPageMappingMembers;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }
  setPageMappingMember($event) {
    this.loadSave = true;
    this.currentPageMappingMembers = $event.page;
    this.getMappingMembersList();
  }
  onSortMappingMembers($event) {
    ;
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPageMappingMembers = 1;
    this.getMappingMembersList();
  }
  setPageNoMappingMembers($event) {
    this.loadSave = true;
    this.currentPageMappingMembers = $event.page;
    this.getMappingMembersList();
  }
  show(){

  }
}

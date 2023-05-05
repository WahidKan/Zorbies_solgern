import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../common.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { JsonData, MappingLocationService } from './mapping-location.service';

@Component({
  selector: 'app-mapping-locations',
  templateUrl: './mapping-locations.component.html',
  styleUrls: ['./mapping-locations.component.scss']
})
export class MappingLocationsComponent implements OnInit {

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
  @Output() newMappingLocationItemEvent = new EventEmitter<number>();
  mappingLocationCount: number = 0;
  mappingLocationPagedData: any = {
    pager: {},
    data: []
  };
  pageSizeValueMappingLocations: number = 4;
  currentPageMappingLocations: number = 1;
  datalentgh: number;
  addMappingLocationForm: FormGroup;
  modeltitle: string = 'Add Mapping Locatiions';
  locationList : any;
  JsonData: JsonData = new JsonData();

  constructor(private mappingLocationService: MappingLocationService, private toaster: ToastrService, private commonService: CommonService,
    private router: Router, private dialogService: ConfirmationDialogService, private fb: FormBuilder,) { }

  ngOnInit() {
    this.getMappingLocationsList();
  }
  getMappingLocationsList() {
    this.loadSave = true;
    this.mappingLocationService.getMappingLocationsList(this.LocationId, this.sortColumn, this.sortDir, this.currentPageMappingLocations, this.pageSizeValueMappingLocations).subscribe(response => {
      ;
      this.mappingLocationPagedData = this.mappingLocationService.pagedData;
      if (this.isEmitedValues == false) {
        this.newMappingLocationItemEvent.emit(this.mappingLocationPagedData.pager.totalItems);
      }
      this.datalentgh = this.mappingLocationPagedData.data.length;
      this.mappingLocationCount = this.mappingLocationPagedData.pagedData.pager.totalItems;
      this.offset = this.currentPageMappingLocations;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }
  deleteMappingLocation(id) {
    ;
    const message = `Are you sure you want to delete Mapping Location?`;
    this.dialogService.confirm('Delete Mapping Location', message).subscribe(confirmed => {
      if (confirmed) {
        this.mappingLocationService.DeleteMappingLocation(id).subscribe((res: any) => {
          this.toaster.success(`Mapping location has been deleted successfully..`);
          this.getMappingLocationsList();
          this.mappingLocationService.setUpdatedMembersEvent(true);
        });
      }
    });
  }
  setPageMappingLocation($event) {
    this.loadSave = true;
    this.currentPageMappingLocations = $event.page;
    this.getMappingLocationsList();
  }
  onSortMappingLocations($event) {
    ;
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPageMappingLocations = 1;
    this.getMappingLocationsList();
  }
  setPageNoMappingLocations($event) {
    this.loadSave = true;
    this.currentPageMappingLocations = $event.page;
    this.getMappingLocationsList();
  }
  show() {
    this.initForm();
    this.addMappingLocationForm.reset();
    this.getLocationsList();
    this.loadSave = false;
    this.mappingLocationModal.show();
  }
  close() {
    this.mappingLocationModal.hide();
    this.addMappingLocationForm.reset();
  }
  private initForm() {
    this.addMappingLocationForm = this.fb.group({
      id: [null],
      mappingLocation: [null, Validators.required,],
    });
  }
  getLocationsList(){
    this.mappingLocationService.GetLocationDropdownBasedOnLocationType(this.LocationId).subscribe((res: any) => {
      ;
      if (res) {
        this.locationList = res;
      }
    })
  }
  save() {
    
    this.loadSave = true;
    if (this.addMappingLocationForm.valid) {
      this.JsonData.Id =  this.LocationId;
      this.JsonData.FormJsonData = JSON.stringify(this.addMappingLocationForm.value);
      this.mappingLocationService.saveNewMappingLocation(this.JsonData).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.addMappingLocationForm.reset();
          this.mappingLocationModal.hide();
          this.getMappingLocationsList();
          this.loadSave = false;
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
      this.commonService.validateAllFormFields(this.addMappingLocationForm);
      this.loadSave = false;
    }
  }
}

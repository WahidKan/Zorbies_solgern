import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService, ActivityDataModel } from '../common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LeadlistService } from '../../lead/leadlist.service';
import { DateTimeToLocalForAddEditPipe } from '../../../pipes/datetime.pipe';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  @Input('moduleName') moduleName: string;
  @Input('submoduleName') submoduleName: string;
  @Input('primaryKey') primaryKey: string;
  @ViewChild('taskPopup', { static: false }) taskPopup: ModalDirective;
  addTaskForm: FormGroup;
  @Input() offset: number;
  activityDataModel: ActivityDataModel = new ActivityDataModel();
  modelTitle: string='';
  subject: string = '';
  schDate: string = '';
  Message: string = '';
  lstPriority: any;
  contactlist: any;
  isCall: boolean = false;
  timeFormat: string;
  minimumDate: Date;
  searchText = '';
  len: any = 0;
  pagedData: any = {
    pager: {},
    data: []
  };
  sortDir = 'desc';
  datalentgh: number;
  sortColumn = 'createdon';
  loadSave: boolean = false;
  lstPageSize: any;
  currentPage: any;
  pageSizeValue: number;
  notescount: number = 0;
  Id: number = 0;
  lstStatus: any;
  constructor(private fb: FormBuilder,
    private leadlistService: LeadlistService,
    private commonService: CommonService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute, private dialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.initForm();
    let ab: Date = new Date();
    const hours = ab.getHours();
    const minutes = ab.getMinutes();
    this.minimumDate = new Date(ab.getFullYear(), ab.getMonth(), ab.getDate());
    this.currentPage = 1;
    this.pageSizeValue = 10;
    this.getPageSizes();
    
    this.getPriorityList();
    this.GetActivityData();
    
    this.getActivityStatus();
  }

  private initForm() {
    this.addTaskForm = this.fb.group({
      id: [null],
      formSubject: ['', Validators.required],
      scheduleDate: [null, Validators.required],   
      PriorityId: [null],
      formMessage: [null, Validators.required],
      activityStatus: [null, Validators.required],      
      callPurpose: [null],      
      contactid: [null],      
    })

  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  setPage($event) {
    this.loadSave = true;
    this.loadSave = true;
    this.currentPage = $event.page;
    this.GetActivityData();
  }
  get curPage(): number {
    return this.offset;
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = 1;
    this.GetActivityData();
  }



  getPriorityList() {
    this.commonService.getMasterItemsList("activityPrioritylevel").subscribe((result: any) => {
      this.lstPriority = this.commonService.masters;

      // console.log("lstPriority", this.lstPriority);
    })
  }
  getActivityStatus() {
    this.commonService.getMasterItemsList("activityStatus").subscribe((result: any) => {
      this.lstStatus = this.commonService.masters;

      // console.log("lstStatus", this.lstStatus);
    })
  }

  addTask() {
    this.addTaskForm.reset();
    this.addTaskForm.controls['callPurpose'].setValidators(null);
    this.addTaskForm.controls['contactid'].setValidators(null);
    this.addTaskForm.get('callPurpose').updateValueAndValidity();
    this.addTaskForm.get('contactid').updateValueAndValidity();
    // console.log('minimumDate', this.minimumDate);
    this.timeFormat = this.commonService.getTimeFormat();
    this.isCall = false;
    this.initForm();
    this.addTaskForm.reset();
    this.modelTitle = 'Add Task';
    this.subject = 'Task Subject'
    this.schDate = 'Task Schedule Date'
    this.Message = 'Message'
    
    this.taskPopup.show();
    this.activityDataModel.activity_type = 'Task';
   
  }
  followUp() {
    this.addTaskForm.reset();
    this.addTaskForm.controls['callPurpose'].setValidators(null);
    this.addTaskForm.controls['contactid'].setValidators(null);
    this.addTaskForm.get('callPurpose').updateValueAndValidity();
    this.addTaskForm.get('contactid').updateValueAndValidity();
    this.timeFormat = this.commonService.getTimeFormat();
    this.isCall = false;
    this.initForm();
    this.addTaskForm.reset();
    this.modelTitle = 'Follow Up';
    this.subject = 'Subject'
    this.schDate = 'Follow Up Schedule Date'
    this.Message = 'Follow Up Message'
    this.getPriorityList();
    this.taskPopup.show();
    this.activityDataModel.activity_type = 'FollowUp';
  }
  scheduleCall() {
    this.addTaskForm.reset();
    this.timeFormat = this.commonService.getTimeFormat();
    this.isCall=true
    this.initForm();
    this.GetContactDll();
    this.addTaskForm.reset();
    this.modelTitle = 'Schedule Call';
    this.subject = 'Subject'
    this.schDate = 'Notification Schedule'
    this.Message = 'Description'
    this.addTaskForm.controls['callPurpose'].setValidators(Validators.required);
    this.addTaskForm.controls['contactid'].setValidators(Validators.required);
    this.addTaskForm.get('callPurpose').updateValueAndValidity();
    this.addTaskForm.get('contactid').updateValueAndValidity();
    this.taskPopup.show();
    this.activityDataModel.activity_type = 'Call';
  }
  closetaskPopup() {
    this.taskPopup.hide();
  }

  Save() {
    //this.addTaskForm.value.scheduleDate = (this.addTaskForm.value.scheduleDate == null) ? null : this.commonService.getUserSelectedZoneToUTC(this.addTaskForm.value.scheduleDate);
    this.loadSave = true;
    if (this.addTaskForm.valid) {
      // console.log('addTaskForm', this.addTaskForm.value);
      this.activityDataModel.ref_id = this.primaryKey;
      this.activityDataModel.SubModuleCode = this.submoduleName;
      this.activityDataModel.ModuleCode = this.moduleName;

      this.activityDataModel.Id = this.addTaskForm.value.id;
      this.activityDataModel.call_purpose = this.addTaskForm.value.callPurpose;
      this.activityDataModel.subject = this.addTaskForm.value.formSubject;
      this.activityDataModel.contactid = this.addTaskForm.value.contactid;
      this.activityDataModel.message = this.addTaskForm.value.formMessage;
      this.activityDataModel.activityStatus = this.addTaskForm.value.activityStatus;
      this.activityDataModel.scheduleDate = (this.scheduleDate == null) ? null : this.commonService.ConvertUserSelectedTimeZoneToUTC(this.scheduleDate);
      this.activityDataModel.priority = this.addTaskForm.value.PriorityId;
      // console.log('activityDataModel', this.activityDataModel);
      this.commonService.addUpdateActivity(this.activityDataModel).subscribe((result: any) => {
        // console.log('result', result);
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.GetActivityData();
          this.taskPopup.hide();


        }
        //this.taskPopup.hide();
      },
      error => {
        this.loadSave = false;
      })
    }
    else {
      this.commonService.validateAllFormFields(this.addTaskForm);
      this.loadSave = false;
    }
  }
  GetContactDll(id: any = 0) {
    this.leadlistService.GetLeadConvertContactDll(id, '0', this.searchText, false).subscribe((data: any) => {
      this.contactlist = data;
      // console.log('sadasd', this.contactlist);
    })
  }
  
  onKeyContactDll(e: any, dataList: any) {
    this.len = 0
    this.searchText = e.target.value;
    this.leadlistService.GetLeadConvertContactDll(this.Id, this.len, this.searchText, false).subscribe((data: any) => {
      this.contactlist = data;
    })
    
  }

  onClearLangContactDll(dataList: any): void {
    this.len = 0
    this.searchText = '';   
    this.leadlistService.GetLeadConvertContactDll(this.Id, this.len, this.searchText, false).subscribe((data: any) => {
      this.contactlist = data;
    });
  }
  onScrollToEndContactDll(dataList: any) {
    this.fetchMoreContactDll(dataList);
  }
  private fetchMoreContactDll(dataList: any) {
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.len = dataList.length;
    this.leadlistService.GetLeadConvertContactDll(this.Id, this.len, this.searchText, false).subscribe((data: any) => {
      this.contactlist = this.contactlist.concat(data);;
    })
  }






  GetActivityData() {

    this.loadSave = true;
    this.commonService.GetActivityData(this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.moduleName, this.submoduleName, this.primaryKey).subscribe(response => {
      this.pagedData = this.commonService.pagedData;
      // console.log('pagedData', this.pagedData)

      
      
      this.datalentgh = this.pagedData.data.length;
      this.notescount = this.commonService.pagedData.pager.totalItems;
      this.offset = this.currentPage;

      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }

  EditActivity(row: any) {
    this.addTaskForm.reset();
    // console.log('row', row);
    this.GetContactDll(row.contactid);
    this.Id = row.contactid;
    const convertDateTime = new DateTimeToLocalForAddEditPipe;   
    let schdtae12 = (row.scheduleDate == null ? null : convertDateTime.transform(row.scheduleDate, null));
    this.addTaskForm.patchValue({
      id: row.Id,
      formSubject: row.subject ,
      scheduleDate:schdtae12,
      PriorityId: row.priority ==null ? '' : row.priority.toString(),
      formMessage: row.message,
      callPurpose: row.call_purpose,
      activityStatus: row.activityStatus == null ? '' : row.activityStatus.toString(),
      contactid: row.contactid == null ? '' : row.contactid.toString(),
    })
    this.activityDataModel.activity_type = row.activity_type;
    if (row.activity_type == 'Task') {
      this.isCall = false;
      this.modelTitle = 'Edit Task';
      this.addTaskForm.controls['callPurpose'].setValidators(null);
      this.addTaskForm.controls['contactid'].setValidators(null);
      this.addTaskForm.get('callPurpose').updateValueAndValidity();
      this.addTaskForm.get('contactid').updateValueAndValidity();
      this.subject = 'Task Subject'
      this.schDate = 'Task Schedule Date'
      this.Message = 'Message'
    }
    else if (row.activity_type == 'Call') {
      this.modelTitle = 'Schedule Call';
      this.isCall = true;
      this.addTaskForm.controls['callPurpose'].setValidators(Validators.required);
      this.addTaskForm.controls['contactid'].setValidators(Validators.required);
      this.addTaskForm.get('callPurpose').updateValueAndValidity();
      this.addTaskForm.get('contactid').updateValueAndValidity();
      this.subject = 'Subject'
      this.schDate = 'Notification Schedule'
      this.Message = 'Description'
    }
    else {
      this.isCall = false;
      this.modelTitle = 'Follow Up';
      this.addTaskForm.controls['callPurpose'].setValidators(null);
      this.addTaskForm.controls['contactid'].setValidators(null);
      this.addTaskForm.get('callPurpose').updateValueAndValidity();
      this.addTaskForm.get('contactid').updateValueAndValidity();
      this.subject = 'Subject'
      this.schDate = 'Follow Up Schedule Date'
      this.Message = 'Follow Up Message'
    }
    this.taskPopup.show();
     
  }

  DeleteActivity(row: any) {
    const message = `Are you sure you want to delete "${row.subject}"?`;
    this.dialogService.confirm('Delete Note', message).subscribe(confirmed => {
      if (confirmed) {
        this.commonService.DeleteActivity(row.Id).subscribe((res: any) => {
          this.toaster.success(`Note has been deleted successfully..`);
          //this.newItemEvent.emit(this.pagedData.pager.totalItems);
          this.GetActivityData();
        });
      }
    });
  }
  get formSubject() { return this.addTaskForm.get('formSubject'); }
  get scheduleDate() { return this.addTaskForm.get('scheduleDate'); }
  get PriorityId() { return this.addTaskForm.get('PriorityId'); }
  get formMessage() { return this.addTaskForm.get('formMessage'); }
  get callPurpose() { return this.addTaskForm.get('callPurpose'); }
  get activityStatus() { return this.addTaskForm.get('activityStatus'); }
  get contactid() { return this.addTaskForm.get('contactid'); }
}

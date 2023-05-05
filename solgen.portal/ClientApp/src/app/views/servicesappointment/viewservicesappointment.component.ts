import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ServicesappointmentService, CheckboxData, addAssignedResourcesModel } from './servicesappointment.service'; 
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { CommonService } from '../shared/common.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { noteModel, LeadlistService } from '../lead/leadlist.service';
import { CampaignTopViewModel } from '../campaign/campaign.service';
import { DatePipe, Location } from '@angular/common';
import { NewnoteslistComponent } from '../shared/new-notes/newnoteslist.component';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-viewservicesappointment',
  templateUrl: './viewservicesappointment.component.html',
  styleUrls: ['./viewservicesappointment.component.scss']
})
export class ViewservicesappointmentComponent implements OnInit {
  @ViewChild('addAssignedResourcesPopup', { static: false }) addAssignedResourcesPopupModel: ModalDirective;
  @ViewChild('listnotesmodel', { static: false }) listnotesmodel: NewnoteslistComponent;
  @ViewChild('listnotesmodel1', { static: false }) addNotesPopupModel1: NewnoteslistComponent;
  @ViewChild('NotesPopupModel', { static: false }) addNotesPopupModel: ModalDirective;
  notemodel: noteModel = new noteModel();
  @Input() offset: number;
  pageSizeValue: number;
  servicesappointmentid: any;
  listFilter: any;
  isViewNote = false;
  notesTitle: any;
  notescount: number = 0;
  noteAssignTo: any;
  accountId: any;
  notesStatus: any;
  notesDescription: any;
  serviceResourceNames: any;
  //isViewNote = false;
  serviceCrewNames: any;
  estimatedTravelTimeFromSourceNames: any;   
  estimatedTravelTimeToSourceNames: any;
  pagedData: any = {
    pager: {},
    data: []
  };

  lstAssignedResources: any = {
    pager: {},
    data: []
  };
  lstPageSize: any;
  sortDir = 'desc';
  datalentgh: number;
  sortColumn = 'createdon';
  moduleName = 'serviceappointment';
  submoduleName = 'serviceappointment';
  companyId: any;
  customCompnentValues: any[];
  formControlList: any[] = [];
  form: FormGroup;
  loadSave = false;
  AppointmentNumber: any;

  displayType = 'VIEW';
  lstListingColorCode: any;
  lstPriceBooks: any = {
    pager: {},
    data: []
  }
  lstCampaigns: any = {
    pager: {},
    data: []
  }
  lstserviceAppointmentHistory: any = {
    pager: {},
    data: []
  };
  checkboxdata1: Array<CheckboxData> = [];
  customCompnentValuesTop: any;
  pageSizeValueAssignedResList: number = 4;
  currentPageAssignedRes: number;
  currentPageNotes: number=0;
  priceBooksCount: number = 0;
  campaignCount: number = 0;
  priceBooksPageNo: number = 1;
  campaignPageNo: number = 1;
  NotesAttachmentsCount: number = 0;
  NotesCount: number = 0;
  serviceAppointmentHistoryCount: number = 0;
  ApprovalHistoryCount: number = 0;
  AssignedResourcesCount: number = 0;
  totalRecordsAssignedRes: any;
  submoduleid: any = 1;
  title: any;
  objectname: any = 'ServiceAppointment';
  pageSizeValuenotes: number = 4;
  NotespagedData: any = {
    pager: {},
    data: []
  };
  isDateChanged: any = true;
  isEdit = false; 
  addAssignedResourcesForm: FormGroup;
 pageSize: number = 4;
  editServiceResourceId: any = 0;
  editServiceCrewId: any = 0;
  length = 10;
  custom_field_id: any;
  searchText = '';
  NoteCreatedOn: any = '';
  disabledEdit = false;
  len: any = 10; field_code: any; scrollDataList: any;
  addAssignedResourcesmodel: addAssignedResourcesModel = new addAssignedResourcesModel();
  validityServiceResource: boolean = false;
  validityServiceCrew: boolean = false;
  isValid = true;
  siteurl: string = '';
  AppStatus: any;
  viewType: any = null;
  contentHeader: object;
  constructor(private dialogService: ConfirmationDialogService,
    private servicesappointmentlistService: ServicesappointmentService, private datetime: DatePipe,
    private commonService: CommonService,
    private fb: FormBuilder,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private leadservice: LeadlistService,
    private location :Location) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.siteurl = window.location.origin;
    // console.log('siteurl', this.siteurl);
    this.viewType = this.commonService.getQueryStringValue("view");
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.servicesappointmentid = id;
      })
    this.pageSizeValueAssignedResList = 4;
    this.currentPageNotes = 1;
    this.currentPageAssignedRes = 1;
    this.getPageSizes();
    this.loadSave = true;     
    this.GetCustomFieldsList(); 
    this.GetServiceResourceDll(this.editServiceResourceId=0);
    this.GetServiceCrewDll(this.editServiceCrewId=0);
    this.GetEstimatedTravelTimeFromAndToSourceDll();
   
    this.initForm();
    this.initBreadCrumb();
}

initBreadCrumb() {
   this.contentHeader = {
     headerTitle: 'Manage Service Appointments',
     actionButton: true,
     iconCssClass: '',
     breadcrumb:
       [
         {
           name: 'Dashboard',
           isLink: true,
           link: '/dashboard'
         },
         {
           name : 'Manage Service Appointments',
           isLink : true,
           link : '/serviceappointment'
         },
         {
           name: 'Service Appointment Details',
           isLink: false
         }

       ]
   };
 }
  getRelatedTabData() {
    this.loadSave = true;
     this.GetAssignedResourcesList();
    this.getNoteslist();
    this.loadSave = false;
  }
   getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  close() {
    //this.location.back();
    this.router.navigateByUrl("/serviceappointment");
  }
  GetCustomFieldsList() {
    this.displayType = 'VIEW';

    this.servicesappointmentlistService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.servicesappointmentid, this.displayType).subscribe(result => {
      if (result) {
        this.customCompnentValues = this.servicesappointmentlistService.customFieldsList.data;
        // console.log("customCompnentValues", this.customCompnentValues);
        this.customCompnentValues.forEach(t => {
          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
          if (t.dt_code == 'checkbox') {
            let checkdata = new CheckboxData();
            checkdata.controlname = t.ColumnName;
            this.checkboxdata1.push(checkdata);
          }
          if (groupCheck == null || groupCheck.length == 0) {
            let obj = {
              group_id: t.group_id,
              group_name: t.group_name,
              group_display_name: t.group_display_name,
              InnerData: this.customCompnentValues.filter(x => x.group_id == t.group_id)
            }
            this.formControlList.push(obj);
          }
        })
        const group: any = {};

        this.customCompnentValues.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          }
          else {
            val = (cnt.value == '' ? null : cnt.value);
          }
          this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdata1.forEach((item) => {
                this.form.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }
          if (cnt.ColumnName == 'AppointmentNumber') {
            this.AppointmentNumber = cnt.value;
          }
         
          if (cnt.dt_code == 'select') {
            if (cnt.value != '' && cnt.select_options != null) {
              cnt.select_options.forEach(itemList => {
                if (itemList.value == cnt.value) {
                  cnt.value = itemList.name;
                }
                else {
                  //cnt.value = null;
                }
              });
            }
          }         
          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])
        });
        this.form = new FormGroup(group);
        this.loadSave = false;
        this.GetCustomFieldsListTopRow();
      }
    }, err => { this.loadSave = false; }, () => { this.loadSave = false;});
  }
  GetCustomFieldsListTopRow() {
    this.displayType = 'VIEW_TOP';
    this.loadSave = true;

    this.servicesappointmentlistService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.servicesappointmentid, this.displayType).subscribe((result: any) => {
      if (result) {
        this.customCompnentValuesTop = this.servicesappointmentlistService.customFieldsList.data;
        // console.log(' this.customCompnentValuesTop',this.customCompnentValuesTop)
        this.customCompnentValuesTop.forEach(cnt => {
          if (cnt.ColumnName == 'Status' && cnt.table_alias == 'tsa') {
            
            var ab = cnt.value.split('::', 1)
            if (ab == 'Completed')
              this.disabledEdit = true;
            //alert(this.AppStatus)
          }
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          } else {
            val = (cnt.value == '' ? null : cnt.value);
          }

          this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if(cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          }
          else {
            val = (cnt.value == '' ? null : cnt.value);
          }
          if (cnt.ColumnName == 'AppointmentNumber') {
            this.AppointmentNumber = cnt.value;
          }
          if (cnt.dt_code == 'select') {
            if (cnt.value != '' && cnt.select_options != null) {
              cnt.select_options.forEach(itemList => {
                if (itemList.value == cnt.value) {
                  cnt.value = itemList.name;
                }
                else if (cnt.name == 'AccountId') {
                  this.accountId = cnt.ref_value;

                }
                else {
                  //cnt.value = null;
                }
              });
            }
          }
        });
        this.loadSave = false;
        this.getRelatedTabData();
      }
    });
  }
  getListingColorCode(fieldValue: any) {
    this.lstListingColorCode = '';
    if (fieldValue != null) {
      this.lstListingColorCode = fieldValue.split('::');
      if (this.lstListingColorCode.length > 0) {
        this.lstListingColorCode = [{ color: this.lstListingColorCode[0]}]
      }
    }
    return this.lstListingColorCode;
  }
  onPriceBooksSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
  }
  onCampaignsSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
  }
  setPriceBooksPageNo($event) {  
    this.priceBooksPageNo = $event.page;
  }
  setCampaignPageNo($event) {
    this.campaignPageNo = $event.page;
  }

  GetServiceResourceDll(id:any=0) {
    this.servicesappointmentlistService.GetServiceResourceDll(id, '0', this.searchText).subscribe((data: any) => {
      this.serviceResourceNames = data;
    })
  }

  GetServiceCrewDll(id:any= 0) {
    this.servicesappointmentlistService.GetServiceCrewDll(id,'0',this.searchText).subscribe((data: any) => {
      this.serviceCrewNames = data;
    })
  }
  
  GetEstimatedTravelTimeFromAndToSourceDll() {
    this.servicesappointmentlistService.GetEstimatedTravelTimeFromAndToSourceDll().subscribe((data: any) => {
      this.estimatedTravelTimeFromSourceNames = data;
      this.estimatedTravelTimeToSourceNames = data;
    })
  }

  AddAssignedResources() {
    this.serviceResourceId.enable();
    this.serviceCrewId.enable();
    this.searchText = "";
    this.GetServiceResourceDll();   

    try {  
      this.GetServiceCrewDll();  
    } catch (e) {
      // console.log("wrwerwrwer", e);
      throw e;   
    }
    this.addAssignedResourcesForm.reset();
    this.addAssignedResourcesmodel.serviceAppointment = this.customCompnentValues[(this.customCompnentValues.findIndex(s => s.ColumnName === 'AppointmentNumber'))].value;

    this.addAssignedResourcesForm.patchValue({'serviceAppointment': this.addAssignedResourcesmodel.serviceAppointment.toString()}) 
    this.title = "Add Assigned Resource";
    this.GetServiceResourceDll();
    this.addAssignedResourcesPopupModel.show();
  }


  private initForm() {
    this.addAssignedResourcesForm = this.fb.group({
    'Id' :[null],
    'serviceAppointment': ['', Validators.required],
    'serviceResourceId': [null, Validators.required],
    'estimatedTravelTime': ['', null],
    'actualTravelTime': ['', null],
    'serviceCrewId': [null, Validators.required],
    'estimatedTravelTimeFromSourceId': [null, null],
    'approximateTravelDistanceForm': [, null],
    'estimatedTravelTimeToSourceId': [null, null],
    'approximateTravelDistanceTo': [null, null],
    'lastUpdatedEpoch': ['', null],
    'approximateTravelTimeForm': ['', null],
    'isUpdatedByOptimization': ['', null],
    'calculatedDurationMinutes': ['', null]
  });
  }

  changeValidators(type) {
    if (type == 'serviceResourceId' && this.serviceResourceId.value != null && this.serviceCrewId.value == null) {
      this.serviceCrewId.clearValidators();
      this.serviceCrewId.updateValueAndValidity();
      this.serviceResourceId.setValidators([Validators.required]);
      this.serviceResourceId.updateValueAndValidity(); 
      this.serviceCrewId.disable();
      this.serviceResourceId.enable();

    }
    else if (type == 'serviceCrewId' && this.serviceCrewId.value != null && this.serviceResourceId.value == null) {
      this.serviceResourceId.clearValidators();
      this.serviceResourceId.updateValueAndValidity();
      this.serviceCrewId.setValidators([Validators.required]);
      this.serviceCrewId.updateValueAndValidity();

      this.serviceResourceId.disable();
      this.serviceCrewId.enable();

    }
  }    
  resetValidations() {
    if (this.serviceCrewId.value == null && this.serviceResourceId.value == null) {
      this.serviceResourceId.setValidators([Validators.required]);
      this.serviceResourceId.updateValueAndValidity();

      this.serviceCrewId.setValidators([Validators.required]);
      this.serviceCrewId.updateValueAndValidity();
      this.serviceResourceId.enable();
      this.serviceCrewId.enable();

    }
    else if (this.serviceCrewId.value == null && this.serviceResourceId.value != null) {
      this.serviceCrewId.clearValidators();
      this.serviceCrewId.updateValueAndValidity();

      this.serviceResourceId.setValidators([Validators.required]);
      this.serviceResourceId.updateValueAndValidity();

      this.serviceResourceId.enable();
      this.serviceCrewId.disable();
    }
    else if (this.serviceCrewId.value != null && this.serviceResourceId.value == null) {
      this.serviceResourceId.clearValidators();
      this.serviceResourceId.updateValueAndValidity();

      this.serviceCrewId.setValidators([Validators.required]);
      this.serviceCrewId.updateValueAndValidity();

      this.serviceResourceId.disable();
      this.serviceCrewId.enable();
    }
  }

  SaveAssignedResources() {
    if (this.addAssignedResourcesForm.valid) {
      this.loadSave = true;
      this.addAssignedResourcesmodel.Id = this.addAssignedResourcesForm.value.Id;
      this.addAssignedResourcesmodel.serviceAppointment = this.addAssignedResourcesForm.value.serviceAppointment;
      this.addAssignedResourcesmodel.serviceResourceId = this.addAssignedResourcesForm.value.serviceResourceId;
      this.addAssignedResourcesmodel.estimatedTravelTime = this.addAssignedResourcesForm.value.estimatedTravelTime;
      this.addAssignedResourcesmodel.actualTravelTime = this.addAssignedResourcesForm.value.actualTravelTime;
      this.addAssignedResourcesmodel.serviceCrewId = this.addAssignedResourcesForm.value.serviceCrewId;
      this.addAssignedResourcesmodel.estimatedTravelTimeFromSourceId = this.addAssignedResourcesForm.value.estimatedTravelTimeFromSourceId;
      this.addAssignedResourcesmodel.approximateTravelDistanceForm = this.addAssignedResourcesForm.value.approximateTravelDistanceForm;
      this.addAssignedResourcesmodel.estimatedTravelTimeToSourceId = this.addAssignedResourcesForm.value.estimatedTravelTimeToSourceId;
      this.addAssignedResourcesmodel.approximateTravelDistanceTo = this.addAssignedResourcesForm.value.approximateTravelDistanceTo;
      this.addAssignedResourcesmodel.lastUpdatedEpoch = this.addAssignedResourcesForm.value.lastUpdatedEpoch;
      this.addAssignedResourcesmodel.approximateTravelTimeForm = this.addAssignedResourcesForm.value.approximateTravelTimeForm;
      this.addAssignedResourcesmodel.isUpdatedByOptimization = this.addAssignedResourcesForm.value.isUpdatedByOptimization;
      this.addAssignedResourcesmodel.calculatedDurationMinutes = this.addAssignedResourcesForm.value.calculatedDurationMinutes;

      this.servicesappointmentlistService.saveAssignedResource(this.addAssignedResourcesmodel).subscribe((result: any) => {
       
        if (result.statusCode == 200) {
          this.loadSave = false;
          this.toaster.success(result.responseMessage);
          this.addAssignedResourcesForm.reset();
          // this.refresh();
         
          this.currentPageAssignedRes = 1;
          this.GetAssignedResourcesList(); 
          this.addAssignedResourcesPopupModel.hide();
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
          this.currentPageAssignedRes = 1;
          this.GetAssignedResourcesList();
        }
        
        }, error => {
        this.loadSave = false;
      }); 
    }
    else {
      this.commonService.validateAllFormFields(this.addAssignedResourcesForm);
    }
  }

  closeAssignedResourcesPopup() {
    this.addAssignedResourcesPopupModel.hide();
  }

  GetAssignedResourcesList() {
    this.loadSave = true;

    this.servicesappointmentlistService.GetAssignedResourcesList(this.servicesappointmentid, this.sortColumn, this.currentPageAssignedRes, this.sortDir, this.pageSizeValueAssignedResList)
      .subscribe(resp => {
      this.lstAssignedResources = resp;
        this.AssignedResourcesCount = resp.pager.totalItems;

        if (resp.data.length > 0) {

        this.totalRecordsAssignedRes = resp.pager.totalItems;
        }
        else
        {
          this.totalRecordsAssignedRes = 0;
          this.currentPageAssignedRes = this.currentPageAssignedRes - 1;
          // console.log("fsdfsdf", this.currentPageAssignedRes);
          this.GetAssignedResourcesList();
        }
        this.offset = this.currentPageAssignedRes;
      this.loadSave = false;
      }, error => {
        this.loadSave = false;
      });
  }

  setAssignedResourcesPageNo($event) {
    this.loadSave = true;
    this.currentPageAssignedRes = $event.page;
    this.GetAssignedResourcesList();
  }

  setPageAssignedResList($event) {
    this.loadSave = true;   
    this.currentPageAssignedRes = $event.page;
    this.GetAssignedResourcesList();
  }

  onSortAssignedResList($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPageAssignedRes = 1;
    this.GetAssignedResourcesList();
  }

  get curPageAssignedResList(): number {
    return this.offset;
  }


  get Id() { return this.addAssignedResourcesForm.get('Id'); } 
  get serviceAppointment() { return this.addAssignedResourcesForm.get('serviceAppointment'); }
  get serviceResourceId() { return this.addAssignedResourcesForm.get('serviceResourceId'); }
  get estimatedTravelTime() { return this.addAssignedResourcesForm.get('estimatedTravelTime'); }
  get actualTravelTime() { return this.addAssignedResourcesForm.get('actualTravelTime'); }
  get serviceCrewId() { return this.addAssignedResourcesForm.get('serviceCrewId'); }
  get estimatedTravelTimeFromSourceId() { return this.addAssignedResourcesForm.get('estimatedTravelTimeFromSourceId'); }
  get approximateTravelDistanceForm() { return this.addAssignedResourcesForm.get('approximateTravelDistanceForm'); }
  get estimatedTravelTimeToSourceId() { return this.addAssignedResourcesForm.get('estimatedTravelTimeToSourceId'); }
  get approximateTravelDistanceTo() { return this.addAssignedResourcesForm.get('approximateTravelDistanceTo'); }
  get lastUpdatedEpoch() { return this.addAssignedResourcesForm.get('lastUpdatedEpoch'); }
  get approximateTravelTimeForm() { return this.addAssignedResourcesForm.get('approximateTravelTimeForm'); }
  get isUpdatedByOptimization() { return this.addAssignedResourcesForm.get('isUpdatedByOptimization'); }
  get calculatedDurationMinutes() { return this.addAssignedResourcesForm.get('calculatedDurationMinutes'); }

  EditAssignedResource(row: any) {
    // console.log(row);
    // console.log(row.ServiceResourceId);
   
    this.title = "Edit Assigned Resource";
    this.isDateChanged = false;
    this.isEdit = true;

    if (row.ServiceResourceId == null) {
      this.serviceResourceId.disable();
      this.serviceCrewId.enable();
    }
    if (row.serviceCrewId == null) {
      this.serviceCrewId.disable();
      row.serviceCrewId = 0;
      this.serviceResourceId.enable();
    }

    this.serviceResourceId.setValue(row.ServiceResourceId);
    this.GetServiceResourceDll(row.ServiceResourceId);
    this.serviceCrewId.setValue(row.serviceCrewId);
    this.GetServiceCrewDll(row.serviceCrewId);
   
    this.estimatedTravelTimeFromSourceId.setValue(row.estimatedTravelTimeFromSourceId);
   
    this.estimatedTravelTimeToSourceId.setValue(row.estimatedTravelTimeToSourceId);

    if (this.serviceResourceId.value) {
      this.serviceCrewId.clearValidators();
      this.serviceCrewId.updateValueAndValidity();
      this.serviceCrewId.disable();
    }

    if (this.serviceCrewId.value) {
      this.serviceResourceId.clearValidators();
      this.serviceResourceId.updateValueAndValidity();
      this.serviceResourceId.disable();
    }


    this.addAssignedResourcesForm.patchValue({
      Id: row.Id,
      serviceAppointment: row.serviceAppointment == null ? row.serviceAppointment :  row.serviceAppointment.toString(),
      serviceResourceId: row.ServiceResourceId == null ? row.ServiceResourceId : row.ServiceResourceId.toString(), 
      estimatedTravelTime: row.estimatedTravelTime,
      actualTravelTime: row.ActualTravelTime,
      serviceCrewId: row.serviceCrewId == null ? row.serviceCrewId : row.serviceCrewId.toString(),
      estimatedTravelTimeFromSourceId: row.estimatedTravelTimeFromSourceId == null ? row.estimatedTravelTimeFromSourceId : row.estimatedTravelTimeFromSourceId.toString(),
      approximateTravelDistanceForm: row.approximateTravelDistanceForm,
      estimatedTravelTimeToSourceId: row.estimatedTravelTimeToSourceId == null ? row.estimatedTravelTimeToSourceId : row.estimatedTravelTimeToSourceId.toString(),
      approximateTravelDistanceTo: row.approximateTravelDistanceTo,
      lastUpdatedEpoch: row.lastUpdatedEpoch,
      approximateTravelTimeForm: row.approximateTravelTimeForm,
      isUpdatedByOptimization: row.isUpdatedByOptimization,
      calculatedDurationMinutes: row.calculatedDurationMinutes,

    })
   // this.addAssignedResourcesForm.get('serviceResource').disable();
    this.addAssignedResourcesPopupModel.show();

  }

  deleteAssignedResource(row, AssignedResource) {
    const message = `Are you sure you want to delete Assigned Resource?`;
    this.dialogService.confirm('Delete Assigned Resource', message).subscribe(confirmed => {
      if (confirmed) {
        this.servicesappointmentlistService.DeleteRecords(row.Id, 'tblAssignedResource').subscribe((res: any) => {
          this.toaster.success(`Assigned Resource has been deleted successfully.`);
          this.GetAssignedResourcesList();
        });
      }
    });
  }

  //===================================================Note Section ==================================================================


  AddNotes() {
    this.title = "Add Notes";
    this.isViewNote = false;
    this.addNoteForm.reset();
    this.listnotesmodel.show(this.servicesappointmentid);
  }

  ViewNotes(row: any) {
    // console.log("row", row);
    this.isViewNote = true;
    this.isViewNote = true;
    this.notesTitle = row.note_name;
    this.notesDescription = row.note_description;
    this.noteAssignTo = row.createdby;
    this.NoteCreatedOn = row.created_on;
    this.addNotesPopupModel.show();
  }
  //========================Getting Note Form Value=============================
  get note_id() { return this.addNoteForm.get('note_id'); } 
  get noteTitle() { return this.addNoteForm.get('noteTitle'); }
  get noteDescription() { return this.addNoteForm.get('noteDescription'); }
 //=============================================================================
  addNoteForm = this.fb.group({
    note_id: [null],
    noteTitle: ['', Validators.required],  
    noteDescription: ['', null]    
  });

  SaveNote() {
    if (this.isValid && this.addNoteForm.valid) {
    this.loadSave = true;
    this.notemodel.note_id = this.addNoteForm.value.note_id;
    this.notemodel.note_name = this.addNoteForm.value.noteTitle;
    this.notemodel.note_description = this.addNoteForm.value.noteDescription;
    this.notemodel.object_name = "ServiceAppointment";
    this.notemodel.object_ref_id = this.servicesappointmentid;
    this.notemodel.object_id = 1;
    this.leadservice.saveNotes(this.notemodel).subscribe((result: any) => {

      if (result.statusCode == 200) {
        //setTimeout(() => {  // console.log('notes') }, 3000);
        this.loadSave = false;
        this.toaster.success(result.responseMessage);
        this.addNoteForm.reset();
        this.currentPageNotes = 1;
        this.getNoteslist();
        this.addNotesPopupModel.hide();
      }
      else {
        this.loadSave = false;
        this.toaster.error(result.responseMessage);
        this.currentPageNotes = 1;
        this.getNoteslist();
      }
    });
    }
    else {
      this.commonService.validateAllFormFields(this.addNoteForm);
      this.loadSave = false;
    }
  }
  getNoteslist() {
    this.loadSave = true;
    this.leadservice.getNoteslist(this.servicesappointmentid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.currentPageNotes, this.pageSizeValuenotes, '').subscribe(response => {
      this.NotespagedData = this.leadservice.pagedData;
      // console.log('NotespagedData', this.NotespagedData)

      if (this.NotespagedData.data.length <= 0) {
       
        this.currentPageNotes = this.currentPageNotes - 1;
        this.getNoteslist();
      }
      this.datalentgh = this.NotespagedData.data.length;
      this.NotesCount = this.leadservice.pagedData.pager.totalItems;
      this.offset = this.currentPageNotes;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  } 
  closeNotesPopupModelPopup() {
    this.addNotesPopupModel.hide();
    this.addNoteForm.reset();
  }

  setNotesPageNo($event) {
    this.loadSave = true;
    this.currentPageNotes = $event.page;
    this.getNoteslist();
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

  EditNotes(row: any) {
    this.isViewNote = false;
    this.title = "Edit Note";
    this.isEdit = true;

    this.addNoteForm.patchValue({
      note_id: row.note_id,
      noteTitle: row.note_name,
      noteDescription: row.note_description,
    });
    this.addNotesPopupModel.show();
  }

  DeleteNote(row) {

    const message = `Are you sure you want to delete Note?`;
    this.dialogService.confirm('Delete Note', message).subscribe(confirmed => {
      if (confirmed) {
        this.servicesappointmentlistService.DeleteRecords(row.note_id, 'tblNotes').subscribe((res: any) => {
          this.toaster.success(`Note has been deleted successfully.`);
          this.getNoteslist();
        });
      }
    });
  }

  onScrollToEnd(dataList: any) {
    this.fetchMore(dataList);
  }


  private fetchMore(dataList: any) {
   // // console.log("e", dataList);
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.len = dataList.length;
    // this.len = newLength;
    //if (newLength != null) {
    //this.len + newLength;
    //this.len = this.getreturnNumber(this.len = 10, newLength);
    //}

    //this.custom_field_id = dataList[j].custom_field_id;
    //this.field_code = dataList[j].field_code;
    this.servicesappointmentlistService.GetServiceResourceDll('', this.len,this.searchText).subscribe((data: any) => {
      this.serviceResourceNames = this.serviceResourceNames.concat(data);
    })
   
    //this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
    //  this.scrollDataList = this.commonService.customFieldsListData;
    //  // console.log('scrollDataList:', this.scrollDataList);
    //  (dataList[j].select_options as any[]) = (dataList[j].select_options as any[]).concat(this.scrollDataList);

    //})
  }


  getreturnNumber(x, y) {
    return x + y;
  };


  onKey(e: any, dataList: any) {

    this.len = 0
    this.searchText = e.target.value;
   
    //this.custom_field_id = dataList[j].custom_field_id;
    //this.field_code = dataList[j].field_code;
    //this.searchText = e.target.value;
    //this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
    //  this.scrollDataList = this.commonService.customFieldsListData;
    //  // console.log('scrollDataList:', this.scrollDataList);
    //  (dataList[j].select_options as any[]) = this.scrollDataList;
    //})
   
   // GetServiceResourceDllScrolling('') {   
    this.servicesappointmentlistService.GetServiceResourceDll('', this.len, this.searchText).subscribe((data: any) => {
      this.serviceResourceNames = data;
    //  // console.log('serviceResourceNames', this.serviceResourceNames);
    //  (dataList[j].select_options as any[]) = this.serviceResourceNames;
      })
  }

  onClearLang(dataList: any): void {
    this.len = 0
    //this.custom_field_id = dataList[j].custom_field_id;
    //this.field_code = dataList[j].field_code;
    this.searchText = '';
    this.servicesappointmentlistService.GetServiceResourceDll('', this.len, this.searchText).subscribe((data: any) => {
      this.serviceResourceNames = data;
    });

    this.resetValidations();
    //this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
    //  this.scrollDataList = this.commonService.customFieldsListData;
    //  // console.log('scrollDataList:', this.scrollDataList);
    //  (dataList[j].select_options as any[]) = this.scrollDataList;
    //})
  }

  //===============================For Service Crew Searchable Dropdown =======================================
  onScrollToEndServiceCrew(dataList: any) {
    this.fetchMoreServiceCrew(dataList);
  }

  private fetchMoreServiceCrew(dataList: any) {
    // // console.log("e", dataList);
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.len = dataList.length;
    this.servicesappointmentlistService.GetServiceCrewDll('', this.len, this.searchText).subscribe((data: any) => {
      this.serviceCrewNames = this.serviceCrewNames.concat(data);
    })
  }


  onKeyServiceCrew(e: any, dataList: any) {

    this.len = 0
    this.searchText = e.target.value;
   
    this.servicesappointmentlistService.GetServiceCrewDll('', this.len, this.searchText).subscribe((data: any) => {
      this.serviceCrewNames = data;
    })
  }

  onClearLangServiceCrew(dataList: any): void {
    this.len = 0
    this.searchText = '';
    this.servicesappointmentlistService.GetServiceCrewDll('', this.len, this.searchText).subscribe((data: any) => {
      this.serviceCrewNames = data;
    });

    this.resetValidations();
  }
    //===========================================================================================================
  onAbsencesSort(e) {

  }

  OnBackToListClick() {
    this.location.back();
  }

  addItem(newItem: number) {
    this.notescount = newItem;
    this.addNotesPopupModel1.getNoteslist();
  }
}

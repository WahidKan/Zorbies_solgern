import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, DailerParam } from '../shared/common.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LeadlistService, noteModel } from './leadlist.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LeadService, CheckboxData } from './lead.service';
import { LeadconvertpopupComponent } from './leadconvertpopup.component';
import { MakeappointmentComponent } from '../calendar/makeappointment/makeappointment.component';
import { Location } from '@angular/common';
import { NewnoteslistComponent } from '../shared/new-notes/newnoteslist.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fieldsJson } from '../managecustomlayout/managecustomlayout.service';
import { CalendarlistService } from '../calendar/calendarlist.service';
import { AppointmentsComponent } from '../shared/appointments/appointments.component';
import { LeadCallHistoryComponent } from '../shared/lead-call-history/lead-call-history.component';
import { ScheduleAppointmentService } from '../shared/schedule-appointment/schedule-appointment.service';
import { LeadSmsHistoryComponent } from '../shared/lead-sms-history/lead-sms-history.component';
import { VideoCallHistoryComponent } from '../shared/video-call-history/video-call-history.component';
@Component({
  selector: 'app-viewleadNew',
  templateUrl: './viewleadNew.component.html'
})
export class ViewleadNewComponent implements OnInit {
  @ViewChild('NotesPopupModel', { static: false }) addNotesPopupModel: ModalDirective;
  @ViewChild('listnotesmodel', { static: false }) addNewNotesPopupModel: NewnoteslistComponent;
  @ViewChild('listnotesmodel1', { static: false }) addNotesPopupModel1: NewnoteslistComponent;
  @ViewChild('makeappointment', { static: false }) makeappointment: MakeappointmentComponent;
  @ViewChild('listcalllog', { static: false }) listcalllog: LeadCallHistoryComponent;
  @ViewChild('videocalllog', { static: false }) videocalllog: VideoCallHistoryComponent;
  @ViewChild('smsHistory', { static: false }) smsHistory: LeadSmsHistoryComponent;
  @ViewChild('appointmentlist', { static: false }) appointmentlist: AppointmentsComponent;
  @ViewChild('addContact', { static: false }) addContact: ModalDirective;
  notemodel: noteModel = new noteModel();
  Id: any;
  is_converted: boolean = false;
  @Input() offset: number;
  moduleName = 'crm';
  submoduleName = 'lead';
  companyId: any;
  customCompnentValues: any;
  executionFlow: any[] = [];
  ownerId: any = '';
  customCompnentValuesTop: any;
  formControlList: any[] = [];
  form: FormGroup;
  loadSave = false;
  displayType = 'VIEW';
  LeadFirstName = '';
  leadId: any;
  LeadLastName = '';
  submoduleid: any = 10;
  objectname: any = 'Lead';
  sortDir = 'desc';
  sortColumn = 'createdon';
  islead = true;
  lstPageSize: any;
  lstPageSizeContact: any;
  currentPageNotes: number;
  accountId: any = 0;
  pageSizeValuenotes: number = 4;
  pageSizeValueContact: number;
  lstDocumentCategory: [];
  isEdit = false;
  LeadSMSCount: number = 0;
  totalRecordsLeadSMS: any;
  pageSizeValueLeadSMSList: number = 4;
  lstLeadSMS: any = {
    pager: {},
    data: []
  };
  currentPageLeadSMS: number;
  NotespagedData: any = {
    pager: {},
    data: []
  };
  lstFiles: any = {
    pager: {},
    data: []
  }
  title: any;
  NotesCount: number = 0;
  datalentgh: number;
  filePageNo: number = 1; pageSize: number = 4;
  filesCount: any;
  solgenpower: boolean = false;
  companyType: any;
  opid: any;
  contactpagedData: any = {
    pager: {},
    data: []
  };
  lstListingColorCode: any;
  isViewNote = false;
  notesTitle: any;
  notesDescription: any;
  ckeConfig;
  displayCheck;
  unqualifiedStage: boolean = false;
  siteurl: string = '';
  categoryId: string = '';
  ddlDocumentCategory: string;
  showEndAppintmentbutton: any = 0;
  contentHeader: object;
  @ViewChild('leadconvert', { static: false }) leadconvert: LeadconvertpopupComponent;
  constructor(private dialogService: ConfirmationDialogService,
    private leadService: LeadService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private leadservice: LeadlistService,
    private location: Location,
    private calendarlistService: CalendarlistService,
    private scheduleApintServ: ScheduleAppointmentService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {

      this.companyType = userdetail.companyType;
      if (this.companyType == "companytypeSolarInstall") {
        this.solgenpower = true;
      }
    });
  }
  checkboxdata1: Array<CheckboxData> = [];
  checkboxdataTop: Array<CheckboxData> = [];
  openDailer(phoneNumber: string) {
    // this.commonService.SetdialerNumber = new DailerParam(phoneNo: "string", companyId: "string", userId: "string", objectName: "string", refId: "string");
    let userinfo = JSON.parse(localStorage.getItem('userinfo'));
    const phoneno = '+1' + phoneNumber;
    this.commonService.SetdialerNumber = new DailerParam(phoneno, userinfo['companyId'], userinfo['id'], this.submoduleName, this.Id);

  }

  ngOnInit() {
    this.loadSave = true;
    this.route.queryParams.subscribe(params => {
      this.showEndAppintmentbutton = params['AppId'];

    });
    //alert(this.showEndAppintmentbutton);
    this.calendarlistService.getAditAppointment.subscribe(id => {
      this.makeappointment.editWithRedirect(id, "Lead");
    })
    this.siteurl = window.location.origin;
    //// console.log('siteurl', this.siteurl);
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.Id = id;
        this.leadId = id;
        localStorage.setItem('leadId', this.leadId);
      })
    this.GetCustomFieldsList();
    this.currentPageNotes = 1;
    this.pageSizeValueContact = 0;
    this.currentPageLeadSMS = 1;
    this.pageSizeValueLeadSMSList = 4;
    this.pageSizeValueContact = 4;
    this.getNoteslist();
    this.GetLeadSMSList();
    this.GetLeadAccountdata();
    this.getContactList();
    this.refreshCallHistory();
    this.refreshSmsHistory();
    this.getOperatorList();
    this.initBreadCrumb();
  }

  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Manage Leads',
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
            name: 'Manage Leads',
            isLink: true,
            link: '/lead'
          },
          {
            name: 'Lead Details',
            isLink: false
          }

        ]
    };
  }


  test(item){
    // console.log(item);
  }

  ExecuteAutomationFlow(AutomationId) {
    // console.log(AutomationId);
    window.open(`/automation-flow-execution/execution/${AutomationId}/${this.leadId}`, "_blank");
    //    let url = `/automation-flow-execution/execution/${AutomationId}/${this.leadId}`;
    //this.router.navigateByUrl(url);
  }

  addItem(newItem: boolean) {

    if (newItem) {
      this.GetCustomFieldsList();
    }
    this.addNotesPopupModel1.getNoteslist();
  }

  showConvert(Item: string) {
    if (Item == 'SHOW') {
      this.leadconvert.show(this.Id);
    }
  }

  appointmentRefresh() {
    this.appointmentlist.refresh();

  }

  close() {
    this.router.navigateByUrl("/lead");
  }

  //==============================================Note Section Start================================================================

  AddNotes() {
    this.isViewNote = false;
    this.title = "Add Notes";
    this.addNewNotesPopupModel.show(this.leadId);
    //this.addNotesPopupModel.show();
  }
  //========================Getting Note Form Value=============================
  get note_id() { return this.addNoteForm.get('note_id'); }
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
      this.notemodel.object_name = this.objectname;
      this.notemodel.object_ref_id = this.Id;
      this.notemodel.object_id = this.submoduleid;
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
  };

  getNoteslist() {
    // this.loadSave = true;
    this.leadservice.getNoteslist(this.Id, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.currentPageNotes, this.pageSizeValuenotes, '').subscribe(response => {
      this.NotespagedData = this.leadservice.pagedData;

      if (this.NotespagedData.data.length <= 0) {
        this.currentPageNotes = this.currentPageNotes - 1;
        this.getNoteslist();
      }
      this.datalentgh = this.NotespagedData.data.length;
      this.NotesCount = this.leadservice.pagedData.pager.totalItems;
      this.offset = this.currentPageNotes;
      // this.loadSave = false;
    }
      // , error => {
      //   this.loadSave = false;
      // }
    );
  };

  closeNotesPopupModelPopup() {
    this.addNotesPopupModel.hide();
    this.addNoteForm.reset();
  };

  setNotesPageNo($event) {
    // this.loadSave = true;
    this.currentPageNotes = $event.page;
    this.getNoteslist();
  };

  setPageNotes($event) {
    // this.loadSave = true;
    this.currentPageNotes = $event.page;
    this.getNoteslist();
    // this.currentPageNotes = $event.page;
  };

  onSortNotes($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPageNotes = 1;
    //this.loadSave = true;
    this.getNoteslist();
  };

  get curPageNotes(): number {
    return this.offset;
  };

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
  };

  DeleteNote(row) {
    const message = `Are you sure you want to delete Note?`;
    this.dialogService.confirm('Delete Note', message).subscribe(confirmed => {
      if (confirmed) {
        this.leadservice.DeleteRecords(row.note_id, 'tblNotes').subscribe((res: any) => {
          this.toaster.success(`Note has been deleted successfully.`);
          this.getNoteslist();
        });
      }
    })
  };

  //====================================================End========================================================================

  refreshCallHistory() {
    this.commonService.getRefreshDailerCaller.subscribe((result: any) => {
      this.listcalllog.GetLeadCallHistory();
      setTimeout(() => {
        this.loadSave = false;
      }, 2000);
    })
  }
  refreshVideoCallHistory() {
    this.videocalllog.GetVideoCallHistory();
  }
  refreshSmsHistory() {
    this.commonService.getRefreshSmsHistory.subscribe((result: any) => {
      this.smsHistory.getSmsLogHistory();
    })
  }
  GetLeadSMSList() {
    this.leadservice.getLeadSMSlist(this.Id, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.currentPageLeadSMS, this.pageSizeValueLeadSMSList, '')
      .subscribe(resp => {
        this.lstLeadSMS = this.leadservice.pagedData;
        this.LeadSMSCount = this.leadservice.pagedData.pager.totalItems;
        this.offset = this.currentPageLeadSMS;
        // this.loadSave = false;
      }
        // , error => {
        //   this.loadSave = false;
        // }
      )
  };
  setLeadSMSPageNo($event) {
    // this.loadSave = true;
    this.currentPageLeadSMS = $event.page - 1;
    this.GetLeadSMSList();
  };
  setPageLeadSMSList($event) {
    // this.loadSave = true;
    this.currentPageLeadSMS = $event.page - 1;
    this.GetLeadSMSList();
  };
  onSortLeadSMSList($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPageLeadSMS = 1;
    this.GetLeadSMSList();
  };
  get curPageLeadSMSList(): number {
    return this.offset;
  };

  GetCustomFieldsList() {

    this.formControlList = [];
    this.displayType = 'VIEW';
    this.leadService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe((result: any) => {
      if (result) {

        this.customCompnentValues = this.leadService.customFieldsList.data;
        // this.executionFlow=this.leadService.customFieldsList.executionFlow;


        let unqualifiedStatus: any;
        let val: any;
        unqualifiedStatus = this.customCompnentValues.filter(item => item.name == 'StatusName')
        if (unqualifiedStatus[0] != undefined) {
          val = unqualifiedStatus[0].value;
          if (typeof val != 'undefined' && val != null) {
            val = val.split(':', 1)
            if (val == 'Unqualified') {
              this.unqualifiedStage = true;
            }
            else {
              this.unqualifiedStage = false;
            }
          }
        }

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
              InnerData: this.customCompnentValues.filter(x => x.group_id == t.group_id),
              visibility_condition: t.visibility_condition,
              visibility_condition_label: t.visibility_condition_label,
              IsVisible: true,
              default_value: (t.default_value) ? t.default_value : '',
              layout_type: (t.layout_type) ? t.layout_type : '',
              group_display_order: (t.group_display_order) ? t.group_display_order : 0
            }
            this.formControlList.push(obj);
          }
        });
        //******************  merge groups and additional groups start here **********//
        if (this.additionalGroups) {
          this.additionalGroups.forEach(item => {

            let _object = {
              group_id: item.group_id,
              group_name: item.group_name,
              group_display_name: item.group_display_name,
              InnerData: [],
              visibility_condition: item.visibility_condition,
              visibility_condition_label: item.visibility_condition_label,
              IsVisible: true,
              default_value: (item.default_value) ? item.default_value : '',
              layout_type: (item.layout_type) ? item.layout_type : '',
              group_display_order: item.display_order
            };

            if (item.group_layout_type === 'textarea') {
              this.formControlList.push(_object);
            } else if (item.group_layout_type === 'textAreaTop') {
              this.groupTop.push(_object);
            }
          });
          this.formControlList.sort((a, b) => (a.group_display_order > b.group_display_order) ? 1 : -1);

          if (this.groupTop) {
            this.groupTop.sort((a, b) => (a.group_display_order > b.group_display_order) ? 1 : -1);

            this.groupTop.forEach((item, index) => {
              if (item.visibility_condition_label) {
                item.visibility_condition_label = (item.visibility_condition_label) ? JSON.parse(item.visibility_condition_label) : null;
                item.IsVisible = this.GetVisibilityDecision(item.visibility_condition_label);
              }
            });
          }
        }

        //******************  merge groups and additional groups end here **********//
        this.formControlList.forEach((item, index) => {
          if (item.visibility_condition_label) {
            item.visibility_condition_label = (item.visibility_condition_label) ? JSON.parse(item.visibility_condition_label) : null;
            item.IsVisible = this.GetVisibilityDecision(item.visibility_condition_label);
          }
        });
        const group: any = {};
        this.customCompnentValues.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          }
          //else if (cnt.dt_code == 'datetime') {
          //  if (cnt.value) {
          //    try {
          //      cnt.value = (cnt.value == '' ? null : new Date(cnt.value + 'Z'));
          //    }
          //    catch (e) {
          //      // console.log(e);
          //    }
          //  }
          //}
          //else if (cnt.dt_code == 'date' || cnt.actual_data_type == 'date') {
          //  if (cnt.value == "") {
          //    val = null;
          //  } else {
          //    let val1 = new Date(cnt.value);
          //    val = val1.getMonth() + 1 + '/' + val1.getDate() + '/' + val1.getFullYear();
          //  }
          //}
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

          if (cnt.ColumnName == 'OwnerName') {
            this.ownerId = cnt.ref_value;
          }

          if (cnt.dt_code == 'select') {
            if (cnt.value != '' && cnt.select_options != null) {
              cnt.select_options.forEach(itemList => {
                if (itemList.value == cnt.value) {
                  cnt.value = itemList.name;
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
        setTimeout(() => {
          this.loadSave = false;
        }, 2000);

        this.GetCustomFieldsListTopRow();
        this.getRelatedObjects();
        /////////////////////////////////Flowwww////////////////////////////

        let flowList = this.leadService.customFieldsList.executionFlow;
        flowList.forEach(item => {
          let itmevisible = 'yes';
          if (item.filterConditions)
            item.filterConditions.forEach(condi => {
              let fieldValue = this.customCompnentValues.find(x => x.custom_field_id == Number(condi.field)).value;
              //;
              if (itmevisible == 'yes') {
                if (condi.operator == "=") {
                  if (fieldValue.toLowerCase() == condi.value.toLowerCase()) {
                    item.isVisible = true;
                    if (item.visibilityCondition == '2')
                      itmevisible = 'no'
                  }
                  else {
                    item.isVisible = false;
                  }
                }
                else if (condi.operator == "<>") {
                  if (fieldValue.toLowerCase() != condi.value.toLowerCase()) {
                    item.isVisible = true;
                  }
                  else {
                    item.isVisible = false;
                  }
                }
              }


              if (item.visibilityCondition) {
                // -----AND
                if (item.visibilityCondition == '1') {

                  if (itmevisible == 'yes') {
                    if (item.isVisible) {
                      itmevisible = 'yes'
                    }
                    else {
                      itmevisible = 'no'
                    }
                  }
                  else {
                    item.isVisible = false;
                  }
                }
                // -----OR
              }
            });
          else
            item.isVisible = true;
        });
        this.executionFlow = flowList.filter(x => x.isVisible == true);

      }
    }, error => {
      // console.log(error);
      setTimeout(() => {
        this.loadSave = false;
      }, 2000);
    });
  }

  getValue(a, b: any[]): string {
    let data = "";
    if (b != null) {
      b.forEach(s => {
        try {
          if (s.value.toString() === a.toString()) {

            data = s.name;
          }
        } catch {

        }
      });
      return data;
    }
  }
  GetCustomFieldsListTopRow() {
    this.displayType = 'VIEW_TOP';
    this.leadService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe((result: any) => {
      if (result) {
        //
        debugger
        this.customCompnentValuesTop = this.leadService.customFieldsList.data;
        if (this.customCompnentValuesTop)
          this.customCompnentValuesTop.forEach(cnt => {
            let val = null;
            if (cnt.actual_data_type == 'bit') {
              val = cnt.value == 1 ? true : false;
            } else {
              val = (cnt.value == '' ? null : cnt.value);
            }
            this.checkboxdataTop.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
            if (cnt.actual_data_type == 'checkbox') {
              try {
                this.checkboxdataTop.forEach((item) => {
                  this.form.get(item.controlname).setValue(item.controlvalues.split(','));
                });
              }
              catch (err) { }
            }

            if (cnt.ColumnName == 'FirstName') {
              this.LeadFirstName = cnt.value;
            }
            if (cnt.ColumnName == 'LastName') {
              this.LeadLastName = cnt.value;
            }

            if (cnt.ColumnName == 'OwnerName') {
              this.ownerId = cnt.ref_value;
            }

            if (cnt.dt_code == 'select') {
              if (cnt.value != '' && cnt.select_options != null) {
                cnt.select_options.forEach(itemList => {
                  if (itemList.value == cnt.value) {
                    cnt.value = itemList.name;
                  }
                });
              }
            }
          });
      }
    });
  }

  showpopup() {
    this.leadconvert.show(this.Id);
  }

  GetLeadAccountdata() {
    this.leadservice.GetLeadAccountdata(this.Id, this.submoduleid, this.objectname).subscribe((result: any) => {
      this.is_converted = result[0].is_Converted;
    })
  }

  getContactList() {
    this.leadservice.getContactList(this.Id, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValueContact, null).subscribe(response => {
      this.contactpagedData = this.leadservice.pagedData;
    })
  }

  setPageContact($event) {
    this.leadservice.getContactList(this.Id, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.lstPageSizeContact, this.pageSizeValueContact, null).subscribe(response => {
      this.contactpagedData = this.leadservice.pagedData;
    })

  }

  onChangeContact() {
    this.leadservice.getContactList(this.Id, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValueContact, null).subscribe(response => {
      this.contactpagedData = this.leadservice.pagedData;
    })
  }

  AddContact() {
    this.addContact.show();
  }

  closeContact() {
    this.addContact.hide();
  }

  contactmsg(e: boolean) {
    this.getContactList();
    this.closeContact();
  }

  DeleteContact(Id: any) {
    const message = `Are you sure you want to delete Contact?`;
    this.dialogService.confirm('Delete Note', message).subscribe(confirmed => {
      if (confirmed) {

        this.leadservice.DeleteContact(Id, this.Id, this.submoduleid, this.objectname).subscribe(r => {
          this.toaster.success(`Note has been deleted successfully..`);

          this.getContactList();
        }, error => {
        });
      }
    });
  }

  getListingColorCode(fieldValue: any) {
    this.lstListingColorCode = '';
    if (fieldValue != null) {
      this.lstListingColorCode = fieldValue.split('::');
      if (this.lstListingColorCode.length > 0) {
        this.lstListingColorCode = [{ color: this.lstListingColorCode[0], colorkey: this.lstListingColorCode[1] }]
      }
    }
    return this.lstListingColorCode;
  }
  makeAppointment() {

    this.makeappointment.showComponent('Lead', this.Id);
  }

  SendBackClick() {
    this.loadSave = true;
    this.leadservice.SendBack(this.Id).subscribe((r: any) => {
      this.loadSave = false;
      if (r) {
        if (r.statusCode == 200) {
          this.toaster.success(r.responseMessage);
          this.GetCustomFieldsList();
        }
        else {
          this.toaster.error(r.responseMessage);
        }
      }

    }, error => {
    });

  }


  ViewNotes(row: any) {
    this.isViewNote = true;
    this.notesTitle = row.note_name;
    this.notesDescription = row.note_description;

    this.addNotesPopupModel.show();
  }
  onSort(e) {

  }
  OnBackToListClick() {
    this.location.back();
  }
  // OnBackToListFromAppointment(){
  //   //
  //  const AppoointmId=JSON.parse(localStorage.getItem("AppoointmId"));

  //   this.scheduleApintServ.UpdateScheduledAppointmentStatus(AppoointmId,'end').subscribe((result: any) => {
  //     if (result.statusCode == 200) {
  //       //

  //         this.router.navigateByUrl('lead');

  //     }

  //   }, error => {
  //   });
  // }

  addItems(newItem: number) {
    this.NotesCount = newItem;
    this.addNotesPopupModel1.getNoteslist();
  }

  subscriber = new Subject()
  operatorList: any;
  relatedObjects: any[] = [];
  groupTop: any[] = [];
  additionalGroups: any[];
  getRelatedObjects() {
    this.commonService.GetRelatedObjects(this.moduleName, this.submoduleName, this.Id, "", "")
      .pipe(takeUntil(this.subscriber))
      .subscribe(resp => {
        if (resp) {
          this.relatedObjects = resp["dataRelated"] as [];
          this.relatedObjects.forEach((item, index) => {
            if (item.visibility_condition_json) {
              item.visibility_condition_json = (item.visibility_condition_json) ? JSON.parse(item.visibility_condition_json) : null;
              item.IsVisible = this.GetVisibilityDecision(item.visibility_condition_json);
            }
          });
        } else {
          this.commonService.ShowError();
          this.loadSave = false;
        }
      }, error => {
        this.commonService.ShowError();
      }, () => {
      });
  }
  getOperatorList() {
    this.commonService.getOperatorsList('-1').toPromise()
      .then((res) => {
        this.operatorList = this.commonService.operator;
      })
      .catch((error) => { console.log(error) });
  }
  GetVisibilityDecision(jsonData: any) {
    try {
      
      let result: any[] = [];
      var json = this.commonService.TryJsonParse(jsonData);
      json.forEach((field: fieldsJson, index) => {
        let values = this.customCompnentValues.filter(column => column.custom_field_id == field.column_name)[0].ref_value;
        let expression: string = this.commonService.GetOperatorExpression(field.operatorId, this.operatorList);

        switch (expression.toLowerCase()) {
          case "==":
            result.push(field.value.includes(values) ? true : false);
            break;
          case "like":
            result.push(values.includes(field.value) ? true : false);
            break;
          case "!=":
            result.push(field.value.includes(values) ? false : true);
            break;
          case "not like":
            result.push(values.includes(field.value) ? false : true);
            break;
          case "<":
            result.push((parseFloat(values) < parseFloat(field.value)) ? true : false);
            break;
          case "<=":
            result.push((parseFloat(values) <= parseFloat(field.value)) ? true : false);
            break;
          case ">":
            result.push((parseFloat(values) > parseFloat(field.value)) ? true : false);
            break;
          case ">=":
            result.push((parseFloat(values) >= parseFloat(field.value)) ? true : false);
            break;
          case "between":
            result.push((parseFloat(values) >= parseFloat(field.value) && parseFloat(values) <= parseFloat(field.second_value)) ? true : false);
            break;
          case "is null":
            result.push((!values) ? true : false);
            break;
          case "is not null":
            result.push((values) ? true : false);
            break;
          default:
            result.push(false);
            break;
        }
      });

      let finalDecision = true;
      if (json.length > 1) {
        let data: string[] = json.map((field: fieldsJson) => field.extended_operator).filter((value, index, self) => self.indexOf(value) == index && value != "") as [];

        if (data.length <= 1) {
          let operator = (data[0]) ? data[0] : "";
          if (operator.toLowerCase() === "or") {
            let _filterResult = result.filter(resp => resp == true);
            if (_filterResult.length > 0) {
              finalDecision = true;
            } else {
              finalDecision = false;
            }
          }
          else if (operator.toLowerCase() === "and") {
            let _data = result.filter((value, index) => result.indexOf(value) == index) as any[];

            if (_data.length) {
              if (_data.length == 1) {
                if (_data[0] === false) {
                  finalDecision = false;
                }
                else {
                  finalDecision = true;
                }
              }
              else {
                finalDecision = false;
              }
            }
          }
        }
      }
      else {
        finalDecision = result[0];
      }
      return finalDecision;
    }
    catch (e) {
      return true;
      // console.log(e);
    }
  }
}

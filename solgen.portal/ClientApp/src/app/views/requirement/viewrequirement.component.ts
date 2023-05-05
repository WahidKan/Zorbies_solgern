import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import {CheckboxData, requirementService, projectJsonData } from './requirement.service';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../shared/common.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { noteModel, LeadlistService } from '../lead/leadlist.service';
import { DateTimeToLocalForAddEditPipe } from '../../pipes/datetime.pipe';
import { map, takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { NewnoteslistComponent } from '../shared/new-notes/newnoteslist.component';
import { Subject } from 'rxjs';
import { fieldsJson } from '../managecustomlayout/managecustomlayout.service';

@Component({
  selector: 'app-viewrequirement',
  templateUrl: './viewrequirement.component.html',
  styleUrls: ['./viewrequirement.component.scss']
})
export class ViewRequirementComponent implements OnInit {
  Id: any;
  moduleName = 'managerequirements';
  submoduleName = 'Requirements';
  companyId: any;
  customCompnentValues: any;
  customComponentProposalDetail: any;
  notescount: number = 0;
  accountId: any;
  customCompnentValuesTop: any;
  customValuesTempData=[];
  formControlList: any[] = [];
  primaryProposalId;
  proposalControlList: any[] = ['Name', 'System_Size_kW__c', 'Base_List_Price__c', 'System_Production_kWh__c', 'Adders_Amount__c', 'Dealer_Amount__c', 'Loan_ProductId', 'System_Cost__c', 'Include_SREC_Discount_in_Total__c','Discount_Amount__c'];
  form: FormGroup;
  proposerDetail: FormGroup;
  loadSave: boolean = false;
  displayType = 'VIEW';

  lstServiceAppointments: any = {
    pager: {},
    data: []
  }
 

  ServiceAppointmentPageNo: number = 1;
  OpportunityPageNo: number = 0;
  ContractNumber = '';
  ServiceAppointmentCount: any = 0;
  sortDir: string = 'desc';
  sortColumn: any = 'id';
  sortColumnlineitem: any = 'LineItemNumber';
  pageSize: number = 4;
  lstdepartment: any;
  isViewNote = false;
  notesTitle: any;
  notesDescription: any;
  datalentgh: number;
  contentHeader: object;
  constructor(private dialogService: ConfirmationDialogService,
    private leadservice: LeadlistService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private requirementService: requirementService,
    private location: Location) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.commonService.getMasterItemsList("department").subscribe((result: any) => {
      this.lstdepartment = this.commonService.masters;
    })

  }
  checkboxdata1: Array<CheckboxData> = [];
  checkboxdataTop: Array<CheckboxData> = [];
  pageSizeValuenotes: number = 4;
  NotespagedData: any = {
    pager: {},
    data: []
  };
  NotesCount: any = 0;
  @ViewChild('NotesPopupModel', { static: false }) addNotesPopupModel: ModalDirective;
  @ViewChild('listnotesmodel', { static: false }) listnotesmodel: NewnoteslistComponent;
  @ViewChild('listnotesmodel1', { static: false }) addNotesPopupModel1: NewnoteslistComponent;
  @ViewChild('FixOrder', { static: false}) fixOrderPopupModel: ModalDirective;
  notemodel: noteModel = new noteModel();
  servicesappointmentid: any;
  submoduleid: any = 234;
  title: any;
  objectname: any = 'workorder';
  //sortDir = 'desc';
  //sortColumn = 'createdon';
  currentPageNotes: number = 1;
  @Input() offset: number;
  @Input() offsetnotes: number;
  isEdit: boolean = false;

  LineItemPageno: number = 0;
  pageSizeValueLineitem: number = 4;
  LineItempagedData: any = {
    pager: {},
    data: []
  };
  lineItemCount: number = 0;
  siteurl: string = '';

  ngOnInit() {
    ;
    this.siteurl = window.location.origin;
    // console.log('siteurl', this.siteurl);
    this.currentPageNotes=1;
    this.loadSave = true;

    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.Id = id;
      });

    this.getOperatorList();
    this.GetCustomFieldsListTopRow();
    this.GetCustomFieldsList();
    /*this.getNoteslist();*/
    
  this.initBreadCrumb();

  }
  
  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Requirements',
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
            name: 'Requirements',
            isLink: true,
            link: '/requirement'
          },
          {
            name: 'Requirement Details',
            isLink: false
          }
 
        ]
    };
  }
  close() {
    this.router.navigateByUrl("/contract");
  }


  getRelatedTabData() {
    this.getProposalData();
   // this.GetServiceAppointmentList();

   // this.getNoteslist();
    //this.GetWorkOrderLineItemList();
  }


  getProposalData() {
    this.loadSave = true;
    if (this.primaryProposalId) {
      this.GetCustomFieldsProposalDetailList();
    }
  }

  GetCustomFieldsList() {
    this.displayType = 'VIEW';
    this.loadSave = true;
    this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(resp => {
      if (resp) {
        this.customCompnentValues = resp.data;
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
          else {
            val = (cnt.value == '' ? null : cnt.value);
          }
          if (cnt.ColumnName == 'Name') {
            this.ContractNumber = cnt.ref_value;
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

          if (cnt.ColumnName == "Primary_Proposal__c") {
            this.primaryProposalId = cnt.ref_value;
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
        //this.GetCustomFieldsListTopRow();
      }
    },
      err => {
        this.loadSave = false;
      },
      () => {
        //this.getRelatedTabData();
        this.getRelatedObjects();
        setTimeout(() => {
          this.loadSave = false;
        }, 3000);
      });
  }

  GetCustomFieldsProposalDetailList() {
    this.displayType = 'VIEW';
    this.loadSave = true;
    this.commonService.GetCustomFieldsList(this.moduleName, 'Proposal', this.companyId, this.primaryProposalId, this.displayType).subscribe(resp => {
      if (resp) {
        this.customComponentProposalDetail = resp.data;
        this.additionalGroups = resp.additionalGroups as [];

        const group: any = {};
        const _datetimeConvertor = new DateTimeToLocalForAddEditPipe;
        this.customComponentProposalDetail.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          }
          else if (cnt.dt_code == 'date') {
            val = _datetimeConvertor.transform(cnt.value, 'Date');
          }
          else if (cnt.dt_code == 'datetime') {
            val = _datetimeConvertor.transform(cnt.value, null);
          }
          else {
            val = (cnt.value == '' ? null : cnt.value);
          }

          if (cnt.dt_code == 'select') {
            if (cnt.value != '' && cnt.select_options != null) {
              cnt.select_options.forEach(itemList => {
                //if (itemList.value == cnt.value) {
                //  cnt.value = itemList.name;
                //}
                if (itemList.value == cnt.value && cnt.name == 'AccountId') {
                  this.accountId = itemList.value;
                  cnt.value = itemList.name;
                  
                }
                else if (itemList.value == cnt.value) {
                  cnt.value = itemList.name;
                }
              });
            }
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

          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])
        });
        this.proposerDetail = new FormGroup(group);
        //this.GetCustomFieldsListTopRow();
      }
    },
      err => {
        this.loadSave = false;
      },
      () => {

        let _proposalDetail = this.customComponentProposalDetail as Array<any>;
        let controlNameList = this.proposalControlList as Array<any>;

        controlNameList.forEach(item => {
          let _dat = _proposalDetail.filter(x => {
            if (x.ColumnName == item) {
              if (x.ColumnName == "Name") {
                x.field_route = '/proposal-list/viewproposal';
                x.ref_value = this.primaryProposalId;
                return x as object;
              }
              else {
                return x as object;
              }
            }
          });
          this.customValuesTempData.push(_dat[0]);
        });
        this.loadSave = false;

      });
  }

  GetCustomFieldsListTopRow() {
    this.displayType = 'VIEW_TOP';
    this.loadSave = true;
    this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(resp => {
      if (resp) {
        this.customCompnentValuesTop = resp.data;
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
        
          ;
          if (cnt.ColumnName == 'Name') {
            this.ContractNumber = cnt.value;
          }
         
          if (cnt.dt_code == 'select') {
            if (cnt.value != '' && cnt.select_options != null) {
              cnt.select_options.forEach(itemList => {
                if (itemList.value == cnt.value ) {
                  
                 
                  
                  cnt.value = itemList.name;
                }
                else if (cnt.name == 'AccountId') {
                  this.accountId = cnt.ref_value;
                 
                }
              });
            }
          }
        });
      }
    },
      err => {
        this.loadSave = false;
      },
      () => {
        setTimeout(() => {
          this.loadSave = false;
        }, 3000);
      });
  }

  AddNotes() {
    this.title = "Add Notes";
    this.isViewNote = false;
    this.addNoteForm.reset();
    this.listnotesmodel.show(this.Id);
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
    // console.log('addNoteForm', this.addNoteForm)
    if (this.addNoteForm.valid) {


      this.notemodel.note_id = this.addNoteForm.value.note_id;
      this.notemodel.note_name = this.addNoteForm.value.noteTitle;
      this.notemodel.note_description = this.addNoteForm.value.noteDescription;
      this.notemodel.object_name = "WorkOrder";
      this.notemodel.object_ref_id = this.Id;
      this.notemodel.object_id = 234;
      // console.log('notemodel', this.notemodel)
      this.leadservice.saveNotes(this.notemodel).subscribe((result: any) => {

        if (result.statusCode == 200) {
          //setTimeout(() => {  // console.log('notes') }, 3000);
          this.loadSave = false;
          this.toaster.success(result.responseMessage);
          this.addNoteForm.reset();
          this.getNoteslist();
          this.addNotesPopupModel.hide();
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

  getNoteslist() {
    this.leadservice.getNoteslist(this.Id, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.currentPageNotes, this.pageSizeValuenotes, '').subscribe(response => {

      this.NotespagedData = this.leadservice.pagedData;
      // console.log('this.NotespagedData ', this.NotespagedData)
      this.NotesCount = this.leadservice.pagedData.pager.totalItems;
      this.offsetnotes = this.currentPageNotes;
      this.datalentgh = this.NotespagedData.data.length;
    },
      err => { this.loadSave = false },
      () => { this.loadSave = false });
  }
  closeNotesPopupModelPopup() {
    this.addNotesPopupModel.hide();
    this.addNoteForm.reset();
  }
  setPageNotes($event) {
    this.currentPageNotes = $event.page;
    this.getNoteslist();
    // this.currentPageNotes = $event.page
  }

  onSortNotes($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPageNotes = 1;
    this.loadSave = true;
    this.getNoteslist();
  }

  get curPageNotes(): number {
    return this.offsetnotes;
  }
  //ViewNotes(row) {
  //  this.isViewNote = true;
  //    this.notesTitle= row.note_name,
  //      this.notesDescription=row.note_description
  //}
  EditNotes(row: any) {
    this.title = "Edit Notes";
    this.isEdit = true;
    this.isViewNote = false;
    this.addNoteForm.patchValue({
      note_id: row.note_id,
      noteTitle: row.note_name,
      noteDescription: row.note_description,
    });
    this.addNotesPopupModel.show();
  }


//  GetServiceAppointmentList() {
//    this.workOrderService.GetServiceAppointmentList(this.Id, this.sortColumn, this.sortDir, this.ServiceAppointmentPageNo, this.pageSize).subscribe(result => {
//      if (result) {
//        this.lstServiceAppointments = result;
//        this.ServiceAppointmentCount = result.pager.totalItems;
//      }
//    },
//      err => { this.loadSave = false },
//      () => { this.loadSave = false });
//  }

 
  onOpportunitySort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
   
  }
  setOpportunityPageNo($event) {
    this.OpportunityPageNo = $event.page;
    
  }

  OnBackToListClick() {
    this.location.back();
  }

//  onServiceAppointmentSort($event) {
//    const sort = $event.sorts[0]
//    this.sortDir = sort.dir;
//    this.sortColumn = $event.column.prop;
//    this.GetServiceAppointmentList();
//  }
//  setServiceAppointmentPageNo($event) {
//    this.ServiceAppointmentPageNo = $event.page;
//    this.GetServiceAppointmentList();
//  }

 
  DeleteNote(row) {
    const message = `Are you sure you want to delete Note?`;
    this.dialogService.confirm('Delete Note', message).subscribe(confirmed => {
      if (confirmed) {
        this.leadservice.DeleteRecords(row.note_id, 'tblNotes').subscribe((res: any) => {
          this.toaster.success(`Note has been deleted successfully.`);
          this.currentPageNotes = 1;
          this.getNoteslist();
        });
      }
    });
  }

//  addFixOrderForm = this.fb.group({
//    fixOrderID: [null],
//    departmentId: [null, Validators.required],
//    fixOrderDescription: [null]
//  });

//  get fixOrderID() { return this.addFixOrderForm.get('fixOrderID'); }
//  get departmentId() { return this.addFixOrderForm.get('departmentId'); }
//  get fixOrderDescription() { return this.addFixOrderForm.get('fixOrderDescription'); }

//  getFixOrderData(workOrderid: any) {
//    this.workOrderService.getFixOrderData(workOrderid).subscribe((result: any) => {
//      this.addFixOrderForm.patchValue({
//        fixOrderID: result.data[0].id,
//        departmentId: result.data[0].departmentId.toString(),
//        fixOrderDescription: result.data[0].departmentDescription,
//      });
//    },
//      (error: any) => {
//      })
//    this.fixOrderPopupModel.show();
//  }


//  Fix_Order() {
//    this.title = "Fix Order";
//    this.getFixOrderData(this.Id);
//  }
//  closeFixOrderPopupModelPopup() {
//    this.addFixOrderForm.reset();
//    this.fixOrderPopupModel.hide();
//  }
//  SaveFixOrder() {
//    if (this.addFixOrderForm.valid) {
//      this.loadSave = true;
//      this.fixOrdermodel.object_id = this.addFixOrderForm.value.fixOrderID;
//      this.fixOrdermodel.departmentId = this.addFixOrderForm.value.departmentId;
//      this.fixOrdermodel.fixOrderDescription = this.addFixOrderForm.value.fixOrderDescription;
//      this.fixOrdermodel.object_name = "WorkOrder";
//      this.fixOrdermodel.object_ref_id = this.Id;
//      this.workOrderService.fixOrder(this.fixOrdermodel).subscribe((result: any) => {
//        if (result.statusCode == 200) {
//          this.addFixOrderForm.reset();
//          this.loadSave = false;
//          this.toaster.success(result.responseMessage);
//          this.fixOrderPopupModel.hide();
//        }
//        else {
//          this.loadSave = false;
//          this.toaster.error(result.responseMessage);
//        }
//      });
//    }
//    else {
//      this.commonService.validateAllFormFields(this.addFixOrderForm);
//    }
//  }

//  //WorkOrderLineItem
//  GetWorkOrderLineItemList() {
//    this.workOrderService.GetWorkOrderLineItemList(this.Id, this.sortColumnlineitem, this.sortDir, this.LineItemPageno, this.pageSizeValueLineitem).subscribe(result => {

//      this.LineItempagedData = result;
//      // console.log('result', this.LineItempagedData);
//      this.lineItemCount = this.LineItempagedData.pager.totalItems;
//      this.offset = this.LineItemPageno;
//    },
//      err => { this.loadSave = false },
//      () => { this.loadSave = false });
//  }
//  setPageLineItem($event) {
//    this.LineItemPageno = $event.page - 1;
//    this.GetWorkOrderLineItemList();
//    this.LineItemPageno = $event.page
//  }
//  onSortLineItems($event) {
//    const sort = $event.sorts[0]
//    this.sortDir = sort.dir;
//    this.sortColumnlineitem = sort.prop;
//    this.LineItemPageno = 0;
//    this.loadSave = true;
//    this.GetWorkOrderLineItemList();
//  }
      
  ViewNotes(row: any) {
    this.isViewNote = true;
    this.notesTitle = row.note_name;
    this.notesDescription = row.note_description;

    this.addNotesPopupModel.show();
  }
  addItem(newItem: number) {
    this.notescount = newItem;
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
              item.IsVisible = this.GetVisibilityDecision( item.visibility_condition_json);
            }
          });
        } else {
          this.commonService.ShowError();
          this.loadSave = false;
        }
      }, error => {
        this.commonService.ShowError();
        this.loadSave = false;
      }, () => {
        this.loadSave = false;
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
      ;
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

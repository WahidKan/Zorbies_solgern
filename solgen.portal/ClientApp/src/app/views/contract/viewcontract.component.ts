import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CheckboxData, ContractService} from './contract.service';
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
import { MappingTempalte, ProposallistService } from '../proposal/proposallist.service';
import { SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-viewcontract',
  templateUrl: './viewcontract.component.html',
  styleUrls: ['./viewcontract.component.scss']
})
export class ViewContractComponent implements OnInit {
  Id: any;
  moduleName = 'CRM';
  submoduleName = 'Contract';
  companyId: any;
  customCompnentValues: any;
  executionFlow:any[]=[];
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
  lstOpportunity: any = {
    pager: {},
    data: []
  }

  ServiceAppointmentPageNo: number = 1;
  OpportunityPageNo: number = 0;
  ContractNumber = '';
  ServiceAppointmentCount: any = 0;
  OpportunityCount: any = 0;
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
  MappedId: any;
  documentGenerated = false;
  docuemnetMappingList: any[] = [];
  generatedDocumentMappingList: any[] = [];
  isViewPreviewModalGenerate = false;
  isViewPreviewModal = false;
  selectedGenerate = [];
  @ViewChild('previewModalGenerate', { static: false }) previewModalGenerate: ModalDirective;
  @ViewChild('previewModal', { static: false }) previewModal: ModalDirective;
  @ViewChild('ProposalPreviewDeliveryOptions', { static: false }) ProposalPreviewDeliveryOptions: ModalDirective;
  selectedmappedid: any;
  SelectionType = SelectionType;selected = [];
  TemplateList: any[];
  TemplateListNew: any[];
  signerExist: boolean = false;

  MappingTempalte: MappingTempalte = new MappingTempalte();

  constructor(private dialogService: ConfirmationDialogService,
    private leadservice: LeadlistService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private contractService: ContractService,
    private proposalService: ProposallistService,
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
       headerTitle: 'Manage Contract',
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
             name: 'Manage Contract',
             isLink: true,
             link: '/contract'
           },
           {
             name: 'Contract Details',
             isLink: false
           }
  
         ]
     };
   }
  ExecuteAutomationFlow(AutomationId){
    ;
    // console.log(AutomationId);
    window.open(`/automation-flow-execution/execution/${AutomationId}/${this.Id}`, "_blank");
    // let url = `/automation-flow-execution/execution/${AutomationId}/${this.Id}`
    // this.router.navigateByUrl(url);
  }
  close() {
    this.router.navigateByUrl("/contract");
  }


  getRelatedTabData() {
    this.getProposalData();
   // this.GetServiceAppointmentList();
   this.GetOpportunityList();

   // this.getNoteslist();
    //this.GetWorkOrderLineItemList();
  }


  getProposalData() {
    if (this.primaryProposalId) {
      this.GetCustomFieldsProposalDetailList();
    }
  }

  GetCustomFieldsList() {
    this.displayType = 'VIEW';
    this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(resp => {
      if (resp) {
        ;
        this.customCompnentValues = resp.data;
        // this.executionFlow=resp.executionFlow;
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
  /////////////////////////////////Flowwww////////////////////////////

  let flowList=resp.executionFlow;
  flowList.forEach(item => {
    let itmevisible = 'yes';
    if (item.filterConditions)
      item.filterConditions.forEach(condi => {
        let fieldValue = this.customCompnentValues.find(x => x.custom_field_id == Number(condi.field)).value;
        
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
    },
      err => {
        this.loadSave = false;
      },
      () => {
        //this.getRelatedTabData();
        this.getRelatedObjects();
        setTimeout(() => {
          this.loadSave = false;
        }, 2000);
      });
      
  }

  GetCustomFieldsProposalDetailList() {
    this.displayType = 'VIEW';
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
    this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(resp => {
      if (resp) {
        this.customCompnentValuesTop = resp.data;
        const convertdatetime = new DateTimeToLocalForAddEditPipe();
        this.customCompnentValuesTop.forEach(cnt => {
          let val = null;
          //debugger
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          } 
          else if (cnt.dt_code == 'datetime') {
            val = (cnt.value == '' ? null : convertdatetime.transform(cnt.value, null)); // to convert to local time
          }
          else if (cnt.dt_code == 'date') {
            val = (cnt.value == '' ? null : convertdatetime.transform(cnt.value, 'Date')); // to convert to local time
          }
          else {
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
          if (cnt.ColumnName == 'ContractNumber') {
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
        
        this.customCompnentValuesTop  = this.customCompnentValuesTop .filter(x => x.ColumnName != 'ContractNumber');
      }
    },
      err => {
      },
      );
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

  GetOpportunityList() {
    this.contractService.GetOpportunityList(this.Id, this.sortColumn, this.sortDir, this.OpportunityPageNo, this.pageSize).subscribe(result => {
      if (result) {
        this.lstOpportunity = result;
        this.OpportunityCount = result.pager.totalItems;
      }
    },
      err => { this.loadSave = false },
      () => { this.loadSave = false });
  }
  onOpportunitySort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    this.GetOpportunityList();
  }
  setOpportunityPageNo($event) {
    this.OpportunityPageNo = $event.page;
    this.GetOpportunityList();
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
      .catch((error) => {  console.log(error) });
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

  //============================================================Generate====================================================================
  ViewGeneratedDocuments(id: any) {
    this.MappedId = id;
    debugger
    this.proposalService.getGeneratedMappingList(this.Id, this.submoduleName).subscribe(response => {

      debugger
      this.generatedDocumentMappingList = response;
      this.documentGenerated = this.generatedDocumentMappingList.filter(x => x.ProposalMappingId > 0) ? true : false;
      this.isViewPreviewModalGenerate = true;

      //documentGenerated
      this.previewModalGenerate.show();
    },
      error => {
        this.toaster.error(error.statusText);
      })
  }
  closePreviewModal() {
    this.previewModal.hide();
    this.isViewPreviewModal = false;
    this.isViewPreviewModalGenerate = false;
  }
  onSelect({ selected }) {
    this.selected = [];
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  GoBack() {
    this.previewModal.hide();

    this.isViewPreviewModal = false;
    this.isViewPreviewModalGenerate = true;
    // this.ViewProposalGenrate(this.MappedId);
    this.previewModalGenerate.show();
  }
  downloadPDF() {
    this.loadSave = true;
    if (this.docuemnetMappingList.length > 0) {
      var ids = this.docuemnetMappingList.filter(x => x.DocumentType != "html").map(m => m.Id).join(",");//  this.docuemnetMappingList.map(m => m.Id && m.DocumentType!="html").join(",");
      debugger;
      var DocumentMappingDocIds = this.docuemnetMappingList.filter(x => x.DocumentType == "html").map(m => m.DocumentMappingDocId); //this.docuemnetMappingList.map(m => m.DocumentMappingDocId && m.DocumentType=="html");
      if (DocumentMappingDocIds.length > 0) {
        this.commonService.GetEcryptedId(this.Id).subscribe((result: any) => {
          if (result) {
           
            let Url = this.siteurl + "/proposal-document/" + encodeURIComponent(result) + "/system";
            window.open(Url);
            this.loadSave = false;
          }
        });




        // let Url = this.siteurl +"/proposal-document/122/"+this.proposalId+ "/system";
        // window.open(Url);
        // this.loadSave = false;
        // DocumentMappingDocIds.forEach(t => {      

        // });
      }


      if (ids) {
        this.proposalService.getDocumentBytes(this.Id, ids,"contract").subscribe(result => {

          var response = this.commonService.base64ToArrayBuffer(result);
          let file = new Blob([response], { type: 'application/pdf' });
          var fileURL = URL.createObjectURL(file);
          this.loadSave = false;
          window.open(fileURL);
        },
          error => {
            this.loadSave = false;
            if (error.status === 404) {
              this.toaster.error(error.error);
            }
            else {
              this.toaster.error("Something went wrong on mapping.");
            }

          });
      }
    } else {
      this.toaster.error("No record available.");
      this.loadSave = false;
    }

  }
  
  reviewDeliveryOptions() {
    this.loadSave = true;
    this.getTempalteList();

    if (this.docuemnetMappingList.length > 0) {

      this.selectedmappedid = this.docuemnetMappingList;
      var ids = this.selectedmappedid.filter(x => x.Status == 'GENERATED').map(x => x.Id).length;
      if (ids > 0) {
        this.ProposalPreviewDeliveryOptions.show();
        this.previewModal.hide();
        this.isViewPreviewModal = false;
      }
      else {
        if (this.selectedmappedid.map(x => x.Id).length > 0) {
          ///this.toaster.error("All the documents in the list are already sent.");
          this.toaster.error("All the documents in the list is already sent/signed by the customer. To send a new document delete/void the previous document.");
          
          this.loadSave = false;
        }
        else {
          this.toaster.error("No document available for send.");
          this.loadSave = false;
        }

      }

    }
    else {
      this.toaster.error("No record available.");
      this.loadSave = false;
    }
    this.loadSave = false;
  }

  closePreviewModalGenerate() {
    this.selectedGenerate = [];
    this.isViewPreviewModalGenerate = false;
    this.isViewPreviewModal = false;
    this.previewModalGenerate.hide();
  }
  

  getTempalteList() {

    this.loadSave = true;
    this.proposalService.GetTempalteList(this.Id).subscribe((data: any) => {
      this.loadSave = false;
      this.TemplateList = data;
      this.FillDeliveryoptionDate();
    }, err => {
      this.loadSave = false;
    })

  }

  FillDeliveryoptionDate() {

    this.TemplateListNew = [];
    this.MappingTempalte = new MappingTempalte();
    if (this.TemplateList.length > 0) {

      if (this.TemplateList.length > 1) {
        this.TemplateListNew = this.TemplateList.filter(x => x.sendingTypeSignNow == true && (x => x.signer1Option > 0 && x.signer2Option > 0));
        if (this.TemplateListNew.length > 0) {
          this.MappingTempalte.sendingType = this.TemplateListNew[0].sendingType;
          this.MappingTempalte.sendingTypeSignNow = this.TemplateListNew[0].sendingTypeSignNow;
          this.MappingTempalte.sendToEmail = this.TemplateListNew[0].sendToEmail;
          this.MappingTempalte.fromToEmail = this.TemplateListNew[0].fromToEmail;
          this.MappingTempalte.signer1Email = this.TemplateListNew[0].signer1Email;
          this.MappingTempalte.signer2Email = this.TemplateListNew[0].signer2Email;
          this.MappingTempalte.subject = this.TemplateListNew[0].subject;
          this.MappingTempalte.body = this.TemplateListNew[0].body;
          this.MappingTempalte.ccEmail = this.TemplateListNew[0].ccEmail;
          this.MappingTempalte.MappingTempalteId = this.TemplateListNew[0];
          this.signerExist = true;
        }
        else {
          this.TemplateListNew = this.TemplateList.filter(x => x.sendingType == true);
          if (this.TemplateListNew.length > 0) {
            this.MappingTempalte.sendingType = this.TemplateListNew[0].sendingType;
            this.MappingTempalte.sendingTypeSignNow = this.TemplateListNew[0].sendingTypeSignNow;
            this.MappingTempalte.sendToEmail = this.TemplateListNew[0].sendToEmail;
            this.MappingTempalte.fromToEmail = this.TemplateListNew[0].fromToEmail;
            this.MappingTempalte.signer1Email = this.TemplateListNew[0].signer1Email;
            this.MappingTempalte.signer2Email = this.TemplateListNew[0].signer2Email;
            this.MappingTempalte.subject = this.TemplateListNew[0].subject;
            this.MappingTempalte.body = this.TemplateListNew[0].body;
            this.MappingTempalte.ccEmail = this.TemplateListNew[0].ccEmail;
            this.MappingTempalte.MappingTempalteId = this.TemplateListNew[0];
            this.signerExist = false;
          }
        }
      }
      else {
        this.MappingTempalte.sendingType = this.TemplateList[0].sendingType;
        this.MappingTempalte.sendingTypeSignNow = this.TemplateList[0].sendingTypeSignNow;
        this.MappingTempalte.sendToEmail = this.TemplateList[0].sendToEmail;
        this.MappingTempalte.fromToEmail = this.TemplateList[0].fromToEmail;
        this.MappingTempalte.signer1Email = this.TemplateList[0].signer1Email;
        this.MappingTempalte.signer2Email = this.TemplateList[0].signer2Email;
        this.MappingTempalte.subject = this.TemplateList[0].subject;
        this.MappingTempalte.body = this.TemplateList[0].body;
        this.MappingTempalte.MappingTempalteId = this.TemplateList[0];
        this.MappingTempalte.ccEmail = this.TemplateList[0].ccEmail;
        if (!this.TemplateList[0].sendingType && this.TemplateList[0].sendingTypeSignNow) {
          this.signerExist = true;
        }
        else {
          this.signerExist = false;
        }
      }
    }
  }
  onSelectGenerate({ selected }) {

    this.selectedGenerate = [];
    this.selectedGenerate.splice(0, this.selectedGenerate.length);
    this.selectedGenerate.push(...selected);
  }
  getIsShowColName({ row, column, value }) {
    if (row.ProposalMappingId > 0) {
      return {
        'dispaly-none': true
      };
    }
  }

  VoidDocument(row) {

    this.loadSave = true;
    this.proposalService.VoidDocument(row.Id.toString(), this.Id,"contract").subscribe((response: any) => {

      this.loadSave = false;
      if (response.statusCode == 200) {

        this.generatedDocumentMappingList = response.result;
        this.documentGenerated = this.generatedDocumentMappingList.filter(x => x.ProposalMappingId > 0) ? true : false;

        this.toaster.success(`Document has been voided successfully`);
        // this.generatedDocumentMappingList.find(m=>m.Id == row.Id).ProposalMappingId = 0;
        // this.previewModalGenerate.hide();
        // this.isViewPreviewModalGenerate = false;
      }
      else {
        this.toaster.error(response.responseMessage);
      }
    }, error => {

    });
  }
  GenerateDocument() {
    this.loadSave = true;
    var ids = this.selectedGenerate.filter(x => x.ProposalMappingId == 0).map(x => x.Id).join(',');
    if (ids != '' && ids != null) {
      this.proposalService.GenerateDocument(this.Id, ids, this.submoduleName).subscribe(result => {
        this.isViewPreviewModalGenerate = false;
        this.loadSave = false;
        if (result) {
          // if(result.result.innerHtml)
          // {           
          //   this.previewModalGenerate.hide();
          //   this.htmlString = result.result.innerHtml
          //   this.ProposalPreviewDeliveryOptionsHTML.show();
          // }
          // else{
          if (result.statusCode == 200) {
            this.isViewPreviewModalGenerate = true;
            this.generatedDocumentMappingList = result.result;
            this.toaster.success(result.responseMessage);
            if (result.documentErrorMessage) {
              this.toaster.error('Document mapping is not found for ' + result.documentErrorMessage);
            }
            if (result.routeErrorMessage) {
              this.toaster.error('Route/Rule is failed for ' + result.routeErrorMessage);
            }
            this.documentGenerated = this.generatedDocumentMappingList.filter(x => x.ProposalMappingId > 0) ? true : false;
            this.previewModalGenerate.hide();
            this.selectedGenerate = [];
            this.ViewProposal(this.Id);
            this.GetProposalDocument();


          } else {
            this.isViewPreviewModalGenerate = true;
            // this.generatedDocumentMappingList = result.result;
            this.documentGenerated = this.generatedDocumentMappingList.filter(x => x.ProposalMappingId > 0) ? true : false;
            this.toaster.error(result.responseMessage);
            if (result.documentErrorMessage) {
              this.toaster.error('Document mapping is not found for ' + result.documentErrorMessage);
            }
            if (result.routeErrorMessage) {
              this.toaster.error('Route/Rule is failed for ' + result.routeErrorMessage);
            }
          }
        }

        //}
      },
        error => {
          // this.isViewPreviewModalGenerate = false;
          this.loadSave = false;
          this.toaster.error(error.error);
        });
    }
    else {
      const MappingListItems = this.generatedDocumentMappingList.filter(x => x.ProposalMappingId != 0);
      if (MappingListItems.length == 0) {
        this.loadSave = false;
        this.toaster.error("Please select atleast one document to generate.");
      }
      else {
        this.loadSave = false;
        this.previewModalGenerate.hide();
        this.isViewPreviewModalGenerate = false;
        this.isViewPreviewModal = true;
        this.ViewProposal(this.Id);
      }
    }
  }

  ViewProposal(id: any) {
    //this.proposalId = id;
    debugger
    this.proposalService.getDocumentMappingsList(id, this.submoduleName).subscribe(response => {
      if (response) {
        this.docuemnetMappingList = response;
        this.isViewPreviewModal = true;
        this.previewModal.show();
      }

    },
      error => {
        this.toaster.error(error.statusText);
      })
  }
  
  documentCounter: any = 0;
  documentlist: any = {
    pager: {},
    data: []
  }
  GetProposalDocument() {

    debugger
    this.proposalService.GetProposalDocument(this.Id).subscribe(result => {

      if (result) {
        this.documentlist = result;
        this.documentCounter = result.length;
      }
    },
      error => {
        // console.log(error)
      });
  }
  //============================================================Start Proposal Preview Delivery Options====================================================================
  closePreviewDeliveryOptions() {
    this.isViewPreviewModal = false;
    this.isViewPreviewModalGenerate = false;
    this.ProposalPreviewDeliveryOptions.hide();
  }

  sendDocumentsToSignNow() {
    debugger;
    this.loadSave = false;
    this.isViewPreviewModalGenerate = false;
    if (this.MappingTempalte.MappingTempalteId) {
      this.loadSave = true;
      var ids = this.selectedmappedid.filter(x => x.Status == 'GENERATED').map(x => x.Id).join(',');
      var onlyhtml = this.selectedmappedid.filter(x => x.Status == 'GENERATED').find((x => x.DocumentType == "route" || x.DocumentType == "document")) ? "no" : "yes";
      let mappingtype = this.MappingTempalte.sendingType ? 'email' : '';
      if (mappingtype == '') {
        mappingtype = this.MappingTempalte.sendingTypeSignNow ? 'signnow' : '';
      }
      var sentdoc = this.selectedmappedid.filter(x => x.Status == 'SENT').map(x => x.Name).join(',');
      if (sentdoc) {
        var message = "Following documents are already sent:";
        this.toaster.error(message + sentdoc);
      }
      this.proposalService.SendDocumentSignNow(this.Id, ids, mappingtype, this.MappingTempalte.MappingTempalteId.Id, this.MappingTempalte.subject, this.MappingTempalte.body, onlyhtml,'contract').subscribe(result => {
        if (result) {
          debugger
          if (result.statusCode == 200) {
            this.ProposalPreviewDeliveryOptions.hide();
            this.isViewPreviewModal = false;
            this.loadSave = false;
            this.toaster.success(result.responseMessage);
          } else {
            this.loadSave = false;
            this.toaster.error(result.responseMessage);
          }
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      },
        error => {
          this.loadSave = false;
          this.toaster.error(error.error);
        });
    }
    else {
      this.loadSave = false;
      this.toaster.error("Please select Tempelate.");
    }

  }

  onTemChange(event) {

    if (event) {
      this.MappingTempalte.body = event.body;
    }
  }

}

import { Component, OnInit, ViewChild, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CheckboxData, WorkorderService, fixOrderModel, StartWorkOrderModel, addeditProductRequired, addeditEngineeringQuestionModel, WorkOrderProposal } from './workorderservice.service';
import { ActivatedRoute, Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService, UserDetails } from '../shared/common.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ModalDirective } from 'ngx-bootstrap';
import { noteModel, LeadlistService } from '../lead/leadlist.service';
import { Location } from '@angular/common';
import { NewnoteslistComponent } from '../shared/new-notes/newnoteslist.component';
import { LightboxConfig, Lightbox } from 'ngx-lightbox';
import { DateTimeToLocalForAddEditPipe } from '../../pipes/datetime.pipe';
import { dataRelated, fieldsJson } from '../managecustomlayout/managecustomlayout.service';
import { LayoutControlModel } from '../managelayout/layout.service';
import { filter, pairwise, take, takeUntil } from 'rxjs/operators';
import 'rxjs/add/operator/pairwise';
import { PreviousRouteServiceService } from '../shared/previous-route-service.service';
import { error } from '@angular/compiler/src/util';
import { Subject } from 'rxjs';
import { WorkOrderLineItemPopupComponent } from './work-order-line-item-popup/work-order-line-item-popup.component';
import { addeditprojectrequirements } from '../requirementslist/addeditprojectrequirement/addeditprojectrequirements.component';


@Component({
  selector: 'app-viewworkorder',           
  templateUrl: './viewworkorder.component.html',    
  styleUrls: ['./viewworkorder.component.scss']     
})
export class ViewworkorderComponent implements OnInit, OnDestroy {
  @ViewChild('addProduct', { static: false }) addProduct: ModalDirective;
  @ViewChild('audit', { static: false }) auditModel: ModalDirective;
  @ViewChild('auditCheckList', { static: false }) auditCheckListModel: ModalDirective;
  @ViewChild('notesDetailModal', { static: false }) modalnote: ModalDirective;
  //@ViewChild('ProjectRequiremtlModal', { static: false }) projectrequiremnt: ModalDirective;
  @ViewChild('addeditprojectrequirements', { static: false }) addeditprojectrequirements: addeditprojectrequirements;
  @ViewChild('newRequirementPopup', { static: false }) newRequirementModelPopup: ModalDirective;
  @ViewChild('lineItemWorkOrderPopup',{static:false}) lineItemWorkOrderPopup:WorkOrderLineItemPopupComponent
  @Output() buttonState = new EventEmitter();
  subscriber = new Subject()

  @Input() count: number;
  @Output() countChanged: EventEmitter<number> = new EventEmitter();
  Id: any;
  moduleName = 'crm';
  submoduleName = 'workorder';
  executionFlow:any[]=[];
  companyId: any;
  customCompnentValues: any;
  additionalGroups: any[];
  dataNoti: any;
  customCompnentValuesTop: any;
  cardNoteId: any;
  isInterconnection = false;
  formControlList: any[] = [];
  SumarryData = [];
  form: FormGroup;
  NotificationListData = [];
  appmodel: addeditProductRequired = new addeditProductRequired();
  addeditEngQuesModel: addeditEngineeringQuestionModel = new addeditEngineeringQuestionModel();
  loadSave: boolean = false;
  displayType = 'VIEW';
  NotespagedDataCardView: any = {
    pager: {},
    data: []
  };
  lstServiceAppointments: any = {
    pager: {},
    data: []
  }
  lstOpportunity: any = {
    pager: {},
    data: []
  }
  lstProductsRequired: any = {
    pager: {},
    data: []
  }
  lstProposal: any = {
    pager: {},
    data: []
  }

  requirementListingData: any = {
    pager: {},
    data: []
  };
  listFilterreq = '';
  sortDirreq = 'desc';
  sortColumnreq = 'Id';
  curPagereq: number;
  pageSizeValuereq: number;

  filePageNo: number = 1;
  ServiceAppointmentPageNo: number = 1;
  OpportunityPageNo: number = 1;
  ProposalPageNo: number = 1;
  WorkOrderSubject = '-';
  ServiceAppointmentCount: any = 0;
  ProductsRequiredCounts: any = 0;
  productRequiredWorkOrderNumber: any = '';
  ProductRequiredPageNo: number = 1;
  OpportunityCount: any = 0;
  ProposalCount: any = 0;
  sortDir: string = 'desc';
  sortColumn: any = 'id';
  sortColumnlineitem: any = 'LineItemNumber';
  pageSize: number = 4;
  lstdepartment: any;
  isViewNote = false;
  lstQuantityUnitOfMeasure: any;
  notesTitle: any;
  notesDescription: any;
  datalentgh: number;
  lstStatus = [];
  status: string = '';
  addForm: FormGroup;
  customFieldId = '';
  loaderStatus: boolean = false;
  lstProductRequired: any;
  WorkOrderHistoryCount = 0;
  WorkOrderHistoryPageNo: number = 1;
  lstWorkOrderHistory = {
    pager: {},
    data: []
  }
  statusids: string;
  statusValue: string;
  isStartWork: boolean = false;
  isFixOrder: boolean = false;
  isCompleteWork: boolean;
  isDisabled: any;
  auditData: any;
  IsAuditCheckListDisplay: boolean = false;
  //isDisabled: any;
  //auditData: any;
  //IsAuditCheckListDisplay: boolean = false;
  accountId: any;
  accountName: any;
  CheckListGroup: any[] = [];
  SectionGroup: any[] = [];
  SectionGroupTop: any[] = [];

  noteId: any;
  cardTitle: any = '';
  cardStatus: any;
  cardAssignedTo: any;
  cardResource: any;
  cardNotify: any;
  cardDesc: any;
  lstListingColorCode: any;
  //accountId: any;
  //CheckListGroup: any[] = [];
  //SectionGroup: any[] = [];
  //SectionGroupTop: any[] = [];
  lstEngineeringQuestion: any = {
    pager: {},
    data: []
  }
  addEditEngineeringForm: FormGroup;
  workOrderProposalForm: FormGroup;
  lstMPU: any;
  lstTrenching: any;
  lstRetrofit: any;
  lstInterconnection: any;
  lstroofMaterial: any;
  iSEngineeringQues: boolean = false;
  onSaveEngQuesBtn: boolean = false;
  checkNumberOnly: any;
  dotCount: any;
  checkString: any;
  lstUsers: any;
  showSubCategoryDropDown: boolean = false;
  lstdepartmentSubCategory: any;
  previousUrl: any;
  userType: string;

  constructor(private dialogService: ConfirmationDialogService,
    private leadservice: LeadlistService,
    private workOrderService: WorkorderService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private location: Location,
    private _lightbox: Lightbox,
    private _lightboxConfig: LightboxConfig,
    private previousRouteService: PreviousRouteServiceService) {
    let user = this.commonService.TryJsonParse(localStorage.getItem('userinfo'));
    if (user) {
      this.userType = user["userType"];



    }
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.commonService.getMasterItemsList("department").pipe(takeUntil(this.subscriber)).subscribe((result: any) => {
      this.lstdepartment = this.commonService.masters;
    });



    //  this.router.events.pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise()).subscribe((events: RoutesRecognized[]) => {
    //  // console.log('previous url', events[0].urlAfterRedirects);
    //  // console.log('current url', events[1].urlAfterRedirects);
    //  this.previousUrl = events[0].urlAfterRedirects;
    //});
  }

  checkboxdata1: Array<CheckboxData> = [];
  checkboxdataTop: Array<CheckboxData> = [];
  pageSizeValuenotes: number = 4;
  NotespagedData: any = {
    pager: {},
    data: []
  };
  NotesCount: any = 0;
  ProductRequiredTitle: any = '';
  /*@ViewChild('NotesPopupModel', { static: false }) addNotesPopupModel: ModalDirective;*/
  @ViewChild('listnotesmodel', { static: false }) addNotesPopupModel: NewnoteslistComponent;
  @ViewChild('listnotesmodel1', { static: false }) addNotesPopupModel1: NewnoteslistComponent;  
  @ViewChild('NotesPopupModel', { static: false }) addNotesPopupModels: ModalDirective;
  @ViewChild('FixOrder', { static: false }) fixOrderPopupModel: ModalDirective;
  @ViewChild('UpdateStatus', { static: false }) UpdateStatusModal: ModalDirective; //ProductRequired
  @ViewChild('ProductRequired', { static: false }) ProductRequiredpopup: ModalDirective;



  notemodel: noteModel = new noteModel();
  fixOrdermodel: fixOrderModel = new fixOrderModel();
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
  workOrderId: number;
  isModalShow = false;
  auditCheckListData: any[];
  serviceAppointmentId: any;
  auditTitle: any;
  checkListType: any;
  isScroll = false;

  LineItemPageno: number = 1;
  pageSizeValueLineitem: number = 4;
  LineItempagedData: any = {
    pager: {},
    data: []
  };
  lineItemCount: number = 0;
  RequirementCount: number = 0;
  RequirementPageno: number = 1;
  siteurl: string = '';
  ParamsValues: any;
  sAppoiNo: any;;
  previousSAUrl: any;
  wTId: any;
  from: any;
  to: any;
  StatusIdChk: any;
  AttchmentId: any;
  operatorList: any;
  groupTop: any[]=[];
  roleCode: any;
  userTypeName: any;
  isAdmin: boolean = false;
  contentHeader: object;

  ngOnInit() {
    debugger
    this.listFilterreq = '';
    this.curPagereq= 1;
    this.pageSizeValuereq = 10;
    this.loadSave = true;
    this.isStartWork = false;
    this.isFixOrder = false;
    this.isCompleteWork=false;
    this.siteurl = window.location.origin;
    this.initForm();
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.Id = id;
      });
     
    this.getOperatorList();
    this.GetCustomFieldsList();
    this.GetCustomFieldsListTopRow();
   
    //this.getNoteslistCardView();
    setTimeout(() => {
       this.loadSave = false 
       this.getListingGridData();
      }, 5000);
    this.GetWorkOrderLineItemList();
    setTimeout(() => { this.loadSave = false }, 5000);


  
    this.initBreadCrumb();
  }
  
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage WorkOrder',
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
             name : 'Manage WorkOrder',
             isLink : true,
             link : '/workorder'
           },
           {
             name: 'Work Order Details',
             isLink: false
           }
  
         ]
     };
   }
  ngOnDestroy() {
    this.subscriber.next();
    this.subscriber.complete();
  }

  relatedObjects: any[]=[];
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

  close() {
    this.router.navigateByUrl("/workorder");
  }

  //getRelatedTabData() {
  //  this.GetServiceAppointmentList();
  //  this.GetOpportunityList();
  //  //this.getNoteslist();
  //  this.GetWorkOrderLineItemList();
  //  this.GetWorkOrderHistoryList();
  //  this.GetProductRequiredList();
  // // this.initForm();
  //  this.initEngineeringForm();
  //  this.initWorkOrderProposalForm();
  //  this.GetEngineeringQuestionData();
  //  this.GetWorkOrderProposal();
  //  this.getSumarryData();

  //  //=======Disabled Engineering Questions Fields========
  //  this.addEditEngineeringForm.disable();
  //  this.workOrderProposalForm.disable();
  //  this.onSaveEngQuesBtn = false;
  //  //====================================================
  //}

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
  ExecuteAutomationFlow(AutomationId){
    //;
    // console.log(AutomationId);
    window.open(`/automation-flow-execution/execution/${AutomationId}/${this.Id}`, "_blank");
    // let url = `/automation-flow-execution/execution/${AutomationId}/${this.Id}`
    // this.router.navigateByUrl(url);
  }
  getListingColorCodeRemove(fieldValue: any) {
    this.lstListingColorCode = '';
    if (fieldValue != null) {
      this.lstListingColorCode = fieldValue.split('::');
      if (this.lstListingColorCode.length > 0) {
        this.lstListingColorCode = this.lstListingColorCode[0]
      } else {
        this.lstListingColorCode = fieldValue;
      }
    }
    return this.lstListingColorCode;
  }

  GetCustomFieldsList() {
    this.displayType = 'VIEW';
    this.loadSave = true;

    let valWorkType = '';
    this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType)
      .pipe(takeUntil(this.subscriber))
      .subscribe(resp => {
        if (resp) {
        this.customCompnentValues = resp.data;
        
       // this.executionFlow=resp.executionFlow;
        this.additionalGroups = resp.additionalGroups as [];
       // // console.log('this.customCompnentValues', this.customCompnentValues);
        this.formControlList = [];
        this.customCompnentValues.forEach(t => {
          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
          if (t.dt_code == 'checkbox') {
            let checkdata = new CheckboxData();
            checkdata.controlname = t.ColumnName;
            this.checkboxdata1.push(checkdata);
          }
          if (groupCheck == null || groupCheck.length == 0) {
            //if (!t.group_name.includes('Proposal')) {
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
            //}
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
                item.visibility_condition_label = (item.visibility_condition_label) ? this.commonService.TryJsonParse(item.visibility_condition_label) : null;
                item.IsVisible = this.GetVisibilityDecision(item.visibility_condition_label);
              }
            });
          }
        }
        //******************  merge groups and additional groups end here **********//

        this.formControlList.forEach((item, index) => {
          if (item.visibility_condition_label) {
            item.visibility_condition_label = (item.visibility_condition_label) ? this.commonService.TryJsonParse(item.visibility_condition_label) : null;
            item.IsVisible = this.GetVisibilityDecision(item.visibility_condition_label);
          }
        });
           
        if (this.userType == 'usertypecompanyadmin') {
          this.isAdmin = true;
        }
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

          if (cnt.dt_code == 'select') {
            if (cnt.value != '' && cnt.select_options != null) {
              cnt.select_options.forEach(itemList => {
                if (itemList.value == cnt.value) {
                  cnt.value = itemList.name;
                }
              });
            }
          }
          if (cnt.ColumnName == 'Status') {
            this.status = cnt.value;
            this.customFieldId = cnt.custom_field_id;
            this.statusids = cnt.ref_value;
            this.statusValue = this.getListingColorCodeRemove(cnt.value);
            if (this.statusValue == 'New') {
              this.isStartWork = true;
            }
            if (this.statusValue == 'In Progress') {
              this.isCompleteWork = true;
            }
            if (this.statusValue == 'On Hold') {
              this.isFixOrder = true;
            }
          }
         
          if (cnt.ColumnName == 'WorkOrderNumber') {
            this.productRequiredWorkOrderNumber = cnt.value;

          }
          if (cnt.ColumnName == 'AccountId') {
            //;
            this.accountId = cnt.ref_value;
            this.accountName = cnt.value;

          }

          //if (cnt.ColumnName == 'WorkTypeId' && cnt.value == 'Engineering' || cnt.value == 'Permitting' || cnt.value == 'ENG - Structural') {
          //  this.iSEngineeringQues = true;

          //}
          if (cnt.ColumnName == 'WorkTypeId' && cnt.value == 'Interconnection') {
            this.isInterconnection = true;
          }
          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])
        });
        this.form = new FormGroup(group);

        //if (this.iSEngineeringQues) {
        //  this.formControlList = this.formControlList.filter(x => !x.group_name.includes('Engineering'));
        //}

        //if (valWorkType != "re-roof") {
        //  this.formControlList = this.formControlList.filter(x => !x.group_name.includes('Roofing'));
        //}

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
        setTimeout(() => { this.loadSave = false }, 5000);
      },
      () => {
        //this.getRelatedTabData();
        this.getRelatedObjects();

        ////======Engineering Question Fields binding=================
        //this.GetlstMPU();
        //this.GetlstTrenching();
        //this.GetlstRetrofitNeeded();
        //this.GetlstInterconnection();
        //this.GetlstroofMaterial();
        //this.GetUsers();
        //const convertdatetime = new DateTimeToLocalForAddEditPipe();
        //this.customCompnentValues.forEach(cnt => {
        //  let val = null;
        //  if (cnt.name == 'MPU_Needed__c') {
        //    this.mpuNeeded.setValue(cnt.ref_value);
        //  }
        //  if (cnt.name == 'Trenching_Needed__c') {
        //    this.trenchingNeeded.setValue(cnt.ref_value);
        //  }
         
        //  if (cnt.name == 'Retrofit_Needed__c') {
        //    this.retrofitNeeded.setValue(cnt.ref_value);
        //  }
        //  if (cnt.name == 'intrconnection_Type__c') {
        //    this.interconnectionType.setValue(cnt.ref_value);
        //  }
        //  if (cnt.name == 'ENG_First_Review_By') {
        //    this.eNGFirstReviewBy.setValue(cnt.ref_value);
        //  }
        //  if (cnt.name == 'ENG_First_Review_Date') {
        //    cnt.value = (cnt.value == '' ? null : convertdatetime.transform(cnt.value, null));
        //    this.eNGFirstReviewDate.setValue(cnt.value);
        //  }
        //  if (cnt.name == 'ENG_Second_Review_By') {
        //    this.eNGSecondReviewBy.setValue(cnt.ref_value);
        //  }
        //  if (cnt.name == 'ENG_Second_Review_Date') {
        //    cnt.value = (cnt.value == '' ? null : convertdatetime.transform(cnt.value, null));
        //    this.eNGSecondReviewDate.setValue(cnt.value);
        //  }
        //});
        ////=============================================================
        setTimeout(() => { this.loadSave = false }, 5000);
      });
  }


  //makeFrontCondition(json) {
  //  if (json) {
  //    let obj = JSON.parse(json.visibility_condition_label) as [];
  //    let data: string[] = [];
  //    if (obj) {
  //      obj.forEach((item) => {
  //        let dat = item;

  //      });
  //    }
  //  }
    



  //}





  GetCustomFieldsListTopRow() {
    this.displayType = 'VIEW_TOP';
    this.loadSave = true;
    this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType)
      .pipe(takeUntil(this.subscriber))
      .subscribe(resp => {
      if (resp) {
        this.customCompnentValuesTop = resp.data;
        debugger
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

          if (cnt.ColumnName == 'WorkOrderNumber') {
            this.WorkOrderSubject = cnt.value;
          }
          // if (cnt.ColumnName == 'AccountId') {
          //   //;
          //   this.accountId = cnt.ref_value;
          //   this.accountName = cnt.value;

          // }

          if (cnt.dt_code == 'select') {
            if (cnt.value != '' && cnt.select_options != null) {
              cnt.select_options.forEach(itemList => {
                if (itemList.value == cnt.value) {
                  cnt.value = itemList.name;
                  //if (itemList.ColumnName == 'Status') {
                  //  this.statusids = itemList.ref_value;      
                  //}
                }
              });
            }
          }
        });
        
        
        //this.customCompnentValuesTop = this.customCompnentValuesTop.filter(x => x.ColumnName != 'Subject');
          var resArr = [];
          this.customCompnentValuesTop.filter(function(item)
          {
            var i = resArr.findIndex(x => (x.name == item.name));
            if(i <= -1)
            {
                  resArr.push(item);
            }
            return null;
          });
          
        this.customCompnentValuesTop = resArr;
      }
    },
      err => {
        setTimeout(() => { this.loadSave = false }, 3000);
      },
      () => {
        setTimeout(() => { this.loadSave = false }, 3000);
      });
  }


  //GetServiceAppointmentList() {
  //  this.workOrderService.GetServiceAppointmentList(this.Id, this.sortColumn, this.sortDir, this.ServiceAppointmentPageNo, this.pageSize).subscribe(result => {
  //    if (result) {
  //      this.lstServiceAppointments = result;
  //      this.ServiceAppointmentCount = result.pager.totalItems;
  //    }
  //  },
  //    err => { this.loadSave = false },
  //    () => { this.loadSave = false });
  //}

  GetProductRequiredList() {
    this.workOrderService.GetProductRequiredList(this.Id, this.sortColumn, this.sortDir, this.ProductRequiredPageNo, this.pageSize).subscribe(result => {
      if (result) {
        this.lstProductsRequired = result;
        this.ProductsRequiredCounts = result.pager.totalItems;
      }
    },
      err => { this.loadSave = false },
      () => { this.loadSave = false });
  }

  //GetOpportunityList() {
  //  this.workOrderService.GetOpportunityList(this.Id, this.sortColumn, this.sortDir, this.OpportunityPageNo, this.pageSize).subscribe(result => {
  //    if (result) {
  //      this.lstOpportunity = result;
  //      this.OpportunityCount = result.pager.totalItems;
  //    }
  //  },
  //    err => { this.loadSave = false },
  //    () => { this.loadSave = false });
  //}

  //GetProposalList() {
  //  this.workOrderService.GetOpportunityList(this.Id, this.sortColumn, this.sortDir, this.OpportunityPageNo, this.pageSize).subscribe(result => {
  //    if (result) {
  //      this.lstOpportunity = result;
  //      this.OpportunityCount = result.pager.totalItems;
  //    }
  //  },
  //    err => { this.loadSave = false },
  //    () => { this.loadSave = false });
  //}

  //onServiceAppointmentSort($event) {
  //  const sort = $event.sorts[0]
  //  this.sortDir = sort.dir;
  //  this.sortColumn = $event.column.prop;
  //  this.GetServiceAppointmentList();
  //}
  onProductRequiredSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    this.GetProductRequiredList();
  }
  setProductRequiredPageNo($event) {
    this.ProductRequiredPageNo = $event.page;
    this.GetProductRequiredList();
  }
  //setServiceAppointmentPageNo($event) {
  //  this.ServiceAppointmentPageNo = $event.page;
  //  this.GetServiceAppointmentList();
  //}

  //onOpportunitySort($event) {
  //  const sort = $event.sorts[0]
  //  this.sortDir = sort.dir;
  //  this.sortColumn = $event.column.prop;
  //  this.GetOpportunityList();
  //}
  //setOpportunityPageNo($event) {
  //  this.OpportunityPageNo = $event.page;
  //  this.GetOpportunityList();
  //}


 

  addFixOrderForm = this.fb.group({
    fixOrderID: [null],
    departmentId: [null, Validators.required],
    departmentSubCategoryId: [null, Validators.nullValidator],
    fixOrderDescription: [null]
  });

  get fixOrderID() { return this.addFixOrderForm.get('fixOrderID'); }
  get departmentId() { return this.addFixOrderForm.get('departmentId'); }
  get departmentSubCategoryId() { return this.addFixOrderForm.get('departmentSubCategoryId'); }
  get fixOrderDescription() { return this.addFixOrderForm.get('fixOrderDescription'); }

  getFixOrderData(workOrderid: any) {
    this.workOrderService.getFixOrderData(workOrderid).subscribe((result: any) => {
      if (result.data.length > 0) {
        var deptId = this.lstdepartment.filter(x => x.text == 'Install')
        if (result.data[0].departmentId == deptId[0].value) {
          this.showSubCategoryDropDown = true;
          this.GetlstdepartmentSubCategory();
        }
        this.addFixOrderForm.patchValue({
          fixOrderID: result.data[0].id,
          departmentId: result.data[0].departmentId.toString(),
          departmentSubCategoryId: result.data[0].DeptSubCategoryId == null ? null : (result.data[0].DeptSubCategoryId.toString()),
          fixOrderDescription: result.data[0].departmentDescription,
        });
      }
 
    },
      (error: any) => {
      })
    this.addFixOrderForm.reset();
    this.fixOrderPopupModel.show();
  }

  Fix_Order() {
    this.title = "Fix Order";
    this.getFixOrderData(this.Id);
  }
  closeFixOrderPopupModelPopup() {
    this.addFixOrderForm.reset();
    this.showSubCategoryDropDown = false;
    this.fixOrderPopupModel.hide();
  }
  SaveFixOrder() {
    if (this.addFixOrderForm.valid) {
      this.loadSave = true;
      this.fixOrdermodel.object_id = this.addFixOrderForm.value.fixOrderID;
      this.fixOrdermodel.departmentId = this.addFixOrderForm.value.departmentId;
      this.fixOrdermodel.departmentSubCategoryId = this.addFixOrderForm.value.departmentSubCategoryId;
      this.fixOrdermodel.fixOrderDescription = this.addFixOrderForm.value.fixOrderDescription;
      this.fixOrdermodel.object_name = "WorkOrder";
      this.fixOrdermodel.object_ref_id = this.Id;
      this.workOrderService.fixOrder(this.fixOrdermodel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.addFixOrderForm.reset();
          this.loadSave = false;
          this.toaster.success(result.responseMessage);
          this.fixOrderPopupModel.hide();
          this.ngOnInit();
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      });
    }
    else {
      this.commonService.validateAllFormFields(this.addFixOrderForm);
    }
  }

  //WorkOrderLineItem
  GetWorkOrderLineItemList() {
    this.workOrderService.GetWorkOrderLineItemList(this.Id, this.sortColumnlineitem, this.sortDir, this.LineItemPageno, this.pageSizeValueLineitem).subscribe(result => {

      this.LineItempagedData = result;
      this.lineItemCount = this.LineItempagedData.pager.totalItems;
      this.offset = this.LineItemPageno;
    },
      err => { this.loadSave = false },
      () => { this.loadSave = false });
  }
  setPageLineItem($event) {
    this.LineItemPageno = $event.page;
    this.GetWorkOrderLineItemList();
    this.LineItemPageno = $event.page
  }
  onSortLineItems($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumnlineitem = sort.prop;
    this.LineItemPageno = 1;
    this.loadSave = true;
    this.GetWorkOrderLineItemList();
  }

  ViewNotes(row: any) {
    this.isViewNote = true;
    this.notesTitle = row.note_name;
    this.notesDescription = row.note_description;

    this.addNotesPopupModel.show(this.Id);
  }

  //-------------------workorder status update start here-------------
  updateStatusForm = this.fb.group({
    statusId: [null, Validators.required],
  });

  get statusId() { return this.updateStatusForm.get('statusId'); }

  //onUpdateStatusClick() {
  //  this.loaderStatus = true;
  //  this.title = "Start Work Order";

  //  this.commonService.getMasterItemsByCustomFieldId(this.customFieldId).subscribe(resp => {
  //    if (resp) {
  //      this.lstStatus = JSON.parse(resp);     
  //      let selectedValue = null;
  //      //if (this.lstStatus.filter(x => x.text == this.status)) {
  //      //  selectedValue = this.lstStatus.filter(x => x.text == this.status)[0].value;
  //      //}
  //      //else
  //        if (this.lstStatus.filter(x => x.text == 'New')) {
  //        selectedValue = this.lstStatus.filter(x => x.text == 'New')[0].value;
  //      }
  //      else {
  //        selectedValue = null;
  //      }
  //      this.statusId.setValue(selectedValue);
  //    }
  //  }, err => {
  //    this.loaderStatus = false;
  //  }, () => {
  //    this.UpdateStatusModal.show();
  //    this.loaderStatus = false;

  //  });
  //}


  onUpdateStatusClick() {
    let model: StartWorkOrderModel = new StartWorkOrderModel;
    model.workOrderId = this.Id;
    model.displayType = this.displayType;
    if (this.isCompleteWork == true) {
      model.statusId = this.statusids;
    } else {
      model.statusId = this.statusids;
    }
    

    model.moduleName = this.moduleName;
    model.submoduleName = this.submoduleName;
    this.workOrderService.updateStatusOrCreateLog(model).subscribe(result => {
      if (result.statusCode == 200) {
        this.loadSave = false;
        this.ngOnInit();
        this.toaster.success(result.responseMessage);

      }
      else {
        this.loadSave = false;
        this.toaster.error(result.responseMessage);
      }

    }, error => {
      this.loaderStatus = false;
    }, () => {
      this.loaderStatus = false;
      // this.closeUpdateStatusModal();
      this.GetCustomFieldsList();
      this.GetCustomFieldsListTopRow();
    });

  }

  closeUpdateStatusModal() {
    this.UpdateStatusModal.hide();
  }

  //onSaveStatusClick() {
  //  this.loaderStatus = true;

  //  let model: StartWorkOrderModel = new StartWorkOrderModel;
  //  model.workOrderId = this.Id;
  //  model.statusId = this.statusId.value as string;

  //  this.workOrderService.updateStatusOrCreateLog(model).subscribe(result => {
  //    if (result.statusCode == 200) {
  //      this.loadSave = false;
  //      this.toaster.success(result.responseMessage);
  //    }
  //    else {
  //      this.loadSave = false;
  //      this.toaster.error(result.responseMessage);
  //    }

  //  }, error => {
  //      this.loaderStatus = false;
  //  }, () => {
  //      this.loaderStatus = false;
  //      this.closeUpdateStatusModal();
  //      this.GetCustomFieldsList();
  //      this.GetCustomFieldsListTopRow();
  //  });

  //}

  //-------------------workorder status update end here-------------


  GetWorkOrderHistoryList() {
    this.workOrderService.GetWorkOrderHistoryList(this.Id, this.sortColumn, this.sortDir, this.WorkOrderHistoryPageNo, this.pageSize).subscribe(result => {
      if (result) {
        this.lstWorkOrderHistory = result;
        this.WorkOrderHistoryCount = result.pager.totalItems;
      }
    },
      err => { this.loadSave = false },
      () => { this.loadSave = false });
  }

  onWorkOrderHistorySort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    this.GetWorkOrderHistoryList();
  }
  setWorkOrderHistoryPageNo($event) {
    this.WorkOrderHistoryPageNo = $event.page;
    this.GetWorkOrderHistoryList();
  }


  OnBackToListClick() {
   // this.router.navigateByUrl('/');

//    this.previousUrl = this.location.back();
    if (this.previousSAUrl) {
      this.router.navigate([this.previousSAUrl], { queryParams: { sAs: this.sAppoiNo, url: this.previousSAUrl, wTId: this.wTId, from: this.from, to: this.to, StatusIdChk: this.StatusIdChk, AttchmentId: this.AttchmentId } });
    }
    else {
      this.previousUrl = this.location.back();
    }
  }

  AddProductRequiredPopup(row) {
    if (row == undefined) {
      row = null;
    }
    if (row != null) {
      this.EditProductREquired(row);
    }
    else {
      this.addForm.reset();
      this.ProductRequiredTitle = "New Product Required";
      this.getProductList();
      this.GetQuantityUnitOfMeasure();
      //alert(this.productRequiredWorkOrderNumber);

      this.addForm.get('ParentRecord').disable();
      this.ParentRecord.setValue(this.productRequiredWorkOrderNumber);
      //this.addForm.patchValue({
      //  ParentRecord: this.productRequiredWorkOrderNumber
      //});
      this.ProductRequiredpopup.show();
    }

  }

  closeProductRequiredModal() {
    this.ProductRequiredpopup.hide();

  }
  EditProductREquired(row) {
    this.ProductRequiredTitle = "New Product Required";
    this.getProductList();
    let productRequired = this.lstProductRequired.filter(x => x.text == row.data.ProductName)
    // console.log("this.productRequired", productRequired);
    this.GetQuantityUnitOfMeasure();
    this.addForm.get('ParentRecord').disable();
    this.ParentRecord.setValue(this.productRequiredWorkOrderNumber);
    let EDate = (row.data.Date_Delivered == null ? null : new Date(row.data.Date_Delivered + 'Z'));
    this.addForm.patchValue({
      ParentRecord: this.productRequiredWorkOrderNumber == null ? null : this.productRequiredWorkOrderNumber,
      ProductRequired: productRequired[0].value == null ? null : productRequired[0].value.toString(),
      QuantityRequired: row.data.QuantityRequired,
      DateDelivered: EDate,
      QuantityUnitOfMeasure: row.data.QuantityUnitOfMeasure,
      ProductRequiredId: row.Id
    });
    this.ProductRequiredpopup.show();
  }
  private initForm() {
    this.addForm = this.fb.group({
      ParentRecord: [null],
      ProductRequired: [null, Validators.required],
      DateDelivered: [null, Validators.nullValidator],
      QuantityRequired: [null, Validators.nullValidator],
      QuantityUnitOfMeasure: [null, Validators.nullValidator],
      ProductRequiredId: [null, Validators.nullValidator],
    })
  }

  get ParentRecord() { return this.addForm.get('ParentRecord'); }
  get ProductRequiredId() { return this.addForm.get('ProductRequiredId'); }
  get ProductRequired() { return this.addForm.get('ProductRequired'); }
  get QuantityRequired() { return this.addForm.get('QuantityRequired'); }
  get DateDelivered() { return this.addForm.get('DateDelivered'); }
  get QuantityUnitOfMeasure() { return this.addForm.get('QuantityUnitOfMeasure'); }
  getProductList() {
    this.commonService.getMasterItemsList('NestReposrt_ProductName').subscribe((result: any) => {
      this.lstProductRequired = this.commonService.masters;
    })
  }

  GetQuantityUnitOfMeasure() {
    let lstQuantityUnitOfMeasure = [{ text: "Each", value: "Each" }, { text: "None", value: "None" }];
    this.lstQuantityUnitOfMeasure = lstQuantityUnitOfMeasure;
  };

  deleteProductREquired(row) {
    const message = `Are you sure you want to delete Product Required  "${row.data.ProductName}"?`;
    this.dialogService.confirm('Delete Product Required', message).subscribe(confirmed => {
      if (confirmed) {
        //;
        this.loadSave = true;
        this.workOrderService.DeleteRecords(row.data.Id, 'tblProductRequired').subscribe(r => {
          this.toaster.success(`Product Required "${row.data.ProductName}" has been deleted successfully`);
          this.getRelatedObjects();
          this.loadSave = false;
          //this.GetProductRequiredList();
        }, error => {
        });
      }
    });
  }
  onProductRequiredClick() {
    this.loadSave = true;
    if (this.addForm.valid) {
      this.appmodel.ParentRecord = this.addForm.value.ParentRecord;
      this.appmodel.ProductRequired = this.addForm.value.ProductRequired;
      this.appmodel.QuantityRequired = this.addForm.value.QuantityRequired;
      this.appmodel.DateDelivered = this.addForm.value.DateDelivered;
      this.appmodel.QuantityUnitOfMeasure = this.addForm.value.QuantityUnitOfMeasure;
      this.appmodel.WorkOrderId = this.Id;
      this.appmodel.Id = this.addForm.value.ProductRequiredId
      this.workOrderService.addeditProductRequired(this.appmodel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          //this.router.navigate(["/calendar"]);
          this.addForm.reset();
          this.ProductRequiredpopup.hide();
          //this.GetProductRequiredList();
          this.getRelatedObjects();
        }
        else {
          setTimeout(() => {
            this.loadSave = false;
          }, 2000);

          this.toaster.error(result.responseMessage);

        }
      }, error => {
        this.loadSave = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.addForm);
    }
  };

  //==================================== Audit Popup Section ======================================

  auditpopup() {
    this.workOrderId = this.Id
    this.loadSave = true;
    this.accountId = '';
    this.getAuditReviewData(this.workOrderId, this.accountId);
    this.auditModel.show();
    this.loadSave = false;
  }
  closeAudit() {
    this.auditModel.hide();
  }
  auditSwitchClicked(event, checkList_Id: number, serviceAppointmentId: number) {
    //this.serviceappointmentlistService.auditChecklistCheckBox(checkList_Id, serviceAppointmentId, event.srcElement.checked).subscribe(s => {
    //  this.refresh(serviceAppointmentId);
    //}, err => {
    //  this.loadSave = false;
    //});

  }
  ActualauditCheckListData: { Main: any, Child: any[] }[] = [];
  getAuditReviewData(workOrderId: any, accountId: any) {
    this.CheckListGroup = [];
    this.workOrderService.getAuditReviewData(workOrderId, accountId).subscribe(result => {
      this.auditData = result;

      this.auditData.forEach(t => {
        let groupCheck = this.CheckListGroup.filter(y => y.WorkOrderNumber == t.WorkOrderNumber);

        if (groupCheck == null || groupCheck.length == 0) {
          let obj = {
            WorkOrderNumber: t.WorkOrderNumber,
            AppointmentNumber: t.AppointmentNumber,
            WorkTypeName: t.WorkTypeName,
            InnerData: this.auditData.filter(x => x.WorkOrderNumber == t.WorkOrderNumber)
          }
          this.CheckListGroup.push(obj);
        }
      });

      this.ActualauditCheckListData = [];
      setTimeout(() => {
        this.loadSave = false;
      }, 500);
    }, err => {
      this.loadSave = false;
    });
    this.IsAuditCheckListDisplay = false;
  }


  //----------------------------------   Audit Check likst ----------------------------------------

  auditChecklistDetail(checkList_Id: number, serviceAppointmentId: number, disable: boolean) {
    this.isDisabled = true;
    this.closeAudit();
    this.serviceAppointmentId = serviceAppointmentId;
    this.IsAuditCheckListDisplay = false;
    this.auditChecklistDetailList(checkList_Id, serviceAppointmentId, disable);
  }
  auditChecklistDetailList(checkList_Id: number, serviceAppointmentId: number, disable: boolean) {
    this.isModalShow = true;     
    this.isDisabled = disable;
    this.auditCheckListData = [];      
    this.ActualauditCheckListData = [];

    this.workOrderId = this.Id
    this.auditCheckListModel.show();

    this.workOrderService.auditChecklistDetail(checkList_Id, serviceAppointmentId).subscribe(resp => {
      if (resp) {
        this.auditCheckListData = resp as [];
        this.auditTitle = this.auditCheckListData[0].CHECK_LIST_NAME;
        this.checkListType = this.auditCheckListData[0].CHECKLIST_TYPE;
        this.SectionGroup = this.auditCheckListData[0].Section;
        this.SectionGroupTop = this.auditCheckListData[0].Section;
        this.refreshTop(this.SectionGroup);
        this.loadSave = false;
      }
    }
      , err => {
        this.loadSave = false;
      });
  }
  refreshTop(data) {
    this.SectionGroupTop = [];
    this.SectionGroupTop = data;
  }
  closeAuditCheckList() {
    this.auditCheckListModel.hide();
    this.auditModel.show();
    // this.buttonState.emit({ serviceAppointmentsId: this.serviceAppointmentId, disable: this.isDisabled });
    //  setTimeout(() => { this.isModalShow = false; }, 1000);

  }
  ClickForScroll(event: any) {
    this.isScroll = true;
    let data = 'section_' + event;
    let el = document.getElementById(data);
    el.scrollIntoView({ behavior: 'smooth' });
  }
  ClickForScrollTop() {
    let el1 = document.getElementById('l-of-sections_ScrollingId');
    el1.scrollIntoView({ behavior: 'smooth' });
    el1.scrollTop;
    this.isScroll = false;

  }
  onSubmitAuditCheckList() {
  }

  open(imageList: any[], index: number): void {
    // open lightbox
    var ImageObject = [];
    var currIndexImage = imageList[index];
    var index = 0;
    let tempindex = 0;
    imageList.forEach(x => {
      if (typeof x.FileUrl != "undefined" && x.FileUrl != null && x.FileUrl != "") {
        var obj = {
          src: x.FileUrl,
          caption: x.ANSWER,
          thumb: x.FileUrl
        }
        if (currIndexImage.FileUrl == x.FileUrl) { 
          index = tempindex;
        }
        ImageObject.push(obj);
        tempindex++;
      }
    });

    this._lightbox.open(ImageObject, index);
  }

  getNoteslistCardView() {
    this.NotificationListData.length = 0;
    this.loadSave = true;
    this.workOrderService.getNoteslistCardView(this.Id, this.submoduleName, this.submoduleName, this.sortColumn, this.sortDir, this.currentPageNotes, this.pageSizeValuenotes, '').subscribe(response => {
      this.NotespagedDataCardView = this.workOrderService.pagedDataNewCardView.data;

      //this.NotespagedDataCardView = this.NotespagedDataCardView.filter(s => {
      //  return s.IsReadNote==false;
      //});NotificationListData

      this.NotespagedDataCardView.forEach(x => {
        if (x.IsReadNote == false) {
          var obj = {
            title: x.note_name,
            noteId: x.note_id,
            description: x.note_description,
            senderName: x.Sender,
            CreatedOn: x.created_on,
            Status: x.Status,
          }
          this.NotificationListData.push(obj);
        }
      });
      //for (let item of this.NotespagedDataCardView.data) {
      //  if (item.IsReadNote==true) {
      //    this.cardTitle = item.note_name;     //this.NotespagedDataCardView.data[0].note_name;
      //    this.cardNoteId = item.note_id;      //this.NotespagedDataCardView.data[0].note_id;
      //    this.cardAssignedTo = item.AssignTo;  //this.NotespagedDataCardView.data[0].AssignTo;
      //    this.cardResource = item.AssignToType;   //this.NotespagedDataCardView.data[0].AssignToType;
      //    this.cardNotify = item.notifyUserNames;    //this.NotespagedDataCardView.data[0].notifyUserNames;
      //    this.cardDesc = item.note_description;      //this.NotespagedDataCardView.data[0].note_description;
      //    this.cardStatus = item.Status;
      //    this.loadSave = false;//this.NotespagedDataCardView.data[0].Status;
      //    break;
      //  }
      //}




      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
    this.loadSave = false;
  }

  redirectToSource(id) {
    this.workOrderService.setNotesToRead(id).subscribe(m => {

      this.getNoteslistCardView();

    });
  }
  displayDetailNotification(item) {
    this.dataNoti = item;
    this.modalnote.show();
  }
  closeNote(noteId) {
    if (noteId != null && noteId != 0) {
      this.workOrderService.setNotesToRead(noteId).subscribe(m => {
        this.getNoteslistCardView();

      });
    }
    this.modalnote.hide();
  }
  //-----------------------------------------------------------------------------------------------
  //===============================================================================================


  //================================ Engineering Questions ================================================
  AddEngineeringQuestionPopup() {
    //this.addEditEngineeringForm.reset();

    //=======Enable Engineering Questions Fields========

    this.addEditEngineeringForm.enable();
    //this.eNGFirstReviewBy.disable();
    //this.eNGSecondReviewBy.disable();
    this.onSaveEngQuesBtn = true;
    //====================================================

    this.GetlstTrenching();
  }

  GetEngineeringQuestionData() {
    this.workOrderService.GetEngineeringQuestionData(this.Id).subscribe(result => {
      if (result) {
        this.lstEngineeringQuestion = result;

        this.addEditEngineeringForm.patchValue({
          numberOfArrays: result.Number_of_Arrays__c,
          roofTilt: result.Roof_Tilt__c,
          roofMaterial: result.Roof_Material__c,
          midClamps: result.Mid_Clamps,
          endClamps: result.End_Clamps,
          groundingLugs: result.Grounding_Lugs,
          tBolts: result.T_Bolts,
          endCovers: result.EndCovers,
          splice: result.Splice,
          flashings: result.Flashings,
          rail: result.Rail,
          railWeight: result.RailWeight,
          moduleWeight: result.ModuleWeight,
          pSF: result.PSF,
          totalWeight: result.TotalWeight,
        });

      }
    },
      err => { this.loadSave = false },
      () => { this.loadSave = false });
  }

  GetWorkOrderProposal() {
    this.workOrderService.GetWorkOrderProposal(this.Id).subscribe(result => {
      if (result) {
        this.lstProposal = new WorkOrderProposal();
        if (result) {
          this.lstProposal.Id = result.Id;
          this.lstProposal.System_Size = result.System_Size;
          this.lstProposal.Panels = result.Panels;
          this.lstProposal.Offset = result.Offset;
          this.lstProposal.Energy_Percentage = result.Energy_Percentage;
          this.lstProposal.Desgin_Link = result.Desgin_Link;
          this.lstProposal.Desgin_Notes = result.Desgin_Notes;
        }
      }
    },
      err => { this.loadSave = false },
      () => { this.loadSave = false });
  }

  getSumarryData() {
    this.loadSave = true;
    this.workOrderService.GetWorkOrderSumaryData(this.Id).subscribe(result => {
      if (result != null) {
          result.forEach((t, index) => {
            let obj = {
              PrimaryAccountHolder: t.PrimaryAccountHolder,
              AccountAddress: t.AccountAddress,
              Email: t.Email,
              Phone: t.Phone,
              SaleDate: t.saleDate,
              NewConstruction: t.NewConstruction,
              InstallerNam: t.installerNam,
              InstallerEmailAddress: t.InstallerEmailAddress,
              InstallerPhoneNumber: t.InstallerPhoneNumber,
              UtilityCompany: t.UtilityCompany,
              ExistingAmperage: t.ExistingAmperage,
              UtilityAccountNumber: t.UtilityAccountNumber,
              UtilityMeterNumber: t.UtilityMeterNumber,
              HowmanyMeters: t.HowmanyMeters,
              UtilityLinks: t.UtilityLinks,
              EstimatedTotalSystemCost: t.EstimatedTotalSystemCost,
              EstimatedServiceDate: t.EstimatedServiceDate,
              TotalLaborCost: t.TotalLaborCost,
              InvProductName: t.InvProductName,
              Quantity: t.Quantity,
              ManufacturerName: t.ManufacturerName,
              productCode: t.productCode,
              CertifyingUtility: t.CertifyingUtility,
              Cut_Sheet: t.Cut_Sheet,
              inverterName: t.inverterName,
              InverterRatingEa: t.InverterRatingEa,
              InverterOutputWatts: t.InverterOutputWatts,
              panelName: t.panelName,
              panelNumberQuantity: t.panelNumberQuantity,
              panelOutPutrating: t.panelOutPutrating,
              TotalWatt: t.TotalWatt,
              PanelManufacturer: t.PanelManufacturer,
              PanelCode: t.PanelCode,
              RackingName: t.RackingName,
              RackingManufacturer: t.RackingManufacturer,
              RackingCode: t.RackingCode,
              systemsize: t.systemsize,
              Battery: t.Battery,
              Generator: t.Generator,
              TypeofMeterInstallation: t.TypeofMeterInstallation,
              ACVoltage: t.ACVoltage,
              ProposedGeneratorInterconnection: t.ProposedGeneratorInterconnection,
              Connection: t.Connection,
              MethodofGeneration: t.MethodofGeneration,
              InverterId: t.InverterId,
              PanelId: t.PanelId,
              RackingId: t.RackingId,
              RequirementData: t.RequirementData
            }
            this.SumarryData.push(obj);
          })
        
      }
    },
      err => { this.loadSave = false },
      () => { this.loadSave = false });
  }
  private initEngineeringForm() {
    this.addEditEngineeringForm = this.fb.group({
      mpuNeeded: [null, Validators.nullValidator],
      trenchingNeeded: [null, Validators.nullValidator],
      retrofitNeeded: [null, Validators.nullValidator],
      interconnectionType: [null, Validators.nullValidator],
      numberOfArrays: [null, Validators.nullValidator],
      roofMaterial: [null, Validators.nullValidator],
      roofTilt: [null, Validators.nullValidator],
      midClamps: [null, Validators.nullValidator],
      endClamps: [null, Validators.nullValidator],
      groundingLugs: [null, Validators.nullValidator],
      tBolts: [null, Validators.nullValidator],
      endCovers: [null, Validators.nullValidator],
      splice: [null, Validators.nullValidator],
      flashings: [null, Validators.nullValidator],
      rail: [null, Validators.nullValidator],
      railWeight: [null, Validators.nullValidator],
      moduleWeight: [null, Validators.nullValidator],
      pSF: [null, Validators.nullValidator],
      totalWeight: [null, Validators.nullValidator],
      eNGFirstReviewBy: [null, Validators.nullValidator],
      eNGFirstReviewDate: [null, Validators.nullValidator],
      eNGSecondReviewBy: [null, Validators.nullValidator],
      eNGSecondReviewDate: [null, Validators.nullValidator]
    });
  }
  private initWorkOrderProposalForm() {
    this.workOrderProposalForm = this.fb.group({
      Id: [null, Validators.nullValidator],
      System_Size: [null, Validators.nullValidator],
      Panels: [null, Validators.nullValidator],
      Offset: [null, Validators.nullValidator],
      Energy_Percentage: [null, Validators.nullValidator],
      Desgin_Link: [null, Validators.nullValidator],
      Desgin_Notes: [null, Validators.nullValidator],
    });
  }

  get System_Size() { return this.workOrderProposalForm.get('System_Size'); }
  get Panels() { return this.workOrderProposalForm.get('Panels'); }
  get Offset() { return this.workOrderProposalForm.get('Offset'); }
  get Energy_Percentage() { return this.workOrderProposalForm.get('Energy_Percentage'); }
  get Desgin_Link() { return this.workOrderProposalForm.get('Desgin_Link'); }
  get Desgin_Notes() { return this.workOrderProposalForm.get('Desgin_Notes'); }


  get mpuNeeded() { return this.addEditEngineeringForm.get('mpuNeeded'); }
  get trenchingNeeded() { return this.addEditEngineeringForm.get('trenchingNeeded'); }
  get retrofitNeeded() { return this.addEditEngineeringForm.get('retrofitNeeded'); }
  get interconnectionType() { return this.addEditEngineeringForm.get('interconnectionType'); }
  get numberOfArrays() { return this.addEditEngineeringForm.get('numberOfArrays'); }
  get roofMaterial() { return this.addEditEngineeringForm.get('roofMaterial'); }
  get roofTilt() { return this.addEditEngineeringForm.get('roofTilt'); }
  get midClamps() { return this.addEditEngineeringForm.get('midClamps'); }
  get endClamps() { return this.addEditEngineeringForm.get('endClamps'); }
  get groundingLugs() { return this.addEditEngineeringForm.get('groundingLugs'); }
  get tBolts() { return this.addEditEngineeringForm.get('tBolts'); }
  get endCovers() { return this.addEditEngineeringForm.get('endCovers'); }
  get splice() { return this.addEditEngineeringForm.get('splice'); }
  get flashings() { return this.addEditEngineeringForm.get('flashings'); }
  get rail() { return this.addEditEngineeringForm.get('rail'); }
  get railWeight() { return this.addEditEngineeringForm.get('railWeight'); }
  get moduleWeight() { return this.addEditEngineeringForm.get('moduleWeight'); }
  get pSF() { return this.addEditEngineeringForm.get('pSF'); }
  get totalWeight() { return this.addEditEngineeringForm.get('totalWeight'); }
  get eNGFirstReviewBy() { return this.addEditEngineeringForm.get('eNGFirstReviewBy'); }
  get eNGFirstReviewDate() { return this.addEditEngineeringForm.get('eNGFirstReviewDate'); }
  get eNGSecondReviewBy() { return this.addEditEngineeringForm.get('eNGSecondReviewBy'); }
  get eNGSecondReviewDate() { return this.addEditEngineeringForm.get('eNGSecondReviewDate'); }

  GetlstMPU() {
    this.commonService.getMasterItemsList("MPU").subscribe((result: any) => {
      this.lstMPU = this.commonService.masters;
    })
  }
  GetlstTrenching() {
    this.commonService.getMasterItemsList("Trenching").subscribe((result: any) => {
      this.lstTrenching = this.commonService.masters;
    })
  }
  GetlstRetrofitNeeded() {
    this.commonService.getMasterItemsList("RetrofitNeeded").subscribe((result: any) => {
      this.lstRetrofit = this.commonService.masters;
    })
  }
  GetlstInterconnection() {
    this.commonService.getMasterItemsList("Interconnection").subscribe((result: any) => {
      this.lstInterconnection = this.commonService.masters;
    })
  }

  GetlstroofMaterial() {
    this.commonService.getMasterItemsList("RoofMaterial").subscribe((result: any) => {
      this.lstroofMaterial = this.commonService.masters;
    })
  }

  GetUsers() {
    this.commonService.getMasterItemsList("UserList").subscribe((result: any) => {
      this.lstUsers = this.commonService.masters;
    })
  }

  onSaveEngQues() {
    this.loadSave = true;
    if (this.addEditEngineeringForm.valid) {
      this.addeditEngQuesModel.workOrderId = this.Id;
      this.addeditEngQuesModel.mpuNeeded = this.addEditEngineeringForm.value.mpuNeeded;
      this.addeditEngQuesModel.TrenchingNeeded = this.addEditEngineeringForm.value.trenchingNeeded;
      this.addeditEngQuesModel.RetrofitNeeded = this.addEditEngineeringForm.value.retrofitNeeded;
      this.addeditEngQuesModel.InterconnectionType = this.addEditEngineeringForm.value.interconnectionType;
      this.addeditEngQuesModel.NumberOfArrays = this.addEditEngineeringForm.value.numberOfArrays;
      this.addeditEngQuesModel.RoofMaterial = this.addEditEngineeringForm.value.roofMaterial;
      this.addeditEngQuesModel.RoofTilt = this.addEditEngineeringForm.value.roofTilt;
      this.addeditEngQuesModel.MidClamps = this.addEditEngineeringForm.value.midClamps;
      this.addeditEngQuesModel.EndClamps = this.addEditEngineeringForm.value.endClamps;
      this.addeditEngQuesModel.GroundingLugs = this.addEditEngineeringForm.value.groundingLugs;
      this.addeditEngQuesModel.TBolts = this.addEditEngineeringForm.value.tBolts;
      this.addeditEngQuesModel.EndCovers = this.addEditEngineeringForm.value.endCovers;
      this.addeditEngQuesModel.Splice = this.addEditEngineeringForm.value.splice;
      this.addeditEngQuesModel.Flashings = this.addEditEngineeringForm.value.flashings;
      this.addeditEngQuesModel.Rail = this.addEditEngineeringForm.value.rail;
      this.addeditEngQuesModel.RailWeight = this.addEditEngineeringForm.value.railWeight;
      this.addeditEngQuesModel.ModuleWeight = this.addEditEngineeringForm.value.moduleWeight;
      this.addeditEngQuesModel.PSF = this.addEditEngineeringForm.value.pSF;
      this.addeditEngQuesModel.TotalWeight = this.addEditEngineeringForm.value.totalWeight;
      this.addeditEngQuesModel.ENGFirstReviewBy = this.addEditEngineeringForm.value.eNGFirstReviewBy;
      this.addeditEngQuesModel.ENGFirstReviewDate = this.addEditEngineeringForm.value.eNGFirstReviewDate;
      this.addeditEngQuesModel.ENGSecondReviewBy = this.addEditEngineeringForm.value.eNGSecondReviewBy;
      this.addeditEngQuesModel.ENGSecondReviewDate = this.addEditEngineeringForm.value.eNGSecondReviewDate;
        //this.appmodel.DateDelivered = this.addForm.value.DateDelivered;
        //this.appmodel.QuantityUnitOfMeasure = this.addForm.value.QuantityUnitOfMeasure;
        //this.appmodel.WorkOrderId = this.Id;
        //this.appmodel.Id = this.addForm.value.ProductRequiredId
      this.workOrderService.addeditEngineeringQuestionData(this.addeditEngQuesModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
            this.toaster.success(result.responseMessage);
            //this.router.navigate(["/calendar"]);
            this.addEditEngineeringForm.disable();
            this.onSaveEngQuesBtn = false;
           // this.GetProductRequiredList();
            this.ngOnInit();
            this.loadSave = false;
          }
          else {
            //this.loadSave = false;
            this.toaster.error(result.responseMessage);
            this.loadSave = false;
          }
        }, error => {
          this.loadSave = false;
        });
      }
      else {
        this.commonService.validateAllFormFields(this.addForm);
      }
  }

  //=======================================================================================================

  //=====Validation To Enter Only Two Decimal Values=========================
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 46) {
      this.dotCount += 1;
      this.checkNumberOnly = (event.target.value);
      var numericCheck = (event.target.value).toString();
      if (numericCheck.includes('.')) {
        this.dotCount += 1;
      }
      if (this.dotCount > 1) {
        this.dotCount = 0;
        return false;
      }
    }
    if (charCode > 31 && (charCode < 45 || charCode > 57 || charCode == 47)) {
      return false;
    }
    this.checkNumberOnly = (event.target.value);
    if (this.checkNumberOnly != null) {
      var numeric = (event.target.value).toString();
      if (numeric.includes('.')) {
        var checkNumeric = numeric.split('.');
        if (checkNumeric.length > 2) {
          return false;
        }
        this.checkString = checkNumeric[1].split('');
        if (this.checkString.length > 1) {
          // this.toastrService.warning("Invalid value", "Warning");
          return false;
        }
      }
    }
    this.dotCount = 0;
    return true;
  }
  onDepartmentSelected(event) {
    if (event) {
     // this.departmentId.setValue(null);
      this.departmentSubCategoryId.setValue(null);
      this.fixOrderDescription.setValue(null);
      var value = event.text;
      if (value == 'Install') {
        this.GetlstdepartmentSubCategory();
        this.showSubCategoryDropDown = true;
      }
      else {
        this.showSubCategoryDropDown = false;
      }
   
    }
    else {
      this.showSubCategoryDropDown = false;
    }
  }

  GetlstdepartmentSubCategory() {
    this.commonService.getMasterItemsList("departmentSubCategory").subscribe((result: any) => {
      this.lstdepartmentSubCategory = this.commonService.masters;
    })
  }
  //=========================================================================

  RefreshRelatedObjects($event) {
    if (this.relatedObjects) {
      if (this.relatedObjects[$event.index]) {
        this.relatedObjects[$event.index].data = null;
        this.relatedObjects[$event.index].data = JSON.stringify($event.obj);
      }
    }
  }

  RefreshEvent() {
    this.getRelatedObjects();
    this.GetCustomFieldsList();
    this.GetCustomFieldsListTopRow();
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
  };

///////////////////////////////////////////Projected Requirement//////////////////////////
  getListingGridData() {
    //;
    this.offset = 1;
    this.loadSave = true;
    if(this.accountId>0)
    {
      this.workOrderService.GetRequirementListingData(this.accountId,this.listFilterreq, this.sortColumnreq, this.sortDirreq, this.curPagereq, this.pageSizeValuereq).subscribe(result => {
        this.requirementListingData = result;
        this.RequirementCount = this.requirementListingData.pager.totalItems;
        this.offset = this.RequirementPageno;
        this.offset = 1;    
        this.loadSave = false;
      }, error => {
        this.loadSave = false;
      })
    }
    
  }

  setPagereq($event) {
    //;
    this.RequirementPageno = $event.page;
    this.loadSave = true;
    var ab = $event.page;
    this.curPagereq = ab;
    this.getListingGridData();
    this.RequirementPageno = $event.page;
  }

  onSortreq($event) {
    const sort = $event.sorts[0]
    this.sortDirreq = sort.dir;
    this.sortColumnreq = sort.prop;
    this.getListingGridData();
  }

  openAddNewRequirementPopup() {    
    // this.accountId = cnt.ref_value;
    // this.accountName = cnt.value;
    this.addeditprojectrequirements.show('', this.accountId, this.accountName);
  }

  closeProjectRequirements() {
    this.newRequirementModelPopup.hide();
    
  }

  callRequirementListingData() {
    //;
    this.loadSave = true;
    this.getListingGridData();
    this.loadSave = false;
  }

  editRequirement(row: any) {
    // console.log("row", row);
    this.title = "Edit Skill";
    this.isEdit = true;
    this.addeditprojectrequirements.show(row, this.accountId, this.accountName);
  }

  DeleteRequirement(row: any) {
    //;
    const message = `Are you sure you want to delete Requirement  "${row.Name}"?`;
    this.dialogService.confirm('Delete Requirement', message).subscribe(confirmed => {
      if (confirmed) {
        //;
        this.workOrderService.DeleteRecords(row.id, 'tblAccountRequirement').subscribe(r => {
          this.toaster.success(`Requirement "${row.Name}" has been deleted successfully`);
          this.getListingGridData(); 
        }, error => {
        });
      }
    });
  }


 

  


//////////////////////////////////////////////End Projected Requirement///////////////////

////////////////////////////////////////////Add Work Order Line///////////////////////////////////////
  AddLineItem()
  {
    //
    const workOrderId=this.Id;
    this.lineItemWorkOrderPopup.Show(workOrderId);
  }
  editLineItem(id:any)
  {
    //
    const workOrderId=this.Id;
    this.lineItemWorkOrderPopup.editWithRedirect(id,workOrderId);
  }
  DeleteLineItem(row: any) {
    //;
    const message = `Are you sure you want to delete Line Item  "${row.Subject}"?`;
    this.dialogService.confirm('DELETE LINE ITEM', message).subscribe(confirmed => {
      if (confirmed) {
        //;
        this.workOrderService.DeleteRecords(row.Id, 'tblWorkOrderLineItem').subscribe(r => {
          this.toaster.success(`Line Item "${row.Subject}" has been deleted successfully`);
          this.GetWorkOrderLineItemList(); 
        }, error => {
        });
      }
    });
  }
}

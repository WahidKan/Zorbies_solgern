import { Component, OnInit, ViewChild, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { OpportunityListService, Utility_Proposal_Design_Information_DataModel, RequestDesign } from '../opportunity/opportunitylist.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DashboardService } from '../dashboard/dashboard.service';
import { EmailTemplateService } from '../emailtemplate/emailtemplate.service';
import { ConfigurationsettingService } from '../configurationsetting/configurationsetting.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { MakeappointmentComponent } from '../calendar/makeappointment/makeappointment.component';
import { ProposallistService, JsonData, CheckboxData, MappingTempalte } from './proposallist.service';
import { ProposallineitempopupComponent } from './productlineitempopup/proposallineitempopup.component';
import { Location } from '@angular/common';
//import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { NewnoteslistComponent } from '../shared/new-notes/newnoteslist.component';
import { borderTopRightRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';
import { SendEmailTestComponent } from './send-email-test/send-email-test.component';
import { Console } from 'console';
import { any } from 'underscore';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fieldsJson } from '../managecustomlayout/managecustomlayout.service';
import { AppointmentsComponent } from '../shared/appointments/appointments.component';
import { DateTimeToLocalForAddEditPipe } from 'dynamiccustom-list';
import { ThrowStmt } from '@angular/compiler';
//import { OnDestroy } from '@angular/core';


@Component({
  selector: 'app-viewProposalNew',
  templateUrl: './viewProposalNew.component.html',
  styles: ['.hide { display:none !important; }']
})
export class ViewProposalNewComponent implements OnInit, OnDestroy {
  @ViewChild('edit_Utility_Proposal_Design_InformationPopup', { static: false }) edit_Utility_Proposal_Design_InformationPopupModel: ModalDirective;
  @ViewChild('listnotesmodel', { static: false }) addNewNotesPopupModel: NewnoteslistComponent;
  @ViewChild('listnotesmodel1', { static: false }) addNotesPopupModel1: NewnoteslistComponent;
  @ViewChild('makeappointment', { static: false }) makeappointment: MakeappointmentComponent;
  @ViewChild('proposalpopup', { static: false }) proposalpopup: ProposallineitempopupComponent;
  @ViewChild('requestdesign', { static: false }) requestdesignModal: ModalDirective;
  @ViewChild('previewModal', { static: false }) previewModal: ModalDirective;
  @ViewChild('previewModalGenerate', { static: false }) previewModalGenerate: ModalDirective;
  @ViewChild('addEditModal', { static: false }) AddEditSendEmaildocTyoe: SendEmailTestComponent
  @ViewChild('ProposalPreviewDeliveryOptions', { static: false }) ProposalPreviewDeliveryOptions: ModalDirective;
  @ViewChild("myckeditor", { static: false }) ckeditor: any;
  @ViewChild('appointmentlist', { static: false }) appointmentlist: AppointmentsComponent;

  loading: boolean = false
  Id: any;
  is_converted: boolean = false;// @Input() offset: number;
  moduleName = 'crm';
  submoduleName = 'proposal';
  companyId: any;
  customCompnentValues: any;
  customCompnentValuesTop: any;
  formControlList: any[] = [];
  TemplateList: any[];
  executionFlow: any[] = [];
  form: FormGroup;
  loadSave = false;
  ProposalDocumentCount: any = 0;
  displayType = 'VIEW';
  LeadFirstName = '';
  LeadLastName = '';
  submoduleid: any = 10;
  OpportunityPageNo: number = 1;
  OpportunityCount: any = 0;
  searchText = '';
  objectname: any = 'Lead';
  sortDir = 'desc';
  sortDirOppr = 'desc';
  sortColumnOppr: any = 'id';
  selected = [];
  loanAvail = 'NO';
  selectedGenerate = [];
  sortColumn = 'createdon';
  sortProposalLineitemColumn = 'TotalPrice';
  lstPageSizeContact: any;
  currentPageNotes: number;
  pageSizeValuenotes: number = 4;
  countLineItems: any = 0;
  listFilter: any = '';
  documentGenerated = false;
  pageSizeValueContact: number;
  isViewPreviewModalGenerate = false;
  TemplateListNew: any[];
  isViewPreviewModal = false;
  selectedmappedid: any;
  signerExist: boolean = false
  htmlString = "";
  totalNetPrice:any=0;

  DumyDateForTest = [
    { Id: 4, Name: 'test', fileInfo: null, ProposalMappingId: 12 },
    { Id: 5, Name: 'test 1', fileInfo: '[{"FileName":"ACH%20Form_1629729135769.pdf","FileUrl":"https:\/\/stagemedia.solgenone.com\/resources\/uploads\/DocumentMaker\/ACH Form_1629729135769.pdf"},{"FileName":"Proposal%20_%20WA_1629727699622.pdf","FileUrl":"https:\/\/stagemedia.solgenone.com\/resources\/uploads\/DocumentMaker\/Proposal _ WA_1629727699622.pdf"}]', ProposalMappingId: null },

  ];

  isEdit = false;
  LeadSMSCount: number = 0;
  pageSizeValue = 10;
  PageSizeRelatedTab: any;
  pageNo: any = 0;
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
  lstLineItems: any = {
    pager: {},
    data: []
  }
  lstLineItemsForEdit: any = {
    pager: {},
    data: []
  }
  AccountsCount: number = 0;
  lstAccounts: any = {
    pager: {},
    data: []
  };
  lstOpportunity: any = {
    pager: {},
    data: []
  }
  ProposalDocumentlist: any = {
    pager: {},
    data: []
  }
  AccountPageNo: number = 1;
  title: any;
  NotesCount: number = 0;
  filePageNo: number = 1; pageSize: number = 4;
  lineItemPage: number = 0;
  solgenpower: boolean = false;
  countFiles: any = 0;
  companyType: any;
  contactpagedData: any = {
    pager: {},
    data: []
  };
  proposalId: any;
  MappedId: any;
  opportunityId: any;
  lstListingColorCode: any;
  datalength: number;
  lstFilesdatalength: number;
  siteurl: string = '';
  accountName: string;
  utilityCompany: string;
  accountId: string;
  UtilityCompanyId: string;
  utilityAccountNumber: string;
  utilityMeterNumber: string;
  estimatedAnnualKwhUsage: string;
  lastUtilityBillURL: string;
  homeSqFt: string;
  taxRate: string;
  fTCNotEligible: string;
  utilityBillingAddress: string;
  fullUtilityBill: string;
  noUtilityAccountOrMeterNumber: string;
  opportunityIdvw: any;
  row: any;
  requestDesign: RequestDesign = new RequestDesign();
  edit_Utility_Proposal_Design_InformationForm: FormGroup;
  edit_Utility_Proposal_Design_InformationForm1: FormGroup;
  MappingTempalte: MappingTempalte = new MappingTempalte();
  Utility_Proposal_Design_Information_DataModel: Utility_Proposal_Design_Information_DataModel = new Utility_Proposal_Design_Information_DataModel();
  utilityCompanyList: any;
  ddlStateList: any[] = [];
  ddlCountryList: any[] = [];
  len: any = 10;
  isViewNote = false;
  docuemnetMappingList: any[] = [];
  GenerateMappingList: any[] = [];

  refreshTriggerSubscription: any;
  SelectionType = SelectionType;
  contentHeader: object;
  constructor(private dialogService: ConfirmationDialogService,
    private proposalService: ProposallistService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private opprtunityservice: OpportunityListService,

    private location: Location) {//
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {

      this.companyType = userdetail.companyType;
      if (this.companyType == "companytypeSolarInstall") {
        this.solgenpower = true;
      }
    });
  }
  makeAppointment() {
    this.makeappointment.showComponent('Proposal', this.proposalId);
  }


  ngOnDestroy(): void {
    this.refreshTriggerSubscription.unsubscribe();
  }
  checkboxdata1: Array<CheckboxData> = [];
  checkboxdataTop: Array<CheckboxData> = [];

  ngOnInit() {
    this.loadSave = true;
    this.initForm();
    this.refreshTriggerSubscription = this.proposalService.getStageChangeEvent().subscribe(res => {
      this.GetProposalLineItemList();
    })
    this.siteurl = window.location.origin;
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.Id = id;
        this.proposalId = id;
      })
    this.getOperatorList();
    this.GetCustomFieldsList();
    this.currentPageNotes = 0;
    this.pageSizeValueContact = 0;
    this.currentPageLeadSMS = 1;
    this.pageSizeValueLeadSMSList = 4;
    this.pageSizeValueContact = 10;
    this.GetProposalLineItemList();
    this.GetOpportunityList();
    this.GetProposalDocument();
    //this.makeAppointment();

    this.initBreadCrumb();
  }

  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Manage Proposal',
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
            name: 'Manage Proposal',
            isLink: true,
            link: '/proposal-list'
          },
          {
            name: 'Proposal Details',
            isLink: false
          }

        ]
    };
  }

  addItem(newItem: boolean) {

    if (newItem) {
      this.GetCustomFieldsList();
    }
  }
  onMappingChange(event, item) {

  }


  close() {
    this.router.navigateByUrl("/proposal-list");
  }


  showpopupSendTest() {
    // this.AddEditSendEmaildocTyoe.showpopup(deliveryitem.Id);
  }
  appointmentRefresh() {
    this.appointmentlist.refresh();

  }

  GetCustomFieldsList() {
    this.loadSave = true;
    this.formControlList = [];
    this.displayType = 'VIEW';
    this.proposalService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, '', this.displayType).subscribe((result: any) => {
      if (result) {
        this.additionalGroups = result.additionalGroups as [];
        this.customCompnentValues = this.proposalService.customFieldsList.data;
        // this.executionFlow=this.proposalService.customFieldsList.executionFlow;
        this.customCompnentValues.forEach(t => {
          //debugger
          if (t.ColumnName == "OpportunityId") {
            this.opportunityIdvw = t.ref_value
          }
          if (t.ColumnName == 'Name') {
            this.LeadFirstName = t.value;
          }
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
        const convertdatetime = new DateTimeToLocalForAddEditPipe();
        const group: any = {};
        this.customCompnentValues.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          } else {
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
          if (cnt.dt_code == 'datetime' && cnt.name != 'LastModifiedDate') {
            val = (cnt.value == '' ? null : convertdatetime.transform(cnt.value, null)); // to convert to local time
          }
          else if (cnt.dt_code == 'date') {
            val = (cnt.value == '' ? null : convertdatetime.transform(cnt.value, 'Date')); // to convert to local time
          }

          if (cnt.ColumnName == 'CreatedDate') 
          {
            cnt.display_name = "Created On"
          }

          else if (cnt.ColumnName == 'LastModifiedById') 
          {
            cnt.display_name = "Modified By"
          }

          else if (cnt.ColumnName == 'LastModifiedDate') 
          {
            cnt.display_name = "Modified On"
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
          //debugger;
          for (var i = 0; i < this.formControlList.length; i++) {
            if (this.formControlList[i].group_name == 'Loan Product') {
              for (var j = 0; j < this.formControlList[i].InnerData.length; j++) {
                if (this.formControlList[i].InnerData[j].name == 'Loan_ProductId') {
                  let val = cnt.value;
                  if (!val && val <= 0) {
                    this.formControlList.splice(i, 1);
                  }
                }
              }
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
        this.getRelatedObjects();
        this.GetCustomFieldsListTopRow();
        // this.refreshAccountsList();
        // this.initForm();
        /////////////////////////////////Flowwww////////////////////////////
        let flowList = this.proposalService.customFieldsList.executionFlow;
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
        setTimeout(() => {
          this.loadSave = false;
        }, 1000);
      }
    }, error => {
      // console.log(error);
      this.loadSave = false;
    });
  }

  ExecuteAutomationFlow(AutomationId) {
    // console.log(AutomationId);
    window.open(`/automation-flow-execution/execution/${AutomationId}/${this.Id}`, "_blank");
    // let url = `/automation-flow-execution/execution/${AutomationId}/${this.Id}`
    // this.router.navigateByUrl(url);
  }
  GetCustomFieldsListTopRow() {
    this.displayType = 'VIEW_TOP';
    this.proposalService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, '', this.displayType).subscribe((result: any) => {
      if (result) {
        this.customCompnentValuesTop = this.proposalService.customFieldsList.data;
        
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
          if (cnt.name == 'Name') {
            this.LeadFirstName = cnt.value;
          }
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


  openProposalLineItemPopup(row, isMultiEdit) {

    if (isMultiEdit == true) {
      if (this.countLineItems < 1)
        if (this.lineItemPage <= 0) {
          this.lineItemPage = this.lineItemPage + 1;
        }
      this.proposalService.GetProposalLineItemList(this.proposalId, this.opportunityId, this.submoduleid, this.objectname, this.listFilter, this.sortProposalLineitemColumn, this.sortDir, this.lineItemPage, 1000, '').subscribe(response => {
        debugger;
        this.lstLineItemsForEdit = this.proposalService.pagedData;
        this.proposalpopup.show(this.proposalId, this.opportunityId, this.lstLineItemsForEdit.data, isMultiEdit);
      }, error => {

      });
    }
    else {
      this.proposalpopup.show(this.proposalId, this.opportunityId, row, isMultiEdit);
    }



  }

  GetProposalLineItemList() {
    //const sort = $event.sorts[0]
    //this.sortDir = sort.dir;
    //this.sortColumn = sort.prop;
    // this.loadSave = true;
    if (this.lineItemPage <= 0) {
      this.lineItemPage = this.lineItemPage + 1;
    }
    this.proposalService.GetProposalLineItemList(this.proposalId, this.opportunityId, this.submoduleid, this.objectname, this.listFilter, this.sortProposalLineitemColumn, this.sortDir, this.lineItemPage, this.pageSize, '').subscribe(response => {
      this.lstLineItems = this.proposalService.pagedData;
      this.totalNetPrice=0
      if (this.lstLineItems.data.length > 0) {
        let d = this.proposalService.pagedData;
        this.countLineItems = this.proposalService.pagedData.pager.totalItems;
        //this.NotespagedData = this.leadservice.pagedData;
        //this.NotesCount = this.leadservice.pagedData.pager.totalItems;
        this.datalength = this.lstLineItems.data.length;
        
        //this.offset = this.currentPageNotes;
      } else {
        this.countLineItems = 0;
      }
      
      this.lstLineItems.data.forEach(element => {
        debugger;
        this.totalNetPrice=Number(this.totalNetPrice)+Number(element.NetPrice);
      });
      // this.loadSave = false;
    }, error => {
      // this.loadSave = false;
    });
  }

  deleteProposallineitem(id) {
    const message = `Are you sure you want to delete proposal line item?`;
    this.dialogService.confirm('Delete proposal line item', message).subscribe(confirmed => {
      if (confirmed) {
        this.proposalService.DeleteRecords(id, 'tblQuoteLineItem').subscribe((res: any) => {
          this.toaster.success(`Proposal line item has been deleted successfully..`);
          this.lineItemPage = 1;
          this.GetProposalLineItemList();
        });
      }
    });
  }
  onLineItemSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortProposalLineitemColumn = sort.prop;

    //const sort = $event.sorts[0]
    //this.sortDir = sort.dir;
    //this.sortColumn = $event.column.name;
    this.GetProposalLineItemList();
  }
  setLineItemsPageNo($event) {
    this.lineItemPage = $event.page;
    this.GetProposalLineItemList();
  }

  OnBackToListClick() {
    this.location.back();
  }

  //====================================================== Accounts ================================================================
  refreshAccountsList() {
    this.opprtunityservice.GetOpprtunityAccountsList(this.opportunityIdvw, this.sortColumn, this.sortDir, this.AccountPageNo, this.pageSize).subscribe(resp => {
      this.lstAccounts = resp;
      this.AccountsCount = resp.pager.totalItems;
      if (this.AccountsCount > 0) {
        this.accountName = this.lstAccounts.data[0].Name;
        this.utilityCompany = this.lstAccounts.data[0].Utility_Company;
        this.accountId = this.lstAccounts.data[0].Id;
        this.UtilityCompanyId = this.lstAccounts.data[0].UtilityCompanyId;
        this.utilityAccountNumber = this.lstAccounts.data[0].Utility_Account_Number;
        this.utilityMeterNumber = this.lstAccounts.data[0].Utility_Meter_Number;
        this.estimatedAnnualKwhUsage = this.lstAccounts.data[0].Estimated_Annual_Kwh_Usage;
        this.lastUtilityBillURL = this.lstAccounts.data[0].Last_Utility_Bill_URL;
        this.homeSqFt = this.lstAccounts.data[0].Home_Sq_Ft;
        this.taxRate = this.lstAccounts.data[0].Tax_Rate;
        this.fTCNotEligible = this.lstAccounts.data[0].FTC_Not_Eligible;
        this.utilityBillingAddress = this.lstAccounts.data[0].BillingAddress;
        this.fullUtilityBill = this.lstAccounts.data[0].Full_Utility_Bill;
        this.noUtilityAccountOrMeterNumber = this.lstAccounts.data[0].No_Utility_Account_or_Meter_Number;
      }
    });
  }

  private initForm() {

    this.edit_Utility_Proposal_Design_InformationForm = this.fb.group({
      'Utility_Proposal_Id': [null],
      'Utility_Company': [null, null],
      'Utility_Account_Number': [null, null],
      'Utility_Meter_Number': [null, null],
      'Annual_kwh_Usage': [null, null],
      'Last_Utility_bill_URL': [null, null],
      'Home_Sqft': [null, null],
      'Sales_Tax_Rate': [null, null],
      'FTC_Not_Eligible': [null, null],
      'Billing_City': [null, null],
      'Billing_Street': [null, null],
      'Billing_State': [null, null],
      'Billing_Country': [null, null],
      'Billing_Postal_Code': [null, null],
      'Full_Utility_Bill': [null, null],
      'No_Utility_Account_or_Meter_Number': [null, null]
    });
  }
  onScrollToEndUtilityCompany(dataList: any) {
    this.fetchMoreUtilityCompany(dataList);
  }

  private fetchMoreUtilityCompany(dataList: any) {
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.len = dataList.length;
    this.opprtunityservice.GetUtilityCompanyDll('', this.len, this.searchText).subscribe((data: any) => {
      this.utilityCompanyList = this.utilityCompanyList.concat(data);
    })
  }

  onKeyUtilityCompany(e: any, dataList: any) {
    this.len = 0
    this.searchText = e.target.value;
    this.opprtunityservice.GetUtilityCompanyDll('', this.len, this.searchText).subscribe((data: any) => {
      this.utilityCompanyList = data;
    })
  }

  onClearLangUtilityCompany(dataList: any): void {
    this.len = 0
    this.searchText = '';
    this.opprtunityservice.GetUtilityCompanyDll('', this.len, this.searchText).subscribe((data: any) => {
      this.utilityCompanyList = data;
    });
  }

  get Utility_Proposal_Id() { return this.edit_Utility_Proposal_Design_InformationForm.get('Utility_Proposal_Id'); }
  get Utility_Company() { return this.edit_Utility_Proposal_Design_InformationForm.get('Utility_Company'); }
  get Utility_Account_Number() { return this.edit_Utility_Proposal_Design_InformationForm.get('Utility_Account_Number'); }
  get Utility_Meter_Number() { return this.edit_Utility_Proposal_Design_InformationForm.get('Utility_Meter_Number'); }
  get Annual_kwh_Usage() { return this.edit_Utility_Proposal_Design_InformationForm.get('Annual_kwh_Usage'); }
  get Last_Utility_bill_URL() { return this.edit_Utility_Proposal_Design_InformationForm.get('Last_Utility_bill_URL'); }
  get Home_Sqft() { return this.edit_Utility_Proposal_Design_InformationForm.get('Home_Sqft'); }
  get Sales_Tax_Rate() { return this.edit_Utility_Proposal_Design_InformationForm.get('Sales_Tax_Rate'); }
  get FTC_Not_Eligible() { return this.edit_Utility_Proposal_Design_InformationForm.get('FTC_Not_Eligible'); }
  get Billing_City() { return this.edit_Utility_Proposal_Design_InformationForm.get('Billing_City'); }
  get Billing_Street() { return this.edit_Utility_Proposal_Design_InformationForm.get('Billing_Street'); }
  get Billing_State() { return this.edit_Utility_Proposal_Design_InformationForm.get('Billing_State'); }
  get Billing_Country() { return this.edit_Utility_Proposal_Design_InformationForm.get('Billing_Country'); }
  get Billing_Postal_Code() { return this.edit_Utility_Proposal_Design_InformationForm.get('Billing_Postal_Code'); }
  get Full_Utility_Bill() { return this.edit_Utility_Proposal_Design_InformationForm.get('Full_Utility_Bill'); }
  get No_Utility_Account_or_Meter_Number() { return this.edit_Utility_Proposal_Design_InformationForm.get('No_Utility_Account_or_Meter_Number'); }
  GetUtilityCompanyDll(id: any = 0) {
    this.opprtunityservice.GetUtilityCompanyDll(id, '0', this.searchText).subscribe((data: any) => {
      this.utilityCompanyList = data;
    })
  }
  GetDDLState() {
    this.commonService.GetDDLListByFieldCode('State', 'crm', 'opportunity').then(resp => {
      if (resp) {
        this.ddlStateList = JSON.parse(resp.toString());
      }
    }).catch(err => { });
  }
  GetDDLCountry() {
    this.commonService.GetDDLListByFieldCode('Country', 'crm', 'opportunity').then(resp => {
      if (resp) {
        this.ddlCountryList = JSON.parse(resp.toString());
      }
    }).catch(err => { });
  }
  Edit_Utility_Account() {
    this.row = this.lstAccounts.data[0];
    this.loadSave = true;

    this.title = "Edit Utility & Proposal Design Information";

    let utilityCompanyId = (this.row.UtilityCompanyId == null) ? '' : this.row.UtilityCompanyId.toString();
    this.GetUtilityCompanyDll(utilityCompanyId);
    this.GetDDLState();
    this.GetDDLCountry();


    this.Utility_Proposal_Id.setValue(this.row.Id);
    this.Utility_Company.setValue((utilityCompanyId != "") ? utilityCompanyId : null);
    this.Utility_Account_Number.setValue(this.row.Utility_Account_Number);
    this.Utility_Meter_Number.setValue(this.row.Utility_Meter_Number);
    this.Annual_kwh_Usage.setValue(this.row.Estimated_Annual_Kwh_Usage);
    this.Last_Utility_bill_URL.setValue(this.row.Last_Utility_Bill_URL);
    this.Home_Sqft.setValue(this.row.Home_Sq_Ft);
    this.Sales_Tax_Rate.setValue(this.row.Tax_Rate);
    this.FTC_Not_Eligible.setValue(this.row.FTC_Not_Eligible);
    this.Billing_City.setValue(this.row.BillingCity);
    this.Billing_Street.setValue(this.row.BillingStreet);
    this.Billing_State.setValue(this.row.BillingState);
    this.Billing_Country.setValue(this.row.BillingCountry);
    this.Billing_Postal_Code.setValue(this.row.BillingPostalCode);
    this.Full_Utility_Bill.setValue(this.row.Full_Utility_Bill);
    this.No_Utility_Account_or_Meter_Number.setValue(this.row.No_Utility_Account_or_Meter_Number);

    setTimeout(() => {
      this.edit_Utility_Proposal_Design_InformationPopupModel.show();
      this.loadSave = false;
    }, 1000);

    //this.edit_Utility_Proposal_Design_InformationForm.patchValue({
    //  Utility_Proposal_Id: row.Id,

    //  Utility_Company: row.UtilityCompanyId == null?null: row.UtilityCompanyId.toString(),
    //  Utility_Account_Number: row.Utility_Account_Number,
    //  Utility_Meter_Number: row.Utility_Meter_Number,
    //  No_Utility_Account_or_Meter_Number: row.No_Utility_Account_or_Meter_Number,
    //});


  }


  SaveUtility_Proposal_Design_Information() {
    this.loadSave = true;
    this.Utility_Proposal_Design_Information_DataModel.Utility_Proposal_Id = this.Utility_Proposal_Id.value;
    this.Utility_Proposal_Design_Information_DataModel.utility_Company = this.Utility_Company.value;
    this.Utility_Proposal_Design_Information_DataModel.utility_Account_Number = this.Utility_Account_Number.value;
    this.Utility_Proposal_Design_Information_DataModel.utility_Meter_Number = this.Utility_Meter_Number.value;
    this.Utility_Proposal_Design_Information_DataModel.Annual_kwh_Usage = this.Annual_kwh_Usage.value;
    this.Utility_Proposal_Design_Information_DataModel.Last_Utility_bill_URL = this.Last_Utility_bill_URL.value;
    this.Utility_Proposal_Design_Information_DataModel.Home_Sqft = this.Home_Sqft.value;
    this.Utility_Proposal_Design_Information_DataModel.Sales_Tax_Rate = this.Sales_Tax_Rate.value;
    this.Utility_Proposal_Design_Information_DataModel.FTC_Not_Eligible = this.FTC_Not_Eligible.value;
    this.Utility_Proposal_Design_Information_DataModel.Billing_City = this.Billing_City.value;
    this.Utility_Proposal_Design_Information_DataModel.Billing_Street = this.Billing_Street.value;
    this.Utility_Proposal_Design_Information_DataModel.Billing_State = this.Billing_State.value;
    this.Utility_Proposal_Design_Information_DataModel.Billing_Country = this.Billing_Country.value;
    this.Utility_Proposal_Design_Information_DataModel.Billing_PostalCode = this.Billing_Postal_Code.value;
    this.Utility_Proposal_Design_Information_DataModel.Full_Utility_Bill = this.Full_Utility_Bill.value;
    this.Utility_Proposal_Design_Information_DataModel.No_Utility_Account_or_Meter_Number = this.No_Utility_Account_or_Meter_Number.value;

    this.opprtunityservice.SaveUtility_Proposal_Design_Information(this.Utility_Proposal_Design_Information_DataModel).subscribe((result: any) => {

      if (result.statusCode == 200) {
        this.loadSave = false;
        this.toaster.success(result.responseMessage);
        this.edit_Utility_Proposal_Design_InformationForm.reset();
        // this.refresh();

        //this.currentPageAssignedRes = 1;
        this.refreshAccountsList();
        this.edit_Utility_Proposal_Design_InformationPopupModel.hide();
      }
      else {
        this.loadSave = false;
        this.toaster.error(result.responseMessage);
        //this.currentPageAssignedRes = 1;
        this.refreshAccountsList();
      }

    }, error => {
      this.loadSave = false;
    });
  }

  closeUtility_Proposal_Design_InformationPopup() {
    this.edit_Utility_Proposal_Design_InformationPopupModel.hide();
  }


  //================================================================================================================================
  //================================================================================================================================

  GetOpportunityList() {
    debugger
    this.proposalService.GetOpportunityList(this.Id, this.sortColumnOppr, this.sortDirOppr, this.OpportunityPageNo, this.pageSize).subscribe(result => {
      if (result) {
        this.lstOpportunity = result;
        this.OpportunityCount = result.pager.totalItems;
      }
    },
      error => {
        // console.log(error)
      });
  }

  onOpportunitySort($event) {
    const sort = $event.sorts[0]
    this.sortDirOppr = sort.dir;
    this.sortColumnOppr = $event.column.prop;
    this.GetOpportunityList();
  }
  setOpportunityPageNo($event) {
    this.OpportunityPageNo = $event.page;
    this.GetOpportunityList();
  }
  //===============================================================================================================================

  //======================================================================Proposal Document start=========================================================

  GetProposalDocument() {

    this.proposalService.GetProposalDocument(this.Id).subscribe(result => {

      if (result) {
        this.ProposalDocumentlist = result;
        this.ProposalDocumentCount = result.length;
      }
    },
      error => {
        // console.log(error)
      });
  }
  //======================================================================Proposal Document end=========================================================

  //===================================================Nots==========================================================================
  addItems(newItem: number) {
    this.NotesCount = newItem;
    this.addNotesPopupModel1.getNoteslist();
  }

  AddNotes() {
    this.isViewNote = false;
    this.title = "Add Notes";
    this.addNewNotesPopupModel.show(this.Id);
    //this.addNotesPopupModel.show();
  }

  //================================================================================================================================

  ViewProposal(id: any) {
    //this.proposalId = id;
    this.proposalService.getDocumentMappingList(id).subscribe(response => {
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
  onSelect({ selected }) {
    this.selected = [];
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  closePreviewModal() {
    this.previewModal.hide();
    this.isViewPreviewModal = false;
    this.isViewPreviewModalGenerate = false;
  }
  downloadPDF() {
    
    this.loadSave = true;
    if (this.docuemnetMappingList.length > 0) {
      var ids = this.docuemnetMappingList.filter(x => x.DocumentType != "html").map(m => m.Id).join(",");//  this.docuemnetMappingList.map(m => m.Id && m.DocumentType!="html").join(",");

      var DocumentMappingDocIds = this.docuemnetMappingList.filter(x => x.DocumentType == "html").map(m => m.DocumentMappingDocId); //this.docuemnetMappingList.map(m => m.DocumentMappingDocId && m.DocumentType=="html");
      if (DocumentMappingDocIds.length > 0) {
        this.commonService.GetEcryptedId(this.proposalId).subscribe((result: any) => {
          if (result) {
            debugger;
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
        this.proposalService.getDocumentBytes(this.proposalId, ids,"proposal").subscribe(result => {

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


  sendDocumentsToSignNow() {
    this.loadSave = false;
    debugger;
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
      this.proposalService.SendDocumentSignNow(this.proposalId, ids, mappingtype, this.MappingTempalte.MappingTempalteId.Id, this.MappingTempalte.subject, this.MappingTempalte.body, onlyhtml,"proposal").subscribe(result => {
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

  //============================================================Start Proposal Preview Delivery Options====================================================================
  closeProposalPreviewDeliveryOptions() {
    this.isViewPreviewModal = false;
    this.isViewPreviewModalGenerate = false;
    this.ProposalPreviewDeliveryOptions.hide();
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


  getTempalteList() {

    this.loadSave = true;
    this.proposalService.GetTempalteList(this.proposalId).subscribe((data: any) => {
      this.loadSave = false;
      this.TemplateList = data;
      this.FillDeliveryoptionDate();
    }, err => {
      this.loadSave = false;
    })

  }

  onTemChange(event) {

    if (event) {
      this.MappingTempalte.body = event.body;
    }
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


  //============================================================End Proposal Preview Delivery Options====================================================================


  //============================================================Generate====================================================================
  ViewProposalGenrate(id: any) {
    debugger
    this.MappedId = this.proposalId;
    this.proposalService.getGeneratedMappingList(this.MappedId, this.submoduleName).subscribe(response => {

      this.GenerateMappingList = response;
      this.documentGenerated = this.GenerateMappingList.filter(x => x.ProposalMappingId > 0) ? true : false;
      this.isViewPreviewModalGenerate = true;

      //documentGenerated
      this.previewModalGenerate.show();
    },
      error => {
        this.toaster.error(error.statusText);
      })
  }
  onSelectGenerate({ selected }) {

    this.selectedGenerate = [];
    this.selectedGenerate.splice(0, this.selectedGenerate.length);
    this.selectedGenerate.push(...selected);
  }
  GoBack() {
    this.previewModal.hide();

    this.isViewPreviewModal = false;
    this.isViewPreviewModalGenerate = true;
    // this.ViewProposalGenrate(this.MappedId);
    this.previewModalGenerate.show();
  }
  closePreviewModalGenerate() {
    this.selectedGenerate = [];
    this.isViewPreviewModalGenerate = false;
    this.isViewPreviewModal = false;
    this.previewModalGenerate.hide();
  }


  VoidDocument(row) {
    this.loadSave = true;
    this.proposalService.VoidDocument(row.Id.toString(), this.proposalId,"proposal").subscribe((response: any) => {

      this.loadSave = false;
      if (response.statusCode == 200) {

        this.GenerateMappingList = response.result;
        this.documentGenerated = this.GenerateMappingList.filter(x => x.ProposalMappingId > 0) ? true : false;

        this.toaster.success(`Document has been voided successfully`);
        // this.GenerateMappingList.find(m=>m.Id == row.Id).ProposalMappingId = 0;
        // this.previewModalGenerate.hide();
        // this.isViewPreviewModalGenerate = false;
      }
      else {
        this.toaster.error(response.responseMessage);
      }
    }, error => {

    });
  }

  getIsShowColName({ row, column, value }) {
    if (row.ProposalMappingId > 0) {
      return {
        'dispaly-none': true
      };
    }
  }
  GenerateDocument() {
    this.loadSave = true;
    var ids = this.selectedGenerate.filter(x => x.ProposalMappingId == 0).map(x => x.Id).join(',');
    if (ids != '' && ids != null) {
      this.proposalService.GenerateDocument(this.proposalId, ids, this.submoduleName).subscribe(result => {
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
            this.GenerateMappingList = result.result;
            this.toaster.success(result.responseMessage);
            if (result.documentErrorMessage) {
              this.toaster.error('Document mapping is not found for ' + result.documentErrorMessage);
            }
            if (result.routeErrorMessage) {
              this.toaster.error('Route/Rule is failed for ' + result.routeErrorMessage);
            }
            this.documentGenerated = this.GenerateMappingList.filter(x => x.ProposalMappingId > 0) ? true : false;
            this.previewModalGenerate.hide();
            this.selectedGenerate = [];
            this.ViewProposal(this.proposalId);
            this.GetProposalDocument();


          } else {
            this.isViewPreviewModalGenerate = true;
            // this.GenerateMappingList = result.result;
            this.documentGenerated = this.GenerateMappingList.filter(x => x.ProposalMappingId > 0) ? true : false;
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
      const MappingListItems = this.GenerateMappingList.filter(x => x.ProposalMappingId != 0);
      if (MappingListItems.length == 0) {
        this.loadSave = false;
        this.toaster.error("Please select atleast one document to generate.");
      }
      else {
        this.loadSave = false;
        this.previewModalGenerate.hide();
        this.isViewPreviewModalGenerate = false;
        this.isViewPreviewModal = true;
        this.ViewProposal(this.proposalId);
      }
    }
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
          debugger
          this.relatedObjects.forEach((item, index) => {
            if (item.visibility_condition_json) {
              item.visibility_condition_json = (item.visibility_condition_json) ? JSON.parse(item.visibility_condition_json) : null;
              item.IsVisible = this.GetVisibilityDecision(item.visibility_condition_json);
            }
          });
        } else {
          this.commonService.ShowError();
        }
      }, error => {
        this.commonService.ShowError();
      });
  }
  getOperatorList() {
    this.commonService.getOperatorsList('-1').toPromise()
      .then((res) => {
        this.operatorList = this.commonService.operator;
      })
      .catch((error) => { });
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
    }
  }

}










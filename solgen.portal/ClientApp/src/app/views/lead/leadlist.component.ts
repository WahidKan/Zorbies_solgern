import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CommonService, validationModel } from '../shared/common.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LeadlistService, leadConvertModel } from './leadlist.service';
import { ManageviewComponent } from '../shared/manageview/manageview.component';
import { SearchfilteraddComponent } from '../shared/searchfilter/searchfilteradd.component';
import { SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';
import { LeadService } from './lead.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Validators, FormBuilder } from '@angular/forms';
import { ConfigurationsettingService } from '../configurationsetting/configurationsetting.service';
import { LoanapplicationserviceService } from '../loanapplication/loanapplicationservice.service';
import { RuleEngineService } from '../rule-engine/rule-engine.service';
import { LeadconvertpopupComponent } from './leadconvertpopup.component';
import { DynamicListComponent } from 'dynamiccustom-list';
import { concat } from 'rxjs';




@Component({
  selector: 'app-leadlist',
  templateUrl: './leadlist.component.html',
  styleUrls: ['./leadlist.component.scss']
})
export class LeadlistComponent implements OnInit {
  @ViewChild('htsss', { static: false }) propertiesform: DynamicListComponent;
  actionarray: any[] = [];
  load: boolean = false;
  jsonDatapack: any;
  jsoncondition: any;
  validationModel: validationModel = new validationModel()
  @ViewChild('templateFilterView', { static: false }) FilterViewModal: SearchfilteraddComponent;
  @ViewChild('templateManageView', { static: false }) ManageViewModal: ManageviewComponent;
  @ViewChild('makeappointment', { static: false }) convertleadmodel: ModalDirective;
  @ViewChild('creditscore', { static: false }) creditscoremodel: ModalDirective;
  @ViewChild('loanApplicationModal', { static: false }) loanApplicationModal: ModalDirective;
  @ViewChild('product', { static: false }) productModal: ModalDirective;
  @ViewChild('table12', { static: false }) tableModal: DatatableComponent;

  @ViewChild('table34', { static: false }) tableModalcontact: DatatableComponent;
  @ViewChild('leadconvert', { static: false }) leadconvert: LeadconvertpopupComponent;
  activeWizard: number = 0;

  //@Input('moduleName') moduleName: any;
  //@Input('submoduleName') submoduleName: any;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  leadconvertModel: leadConvertModel = new leadConvertModel();
  @Input() offset: number;
  lstUserType: any;
  searchUserType = '';
  ViewModel: any = '';
  loginuserid: any;

  placeholder: string = 'Search by name'
  searchlabelName: string = 'Name'
  listLabelName: string = 'Leads'
  creditScoreData = [];
  leadDetails: any = {};
  mandatoryDocuments: string[] = [];
  loanApplicationNumber: string = "";
  incomeVerification: string = "";

  custom_view_id = '';
  searchFilter = '';
  pagenames: any;
  modulePermission: any[] = [];
  //modulePermission: ModuleList;
  sortDir = 'desc';
  moduleName = 'crm';
  submoduleName = 'lead';
  tableName = 'tblLeads';
  sortColumn = 'LeadId';
  SelectionType = SelectionType;
  companyId: any;
  vewId: any;
  productassociateid: string = "";
  pagedData: any = {
    pager: {},
    data: []
  };
  pagedDataLeadconvert: any = {
    pager: {},
    data: []
  };
  leaddata: any;
  AssociatedproductpagedData: any = {
    pager: {},
    data: []
  };
  lstColorCode: any;
  lstPageSizeAssociateProduct: any;
  listFilter = '';
  searchTxt = '';
  currentdisable: '1'
  lstPageSize: any;
  lstPageSizeLeadconvert: any;
  pageSizeValue: number;
  pageSizeValueAssociateProduct: number;
  pageSizeValueLeadconvert: number = 10;
  currentPage: any;
  listFiltertext = '';
  jsonData: any;
  columndata: any;
  columnheading: any;
  totalRecords: any;
  deleteId: any;
  selected = [];
  selectedassociateprouct: any = [];
  selectedleadconvert: any = [];
  selected12: any = [];
  is_filter: any;
  leadid: any;
  loanid: number = 0;
  Leadstatusid: any;
  lstaccounttype: any;
  lstsalutation: any;
  accountSearch: any;
  contactid: string = "";
  productid: string = "";
  isAccountExisting: boolean = true;
  isContactExisting: boolean = true;
  companyid: number;
  isloanapp: boolean = false;
  isopportuinity: boolean = false;
  formControlList: any[] = [];
  lstListingColorCode: any;
  loadSave: boolean = false;
  queryString = [];
  widgetType = '';
  recordFilter = '';
  teamID = '';
  datefrom: any
  dateto: any
  teamMemberID = '';
  currentPageAssoProdList: number;
  @Input() offsetAssociateProductList: number;
  sortDirAssoProdList = 'desc';
  sortColumnAssoProdList = 'CreatedOn';

  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  companyType: any;
  pageSizeValueAssoProdList: number;
  displayCheck;
  displayCheck12;
  myCheckbox: any = false;
  userinfodata: any;
  tilewidget: any[];
  tilewidgetSlider: any[];
  widgetGraphDataFullScreen: any;
  tilewidgetSliderInner: any[] = [...Array(4)].map(x => 0);
  tilewidgetSliderInnerDi: any[] = [];
  contentHeader: object;
  constructor(private leadlistService: LeadlistService,
    private configurationsettingService: ConfigurationsettingService,
    private dialogService: ConfirmationDialogService, private leadService: LeadService, private fb: FormBuilder,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute,
    private loanapplicationservice: LoanapplicationserviceService,
    private ruleEngineService: RuleEngineService, private toaster: ToastrService) {

  }

  ngOnInit() {

    this.lstUserType = this.getMasterItemsList_Generic("usertype");
    this.lstaccounttype = this.getMasterItemsList_Generic("accountType1");
    this.modulePermission = this.commonService.getPermissiondata(this.activeRoute.snapshot.data.moduleCode);

    this.isAdd = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'LEADADD');
    this.isUpdate = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'LEADUPDATE');
    this.isDelete = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'LEADUPDATE');

    var data = this.commonService.getLoggedInName.value;
    this.loginuserid = data.id;
    this.companyId = data.companyId;
    this.validationModel.companyType = this.companyType = data.companyType;


    this.loadSave =true;
    this.initBreadCrumb();
    // this.tilewidget = [
    //   { id: null, widgetName: 'All Queues', widgetCount: 56, endTime: null, type: 'Normal' },
    //   { id: null, widgetName: 'Arizona', widgetCount: 11, endTime: null, type: 'Normal' },
    //   { id: null, widgetName: 'Ohio', widgetCount: 20, endTime: null, type: 'Normal' },
    //   { id: null, widgetName: 'Illinois', widgetCount: 10, endTime: null, type: 'Normal' },
    //   { id: null, widgetName: 'Washington', widgetCount: 15, endTime: null, type: 'Normal' },
    // ];

    this.getconverttype();
    this.custom_view_id = '';
    this.pageSizeValue = 15;
    this.pageSizeValueLeadconvert = 10;
    this.LoadViewData();
    //this.LoadViewDataCount();
    this.currentPage = 1;
    this.getPageSizes();
    this.refresh();
    this.currentPageAssoProdList = 0;
    this.pageSizeValueAssoProdList = 10;
    this.actionarray = [
      { "name": "Convert Lead", "route": "null", "click": "goToPage(row)", "title": "Convert Lead", "iclass": "feather-repeat text-warning pr-2", "condition": "r.is_Converted != true && r.conditionstatus != 'Unqualified' && r.conditionstatus != 'None'" },
      { "name": "Edit", "click": "goToPage(row)", "route": "/lead/editlead/", "title": "Edit", "iclass": "feather-edit-2 text-success", "condition": "r.is_Converted != true && this.isUpdate" },
      { "name": "View", "click": "goToPage(row)", "route": "/lead/view/", "title": "View Detail", "iclass": "feather-eye text-info pr-2", "condition": "this.condition.companyType == 'companytypeSolarInstall'" },
      { "name": "View", "click": "goToPage(row)", "route": "/lead/view/", "title": "View Detail", "iclass": "feather-eye text-info pr-2", "condition": "this.condition.companyType == 'companytypeCRMLoanInstall'" },
      { "name": "View", "click": "goToPage(row)", "route": "/lead/viewlead/", "title": "View Detail", "iclass": "feather-eye text-info pr-2", "condition": "this.condition.companyType == 'companytypeFinancialInstitute'" },
      { "name": "Edit", "click": "goToPage(row)", "route": "null", "title": "Edit", "iclass": "feather-edit-2 text-secondary", "condition": "r.is_Converted == true && this.isUpdate" },
      { "name": "Delete", "click": "goToPage(row)", "title": "Delete", "iclass": "feather-trash-2 text-danger", "condition": "this.isDelete" }
    ]

    this.userinfodata = localStorage.getItem('userinfo');
    //// console.log('JsonDATAAAA', localStorage.getItem('moduleList'));
    this.creditScoreData.push({ bureauName: "", data: { creditScore: 0, creditScoreCategory: 'N/A', applicationStatus: '' } });

    this.getLeadConvertModuleWizard();

    var fromDate1 = this.commonService.getQueryStringValue("fromDate");
    var toDate1 = this.commonService.getQueryStringValue("toDate");
    // const datefrom=this.comm
    if (fromDate1 != null && fromDate1 != undefined && fromDate1 != "") {
      let a = parseInt(fromDate1)
      this.datefrom = this.commonService.formatUnixToDate(a)

    }
    if (toDate1 != null && toDate1 != undefined && toDate1 != "") {
      let b = parseInt(toDate1)
      this.dateto = this.commonService.formatUnixToDate(b)
    }


    this.widgetType = this.commonService.getQueryStringValue("widgetType");
    this.recordFilter = this.commonService.getQueryStringValue("recordFilter");
    this.teamID = this.commonService.getQueryStringValue("teamID");
    this.teamMemberID = this.commonService.getQueryStringValue("teamMemberID");
    this.Leadstatusid = this.commonService.getQueryStringValue("stage");
    //var fromDate = this.commonService.getQueryStringValue("fromDate");

    this.listFiltertext = null;
    if (this.Leadstatusid != null) {
      this.listFiltertext = "StatusName = '" + this.Leadstatusid + "'";
    }
    if (this.datefrom != null && this.datefrom != undefined && this.datefrom != "") {
      if (this.datefrom.length > 0) {
        if (this.listFiltertext != null) {
          this.listFiltertext = this.listFiltertext + " and CAST(CreatedAt AS DATE) >=  CAST('" + this.datefrom + "' AS DATE)  ";
        }
        else {
          this.listFiltertext = " CAST(CreatedAt AS DATE) >=  CAST('" + this.datefrom + "' AS DATE)  ";
        }
      }
    }
    if (this.dateto != null && this.dateto != undefined && this.dateto != "") {
      if (this.dateto.length > 0) {
        if (this.listFiltertext != null) {
          this.listFiltertext = this.listFiltertext + " and CAST(CreatedAt AS DATE) <=  CAST('" + this.dateto + "' AS DATE)  ";
        }
        else {
          this.listFiltertext = " CAST(CreatedAt AS DATE) <=  CAST('" + this.dateto + "' AS DATE)  ";
        }
      }
    }

    if (this.teamID == "null")
      this.teamID = null;

    if (this.teamMemberID == "null")
      this.teamMemberID = null;

    if (this.listFiltertext == "null")
      this.listFiltertext = null;




    //this.activeRoute.paramMap.subscribe(
    //  params => {
    //    const id = params.get('id');
    //   // this.Leadstatusid = id.toString();
    //    //if (id.length > 10) {
    //    //  this.queryString = id.split('&');
    //    //  const datefrom = this.queryString[0].split('=')[1];
    //    //  const dateto = this.queryString[1].split('=')[1];
    //    //  this.widgetType = this.queryString[2].split('=')[1];
    //    //  this.recordFilter = this.queryString[3].split('=')[1];
    //    //  this.teamID = this.queryString[4].split('=')[1];
    //    //  this.teamMemberID = this.queryString[5].split('=')[1];
    //    //  const StatusName = this.queryString[6].split('=')[1];

    //    //
    //    //  this.listFiltertext = null;
    //    //    if (StatusName.length > 0 )
    //    //    this.listFiltertext = "StatusName = " + StatusName + " ";

    //    //  if (datefrom.length >0 ) {
    //    //    if (this.listFiltertext != null)
    //    //      this.listFiltertext = this.listFiltertext + " and CAST(CreatedAt AS DATE) >=  'CAST(" + datefrom + " AS DATE) )' ";
    //    //    else {
    //    //      this.listFiltertext = " CAST(CreatedAt AS DATE) >=  'CAST(" + datefrom + " AS DATE) )' ";
    //    //    }
    //    //  }
    //    //  if (dateto.length > 0) {
    //    //    if (this.listFiltertext != null)
    //    //      this.listFiltertext = this.listFiltertext + " and CAST(CreatedAt AS DATE) >=  'CAST(" + dateto + " AS DATE) )' ";
    //    //    else {
    //    //      this.listFiltertext = " CAST(CreatedAt AS DATE) >=  'CAST(" + dateto + " AS DATE) )' ";
    //    //    }
    //    //  }

    //    //    if (this.teamID == "null")
    //    //        this.teamID = null;

    //    //    if (this.teamMemberID == "null")
    //    //        this.teamMemberID = null;

    //    //    if (this.listFiltertext == "null")
    //    //        this.listFiltertext = null;

    //    //  this.Leadstatusid = null;
    //    //}
    //   // if (id != null) {

    //    //  this.custom_view_id = '';
    //    //  this.pageSizeValue = 10;
    //     // this.currentPage = 1;
    //      //if (this.Leadstatusid != null) {
    //      //  this.listFiltertext = "StatusName = '" + this.Leadstatusid + "'";
    //      //}

    //    //  this.getPageSizes();
    //     // this.refresh();
    //    //}


    //  }

    //);

  }


  getMasterItemsList_Generic(masterNames: any)
  {
    this.commonService.getMasterItemsList(masterNames).subscribe((result: any) => {
      return this.commonService.masters;
    })
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
            isLink: false
          }

        ]
    };
  }
  onSortLeadconvert(e) {

  }
  onSelectedLeadconvert(e) {

  }
  setPageLeadconvert(e) { }

  getListingColorCode(fieldValue: any) {
    //debugger
    //this.lstListingColorCode = '';
    if (fieldValue != null) {
      this.lstListingColorCode = fieldValue.split('::');
      if (this.lstListingColorCode.length > 0) {
        this.lstListingColorCode = [{ color: this.lstListingColorCode[0], colorkey: this.lstListingColorCode[1] }]
      }
    }
    //// console.log('this.lstColorCode', this.lstColorCode)
    return this.lstListingColorCode;
    //// console.log('this.lstColorCode', this.lstColorCode)

  }


  GetcustomViewid(event) {

    if (event == 'undefined' || typeof event == 'undefined') {
      //this.isAddViewFirstTime = true;
      this.LoadViewData();
      this.LoadViewDataCount();
    }
    this.pagedData.data.forEach(cnt => {
      if (cnt.custom_view_id == event) {
        this.ViewModel = cnt.view_name;
        this.SortingWidget(cnt.view_name);

      }
    });
    this.custom_view_id = event;
    this.vewId = event;
    this.refresh();
  }

  SortingWidget(_dropdownitem: any) {
    ;
    let _selWidgetNum: number = 0;
    if (this.tilewidget) {
      for (let i = 0; i < this.tilewidget.length; i++) {
        if (this.tilewidget[i].view_name == _dropdownitem) {
          _selWidgetNum = Math.ceil((i + 1) / 4);
        }
      }
      let _TotalWidget: NodeListOf<HTMLElement> = document.querySelectorAll('.carousel-item');
      for (let i: number = 0; i < _TotalWidget.length; i++) {
        if (i == _selWidgetNum - 1) {
          _TotalWidget[i].classList.add("active");
        }
        else {
          _TotalWidget[i].classList.remove('active');
        }
      }
    }
  }

  ApplyAdvanceFilter(event) {
    this.currentPage = 1;
    this.listFiltertext = '';
    this.listFiltertext = event;
    this.refresh();
  }


  refresh() {
    this.selected = [];
    this.deleteId = null;
    this.loadSave = true;
    ;
    this.leadlistService.GetLeadlist(this.listFiltertext, this.searchUserType, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid, this.custom_view_id, this.searchFilter, this.moduleName, this.submoduleName, this.companyId, this.widgetType, this.recordFilter, this.teamID, this.teamMemberID, this.myCheckbox)
      .subscribe(response => {
        this.load = false;
        this.jsonData = response;
        debugger
        // console.log('jsonData', this.jsonData);
        
          this.jsonData.data.forEach((x)=>{
          if(x.AnnualRevenue != null ){
            x.AnnualRevenue ='$' + x.AnnualRevenue+'.00';
          }
        });
      //   this.jsonData.schema.forEach(x => {
      //     debugger
      //     if(x.COLUMN_NAME == "Salutation")
      //     {
      //         //console.log(this.getListingColorCode(x.COLUMN_NAME));
      //         x.COLUMN_NAME = this.getListingColorCode("Mr.::#f01158");
      //     }
      // })
        debugger
        this.jsonDatapack = JSON.stringify(this.jsonData);
        this.jsoncondition = JSON.stringify(this.validationModel);

        this.load = true;

        if (response.data.length > 0) {
          this.totalRecords = this.jsonData.data[0].total_records;
        } else {
          this.totalRecords = 0;
        }
        this.offset = this.currentPage;
        this.loadSave = false;
      }, error => {
        this.loadSave = false;
      })
  }
  get curPage(): number {
    return this.offset;
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
      this.lstPageSizeLeadconvert = this.commonService.masters;
      this.lstPageSizeAssociateProduct = this.commonService.masters;
    })
  }

  setPage($event) {
    this.loadSave = true;
    // this.currentPage = $event.page;
    this.currentPage = 1;

    this.refresh();
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = 1;
    this.refresh();
  }
  onChange($event) {
    this.currentPage = 1;
    this.refresh();
  }
  displayDetailDetail(TemplateName: any) {
    this.ManageViewModal.show(TemplateName);
  }

  filterpopup() {
    this.is_filter = '';
    //if (this.listFiltertext != null )
    // this.is_filter = this.listFiltertext.length;
    this.FilterViewModal.show(this.companyId, this.is_filter);
  }


  updateFilter(event) {

    this.listFilter = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }

  }

  search() {

    this.currentPage = 1;
    this.listFiltertext = '';
    if (this.listFilter.length > 0) {
      this.listFiltertext = "Name like '%" + this.listFilter + "%'";
    }
    this.refresh();
  }
  reset() {
    this.listFilter = '';
    this.listFiltertext = '';
    this.currentPage = 1;
    this.myCheckbox = false;
    this.refresh();
    this.selected = [];
  }



  deleteAll() {
    if (this.deleteId != null && this.deleteId != "") {
      this.dialogService.confirm('Delete Lead(s)',
      'Are you sure you want to delete the selected lead(s) ?').subscribe(confirmed => {
        if (confirmed) {
          this.leadService.DeleteRecords(this.deleteId, this.tableName).subscribe(r => {
            this.toaster.success(`Record(s) has been deleted successfully`);
            this.deleteId = "";
            this.selected = [];
            this.refresh();
          }, error => {
          });
        }
      });
    }
    else {
      this.toaster.error("Please select at least one row.");
    }
  }

  Delete(row: any) {
    var FirstName;
    if (row.FirstName== null)
    {
      row.FirstName=""
    }
   
    //debugger;
    this.dialogService.confirm('Delete Lead',
    'Are you sure you want to delete Lead  ' + row.FirstName +' '+row.LastName  + ' ?').subscribe(confirmed => {
      if (confirmed) {
        this.leadService.DeleteRecords(row.LeadID, this.tableName).subscribe(r => {
          this.toaster.success(`Lead "${row.Name}" has been deleted successfully`);
          this.refresh();
        }, error => {
        });
      }
    });
  }




  showpopup(id: any) {

    
      this.showpopupleadconvert(id);
    
  }

  addForm = this.fb.group({

    //Account: ['createnewaccount'],
    //contact: ['createnewcontact'],
    //opportunity: [true],
    accountName: [null, Validators.required],
    opportunityname: [null, Validators.required],
    accounttypeid: [null, Validators.required],
    //Salutationtypeid: [null, Validators.required],
    // lastName: [null, Validators.required],
    //firstName: [null, Validators.required],
    // contactrecordtypeid: [null, Validators.required]

  })
  close() {

    this.convertleadmodel.hide();
    this.LoadViewDataCount();
  }
  closeCreditScoreModel() {

    this.creditscoremodel.hide();
    this.LoadViewDataCount();
  }



  getcontactlist() {
    this.leadlistService.getContactList(this.leadid, 10, 'lead', this.sortColumn, this.sortDir, 0, this.pageSizeValueLeadconvert, this.loginuserid).subscribe(response => {
      this.pagedDataLeadconvert = this.leadlistService.pagedData;
      //// console.log('pagedDataLeadconvert', this.pagedDataLeadconvert);

    })
  }


  saveLeadConvert() {
    if (this.addForm.valid) {
      this.contactid = this.tableModalcontact.selected.length > 0 ? this.tableModalcontact.selected[0].id : null;
      //this.productid = this.tableModal.selected.length > 0 ? this.tableModal.selected[0].ID : null;
      if (this.contactid == "" || this.contactid == null || this.contactid == 'undefined') {
        this.toaster.error("Please select at least one row.");
        return;
      }
      //// console.log('addform', this.addForm);
      this.leadconvertModel.account_name = this.addForm.value.accountName;
      this.leadconvertModel.account_type_id = this.addForm.value.accounttypeid;
      this.leadconvertModel.object_ref_id = this.leadid;
      this.leadconvertModel.contactid = this.contactid;
      this.leadconvertModel.productid = '0';
      this.leadconvertModel.object_name = 'lead'
      this.leadconvertModel.object_id = 10;
      this.leadconvertModel.loanid = '0';
      this.leadconvertModel.opportunity_name = this.addForm.value.opportunityname;
      // // console.log('leadconvertModel', this.leadconvertModel);
      this.leadlistService.saveLeadConvert(this.leadconvertModel).subscribe((result: any) => {
        //debugger
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.convertleadmodel.hide();
          this.refresh();
          this.router.navigateByUrl("/opportunity/viewOpportunity/" + result.id);
        }
        else {

          this.toaster.error(result.responseMessage);
        }
      })
    }
    else {
      this.commonService.validateAllFormFields(this.addForm);
    }
  }



  getLeadConvertData(leadid: any) {
    this.leadlistService.getLeadConvertData(leadid).subscribe((result: any) => {
      // // console.log('loanapplicationid', result);

      this.addForm.patchValue({
        accountName: result[0].accdata,
        opportunityname: result[0].leaddata,


      });

    },

      (error: any) => {

      })
  }


  get accountName() { return this.addForm.get('accountName'); }
  get opportunityname() { return this.addForm.get('opportunityname'); }
  get accounttypeid() { return this.addForm.get('accounttypeid'); }

  getconverttype() {
    this.configurationsettingService.GetLeadConfigurationDetails(this.companyid).subscribe((leadresult: any) => {

      this.isloanapp = leadresult.isLoanapplication;
      this.isopportuinity = leadresult.isOpportunity;
      //// console.log('leadresult', leadresult);
      //// console.log('isopportuinity', this.isopportuinity);
      // // console.log('isloanapp', this.isloanapp);
    })
  }
  GetAssociateProductList() {

    this.leadlistService.GetAssociateProductList(this.leadid, 10, this.submoduleName, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      //  setTimeout(() => {
      this.AssociatedproductpagedData = this.leadlistService.pagedData;
      this.table.recalculate();
      this.table.recalculateColumns();

      // }, 200);


      //// console.log('AssociatedproductpagedData', this.AssociatedproductpagedData);

    })
  }
  onChangeAssociateProduct($event) {
    this.leadlistService.GetAssociateProductList(this.leadid, 10, this.submoduleName, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.AssociatedproductpagedData = this.leadlistService.pagedData;
      //// console.log('AssociatedproductpagedData', this.AssociatedproductpagedData);

    })
  }
  setPageAssociateProduct($event) {
    this.leadlistService.GetAssociateProductList(this.leadid, 10, this.submoduleName, this.listFilter, this.sortColumn, this.sortDir, this.lstPageSizeAssociateProduct, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.AssociatedproductpagedData = this.leadlistService.pagedData;
      //// console.log('AssociatedproductpagedData', this.AssociatedproductpagedData);

    })

  }
  onSelectLeadconvert(e) {
    //// console.log(e)
    if (this.tableModalcontact.selected.length >= 2) {


      this.tableModalcontact.selected.splice(0, 1);


    }
    //// console.log(this.tableModalcontact.selected);
    //// console.log(this.selected);
    //if (this.contactid == "" || this.contactid == null || this.contactid == 'undefined') {
    //  for (let i = 0; i < this.selected.length; i++) {

    //      this.contactid += this.selected[i].id;

    //  }
    //}


    //else {


    //  this.contactid = null;
    //  this.contactid = "";
    //  for (let i = 0; i < this.selected.length; i++) {

    //      this.contactid += this.selected[i].id;

    //  }
    //  //if (this.contactid == selected[0].id) {
    //  //  this.contactid = null;
    //  //}
    //}
    ////// console.log('this.contactid', this.contactid);
  }

  onSelectproductconvert(event) {

    if (this.tableModal.selected.length >= 2) {


      this.tableModal.selected.splice(0, 1);

    }


    //if (this.productid == "" || this.productid == null || this.productid == 'undefined') {
    //  for (let i = 0; i < event.length; i++) {
    //    if (event[i].asociatedUser !== 1) {
    //      this.productid += event[i].ID;
    //    }
    //  }
    //}


    //else {

    //  this.productid = null;
    //  this.productid = "";
    //  for (let i = 0; i < event.length; i++) {
    //    if (event[i].asociatedUser !== 1) {
    //      this.productid += event[i].ID;
    //    }

    //if (this.productid == selected[0].ID) {
    //  this.productid = null;
    //}


    //// console.log('this.productid ', this.productid );
  }
  getLeadConvertModuleWizard() {
    this.leadlistService.getLeadConvertModuleWizard().subscribe((result: any) => {
      this.pagenames = result;
      // // console.log('this.pagenames', this.pagenames)
    })
  }

  saveLeadConvertproduct() {
    this.addForm.value.opportunityname = 'test'
    //if (this.isloanapp == true) {
    //  if (this.loanid != null && this.loanid != undefined && this.loanid != '') {

    //// console.log(this.productid)
    //// console.log(this.contactid);
    // // console.log();
    this.productid = this.tableModal.selected.length > 0 ? this.tableModal.selected[0].ID : null;
    this.contactid = this.tableModalcontact.selected.length > 0 ? this.tableModalcontact.selected[0].id : null;



    if (this.addForm.valid) {
      if (this.contactid == "" || this.contactid == null || this.contactid == 'undefined') {
        this.toaster.error("Please select at least one row.");
        return;
      }

      if (this.productid == "" || this.productid == null || this.productid == 'undefined') {
        this.toaster.error("Please associate atleast one product.");
        return;
      }
      //// console.log('addform', this.addForm);
      this.leadconvertModel.account_name = this.addForm.value.accountName;
      this.leadconvertModel.account_type_id = this.addForm.value.accounttypeid;
      this.leadconvertModel.object_ref_id = this.leadid;
      this.leadconvertModel.contactid = this.contactid;
      this.leadconvertModel.object_name = 'lead'
      this.leadconvertModel.object_id = 10;
      this.leadconvertModel.productid = this.productid;
      this.leadconvertModel.opportunity_name = this.addForm.value.opportunityname;
      this.leadconvertModel.loanid = '0';
      this.loadSave = true;
      this.leadlistService.saveLeadConvertproduct(this.leadconvertModel).subscribe((result: any) => {

        if (result.statusCode == 200) {
          let jsonData = JSON.parse(result.optionalExtraParamers);
          this.ruleEngineService.executeRuleEngineTarget(jsonData.Id, 'ON_CREATE_AND_UPDATE', null).subscribe(m => {
            this.loanApplicationNumber = jsonData.ApplicationNumber;
            this.incomeVerification = jsonData.IncomeVerification;
            this.loanid = jsonData.Id;
            this.toaster.success(result.responseMessage);
            this.convertleadmodel.hide();

            this.creditscoremodel.show();

            this.leadlistService.getMandatoryDocumentsByLoanId(jsonData.Id).subscribe(documents => {
              if (documents != null) {
                documents.forEach(document => {
                  this.mandatoryDocuments.push(document.MasterValue);
                });
              }
            })

            this.leadlistService.getLeadById(this.leadid, false).subscribe(lead => {
              this.leadDetails = lead;
              this.loanapplicationservice.getCreditBureauList().subscribe(creditBureaus => {
                this.creditScoreData = [];
                creditBureaus.forEach(b => {
                  if (b.BureauName == "Equifax") {
                    //this.loanapplicationservice.getFileStatus(jsonData.Id, "Primary", b.Id).subscribe(fileStatus => {
                    //  if (fileStatus.consumers.equifaxPrecheckReport[0].hitCode.code == "U") {
                    this.loanapplicationservice.pullCreditScoreData(jsonData.Id, "Primary", b.Id).subscribe(score => {

                      this.loadSave = false;
                      this.creditScoreData.push({ bureauName: b.BureauName, data: score });
                      this.refresh();
                       }, err => {
                      this.loadSave = false;
                      this.refresh();

                    })
                    //  }
                    //}, err => {
                    //  this.loadSave = false;
                    //  this.refresh();

                    //});

                  }
                });
                }, err => {
                this.loadSave = false;
                this.refresh();

              })

             }, err => {
              this.loadSave = false;
              this.refresh();

            })
          })



        }
        else {
          this.loadSave = false;
          this.refresh();
          this.toaster.error(result.responseMessage);
        }

        //}, error => {
        //  //this.loadSave = false;
      }, err => {
        this.loadSave = false;
        this.refresh();

      })
    }

    else {

      this.commonService.validateAllFormFields(this.addForm);
    }


    //  }
    //  else {
    //    this.toaster.error('Please Fill the Loan Application Form');
    //  }
    //}


  }
  proceed() {
    this.creditscoremodel.hide();

    this.loanApplicationModal.show();
  }
  nexStep(event) {
    // // console.log(event);
    this.activeWizard = event;

  }
  finishStep(event) {
    this.loanApplicationModal.hide();
  }
  closeLoanApplicationModal() {
    this.loanApplicationModal.hide();
  }

  saveProduct() {
    //// console.log('data', this.selected);
    // // console.log('data',this.productassociateid);

    if (this.productassociateid != null && this.productassociateid != "") {
      this.loadSave = true;
      // // console.log('this.productid1111', this.productid);


      this.leadlistService.AssociteProduct(this.productassociateid, this.leadid, 10, 'lead', this.isloanapp).subscribe(r => {
        // // console.log('produvct')
        this.toaster.success(`product has been Associate scuccessfully`);
        this.loadSave = false;
        this.productassociateid = "";
        this.selected = [];
        this.GetAssociateProductList();

        this.productModal.hide();
        this.convertleadmodel.show();
      }, error => {
      })

    }

    else {
      this.loadSave = false
      this.toaster.error("Please select at least one product.");
    }
    this.loadSave = false

  }
  onSelectassociate({ selected }) {

    if (this.productassociateid == "" || this.productassociateid == null || this.productassociateid == 'undefined') {
      this.selectedassociateprouct.splice(0, this.selectedassociateprouct.length);
      this.selectedassociateprouct.push(...selected);
      for (let i = 0; i < selected.length; i++) {
        if (selected[i].asociatedUser !== 1) {
          this.productassociateid += selected[i].ID.toString() + ",";
        }
      }

    }
    else {
      this.productassociateid = null;
      this.productassociateid = "";
      for (let i = 0; i < selected.length; i++) {
        if (selected[i].asociatedUser !== 1) {
          this.productassociateid += selected[i].ID.toString() + ",";
        }
      }
    }
    // // console.log('this.productid', this.productid);
  }
  closeassociatepopup() {
    this.productModal.hide(); this.convertleadmodel.show();
  }

  associateproduct() {
    this.convertleadmodel.hide();
    this.productModal.show();
    this.leadlistService.GetProductList(this.leadid, 10, 'lead', null, this.sortColumnAssoProdList, this.sortDirAssoProdList, this.currentPageAssoProdList, this.pageSizeValueAssoProdList, null).subscribe(response => {
      this.pagedData = this.leadlistService.pagedData;
      this.offsetAssociateProductList = this.currentPageAssoProdList;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    })
  }

  setPageAssociateProductList($event) {
    this.loadSave = true;
    this.currentPageAssoProdList = $event.page - 1;
    this.associateproduct();
  }

  onSortAssociateProductList($event) {
    const sort = $event.sorts[0]
    this.sortDirAssoProdList = sort.dir;
    this.sortColumnAssoProdList = sort.prop;
    this.currentPageAssoProdList = 0;
    this.loadSave = true;
    this.associateproduct();
  }

  get curPageAssoProdList(): number {
    return this.offsetAssociateProductList;
  }

  onChangeAssoProdList($event) {
    this.currentPageAssoProdList = 0;
    this.loadSave = true;
    this.associateproduct();
  }

  closecreditscore() {
    this.creditscoremodel.hide();
  }

  LoadViewData() {

    //this.loadSave = true;
    this.pageSizeValue = 15;
    this.currentPage = 1;

    this.leadlistService.getViewList(this.searchTxt, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.moduleName, this.submoduleName, this.companyId).subscribe(response => {
      this.pagedData = this.leadlistService.pagedData;
      this.pagedData.data.forEach(cnt => {
        if (cnt.is_default == true) {
          this.vewId = cnt.custom_view_id;
          this.ViewModel = cnt.view_name;
        }
      });

      //this.loadSave = false;
      }, error => {
      //this.loadSave = false;
    })
  }

  LoadViewDataCount() {

    //this.loadSave = true;
    this.pageSizeValue = 15;
    this.currentPage = 1;
    this.leadlistService.getViewListCount(this.searchTxt, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.moduleName, this.submoduleName, this.companyId).subscribe(response => {
      this.tilewidget = this.leadlistService.pagedData.data;
      debugger
      // this.tilewidget.push(this.leadlistService.pagedData.data[0])
      // this.tilewidget.push(this.leadlistService.pagedData.data[0])
      // this.tilewidget.push(this.leadlistService.pagedData.data[0])
      if (this.tilewidget.length % 4 == 0) {
        this.tilewidgetSlider = [...Array(this.tilewidget.length / 4)].map(x => 0);
      }
      else {
        this.tilewidgetSlider = [...Array(Math.ceil(this.tilewidget.length / 4))].map(x => 0);
        this.tilewidgetSliderInnerDi = [...Array(this.tilewidget.length % 4)].map(x => 0)
      }
      if (this.ViewModel) {
        setTimeout(() => {
          this.SortingWidget(this.ViewModel);

        }, 1000);
      }

      //this.loadSave = false;
    }, error => {
      //this.loadSave = false;
    })
  }




  SetManageViewValueWidgets(e) {
    ;
    this.loadSave = true;
    this.ViewModel = e.view_name;
    this.custom_view_id = e.custom_view_id;
    this.vewId = e.custom_view_id;
    this.refresh();
    //this.LoadViewData();
  }

  GetPageData(i, j) {
    let curr = (i * 4) + j;
    // console.log(curr, this.tilewidget[curr])
    return this.tilewidget[curr];
  }



  SetManageViewValue(e) {
    this.ViewModel = e.text;
    this.custom_view_id = e.event;
    this.vewId = e.event;
    this.SortingWidget(e.text);
    this.refresh();
    //this.LoadViewData();
  }

  showpopupleadconvert(id: any) {
    this.leadconvert.show(id);
  }

  switchClicked(event) {
    // console.log("eventeventeventevent", event);
    let view_id = this.custom_view_id;

    ;
    this.listFiltertext = '';
    this.myCheckbox = event.srcElement.checked;
    this.currentPage = 1;

    if (this.listFilter.trim().length > 0) {
      this.listFiltertext = "Name like '%" + this.listFilter + "%'";
    }
    if (this.listFiltertext.trim().length > 0) {
      this.custom_view_id = '';
      this.refresh();
      this.custom_view_id = view_id;
    }
    if (this.myCheckbox == false) {
      this.refresh();
    }

  }

  curPageemit(e) {

    return this.offset;
  }

  selectdata(e) {
    this.deleteId = '';
    this.deleteId = e;

  }
  MainMethod(e: any) {
    // console.log('mainmethod', e);
    this.currentPage = e.pageNo;
    this.pageSizeValue = e.pageSize;
    this.sortColumn = e.sortColumn;
    this.sortDir = e.sortdirect;
    this.refresh();
  }
  goToPage(e: any) {
    debugger
    if (e.page.route != "null" && e.page.route != undefined) {
      this.router.navigateByUrl(e.page.route + e.row.LeadID);
    }
    if (e.page.name == "Delete") {
      this.Delete(e.row)
    }
    if (e.page == "view") {
      this.router.navigateByUrl('/lead/view/' + e.row.Id);
    }
    if (e.page.name == "Convert Lead") {
      this.showpopup(e.row.LeadID)
    }

    // console.log('rowdata', e)
  }
  add() {
    this.router.navigateByUrl('/lead/addlead')
  }


}



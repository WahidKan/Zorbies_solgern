import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { CommonService, ModuleList } from '../shared/common.service';
import { AccountserviceService, CheckboxData } from './accountservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { Role } from '../role/role.service';
import { ProductListService } from '../product/productlist.service';
import { NewnoteslistComponent } from '../shared/new-notes/newnoteslist.component';
import { NotesService } from '../shared/notes/notes.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { OpportunityListService } from '../opportunity/opportunitylist.service';
import { LeadlistService } from '../lead/leadlist.service';
import { Location } from '@angular/common';
import { WelcomecallpopupComponent } from '../shared/welcomecallpopup/welcomecallpopup.component';
import { VoicecallComponent } from '../shared/twilio/voicecall/voicecall.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AppComponent } from '../../app.component';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { fieldsJson } from '../managecustomlayout/managecustomlayout.service';
import { addeditprojectrequirements } from '../requirementslist/addeditprojectrequirement/addeditprojectrequirements.component';
import { accountJurisdiction } from './JurisdictionPopup/AccountJurisdictioncomponent';




@Component({
  providers: [VoicecallComponent],
  selector: 'app-accountviewdetail',
  templateUrl: './accountviewdetailNew.component.html'
})

export class AccountviewdetailNewComponent implements OnInit {
  @Input() offsetRelatedContact: number;
  @ViewChild('listnotesmodel', { static: false }) listnotesmodel: NewnoteslistComponent;
  @ViewChild('listnotesmodel1', { static: false }) addNotesPopupModel1: NewnoteslistComponent;
  @ViewChild('welcomecall', { static: false}) welcomecallModel: WelcomecallpopupComponent;
  @ViewChild('addContact', { static: false}) addContact: ModalDirective;
  @ViewChild('audioModel', { static: false}) audioModel: ModalDirective;
  @ViewChild('addeditprojectrequirements', { static: false }) addeditprojectrequirements: addeditprojectrequirements;
  @ViewChild('addeditaccountJurisdiction', { static: false }) addeditaccountJurisdiction: accountJurisdiction;

  @Output() newItemEvent = new EventEmitter<string>();
  pageSizeValue: number;
  pageSizeValueRelContact: number;
  currentPage: number;
  productid: any;
  listFilter: any='';
  AccountDetails: any;  
  EditContactId: any;
  isUsertypeBanker = false;
  IsStandard = false;
  UtilityCompanyName: any;
  accountName: any;
  StatusName: any;
  isAudio: boolean = true;
  fileNameDownLoad: any;
  modalTitle: any;
  displayType = 'VIEW';
  audioSrc: any;
  contactIdPrimaryKeyId: any = '';
  vedeoSrc: any;
  ownerId: any;
  customCompnentValuesTop: any;
  RelatedContactsCount: number = 0;
  OpportunitiesCount: number = 0;
  ContractsCount: number = 0;
  WorkOrdersCount: number = 0;
  ProposalsCount: number = 0;
  configurationSetings: FormGroup;
  loginuserid: any;
  accountId: any;
  lstRole: any;
  loading = false;
  isSave = false;
  Name: any;
  from:any='Account'
  pagedData: any = {
    pager: {},
    data: []
  };
  RelatedContactsData: any = {
    pager: {},
    data: []
  };
  lstPageSize: any;
  sortDir = 'desc';
  sortColumn = 'createdon';
  moduleName = 'CRM';
  submoduleName = 'account';
  companyId: any;
  customCompnentValues: any;
  formControlList: any[] = [];
  executionFlow:any[]=[];
  form: FormGroup;
  loadSave = false;
  BillingAddress: string = "";
  BillingCity: string;
  BillingStreet: string;
  BillingState: string;
  BillingCountry: string;
  BillingPostalCode: string;

  OppourtunityCount: number = 0;
  CoomunicationCounts: number = 0;
  ContractCount: number = 0;
  ContactCount: number = 0;
  isAccount = true;
  ProposalCount: number = 0;
  workOrderCount: number = 0;
  serviceAppointmentsCount: number = 0;
  jurisdictionCount: number = 0;
  productCount: number = 0;
  notescount: number = 0;

  lstOppourtunity: any = {
    pager: {},
    data: []
  };
  lstCoomunication: any = {
    pager: {},
    data: []
  };
  lstContract: any = {
    pager: {},
    data: []
  };
  lstContacts: any = {
    pager: {},
    data: []
  };
  lstWorkOrders: any = {
    pager: {},
    data: []
  };
  lstServiceAppointments: any = {
    pager: {},
    data: []
  };

  lstjurisdiction: any = {
    pager: {},
    data: []
  };

  lstProducts: any = {
    pager: {},
    data: []
  };

  lstProposals: any = {
    pager: {},
    data: []
  };
  pageSize: number = 4;
  OppoutunityPageNo: number = 4;
  CommunicationPageNo: number = 1;
  ContractPageNo: number = 1;
  ContactPageNo: number = 1;
  ProposalPageNo: number = 1;
  WorkOrderPageNo: number = 1;
  ServiceAppointmentPageNo: number = 1;
  JurisdictionPageNo: number = 1;
  ProductsPageNo: number = 1;
  solgenpower = false;
  callFrom = "account";
  banker: any;
  companyType: any;
  lstFiles: any = {
    pager: {},
    data: []
  }
  filesCount: any;
  filePageNo: number = 1; pageSizefile: number = 4;
  siteurl: string = '';
  roleName: any = " Accounts";

  isSuperAdmin:any;

  constructor(private dialogService: ConfirmationDialogService,
    private productlistService: ProductListService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private router: Router,
    private opprtunityservice: OpportunityListService,
    private leadservice: LeadlistService,
    private internalAccountService: AccountserviceService,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private notesService: NotesService,
    private accountserviceService: AccountserviceService,
    private location: Location,
    public sanitizer: DomSanitizer,
    private app: AppComponent,
    private voiceCallModel: VoicecallComponent) {
      this.commonService.getUpdatedOpportunity.subscribe(res => {
        this.ngOnInit();
      })
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {

      this.companyType = userdetail.companyType;
      if (this.companyType == "companytypeSolarInstall") {
        this.solgenpower = true;
      }
    });
  }

  checkboxdata1: Array<CheckboxData> = [];
  checkboxdataTop: Array<CheckboxData> = [];


  ngOnInit() {
    debugger; //Solar
    this.isSuperAdmin=localStorage.getItem('isSuperAdmin');
    if(this.router.url == '/accountslist/sub-dealer')
    {
      this.roleName = " Sub Dealers";
    }
    if(this.router.url == '/accountslist/customer')
    {
      this.roleName = " Customers";
    }

    this.siteurl = window.location.origin;
    this.initForm();
    this.loadSave = true;
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.productid = id;
        this.accountId = id;
        localStorage.setItem('accountId', this.accountId);
        if (id) {
          //this.GetAccountDetails(id);
          this.GetLoanProductDiscountCategoryEdit('1');

        }
        // this.getRoleListForEnableLogin(this.accountId);
      })
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.GetCustomFieldsList();
    this.GetCustomFieldsListTopRow();
   // this.GetRelatedData();
    //this.getNoteslist();
   // this.GetRelatedContactsDetail();
    setTimeout(() => {
      debugger;
      this.loadSave = false;
    }, 2000);
  };

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  isVisibleWelcomeCall: boolean = false;

  WelcomeCallPopup(accountId) {
    if (this.isVisibleWelcomeCall) {
      this.isVisibleWelcomeCall = false;
    }
    else {
      this.isVisibleWelcomeCall = true;
    }

    setTimeout(() => {
      this.app.ShowDialer({ visible: true, defaultValue: false, Minimize: false, refId: this.accountId });
      this.welcomecallModel.show(accountId);
    }, 500);
  };

  addItem(newItem: number) {
    this.notescount = newItem;
    this.addNotesPopupModel1.getNoteslist();
  };

  close() {
    this.router.navigateByUrl("/accountslist");
  };

  GetCustomFieldsList() {
    this.formControlList = [];
    //this.loadSave = true;
    this.displayType = 'VIEW';
    this.productlistService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.productid,this.displayType).subscribe(result => {
      if (result) {
        debugger;
        this.customCompnentValues = this.productlistService.customFieldsList.data;
        // this.executionFlow=this.productlistService.customFieldsList.executionFlow;
        let AccountType: any = { name: "" };
        let recordt = this.customCompnentValues.find(x => x.name == "RecordTypeId")
        if (recordt) {
          let typeId = recordt.value;
          if (typeId != '')
          {
           //var abc= recordt.select_options.find(x => x.value == typeId);
           AccountType=typeId;
          }
        }
           ///////////////////////////////////////////Start Jurisdiction Type Check//////////////////////////
       debugger

       this.customCompnentValues.forEach(t => {
         if (AccountType == "Jurisdiction" &&
         !(
           t.ColumnName == 'Name' || t.ColumnName == 'RecordTypeId' || t.ColumnName == 'Service_Territory'
           || t.ColumnName == 'Install_W_O_Permitting' || t.ColumnName == 'BillingCity'
           || t.ColumnName == 'BillingStreet' || t.ColumnName == 'BillingCountry' || t.ColumnName == 'BillingState'
           || t.ColumnName == 'BillingPostalCode' || t.ColumnName == 'BillingPostalCode'
           || t.ColumnName == 'Support_Email' || t.ColumnName == 'Support_Line' || t.ColumnName == 'Jurisdiction_Type'
           || t.ColumnName == 'Bond_Expiration' || t.ColumnName == 'Description' || t.ColumnName == 'Website'
           || t.ColumnName == 'Bond_Number' || t.ColumnName == 'Takeover_User' || t.ColumnName == 'County'
           || t.ColumnName == 'ParentId' || t.ColumnName == 'Open_Pre_Install_Work_Orders'|| t.ColumnName == 'Test_Account'
           || t.ColumnName == 'CreatedById' || t.ColumnName == 'CreatedAt'|| t.ColumnName == 'LastModifiedById'|| t.ColumnName == 'ModifyAt'

         )
       ) {
        this.customCompnentValues = this.customCompnentValues.filter(x=>x.custom_field_id != t.custom_field_id);

       }

       })
     ///////////////////////////////////////////End Jurisdiction Type Check //////////////////////////
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
          if (cnt.dt_code == 'select') {
            if (cnt.value != '' && cnt.select_options != null) {
              cnt.select_options.forEach(itemList => {
                if (itemList.value == cnt.value) {
                  cnt.value = itemList.name;
                }
              });
            }
          }
          
          debugger
          if (cnt.ColumnName == 'BillingStreet') {
            this.BillingStreet = cnt.value == null ? '' : cnt.value;
          }
          if (cnt.ColumnName == 'BillingCity') {
            this.BillingCity = cnt.value == null ? '' : cnt.value;
          }
          if (cnt.ColumnName == 'BillingState') {
            this.BillingState = cnt.value == null ? '' : cnt.value;
          }
          if (cnt.ColumnName == 'BillingCountry') {
            this.BillingCountry = cnt.value == null ? '' : cnt.value;
          }
          if (cnt.ColumnName == 'BillingPostalCode') {
            this.BillingPostalCode = cnt.value == null ? '' : cnt.value;
          }
          if (cnt.ColumnName == 'OwnerId') {
            this.ownerId = cnt.ref_value;
          }
          
          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required === true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type === "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type === "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type === "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])
        });

        //this.BillingAddress = '';
        this.BillingAddress = this.BillingAddress.concat(this.BillingStreet, ", ", this.BillingCity, ", ", this.BillingState, ", ", this.BillingCountry, " ", this.BillingPostalCode)

        this.form = new FormGroup(group);
          /////////////////////////////////Flowwww////////////////////////////
          debugger;
          let flowList=this.productlistService.customFieldsList.executionFlow;
          flowList.forEach(item => {
            let itmevisible = 'yes';
            if (item.filterConditions)
              item.filterConditions.forEach(condi => {
                let fieldValue = this.customCompnentValues.find(x => x.custom_field_id == Number(condi.field)).value;
                debugger;
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
      this.getRelatedObjects();
      //setTimeout(() => {
      //  this.loadSave = false;
      //}, 3000);
    });
  };
  ExecuteAutomationFlow(AutomationId){
    debugger;
    console.log(AutomationId);
    window.open(`/automation-flow-execution/execution/${AutomationId}/${this.accountId}`, "_blank");
  //  let url = `/automation-flow-execution/execution/${AutomationId}/${this.accountId}`
   // this.router.navigateByUrl(url);
  }
  private initForm() {
    this.configurationSetings = this.fb.group({
      accoundetailView: this.fb.array([])
    });
  };

  get accoundetailView(): FormArray {
    return this.configurationSetings.get('accoundetailView') as FormArray;
  };

  private prepareFormDataForDocument() {
    const input = new FormData();
    input.append('accountId', this.accountId);
    input.append('contactList', JSON.stringify(this.accoundetailView.value));
    return input;
  };

  GetLoanProductDiscountCategoryEdit(id) {
    let current = this;
    while (this.accoundetailView.length != 0) {
      this.accoundetailView.removeAt(0);
    }

    this.accountserviceService.ContactList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.accountId).subscribe((result: any[]) => {
      result.forEach(function (value) {
        let group = new FormGroup({
          accountId: new FormControl(value.AccountId),
          contactID: new FormControl(value.contactID),
          name: new FormControl(value.Name),
          email: new FormControl(value.Email),
          isPrimary: new FormControl(value.IsPrimary),
          isPrimaryForDisabled: new FormControl(value.EnableUser),
          enableLogin: new FormControl(value.EnableUser),
          phone: new FormControl(value.Phone),
          mobile: new FormControl(value.MobilePhone),
          role: new FormControl(value.Role == '' ? null : value.Role),
          userId: new FormControl(value.userId == null ? null : value.userId)
        });
        current.accoundetailView.push(group);

      })
      this.RelatedContactsCount = result.length;
    });
  };

  GetRelatedContactsDetail() {
    let current = this;
    this.accountserviceService.RelatedContactList(this.listFilter, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValueRelContact, this.loginuserid, this.accountId).subscribe(response => {
      this.RelatedContactsData = this.accountserviceService.pagedData;
      this.offsetRelatedContact = this.currentPage;
      this.loading = false;
    })
  };

  AddContact(id?) {
    debugger;
    this.EditContactId=id;
    this.addContact.show();
  };



  recordId: number = 0;
  goToContact(id: number) {
    this.recordId = id;
    this.addContact.show();
  };

  closeContact() {
    this.recordId = 0;
    this.addContact.hide();
  };

  contactmsg(e: boolean) {
    debugger;
    const control2 = <FormArray>this.configurationSetings.controls.accoundetailView;
    control2.controls = [];
    this.GetRelatedContactsDetail();
    this.GetLoanProductDiscountCategoryEdit(this.accountId);
    this.closeContact();
  };

  GetCustomFieldsListTopRow() {
    this.displayType = 'VIEW_TOP';
    //this.loadSave = true;
    this.productlistService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.productid, this.displayType).subscribe((result: any) => {
      if (result) {
        this.customCompnentValuesTop = this.productlistService.customFieldsList.data;

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
          if (cnt.ColumnName == 'Name') {
            this.Name = cnt.value;
            this.accountName = cnt.value;
          }
          // debugger
          // if (cnt.ColumnName == 'BillingStreet') {
          //   this.BillingStreet = cnt.value == null ? '' : cnt.value;
          // }
          // if (cnt.ColumnName == 'BillingCity') {
          //   this.BillingCity = cnt.value == null ? '' : cnt.value;
          // }
          // if (cnt.ColumnName == 'BillingState') {
          //   this.BillingState = cnt.value == null ? '' : cnt.value;
          // }
          // if (cnt.ColumnName == 'BillingCountry') {
          //   this.BillingCountry = cnt.value == null ? '' : cnt.value;
          // }
          // if (cnt.ColumnName == 'BillingPostalCode') {
          //   this.BillingPostalCode = cnt.value == null ? '' : cnt.value;
          // }
          // if (cnt.ColumnName == 'OwnerId') {
          //   this.ownerId = cnt.ref_value;
          // }

        });
        // this.BillingAddress = '';
        // this.BillingAddress = this.BillingAddress.concat(this.BillingStreet, ", ", this.BillingCity, ", ", this.BillingState, ", ", this.BillingCountry, " ", this.BillingPostalCode)
        // //this.loadSave = false;
      }
    });
  };

  GetRelatedData() {
    this.OppoutunityPageNo = 1;
    this.pageSize = 4;
    this.refreshOppourtunityList();
    this.refreshContractList();
    this.refreshProposalsList();
    // this.refreshContactsList();
    this.refreshWorkOrdersList();
    this.refreshServiceAppointmentsList();
   // this.refreshJurisdictionList();
    this.RefreshCommunicationList();
  };


  refreshOppourtunityList() {
    this.accountserviceService.GetAccountsOppoutunityList(this.accountId, this.sortColumn, this.sortDir, this.OppoutunityPageNo, this.pageSize).subscribe(resp => {
      this.lstOppourtunity = resp;
      this.OppourtunityCount = resp.pager.totalItems;
    });
  };

  RefreshCommunicationList() {
    this.accountserviceService.GetAccountsCommunicationList(this.accountId, this.sortColumn, this.sortDir, this.CommunicationPageNo, this.pageSize).subscribe(resp => {
      this.lstCoomunication = resp;
      this.CoomunicationCounts = resp.pager.totalItems;
    });
  };

  refreshContractList() {
    this.accountserviceService.GetAccountsContractList(this.accountId, this.sortColumn, this.sortDir, this.ContractPageNo, this.pageSize).subscribe(resp => {
      this.lstContract = resp;
      this.ContractCount = resp.pager.totalItems;
    });
  };

  refreshProposalsList() {
    this.accountserviceService.GetAccountsProposalsList(this.accountId, this.sortColumn, this.sortDir, this.ProposalPageNo, this.pageSize).subscribe(resp => {
      this.lstProposals = resp;
      this.ProposalCount = resp.pager.totalItems;
    });
  };

  refreshContactsList() {
    this.accountserviceService.GetAccountsContactList(this.accountId, this.sortColumn, this.sortDir, this.ContactPageNo, this.pageSize).subscribe(resp => {
      this.lstContacts = resp;
      this.ContactCount = resp.pager.totalItems;
      if (this.lstContacts.userType == 'Standard') {
        this.IsStandard = true;
      }
      //this.loadSave = false;
    });
  };

  refreshWorkOrdersList() {
    this.accountserviceService.GetAccountsWorkOrderList(this.accountId, this.sortColumn, this.sortDir, this.WorkOrderPageNo, this.pageSize).subscribe(resp => {
      this.lstWorkOrders = resp;
      this.workOrderCount = resp.pager.totalItems;
    });
  };

  refreshServiceAppointmentsList() {
    this.accountserviceService.GetAccountsServiceAppointmentsList(this.accountId, this.sortColumn, this.sortDir, this.ServiceAppointmentPageNo, this.pageSize).subscribe(resp => {
      this.lstServiceAppointments = resp;
      this.serviceAppointmentsCount = resp.pager.totalItems;
    });
  };

  refreshJurisdictionList() {
    this.accountserviceService.GetAccountsJurisdictionList(this.accountId, this.sortColumn, this.sortDir, this.JurisdictionPageNo, this.pageSize).subscribe(resp => {
      this.lstjurisdiction = resp;
      this.jurisdictionCount = resp.pager.totalItems;
    });
  };

  refreshProductsList() {
    this.accountserviceService.GetAccountsProductsList(this.accountId, this.sortColumn, this.sortDir, this.ProductsPageNo, this.pageSize).subscribe(resp => {
      this.lstProducts = resp;
      this.productCount = resp.pager.totalItems;
    });
  };

  setOppourtunityPageNo($event) {
    this.OppoutunityPageNo = $event.page;
    this.refreshOppourtunityList();
  };

  setProposalPageNo($event) {
    this.ProposalPageNo = $event.page;
    this.refreshProposalsList();
  };

  setContactPageNo($event) {
    this.ContactPageNo = $event.page;
    this.refreshContactsList();
  };

  setWorkorderPageNo($event) {
    this.WorkOrderPageNo = $event.page;
    this.refreshWorkOrdersList();
  };

  setserviceAppointmentPageNo($event) {
    this.ServiceAppointmentPageNo = $event.page;
    this.refreshServiceAppointmentsList();
  };

  setJurisdictionPageNo($event) {
    this.JurisdictionPageNo = $event.page;
    this.refreshJurisdictionList();
  };

  setCommunicationPageNo($event) {
    this.CommunicationPageNo = $event.page;
    this.RefreshCommunicationList();
  };

  setProductsPageNo($event) {
    this.ProductsPageNo = $event.page;
    this.refreshProductsList();
  };

  setContractPageNo($event) {
    this.ContractPageNo = $event.page;
    this.refreshContractList();
  };

  onOppourtunitySort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    this.refreshOppourtunityList();
  };

  onCommunicationSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    this.RefreshCommunicationList();
  };

  onContractSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    this.refreshContractList();
  };

  onProposalSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    this.refreshProposalsList();
  };

  onWorkOrdersSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    this.refreshWorkOrdersList();
  };

  onServiceAppointmentSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    this.refreshServiceAppointmentsList();
  };

  onJurisdictionSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    this.refreshJurisdictionList();
  };

  onProductsSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    this.refreshProductsList();
  };

  onContactsSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    this.refreshContactsList();
  };

  isPrimaryValidator(field, i) {

    const message = `Are you sure you want to change Primary?`;
    this.dialogService.confirm('Enable Primary Contact', message).subscribe(confirmed => {
      if (confirmed) {
        if (field.get('isPrimary').value) {
          this.accoundetailView.controls.forEach(m => {
            m.get('isPrimary').setValue(false);
          });
          field.get('isPrimary').setValue(true);
        }
        else {
          field.get('isPrimary').setValue(false);
        }
      }

      else {
        if (field.get('isPrimary').value) {
          field.get('isPrimary').setValue(false);
        }
        else {
          field.get('isPrimary').setValue(true);
        }
      }
    });
  };

  private prepareFormDataForDocumentForEnableSingleClick(field) {
    const input = new FormData();
    input.append('accountId', this.accountId);
    input.append('contactList', JSON.stringify(field));
    return input;
  };

  EnableLoginForAllUser(field) {
    if (field.value.enableLogin == true && field.value.isPrimary == true) {
     // this.loadSave = true;
      if (this.IsStandard == false) {
        this.accountserviceService.CheckUserDuplicateORAssociate(field.value.email, '').subscribe((result: any) => {
          debugger;
         
          if (result.responseMessage == "duplicate") {
            this.isSave = false;
           // this.loadSave = false;
            this.onSubmitForSingle(field.value);
            // this.toaster.error("Email Already Exists");
            return false;
          }
          else if (result.responseMessage == "associate") {
            //already exists in ASPnetUsers-- now add only in maping table after confirmation
            //this.loadSave = false;
            this.dialogService.confirm('Associate Account', "Email already exists in other Company. Do you want to Associate it?").subscribe(confirmed => {
              if (confirmed) {
                //save in maping table
                if (this.IsStandard == false) {
                  this.accountserviceService.AssociateUserWithCompany(field.value.email, '', field.value.role, '', this.accountId).subscribe((result: any) => {
                    if (result.statusCode == 200) {
                      this.toaster.success("Account has been Approved successfully.");
                      //this.router.navigateByUrl("/accountslist");
                      this.GetLoanProductDiscountCategoryEdit(this.accountId);
                     // setTimeout(() => { this.loadSave = false; }, 3000);
                    }
                  });
                }
                else if (this.IsStandard == true) {
                  this.accountserviceService.AssociateUserWithCompany(field.value.email, '', field.value.role, '', this.accountId).subscribe((result: any) => {
                    if (result.statusCode == 200) {
                      this.toaster.success("Account has been Approved successfully.");
                      //this.router.navigateByUrl("/accountslist");
                      this.GetLoanProductDiscountCategoryEdit(this.accountId);
                      //setTimeout(() => { this.loadSave = false; }, 3000);
                    }
                  });
                }
                else {
                  this.toaster.error("Please select Role!");
                }
                this.isSave = false;
                return false;
              }
              else {//do nothing
                this.isSave = false;
                return false;
              }
            });
          }
          else {
            if (field.value.role == null || this.IsStandard == false) {
              this.onSubmitForSingle(field.value);
            }
            else {
              //this.loadSave = false;
              this.toaster.error("Please select Role!");

            }
          }
        });
      }
      else if (this.IsStandard == true) {
        //this.loadSave = false;
        //this.toaster.error("Please select Role!");
        this.onSubmitForSingle(field.value);
      }
      else {
        //this.loadSave = false;
        this.toaster.error("Please select Role!");
      }
    }
    else if (field.value.enableLogin == true && field.value.isPrimary == false) {
     // this.loadSave = true;
      if (this.IsStandard == false && (field.value.role != null && field.value.role != '')) {
        this.accountserviceService.CheckUserDuplicateORAssociate(field.value.email, '').subscribe((result: any) => {
          debugger;
          
          if (result.responseMessage == "duplicate") {
            this.isSave = false;
            //this.loadSave = false;
            //this.toaster.error("Email Already Exists");
            this.onSubmitForSingle(field.value);
            return false;
          }
          else if (result.responseMessage == "associate") {
            //already exists in ASPnetUsers-- now add only in maping table after confirmation
            this.loadSave = false;
            this.dialogService.confirm('Associate Account', "Email already exists in other Company. Do you want to Associate it?").subscribe(confirmed => {
              if (confirmed) {
                //save in maping table
                if (this.IsStandard == false && (field.value.role != null && field.value.role != '')) {
                  this.accountserviceService.AssociateUserWithCompany(field.value.email, '', field.value.role, '', this.accountId).subscribe((result: any) => {
                    if (result.statusCode == 200) {
                      this.toaster.success("Account has been Approved successfully.");
                      //this.router.navigateByUrl("/accountslist");
                      this.GetLoanProductDiscountCategoryEdit(this.accountId);
                      //setTimeout(() => { this.loadSave = false; }, 3000);
                    }
                  });
                }
                else if (this.IsStandard == true) {
                  this.accountserviceService.AssociateUserWithCompany(field.value.email, '', field.value.role, '', this.accountId).subscribe((result: any) => {
                    if (result.statusCode == 200) {
                      this.toaster.success("Account has been Approved successfully.");
                      //this.router.navigateByUrl("/accountslist");
                      this.GetLoanProductDiscountCategoryEdit(this.accountId);
                      //setTimeout(() => { this.loadSave = false; }, 3000);
                    }
                  });
                }
                else {
                  this.toaster.error("Please select Role!0");
                }
               // this.isSave = false;
                return false;
              }
              else {//do nothing
                //this.isSave = false;
                return false;
              }
            });
          }
          else {
            if (field.value.role == null || this.IsStandard == false) {
              this.onSubmitForSingle(field.value);
            }
            else {
              //this.loadSave = false;
              this.toaster.error("Please select Role!3");

            }
          }
        });
      }
      else {
        //this.loadSave = false;
        //this.toaster.error("Please select Role!");
        this.onSubmitForSingle(field.value);
      }
    }
    else if (field.value.enableLogin == false && field.value.isPrimary == true) {
      //this.loadSave = true;
      this.onSubmitForSingle(field.value);
    }
    else {
      //this.loadSave = true;
      this.onSubmitForSingle(field.value);
    }
  }

  onSubmitForSingle(field) {
    //this.loadSave = true;
    if (field.email == null || field.email == '') {
      this.toaster.error("can't enable login, because email is empty!");
      //this.loadSave = false;
    }
    else {
      const loanproductModel = this.prepareFormDataForDocumentForEnableSingleClick(field);
      this.accountserviceService.addOrUpdateManageStatusForAccountDetails(loanproductModel, this.accountId).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          //this.router.navigateByUrl("/accountslist");
          const control2 = <FormArray>this.configurationSetings.controls.accoundetailView;
          control2.controls = [];
          this.GetLoanProductDiscountCategoryEdit(this.accountId);
          //this.SetStatusData(this.field);
          //setTimeout(() => { this.loadSave = false; }, 3000);
        }
        else {
          //this.loadSave = false;
          //this.GetAccountDetails(this.accountId);
          let current = this;

          this.toaster.error(result.responseMessage);
          //setTimeout(() => { this.loadSave = false; }, 4000);
          //alert(1);
          //this.accoundetailView.clear();
          const control2 = <FormArray>this.configurationSetings.controls.accoundetailView;
          control2.controls = [];
          this.GetLoanProductDiscountCategoryEdit(this.accountId);
        }
      }, error => {
        this.loadSave = false;
      });
    }
  }

  AddNote() {
    this.listnotesmodel.show(this.accountId);
  };

  OnBackToListClick() {
    this.location.back();
  };

  closeWelcomeCall() {
    this.app.ShowDialer({ defaultValue: true, visible: true, Minimize: true });

    this.voiceCallModel.ngOnDestroy();
    this.isVisibleWelcomeCall = false;
    this.GetCustomFieldsList();
    this.GetCustomFieldsListTopRow();
    this.GetRelatedData();
    //this.getNoteslist();
    this.GetRelatedContactsDetail();
    this.GetLoanProductDiscountCategoryEdit(this.accountId);
  };

  urlSafe: SafeResourceUrl;

  ClickToPlay(row) {
    this.modalTitle = "audio Player";

    if (row.Vendor == 'Twilio') {
      this.isAudio = true;
      this.audioSrc = row.fileUrl;
      this.audioModel.show();
    }
    else {
      this.isAudio = false;
      const width = 500;
      const height = 380;

      const left = Number((screen.width / 2) - (width / 2));
      const top = Number((screen.height / 2) - (height / 2));

      const winFeatures = 'directories=0,titlebar=0,toolbar=0, location=0,status=0,menubar=0,scrollbars=0,resizable=0,width=' + width + ',height=' + height + ',left=' + left + ',top=' + top;

      const audiowindow = window.open(row.fileUrl, 'Audio Player', winFeatures);

      if (window.focus) audiowindow.focus();
    }
  };

  CloseAudio() {
    this.audioSrc = "";
    this.isAudio = true;
    this.audioModel.hide();
  };

  ClickTodisplayVedeo() {
    this.isAudio = false;
    this.modalTitle = "Video Player";
    this.vedeoSrc = "http://localhost:8530//assets/uploads/Document/_TrailerNews28_preview.webm"
    this.audioModel.show();
  };

  downloadFileSharePoint(fileName) {
    this.loadSave = true;
    this.fileNameDownLoad = fileName;
    this.accountserviceService.ClickToDownload(fileName, this.accountId).subscribe((result: any) => {

      var fileName = this.fileNameDownLoad.split("/")[this.fileNameDownLoad.split("/").length - 1];
      var file = new Blob([result], { type: result.type });
      saveAs(file, fileName);
      this.loadSave = false;
    },
      error => {
        this.loadSave = false;
      });
  };


  //================================================= Dynamic Related tab Section ================================================

  subscriber = new Subject()
  operatorList: any;
  relatedObjects: any[] = [];
  groupTop: any[] = [];
  additionalGroups: any[];

  
  getRelatedObjects() {
    this.commonService.GetRelatedObjects(this.moduleName, this.submoduleName, this.accountId, "", "")
      .pipe(takeUntil(this.subscriber))
      .subscribe(resp => {
        if (resp) {
          debugger;
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

  //===============================================================================================================================
 ///////////////////////////Project Requirement///////////////////////////
 AddRequiremnt() {
  debugger;
  this.addeditprojectrequirements.show('', this.accountId, this.accountName);
  //this.addeditprojectrequirements.show();
};

callRequirementListingData(name) {
  debugger;
  this.loadSave = true;
  this.getRelatedObjects();
  this.loadSave = false;
}



AddProjectRequiredPopup(row) {
  this.addeditprojectrequirements.show(row, this.accountId, this.accountName);

}

deleteProductRequirement(row) {
  debugger;
  const message = `Are you sure you want to delete Requirement  "${row.RequirementId}"?`;
  this.dialogService.confirm('Delete Requirement', message).subscribe(confirmed => {
    if (confirmed) {
      debugger;
      this.commonService.DeleteRecords(row.id, 'tblAccountRequirement').subscribe(r => {
        this.toaster.success(`Requirement "${row.RequirementId}" has been deleted successfully`);
        this.getRelatedObjects();
      }, error => {
      });
    }
  });
}
 ///////////////////////////End Project Requirement////////////////////


 //===============================================================================================================================
 ///////////////////////////Jurisdiction Requirement///////////////////////////
 AddJurisdiction() {
  debugger;
  this.addeditaccountJurisdiction.show('', this.accountId, this.accountName);
  //this.addeditprojectrequirements.show();
};

callGetJurisdictionListingData(name) {
  debugger;
  this.loadSave = true;
  this.getRelatedObjects();
  this.loadSave = false;
}



AddJurisdictionPopup(row) {
  this.addeditaccountJurisdiction.show(row, this.accountId, this.accountName);

}

deleteJurisdiction(row) {
  const message = `Are you sure you want to delete Jurisdiction  "${row.JurisdictionId}"?`;
  this.dialogService.confirm('Delete Jurisdiction', message).subscribe(confirmed => {
    if (confirmed) {
      debugger;
      this.commonService.DeleteRecords(row.Id, 'tblAccountJurisdiction').subscribe(r => {
        this.toaster.success(`Jurisdiction "${row.JurisdictionId}" has been deleted successfully`);
        this.getRelatedObjects();
      }, error => {
      });
    }
  });
}
 ///////////////////////////End Jurisdiction Requirement////////////////////
}




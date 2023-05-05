import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OpportunityListService, Utility_Proposal_Design_Information_DataModel, CheckboxData, RequestDesign, welcomeNoteOpportunityModel } from './opportunitylist.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { LeadlistService } from '../lead/leadlist.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MakeappointmentComponent } from '../calendar/makeappointment/makeappointment.component';
import { SendtoloanhomimodelpopupComponent } from './sendtoloanhomimodelpopup/sendtoloanhomimodelpopup.component';
import { DateTimeToLocalForAddEditPipe } from '../../pipes/datetime.pipe';
import { StagemanagementComponent } from '../shared/stagemanagement/stagemanagement.component';
import { Location } from '@angular/common';
import { map, takeUntil } from 'rxjs/operators';
import { CheckProposal, ProposallistService } from '../proposal/proposallist.service';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { id } from '@swimlane/ngx-datatable';
import { Data } from '@syncfusion/ej2-schedule/src/schedule/actions/data';
import { ProposalMappingComponent } from '../shared/proposal-mapping/proposal-mapping.component';
import { Subject } from 'rxjs';
import { fieldsJson } from '../managecustomlayout/managecustomlayout.service';
import { AppointmentsComponent } from '../shared/appointments/appointments.component';
import { ContractMappingComponent } from '../shared/contract-mapping/contract-mapping.component';
import { WorkorderComponent } from '../workorder/workorder.component';
import { WorkOrderMappingComponent } from '../shared/work-order-mapping/work-order-mapping.component';

@Component({
  providers: [StagemanagementComponent],
  selector: 'app-opportunityviewNew',
  templateUrl: './opportunityviewNew.component.html',

})
export class OpportunityViewNewComponent implements OnInit {
  @ViewChild('edit_Utility_Proposal_Design_InformationPopup', { static: false }) edit_Utility_Proposal_Design_InformationPopupModel: ModalDirective;
  @ViewChild('requestdesign', { static: false }) requestdesignModal: ModalDirective;
  @ViewChild('makeappointment', { static: false }) makeappointment: MakeappointmentComponent;
  @ViewChild('addContact', { static: false }) addContact: ModalDirective;
  @ViewChild('openSendToLoanHomiPopup', { static: false }) SendToLoanHomiModel: SendtoloanhomimodelpopupComponent;
  @ViewChild('stageManagement', { static: false }) stageManagement: StagemanagementComponent;
  @ViewChild('listproposalmappingmodel', { static: false }) addNewProposalmappingPopupModel: ProposalMappingComponent;
  @ViewChild('listcontractmappingmodel', { static: false }) addNewContractmappingPopupModel: ContractMappingComponent;
  @ViewChild('listworkordermappingmodel', { static: false }) addNewWorkOrdermappingPopupModel: WorkOrderMappingComponent;
  @ViewChild('addwelcomenote', { static: false }) addwelcomenoteModel: ModalDirective;
  @ViewChild('appointmentlist', { static: false }) appointmentlist: AppointmentsComponent;
  Id: any;
  requestDesign: RequestDesign = new RequestDesign();
  appmodelPro: CheckProposal = new CheckProposal();
  moduleName = 'crm';
  submoduleName = 'opportunity';
  fTime: Date;
  primaryContactId: any = 0;
  primaryContractId: any = 0;
  primaryProposalId: any = 0;

  isLoanProductAssociated: boolean;
  minimumDate: any;
  minFromTime: any;
  maxToTime: any;
  Type: any = "Add"
  executionFlow: any[] = [];
  companyId: any;
  customCompnentValues: any;
  customCompnentValuesTop: any;
  formControlList: any[] = [];
  form: FormGroup;
  loadSave = false;
  displayType = 'VIEW';
  topValue = '';
  OpportunityName = '';
  EditContactId: any;
  contactCount: number = 0;
  lstContacts: any = {
    pager: {},
    data: []
  };
  sortDir = 'desc';
  ownerId: any = '';
  sortColumn = 'createdon';
  ContactPageNo: number = 1;
  pageSize: number = 4;
  opid: any;
  submoduleid: 11;
  objectname: 'opportunity'
  pageSizeValue: number;
  loginuserid: any;
  contactpagedData: any = {
    pager: {},
    data: []
  };
  pageSizeValueContact: number;
  lstPageSizeContact: any;

  lstProducts: any = {
    pager: {},
    data: []
  };
  ProductsPageNo: number = 1;
  productCount: number = 0;
  workOrderCount: number = 0;
  lstWorkOrders: any = {
    pager: {},
    data: []
  };
  WorkOrderPageNo: number = 1;

  ContractCount: number = 0;
  lstContract: any = {
    pager: {},
    data: []
  };
  ContractPageNo: number = 1;
  // desmodel: designmodel = new designmodel();

  AccountsCount: number = 0;
  lstAccounts: any = {
    pager: {},
    data: []
  };
  AccountPageNo: number = 1;

  lstProposals: any = {
    pager: {},
    data: []
  };
  proposalCount: any = 0;
  proposalPageNo: any = 1;

  selectedAction: any = 0;
  date1: string;
  companyType: any;
  requestredesignList: any;
  isredesign: boolean = false;
  isHide: boolean = true;
  solgenpower = false;
  title: any;

  edit_Utility_Proposal_Design_InformationForm: FormGroup;
  Utility_Proposal_Design_Information_DataModel: Utility_Proposal_Design_Information_DataModel = new Utility_Proposal_Design_Information_DataModel();
  searchText = '';
  utilityCompanyList: any;
  len: any = 10;
  opprAccountId: number;
  opprContact: number;
  opprAccountName: number;
  timeFormat: string;
  requesttitle: string = '';
  siteurl: string = '';
  opportunityData: any;
  ddlStateList: any[] = [];
  ddlCountryList: any[] = [];
  lstCreditThresholdMet: any;
  lstAwareOfSolarTaxLiabilities: any;
  lstloanproduct: any;
  lstMountain: any;
  lstRoof: any;
  cascadingCompnentValues: any;
  lstShop: any;
  lstRoofMaterial: any;
  lstReRoofNeeded: any;
  rMValidationSign: boolean = false;
  reeRoofValidationSign: boolean = false;
  shopValidationSign: boolean = false;
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
  row: any;
  contentHeader: object;
  iconClass: string = 'feather-settings';
  headerTitle: any = '';


  constructor(private dialogService: ConfirmationDialogService,
    private opprtunityservice: OpportunityListService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private router: Router,
    private toaster: ToastrService,
    private leadservice: LeadlistService,
    private route: ActivatedRoute,
    private compp: StagemanagementComponent,
    private location: Location,
    private proposalService: ProposallistService
  ) {
    this.commonService.getUpdatedOpportunity.subscribe(res => {
      this.ngOnInit();
    })

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
      this.companyType = userdetail.companyType;
      if (this.companyType == "companytypeSolarInstall") {
        this.solgenpower = true;
      }
    });
    //this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //  return false;
    //};

    this.timeFormat = this.commonService.getTimeFormat();
  }
  checkboxdata1: Array<CheckboxData> = [];
  checkboxdataTop: Array<CheckboxData> = [];

  ngOnInit() {
    this.loadSave = true;
    this.siteurl = window.location.origin;
    this.submoduleid = 11;
    this.objectname = 'opportunity';
    localStorage.removeItem('opid');
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.Id = id;
        this.opid = id;
        localStorage.setItem('opid', this.opid);
      })
    this.CheckLoanProductAssociate();
    this.pageSizeValueContact = 4;
    this.getOperatorList();
    this.GetCustomFieldsList();
    this.getRelatedObjects();
    this.getPageSizes();
    //this.getContactList();
    // this.getRelatedTab();
    this.refreshAccountsList();
    this.initForm();
    this.GetlstcreditThresholdMet();
    this.iconClass = 'feather-settings';
    //setTimeout(() => {
    //  this.loadSave = false;
    //}, 2000);

    this.initBreadCrumb();
    //this.headerTitle = this.OpportunityName;
  }

  // showConvert(Item: string) {
  //   if (Item == 'SHOW') {
  //     this.leadconvert.show(this.Id);
  //   }
  // }

  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Manage Opportunity',
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
            name: 'Manage Opportunity',
            isLink: true,
            link: '/opportunity'
          },
          {
            name: 'Opportunity Details',
            isLink: false
          }

        ]
    };
  }

  getRelatedTab() {
    this.refreshProductsList();
    this.refreshWorkOrdersList();
    this.refreshContractList();
    this.refreshAccountsList();
    this.refreshProposalsList();
  }

  contactmsg(e: boolean) {
    this.getContactList();
    this.closeContact();
  }


  close() {
    this.router.navigateByUrl("/opportunity");
  }

  getRedsignReason() {
    this.commonService.getMasterItemsList("ProposalRedesignReason").subscribe((result: any) => {

      this.requestredesignList = this.commonService.masters;
    });
  }
  ExecuteAutomationFlow(AutomationId) {
    window.open(`/automation-flow-execution/execution/${AutomationId}/${this.Id}`, "_blank");
  }
  GetCustomFieldsList() {
    this.GetCustomFieldsListTopRow();
    this.formControlList = [];
    this.displayType = 'VIEW';
    this.opprtunityservice.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.opprtunityservice.customFieldsList.data;
        // this.executionFlow=this.opprtunityservice.customFieldsList.executionFlow;
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
                item.IsVisible = (item.visibility_condition_label) ? this.GetVisibilityDecision(item.visibility_condition_label) : true;
              }
            });
          }
        }

        //******************  merge groups and additional groups end here **********//
        this.formControlList.forEach((item, index) => {
          if (item.visibility_condition_label) {
            item.visibility_condition_label = (item.visibility_condition_label) ? JSON.parse(item.visibility_condition_label) : null;
            item.IsVisible = (item.visibility_condition_label) ? this.GetVisibilityDecision(item.visibility_condition_label) : true;
          }
        });
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

          //if (cnt.dt_code == 'select') {
          //  var i = 0;
          //  if (cnt.value != '' && cnt.select_options != null) {
          //    cnt.select_options.forEach(itemList => {
          //      if (itemList.value == cnt.value) {
          //        cnt.value = itemList.name;
          //        i++;
          //      }
          //    });
          //  }
          //  if (i == 0) {
          //    cnt.value = '';
          //  }
          //}
          if (cnt.ColumnName == 'OpportunityName') {
            this.OpportunityName = cnt.value;
          }

          if (cnt.ColumnName == 'AccountId') {

            this.topValue = cnt.value;
            this.opprAccountId = cnt.ref_value;
            this.opprAccountName = cnt.value;
          }

          if (cnt.ColumnName == 'ContactId') {
            this.opprContact = cnt.ref_value;
          }
          if (cnt.ColumnName == 'OwnerId') {
            this.ownerId = cnt.ref_value;

          }
          if (cnt.ColumnName == 'ContactId') {
            if (cnt.ref_value == null) {
              this.primaryContactId = 0;

            }
            else {
              this.primaryContactId = cnt.ref_value;
            }
          }
          if (cnt.ColumnName == 'ContractId') {
            if (cnt.ref_value == null) {
              this.primaryContractId = 0;

            }
            else {
              this.primaryContractId = cnt.ref_value;
            }
          }

          if (cnt.ColumnName == 'Primary_Proposal') {
            if (cnt.ref_value == null) {
              this.primaryProposalId = 0;

            }
            else {
              this.primaryProposalId = cnt.ref_value;
            }
          }

          if (cnt.ColumnName == 'CreatedAt') {
            cnt.display_name = "Created On"
          }

          if (cnt.ColumnName == 'LastModifiedById') {
            cnt.display_name = "Modified By"
          }

          if (cnt.ColumnName == 'ModifyAt') {
            cnt.display_name = "Modified On"
          }

          if (cnt.ColumnName == 'PurchaseType') {
            debugger;


            if (cnt.value == ('Cash') || cnt.value == null) {

              for (var i = 0; i < this.formControlList.length; i++) {
                if (this.formControlList[i].group_name.includes('Loan Product')) {
                  this.formControlList.splice(i, 1)
                }
              }
              // let groupCheck = this.formControlList.filter(y => y.group_name == 'Loan Products');
              // groupCheck[0].InnerData.forEach(function (t) {
              //   t.form_field_visibility = 'NO';
              //   t.edit_form_field_visibility = 'NO';
              //   t.view_form_field_visibility = 'NO'
              // })
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
        /////////////////////////////////Flowwww////////////////////////////

        let flowList = this.opprtunityservice.customFieldsList.executionFlow;

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
      setTimeout(() => {
        this.loadSave = false;
      }, 2000);
    },
      err => {
        this.loadSave = false;
      },
    );
  }

  GetCustomFieldsListTopRow() {
    this.displayType = 'VIEW_TOP';
    this.opprtunityservice.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe((result: any) => {
      if (result) {
        this.customCompnentValuesTop = this.opprtunityservice.customFieldsList.data;

        if (this.submoduleName == 'opportunity') {
          this.customCompnentValuesTop = this.customCompnentValuesTop.filter(x => x.display_name == 'Opportunity Owner'
            || x.display_name == 'Primary Proposal' || x.display_name == 'Utility Company' || x.display_name == 'Service Territory');
        }
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
          //if (cnt.dt_code == 'select') {
          //  if (cnt.value != '' && cnt.select_options != null) {
          //    cnt.select_options.forEach(itemList => {
          //      if (itemList.value == cnt.value) {
          //        cnt.value = itemList.name;
          //      }
          //    });
          //  }
          //}       
          if (cnt.ColumnName == 'AccountId') {
            this.topValue = cnt.value;
            this.opprAccountId = cnt.ref_value;
          }
          if (cnt.ColumnName == 'OwnerId') {
            this.ownerId = cnt.ref_value;
          }

        })
      }
    })
  };


  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSizeContact = this.commonService.masters;
    })
  }
  //======================================== SEND TO LOANHOMI ===========================================

  openSendToLoanHomi(e) {
    this.SendToLoanHomiModel.show12(e);
  }

  //=====================================================================================================
  //====================================== Get ContactsLists ============================================

  AddContact(id: any) {
    debugger;
    if (id) {
      this.Type = "Edit"
    }
    else this.Type = "Add"
    //this.router.navigate(['../contactlist/addContact/opportunity', this.opid]);
    this.EditContactId = id
    this.addContact.show();
    //this.contactcomponent.show(this.opid, 0);
  };

  closeContact() {
    this.addContact.hide();
  }
  getContactList() {
    this.leadservice.getContactList(this.opid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.ContactPageNo, this.pageSize, this.loginuserid).subscribe(response => {
      this.contactpagedData = this.leadservice.pagedData;
      this.contactCount = this.contactpagedData.pager.totalItems;
    })
  }
  setPageContact($event) {
    this.leadservice.getContactList(this.opid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.lstPageSizeContact, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.contactpagedData = this.leadservice.pagedData;
    })
  }

  DeleteContact(Id: any, name: any) {
    const message = `Are you sure you want to delete Contact "${name}"?`;
    this.dialogService.confirm('Delete Contact', message).subscribe(confirmed => {
      if (confirmed) {

        this.leadservice.DeleteContact(Id, this.opid, this.submoduleid, this.objectname).subscribe(r => {
          this.toaster.success(`Contact has been deleted successfully.`);

          this.getContactList();
        }, error => {
        });
      }
    });
  }

  //GetOpportunityContactsLists() {
  // 
  //  this.opprtunityservice.GetOpportunityContactsLists(this.opportunityId, this.sortColumn, this.sortDir, this.ContactPageNo, this.pageSize).subscribe(resp => {
  //    this.lstContacts = resp;
  //    this.contactCount = resp.pager.totalItems;
  //  });
  //}
  //setOpportunityContactPageNo($event) {
  //  this.ContactPageNo = $event.page;
  //  this.GetOpportunityContactsLists();
  //}
  //onOpportunityContactSort($event) {
  //  const sort = $event.sorts[0]
  //  this.sortDir = sort.dir;
  //  this.sortColumn = $event.column.prop;
  //  this.GetOpportunityContactsLists();
  //}
  //=============================================================================================================================

  //=================================================  Product ==================================================================
  refreshProductsList() {
    this.opprtunityservice.GetOpprtunityProductsList(this.opid, this.sortColumn, this.sortDir, this.ProductsPageNo, this.pageSize).subscribe(resp => {
      this.lstProducts = resp;
      this.productCount = resp.pager.totalItems;
    });
  }

  setProductsPageNo($event) {
    this.ProductsPageNo = $event.page;
    // this.refreshProductsList();
  }

  onProductsSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    //this.refreshProductsList();
  }
  //==============================================================================================================================


  //==================================================== WorkOrders ==============================================================
  refreshWorkOrdersList() {
    this.opprtunityservice.GetOpprtunityWorkOrderList(this.opid, this.sortColumn, this.sortDir, this.WorkOrderPageNo, this.pageSize).subscribe(resp => {
      this.lstWorkOrders = resp;
      this.workOrderCount = resp.pager.totalItems;
    });
  }
  setWorkorderPageNo($event) {
    this.WorkOrderPageNo = $event.page;
    this.refreshWorkOrdersList();
  }
  onWorkOrdersSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    this.refreshWorkOrdersList();
  }
  //==============================================================================================================================
  //==================================================== Contract ==============================================================
  refreshContractList() {
    this.opprtunityservice.GetOpprtunityContractList(this.opid, this.sortColumn, this.sortDir, this.ContractPageNo, this.pageSize).subscribe(resp => {
      this.lstContract = resp;
      this.ContractCount = resp.pager.totalItems;
    });
  }

  setContractPageNo($event) {
    this.ContractPageNo = $event.page;
    this.refreshContractList();
  }

  onContractSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    this.refreshContractList();
  }

  //================================================================================================================================
  //====================================================== Accounts ================================================================
  refreshAccountsList() {
    this.opprtunityservice.GetOpprtunityAccountsList(this.opid, this.sortColumn, this.sortDir, this.AccountPageNo, this.pageSize).subscribe(resp => {
      this.lstAccounts = resp;
      this.AccountsCount = resp.pager.totalItems;
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
    });
  }

  setAccountPageNo($event) {
    this.AccountPageNo = $event.page;
    this.refreshAccountsList();
  }

  onAccountSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    this.refreshAccountsList();
  }

  //================================================================================================================================
  //====================================================== Proposals ================================================================
  refreshProposalsList() {
    this.opprtunityservice.GetOpprtunityProposalsList(this.opid, this.sortColumn, this.sortDir, this.proposalPageNo, this.pageSize).subscribe(resp => {
      this.lstProposals = resp;
      this.proposalCount = resp.pager.totalItems;
    });
  }

  setProposalPageNo($event) {
    this.proposalPageNo = $event.page;
    this.refreshProposalsList();
  }

  onProposalSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    this.refreshProposalsList();
  }

  GetUtilityCompanyDll(id: any = 0) {
    this.opprtunityservice.GetUtilityCompanyDll(id, '0', this.searchText).subscribe((data: any) => {
      this.utilityCompanyList = data;
    })
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


  UtilityAccount() {
    this.Edit_Utility_Account();
  }

  Edit_Utility_Account() {
    this.row = this.lstAccounts.data[0];
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


    //this.edit_Utility_Proposal_Design_InformationForm.patchValue({
    //  Utility_Proposal_Id: row.Id,

    //  Utility_Company: row.UtilityCompanyId == null?null: row.UtilityCompanyId.toString(),
    //  Utility_Account_Number: row.Utility_Account_Number,
    //  Utility_Meter_Number: row.Utility_Meter_Number,
    //  No_Utility_Account_or_Meter_Number: row.No_Utility_Account_or_Meter_Number,
    //}); 
    this.edit_Utility_Proposal_Design_InformationPopupModel.show();
  };



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
        this.getRelatedObjects();
        this.loadSave = false;
        this.toaster.success(result.responseMessage);
        this.edit_Utility_Proposal_Design_InformationForm.reset();
        //this.refreshAccountsList();
        this.edit_Utility_Proposal_Design_InformationPopupModel.hide();
      }
      else {
        this.loadSave = false;
        this.toaster.error(result.responseMessage);
        //this.currentPageAssignedRes = 1;
        // this.refreshAccountsList();
      }

    }, error => {
      this.loadSave = false;
    });
  }

  closeUtility_Proposal_Design_InformationPopup() {
    this.edit_Utility_Proposal_Design_InformationPopupModel.hide();
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
  //================================================================================================================================
  addItem(newItem: boolean) {
    if (newItem) {
      this.GetCustomFieldsList();
      this.getContactList();
    }
  }

  //requestDesign() {
  //  this.Design.show();
  //}
  //closedesign() {
  //  this.Design.hide();   
  //}

  //oppDesignForm = this.fb.group({
  //  designOpportunityId: [null, Validators.nullValidator],
  //  designdate: ['', Validators.required],
  //  designTime: [null, Validators.nullValidator],
  //  designNotes: [null, Validators.nullValidator],
  //  adderNotes: [null, Validators.nullValidator]
  //});

  //get designOpportunityId() { return this.oppDesignForm.get('designOpportunityId'); }
  //get designTime() { return this.oppDesignForm.get('designTime'); }
  //get designdate() { return this.oppDesignForm.get('designdate'); }
  //get designNotes() { return this.oppDesignForm.get('designNotes'); }
  //get adderNotes() { return this.oppDesignForm.get('adderNotes'); }


  //submitdata() {
  //  if (this.oppDesignForm.valid) {
  //    this.desmodel.designOpportunityId = this.opid;

  //    this.desmodel.designNotes = this.oppDesignForm.value.description;
  //    let dtdate = new Date(this.oppDesignForm.value.designdate);
  //    this.desmodel.designdate = dtdate.toDateString();


  //    this.desmodel.designTime = this.oppDesignForm.value.designTime;

  //    this.fTime = new Date(this.desmodel.designTime);

  //    this.desmodel.designTime = this.fTime.getHours() + ":" + this.fTime.getMinutes();

  //    this.opprtunityservice.addDesignRequest(this.desmodel).subscribe((result: any) => {
  //      if (result.statusCode == 200) {
  //        this.toaster.success(result.responseMessage);
  //        this.router.navigate(["/calendar"]);
  //        //this.hideEvent.emit('abc');
  //        //this.addForm.reset();
  //        this.Design.hide();

  //      }
  //      else {
  //        this.toaster.error(result.responseMessage);

  //      }
  //    }, error => {
  //    });
  //  }
  //  else {
  //    this.commonService.validateAllFormFields(this.addForm);
  //  }
  //}

  closerequestdesign() {
    this.requestdesignModal.hide();
    this.selectedAction = "0";
  }

  convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();
    newDate.setHours(hours - offset);
    return newDate;
  }

  SaveRequestDesign() {
    const convertdatetime = new DateTimeToLocalForAddEditPipe();
    if (this.requesttitle == 'REQUEST DESIGN') {
      this.addRequestDesignForm.get('redisgnReason').setValidators(null);
      this.addRequestDesignForm.get('redisgnReason').setErrors(null);
    }
    if (this.addRequestDesignForm.valid) {
      this.requestDesign.RequestDate = (this.addRequestDesignForm.value.requestDate == '' ? null : this.commonService.getUserSelectedZoneToUTC(this.addRequestDesignForm.value.requestDate));
      //this.requestDesign.RequestDate = (this.addRequestDesignForm.value.requestDate == '' ? null : convertdatetime.transform(this.addRequestDesignForm.value.requestDate, null))
      //this.requestDesign.RequestDate = this.addRequestDesignForm.value.requestDate;
      this.requestDesign.designNotes = this.addRequestDesignForm.value.designNotes;
      this.requestDesign.adderNotes = this.addRequestDesignForm.value.adderNotes;
      //let dtdate = new Date(this.addRequestDesignForm.value.requestDate);
      //this.requestDesign.RequestDate = dtdate.toDateString();

      this.requestDesign.FromTime = this.addRequestDesignForm.value.requestDate;

      this.fTime = new Date(this.requestDesign.FromTime);

      this.requestDesign.FromTime = this.fTime.getHours() + ":" + this.fTime.getMinutes();
      // this.appmodel.ToTime = this.Tdate.getHours() + ":" + this.Tdate.getMinutes();
      this.requestDesign.OpportunityId = this.opid;
      this.requestDesign.redisgnReason = this.addRequestDesignForm.value.redisgnReason;
      this.requestDesign.isredisgn = this.isredesign;
      this.requestDesign.loanProduct = this.addRequestDesignForm.value.loanproduct;
      this.requestDesign.mountingLocation = this.addRequestDesignForm.value.mountainloaction;
      this.requestDesign.mainPanelUpgrade = this.addRequestDesignForm.value.main_panel;
      this.requestDesign.shopHasElectricalSubPanel = this.addRequestDesignForm.value.shopHasElectricalSubPanel;
      this.requestDesign.insulationUpgrade = this.addRequestDesignForm.value.Insulation_Upgrade;
      this.requestDesign.smartThermostatInstallation = this.addRequestDesignForm.value.Smart_Thermostat_Installation;
      this.requestDesign.maxRUpgrade = this.addRequestDesignForm.value.maxr;
      this.requestDesign.ledLightbulbUpgrade = this.addRequestDesignForm.value.Led;
      this.requestDesign.roofMaterial = this.addRequestDesignForm.value.roofMaterial;
      this.requestDesign.reRoofNeeded = this.addRequestDesignForm.value.reRoofNeeded;
      this.requestDesign.roofType = this.addRequestDesignForm.value.rooftype;
      this.opprtunityservice.SaveRequestDesignOpportunity(this.requestDesign).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);


          this.addRequestDesignForm.reset();
          this.requestdesignModal.hide();
          this.selectedAction = "0";
          this.GetCustomFieldsList();
          //this.compp.refreshData(this.opid,'opportunity');
          this.stageManagement.refreshData(this.opid, 'opportunity');
        }
        else {
          this.toaster.error(result.responseMessage);

        }
      }, error => {
      });
    }
    else {
      this.commonService.validateAllFormFields(this.addRequestDesignForm);
    }
  }

  showrequestdesignpopup() {
    this.GetlstloanproductData(this.opid);
    this.GetListmountain();
    this.opprtunityservice.GetOppDataById(this.opid).subscribe(resp => {
      this.opportunityData = resp;
      //validation check for open REQUEST DESIGN popup open
      //if (this.opportunityData.Loan_Product == null || this.opportunityData.Mounting_Location == null || this.opportunityData.ShopHasElectricalSubPanel == null || this.opportunityData.Roof_Type == null || this.opportunityData.Roof_Material == null || this.opportunityData.Re_Roof_Needed == null) {
      //    let message = "Please fill " + "''";
      //    if (this.opportunityData.Loan_Product == null || this.opportunityData.Loan_Product == "") {
      //      message += "Loan Product, "
      //    }
      //    if (this.opportunityData.Mounting_Location == null || this.opportunityData.Mounting_Location == "") {
      //      message += "Mounting Location, "
      //    }
      //    if (this.opportunityData.ShopHasElectricalSubPanel == null || this.opportunityData.ShopHasElectricalSubPanel == "") {
      //      message += "Shop Has Electrical Sub Panel, "
      //    }
      //    if (this.opportunityData.Roof_Type == null || this.opportunityData.Roof_Type == "") {
      //      message += "Roof Type, "
      //    }
      //    if (this.opportunityData.Roof_Material == null || this.opportunityData.Roof_Material == "") {
      //      message += "Roof Material, "
      //    }
      //    if (this.opportunityData.Re_Roof_Needed == null || this.opportunityData.Re_Roof_Needed == "") {
      //      message += "Re-Roof Needed, "  
      //    }
      //    message = message.replace(/,\s*$/, "");
      //    if (message.split(',').length > 1) {
      //      message = message.replace(/,(?=[^,]*$)/, ' and ');
      //    }
      //    message += "''" +" fields of this opportunity.";
      //    this.toaster.error(message);
      //    this.selectedAction = "0";
      //  }
      //  else {
      this.requesttitle = 'REQUEST DESIGN';
      this.isredesign = false;
      this.addRequestDesignForm.reset();
      this.addRequestDesignForm.get('redisgnReason').setValidators(null);
      this.addRequestDesignForm.get('designNotes').setValidators(null);
      this.addRequestDesignForm.updateValueAndValidity();
      this.requestdesignModal.show();
      this.GetRequestDesignOpportunity();
      // }    
    });
  }


  showRerequestdesignpopup() {
    this.GetlstloanproductData(this.opid);
    this.GetListmountain();
    this.opprtunityservice.GetOppDataById(this.opid).subscribe(resp => {
      this.opportunityData = resp;
      //validation check for Request Design Fill or not

      if (this.opportunityData.Request_Proposal_Design == null) {
        this.loadSave = false;
        this.toaster.error("You can't submit ReDesign request before design Request. Please submit Design request.");
        return false;
      }

      //validation check for open REQUEST RE DESIGN popup open
      //if (this.opportunityData.Loan_Product == null || this.opportunityData.Mounting_Location == null || this.opportunityData.ShopHasElectricalSubPanel == null || this.opportunityData.Roof_Type == null || this.opportunityData.Roof_Material == null || this.opportunityData.Re_Roof_Needed == null) {
      //  let message = "Please fill " + "''";
      //  if (this.opportunityData.Loan_Product == null || this.opportunityData.Loan_Product == "") {
      //    message += "Loan Product, "
      //  }
      //  if (this.opportunityData.Mounting_Location == null || this.opportunityData.Mounting_Location == "") {
      //    message += "Mounting Location, "
      //  }
      //  if (this.opportunityData.ShopHasElectricalSubPanel == null || this.opportunityData.ShopHasElectricalSubPanel == "") {
      //    message += "Shop Has Electrical Sub Panel, "
      //  }
      //  if (this.opportunityData.Roof_Type == null || this.opportunityData.Roof_Type == "") {
      //    message += "Roof Type, "
      //  }
      //  if (this.opportunityData.Roof_Material == null || this.opportunityData.Roof_Material == "") {
      //    message += "Roof Material, "
      //  }
      //  if (this.opportunityData.Re_Roof_Needed == null || this.opportunityData.Re_Roof_Needed == "") {
      //    message += "Re-Roof Needed, "
      //  }
      //  message = message.replace(/,\s*$/, "");
      //  if (message.split(',').length > 1) {
      //    message = message.replace(/,(?=[^,]*$)/, ' and ');
      //  }
      //  message += "''" +" fields of this opportunity.";
      //  this.toaster.error(message);
      //  this.selectedAction = "0";
      //}
      //else {
      this.isredesign = true;
      this.requesttitle = 'REQUEST REDESIGN';
      this.addRequestDesignForm.reset();
      this.addRequestDesignForm.get('redisgnReason').setValidators(Validators.required);
      this.addRequestDesignForm.get('designNotes').setValidators(Validators.required);
      this.addRequestDesignForm.updateValueAndValidity();
      this.getRedsignReason();
      this.requestdesignModal.show();
      this.GetRequestDesignOpportunity();
      //}
    });
  }

  ddlOpportunity(value) {

    let ths = this;
    if (value == "1") {
      this.makeAppointment();
    }
    else if (value == "2") {
      this.sendAutomaticContract();
    }
    else if (value == "3") {
      if (this.opprContact > 0) {
        this.showrequestdesignpopup();
      }
      else {
        this.toaster.error("Primary contact is not associated");
      }
    }
    else if (value == "4") {
      if (this.opprContact > 0) {
        this.showRerequestdesignpopup();
      }
      else {
        this.toaster.error("Primary contact is not associated");
      }
    }
    else if (value == "5") {
      this.GetWelcomecallNoteOpportunity();
    }
  }


  GetDDLState() {
    this.commonService.GetDDLListByFieldCode('State', this.moduleName, this.submoduleName).then(resp => {
      if (resp) {
        this.ddlStateList = JSON.parse(resp.toString());
      }
    }).catch(err => { console.log(err) });
  }

  GetDDLCountry() {
    this.commonService.GetDDLListByFieldCode('Country', this.moduleName, this.submoduleName).then(resp => {
      if (resp) {
        this.ddlCountryList = JSON.parse(resp.toString());
      }
    }).catch(err => { console.log(err) });
  }



  childEvent() {
    this.selectedAction = "0";
  };

  GetRequestDesignOpportunity() {
    this.opprtunityservice.GetRequestDesignOpportunity(this.opid).subscribe((result: any) => {
      //let fromtime = new Date(result.requestDate);
      let sDate = new Date(result.requestDate);
      this.clearValidations();
      this.clearFileds();
      if (result.requestDate != '0001-01-01T00:00:00') {
        //var mLocValue = this.lstMountain.filter(m => m.text = 'Shop');

        if (result.mountingLocation) {
          this.onCustomChange(result.mountingLocation);
          this.onroofMaterialChange(result.roofMaterial);
        }

        const convertdatetime = new DateTimeToLocalForAddEditPipe();
        this.addRequestDesignForm.patchValue({
          //requestDate: (result.requestDate == '' ? null : this.commonService.getUserSelectedZoneToUTC(sDate)),
          requestDate: (result.requestDate == null ? null : convertdatetime.transform(result.requestDate, null)),
          adderNotes: result.adderNotes,
          designNotes: result.designNotes,
          //requestDate: fromtime,
          //fromTime: fromtime,
          redisgnReason: result.redisgnReason,
          loanproduct: result.loanProduct,
          mountainloaction: result.mountingLocation,
          main_panel: result.mainPanelUpgrade,
          shopHasElectricalSubPanel: result.shopHasElectricalSubPanel == null ? null : parseInt(result.shopHasElectricalSubPanel),
          Insulation_Upgrade: result.insulationUpgrade,
          Smart_Thermostat_Installation: result.smartThermostatInstallation,
          maxr: result.maxRUpgrade,
          Led: result.ledLightbulbUpgrade,
          roofMaterial: result.roofMaterial == null ? null : parseInt(result.roofMaterial),
          reRoofNeeded: result.reRoofNeeded == null ? null : parseInt(result.reRoofNeeded),
          rooftype: result.roofType == null ? null : parseInt(result.roofType),
        })
      }
      else {
        let today = new Date();
        this.date1 = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
        this.fTime = new Date();
        this.fTime.getHours() + ":" + this.fTime.getMinutes();


        if (result.mountingLocation) {
          this.onCustomChange(result.mountingLocation);
          this.onroofMaterialChange(result.roofMaterial);
        }

        const convertdatetime = new DateTimeToLocalForAddEditPipe();
        this.addRequestDesignForm.patchValue({
          requestDate: null,
          adderNotes: result.adderNotes,
          designNotes: result.designNotes,
          redisgnReason: result.redisgnReason,
          loanproduct: result.loanProduct,
          mountainloaction: result.mountingLocation,
          main_panel: result.mainPanelUpgrade,
          shopHasElectricalSubPanel: result.shopHasElectricalSubPanel == null ? null : parseInt(result.shopHasElectricalSubPanel),
          Insulation_Upgrade: result.insulationUpgrade,
          Smart_Thermostat_Installation: result.smartThermostatInstallation,
          maxr: result.maxRUpgrade,
          Led: result.ledLightbulbUpgrade,
          roofMaterial: result.roofMaterial == null ? null : parseInt(result.roofMaterial),
          reRoofNeeded: result.reRoofNeeded == null ? null : parseInt(result.reRoofNeeded),
          rooftype: result.roofType == null ? null : parseInt(result.roofType),
        })
      }
    })
  };

  addRequestDesignForm = this.fb.group({
    loanproduct: [null, Validators.required],
    //startDate: [null, [Validators.required]],
    requestDate: [null, Validators.required],
    creditThresholdMet: [null, Validators.nullValidator],
    awareOfSolarTaxLiabilities: [null, Validators.nullValidator],
    awareOfSolarTaxCreditsItc: [null, Validators.nullValidator],
    homeOwner: [null, Validators.nullValidator],
    //fromTime: [null, Validators.required],
    shopHasElectricalSubPanel: [null, Validators.nullValidator],
    roofMaterial: [null, Validators.nullValidator],
    reRoofNeeded: [null, Validators.nullValidator],
    designNotes: [''],
    adderNotes: [''],
    Insulation_Upgrade: [null, Validators.nullValidator],
    main_panel: [null, Validators.nullValidator],
    Smart_Thermostat_Installation: [null, Validators.nullValidator],
    maxr: [null, Validators.nullValidator],
    Led: [null, Validators.nullValidator],
    rooftype: [null, Validators.nullValidator],
    redisgnReason: [null, Validators.required],
    mountainloaction: [null, Validators.required],
  })

  get requestDate() { return this.addRequestDesignForm.get('requestDate'); }
  get creditThresholdMet() { return this.addRequestDesignForm.get('creditThresholdMet'); }
  get awareOfSolarTaxLiabilities() { return this.addRequestDesignForm.get('awareOfSolarTaxLiabilities'); }
  get awareOfSolarTaxCreditsItc() { return this.addRequestDesignForm.get('awareOfSolarTaxCreditsItc'); }
  get homeOwner() { return this.addRequestDesignForm.get('homeOwner'); }
  get fromTime() { return this.addRequestDesignForm.get('fromTime'); }
  get designNotes() { return this.addRequestDesignForm.get('designNotes'); }
  get loanproduct() { return this.addRequestDesignForm.get('loanproduct'); }
  get rooftype() { return this.addRequestDesignForm.get('rooftype'); }
  get adderNotes() { return this.addRequestDesignForm.get('adderNotes'); }
  get redisgnReason() { return this.addRequestDesignForm.get('redisgnReason'); }
  get Insulation_Upgrade() { return this.addRequestDesignForm.get('Insulation_Upgrade'); }
  get shopHasElectricalSubPanel() { return this.addRequestDesignForm.get('shopHasElectricalSubPanel'); }
  get reRoofNeeded() { return this.addRequestDesignForm.get('reRoofNeeded'); }
  get roofMaterial() { return this.addRequestDesignForm.get('roofMaterial'); }



  get main_panel() { return this.addRequestDesignForm.get('main_panel'); }
  get maxr() { return this.addRequestDesignForm.get('maxr'); }
  get Led() { return this.addRequestDesignForm.get('Led'); }
  get mountainloaction() { return this.addRequestDesignForm.get('mountainloaction'); }
  makeAppointment() {
    this.makeappointment.showComponent('Opportunity', this.opid);
  }


  onSort(e) {
    const sort = e.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = e.column.prop;
    this.getContactList();
  }

  changeToValue(e) {
  }

  sendAutomaticContract() {
    var _this = this;
    var message = "Are you sure you want to Send Automatic Contract?";
    this.dialogService.confirm('Send automatic Contract', message).subscribe(function (confirmed) {
      if (confirmed) {
        _this.opprtunityservice.SendAutomaticContract(_this.opid).subscribe((result: any) => {
          if (result.statusCode == 200) {
            _this.toaster.success('Automatic Contract has been sent successfully');
          }
          if (result.statusCode == 201) {
            _this.toaster.success(result.responseMessage);
          }
          else {
            _this.toaster.error(result.responseMessage);
          }
          _this.selectedAction = "0";
        });
      } else {
        _this.selectedAction = "0";
      }
    });
  }

  OnBackToListClick() {
    // this.close();
    this.router.navigateByUrl("/opportunity");
    //this.location.back();
  }

  refreshPage(e: string) {
    this.loadSave = true;
    this.ngOnInit();
    // this.stageManagement.ngOnInit();
    this.compp.ngOnInit();
    this.loadSave = false;
  }
  GetlstcreditThresholdMet() {
    this.commonService.getMasterItemsList("QUALIFYINGQUESTIONS").subscribe((result: any) => {
      this.lstCreditThresholdMet = this.commonService.masters;
    })
  }
  GetListmountain() {
    this.commonService.getMasterItemsList("MountainList").subscribe((result: any) => {
      this.lstMountain = this.commonService.masters;
    })
  }
  GetListRoof() {
    this.commonService.getMasterItemsList("RoofList").subscribe((result: any) => {
      this.lstRoof = this.commonService.masters;
    })
  }

  GetlstloanproductData(id: any = null) {
    this.commonService.getScrollableData(id, 0, '', 'LoanProduct').subscribe((resultData: any) => {
      this.lstloanproduct = resultData;
    });
  }

  onCustomChange(e: any) {
    this.clearValidations();

    if (e) {
      if (e.value) {
        e = e.value;
        this.clearFileds();
      }
      this.opprtunityservice.GetCascadingData(e, this.moduleName, this.submoduleName, this.companyId).subscribe((result: any) => {
        if (result) {
          this.cascadingCompnentValues = this.opprtunityservice.cascadingFieldsList.data;
          this.cascadingCompnentValues.forEach(cascading => {
            if (cascading.form_controlName == "74_Roof_Type") {
              this.lstRoof = cascading.m;
              this.rMValidationSign = true;
              this.rooftype.setValidators([Validators.required]);
              this.rooftype.updateValueAndValidity();
              this.rooftype.enable();
            }
            else if (cascading.form_controlName == "76_Roof_Material") {
              this.lstRoofMaterial = cascading.m;
              this.rMValidationSign = true;
              this.roofMaterial.setValidators([Validators.required]);
              this.roofMaterial.updateValueAndValidity();
              this.roofMaterial.enable();
            }
            else if (cascading.form_controlName == "1161_ShopHasElectricalSubPanel") {
              this.lstShop = cascading.m;
              this.shopValidationSign = true;
              this.shopHasElectricalSubPanel.setValidators([Validators.required]);
              this.shopHasElectricalSubPanel.updateValueAndValidity();
              this.shopHasElectricalSubPanel.enable();
            }
          });
        }
      });

    }
    else {
      this.clearFileds();
    }

  }
  onroofMaterialChange(e: any) {
    if (e) {
      if (e.value) {
        e = e.value;
        this.reRoofNeeded.reset();

      }
      this.opprtunityservice.GetCascadingData(e, this.moduleName, this.submoduleName, this.companyId).subscribe((result: any) => {
        if (result) {
          let cascadingCompnentValues = this.opprtunityservice.cascadingFieldsList.data;
          cascadingCompnentValues.forEach(cascading => {
            if (cascading.form_controlName == "70_Re_Roof_Needed") {
              this.lstReRoofNeeded = cascading.m;
              this.reeRoofValidationSign = true;
              this.reRoofNeeded.setValidators([Validators.required]);
              this.reRoofNeeded.updateValueAndValidity();
              this.reRoofNeeded.enable();
            }
          })
        }
      });

    }
    else {
      this.reRoofNeeded.setValidators([Validators.nullValidator]);
      this.reeRoofValidationSign = false;
      this.lstReRoofNeeded = null;
      this.reRoofNeeded.reset();
      this.reRoofNeeded.disable();
    }
  }
  clearValidations() {
    this.roofMaterial.setValidators([Validators.nullValidator]);
    this.roofMaterial.updateValueAndValidity();
    this.rooftype.setValidators([Validators.nullValidator]);
    this.rooftype.updateValueAndValidity();
    this.shopHasElectricalSubPanel.setValidators([Validators.nullValidator]);
    this.shopHasElectricalSubPanel.updateValueAndValidity();
    this.reRoofNeeded.setValidators([Validators.nullValidator]);
    this.reRoofNeeded.updateValueAndValidity();
    this.rMValidationSign = false;
    this.reeRoofValidationSign = false;
    this.shopValidationSign = false;
  }

  clearFileds() {
    this.lstRoof = null;
    this.lstRoofMaterial = null;
    this.lstShop = null;
    this.lstReRoofNeeded = null;
    this.rooftype.reset();
    this.roofMaterial.reset();
    this.shopHasElectricalSubPanel.reset();
    this.reRoofNeeded.reset();
    this.rooftype.disable();
    this.roofMaterial.disable();
    this.shopHasElectricalSubPanel.disable();
    this.reRoofNeeded.disable();
  }

  AddMappingProposal(id: any) {
    this.appmodelPro.Ids = this.opid;

    if (id > 0) {
      this.addNewProposalmappingPopupModel.pageTitle = 'Edit Proposal';
      this.addNewProposalmappingPopupModel.show(id);
    }
    else {
      this.addNewProposalmappingPopupModel.pageTitle = 'Add Proposal';
      this.addNewProposalmappingPopupModel.show();
    }

  };
  AddMappingContract(id: any) {
    ;
    this.appmodelPro.Ids = this.opid;

    ;
    if (id > 0) {
      this.addNewContractmappingPopupModel.pageTitle = 'Edit Contract';
      this.addNewContractmappingPopupModel.show(id);
    }
    else {
      this.addNewContractmappingPopupModel.pageTitle = 'Add Contract';
      this.addNewContractmappingPopupModel.show();
    }

  };
  AddMappingWorkOrder(id: any) {
    ;
    this.appmodelPro.Ids = this.opid;

    if (id > 0) {
      ;
      this.addNewWorkOrdermappingPopupModel.pageTitle = 'Edit Work Order';
      this.addNewWorkOrdermappingPopupModel.show(id);
    }
    else {
      this.addNewWorkOrdermappingPopupModel.pageTitle = 'Add Work Order';
      this.addNewWorkOrdermappingPopupModel.show();
    }


  };

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
        this.loadSave = false;
      }, () => {
      })
  };

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
    }
  }
  welcomeNoteList: any;
  GetWelcomecallNoteOpportunity() {
    this.welcomenote = '';
    this.addwelcomenoteModel.show();
    this.opprtunityservice.GetWelcomecallNoteOpportunity(this.opid).subscribe((res: any) => {
      this.welcomeNoteList = res;
      this.welcomenote = res.welcomeCallNote;
    })
  }
  welcomenote: string = '';
  notewelcomeModel: welcomeNoteOpportunityModel = new welcomeNoteOpportunityModel();

  SaveWelcomecallNoteOpportunity() {
    this.loadSave = true;
    this.notewelcomeModel.WelcomeCallNote = this.welcomenote;
    this.notewelcomeModel.opid = this.opid;
    this.opprtunityservice.SaveWelcomecallNoteOpportunity(this.notewelcomeModel).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.toaster.success(res.responseMessage);
        this.refreshOpportunityDetailsSection();
        this.welcomenote = '';
        this.addwelcomenoteModel.hide();
        this.selectedAction = "0";
      }
      else {
        this.toaster.error(res.responseMessage);
      }
    })
    setTimeout(() => {
      this.loadSave = false;
    }, 3000);
  };

  closewelcomeNote() {
    this.addwelcomenoteModel.hide();
    this.selectedAction = "0";
  }



  appointmentRefresh() {
    this.appointmentlist.refresh();

  }


  CheckLoanProductAssociate() {
    this.opprtunityservice.CheckLoanProductAssociate(this.Id).subscribe((result: any) => {
      if (result) {
        this.isLoanProductAssociated = result;
      }
    })
  }
  refreshOpportunityDetailsSection() {
    this.formControlList = [];
    this.displayType = 'VIEW';
    this.opprtunityservice.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.opprtunityservice.customFieldsList.data;
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
                item.IsVisible = (item.visibility_condition_label) ? this.GetVisibilityDecision(item.visibility_condition_label) : true;
              }
            });
          }
        }

        //******************  merge groups and additional groups end here **********//
        this.formControlList.forEach((item, index) => {
          if (item.visibility_condition_label) {
            item.visibility_condition_label = (item.visibility_condition_label) ? JSON.parse(item.visibility_condition_label) : null;
            item.IsVisible = (item.visibility_condition_label) ? this.GetVisibilityDecision(item.visibility_condition_label) : true;
          }
        });
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
          if (cnt.ColumnName == 'OpportunityName') {
            this.OpportunityName = cnt.value;
            this.headerTitle = this.OpportunityName;
          }

          if (cnt.ColumnName == 'AccountId') {

            this.topValue = cnt.value;
            this.opprAccountId = cnt.ref_value;
            this.opprAccountName = cnt.value;
          }
          if (cnt.ColumnName == 'OwnerId') {
            this.ownerId = cnt.ref_value;
          }
          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])
        });

        this.form = new FormGroup(group);
      }
    },
      err => {
        this.loadSave = false;
      },
    )
  };

}

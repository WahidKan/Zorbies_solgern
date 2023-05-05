import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModuleList, CommonService } from '../shared/common.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoanapplicationserviceService, loansectionarray, reasonModel, BankerModel, LoanProgressModel, Progress } from './loanapplicationservice.service';
import { LoanapplicationpopupComponent } from './loanapplicationpopup/loanapplicationpopup.component';

import { CbilscoreComponent } from './cbilscore/cbilscore.component';
//import { OwlOptions } from 'ngx-owl-carousel-o';
import { StageinfoComponent } from './stageinfo/stageinfo.component';
import { DashboardService } from '../dashboard/dashboard.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LeadlistService } from '../lead/leadlist.service';
import { NotificationpopupComponent } from './notifications/notificationpopup/notificationpopup.component';
import { DownloaddocumentComponent } from './downloaddocument/downloaddocument.component';
import { ExpansesComponent } from './expanses/expanses.component';
import { transform } from 'html2canvas/dist/types/css/property-descriptors/transform';
import { AddcommenthistoryComponent } from './commenthistory/addmorecommenthistory/addcommenthistory.component';
import { CommenthistoryComponent } from './commenthistory/commenthistory.component';
import { NotesComponent } from './notes/notes.component';
import { LenderlistService } from '../lender/lenderlist.service';
import { LoandocsComponent } from './loandocs/loandocs.component';
import { CreditReportComponent } from './credit-report/credit-report.component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { environment } from '../../../environments/environment';
import { RuleEngineService } from '../rule-engine/rule-engine.service';
import { groupBy, mergeMap } from 'rxjs/operators';
//import { forEach } from '@angular/router/src/utils/collection';  
import { RuleenginehistoryComponent } from './ruleEngineHistory/ruleenginehistory.component';
import { Subject } from 'rxjs';
//import { setTimeout } from 'timers';
import { ChangeorderComponent } from './changeorder/changeorder.component';
import * as signalR from '@aspnet/signalr';
import { Item } from '@syncfusion/ej2-splitbuttons';
import { TransferloanapplicationComponent } from './transferloanapplication/transferloanapplication.component';
import { TranfertodealerComponent } from './tranfertodealer/tranfertodealer.component';
import { SystemInfoComponent } from './systeminfo/systeminfo.component';
import { PropertysearchComponent } from './propertysearch/propertysearch.component';
import { Location } from '@angular/common';
//import { setTimeout } from 'timers';
@Component({
  selector: 'app-loanapplicationdetail',
  templateUrl: './loanapplicationdetail.component.html',
  styleUrls: ['./loanapplicationdetail.component.scss']
})
export class LoanapplicationdetailComponent implements OnInit {
  salesRepList: any;
  searchTxt = '';
  lstUserType: any;
  isStageInfoEnabled: boolean = true; // for init the modal stage
  AssignedSalesUsers: any;
  applicationNumber: any;
  appNumber: any;
  applicantName: string;
  DocVerified = 0;

  @ViewChild('assignpopup', { static: false }) assignpopupModel: ModalDirective;
  @ViewChild('ruleProgressModel', { static: false }) ruleProgressModel: ModalDirective;
  @ViewChild('UnCancelReason', { static: false }) UnCancelReasonModal: ModalDirective;
  applicantemail = "";
  bankerModel: BankerModel = new BankerModel()
  listBankerNameFilter = '';
  isBanker: boolean = false;
  isFinanceUser: boolean = false;
  isSales: boolean = false;
  isCompanyAdmin: boolean = false;

  //@ViewChild('property', { static: false }) property: PropertysearchComponent;      
  @ViewChild('userTypeSelect', { static: false }) userTypeSelect: NgSelectComponent;
  @ViewChild('salesassignpopup', { static: false }) salesassignpopupModel: ModalDirective;
  @ViewChild('showtransferAppPopUp', { static: false }) showtransferAppPopUp: TransferloanapplicationComponent;
  @ViewChild('showtransfertoDealerPopUp', { static: false }) showtransfertoDealerPopUp: TranfertodealerComponent;
  @ViewChild('generatePopUp', { static: false }) generatePopUp: ModalDirective;
  assignedData: any[] = [];
  isCancelRequest = 0;
  assignedBankerData: any[] = [];
  listNameFilter = '';
  searchUserType = '';
  sortDirBankerList = 'desc';
  sortDirSalesList = 'desc';
  lstPageSizeBankerList: any
  pageSizeValueBankerList: number;
  pageSizeValueSalesList: number;
  currentPage: number;
  currentPageSalesUserList: number;
  currentPageBankUserList: number;
  totalFailed: number = 0;
  loanAppid: any;
  data: any = [];
  Applicants = [];
  HasCoApplicant: boolean;
  ChangeOrderDocumentCount: number = 0;
  changeOrderDocWithR_F_S: number = 0;
  //Bureaus = [
  //  { value: 1, name: 'Equifax' }
  //];
  @ViewChild('AddReason', { static: false }) AddReasonModal: ModalDirective;
  @ViewChild('AddCancelReason', { static: false }) AddCancelReasonModal: ModalDirective;
  @ViewChild('DenyReason', { static: false }) denyReason: ModalDirective;

  isFrozen: boolean = false;
  isFraudulent: boolean = false;
  isProductInfoApproved: boolean = false;
  smsData: any;

  Scores = [
    { Score: 655, Case: "<670" },
    { Score: 680, Case: ">670" },
    { Score: 690, Case: "690" },
    { Score: 665, Case: "0-669" },
    { Score: 730, Case: "710-749" },
    { Score: 755, Case: "750+" },
    { Score: 670, Case: "650-669" },
    { Score: 705, Case: "670-709" },
    { Score: 740, Case: "710-749" },
  ];

  enableTestCreditPull = false;

  reasonmodel: reasonModel = new reasonModel();
  Bureaus = [];
  isflag: boolean = false;
  isShowAudit: boolean = false;

  applicantCreditScoreData = [];
  coApplicantCreditScoreData = [];
  @ViewChild('notificationPopup', { static: false }) notificationPopup: NotificationpopupComponent;
  @ViewChild('commentHistory', { static: false }) commentHistory: CommenthistoryComponent;
  @ViewChild('RuleEngineHistory', { static: false }) RuleEngineHistory: RuleenginehistoryComponent;
  PendingRulesForExecution: any[] = [];
  @ViewChild('AddNotes', { static: false }) AddNotesModal: NotesComponent;
  @ViewChild('documentModal', { static: false }) documentModal: DownloaddocumentComponent;
  @ViewChild('creditReport', { static: false }) creditReport: CreditReportComponent;
  @ViewChild('changeOrderPopup', { static: false }) changeOrderModel: ChangeorderComponent;
  companyId: any;
  isSubmitted = false;
  userId: any;
  formdata1: any;
  formstagedata: any;
  formstagedatamaster: any;
  formstagearray: loansectionarray[];
  loading = false;
  pageTitle: string;
  submitteddate: string;
  loanId: any; accid: string;
  loadSave: boolean = false;
  totalDocument: any;
  recieveDocument: any;
  requireDoc: any;
  timeout: any;
  isValid = true;
  fileExtension: any;
  pendingDoc: any;
  IsLACanceledFlag: boolean = false;
  ApplicationStatus: string;
  CancelledStage = 0;
  loanApplicationId: any;
  docinfo: any;
  finusers: any = null;
  //bankusers: any = null;
  bankUsers: any = null;
  docClass = 'col-xl-12';
  loanApplicationData: any;
  loanApplicationNumberData: any;
  loanApplicationDetail: any;
  LoanApplicationProductDetail: any;
  loanApplicationSalesRape: any;
  loanApplicationfinanceDetail: any;
  loanApplicationPaymentDetails: any;
  fileNameddlvalue: any;
  internalVerification: boolean = false;
  LoanApplicationNumber: any;
  SFOpportunityId: any;
  @ViewChild('myTable', { static: false }) table: any;
  @ViewChild('fileInput', { static: false }) fileInput;
  @ViewChild('stageInfo', { static: false }) stageInfo: StageinfoComponent;
  @ViewChild('fileuploadddl', { static: false }) fileuploadddl: NgSelectComponent;

  @ViewChild('ApplicantDrop', { static: false }) ApplicantDrop: NgSelectComponent;
  @ViewChild('BureauDrop', { static: false }) BureauDrop: NgSelectComponent;
  @ViewChild('testDrop', { static: false }) testDrop: NgSelectComponent;

  @ViewChild('expenses', { static: false }) expenses: ExpansesComponent;

  @ViewChild('loandocs', { static: false }) loandocs: LoandocsComponent;

  @ViewChild('sysInfo', { static: false }) sysInfo: SystemInfoComponent;

  @ViewChild('showReasonPopUp', { static: false }) showReasonPopUpModal: ModalDirective;

  fileName = 'Choose file';
  lstfiletype: any; usertype: string;
  fileImageName: any;
  fileuplist: any;
  lstdata: any;
  pagedData: any = {
    pager: {},
    data: []
  };
  sortColumnBankerList = 'CreatedOn';
  sortColumnSalesList = 'CreatedOn';
  @Input() offsetSaleUser: number;
  @Input() offsetBankUser: number;
  pagedDataBankerList: any = {
    pager: {},
    data: []
  };
  pagedDataSalesList: any = {
    pager: {},
    data: []
  };
  sortDir = 'desc';
  sortColumn = 'CreatedOn';
  lstPageSize: any
  pageSizeValue: number;
  sectionId: any;
  tableName: any;
  auditDetailData: any;
  detailData: any;
  isContact: boolean = false;
  generateButtonName = "Generate Document";
  showOverride: boolean = false;
  isOverRide: boolean = false;
  isOverridden: boolean = false;
  internalVerificationStageActive: any;
  modulePermission: any[] = [];
  canOverride: boolean = false;
  canGeneratedoc: boolean = false;
  canAssign: boolean = false;
  canCancel: boolean = false;
  ruleList: any[] = [];
  loader: boolean = false;
  isContactUser: boolean = false;
  messageCount: number = 0;
  shouldGenerateDocumentVisible = false;
  isChangeOrderPlaced: boolean = false;
  isChangeOrderApproved: boolean = false;
  isNTPFundReleaseApproved: boolean = false;
  bureauItem: any;
  ReasonFrom: string;
  denyReasonField: string;
  showDenyPopup: boolean = false;
  ntpApprovedFlag: boolean = false;
  DocSignedApprovedFlag: boolean = false;
  showCOBtn: boolean = false;
  opr: string;
  IsNTPChangeOrderDone: boolean = false;
  isDealerUser: boolean = false;
  roleCode: string = '';
  isDealerAccount: boolean = false;
  dealerAccId: any;
  showLoanDocs: boolean = false;
  showOverrideForExecutive: boolean = false;
  showCreditReportButtons: boolean = false;
  IsAllApplicationStageCompleted: boolean = false;
  shouldVoidChangeOrderVisible: boolean = false;
  CancelledBy: string = null;
  UnCancelledBy: string = null;
  usernames: any = null;
  relationshipUsers: any = null;
  AccountingUsers: any = null;
  AuditUsers: any = null;
  isRealtionshipUser: boolean = false;
  isAccountingUser: boolean = false;
  isAudit: boolean = false;
  borrowerPhoneNumber: any = null;
  isDealerSaleFinManagerUser: boolean = false;
  loaderCommon: boolean = false;
  hideChangeOrderButton: boolean = false;
  isNTPCO: boolean = false;
  CustName: string;
  SourceType: string = "";
  DealerName: string = "";
  isdealerFinanceUser: boolean = false;
  financeNTP: boolean = true;
  showBackToReportBtn: boolean = false;
  backurl = '/loanApplication';
  PrimarySigner: string = "";
  SecondarySigner: string = "";
  hidegenerateDocBySecSignerButton: boolean = true;
  transferpagedData: any = {
    pager: {},
    data: []
  };
  showTransferPanel: boolean = false;
  showCompletedDate: boolean = false;
  ptoDate: any;
  isInternalVerification: boolean = false;

  constructor(private router: Router, private toaster: ToastrService, private dashboardService: DashboardService, private fb: FormBuilder, private route: ActivatedRoute, private commonService: CommonService,
    private dialogService: ConfirmationDialogService, private lenderService: LenderlistService,
    private leadservice: LeadlistService, private loanapplicationservice: LoanapplicationserviceService,
    private ruleEngineService: RuleEngineService, private location: Location) {

    this.ruleStartNotification();
    this.ruleCompletionNotification();
    this.targetCompletionNotification();

    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    //// console.log("this.modulePermission ", this.modulePermission)

    let override = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'LOANAPPLICATIONOVERRIDE');
    if (override == undefined) {
      override = "null";
    } else {
      this.canOverride = true;
    }
    let generate = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'LOANAPPLICATIONGENERATEDOCUMENT');
    if (generate == undefined) {
      generate = "null";
    } else {
      this.canGeneratedoc = true;
    }
    let cancel = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'LOANAPPLICATIONCANCEL');
    if (cancel == undefined) {
      cancel = "null";
    } else {
      this.canCancel = true;
    }
    let Assign = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'LOANAPPLICATIONASSIGN');
    if (Assign == undefined) {
      Assign = "null";
    } else {
      this.canAssign = true;
    }

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;

      //--23 April-------------------------------
      this.roleCode = userdetail.roleCode;
      //---------------------------------


      if (this.roleCode == 'dealer_finance_user' || this.roleCode == 'dealer_finance_manager') {
        this.isdealerFinanceUser = true;
      }


      this.usertype = localStorage.getItem("usertype");

      this.showLoanDocs = false;

      this.showOverrideForExecutive = false;

      if (userdetail.userType == "usertypecompanyadmin") {
        this.showLoanDocs = true;
        this.showOverrideForExecutive = true;
        this.showCreditReportButtons = true;
      }
      else if (userdetail.userType == "usertypebanker") {
        this.showLoanDocs = true;
      }
      else//if (userdetail.userType == "usertypecommonuser")
      {
        if (userdetail.roleCode == "relationship_manager" || userdetail.roleCode == "relationship_director" || userdetail.roleCode == "Accounting_User" || userdetail.roleCode == "Accounting_Director"
          || userdetail.roleCode == "dealer_finance_user" || userdetail.roleCode == "dealer_finance_manager" || userdetail.roleCode == "dealer_sales_user" || userdetail.roleCode == "dealer_sales_manager" || userdetail.roleCode == "dealer_companyadmin") {
          this.showLoanDocs = true;
        }
        if (userdetail.roleCode == "relationship_manager" || userdetail.roleCode == "relationship_director") {
          this.showOverrideForExecutive = true;
        }
        if (userdetail.roleCode == "relationship_manager" || userdetail.roleCode == "relationship_director") {
          this.showCreditReportButtons = true;
        }
      }
      if (userdetail.userType == "usertypecontact") {
        this.isContact = true;
      }
      //--23 April-------------------------------
      if (userdetail.userType === "usertypedealer") {
        this.isDealerUser = true;
        this.isDealerSaleFinManagerUser = false;
        if (userdetail.roleCode == "dealer_finance_manager" || userdetail.roleCode == "dealer_sales_manager" || userdetail.roleCode == "dealer_companyadmin") {
          this.isDealerSaleFinManagerUser = true;
        }
      }
      else {
        this.isDealerUser = false;
        this.isDealerSaleFinManagerUser = false;
      }

      if (userdetail.userType === "usertyperelationship") {
        this.isRealtionshipUser = true;
      }
      else {
        this.isRealtionshipUser = false;
      }

      if (this.usertype.toLocaleLowerCase() === "usertypecommonuser") {
        this.isAccountingUser = true;
      }
      if (this.usertype.toLocaleLowerCase() === "usertypeaudit") {
        this.isAudit = true;
      }




      //---------------------------------


    });
    this.commonService.getMasterItemsList("manageuser_usertype_add").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
      //// console.log("this.lstUserType", this.lstUserType);
    })
  }

  sharelink(id, type: string) {

    var message = "";
    if (type == 'SMS') {
      if (this.borrowerPhoneNumber == null || this.borrowerPhoneNumber == '') {
        this.toaster.error(`Please enter the mobile number of applicant.`);
      }
      else {
        message = `Are you sure you want to share the upload document link vai text messsge?`;
        this.dialogService.confirm('Share Link', message).subscribe(confirmed => {
          if (confirmed) {
            this.loanapplicationservice.ShareDocLink(id, type, this.borrowerPhoneNumber, this.CustName).subscribe(response => {
              this.toaster.success(`Link has been shared successfully.`);
            });
          }
        });
      }
    }
    else {
      message = `Are you sure you want to share the upload document link?`;
      this.dialogService.confirm('Share Link', message).subscribe(confirmed => {
        if (confirmed) {
          this.loanapplicationservice.ShareDocLink(id, type, this.borrowerPhoneNumber, this.CustName).subscribe(response => {
            this.toaster.success(`Link has been shared successfully.`);
          });
        }
      });
    }


  }



  close() {

  }




  checkPermission1(privilege: string): boolean {

    // // console.log('privilegexxx1', privilege)
    return false;
    //const moduledata = JSON.parse(localStorage.getItem('moduleList'));
    //let checkrole = moduledata.find(m => m.privilegecode.toUpperCase() == privilege);

    //if (checkrole == undefined) {
    //  return false;
    //} else {
    //  return true;
    //}

  }
  //customOptions: OwlOptions = {
  //  loop: false,
  //  mouseDrag: true,
  //  touchDrag: true,
  //  pullDrag: true,
  //  dots: false,
  //  navSpeed: 700,
  //  autoWidth: true,
  //  margin: 10,
  //  // startPosition:20,
  //  navText: [
  //    '<button type="button" role="presentation" class="owl-prev"><span aria-label="Previous">‹</span></button>',
  //    '<button type="button" role="presentation" class="owl-next disabled"><span aria-label="Next">›</span></button>'],
  //  responsive: {
  //    0: {
  //      items: 1
  //    },
  //    400: {
  //      items: 2
  //    },
  //    740: {
  //      items: 3
  //    },
  //    940: {
  //      items: 4
  //    }
  //  },
  //  nav: true
  //}

  progress: number;
  loanProgressModel: LoanProgressModel = new LoanProgressModel();
  configModel = {
    backdrop: true,
    ignoreBackdropClick: false
  };
  ngOnInit(): void {
    debugger;
    this.backurl = this.commonService.getPreviousUrl();


    var url = this.commonService.getPreviousUrl().indexOf("loanApplicationReport");
    if (url == 1) {
      this.showBackToReportBtn = true;
    }

    this.loanId = 0;
    this.loadSave = true;
    this.pageSizeValue = 10;
    this.pageSizeValueBankerList = 10;
    this.pageSizeValueSalesList = 10;

    this.currentPageSalesUserList = 1;
    this.currentPageBankUserList = 1;
    this.getPageSizes();
    this.getLoanAppTablesList();


    this.loanapplicationservice.isapplicantCreditScore.subscribe((data: string) => {
      this.pullCreditScore(false, null, data);
    });




    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loanId = id;


        this.fillLeadForm(id);

        this.GetLoanApplicationSales_Rep(id);
        //this.refresh();
        this.loadSave = false;
        this.getDocumentForReceiveAndPending();

      }
      else {
        // this.pageTitle = 'Add Form Master';
      }
    });
    this.loanapplicationservice.loanProgress = new Subject<LoanProgressModel>();
    //this.applicationStatusStartNotification();
    this.applicationStatusCompletionNotification();

    this.loanapplicationservice.loanProgress.subscribe((m: LoanProgressModel) => {
      this.loanProgressModel = m;

      if (m.appyingChanges == Progress.start) {
        this.messageCount = 0;
        this.getLoanApplicationRuleList(this.loanId, 'ON_CREATE_AND_UPDATE');
        if (this.commonService.hubConnection.state == signalR.HubConnectionState.Disconnected) {
          this.commonService.hubConnection.start().catch(m => { }).then(m => {
            //// console.log('signal r initialize');
            this.commonService.getConnectionID().subscribe((a: any) => {
              //// console.log('connection detail: ', a)
              if (typeof a != 'undefined' && a != null && a != "") {
                this.commonService.ConnectionID = JSON.parse(a).connnectionId;
                localStorage.setItem('connectionID', JSON.parse(a).connnectionId);
              }
            });
          });
        }
      } else if (m.applyingRules == Progress.start) {
        this.messageCount = 0;

        this.connectionId = localStorage.getItem('connectionID');

        //// console.log('connectionId: ', this.connectionId);
        //// console.log('commonService.ConnectionID: ', this.commonService.ConnectionID);

        this.executeRuleTarget(this.loanId, 'ON_CREATE_AND_UPDATE', this.commonService.ConnectionID);

      } else if (m.appyingChanges == Progress.failed) {
        //// console.log('appyingChanges');
        //// console.log('1 TotalRulesFailed', this.totalRulesFailed);
        if (this.totalRulesFailed == 0) {
          //// console.log('2 TotalRulesFailed', 0);
          this.loanProgressModel.finalizing = Progress.completed;
          //this.ruleProgressModel.hide();
          //// console.log('3 TotalRulesFailed', 0);
          //this.ruleProgressClose();
        }
      }
    });

    window.addEventListener('scroll', this.scrollEvent, true);
    this.isBanker = false;
    this.isDealerAccount = false;
    this.isFinanceUser = false;
    this.isSales = false;
    this.isCompanyAdmin = false;

    this.isShowAudit = true;
    if (this.usertype.toLocaleLowerCase() != 'usertypebanker') {
      this.isflag = true;
    }
    if (this.usertype.toLocaleLowerCase() == 'usertypedealer') { this.isShowAudit = false; }

    if (this.usertype.toLocaleLowerCase() == "usertypecompanyadmin") {
      this.isCompanyAdmin = true;
    }
    else {
      this.isCompanyAdmin = false;
    }
    if (this.usertype.toLocaleLowerCase() === "usertypefinance") {
      this.isFinanceUser = true;

    }
    if (this.usertype.toLocaleLowerCase() === "usertypecontact") {
      this.isContactUser = true;

    }
    else {
      this.isFinanceUser = false;
    }

    if (this.usertype.toLocaleLowerCase() === 'usertypebanker') {
      this.isBanker = true;
    }

    if (this.usertype.toLocaleLowerCase() === 'usertypedealer') {
      this.isDealerAccount = true;
    }
    if (this.usertype.toLocaleLowerCase() === 'usertypesales') {
      this.isSales = true;
    }

    //this.commonService.getMasterItemsList('PrerequisiteLoanProductDocumentType').subscribe((result: any) => {
    //  this.lstfiletype = this.commonService.masters;

    //})

    this.loanapplicationservice.getCreditBureauList().subscribe(resp => {
      
      this.Bureaus = resp;

      let tempBureau = this.Bureaus.filter(b => b.BureauName == "Equifax");

      if (tempBureau.length > 0) {
        this.bureauItem = tempBureau[0].Id;
      }

      //resp.forEach(item => {
      //  this.Bureaus.push({ value: item.Id, name: item.BureauName});
      //});
    });
    this.GetLoanApplicationData(this.loanId);

    this.enableTestCreditPull = environment.enableTestCreditPull;
    //// console.log('stageInfo', this.stageInfo);
    this.isStageInfoEnabled = true;

    this.getTransferLoanApplicationList();

  }

  GetLoanapplicationDocumentType(id) {
    this.loanapplicationservice.GetLoanapplicationDocumentType(id).subscribe((data: any) => {
      //// console.log('GetLoanapplicationDocumentType', data);
      //this.lstfiletype = data;
      if (this.isContactUser == true) {
        this.lstfiletype = data.filter(function (itm) { return (itm.documentType != "Install Agreement" && itm.documentType != "Install Agreement*") });
      }
      else {
        this.lstfiletype = data;
      }

    })

  }

  viewAccountDetail(id: any) {
    this.router.navigateByUrl('/accountslist/viewaccount/' + id);
  }

  formstagedatasub(item) {

    var itemsdata = this.formstagedata.filter(x => x.ParentId == item);
    itemsdata= itemsdata.sort((item1,item2)=>{
      if (item1.display_order>item2.display_order)
      {return 1;}
      else if (item1.display_order<item2.display_order)
      {
        return -1;
      }
      else return 0;
    })
    return itemsdata;
  }

  checksubchildsq(item) {

    var itemsdata = this.formstagedata.filter(x => x.ParentId == item && x.SequenceType == 'Sequence');
    return itemsdata.length > 0;
  }
  trackByfn(index, item) {
    return item.loan_app_stage_id;
  }
  checksubchildpar(item) {

    var itemsdata = this.formstagedata.filter(x => x.ParentId == item && x.SequenceType == 'Parallel');
    return itemsdata.length > 0;
  }

  fillLeadForm(id) {

    this.loadSave = true;
    //// console.log("starting");
    this.GetLoanapplicationDocumentType(id);
    this.loading = true;
    this.loanapplicationservice.GetApplicationDetails(id, this.companyId, this.userId).subscribe((result: any) => {
      this.formdata1 = this.loanapplicationservice.applicationInfo;
      console.log("LoanApplicationDeatilPage", this.formdata1);
      if (this.formdata1.PrimarySigner == 'DocuSign') {
        this.PrimarySigner = 'DocuSign';
        this.SecondarySigner = 'SignNow';
        //// console.log("SecondarySigner if", this.SecondarySigner);
      }
      else {
        this.PrimarySigner = 'SignNow';
        this.SecondarySigner = 'DocuSign';
        //// console.log("SecondarySigner else", this.SecondarySigner);
      }

      if (this.formdata1.ApplicationStatus == 'Failed' || this.generateButtonName == "Void Document") {
        this.hidegenerateDocBySecSignerButton = false;
      }
      else {
        this.hidegenerateDocBySecSignerButton = true;
      }



      //// console.log("Detail data", this.formdata1);

      this.accid = this.formdata1.AccountId;
      this.ApplicationStatus = this.formdata1.ApplicationStatus;
      this.isOverRide = this.formdata1.IsOverride;
      this.IsLACanceledFlag = this.formdata1.IsCancelled;
      this.CancelledStage = this.formdata1.CancelledStage;
      let doc_info = this.formdata1.DocumentInfo;
      let pendingRules = this.formdata1.PendingRulesForExecution;
      this.PendingRulesForExecution = JSON.parse(pendingRules);
      //// console.log('PendingRulesForExecution', this.PendingRulesForExecution);
      this.finusers = JSON.parse(this.formdata1.FinanceUsers);
      this.bankUsers = JSON.parse(this.formdata1.BankUsers);
      this.LoanApplicationNumber = this.formdata1.LoanApplicationNumber;
      this.SFOpportunityId = this.formdata1.SFOpportunityId;
      this.applicantemail = this.formdata1.Email
      //// console.log('this.applicantemail', this.applicantemail);
      this.docinfo = JSON.parse(doc_info);
      this.DocVerified = this.formdata1.DocVerified;
      this.borrowerPhoneNumber = this.formdata1.BusinessPhone;
      this.CustName = this.formdata1.ApplicantName;
      this.SourceType = this.formdata1.SourceType;
      this.DealerName = this.formdata1.DealerName;

      //  this.loanapplicationservice.isproductenable.next(this.formdata1.IsProductEnable);
      if (this.IsLACanceledFlag) { this.isflag = false; }
      this.getImages();
      if (this.isOverRide == true) {
        this.isOverridden = true;
        this.showOverride = false;
      }

      this.usernames = JSON.parse(this.formdata1.UserNames);

      this.usernames.forEach((item1) => {
        this.CancelledBy = item1.CancelledByUser;
        this.UnCancelledBy = item1.UnCancelledByUser;
      });


      this.relationshipUsers = JSON.parse(this.formdata1.RelationshipUsers);
      this.AccountingUsers = JSON.parse(this.formdata1.AccountingUsers);
      this.AuditUsers = JSON.parse(this.formdata1.AuditUsers);

      this.loanapplicationservice.GetStageDetails(id).subscribe((result: any) => {
        this.formstagedata = [];
        this.formstagedata = this.loanapplicationservice.stageInfo;
        // console.log('formstagedata:', this.formstagedata)


        this.formstagearray = [];
        let flag = 0;
        //// console.log("getFundReleaseStageId", this.getFundReleaseStageId())

        if (this.isDealerUser == true) {
          this.formstagedatamaster = this.formstagedata.filter(function (item) { return ((item.ParentId == null) || (item.ParentId != null && (item.loan_app_stage_name == "Installer Funding" || item.loan_app_stage_name == "Install Step" || item.loan_app_stage_name == "NTP Funding" || item.loan_app_stage_name == "Audit"))) });
        } else {
          this.formstagedatamaster = this.formstagedata.filter(item => item.ParentId == null);
        }


        this.formstagedata.forEach((item1) => {

          //m.stageSelectedClass= "ui-open"
          if (item1.stageclass == 'step-green') {
            item1.stageclass = "ui-done"
          }
          else if (item1.stageclass == 'step-orange') {
            item1.stageclass = "ui-current"
          }
          else if (item1.stageclass == 'step-grey') {
            item1.stageclass = ""
          }
          // else
          // {
          //   item1.stageclass = "ui-current"
          // }
          // if (item1.stageclass == 'ui-current') {

          //   item1.stageclass = '';// 'step-green';


          // }
          if ((item1.loan_app_stage_name == "Loan Product" || item1.loan_app_stage_name == "Product Info" || item1.loan_app_stage_name == "Documents Signed" || item1.loan_app_stage_name == "Internal Verification") && item1.stageActive == 1 && (this.ApplicationStatus === 'Failed' || this.ApplicationStatus === 'Pending Documents')) {

            this.internalVerificationStageActive = item1.stageActive;
            this.showOverride = true;
            if (this.isOverRide == true) {
              this.isOverridden = true;
              this.showOverride = false;
            }

          }
          if (item1.loan_app_stage_name == "Internal Verification" && item1.stageapproved == 1) {
            this.isInternalVerification = item1.stageapproved == 1 ? true : false
          }

          if (item1.loan_app_stage_name == "NTP(CO)" && item1.stageapproved == 1) {
            this.isNTPCO = true
          }

          if (item1.loan_app_stage_name == "PTO" && item1.stageapproved == 1) {
            this.showCompletedDate = true
            this.ptoDate = item1.StageSubmittedDate;
          }

          //if (this.isdealerFinanceUser && (item1.loan_app_stage_name == "NTP" && item1.stageapproved == 1)) {
          //  if (item1.loan_app_stage_name == "NTP(CO)") {
          //    if (item1.loan_app_stage_name == "NTP(CO)" && item1.stageapproved == 1) {
          //      this.isNTPFundReleaseApproved = true;
          //    }
          //  }
          //  else {
          //    this.isNTPFundReleaseApproved = true;
          //  }
          //}

          if (this.isdealerFinanceUser && (item1.loan_app_stage_name == "NTP" && item1.stageapproved == 1)) {
            this.financeNTP = false;
          }
          if (this.isdealerFinanceUser && (item1.loan_app_stage_name == "NTP(CO)" && item1.stageapproved == 1)) {
            this.financeNTP = false;
          }



          if (item1.loan_app_stage_name == "Fund release" && item1.stageapproved == 1) {
            this.isNTPFundReleaseApproved = true
            if (this.isBanker) {
              this.showCompletedDate = true
              this.ptoDate = item1.StageSubmittedDate;
            }
          }

          else if (item1.loan_app_stage_name == "Change Order") {
            this.isChangeOrderPlaced = true
            if (item1.stageapproved == 1) {
              this.isChangeOrderApproved = true;
            }

            //if (item1.stageActive == 1 && item1.stageapproved == 1) {
            //  this.IsNTPChangeOrderDone = true;
            //}
          }

          if (item1.stageActive == 1 && item1.stageapproved == 1 && item1.loan_app_stage_name == "NTP") {
            this.ntpApprovedFlag = true;
          }

          if (item1.stageActive == 1 && item1.stageapproved == 1 && item1.loan_app_stage_name == "Documents Signed") {
            this.DocSignedApprovedFlag = true;

          }
          this.submitteddate = item1.DateSubmitted;

          let stagename = "";// item1.loan_app_stage_name;
          item1.LinkFormMaster.split(',').forEach((item) => {
            let _stgname = item.split('::')
            let _formstagearray = new loansectionarray();
            let itmarray = "";
            if (_stgname.length <= 2) {

              _formstagearray.stageName = _stgname[0];
            }

            _formstagearray.userTypes = item1.userTypes;
            _formstagearray.stageActive = item1.stageActive;
            _formstagearray.stageapproved = item1.stageapproved;
            if (item.search('form::') == -1) {
              _formstagearray.stageName = _stgname[0];

            }
            else {
              //let itemarr = item.split('-');
              _formstagearray.stageName = _stgname[2];
              _formstagearray.formmasterid = _stgname[1];
              //_formstagearray.stageclass = _stgname[3];

            }

            _formstagearray.stageclass = item1.stageclass;
            _formstagearray.module_name_code= item1.module_name_code;
            _formstagearray.PaymentInfoSubmitted = item1.PaymentInfoSubmitted;
            _formstagearray.ApplicantSubmitted = item1.ApplicantSubmitted;
            _formstagearray.LoanInformationSubmitted = item1.LoanInformationSubmitted;
            _formstagearray.CoApplicantSubmitted = item1.CoApplicantSubmitted;
            _formstagearray.InstallationPropertySubmitted = item1.InstallationPropertySubmitted;
            _formstagearray.ProductInfoSubmitted = item1.ProductInfoSubmitted;
            _formstagearray.ExpansesSubmitted = item1.ExpansesSubmitted;
            _formstagearray.ReleaseFundsSubmitted = item1.ReleaseFundsSubmitted;
            _formstagearray.NTPSubmitted = item1.NTPSubmitted;
            _formstagearray.linkFormMaster = item1.LinkFormMaster;
            this.formstagearray.push(_formstagearray);


            this.loadSave = false;
          });

        });
        //// console.log('DocSignedApprovedFlag', this.DocSignedApprovedFlag);
        //// console.log('isChangeOrderPlaced', this.isChangeOrderPlaced);
        //// console.log('isNTPFundReleaseApproved', this.isNTPFundReleaseApproved);
        this.showCOBtn = false;
        if (this.DocSignedApprovedFlag == true) { this.showCOBtn = true; }

        if (this.isDealerUser) {
          if (this.ntpApprovedFlag == true) { this.showCOBtn = false; }
        }
        else {
          if (this.isNTPFundReleaseApproved == true || this.isChangeOrderPlaced == true) { this.showCOBtn = false; }
        }


        //if (this.isNTPFundReleaseApproved == true || this.isChangeOrderPlaced == true) { this.showCOBtn = false; }


        if (this.isChangeOrderApproved && this.ntpApprovedFlag) {

          if ((this.formstagedata as any[]).filter(item => item.loan_app_stage_name == "NTP(CO)").length > 0) {
            if (this.isNTPCO == true) {
              this.hideChangeOrderButton = true;
            }
            //else {
            //  this.hideChangeOrderButton = false;
            //}
          }
          else {
            this.hideChangeOrderButton = true;
          }
        }

        //if ((this.DocSignedApprovedFlag == true && this.isChangeOrderPlaced == false) || (this.DocSignedApprovedFlag == true && this.isNTPFundReleaseApproved == false)) {

        //  this.showCOBtn = true;
        //}


        this.Applicants = [];
        debugger
        this.VisibilityForVoidChangeOrderButton(this.ChangeOrderDocumentCount);
        if (this.formstagearray.filter(f => f.CoApplicantSubmitted == 1).length > 0) {
          this.Applicants.push({ value: 0, name: 'All' });
          this.Applicants.push({ value: 1, name: 'Primary' });
          this.Applicants.push({ value: 2, name: 'Co-Applicant' });
          this.HasCoApplicant = true;
        } else {
          this.Applicants.push({ value: 1, name: 'Primary' });
          this.HasCoApplicant = false;
        }
        this.Applicants = JSON.parse(JSON.stringify(this.Applicants));

        //let empty = null;
        this.isProductInfoApproved = false;

        if (this.formstagearray.filter(f => f.ProductInfoSubmitted == 1).length > 0) {
          this.isProductInfoApproved = true;
        }
      });
      this.getTwilioSMSDetail();
    });
    this.getCreditScore();

    //this.RuleEngineHistory.getRuleEngineHistoryList();


  }

  closecancel() {
    this.AddCancelReasonModal.hide();
  }

  checklaststage() {
    //let isdone = false;
    //var itemsdata = this.formstagedata.filter(x => x.ParentId == null);
    if (this.formstagedata) {
      var StageNotCompletedYet = this.formstagedata.filter(item => item.stageapproved == 0);

      //if (itemsdata[itemsdata.length - 1].stageapproved == 1) {
      //  isdone = true;
      //}
      //itemsdata.forEach(item => { if (item.stageapproved == 0) { isdone = false; return isdone;} ; });

      //var itemsdata = this.formstagedata.filter(x => x.ParentId == itemsdata[itemsdata.length - 1].loan_app_stage_id);
      //itemsdata.forEach(item => {
      //  if (item.SequenceType == 'Parallel' && item.stageapproved == 1) { isdone = true; return isdone; }
      //  else if (item.SequenceType == 'Sequence' && item.stageapproved == 0) { isdone = false; return isdone; }
      //});

      return StageNotCompletedYet.length == 0;
    }
    return false;

  }

  openpanel(pnl) {

  }

  copyMessage(val: string, acc: any) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    let url = environment.WebSiteURLForLoanHomi + "/uploadfiles/upload/" + val + "/" + acc;
    selBox.value = url;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  showChangeOrder(item) {
    this.loanapplicationservice.loanChangeOrderrefreshComponent.next("insertOperation");// no ID
    this.stageInfo.show(null, true, this.IsLACanceledFlag, item, this.borrowerPhoneNumber);
  }

  openStagePopup(item) {

    //// console.log('openstage popup', item);


    if (item.stageActive == 1 && item.stageapproved == 1 && item.loan_app_stage_name == "NTP") {
      this.ntpApprovedFlag = true;
    }

    if ((item.loan_app_stage_name == "Loan Product" || item.loan_app_stage_name == "Product Info" || item.loan_app_stage_name == "Internal Verification") && (this.ApplicationStatus == 'Failed' || this.ApplicationStatus == 'Pending Documents') && item.stageActive == 1 && this.isOverRide == false && item.stageapproved == 0) {
      let message = ''
      if (this.ApplicationStatus == 'Failed') {
        message = `Some of rules are failed. You cannot proceed with this step.`;
      } else if (this.ApplicationStatus == 'Pending Documents' && item.loan_app_stage_name == "Internal Verification") {
        message = `Verification documents are not uploaded.`;
      }
      if (message == '') {

        this.stageInfo.show(item, true, this.IsLACanceledFlag, 'updateswap', this.borrowerPhoneNumber, this.changeOrderDocWithR_F_S, this.applicantemail, this.hideChangeOrderButton, this.SourceType, this.DealerName);
      }
      else {
        this.toaster.error(message);
      }
    }

    else {
      //this.sysInfo.ngOnChanges();
      this.loanapplicationservice.loanChangeOrderrefreshComponent.next("update");// with ID
      this.stageInfo.show(item, true, this.IsLACanceledFlag, 'update', this.borrowerPhoneNumber, this.changeOrderDocWithR_F_S, this.applicantemail, this.hideChangeOrderButton, this.SourceType, this.DealerName);
    }
  }

  collapsedRuleSummary: boolean = true;
  moveToRuleSummuary(event) {
    this.collapsedRuleSummary = !this.collapsedRuleSummary;
    //event.stopPropagation();
    setTimeout(function () { window.dispatchEvent(new Event('resize')); }, 200);
  }

  scrollEvent(event) {
    // const scrollTopVal = event.target.scrollingElement.scrollTop;

    //if (window.location.href.includes('sectionRuleSummary')) {
    //  window.history.back();
    //}
    //// console.log(scrollTopVal); 
  }

  cancelloanapp(id, isapproved, isCancelRequest, isBanker, applicationNumber) {

    this.applicationNumber = applicationNumber;
    if (isapproved != 1 || (isCancelRequest == 1 && isBanker == 1)) {

      const message = `Are you sure you want to cancel loan application?`;
      this.dialogService.confirm('Cancel Loan Application #(' + applicationNumber + ')', message).subscribe(confirmed => {
        if (confirmed) {
          this.loanId = id;
          this.isCancelRequest = 0;
          this.requestdate.setValue(null);
          this.requestdate.clearValidators();
          this.requestdate.updateValueAndValidity();
          this.closedate.setValidators([Validators.required]);
          this.closedate.updateValueAndValidity();
          this.AddCancelReasonModal.show();
        }
      });
    } else {
      let message = `Funds are released, Send loan application to Bank User for cancellation?`;
      if (isCancelRequest == 1 && isBanker != 1) {
        message = `The cancellation request for this application has been sent to the bank user.`;
        this.toaster.success(message);
      }
      else {
        this.dialogService.confirm('Cancel Loan Application #(' + applicationNumber + ')', message).subscribe(confirmed => {
          if (confirmed) {
            this.loanId = id;
            this.AddCancelReasonModal.show();
            this.isCancelRequest = 1;
            this.closedate.setValue(null);
            this.closedate.clearValidators();
            this.closedate.updateValueAndValidity();
            this.requestdate.setValidators([Validators.required]);
            this.requestdate.updateValueAndValidity();
            //this.loanapplicationserviceService.SendToBankUser(id, applicationNumber).subscribe(response => {
            //  this.refresh();

            //}, error => {

            //});;

          }
        });
      }

    }
  }

  addReasonForm = this.fb.group({
    // note: ['', Validators.required],
    reasonDescription: ['', Validators.required]

  })

  addCancelReasonForm = this.fb.group({
    // note: ['', Validators.required],
    cancelreasonDescription: ['', Validators.required],
    requestdate: [null, Validators.nullValidator],
    closedate: [null, Validators.nullValidator]

  });

  SaveCancelReason() {

    if (this.addCancelReasonForm.valid) {
      this.loadSave = true;
      // this.notemodel.note_name = this.addNoteForm.value.note;
      this.reasonmodel.reason_description = this.addCancelReasonForm.value.cancelreasonDescription;
      if (this.addCancelReasonForm.value.requestdate != null) {
        this.reasonmodel.requestdate = this.addCancelReasonForm.value.requestdate.toString();
      }
      if (this.addCancelReasonForm.value.closedate != null) {
        this.reasonmodel.closedate = this.addCancelReasonForm.value.closedate.toString();
      }
      this.reasonmodel.id = this.loanId;
      this.reasonmodel.isverified = this.DocVerified == 0 ? false : true;
      this.reasonmodel.email = this.applicantemail;

      if (this.isCancelRequest == 1 && !this.isBanker) {
        this.loanapplicationservice.SendToBankUser(this.loanId, this.applicationNumber, this.reasonmodel.reason_description, this.reasonmodel.requestdate).subscribe(response => {
          this.loadSave = false;
          this.toaster.success("Cancellation request sent to bank user.");
          this.addCancelReasonForm.reset();
          this.fillLeadForm(this.loanId);
          this.AddCancelReasonModal.hide();

        }, error => {

        });
      }
      else {
        this.loanapplicationservice.saveReason(this.reasonmodel).subscribe((result: any) => {

          if (result.statusCode == 200) {

            this.loadSave = false;
            this.toaster.success(result.responseMessage);
            this.addCancelReasonForm.reset();
            this.fillLeadForm(this.loanId);
            this.AddCancelReasonModal.hide();
            this.router.navigateByUrl("/loanApplications/Cancelled");

          }
          else {
            this.loadSave = false;
            this.toaster.error(result.responseMessage);
          }

          //}, error => {
          //  //this.loadSave = false;
        });
      }
    }
    else {
      this.loadSave = false;
      this.commonService.validateAllFormFields(this.addCancelReasonForm);
    }
  }
  SaveReason() {
    if (this.addReasonForm.valid) {
      this.loadSave = true;

      this.reasonmodel.reason_description = this.addReasonForm.value.reasonDescription;
      this.reasonmodel.id = this.loanId;


      this.loanapplicationservice.saveOverrideReason(this.reasonmodel).subscribe((result: any) => {

        if (result.statusCode == 200) {

          this.loadSave = false;
          this.toaster.success(result.responseMessage);
          this.fillLeadForm(this.loanId);
          this.addReasonForm.reset();

          this.AddReasonModal.hide();
          this.refreshLoanDocsEmit('showButton');


        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }

        //}, error => {
        //  //this.loadSave = false;
      });
    }
    else {
      this.loadSave = false;
      this.commonService.validateAllFormFields(this.addReasonForm);
    }
  }
  updateOverRide() {
    const message = `Are you sure you want to override the application?`;
    this.dialogService.confirm('Override', message).subscribe(confirmed => {
      if (confirmed) {
        this.AddReasonModal.show();
        //this.loanapplicationservice.updateOverRide(this.loanId).subscribe((result: any) => {
        //  if (result.statusCode == 200) {
        //    this.fillLeadForm(this.loanId);
        //    setTimeout(() => {
        //      this.loadSave = false;
        //      this.toaster.success('Application overrided successfully.');
        //    }, 2000);
        //  }
        //  else {
        //    this.loadSave = false;
        //    this.toaster.error(result.responseMessage);
        //  }

        //}, error => {
        //  this.loadSave = false;
        //});
      }
    });
  }
  closeAddReason() {
    this.AddReasonModal.hide();
  }

  //openpopopupFornloanApplication() {
  //  this.loanApplication.show();
  //}
  //coapplicantDetails() {
  //  this.coapplicantDetail.show();
  //}
  //cbilscores() {
  //  this.cbilscore.show();
  //}
  Cancel() {
    this.router.navigateByUrl("/loanApplication");
  }
  stageemit() {
    //this.fillLeadForm(this.loanId);
  }

  changeOrderStageEmit() {
    this.loandocs.getLoanDocslist(this.loanId);
    this.ngOnInit();
    //this.fillLeadForm(this.loanId);
  }
  refreshEmit() {
    //this.fillLeadForm(this.loanId);
    this.ngOnInit();
  }

  CreditScoreManualPullForCoApp() {
    this.pullCreditScore(true);
  }

  //IMAGE UPLOAD   
  UploadimageForm = this.fb.group({
    profilePic: [''],
    'file': '',
    'filename': [''],
    filetype: [null, Validators.required],
    documentTitle: ['', Validators.nullValidator],
    description: ['', Validators.nullValidator]
  });

  get profilePic() { return this.UploadimageForm.get('profilePic'); }
  get filename() { return this.UploadimageForm.get('filename'); }
  get filetype() { return this.UploadimageForm.get('filetype'); }
  get documentTitle() { return this.UploadimageForm.get('documentTitle'); }
  get description() { return this.UploadimageForm.get('description'); }

  setFile($event): void {
    // this.commonService.uploadImageFileValidator($event);

    this.commonService.uploadPDFANDIMGAEFileValidator($event);
    if (this.commonService.isUploadFileValid == true) {

      this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "20MB")
      if (this.commonService.isFileValid) {
        this.fileName = $event.target.files[0].name;
        this.fileExtension = this.fileName.replace(/^.*\./, '');
        //this.companyLogo.setValue($event.target.files[0].name);

      }
    }
    else {
      this.fileName = 'Choose file';
    }
  }

  private prepareFormDataForDocument() {
    const input = new FormData();
    input.append('companyId', this.companyId);
    input.append('companyName', '');
    input.append('moduleid', '1');
    input.append('submoduleid', 'loanapplication');
    input.append('refid', this.loanId);
    input.append('documentTitle', this.fileNameddlvalue);
    input.append('description', this.UploadimageForm.value.description == null ? '' : this.UploadimageForm.value.description);
    input.append('accountid', this.accid);
    input.append('filetype', this.UploadimageForm.value.filetype);
    input.append('fileExtension', this.fileExtension);
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      input.append('file', fileBrowser.files[0]);
    }
    return input;
  }

  getImages() {
    this.leadservice.getImages(this.loanId, 1).subscribe((result: any) => {
      //this.fileuplist = result;
      //// console.log("resultDocList", result);
      if (this.isContactUser == true) {
        //// console.log("resultDocList111", result);
        this.fileuplist = result.filter(function (itm) { return (itm.masterValue != "Install Agreement" && itm.masterValue != "Install Agreement*") });
      }
      else {
        //// console.log("resultDocList222", result);
        this.fileuplist = result;
      }
    })
  }
  synctosalesforce() {
    this.loanapplicationservice.synctosalesforce(this.loanId).subscribe((result: any) => {


    })
  }
  //setvalue(event) {
  //  alert(event.id)
  //  this.UploadimageForm.value.filetype.setValue(event.id);
  //}
  SaveImage() {
    //// console.log('this.fileName', this.fileName);
    if (this.fileName == null || this.fileName == ''
      || typeof this.fileName == 'undefined'
      || this.fileName == 'Choose file') {
      this.isValid = false;
    }

    else {
      this.isValid = true;
    }
    if (this.fileName != 'Choose file' && this.UploadimageForm.valid) {

      //// console.log('fileName after', this.fileName);
      // this.loadSave = true;
      let loanProgress = new LoanProgressModel();
      //loanProgress.appyingChanges = Progress.start;
      this.loanapplicationservice.loanProgress.next(loanProgress);
      this.isSubmitted = true;
      this.loadSave = true;
      const companySetupModel = this.prepareFormDataForDocument();
      this.dashboardService.addOrUpdateUploadFileOnAzzurePDF(companySetupModel).subscribe((result: any) => {
        setTimeout(() => {
          if (result.statusCode === 200) {
            //this.loadSave = false;
            this.isSubmitted = false;

            //loanProgress.appyingChanges = Progress.completed;
            ////this.loanapplicationservice.loanProgress.next(loanProgress);
            //loanProgress.applyingRules = Progress.start;
            //loanProgress.result = {
            //  responseMessage: 'Document has been uploaded successfully'
            //};
            //this.loanapplicationservice.loanProgress.next(loanProgress);
            this.toaster.success('Document has been uploaded successfully');

            this.fileInput.nativeElement.value = "";

            this.fileName = '';
            this.getImages();
            //this.fillLeadForm(this.loanId);
            this.fileuploadddl.clearModel();
            this.UploadimageForm.value.filetype = null;
            this.UploadimageForm.reset();
            this.getDocumentForReceiveAndPending();
            this.fillLeadForm(this.loanId);

          }
          else {
            this.isSubmitted = false;

            loanProgress.appyingChanges = Progress.failed;
            loanProgress.result = { responseMessage: result.responseMessage };
            this.loanapplicationservice.loanProgress.next(loanProgress);
            this.toaster.error(result.responseMessage);
          }
          this.loadSave = false;
        }, 3000);
      }, error => {
        this.isSubmitted = false;
        this.loadSave = false;
      });
    }
    else {
      this.isSubmitted = false;
      // this.loadSave = false;
      this.commonService.validateAllFormFields(this.UploadimageForm);
    }

  }

  Deleteimage(Id: any) {

    const message = `Are you sure you want to delete Document?`;
    this.dialogService.confirm('Delete Document', message).subscribe(confirmed => {
      if (confirmed) {
        this.loadSave = true;
        this.leadservice.Deleteimage(Id).subscribe(r => {
          this.toaster.success(`Document has been deleted successfully..`);
          this.getDocumentForReceiveAndPending();
          this.getImages();
          this.fillLeadForm(this.loanId);
          this.loadSave = false;
        }, error => {
          this.loadSave = false;
        });
      }
    });
  }

  getLoanAppTablesList() {
    this.commonService.getMasterItemsList("LoanApplicationForm").subscribe((res: any) => {
      this.lstdata = this.commonService.masters;

    })
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
      this.lstPageSizeBankerList = this.commonService.masters;
    })
  }

  SetTableData(e: any) {

    if (typeof e != "undefined") {
      this.sectionId = e.value;
      this.tableName = e.name;
    }
    if (typeof this.sectionId == 'undefined') {
      this.sectionId = null;
    }
    if (typeof this.tableName == 'undefined') {
      this.tableName = null;
    }

    this.loading = true;
    this.loanapplicationservice.GetAuditHistoryList(this.sectionId, this.tableName, this.loanId).subscribe(response => {
      this.pagedData = this.loanapplicationservice.auditHistoryInfo;
      //// console.log('rrr', this.pagedData);
      if (this.pagedData.data[0].table_name1 == 'tblLAApplicationVerification') {
        this.internalVerification = true;
      }
      else {
        this.internalVerification = false;
      }

      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  onDetailToggle(event) {
    this.loading = true;
    var id = event.value.pkid;
    var id1 = event.value.hi_pk_id;
    var table1 = event.value.table_name1;
    var table2 = event.value.table_name2;
    if (id != undefined) {
      this.loanapplicationservice.GetAuditHistoryDetail(id, id1, table1, table2, this.loanId).subscribe(response => {
        this.auditDetailData = this.loanapplicationservice.historyDetailData;
        this.detailData = this.auditDetailData.data;
        //// console.log('this.detailData', this.detailData.length);
        if (this.detailData.length != 0) {
          this.opr = this.detailData[0].opr;
        }
        this.loading = false;
      }, error => {
        this.loading = false;
      })
    }
    this.loading = false;
  }

  toggleExpandRow(row, expanded) {
    this.table.rowDetail.collapseAllRows();
    if (expanded == false) {
      this.table.rowDetail.toggleExpandRow(row);
    }
    else {
      this.table.rowDetail.collapseAllRows();
    }
  }

  openNotificationPopup() {
    this.notificationPopup.show(this.loanId);
  }

  testScore() {

    let item: any = this.ApplicantDrop.selectedValues[0];
    let bureauItem: any = this.BureauDrop.selectedValues[0];
    let scoreItem: any = this.testDrop.selectedValues[0];
    if (item != undefined) {
      this.loading = true;
      this.loanapplicationservice.testPullCreditScore(this.loanId, item.name, bureauItem.Id, scoreItem.Score).subscribe(resp => {
        if (resp.status == "success") {
          this.loading = false;
          this.getCreditScore();
        } else if (resp.error) {
          this.loading = false;
          this.toaster.error(resp.error, "Credit Score");
        }
      }, err => {
        this.loading = false;
      });
    }
  }

  getFileStatus() {
    this.loading = true;
    let item: any = this.ApplicantDrop.selectedValues[0];
    if (item != undefined) {
      let bureauItem: any = this.BureauDrop.selectedValues[0];
      if (bureauItem != undefined) {

        this.loanapplicationservice.getFileStatus(this.loanId, item.name, bureauItem.Id).subscribe(resp => {
          if (resp.consumers.equifaxPrecheckReport[0].hitCode.code == "U") {
            this.loading = false;
            this.pullCreditScore();
          } else {
            this.getCreditScore();
          }
        }, err => {
          this.loading = false;
        });
      } else {
        this.loading = false;
      }
    } else {
      this.loading = false;
    }

  }

  pullCreditScore(isFromCoApplicant: any = false, value: string = null, isFromApplicant: string = null) {
    // this.loading = true;
    let loanProgress = new LoanProgressModel();

    let item: any = null;
    let applicantTypeName: any = null;
    if (isFromCoApplicant == true) {
      applicantTypeName = "Co-Applicant";
    }
    else if (isFromApplicant == 'Primary') {
      applicantTypeName = "Primary";
    }
    else {
      item = this.ApplicantDrop.selectedValues[0];
      if (item != undefined && item != null) {
        applicantTypeName = item.name;
      }
    }

    if ((typeof item != undefined && isFromCoApplicant == false) || isFromCoApplicant == true) {
      let bureauItem: any = null;
      if (isFromCoApplicant == true || isFromApplicant == 'Primary') {
        bureauItem = this.Bureaus[0];
      } else {
        bureauItem = this.BureauDrop.selectedValues[0];
      }
      //// console.log("bureau item", bureauItem)
      //// console.log("Applicant name", applicantTypeName)
      if (value == 'SwapApplicant') {
        applicantTypeName = 'All'
      }
      if (bureauItem != undefined && bureauItem != null && applicantTypeName != undefined && applicantTypeName != "" && applicantTypeName != null) {
        if (isFromCoApplicant == false) {
          loanProgress.appyingChanges = Progress.start;
          this.loanapplicationservice.loanProgress.next(loanProgress);
          this.isSubmitted = true;
        }

        this.loanapplicationservice.pullCreditScoreData(this.loanId, applicantTypeName, bureauItem.Id).subscribe(resp => {
          if (resp.error) {
            //this.loading = false;
            this.isSubmitted = false;
            loanProgress.appyingChanges = Progress.failed;
            loanProgress.result = { responseMessage: resp.error };
            this.loanapplicationservice.loanProgress.next(loanProgress);
            this.toaster.error(resp.error, "Credit Score");
            this.getCreditScore();
          } else if (resp[0].status == "success") {
            //this.loading = false;
            if (isFromCoApplicant == false) {
              this.isSubmitted = false;
              loanProgress.appyingChanges = Progress.completed;
              this.loanapplicationservice.loanProgress.next(loanProgress);
              loanProgress.applyingRules = Progress.start;
              loanProgress.result = null;
              this.loanapplicationservice.loanProgress.next(loanProgress);
            }
            this.getCreditScore();

          }
        }, err => {
          // this.loading = false;
          this.isSubmitted = false;
        });
      } else {
        //  this.loading = false;
        this.isSubmitted = false;
        this.toaster.error("Applicant type and Credit field is required.");
      }
    } else {
      // console.log('last');
      // this.loading = false;
      this.isSubmitted = false;
      this.toaster.error("Applicant type and Credit field is required.");
    }
  }

  getCreditScore() {
    this.loading = true;
    this.loanapplicationservice.getCreditScoreData(this.loanId).subscribe(resp => {
      if (resp != null) {
        this.loading = false;
        this.applicantCreditScoreData = [];
        this.coApplicantCreditScoreData = [];
        resp.forEach(o => {

          if (o.ApplicantType == "Primary") {
            this.applicantCreditScoreData.push(o);
            if (o.FrozenAccount == true) {
              this.isFrozen = true;
            }
            if (o.IsFraudulent == true) {
              this.isFraudulent = true;
            }
          } else if (o.ApplicantType == "Co-Applicant") {
            this.coApplicantCreditScoreData.push(o);
            if (o.FrozenAccount == true) {
              this.isFrozen = true;
            }
            if (o.IsFraudulent == true) {
              this.isFraudulent = true;
            }
          }
        });

        ////
        this.expenses.refresh();
      }
    }, err => {
      this.loading = false;
    });
  }

  ShowCreditReport(row) {
    this.creditReport.show(row.LoanApplicationId, row.ApplicantType, row.CreditBureauId, false);
  }

  ShowCreditReportRawData(row) {
    this.creditReport.show(row.LoanApplicationId, row.ApplicantType, row.CreditBureauId, true);
  }

  openComentHistoryPopup() {
    this.commentHistory.addPopUpShow();
  }

  OpenDocumentModel() {
    this.documentModal.showModal(this.loanId);
  }

  generateDoc() {
    this.generatePopUp.show();
  }
  closeGenerateDocumentModel() {
    this.generatePopUp.hide();
  }

  generateDocumentBySecondarySigner(signerBy: string) {
    this.generateDocument(signerBy, 'Secondary');

  }

  generateDocument(signerBy: string, value: string = null) {

    if (this.generateButtonName == "Generate Document" || value == 'Secondary') {
      this.generatePopUp.hide();
      this.dialogService.confirm("Caution", "Do you really wish to generate loan documents?", "Yes", "No").subscribe(confirmed => {
        if (confirmed) {
          //this.loading = true;
          this.isSubmitted = true;
          let loanProgress = new LoanProgressModel();
          loanProgress.appyingChanges = Progress.start;
          this.loanapplicationservice.loanProgress.next(loanProgress);

          this.lenderService.getBankIdByLoanApplicationId(this.loanId).subscribe(bankId => {
            this.loanapplicationservice.mergeWebmergeMapping(this.loanId, bankId, false, signerBy).subscribe(resp => {
              // this.loading = false;
              this.isSubmitted = false;
              //// console.log('1 Generate Document', resp);

              loanProgress.appyingChanges = Progress.completed;
              this.loanapplicationservice.loanProgress.next(loanProgress);
              loanProgress.applyingRules = Progress.start;
              loanProgress.result = resp;
              this.loanapplicationservice.loanProgress.next(loanProgress);
              //// console.log('2 Generate Document', resp);
              this.hidegenerateDocBySecSignerButton = false;
              if (value == 'Secondary') {
                this.generateButtonName = 'Void Document';
              }

              this.loandocs.getLoanDocslist(this.loanId);
              this.fillLeadForm(this.loanId);
              if (resp.statusCode == 200) {
                //  this.toaster.success(resp.responseMessage);
                // this.ruleProgressShow();

              } else {
                this.toaster.error(resp.responseMessage);
              }

            }, err => {
              loanProgress.appyingChanges = Progress.failed;
              this.loanapplicationservice.loanProgress.next(loanProgress);
              this.isSubmitted = false;
            });
          }, err => {
            loanProgress.appyingChanges = Progress.failed;
            this.loanapplicationservice.loanProgress.next(loanProgress);
            this.isSubmitted = false;
          });
        }
      });

    } else if (this.generateButtonName == "Void Document") {
      this.dialogService.confirm("Caution", "Do you really wish to void loan documents?", "Yes", "No").subscribe(result => {
        if (result) {
          this.loadSave = true;
          this.loanapplicationservice.voidDocuments(this.loanId, false).subscribe(resp => {
            this.hidegenerateDocBySecSignerButton = true;
            this.loadSave = false;
            this.toaster.success("Loan Documents voided. You can update the Loan product and other related information.");
            this.isInternalVerification = false;
            this.fillLeadForm(this.loanId);
            this.loandocs.getLoanDocslist(this.loanId);

          }, err => {
            this.loadSave = false;
          })
        }
      })
    }
  }

  voidChangeOrder() {
    this.dialogService.confirm("Caution", "Do you really wish to void latest Change Order?", "Yes", "No").subscribe(result => {
      if (result) {
        this.loadSave = true;
        this.loanapplicationservice.voidChangeOrder(this.loanId).subscribe(resp => {
          this.loadSave = false;
          this.toaster.success("Latest Change Order voided.");
          this.loandocs.getLoanDocslist(this.loanId);
          this.ngOnInit();
        }, err => {
          this.loadSave = false;
        })
      }
    })
  }

  refreshLoanDocsEmit(event) {
    //// console.log('refreshLoanDocsEmit', event)
    //if (event.pendingCount > 0 && event.signedCount == 0) {
    //  this.generateButtonName = "Void Document";
    //} else {
    //  this.generateButtonName = "Generate Document";
    //}

    //if (event.pendingCount == 0 && event.signedCount > 0) {

    //  this.canGeneratedoc = false;
    //  if (this.isCompanyAdmin) {
    //    this.canGeneratedoc = true;
    //    this.generateButtonName = "Void Document";
    //  }
    //} else {
    //  this.canGeneratedoc = true;
    //}
    if (event == 'showButton') {
      this.shouldGenerateDocumentVisible = true;
    }
    else {
      if (event.pendingCount == 0 && event.signedCount == 0) {
        this.generateButtonName = "Generate Document";
      }
      else if (event.pendingCount == 0 && event.signedCount > 0) {
        this.canGeneratedoc = false;
        if (this.isCompanyAdmin) {
          this.canGeneratedoc = true;
        }
        //-----**Client comments:- Void document after loan docs signed---  ** Dealer Admin/Ralation Manager--Can see and Operate
        if (this.roleCode == "dealer_companyadmin" || this.roleCode == 'dealer_finance_user' || this.roleCode == 'dealer_finance_manager') {
          this.canGeneratedoc = true;
        }
        if (this.isRealtionshipUser) {
          this.canGeneratedoc = true;
        }
        //-----
        this.generateButtonName = "Void Document";
      }
      else if (event.pendingCount > 0 && event.signedCount == 0) {
        this.generateButtonName = "Void Document";
      }
      else if (event.pendingCount > 0 && event.signedCount > 0) {
        this.canGeneratedoc = false;
        if (this.isCompanyAdmin) {
          this.canGeneratedoc = true;
        }
        //-----**Client comments:- Void document after loan docs signed--- ** Dealer Admin/Ralation Manager--Can see and Operate
        if (this.roleCode == "dealer_companyadmin") {
          this.canGeneratedoc = true;
        }
        if (this.isRealtionshipUser) {
          this.canGeneratedoc = true;
        }

        this.generateButtonName = "Void Document";
      }
      if (this.generateButtonName == "Generate Document") {
        if (this.ApplicationStatus !== 'Failed' && this.canGeneratedoc) {
          this.shouldGenerateDocumentVisible = true;
          this.hidegenerateDocBySecSignerButton = true;
        }
      }
      else if (this.generateButtonName == "Void Document") {
        //// console.log('Void Document CanGeneratedoc',this.canGeneratedoc)
        if (this.canGeneratedoc) {
          this.shouldGenerateDocumentVisible = true;
          this.hidegenerateDocBySecSignerButton = false;
        }
      }
      this.ChangeOrderDocumentCount = event.pendingChangeOrderCount;
      this.changeOrderDocWithR_F_S = event.changeOrderDocWithR_F_S;
      this.VisibilityForVoidChangeOrderButton(this.ChangeOrderDocumentCount);
    }
  }

  getDocumentForReceiveAndPending() {
    //getDocumentForReceiveAndPending(id) {
    //  return this.http.get(this.baseUri + `loanproduct/GetLoanProductDiscountCategoryEdit?productId=${id}`);
    //}

    this.loanapplicationservice.getDocumentForReceiveAndPending(this.loanId).subscribe((result: any) => {
      this.totalDocument = result.TotalDocs;
      this.recieveDocument = result.ReceivedDocs;
      this.pendingDoc = result.pendingDocs;
      this.requireDoc = result.requireDoc;

    });
  }

  stageversion(id: any) {
    this.router.navigate(['/configurationsetting/stageconfig'], { queryParams: { id: id } });
    //window.location.href=('configurationsetting/stageconfig? id:'+id)


  }

  //Assign Popup
  showpopup(id: any, appnum: any, applicantName: string) {

    this.assignedBankerData = [];
    this.currentPageBankUserList = 1;
    this.loanAppid = id;
    this.appNumber = appnum;
    this.applicantName = applicantName;
    this.listBankerNameFilter = '';
    this.loanapplicationservice.GetLoanApplicationBankerList(this.listBankerNameFilter, this.sortColumnBankerList, this.sortDirBankerList, this.currentPageBankUserList, this.pageSizeValueBankerList, this.loanAppid).subscribe(response => {
      this.pagedDataBankerList = this.loanapplicationservice.pagedData;
      this.offsetBankUser = this.currentPageBankUserList;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
    this.assignpopupModel.show();
  }

  searchBankUserList() {
    this.loading = true;
    this.loanapplicationservice.GetLoanApplicationBankerList(this.listBankerNameFilter, this.sortColumnBankerList, this.sortDirBankerList, this.currentPageBankUserList, this.pageSizeValueBankerList, this.loanAppid).subscribe(response => {
      this.pagedDataBankerList = this.loanapplicationservice.pagedData;
      this.offsetBankUser = this.currentPageBankUserList;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  saveAssociateBanker() {
    this.loaderCommon = true;
    //// console.log("saveAssociateBanker", this.loaderCommon);
    this.data = JSON.stringify(this.assignedBankerData);
    this.bankerModel.loanappid = this.loanAppid;
    this.bankerModel.contactids = this.data;
    this.bankerModel.objectName = 'loanapplication';
    this.bankerModel.applicantName = this.applicantName;
    this.bankerModel.applicationNumber = this.appNumber;
    this.bankerModel.type = '';
    this.loanapplicationservice.saveAssociateBanker(this.bankerModel).subscribe((result: any) => {
      if (result.statusCode == 200) {
        this.toaster.success(result.responseMessage);
        this.assignpopupModel.hide();
        this.fillLeadForm(this.loanAppid);
        this.GetLoanApplicationSales_Rep(this.loanAppid);
      }
      this.loaderCommon = false;
    });

    // // console.log("saveAssociateBanker 2", this.loaderCommon);
  }

  saveAssignedSalesUserDetail() {
    this.loaderCommon = true;
    //// console.log("saveAssignedSalesUserDetail", this.loaderCommon);
    this.AssignedSalesUsers = JSON.stringify(this.assignedData);
    this.bankerModel.loanappid = this.loanAppid;
    this.bankerModel.contactids = this.AssignedSalesUsers;
    this.bankerModel.objectName = 'loanapplication';
    this.bankerModel.applicantName = this.applicantName;
    this.bankerModel.applicationNumber = this.appNumber;
    this.bankerModel.type = '';
    this.loanapplicationservice.saveAssignedSalesUserDetail(this.bankerModel).subscribe((result: any) => {
      if (result.statusCode == 200) {
        this.toaster.success(result.responseMessage);
        this.salesassignpopupModel.hide();
        // this.fillLeadForm(this.loanAppid);
        this.ngOnInit();
        this.GetLoanApplicationSales_Rep(this.loanAppid);
      }
      this.loaderCommon = false;
    });

    //// console.log("saveAssignedSalesUserDetail", this.loaderCommon);
  }

  resetBankUserList() {
    this.loading = true;
    this.listBankerNameFilter = '';
    this.sortDir = 'desc';
    this.sortColumn = 'CreatedOn';
    this.pageSizeValue = 10;
    this.loanapplicationservice.GetLoanApplicationBankerList(this.listBankerNameFilter, this.sortColumnBankerList, this.sortDirBankerList, this.currentPageBankUserList, this.pageSizeValueBankerList, this.loanAppid).subscribe(response => {
      this.pagedDataBankerList = this.loanapplicationservice.pagedData;
      this.offsetBankUser = this.currentPageBankUserList;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  updateBankerNameFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.loanapplicationservice.GetLoanApplicationBankerList(this.listBankerNameFilter, this.sortColumnBankerList, this.sortDirBankerList, this.currentPageBankUserList, this.pageSizeValueBankerList, this.loanAppid).subscribe(response => {
        this.pagedDataBankerList = this.loanapplicationservice.pagedData;

        for (var i = 0; i < this.pagedDataBankerList.data.length; i++) {
          this.assignedBankerData.forEach(s => {
            if (this.pagedDataBankerList.data[i].Email === s.Email) {
              this.pagedDataBankerList.data[i].Status = s.Status;
            }
          })
        }

        this.offsetBankUser = this.currentPageBankUserList;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
    }
  }

  assignedBanker(row) {
    let isFound: Boolean = false;
    this.assignedBankerData.forEach(s => {
      if (s.Email === row.Email) {
        s.Status = row.Status;
        isFound = true;
      }
    })
    if (isFound === false) {
      this.assignedBankerData.push(row);
    }
  }

  get curPageBankUserList(): number {
    return this.offsetBankUser;
  }

  onChangeBankUserList($event) {
    this.currentPageBankUserList = 1;
    this.loading = true;
    this.loanapplicationservice.GetLoanApplicationBankerList(this.listBankerNameFilter, this.sortColumnBankerList, this.sortDirBankerList, this.currentPageBankUserList, this.pageSizeValueBankerList, this.loanAppid).subscribe(response => {
      this.pagedDataBankerList = this.loanapplicationservice.pagedData;

      for (var i = 0; i < this.pagedDataBankerList.data.length; i++) {
        this.assignedBankerData.forEach(s => {
          if (this.pagedDataBankerList.data[i].Email === s.Email) {
            this.pagedDataBankerList.data[i].Status = s.Status;
          }
        })
      }

      this.offsetBankUser = this.currentPageBankUserList;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  onSortBankerList($event) {
    const sort = $event.sorts[0]
    this.sortDirBankerList = sort.dir;
    this.sortColumnBankerList = sort.prop;
    this.currentPageBankUserList = 1;
    this.loading = true;
    this.loanapplicationservice.GetLoanApplicationBankerList(this.listBankerNameFilter, this.sortColumnBankerList, this.sortDirBankerList, this.currentPageBankUserList, this.pageSizeValueBankerList, this.loanAppid).subscribe(response => {
      this.pagedDataBankerList = this.loanapplicationservice.pagedData;

      for (var i = 0; i < this.pagedDataBankerList.data.length; i++) {
        this.assignedBankerData.forEach(s => {
          if (this.pagedDataBankerList.data[i].Email === s.Email) {
            this.pagedDataBankerList.data[i].Status = s.Status;
          }
        })
      }

      this.offsetBankUser = this.currentPageBankUserList;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  setPageBankerList($event) {
    this.loading = true;
    this.currentPageBankUserList = $event.page;
    this.loanapplicationservice.GetLoanApplicationBankerList(this.listBankerNameFilter, this.sortColumnBankerList, this.sortDirBankerList, this.currentPageBankUserList, this.pageSizeValueBankerList, this.loanAppid).subscribe(response => {
      this.pagedDataBankerList = this.loanapplicationservice.pagedData;

      for (var i = 0; i < this.pagedDataBankerList.data.length; i++) {
        this.assignedBankerData.forEach(s => {
          if (this.pagedDataBankerList.data[i].Email === s.Email) {
            this.pagedDataBankerList.data[i].Status = s.Status;
          }
        })
      }

      this.offsetBankUser = this.currentPageBankUserList;
      this.loading = false;
    }, error => {
      this.loading = false;
    });

  }
  closemodel() {
    this.assignpopupModel.hide();
  }
  //================
  //Sales Assign Popup
  showAssignSalesPopup(id: any, appnum: any, applicantName: string) {
    this.listNameFilter = '';
    this.searchUserType = '';
    this.userTypeSelect.clearModel();
    this.assignedData = [];
    this.currentPageSalesUserList = 1;
    this.loanAppid = id;
    this.appNumber = appnum;
    this.applicantName = applicantName;

    this.loanapplicationservice.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType, this.sortColumnSalesList, this.sortDirSalesList, this.currentPageSalesUserList, this.pageSizeValueSalesList, id).subscribe(response => {
      this.pagedDataSalesList = this.loanapplicationservice.pagedData;
      this.offsetSaleUser = this.currentPageSalesUserList;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
    this.salesassignpopupModel.show();

  }
  get curPageSalesUserList(): number {
    return this.offsetSaleUser;
  }

  SetUserType(utype: any) {
    this.currentPageSalesUserList = 1;
    this.searchUserType = utype;
    this.loanapplicationservice.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType, this.sortColumnSalesList, this.sortDirSalesList, this.currentPageSalesUserList, this.pageSizeValueSalesList, this.loanAppid).subscribe(response => {
      this.pagedDataSalesList = this.loanapplicationservice.pagedData;

      for (var i = 0; i < this.pagedDataSalesList.data.length; i++) {
        this.assignedData.forEach(s => {
          if (this.pagedDataSalesList.data[i].Email === s.Email) {
            this.pagedDataSalesList.data[i].Status = s.Status;
          }
        })
      }

      this.offsetSaleUser = this.currentPageSalesUserList;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  restddl() {
    this.searchUserType = '';
  }

  updateNameFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.loanapplicationservice.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType, this.sortColumnSalesList, this.sortDirSalesList, this.currentPageSalesUserList, this.pageSizeValueSalesList, this.loanAppid).subscribe(response => {
        this.pagedDataSalesList = this.loanapplicationservice.pagedData;

        for (var i = 0; i < this.pagedDataSalesList.data.length; i++) {
          this.assignedData.forEach(s => {
            if (this.pagedDataSalesList.data[i].Email === s.Email) {
              this.pagedDataSalesList.data[i].Status = s.Status;
            }
          })
        }

        this.offsetSaleUser = this.currentPageSalesUserList;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
    }
  }

  searchSaleUserList() {
    this.loading = true;
    this.loanapplicationservice.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType, this.sortColumnSalesList, this.sortDirSalesList, this.currentPageSalesUserList, this.pageSizeValueSalesList, this.loanAppid).subscribe(response => {
      this.pagedDataSalesList = this.loanapplicationservice.pagedData;
      this.offsetSaleUser = this.currentPageSalesUserList;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  resetSaleUserList() {
    this.userTypeSelect.clearModel();
    this.loading = true;
    this.listNameFilter = '';
    this.searchUserType = '';
    this.sortDir = 'desc';
    this.sortColumn = 'CreatedOn';
    this.pageSizeValue = 10;
    this.loanapplicationservice.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType, this.sortColumnSalesList, this.sortDirSalesList, this.currentPageSalesUserList, this.pageSizeValueSalesList, this.loanAppid).subscribe(response => {
      this.pagedDataSalesList = this.loanapplicationservice.pagedData;
      this.offsetSaleUser = this.currentPageSalesUserList;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  onChangeSalesUserList($event) {
    this.currentPageSalesUserList = 1;
    this.loading = true;
    this.loanapplicationservice.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType, this.sortColumnSalesList, this.sortDirSalesList, this.currentPageSalesUserList, this.pageSizeValueSalesList, this.loanAppid).subscribe(response => {
      this.pagedDataSalesList = this.loanapplicationservice.pagedData;

      for (var i = 0; i < this.pagedDataSalesList.data.length; i++) {
        this.assignedData.forEach(s => {
          if (this.pagedDataSalesList.data[i].Email === s.Email) {
            this.pagedDataSalesList.data[i].Status = s.Status;
          }
        })
      }

      this.offsetSaleUser = this.currentPageSalesUserList;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  onSortSalesList($event) {
    const sort = $event.sorts[0]
    this.sortDirSalesList = sort.dir;
    this.sortColumnSalesList = sort.prop;
    this.currentPageSalesUserList = 1;
    this.loading = true;
    this.loanapplicationservice.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType, this.sortColumnSalesList, this.sortDirSalesList, this.currentPageSalesUserList, this.pageSizeValueSalesList, this.loanAppid).subscribe(response => {
      this.pagedDataSalesList = this.loanapplicationservice.pagedData;

      for (var i = 0; i < this.pagedDataSalesList.data.length; i++) {
        this.assignedData.forEach(s => {
          if (this.pagedDataSalesList.data[i].Email === s.Email) {
            this.pagedDataSalesList.data[i].Status = s.Status;
          }
        })
      }

      this.offsetSaleUser = this.currentPageSalesUserList;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  setPageSalesList($event) {
    this.loading = true;
    this.currentPageSalesUserList = $event.page;
    this.loanapplicationservice.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType, this.sortColumnSalesList, this.sortDirSalesList, this.currentPageSalesUserList, this.pageSizeValueSalesList, this.loanAppid).subscribe(response => {
      this.pagedDataSalesList = this.loanapplicationservice.pagedData;

      for (var i = 0; i < this.pagedDataSalesList.data.length; i++) {
        this.assignedData.forEach(s => {
          if (this.pagedDataSalesList.data[i].Email === s.Email) {
            this.pagedDataSalesList.data[i].Status = s.Status;
          }
        })
      }

      this.offsetSaleUser = this.currentPageSalesUserList;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  closeSalesAssignModel() {
    this.salesassignpopupModel.hide();
  }
  assigned(row) {
    let isFound: Boolean = false;
    this.assignedData.forEach(s => {
      if (s.Email === row.Email) {
        s.Status = row.Status;
        isFound = true;
      }
    })
    if (isFound === false) {
      this.assignedData.push(row);
    }
  }

  //-------------------------------------------Customer Loan Application Detail

  GetLoanApplicationData(id) {
    this.dashboardService.GetLoanApplicationData(id).subscribe((result: any) => {
      if (result) {
        if (result.loanApplicationNumber != null && result.loanApplicationNumber != "") {

          this.loanApplicationId = result.loanApplicationNumber[0].id;
          //this.LoanApplicationNotification(this.loanApplicationId);

          if (this.loanApplicationId != null && this.loanApplicationId != "") {
            this.fillLeadForm(this.loanApplicationId);
          }


        }
        this.loanApplicationData = result;
        this.loanApplicationNumberData = result.loanApplicationNumber;
        this.loanApplicationDetail = result.loanApplicationDetail;
        this.LoanApplicationProductDetail = result.productDetail;
        this.loanApplicationfinanceDetail = result.financeDetail;
        this.loanApplicationPaymentDetails = result.loanApplicationPaymentDetails;
        this.loanApplicationSalesRape = result.salesRapeLoanApplicationDetail
      }
    }, error => {

    });
  }
  GetLoanApplicationSales_Rep(id: any) {
    //alert(1);
    this.loanapplicationservice.GetLoanApplicationSales_Rep(id).subscribe((result: any) => {
      this.salesRepList = result;

      if (this.salesRepList == null && this.finusers == null && this.bankUsers == null) {
        this.docClass = 'col-xl-12';
      } else if (this.salesRepList != null && this.finusers == null && this.bankUsers == null) {
        this.docClass = 'col-xl-9';
      } else if (this.salesRepList == null && this.finusers != null && this.bankUsers == null) {
        this.docClass = 'col-xl-9';
      } else if (this.salesRepList == null && this.finusers == null && this.bankUsers != null) {
        this.docClass = 'col-xl-9';
      } else if (this.salesRepList == null && this.finusers != null && this.bankUsers != null) {
        this.docClass = 'col-xl-6';
      } else if (this.salesRepList != null && this.finusers == null && this.bankUsers != null) {
        this.docClass = 'col-xl-6';
      } else if (this.salesRepList != null && this.finusers != null && this.bankUsers == null) {
        this.docClass = 'col-xl-6';
      } else {
        this.docClass = 'col-xl-3';
      }
      //// console.log('this.salesRepList', this.salesRepList);
    })
  }
  fileNameDDL(e) {

    this.fileNameddlvalue = e.documentType;
    this.fileNameddlvalue = this.fileNameddlvalue.slice(0, -1);
    this.fileNameddlvalue = this.fileNameddlvalue.replace(/\s/g, "");
  }
  get reasonDescription() { return this.addReasonForm.get('reasonDescription'); }

  get cancelreasonDescription() { return this.addCancelReasonForm.get('cancelreasonDescription'); }
  get requestdate() { return this.addCancelReasonForm.get('requestdate'); }
  get closedate() { return this.addCancelReasonForm.get('closedate'); }

  //Start For Rule Engine
  ruleProgressShow() {
    debugger;
    //this.getLoanApplicationRuleList(this.loanId, 'ON_CREATE_AND_UPDATE');

  }

  ruleProgress: boolean = false;
  executeRuleTarget(loanApplicationId: number, eventCode: string, connectionId: string) {
    this.ruleProgress = true;
    this.messageCount = 0;
    this.ruleEngineService.executeRuleEngineTarget(loanApplicationId, eventCode, connectionId).subscribe(m => {

      //this.loanProgressModel.applyingRules = Progress.completed;
      this.loanProgressModel.finalizing = Progress.completed;
      this.loanProgressModel.callBackFunction();
    });
  }

  connection: any;
  connectionId: any;
  showMessage = false;
  getLoanApplicationRuleList(loanApplicationId: number, eventCode: string) {


    this.ruleEngineService.getLoanApplicationRuleList(loanApplicationId, eventCode).subscribe((m: any[]) => {
      
      this.ruleList = m.map(a => {
        return {
          EffectiveFrom: a.EffectiveFrom,
          EffectiveTo: a.EffectiveTo,
          RuleId: a.RuleId,
          RuleName: a.RuleName,
          RuleTypeId: a.RuleTypeId,
          RuleVersion: a.RuleVersion,
          Targets: JSON.parse(a.Targets),
          failed: 0,
          completed: 0,
          unmatched: 0,
          Status: a.Status,

        }
      });

      debugger
      this.ruleProgressModel.show();
    });
  }

  ruleStartNotification() {
    this.commonService.hubConnection.off("ruleStartNotification");
    this.commonService.hubConnection.on("ruleStartNotification", (ruleId: number) => {
      //// console.log('start: ', ruleId);

      let rule = this.ruleList.find(m => m.RuleId == ruleId);
      //// console.log(rule.Targets);
      rule.Status = 3;

    });
  }

  totalRulesFailed = 0;
  ruleCompletionNotification() {
    this.commonService.hubConnection.off("ruleCompletionNotification");
    this.commonService.hubConnection.on("ruleCompletionNotification", (ruleId: number, status: number) => {
      //// console.log('rule: ', ruleId, ':', status);

      let rule = this.ruleList.find(m => m.RuleId == ruleId);
      //// console.log(rule.Targets);
      rule.Status = status;
      rule.unmatched = rule.Targets.filter(m => m.Status === 2).length;
      rule.completed = rule.Targets.filter(m => m.Status === 1).length;
      this.totalRulesFailed += rule.Targets.filter(m => m.Status === 0).length;
      rule.failed = rule.Targets.filter(m => m.Status === 0).length;
      let pending = this.ruleList.filter(m => m.Status == 4)
      if (pending.length == 0) {
        this.loanProgressModel.applyingRules = Progress.completed;
        this.loanProgressModel.finalizing = Progress.start;
      }
    });
  }

  targetCompletionNotification() {
    this.commonService.hubConnection.off("targetCompletionNotification");
    this.commonService.hubConnection.on("targetCompletionNotification", (ruleId: number, targetId: number, status: number) => {
      //// console.log('target: ', ruleId, ':', targetId, ':', status);
      let rule = this.ruleList.find(m => m.RuleId == ruleId);
      rule.Targets.find(m => m.TargetId == targetId).Status = status;
    });

  }

  //applicationStatusStartNotification() {

  //  this.commonService.hubConnection.on("applicationStatusStartNotification", (applicationId: number) => {

  //  });

  //}

  applicationStatusCompletionNotification() {
    this.commonService.hubConnection.off("applicationStatusCompletionNotification");
    this.commonService.hubConnection.on("applicationStatusCompletionNotification", (applicationId: number) => {

      this.messageCount += 1;
      this.loanProgressModel.finalizing = Progress.completed;
      //// console.log('1');
      if (this.totalRulesFailed == 0) {

        this.ruleProgressClose();
        //// console.log('message 2');
        //// console.log('this.loanProgressModel: ', this.loanProgressModel);

        if (this.messageCount === 1) {
          //// console.log('message 3');
          this.toaster.success(this.loanProgressModel.result.responseMessage);

        }

        this.loanapplicationservice.loanProgress.next(this.loanProgressModel);
        this.showMessage = false;
        //// console.log('this.loanId: ', this.loanId);

        //this.fillLeadForm(this.loanId);
        //this.loandocs.getLoanDocslist(this.loanId);
      } else {
        //this.RuleEngineHistory.getRuleEngineHistoryList();
        //// console.log('message 4');

        if (this.messageCount === 1) {
          this.toaster.success(this.loanProgressModel.result.responseMessage);
        }
      }
    });

  }
  ruleProgressClose() {
    this.ruleProgressModel.hide();
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove("modal-open");
    //if (this.totalRulesFailed != 0) {
    this.loadSave = true;
    this.fillLeadForm(this.loanId);
    this.loandocs.getLoanDocslist(this.loanId);
    //} else {
    this.RuleEngineHistory.getRuleEngineHistoryList();
    //}
  }
  //End For Rule Engine


  //Start Edit Deny Reason

  cancelDenyReason() {
    this.denyReason.hide();
  }
  editDenyReason(resonFrom: string) {
    if (resonFrom === 'NTP') {
      this.showDenyPopup = true;
      this.ReasonFrom = resonFrom;
      this.denyReasonField = this.formdata1.NTPReason;
      this.denyReason.show();
    }

    else if (resonFrom === 'NTPCO') {
      this.showDenyPopup = true;
      this.ReasonFrom = resonFrom;
      this.denyReasonField = this.formdata1.NTPCOReason;
      this.denyReason.show();
    }

    else if (resonFrom === 'Audit') {
      this.showDenyPopup = true;
      this.ReasonFrom = resonFrom;
      this.denyReasonField = this.formdata1.AuditDeny;
      this.denyReason.show();
    }

    else {
      this.showDenyPopup = false;
      this.ReasonFrom = resonFrom;
      this.denyReasonField = this.formdata1.BankReason;
      this.denyReason.show();
    }

  }

  UpdateDenyReson() {

    let type = this.ReasonFrom
    let reson = this.denyReasonField.trim();
    if (reson.trim().length == 0) {
      this.toaster.error("Reason is required.");
    }
    else if (reson.trim().length > 1000) {
      this.toaster.error("Maximum 1000 characters are allowed.");
    } else {
      this.loadSave = true;
      this.loanapplicationservice.UpdateDenyReson(this.loanId, type, reson).subscribe((result: any) => {

        if (result.statusCode == 200) {
          this.ngOnInit();
          this.denyReason.hide();
          this.loadSave = false;
          this.toaster.success(result.responseMessage);
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      }, error => {
        this.loading = false;
      });
    }
  }

  //End Edit Deny Reason

  ExecuteRuleEngineForPendingRules() {
    let loanProgress = new LoanProgressModel();
    loanProgress.result = {
      responseMessage: "Rule engine successfuly executed"
    }
    loanProgress.appyingChanges = Progress.start;
    this.loanapplicationservice.loanProgress.next(loanProgress);
    setTimeout(() => {
      loanProgress.appyingChanges = Progress.completed;
      this.loanapplicationservice.loanProgress.next(loanProgress);
      loanProgress.applyingRules = Progress.start;
      this.loanapplicationservice.loanProgress.next(loanProgress);
    }, 2000);

  }
  uncancelloanapp(id, applicationNumber) {
    this.applicationNumber = applicationNumber;
    const message = `Are you sure you want to uncancel loan application?`;
    this.dialogService.confirm('Un-Cancel Loan Application #(' + applicationNumber + ')', message).subscribe(confirmed => {
      if (confirmed) {
        this.UnCancelReasonModal.show();
      }
    });
  }

  closeUnCancelReason() {
    this.UnCancelReasonModal.hide();
  }

  addUnCancelForm = this.fb.group({
    // note: ['', Validators.required],
    reasonCancelDescription: ['', Validators.required]
  });

  get reasonCancelDescription() { return this.addUnCancelForm.get('reasonCancelDescription'); }

  SaveUncancelReason() {

    if (this.addUnCancelForm.valid) {
      this.loadSave = true;
      // this.notemodel.note_name = this.addNoteForm.value.note;
      this.reasonmodel.reason_description = this.addUnCancelForm.value.reasonCancelDescription;

      this.reasonmodel.id = this.loanId;
      this.reasonmodel.requestdate = null;
      this.reasonmodel.closedate = null;
      // // console.log(this.addNoteForm.value.note + ' sadf' + this.addNoteForm.value.noteDescription);

      this.loanapplicationservice.saveUncacnelReason(this.reasonmodel).subscribe((result: any) => {

        if (result.statusCode == 200) {
          //setTimeout(() => {  // console.log('notes') }, 3000);
          this.loadSave = false;
          this.toaster.success(result.responseMessage);
          this.addUnCancelForm.reset();
          this.UnCancelReasonModal.hide();
          this.router.navigateByUrl("/loanApplication");
          this.ngOnInit();
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }

        //}, error => {
        //  //this.loadSave = false;
      });

    }
    else {
      this.loadSave = false;
      this.commonService.validateAllFormFields(this.addUnCancelForm);
    }
  }

  VisibilityForVoidChangeOrderButton(CheckForDocument) {

    //// console.log('CheckForDocument', CheckForDocument);

    //// console.log('isChangeOrderApproved', this.isChangeOrderApproved);

    //// console.log('shouldVoidChangeOrderVisible', this.shouldVoidChangeOrderVisible);


    this.shouldVoidChangeOrderVisible = false;
    if (this.formstagedata) {
      var NtpChangeOrderStage = this.formstagedata.filter(function (item) { return item.loan_app_stage_name == 'NTP(CO)' });

      //this.isChangeOrderPlaced
      //this.IsNTPChangeOrderDone
      if (this.isChangeOrderPlaced == true && CheckForDocument > 0) {
        this.shouldVoidChangeOrderVisible = true;
        if (NtpChangeOrderStage.length > 0) {
          if (NtpChangeOrderStage[0].stageActive == 1 && NtpChangeOrderStage[0].stageapproved == 1 && this.ntpApprovedFlag == true) {
            this.shouldVoidChangeOrderVisible = false;
          }
        } else {
          if (this.ntpApprovedFlag == true) {
            this.shouldVoidChangeOrderVisible = false;
          }
        }
        //this.showCOBtn = false;
      }

    }


    //else if (this.isChangeOrderApproved == false && CheckForDocument == 0 && this.DocSignedApprovedFlag == true && this.isNTPFundReleaseApproved==false) {
    //  this.showCOBtn = true;
    //}
    //// console.log('shouldVoidChangeOrderVisible', this.shouldVoidChangeOrderVisible);

  }
  getTwilioSMSDetail() {
    this.loanapplicationservice.getTwilioSMSDetail(this.loanId, this.borrowerPhoneNumber).subscribe((result: any) => {
      this.smsData = result;
    });

  }
  getFundReleaseStageId() {
    var itemsdata = this.formstagedata.filter(x => x.loan_app_stage_name == "Fund release");

    return itemsdata[0].loan_app_stage_id;
  }
  refreshloandoclist() {
    this.loandocs.getLoanDocslist(this.loanId);
  }

  transferLoanApplication() {
    this.showtransferAppPopUp.show(this.loanId, this.LoanApplicationNumber);
  }

  transfertodealeruser() {
    var applicantName = this.formdata1.ApplicantName;
    this.showtransfertoDealerPopUp.show(this.loanId, this.LoanApplicationNumber, applicantName);
  }

  swapApplicants() {
    this.dialogService.confirm("Applicant Swap", "Are you sure to swap applicants?", "Yes", "No").subscribe(option => {
      if (option) {
        this.loanapplicationservice.SwapApplicants(this.loanId).subscribe(result => {
          this.toaster.success("Applicants swapped");
          this.pullCreditScore(false, 'SwapApplicant');


          // this.ExecuteRuleEngineForPendingRules();



          //this.loading = true;
          //this.isSubmitted = true;
          //let loanProgress = new LoanProgressModel();
          //loanProgress.appyingChanges = Progress.start;
          //this.loanapplicationservice.loanProgress.next(loanProgress);

          //this.loanapplicationservice.voidDocuments(this.loanId, true).subscribe(voidResponse => {
          //  this.lenderService.getBankIdByLoanApplicationId(this.loanId).subscribe(bankId => {
          //    this.loanapplicationservice.mergeWebmergeMapping(this.loanId, bankId).subscribe(resp => {
          //      // this.loading = false;
          //      this.isSubmitted = false;
          //      // console.log('1 Generate Document', resp);

          //      loanProgress.appyingChanges = Progress.completed;
          //      this.loanapplicationservice.loanProgress.next(loanProgress);
          //      loanProgress.applyingRules = Progress.start;
          //      loanProgress.result = resp;
          //      this.loanapplicationservice.loanProgress.next(loanProgress);
          //      // console.log('2 Generate Document', resp);
          //      this.loandocs.getLoanDocslist(this.loanId);

          //      if (resp.statusCode == 200) {
          //        //  this.toaster.success(resp.responseMessage);
          //        // this.ruleProgressShow();

          //      } else {
          //        this.toaster.error(resp.responseMessage);
          //      }

          //    }, err => {
          //      loanProgress.appyingChanges = Progress.failed;
          //      this.loanapplicationservice.loanProgress.next(loanProgress);
          //      this.isSubmitted = false;
          //    });
          //  }, err => {
          //    loanProgress.appyingChanges = Progress.failed;
          //    this.loanapplicationservice.loanProgress.next(loanProgress);
          //    this.isSubmitted = false;
          //  });
          //  this.toaster.success("Applicants swapped");
          //}, err => {
          //  loanProgress.appyingChanges = Progress.failed;
          //  this.loanapplicationservice.loanProgress.next(loanProgress);
          //  this.isSubmitted = false;
          //});
        }, err => {
          this.toaster.error("Swapping failed");
        })
      }
    })
  }



  showOverrideReasonPopup() {
    this.overRide();
  }
  overRide() {
    const message = `Are you sure you want to override the audit?`;
    this.dialogService.confirm('Override', message).subscribe(confirmed => {
      if (confirmed) {
        this.showReasonPopUpModal.show();
      }
    });
  }

  overrideForm = this.fb.group({
    overridereasonDescription: ['', Validators.required]
  })

  get overridereasonDescription() { return this.overrideForm.get('overridereasonDescription'); }

  SaveOverRideReason() {
    if (this.overrideForm.valid) {
      this.loadSave = true;
      this.reasonmodel.reason_description = this.overrideForm.value.overridereasonDescription;
      this.reasonmodel.id = this.loanId;
      this.reasonmodel.type = 'Audit';

      this.loanapplicationservice.saveOverrideReason(this.reasonmodel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.loadSave = false;
          this.toaster.success(result.responseMessage);
          this.overrideForm.reset();
          this.showReasonPopUpModal.hide();
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      });
    }
    else {
      this.loadSave = false;
      this.commonService.validateAllFormFields(this.overrideForm);
    }
  }

  closeoverrideReason() {
    this.showReasonPopUpModal.hide();
  }


  propertySearch() {
    this.router.navigateByUrl('/loanApplication/propertysearch')
  }
  justRefreshTabData(type) {
    var ths = this;
    if (type == "credit") {
      setTimeout(function () {
        ths.applicantCreditScoreData = [...ths.applicantCreditScoreData]
      }, 400);
    }
  }
  downloadFile(e: any, url: string) {
    this.commonService.downloadFile(e, url);
  }

  OnBackToReport() {
    this.location.back();
  }

  getTransferLoanApplicationList() {
    this.loanapplicationservice.getTransferLoanApplicationList(this.loanId, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue).subscribe((result: any) => {
      this.transferpagedData = this.loanapplicationservice.transferpagedData;
      if (this.transferpagedData.data.length > 0) {
        this.showTransferPanel = true;
      }
    });
  }

  transferOnChange() {
    this.getTransferLoanApplicationList();
  }
  transferSetPage($event) {
    this.currentPage = $event.page - 1;
    this.getTransferLoanApplicationList();
  }
  transferOnSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = $event.page - 1;

    this.getTransferLoanApplicationList();
  }


  //sendSFTPfile() {
  //  this.loanapplicationservice.sftp(this.loanId, this.LoanApplicationNumber).subscribe((result: any) => {
  //    if (result.statusCode == 200) { }
  //  });
  //}

  transferSFTPdoc() {
    if (this.isInternalVerification) {
      var message = `Are you sure you want to send the loan documents to the SFTP server?`;
      this.dialogService.confirm('Transfer Documents', message).subscribe(confirmed => {
        if (confirmed) {
          this.loadSave = true;
          this.loanapplicationservice.sftp(this.loanId, this.LoanApplicationNumber).subscribe((result: any) => {
            // console.log('result', result)
            if (result.statusCode == 200) {
              this.loadSave = false;
              this.toaster.success(result.responseMessage);
            }
            else {
              this.loadSave = false;
              this.toaster.error(result.responseMessage);
            }
          });
        }
      });
    }
    else {
      this.dialogService.confirm('Transfer Documents', "You cannot use this feature because the INTERNAL VERIFICATION stage is not yet completed?").subscribe(confirmed => {
        if (confirmed) {
        }
      });
    }

  }
}

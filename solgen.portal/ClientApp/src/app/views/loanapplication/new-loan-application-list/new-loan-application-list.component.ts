import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { LoanapplicationserviceService, reasonModel, BankerModel } from '../loanapplicationservice.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { CommonService } from '../../shared/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { LoanapplicationpendingdocumentComponent } from '../loanapplicationpendingdoc/loanapplicationpendingdocument.component';
import { LoanhomiadvancesearchfilterComponent } from '../../shared/loanhomiadvancesearchfilter/loanhomiadvancesearchfilter.component';
import { LoanhomimanageviewComponent } from '../../shared/loanhomimanageview/loanhomimanageview.component';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { LeadlistService } from '../../lead/leadlist.service';
import { TransferloanapplicationComponent } from '../transferloanapplication/transferloanapplication.component';

@Component({
  selector: 'app-new-loan-application-list',
  templateUrl: './new-loan-application-list.component.html',
  styleUrls: ['./new-loan-application-list.component.scss']
})
export class NewLoanApplicationListComponent implements OnInit {
  @ViewChild('mytable', { static: false }) table;
  @ViewChild('assignpopup', { static: false }) assignpopupModel: ModalDirective;
  @ViewChild('AddReason', { static: false }) AddReasonModal: ModalDirective;
  @ViewChild('userTypeSelect', { static: false }) userTypeSelect: NgSelectComponent;
  @ViewChild('salesassignpopup', { static: false }) salesassignpopupModel: ModalDirective;

  @ViewChild('showtransferAppPopUp', { static: false }) showtransferAppPopUp: TransferloanapplicationComponent;

  @ViewChild('reasonpopup', { static: false }) reasonPopUpModel: ModalDirective;

  @ViewChild('fileupload', { static: false }) fileupload: FileuploadComponent;
  @ViewChild('templateLoanHomiManageView', { static: false }) loanHomiManageViewModal: LoanhomimanageviewComponent;
  @ViewChild('templatAdvanceFilterView', { static: false }) advanceFilterViewModal: LoanhomiadvancesearchfilterComponent;

  @ViewChild('UnCancelReason', { static: false }) UnCancelReasonModal: ModalDirective;

  assignedData: any[] = [];
  applicantemail = "";
  DocVerified = 0;
  assignedBankerData: any[] = [];
  @ViewChild('pendingDoc', { static: false }) pendingDoc: LoanapplicationpendingdocumentComponent;
  ColumnMode = ColumnMode;
  loadSave: boolean = false;
  bankerModel: BankerModel = new BankerModel()
  SelectionType = SelectionType;
  @Input() offset: number;
  @Input() offsetSaleUser: number;
  @Input() offsetBankUser: number;
  lstUserType: any;
  lstdealerCompany: any;
  searchUserType = '';
  loginuserid: any;
  companyId: any;
  isLoading: boolean = false;

  userId: any;
  //modulePermission: ModuleList;
  loading = false;
  DocumentName: any;
  sortDir = 'desc';
  sortDirBankerList = 'desc';
  sortDirSalesList = 'desc';
  sortColumn = 'id';
  sortColumnBankerList = 'CreatedOn';
  sortColumnSalesList = 'CreatedOn';
  pagedData: any = {
    pager: {},
    data: []
  };
  pagedDataBankerList: any = {
    pager: {},
    data: []
  };
  pagedDataSalesList: any = {
    pager: {},
    data: []
  };
  selected = [];
  listFilter = '';
  listFiltertext = '';
  searchTxt = '';
  data: any = [];
  loanAppid: any
  lstPageSize: any
  pageSizeValue: number;
  lstPageSizeBankerList: any
  pageSizeValueBankerList: number;
  pageSizeValueSalesList: number;
  currentPage: number;
  currentPageSalesUserList: number;
  currentPageBankUserList: number;
  batchid: number = 0;
  isBanker: boolean = false;
  isCancelRequest = 0;
  applicationNumber: any;
  isFinanceUser: boolean = false;
  isCompanyAdmin: boolean = false;
  userType: any;
  AssignedSalesUsers: any;
  isContact: boolean = false;
  loanid = 0;
  iscancelreq: boolean = false;
  reasonmodel: reasonModel = new reasonModel();
  listNameFilter = '';
  listBankerNameFilter=''
  modulePermission: any[]=[];
  canCancel: boolean = false;
  isUpdate: boolean = false;
  canAssign: boolean = false;
  isSales: boolean = false;
  is_filter: any;
  custom_view_id: number=0;
  jsonData: any;
  columndata: any;
  columnheading: any;
  totalRecords: any;
  vewId: any = null;
  ViewModel: any = '';
  reasonHeading: string;
  DenyReson: any;
  applicantName: string;
  listType = '';
  isDealerUser: boolean = false;
  isCommonUser: boolean = false;
  roleCode: string = '';
  isDealerCompanyAdmin: boolean = false;
  contentHeader: object;

  constructor(private loanapplicationserviceService: LoanapplicationserviceService, private dialogService: ConfirmationDialogService, private leadlistService: LeadlistService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute, private fb: FormBuilder,
     private toaster: ToastrService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
    });
    this.commonService.getMasterItemsList("manageuser_usertype_add").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })  
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);
   

    let cancel = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'LOANAPPLICATIONCANCEL');
    if (cancel == undefined) {
      cancel = "null";
    } else {
      this.canCancel = true;   
    }
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'LOANAPPLICATIONUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let Assign = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'LOANAPPLICATIONASSIGN');
    if (Assign == undefined) {
      Assign = "null";
    } else {
      this.canAssign = true;
    }
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
    //// console.log('cancel',this.canCancel + '' + this.isUpdate +'' +this.canAssign)
  }
  addReasonForm = this.fb.group({
    // note: ['', Validators.required],
    reasonDescription: ['', Validators.required],
    requestdate: [null, Validators.nullValidator],
    closedate: [null, Validators.nullValidator]

  });


  viewLoanApp(id: any) {
    //if (this.isUpdate || this.listType == 'Completed' || this.listType == 'Cancelled') {
    //  this.router.navigateByUrl('/loanApplication/Detail/' + id);
    //}

    //// console.log('this.isUpdate', this.isUpdate);
    //// console.log('this.listType', this.listType);

    if (this.listType == 'Normal' && this.isUpdate)
    {
      this.router.navigateByUrl('/loanApplication/Detail/' + id);
    }
    else if (this.listType == 'Cancelled' && this.isUpdate) {
      this.router.navigateByUrl('/loanApplications/Cancelled/Detail/' + id);
    }
    else if (this.listType == 'Completed' && this.isUpdate)  {
      this.router.navigateByUrl('/loanApplications/Completed/Detail/' + id);
    }

    else {
      this.toaster.error('You are not authorized please contact adminstrator');
    }
    
  }

  GetcustomViewid(event) {

    if (event == 'undefined' || typeof event == 'undefined') {
      this.LoadViewData();
    }
    this.pagedData.data.forEach(cnt => {
      if (cnt.custom_view_id == event) {
        this.ViewModel = cnt.view_name;
      }
    });
    this.custom_view_id = event;
    this.vewId = event;
    this.LoadViewData();
    this.refresh();
    //this.custom_view_id = event;
    //this.refresh();
  }

  OpenManageViewPopUp(TemplateName: any) {
    //// console.log('TemplateName', TemplateName)
    this.loanHomiManageViewModal.show(TemplateName);
  }

  advanceFilterPopUp() {
    this.is_filter = '';
    this.is_filter = this.listFiltertext.length;
    this.advanceFilterViewModal.show(this.companyId, this.is_filter);
  }
  ApplyAdvanceFilter(event) {
    //; 
    this.currentPage = 1;
    this.listFiltertext = '';
    this.listFiltertext = event;
    
    this.refresh();
  }
  
  SaveReason() {
   
    if (this.addReasonForm.valid) {
      this.loadSave = true;
      // this.notemodel.note_name = this.addNoteForm.value.note;
      this.reasonmodel.reason_description = this.addReasonForm.value.reasonDescription;
      if (this.addReasonForm.value.requestdate != null) {
        this.reasonmodel.requestdate = this.addReasonForm.value.requestdate.toString();
      }
      if (this.addReasonForm.value.closedate != null) {
        this.reasonmodel.closedate = this.addReasonForm.value.closedate.toString();
      }
      this.reasonmodel.id = this.loanid;
      this.reasonmodel.isverified = this.DocVerified == 0 ? false : true;
      this.reasonmodel.email = this.applicantemail;
      // // console.log(this.addNoteForm.value.note + ' sadf' + this.addNoteForm.value.noteDescription);
      if (this.isCancelRequest == 1 && !this.isBanker) {
        this.loanapplicationserviceService.SendToBankUser(this.loanid, this.applicationNumber, this.reasonmodel.reason_description, this.reasonmodel.requestdate).subscribe(response => {
          this.loadSave = false;
          this.toaster.success("Cancellation request sent to bank user.");
          this.addReasonForm.reset();
          this.refresh();
          this.AddReasonModal.hide();
        }, error => {

        });
      }
      else {
        this.loanapplicationserviceService.saveReason(this.reasonmodel).subscribe((result: any) => {

          if (result.statusCode == 200) {
            //setTimeout(() => {  // console.log('notes') }, 3000);
            this.loadSave = false;
            this.toaster.success(result.responseMessage);
            this.addReasonForm.reset();
            this.refresh();
            this.AddReasonModal.hide();


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
      this.commonService.validateAllFormFields(this.addReasonForm);
    }
  }
  ngOnInit() {

    var  url = this.router.url;
    if (url == '/loanApplications/Completed') {
      this.listType = 'Completed';
    }
    else if (url == '/loanApplications/Cancelled') {
      this.listType = 'Cancelled';
    }
    else {
      this.listType = 'Normal';
    }

    //this.activeRoute.url.subscribe(params => {
    //  // console.log('params', params);
    //  if (params.length != 0) {
    //    if (params[1].path == 'Completed') {
    //      this.listType = 'Completed';
    //    }
    //    if (params[1].path == 'Cancelled') {
    //      this.listType = 'Cancelled';
    //    }
    //  }
    //  else {
    //    this.listType = 'Normal';
    //  }
    //});
    //// console.log('this.listType', this.listType);

    this.vewId = null;
    this.isBanker = false;
    this.isFinanceUser = false;
    this.isCompanyAdmin = false;
    this.isSales = false;
    var ab = this.commonService.getQueryStringValue("id");
    this.batchid = parseInt(ab);
    this.pageSizeValue = 15;
    this.pageSizeValueBankerList = 10;
    this.pageSizeValueSalesList = 10;
    this.currentPage = 1;
    this.currentPageSalesUserList = 1;
    this.currentPageBankUserList = 1;
    this.getPageSizes();
    this.refresh();
    this.LoadViewData();


    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      //// console.log("roleCode", userdetail.roleCode);

      this.roleCode = userdetail.roleCode;

      if (this.roleCode == 'dealer_companyadmin') {
        this.isDealerCompanyAdmin = true;
      }

      if (userdetail.userType == "usertypecompanyadmin") {
        this.isCompanyAdmin = true;
      }
      else {
        this.isCompanyAdmin = false;
      }
      if (userdetail.userType == "usertypecontact") {
        this.isContact = true;
      }
      if (userdetail.userType === "usertypefinance") {
        this.isFinanceUser = true;
        //// console.log("isFinanceUser", this.isFinanceUser);
      }
      else {
        this.isFinanceUser = false;
      }

       if (userdetail.userType === "usertypedealer") {
        this.isDealerUser = true;
      }
       else {
         this.isDealerUser = false;
      }
      if (userdetail.userType === "usertypecommonuser" || userdetail.userType === "usertypeaudit" || userdetail.userType === "usertyperelationship" ) {
        this.isCommonUser = true;
      }
      else {
        this.isCommonUser = false;
      }
      
      if (userdetail.userType=== 'usertypebanker') {
        this.isBanker = true;
      }

      if (userdetail.userType === 'usertypesales') {
        this.isSales = true;
      }
    });


    this.initBreadCrumb();
  }
  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Loan Application',
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
           name: 'Loan Application',
           isLink: false
          }
        ]
    };
  }

  openFileUpload(AccountId:any,LoanId:any) {
    this.fileupload.show(AccountId, LoanId);
  }
  getSum(Required: number,Receive): number {
    let sum = 0;
    sum = Required - Receive;
    return sum;
  }

  DisplayDocumentPopupWindow(id, loannum) {
    this.applicationNumber = loannum;
    this.loanapplicationserviceService.GetPendingDocumentName(id).subscribe((result: any) => {
      if (result != null) {
        this.pendingDoc.show(id, result);
      }
      this.DocumentName = result;
    });
    
  }
  customerDoc() {
    this.search();
  }

  encryptData(data) {
    //try {
    //  return CryptoJS.AES.encrypt(JSON.stringify(data), environment.encryptSecretKey).toString();
    //} catch (e) {
    //  // console.log(e);
    //}
  }
  sharelink(id) {
    const message = `Are you sure you want to share the upload document link?`;
    this.dialogService.confirm('Share Link', message).subscribe(confirmed => {
      if (confirmed) {
        this.loanapplicationserviceService.ShareDocLink(id).subscribe(response => {
          this.toaster.success(`Link has been shared successfully.`);
        });
      }
    });
  }




  refresh() {
    this.isLoading = true;
    this.loanapplicationserviceService.GetNewLoanApplicationList(this.listFiltertext, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, 'LIST', this.custom_view_id, this.batchid, this.listType).subscribe(response => {

      this.columndata = [];
      this.columnheading = [];

      this.jsonData = response;
      this.columndata = this.jsonData.data;
      this.columnheading = this.jsonData.schema;
      console.log("Listing data",this.jsonData);
      this.columnheading.forEach(function (element) {
        element["colwidth"] = (String(element.DISPLAY_NAME).length * 200) + 20;
      });

      //// console.log('this.columndata', this.columndata)
      //// console.log('this.this.columnheading', this.columnheading)

      //this.pagedData = this.loanapplicationserviceService.pagedData;
      //this.offset = this.currentPage;
      if (response.data.length > 0) {
        this.totalRecords = this.columndata[0].total_records;
       
      } else {
        this.totalRecords = 0;
      }
      this.offset = this.currentPage;

      this.isLoading = false;
    }, error => {
        this.isLoading = false;
    })
  }

  cancelloanapp(id, isapproved, isCancelRequest, isBanker, applicationNumber) {
    this.loanapplicationserviceService.GetApplicationDetails(id, this.companyId, this.userId).subscribe((result: any) => {
      let formdata1 = this.loanapplicationserviceService.applicationInfo;
      this.DocVerified = formdata1.DocVerified;
      this.applicantemail = formdata1.Email
      //// console.log('this.applicantemail', this.applicantemail);
    });
    this.applicationNumber = applicationNumber;
    if (isapproved != 1 || (isCancelRequest == 1 && isBanker == 1)) {

      const message = `Are you sure you want to cancel loan application #` + applicationNumber +`?`;
      this.dialogService.confirm('Cancel Loan Application (#' + applicationNumber+')', message).subscribe(confirmed => {
        if (confirmed) {
          this.loanid = id;
          this.isCancelRequest = 0;
          this.requestdate.setValue(null);
          this.requestdate.clearValidators();
          this.requestdate.updateValueAndValidity();
          this.closedate.setValidators([Validators.required]);
          this.closedate.updateValueAndValidity();
          this.AddReasonModal.show();
        }
      });
    } else {
      let message = `Funds are released, Send loan application to Bank User for cancellation?`;
      if (isCancelRequest == 1 && isBanker != 1) {
        message = `The cancellation request for this application has been sent to the bank user.`;
        this.toaster.success(message);
      }
      else {
        this.dialogService.confirm('Cancel Loan Application (#' + applicationNumber + ')', message).subscribe(confirmed => {
          if (confirmed) {
            this.loanid = id;
            this.AddReasonModal.show();
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

  get curPage(): number {
    return this.offset;
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
      this.lstPageSizeBankerList = this.commonService.masters;
    })
  }

  setPage($event) {
    this.loadSave = true;
    this.currentPage = $event.page;
    this.refresh();
  }
  updateFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }

  search() {
    this.currentPage = 1;
    this.listFiltertext = '';
    if (this.listFilter.trim().length > 0) {
      this.listFiltertext = "t36.Name like '%" + this.listFilter + "%' or t34.LoanApplicationNumber like '%" + this.listFilter + "%'";
    }
    this.refresh();
  }

  onSort($event) {
    //// console.log('sort', $event);
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

  reset() {

    if (this.listType == 'Normal') { 
      this.router.navigateByUrl("/loanApplication");
    }
    if (this.listType == 'Completed') {
      this.router.navigateByUrl("/loanApplications/Completed");
    }
    if (this.listType == 'Cancelled') {
      this.router.navigateByUrl("/loanApplications/Cancelled");
    }
    this.batchid = 0;
    this.listFiltertext = '';
    this.listFilter=''
    this.refresh();
  }
  //Assign Popup
  showpopup(id: any, appnum: any, applicantName: string) {
  
    this.assignedBankerData = [];
    this.currentPageBankUserList = 1;
    this.loanAppid = id;
    this.listBankerNameFilter = '';
    this.applicationNumber = appnum;
    this.applicantName = applicantName;
    this.loanapplicationserviceService.GetLoanApplicationBankerList(this.listBankerNameFilter,this.sortColumnBankerList, this.sortDirBankerList, this.currentPageBankUserList, this.pageSizeValueBankerList, this.loanAppid).subscribe(response => {
      this.pagedDataBankerList = this.loanapplicationserviceService.pagedData;
      this.offsetBankUser = this.currentPageBankUserList;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
    this.assignpopupModel.show(); 
  }
  searchBankUserList() {
    this.loading = true;
    this.loanapplicationserviceService.GetLoanApplicationBankerList(this.listBankerNameFilter, this.sortColumnBankerList, this.sortDirBankerList, this.currentPageBankUserList, this.pageSizeValueBankerList, this.loanAppid).subscribe(response => {
      this.pagedDataBankerList = this.loanapplicationserviceService.pagedData;
      this.offsetBankUser = this.currentPageBankUserList;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  resetBankUserList() {
    this.loading = true;
    this.listBankerNameFilter = '';
    this.sortDir = 'desc';
    this.sortColumn = 'CreatedOn';
    this.pageSizeValue = 10;
    this.loanapplicationserviceService.GetLoanApplicationBankerList(this.listBankerNameFilter, this.sortColumnBankerList, this.sortDirBankerList, this.currentPageBankUserList, this.pageSizeValueBankerList, this.loanAppid).subscribe(response => {
      this.pagedDataBankerList = this.loanapplicationserviceService.pagedData;
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
      this.loanapplicationserviceService.GetLoanApplicationBankerList(this.listBankerNameFilter, this.sortColumnBankerList, this.sortDirBankerList, this.currentPageBankUserList, this.pageSizeValueBankerList, this.loanAppid).subscribe(response => {
        this.pagedDataBankerList = this.loanapplicationserviceService.pagedData;

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
    this.loanapplicationserviceService.GetLoanApplicationBankerList(this.listBankerNameFilter,this.sortColumnBankerList, this.sortDirBankerList, this.currentPageBankUserList, this.pageSizeValueBankerList, this.loanAppid).subscribe(response => {
      this.pagedDataBankerList = this.loanapplicationserviceService.pagedData;

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
    this.loanapplicationserviceService.GetLoanApplicationBankerList(this.listBankerNameFilter,this.sortColumnBankerList, this.sortDirBankerList, this.currentPageBankUserList, this.pageSizeValueBankerList, this.loanAppid).subscribe(response => {
      this.pagedDataBankerList = this.loanapplicationserviceService.pagedData;

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
    this.loanapplicationserviceService.GetLoanApplicationBankerList(this.listBankerNameFilter,this.sortColumnBankerList, this.sortDirBankerList, this.currentPageBankUserList, this.pageSizeValueBankerList, this.loanAppid).subscribe(response => {
      this.pagedDataBankerList = this.loanapplicationserviceService.pagedData;

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
  close() {
    this.AddReasonModal.hide();
  }

  //================
  //Sales Assign Popup
  showAssignSalesPopup(id: any, loannum: any, applicantName: string) {
    //// console.log('applicantName', applicantName);
    this.isLoading = true;
    this.listNameFilter = '';
    this.searchUserType = '';
    this.userTypeSelect.clearModel();
    this.assignedData = [];
    this.currentPageSalesUserList = 1;
    this.loanAppid = id;
    this.applicationNumber = loannum;
    this.applicantName = applicantName;
    this.loanapplicationserviceService.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType,this.sortColumnSalesList, this.sortDirSalesList, this.currentPageSalesUserList, this.pageSizeValueSalesList, id).subscribe(response => {
      this.pagedDataSalesList = this.loanapplicationserviceService.pagedData;
      this.offsetSaleUser = this.currentPageSalesUserList;
      this.loading = false;
      this.isLoading = false;
    }, error => {
      this.loading = false;
      this.isLoading = false; 
    });
    this.salesassignpopupModel.show();

  }


  transferLoanApplication(id: any, loanAppNumber: any) {
    this.showtransferAppPopUp.show(id, loanAppNumber);
  }




  get curPageSalesUserList(): number {
    return this.offsetSaleUser;
  }

  SetUserType(utype: any) {
    this.currentPageSalesUserList = 1;
    this.searchUserType = utype;
    this.loanapplicationserviceService.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType,this.sortColumnSalesList, this.sortDirSalesList, this.currentPageSalesUserList, this.pageSizeValueSalesList, this.loanAppid).subscribe(response => {
      this.pagedDataSalesList = this.loanapplicationserviceService.pagedData;

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
      this.loanapplicationserviceService.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType, this.sortColumnSalesList, this.sortDirSalesList, this.currentPageSalesUserList, this.pageSizeValueSalesList, this.loanAppid).subscribe(response => {
        this.pagedDataSalesList = this.loanapplicationserviceService.pagedData;

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
    this.loanapplicationserviceService.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType, this.sortColumnSalesList, this.sortDirSalesList, this.currentPageSalesUserList, this.pageSizeValueSalesList, this.loanAppid).subscribe(response => {
      this.pagedDataSalesList = this.loanapplicationserviceService.pagedData;
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
    this.loanapplicationserviceService.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType,this.sortColumnSalesList, this.sortDirSalesList, this.currentPageSalesUserList, this.pageSizeValueSalesList, this.loanAppid).subscribe(response => {
      this.pagedDataSalesList = this.loanapplicationserviceService.pagedData;
      this.offsetSaleUser = this.currentPageSalesUserList;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  
  onChangeSalesUserList($event) {
    this.currentPageSalesUserList = 1;
    this.loading = true;
    this.loanapplicationserviceService.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType,this.sortColumnSalesList, this.sortDirSalesList, this.currentPageSalesUserList, this.pageSizeValueSalesList, this.loanAppid).subscribe(response => {
      this.pagedDataSalesList = this.loanapplicationserviceService.pagedData;

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
    this.loanapplicationserviceService.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType,this.sortColumnSalesList, this.sortDirSalesList, this.currentPageSalesUserList, this.pageSizeValueSalesList, this.loanAppid).subscribe(response => {
      this.pagedDataSalesList = this.loanapplicationserviceService.pagedData;

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
    this.loanapplicationserviceService.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType,this.sortColumnSalesList, this.sortDirSalesList, this.currentPageSalesUserList, this.pageSizeValueSalesList, this.loanAppid).subscribe(response => {
      this.pagedDataSalesList = this.loanapplicationserviceService.pagedData;

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
  let  isFound: Boolean = false;
    this.assignedData.forEach(s => {
      if(s.Email === row.Email)
      {
        s.Status = row.Status;
        isFound = true;
    }
    })
    if (isFound === false) {
      this.assignedData.push(row);
    }
  }

  saveAssociateBanker() {
    this.data = JSON.stringify(this.assignedBankerData);
    this.bankerModel.loanappid = this.loanAppid;
    this.bankerModel.contactids = this.data;
    this.bankerModel.objectName = 'loanapplication';
    this.bankerModel.applicantName = this.applicantName;
    this.bankerModel.applicationNumber = this.applicationNumber;
      this.loanapplicationserviceService.saveAssociateBanker(this.bankerModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.assignpopupModel.hide();    
        }
      });
  }

  saveAssignedSalesUserDetail() {
    this.isLoading = true;
    this.AssignedSalesUsers = JSON.stringify(this.assignedData);
    this.bankerModel.loanappid = this.loanAppid;
    this.bankerModel.contactids = this.AssignedSalesUsers;
    this.bankerModel.objectName = 'loanapplication';
    this.bankerModel.applicantName = this.applicantName;
    this.bankerModel.applicationNumber = this.applicationNumber;
    this.loanapplicationserviceService.saveAssignedSalesUserDetail(this.bankerModel).subscribe((result: any) => {
      if (result.statusCode == 200) {
        this.toaster.success(result.responseMessage);
        this.salesassignpopupModel.hide();
      }
      this.isLoading = false;
    });

  }
  get reasonDescription() { return this.addReasonForm.get('reasonDescription'); }
  get requestdate() { return this.addReasonForm.get('requestdate'); }
  get closedate() { return this.addReasonForm.get('closedate'); }

  LoadViewData() {
    this.loadSave = true;
    this.currentPage = 1;
    this.commonService.GetLoanHomiViewList(this.searchTxt, this.searchUserType, this.sortColumn, this.sortDir, 0, 1500, 'finance', 'LoanApplicationInfo', this.companyId, this.listType).subscribe(response => {
        this.pagedData = this.commonService.loanHomiPagedData;
        //// console.log('this.pagedData', this.pagedData);

      this.pagedData.data.forEach(cnt => {
        if (cnt.is_default == true && (this.vewId == null || this.vewId == 0)) {
          this.vewId = cnt.custom_view_id;
          this.ViewModel = cnt.view_name;
        }
      });

      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    })
  }

  SetManageViewValue(event, text) {
    this.sortColumn = 'id';
    this.sortDir = 'desc';
    this.ViewModel = text;
    this.custom_view_id = event;
    this.refresh();
  }

  closeReasonModel() {
    this.reasonPopUpModel.hide();
  }

  showReasonPopUp(loannum: any, reson: any, type: string) {
    if (type == 'BankDenyReason') {
      this.reasonHeading = 'Bank Deny Reason ' + '(#'+loannum +')';
      this.DenyReson = reson;
      this.reasonPopUpModel.show();
    }
    else {
      this.reasonHeading = 'NTP Deny Reason ' + '(#' + loannum + ')';
      this.DenyReson = reson;
      this.reasonPopUpModel.show();
    }

  }

  uncancelloanapp(id, applicationNumber) {

    this.applicationNumber = applicationNumber;

    const message = `Are you sure you want to uncancel loan application?`;
    this.dialogService.confirm('Un-Cancel Loan Application #(' + applicationNumber + ')', message).subscribe(confirmed => {
      if (confirmed) {
        this.loanid = id;

        this.UnCancelReasonModal.show();
      }
    });



  }
  closeuncancelloanapp() {
    this.UnCancelReasonModal.hide();
  }
  SaveUncancelReason() {

    if (this.addUnCancelForm.valid) {
      this.loadSave = true;
    
      this.reasonmodel.reason_description = this.addUnCancelForm.value.UncancelReasonDescription;

      this.reasonmodel.id = this.loanid;
      this.reasonmodel.requestdate = null;
      this.reasonmodel.closedate = null;
      // // console.log(this.addNoteForm.value.note + ' sadf' + this.addNoteForm.value.noteDescription);

      this.loanapplicationserviceService.saveUncacnelReason(this.reasonmodel).subscribe((result: any) => {

        if (result.statusCode == 200) {
          //setTimeout(() => {  // console.log('notes') }, 3000);
          this.loadSave = false;
          this.toaster.success(result.responseMessage);
          this.addUnCancelForm.reset();
          this.refresh();
          this.UnCancelReasonModal.hide();


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

  addUnCancelForm = this.fb.group({
    // note: ['', Validators.required],
    uncancelReasonDescription: ['', Validators.required]


  });
  get uncancelReasonDescription() { return this.addUnCancelForm.get('uncancelReasonDescription'); }


}

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModuleList, CommonService } from '../../shared/common.service';
import { LoanapplicationserviceService, BankerModel, reasonModel } from '../loanapplicationservice.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { LoanapplicationpendingdocumentComponent } from '../loanapplicationpendingdoc/loanapplicationpendingdocument.component';
import { Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-canceledloanapplciation',
  templateUrl: './canceledloanapplciation.component.html',
  styleUrls: ['./canceledloanapplciation.component.scss']
})
export class CanceledloanapplciationComponent implements OnInit {

  setPageBankerList
  onSortBankerList
  saveAssociateBanker
  closeSalesAssignModel
  setPageSalesList
  onSortSalesList
  saveAssignedSalesUserDetail





  @ViewChild('assignpopup', { static: false }) assignpopupModel: ModalDirective;
  @ViewChild('UnCancelReason', { static: false }) UnCancelReasonModal: ModalDirective;
  @ViewChild('salesassignpopup', { static: false }) salesassignpopupModel: ModalDirective;
  @ViewChild('fileupload', { static: false }) fileupload: FileuploadComponent;
  applicationNumber: any;
  @ViewChild('pendingDoc', { static: false }) pendingDoc: LoanapplicationpendingdocumentComponent;
  ColumnMode = ColumnMode;
  bankerModel: BankerModel = new BankerModel()
  SelectionType = SelectionType;
  @Input() offset: number;
  @Input() offsetSaleUser: number;
  @Input() offsetBankUser: number;
  lstUserType: any;
  searchUserType = '';
  loginuserid: any;
  modulePermission: ModuleList;
  loading = false;
  DocumentName: any;
  sortDir = 'desc';
  sortDirBankerList = 'desc';
  sortDirSalesList = 'desc';
  sortColumn = 'CreatedOn';
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
  loanid = 0;
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
  isCompanyAdmin: boolean = false;
  userType: any;
  AssignedSalesUsers: any;
  isContact: boolean = false;
  loadSave: boolean = false;
  isSales: boolean = false;
  isFinanceUser: boolean = false;
  reasonmodel: reasonModel = new reasonModel();
  contentHeader: object;
  constructor(private loanapplicationserviceService: LoanapplicationserviceService, private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router, private fb: FormBuilder,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService) {
    this.commonService.getMasterItemsList("usertype").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);


    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });

  }

  ngOnInit() {
    this.isBanker = false;
    this.isCompanyAdmin = false;
    var ab = this.commonService.getQueryStringValue("id");
    this.batchid = parseInt(ab);
    this.pageSizeValue = 10;
    this.pageSizeValueBankerList = 10;
    this.pageSizeValueSalesList = 10;
    this.currentPage = 1;
    this.currentPageSalesUserList = 1;
    this.currentPageBankUserList = 1;
    this.getPageSizes();
    this.refresh();

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      //// console.log('userdetail:', userdetail)
      if (userdetail.userType == "usertypecompanyadmin") {
        this.isCompanyAdmin = true;
      }
      else {
        this.isCompanyAdmin = false;
      }
      if (userdetail.userType == "usertypecontact") {
        this.isContact = true;
      }
      if (userdetail.userType === 'usertypesales') {
        this.isSales = true;
      }
      if (userdetail.userType === 'usertypebanker') {
        this.isBanker = true;
      }
      if (userdetail.userType == "usertypefinance") {
        this.isFinanceUser = true;

      }
    });
  
  
    this.initBreadCrumb();
  }
  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Cancelled Loan Application',
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
           name: 'Cancelled Loan Application',
           isLink: false
          }
        ]
    };
  }
  openFileUpload(AccountId: any, LoanId: any) {
    this.fileupload.show(AccountId, LoanId);
  }
  getSum(Required: number, Receive): number {
    let sum = 0;
    sum = Required - Receive;
    return sum;
  }
  close() {
    this.UnCancelReasonModal.hide();
  }
  SaveUncancelReason() {
   
    if (this.addUnCancelForm.valid) {
      this.loadSave = true;
      // this.notemodel.note_name = this.addNoteForm.value.note;
      this.reasonmodel.reason_description = this.addUnCancelForm.value.reasonDescription;

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
  addUnCancelForm = this.fb.group({
    // note: ['', Validators.required],
    reasonDescription: ['', Validators.required]


  });
  get reasonDescription() { return this.addUnCancelForm.get('reasonDescription'); }
  DisplayDocumentPopupWindow(id,loannum) {
    this.applicationNumber = loannum;
    this.loanapplicationserviceService.GetPendingDocumentName(id).subscribe((result: any) => {
      if (result != null) {
        this.pendingDoc.show(id, result);
      }
      this.DocumentName = result;
    });

  }
  refresh() {
    this.loading = true;
    this.loanapplicationserviceService.GetCanceledLoanApplicationList(this.listFiltertext, this.searchUserType, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid, this.batchid).subscribe(response => {

      this.pagedData = this.loanapplicationserviceService.pagedData;
      //// console.log("pagedData", this.pagedData)
      this.offset = this.currentPage;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
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
    this.loading = true;
    this.currentPage = $event.page;
    this.refresh();
    //this.loanapplicationserviceService.GetLoanApplicationList(this.listFilter, this.searchUserType, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid).subscribe(response => {
    //  this.pagedData = this.loanapplicationserviceService.pagedData;
    //  this.loading = true;
    //}, error => {
    //  this.loading = false;
    //});
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
      this.listFiltertext = this.listFilter;
    }
    this.refresh();
  }
  onSort($event) {
    //// console.log('$event', $event);
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = 1;
    this.loading = true;
    if (this.batchid == NaN) {
      this.batchid = 0;
    }
    this.loanapplicationserviceService.GetCanceledLoanApplicationList(this.listFilter, this.searchUserType, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid, this.batchid).subscribe(response => {
      this.pagedData = this.loanapplicationserviceService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  onChange($event) {
    this.currentPage = 1;
    this.refresh();
  }
  reset() {
    this.router.navigateByUrl("/loanApplication/canceledloanapplciation");
    this.batchid = 0;
    this.listFiltertext = '';
    this.listFilter = ''
    this.refresh();
  }
  //Assign Popup
  

  get curPageBankUserList(): number {
    return this.offsetBankUser;
  }
 

  
  closemodel() {
    this.assignpopupModel.hide();
  }
  //================

 
}

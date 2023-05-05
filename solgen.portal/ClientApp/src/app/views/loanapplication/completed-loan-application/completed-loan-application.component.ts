import { Component, OnInit, Input } from '@angular/core';
import { LoanapplicationserviceService } from '../loanapplicationservice.service';
import { CommonService } from '../../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomHttpParamEncoder } from '../../../services/customHttpParamEncoder ';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-completed-loan-application',
  templateUrl: './completed-loan-application.component.html',
  styleUrls: ['./completed-loan-application.component.scss']
})
export class CompletedLoanApplicationComponent implements OnInit {
    companyId: any;
    userId: any;
    lstUserType: any;
    modulePermission: any[];
    canCancel: boolean;
    isUpdate: boolean ;
    canAssign: boolean;
    loginuserid: any;
    isBanker: boolean;
    isFinanceUser: boolean;
    isCompanyAdmin: boolean;
    isSales: boolean;
  batchid: number;
  pageSize: any = 10;
    pageSizeValue: number;
    pageSizeValueBankerList: number;
    pageSizeValueSalesList: number;
    currentPage: number;
    currentPageSalesUserList: number;
    currentPageBankUserList: number;
    isContact: boolean;
    lstPageSize: any;
    lstPageSizeBankerList: any;
    loadSave: boolean = false;
    pagedData: any = {
        pager: {},
        data: []
    };    
    @Input() offset: number;
    listFiltertext: any = "";
    searchUserType: any;
    sortColumn: any = "CreatedOn";
    sortDir: any = "desc";

  constructor(private loanapplicationserviceService: LoanapplicationserviceService,
    private commonService: CommonService, private router: Router, private customHttpParamEncoder: CustomHttpParamEncoder,
    private activeRoute: ActivatedRoute, private fb: FormBuilder
    , private toaster: ToastrService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
    });
    this.commonService.getMasterItemsList("manageuser_usertype_add").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    //// console.log("sdasdasd", moduleCode);
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    let cancel = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'COMPLETEDLOANAPPLICATIONCANCEL');
    if (cancel == undefined) {
      cancel = "null";
    } else {
      this.canCancel = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'COMPLETEDLOANAPPLICATIONUPDATE');

    //// console.log("update", this.modulePermission);
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let Assign = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'COMPLETEDLOANAPPLICATIONASSIGN');
    if (Assign == undefined) {
      Assign = "null";
    } else {
      this.canAssign = true;
    }
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
    //// console.log('cancel', this.canCancel + '' + this.isUpdate + '' + this.canAssign)
  }

  ngOnInit() {
    this.isBanker = false;
    this.isFinanceUser = false;
    this.isCompanyAdmin = false;
    this.isSales = false;
    var ab = this.commonService.getQueryStringValue("id");
    this.batchid = parseInt(ab);
    this.pageSizeValue = 10;
    this.currentPage = 1;
    this.getPageSizes();
    this.refresh();

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
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

      if (userdetail.userType === 'usertypebanker') {
        this.isBanker = true;
      }

      if (userdetail.userType === 'usertypesales') {
        this.isSales = true;
      }
    });
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
      this.lstPageSizeBankerList = this.commonService.masters;
    })
  }

  refresh() {
    this.loadSave = true;
    this.loanapplicationserviceService.GetCompletedLoanApplicationList(this.listFiltertext, this.searchUserType, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid, this.batchid).subscribe(response => {
      this.pagedData = this.loanapplicationserviceService.pagedData;
      this.offset = this.currentPage;
      this.loadSave = false;
    }, error => {
        this.loadSave = false;
    })
  }
  updateFilter(event) {
    var key = event.keyCode;
    if (key == 13) {
      this.refresh();
    }
  }
  reset() {
    this.listFiltertext = "";
    this.refresh();
  }
  viewLoanApp(id: any) {
      this.router.navigateByUrl('/loanApplication/Detail/' + id);
  }
  onChange($event) {  
    this.currentPage = 1;
    this.refresh();
  }
  setPage($event) {
    this.currentPage = $event.page;
    this.refresh();
  }

  get curPage(): number {
    return this.offset;
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = 1;
    if (this.batchid == NaN) {
      this.batchid = 0;
    }
    this.refresh();
  }
}

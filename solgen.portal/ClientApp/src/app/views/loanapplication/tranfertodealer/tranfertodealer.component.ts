import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { LoanapplicationserviceService, BankerModel } from '../loanapplicationservice.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-tranfertodealer',
  templateUrl: './tranfertodealer.component.html',
  styleUrls: ['./tranfertodealer.component.scss']
})
export class TranfertodealerComponent implements OnInit {
  @ViewChild('userTypeSelect', { static: false }) userTypeSelect: NgSelectComponent;
  @ViewChild('showtransfertoDealerPopUp', { static: false }) showtransfertoDealerPopUp: ModalDirective;
  @Output() refreshEmit = new EventEmitter();
  searchTxt = '';
  seachvalueFor: any;
  lstdealerCompany: any;
  lstdealerUser: any;
  applicationNumber: any;
  sortColumnDealerList = 'CreatedOn';
  sortDirDealerList = 'desc';
  currentPageDealerUserList: number;
  pageSizeValueDealerList: number;
  loanId: any;
  listNameFilter = '';
  searchUserType = '';
  loadSave: boolean = false;
  pagedData: any = {
    pager: {},
    data: []
  };
  sortColumnList
  assignedData: any[] = [];
  dealerUser: string = null;
  dealerCompany: string = null;
  showDealerUserDropDown: boolean = false;
  AssignedSalesUsers: any;
  applicantName = '';
  bankerModel: BankerModel = new BankerModel();
  lstPageSize: any
  constructor(private commonService: CommonService, private loanapplicationservice: LoanapplicationserviceService,
    private toaster: ToastrService) {

    this.commonService.getMasterItemsList("Dealer_Company").subscribe((result: any) => {
      this.lstdealerCompany = this.commonService.masters;
      //// console.log("lstdealerCompany", this.lstdealerCompany);
    })
  }

  ngOnInit() {
    this.currentPageDealerUserList = 1;
    this.pageSizeValueDealerList = 10;
    this.getPageSizes();
  }

  updateNameFilter(event) {
    if (this.dealerCompany) {
      this.seachvalueFor ='DealerUser'
    }
    else {
      this.seachvalueFor = 'Dealer'
    }
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.loanapplicationservice.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType, this.sortColumnDealerList, this.sortDirDealerList, this.currentPageDealerUserList, this.pageSizeValueDealerList, this.loanId, this.seachvalueFor).subscribe(response => {
        this.pagedData = this.loanapplicationservice.pagedData;

        //for (var i = 0; i < this.pagedDataSalesList.data.length; i++) {
        //  this.assignedData.forEach(s => {
        //    if (this.pagedDataSalesList.data[i].Email === s.Email) {
        //      this.pagedDataSalesList.data[i].Status = s.Status;
        //    }
        //  })
        //}

        //this.offsetSaleUser = this.currentPageSalesUserList;
        this.loadSave = false;
      }, error => {
          this.loadSave = false;
      });
    }
  }


  show(id: any, loanAppNumber: any,applicant:string) {
    this.loanId = id;
    this.applicationNumber = loanAppNumber;
    this.listNameFilter = '';
    this.applicantName = applicant
    this.loanapplicationservice.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType, this.sortColumnDealerList, this.sortDirDealerList, this.currentPageDealerUserList, this.pageSizeValueDealerList, this.loanId, 'Dealer').subscribe(response => {
      this.pagedData = this.loanapplicationservice.pagedData;
      //this.offsetSaleUser = this.currentPageSalesUserList;
      this.loadSave = false;
    }, error => {
        this.loadSave = false;
    });


    this.showtransfertoDealerPopUp.show();
  }


  SetdealerCompany(utype: any) {
    if (this.dealerCompany) {
      this.seachvalueFor = 'DealerUser'
    }
    else {
      this.seachvalueFor = 'Dealer'
    }

    //this.showDealerUserDropDown = true;
    //this.commonService.getMasterItemsInMultiple("Dealer_Users", utype).subscribe((result: any) => {
    //  this.lstdealerUser = this.commonService.masters;
    //  // console.log("lstdealerUser", this.lstdealerCompany);
    //})

    this.currentPageDealerUserList = 1;
    this.searchUserType = utype;
    this.loanapplicationservice.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType, this.sortColumnDealerList, this.sortDirDealerList, this.currentPageDealerUserList, this.pageSizeValueDealerList, this.loanId, this.seachvalueFor).subscribe(response => {
      this.pagedData = this.loanapplicationservice.pagedData;

      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }


  //SetdealerUser(utype: any) {
  //  this.currentPageDealerUserList = 1;
  //  this.searchUserType = utype;
  //  this.loanapplicationservice.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType, this.sortColumnDealerList, this.sortDirDealerList, this.currentPageDealerUserList, this.pageSizeValueDealerList, this.loanId,'DealerUser').subscribe(response => {
  //    this.pagedData = this.loanapplicationservice.pagedData;

  //    this.loadSave = false;
  //  }, error => {
  //      this.loadSave = false;
  //  });
  //}

  searchDealerUserList() {
    if (this.dealerCompany) {
      this.seachvalueFor = 'DealerUser'
    }
    else {
      this.seachvalueFor = 'Dealer'
    }
    
    this.loadSave = true;
    this.loanapplicationservice.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType, this.sortColumnDealerList, this.sortDirDealerList, this.currentPageDealerUserList, this.pageSizeValueDealerList, this.loanId, this.seachvalueFor).subscribe(response => {
      this.pagedData = this.loanapplicationservice.pagedData;

      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }

  resetDealerUserList() {
    this.userTypeSelect.clearModel();
    this.loadSave = true;
    this.seachvalueFor = ''
    this.listNameFilter = '';
    this.searchUserType = '';
    this.sortDirDealerList = 'desc';
    this.sortColumnDealerList = 'CreatedOn';
    this.pageSizeValueDealerList = 10;
    this.loanapplicationservice.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType, this.sortColumnDealerList, this.sortDirDealerList, this.currentPageDealerUserList, this.pageSizeValueDealerList, this.loanId, 'Dealer').subscribe(response => {
      this.pagedData = this.loanapplicationservice.pagedData;
      //this.offsetSaleUser = this.currentPageSalesUserList;
      this.loadSave = false;
    }, error => {
        this.loadSave = false;
    });
  }


  onSortDealerList($event) {
    if (this.dealerCompany) {
      this.seachvalueFor = 'DealerUser'
    }
    else {
      this.seachvalueFor = 'Dealer'
    }
    const sort = $event.sorts[0]
    this.sortDirDealerList = sort.dir;
    this.sortColumnDealerList = sort.prop;
    this.currentPageDealerUserList = 1;
    this.loadSave = true;
    this.loanapplicationservice.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType, this.sortColumnDealerList, this.sortDirDealerList, this.currentPageDealerUserList, this.pageSizeValueDealerList, this.loanId, this.seachvalueFor).subscribe(response => {
      this.pagedData = this.loanapplicationservice.pagedData;

      //for (var i = 0; i < this.pagedDataSalesList.data.length; i++) {
      //  this.assignedData.forEach(s => {
      //    if (this.pagedDataSalesList.data[i].Email === s.Email) {
      //      this.pagedDataSalesList.data[i].Status = s.Status;
      //    }
      //  })
      //}

      //this.offsetSaleUser = this.currentPageSalesUserList;
      this.loadSave = false;
    }, error => {
        this.loadSave = false;
    });
  }

  setPageDealerList($event) {
    if (this.dealerCompany) {
      this.seachvalueFor = 'DealerUser'
    }
    else {
      this.seachvalueFor = 'Dealer'
    }
    this.loadSave = true;
    this.currentPageDealerUserList = $event.page;
    this.loanapplicationservice.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType, this.sortColumnDealerList, this.sortDirDealerList, this.currentPageDealerUserList, this.pageSizeValueDealerList, this.loanId, this.seachvalueFor).subscribe(response => {
      this.pagedData = this.loanapplicationservice.pagedData;

      this.loadSave = false;
    }, error => {
        this.loadSave = false;
    });
  }

  onChangeDealerUserList($event) {
    if (this.dealerCompany) {
      this.seachvalueFor = 'DealerUser'
    }
    else {
      this.seachvalueFor = 'Dealer'
    }
    this.currentPageDealerUserList = 1;
    this.loadSave = true;
    this.loanapplicationservice.GetLoanApplicationSalesList(this.listNameFilter, this.searchUserType, this.sortColumnDealerList, this.sortDirDealerList, this.currentPageDealerUserList, this.pageSizeValueDealerList, this.loanId, this.seachvalueFor).subscribe(response => {
      this.pagedData = this.loanapplicationservice.pagedData;
      this.loadSave = false;
    }, error => {
        this.loadSave = false;
    });
  }


  closemodel() {
    this.dealerCompany = null;
    this.showDealerUserDropDown = false;
    this.showtransfertoDealerPopUp.hide();
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
  saveAssignDealer() {
    this.loadSave = true;
    this.AssignedSalesUsers = JSON.stringify(this.assignedData);
    this.bankerModel.loanappid = this.loanId;
    this.bankerModel.contactids = this.AssignedSalesUsers;
    this.bankerModel.objectName = 'loanapplication';
    this.bankerModel.applicantName = this.applicantName;
    this.bankerModel.applicationNumber = this.applicationNumber;
    this.bankerModel.type='Dealer';
    this.loanapplicationservice.saveAssignedSalesUserDetail(this.bankerModel).subscribe((result: any) => {
      if (result.statusCode == 200) {

        this.toaster.success(result.responseMessage);
        this.showtransfertoDealerPopUp.hide();
        this.loadSave = false;
        this.refreshEmit.emit();


      }
      else {
        this.loadSave = false;
      }
    });
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

 

}

import { Component, OnInit } from '@angular/core';
import { SelectionType } from '@swimlane/ngx-datatable';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { CommonService } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { LoanapplicationserviceService } from '../loanapplicationservice.service';

@Component({
  selector: 'app-masstransfer',
  templateUrl: './masstransfer.component.html',
  styleUrls: ['./masstransfer.component.scss']
})
export class MasstransferComponent implements OnInit {
  loadSave: boolean = false;
  SelectionType = SelectionType;
  selected = [];
  pagedData: any = {
    pager: {},
    data: []
  };
  sortDir = 'desc';
  sortColumn = 'ApplicationDate';
  currentPage: number;
  pageSizeValue: number = 15;
  lstPageSize: any;
  dealerUsers: any;
  fromUsers: any;
  toUsers: any;
  transferId: any;
  fromUserValue: any;
  toUserValue: any;
  isFromUser: boolean = false;
  isToUser: boolean = false;
  fromUserName: any;
  toUserName: any;
  uId: any;
  disableFromUser: boolean = false;
  disableDealerUser: boolean = false;
  dealerUserValue: any;
  isDealerUser: boolean = false;
  isCompanyAdmin: boolean = false;
  isdealerUserRequired: boolean = false;
  isAllDealer: any;
  accId: any;
  contentHeader: object;
  constructor(private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private activeRoute: ActivatedRoute
    , private toaster: ToastrService, private loanapplicationserviceService: LoanapplicationserviceService) {

    this.activeRoute.queryParamMap.subscribe((params: any) => {
      this.uId = JSON.stringify(params.params.id);
      this.accId = JSON.stringify(params.params.acid);
    });

  }

  ngOnInit() {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      // console.log('userdetail', userdetail);

      if (userdetail.userType == "usertypecompanyadmin") {
        this.dealerUsers = [];
        this.commonService.getMasterItemsList("Dealer_Company_ForMassTransfer").subscribe((result: any) => {
          this.dealerUsers = this.commonService.masters;
          if (this.accId != undefined) {
            var val = this.accId.replace(/['"]+/g, '');
            var item = this.dealerUsers.find(x => x.value == val.toUpperCase());

            if (item != null && item != undefined) {
              this.dealerUserValue = item.value;
              this.disableDealerUser = true;
              this.isdealerUserRequired = false;

              this.selectDealerUser(item.value, item.text);

            }

          }

        });
        this.isCompanyAdmin = true;
      }

      if (userdetail.userType === "usertypedealer") {
        this.selectDealerUser(userdetail.accountId, 'disable', userdetail.id);
        this.isDealerUser = true;
        this.isdealerUserRequired = false;

      }
    });

    this.pageSizeValue = 15;
    this.currentPage = 0;
    this.getPageSizes();
  
    this.initBreadCrumb();
    }
    initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Manage Mass Transfer',
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
          isLink: true,
          link: '/loanApplication'
          },
          {
            name: 'Manage Mass Transfer',
            isLink: false
          }

        ]
    };
    }
  selectDealerUser(value: any, text: any,id:any='') {
    this.isAllDealer = value;
    this.loadSave = true;
    this.isdealerUserRequired = false;
    this.fromUsers = [];
    this.toUsers = [];
    this.toUserValue = null;
    this.fromUserValue = null;
    this.pagedData.data.length = 0;
    this.commonService.getMasterItemsInMultiple("Dealer_Users", value).subscribe((result: any) => {
      this.fromUsers = this.commonService.masters;

      if (text == 'disable') {
        // console.log('adsasdasd', id);
        var item = this.fromUsers.find(x => x.value == id.toString());
        // console.log('adsasdasd', item);
        if (item != null && item != undefined) {
          this.fromUserValue = item.value;
          this.disableFromUser = true;
          this.isFromUser = false;

          this.selectFromUser(item.value, item.text);

        }
      }

      if (this.uId != undefined) {
        var val = this.uId.replace(/['"]+/g, '');
        var item = this.fromUsers.find(x => x.value == val.toUpperCase());

        if (item != null && item != undefined) {
          this.fromUserValue = item.value;
          this.disableFromUser = true;
          this.isFromUser = false;

          this.selectFromUser(item.value, item.text);

        }

      }

      this.loadSave = false;
    });

  }

  selectToUser(value: any, text: any) {
    this.toUserName = text;
    if (value != null || typeof value != undefined) {
      this.isToUser = false;
    }
  }

  selectFromUser(value: any, text: any) {
    // console.log('value', value);
    var type = '';
    this.fromUserName = text;
    this.transferId = "";
    this.selected = [];
    this.toUsers = [];
    this.toUserValue = null;
    if (value != null || typeof value != undefined) {
      this.isFromUser = false;
    }
    this.loadSave = true;

    if (this.isAllDealer == '1')
      type = "AllUserType_Users";
    else
      type = "UserType_Users";

    this.commonService.getMasterItemsInMultiple(type, value).subscribe((result: any) => {
      this.toUsers = this.commonService.masters;
      this.loanapplicationserviceService.getAssignedApplication(value, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue)
        .subscribe(response => {
          this.pagedData = [];
          this.pagedData = this.loanapplicationserviceService.AssignedpagedData;
          // console.log('this.pagedData01', this.pagedData);
          this.loadSave = false;
        }, error => {
          this.loadSave = false;
        })

    })
  }

  transfer() {
    if (this.isCompanyAdmin) {
      if (typeof this.dealerUserValue == undefined || this.dealerUserValue == null) {
        this.isdealerUserRequired = true;
      }
    }

    if (typeof this.fromUserValue == undefined || this.fromUserValue == null) {
      this.isFromUser = true;
    }
    if (typeof this.toUserValue == undefined || this.toUserValue == null) {
      this.isToUser = true;
    }
    if ((this.isFromUser == false && this.isToUser == false) && (this.transferId == undefined || this.transferId === "")) {
      //this.dialogService.confirm('Caution', 'Please select at least one application.').subscribe(confirmed => {
      //})

      this.toaster.error(`Please select at least one application.`);
    }
    if (this.isFromUser == false && this.isToUser == false) {
      if (this.transferId != undefined && this.transferId !== "") {
        const message = `Are you sure you want to transfer Loan Applications from ` + '"' + this.fromUserName + '"' + ' To ' + '"' + this.toUserName + '"?';
        this.dialogService.confirm('Transfer Application(s)', message).subscribe(confirmed => {
          if (confirmed) {
            this.loanapplicationserviceService.TransferApplicatioto_ToUser(this.transferId, this.fromUserValue, this.toUserValue).subscribe((result: any) => {
              this.toaster.success(`Record(s) has been transfered successfully`);
              this.transferId = "";
              this.selected = [];
              this.selectFromUser(this.fromUserValue, '');
            }, error => {
            });
          }
        });
      }
    }
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = 0;
    this.loanapplicationserviceService.getAssignedApplication(this.fromUserValue, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue)
      .subscribe(response => {
        this.pagedData = [];
        this.pagedData = this.loanapplicationserviceService.AssignedpagedData;
        this.loadSave = false;
      }, error => {
        this.loadSave = false;
      });
  }

  onChange($event) {
    this.currentPage = 0;
    this.loanapplicationserviceService.getAssignedApplication(this.fromUserValue, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue)
      .subscribe(response => {
        this.pagedData = [];
        this.pagedData = this.loanapplicationserviceService.AssignedpagedData;
        this.loadSave = false;
      }, error => {
        this.loadSave = false;
      });
  }


  setPage($event) {
    var ab = $event.page - 1;
    this.currentPage = ab;

    this.loanapplicationserviceService.getAssignedApplication(this.fromUserValue, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue)
      .subscribe(response => {
        this.pagedData = [];
        this.pagedData = this.loanapplicationserviceService.AssignedpagedData;
        this.loadSave = false;
      }, error => {
        this.loadSave = false;
      });

  }

  onSelect({ selected }) {
    if (this.transferId == "" || this.transferId == null || this.transferId == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      this.transferId = null;
      this.transferId = "";
      for (let i = 0; i < selected.length; i++) {
        this.transferId += selected[i].Id.toString() + ",";
      }

    }
    else {
      this.transferId = null;
      this.transferId = "";
      for (let i = 0; i < selected.length; i++) {
        this.transferId += selected[i].Id.toString() + ",";
      }
    }
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  reset() {
    this.loadSave = true;
    if (this.isDealerUser) {
      this.isToUser = false;
      this.toUserValue = null;
    }
    else {
      if (this.uId != undefined) {
        this.isToUser = false;
        this.toUserValue = null;
      }
      else {
        this.transferId = "";
        this.selected = [];

        //this.dealerUsers = [];
        //this.disableDealerUser=false
        this.isdealerUserRequired = false;
        this.dealerUserValue = null;

        this.fromUsers = [];
        this.disableFromUser = false;
        this.isFromUser = false;
        this.fromUserValue = null;

        this.toUsers = [];
        this.isToUser = false;
        this.toUserValue = null;
        this.pagedData.data.length = 0;
      }
    }
    this.loadSave = false;

  }

}

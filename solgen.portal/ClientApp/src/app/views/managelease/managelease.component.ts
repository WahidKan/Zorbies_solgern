import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonService, ModuleNames, ModuleList } from '../shared/common.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ManageleaseService } from './managelease.service';

import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { NgSelectComponent } from '@ng-select/ng-select';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { LeasecontactdocsComponent } from './leasecontactdocs/leasecontactdocs.component';
import { BankapprovalComponent } from './bankApproval/bankapproval.component';
import { LeasedocspdfviewComponent } from './leasedocspdfview/leasecontactdocs.component';
import { LeaseapproveforpurchasedetailComponent } from './leaseapproveforpurchasedetail/leaseapproveforpurchasedetail.component';
import { UpdateLeaseStatusComponent } from './update-lease-status/update-lease-status.component';

@Component({
  selector: 'app-managelease',
  templateUrl: './managelease.component.html',
  styleUrls: ['./managelease.component.scss']
})
export class ManageleaseComponent implements OnInit {
  @ViewChild('leseStatusSelect', { static: false }) userTypeSelect: NgSelectComponent;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @ViewChild('leasecontactDocModal', { static: false }) childdoc: LeasecontactdocsComponent;
  @ViewChild('leasebankApprovalModal', { static: false }) bankApproval: BankapprovalComponent;
  @ViewChild('leasedocspdfviewModal', { static: false }) childleasedocspdfview: LeasedocspdfviewComponent;
  @ViewChild('leaseapproveforpurchasedetailModal', { static: false }) appriveforpurchaseview: LeaseapproveforpurchasedetailComponent;
  @ViewChild('leaseStatusModal', { static: false }) updateStatus: UpdateLeaseStatusComponent;
  loading = false;
  sortDir = 'asc';
  sortColumn = 'BusinessName';
  docSortDir = 'desc';
  docSortColumn= 'DocumentCreatedOn';
  pageNumber = 0;
  leaseOprStatus: any;
  contactId: any;
  modulePermission: ModuleList;
  moduleWhatNextPermission: ModuleList;
  lstUserType: any;
  pagedData: any = {
    pager: {},
    data: []
  };
  pagedDataLease: any = {
    pager: {},
    data: []
  };
  lstPageSize: any
  pageSizeValue: number;
  searhName: any;
  leaseStatus: any=null;
  leaseStatusvalue: any;
  saleMan: any;
  expFrom: any;
  expTo: any;
  commFrom: any;
  id: any
  commTo: any;
  isShowAddLease = true;
  isShowEditLease = true;
  isCustomerUser = false;
  isShowUpdateLease = true;
  isShowDeleteLease = true;
  isBankUser = false;
  isOperationUser = false;
  isAdminUserAndSuperAdmin = false;
  loginuserid: any;
  leaseBankId: any;
  pageTitle: string;
  isContactPage: boolean = false;
  isSalesUser = false;
  totallease: any;
  totallease1: any;
  totallease2: any;
  loadSave: any;

  constructor(private leaseService: ManageleaseService, private toaster: ToastrService, private router: Router, private activatedRoute: ActivatedRoute,
    private commonService: CommonService, private dialogService: ConfirmationDialogService, private routeActivate: ActivatedRoute) {
    const moduleCode = this.routeActivate.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
    this.moduleWhatNextPermission = this.commonService.getPermission(5123);
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
   

  }

  ngOnInit() {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (userdetail.userType == 'usertype02') {
        this.isOperationUser = true;
      }
      if (userdetail.userType == 'usertype04') {
        this.isBankUser = true;
      }
      if (userdetail.userType == 'usertype03') {  //Sales User
        this.isSalesUser = true;
      }
      if (userdetail.userType == 'usertype01' || userdetail.userType == 'usertype06') {
        //delete button should display only to superadmin and admin
        this.isAdminUserAndSuperAdmin = true;
      }

      if (userdetail.userType === 'usertype05') {
        //If user Type is Customer User the show add button update and Delete
        this.isShowAddLease = true;
        this.isShowUpdateLease = true;
        this.isShowDeleteLease = true;
        this.isCustomerUser = true;
      }
      else {
        if (this.modulePermission != null) {
          this.isShowAddLease = (this.modulePermission.roleModuleAddFlag ? true : false);
          this.isShowUpdateLease = (this.modulePermission.roleModuleReadFlag ? true : false);
          this.isShowDeleteLease = (this.modulePermission.roleModuleDeleteFlag ? true : false);
          this.isShowEditLease = (this.modulePermission.roleModuleUpdateFlag ? true : false);
        }
        else {
          this.isShowAddLease = false;
          this.isShowUpdateLease = false;
          this.isShowDeleteLease = false;
        }
      }

      if (userdetail.userType == 'usertype04') {
        this.isBankUser = true;
      }

    });

    this.searhName = ""
    this.pageSizeValue = 10;
    this.getPageSizes();

    this.routeActivate.queryParams
      .filter(params => params.contactid)
      .subscribe(params => {
        this.isContactPage = true;
        this.contactId = params.contactid;
      });

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (userdetail.userType == 'usertype05') {
        this.commonService.getMasterItemsList("customerUserLease").subscribe((result: any) => {
          this.lstUserType = this.commonService.masters;

        });
      }
      this.SearchLease();
    });



    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (userdetail.userType != 'usertype05') {
        this.commonService.getMasterItemsList("lease").subscribe((result: any) => {

          this.lstUserType = this.commonService.masters;
          this.activatedRoute.queryParams.subscribe(params => {
            if (params['statusId'] == '118795e4-16cb-4e4c-b968-5a587cada635') {//underwriting
              var mst = this.commonService.masters.filter(x => x.text == "Underwriting");
              if (typeof mst != 'undefined' && mst.length > 0) {
                this.leaseStatus = [mst[0].value];
              }
            }
            else if (params['statusId'] == 'a3fd9e84-ece4-44fd-a65b-f895256035d9') {//Pending
              var mst = this.commonService.masters.filter(x => x.text == "Pending");
              if (typeof mst != 'undefined' && mst.length > 0) {
                this.leaseStatus = [mst[0].value];
              }
            }
            else if (params['statusId'] == 'f3eae496-a693-4534-ad32-14bd59333182') {//Approved for Purchase
              var mst = this.commonService.masters.filter(x => x.text == "Approved for Purchase");
              if (typeof mst != 'undefined' && mst.length > 0) {
                this.leaseStatus = [mst[0].value];
              }
            }
            else if (params['statusId'] == '0175188a-ba67-4364-9ae8-f5b46de6c9f2') {//Funded
              var mst = this.commonService.masters.filter(x => x.text == "Funded");
              if (typeof mst != 'undefined' && mst.length > 0) {
                this.leaseStatus = [mst[0].value];
              }
            }
            else if (params['statusId'] == 'f9ec1ccd-9444-4c67-9591-bc99f784c415') {//Active
              var mst = this.commonService.masters.filter(x => x.text == "Active");
              if (typeof mst != 'undefined' && mst.length > 0) {
                this.leaseStatus = [mst[0].value];
              }
            }
            else if (params['statusId'] == 'e09571ea-2f5c-4ccf-b693-d72776a56dd4') {//Total
              var mst = this.commonService.masters.filter(x => x.text == "Paid");
              var mst1 = this.commonService.masters.filter(x => x.text == "Active");
              var mst2 = this.commonService.masters.filter(x => x.text == "Completed");

              if (typeof mst != 'undefined' && mst.length > 0) {
                this.totallease = [mst[0].value];
              }
              if (typeof mst1 != 'undefined' && mst1.length > 0) {
                this.totallease1 = [mst1[0].value];
              }
              if (typeof mst2 != 'undefined' && mst2.length > 0) {
                this.totallease2 = [mst2[0].value];
              }
              this.leaseStatus = this.totallease.concat(this.totallease1, this.totallease2)

            }
            this.SearchLease();
          });
        })

      }
    });
  }
  UpdateleasedocspdfStatus() {

  }
  updateLeaseOprStatus() {
    this.SearchLease();
  }

  sendToDocusignToClient(id) {
    this.loading = true;
    if (id !== null && typeof id !== 'undefined') {
      this.loading = false;
      if (id !== null && id !== 'undefined') {
        this.leaseService.getLeaseDetails(id, this.isBankUser).subscribe((res: any) => {
          if (res) {
            this.loading = false;
            if (res.leasePDFDocumentNameLink !== null && res.leasePDFDocumentNameLink !== '' && typeof res.leasePDFDocumentNameLink !== 'undefined') {
              this.childleasedocspdfview.show(res.leasePDFDocumentNameLink, id);
            }
            else {
              const message = `Lease document not generate yet. `;
              this.dialogService.confirm('Lease DocuSign Client Signature', message).subscribe(confirmed => {
              });
            }
          }
        }, error => {
          this.loading = false;
        })
      }
      else {
        const message = `Lease document not generate yet. `;
        this.dialogService.confirm('Lease DocuSign Client Signature', message).subscribe(confirmed => {
        });
      }
    }
  }

  DisplayApprovalOfBank(row: any) {
    let note = (row.LenderNotes == "") ? "N/A" : row.LenderNotes;
    let AapproveBy = row.IsApprovedForPurchaseByUser;
    let ApproveOn = row.IsApprovedForPurchaseDate;
    this.appriveforpurchaseview.show(note, AapproveBy, ApproveOn);
  }

  updateLeaseStatus(LeaseId: any) {
    this.updateStatus.show(LeaseId);
  }

  updateLeaseCompleted(LeaseId: any) {
    const message = `Are you sure you want to mark the Lease as Completed? `;
    this.dialogService.confirm('Mark Lease as Completed', message).subscribe(confirmed => {

      if (confirmed) {
        this.loading = true;
        this.leaseService.updateLeaseStatus('', LeaseId, "completed").subscribe((res: any) => {
          if (res.statusCode === 200) {
            this.toaster.success(`Lease status has been updated successfully`);
            this.SearchLease();
            this.loading = false;
          }
          else {
            this.loading = false;
            this.toaster.error(res.responseMessage);
          }

        });
      }
    }, error => {
      this.loading = false;
    })
  }

  displayContactdocs(id) {
    this.loading = true;
    this.leaseService.getContactDocbyLeaseID(id, this.docSortColumn, this.docSortDir, this.pageNumber, this.pageSizeValue).subscribe(response => {
      this.loading = false;
      
      this.pagedData = this.leaseService.pagedData;
      this.childdoc.show(this.pagedData, id);
    }, error => {
      this.loading = false;
    })
    if (Response) {
     
    }
 
  }

  sendForBankApproval(id, leaseAssignedBankId, leaseContactId, isGenerateLeaseDoc) {
    if (leaseAssignedBankId == null) {
      const message = `No bank selected for approval.`;
      this.dialogService.confirm('Lease Send to Bank approval', message).subscribe(confirmed => {
      });
    }
    else if (isGenerateLeaseDoc == false) {
     // const message = `Send To Bank Approval`;
      this.dialogService.confirm('Send To Bank Approval', 'Please generate Lease Document before Send to Bank for Approval.').subscribe(confirmed => {
      });
    }
    else {
      this.bankApproval.show(id, leaseContactId);
    }
  }

  
  SearchLease() {
    this.loading = true;
    if (typeof this.leaseStatus == 'undefined')
    {
      this.leaseStatus = null;
    }
    this.leaseService.getLeaseList(this.searhName, this.leaseStatus, this.saleMan, this.expFrom, this.expTo, this.commFrom, this.commTo, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid, false, this.contactId).subscribe((response) => {
      this.pagedDataLease = this.leaseService.pagedData;
      this.loading = false;
      this.pageTitle = ': ' + this.pagedDataLease.data[0].BusinessName;
      this.leaseOprStatus = this.pagedDataLease.data[0].LeaseOprStatus;
    }, error => {
      this.loading = false;
    });
  }
  ResetSearch() {
    this.table.sorts = [];
    this.searhName = "";
    this.sortDir = 'asc';
    this.sortColumn = 'BusinessName';
    this.pageNumber = 0;
    this.pageSizeValue = 10;
    this.expFrom = null;
    this.expTo = null;
    this.commFrom = null;
    this.commTo = null;
    this.userTypeSelect.clearModel();
    this.leaseStatus = null;
    this.SearchLease();
  }

  //function is used to delete the Lease
  DeleteLease(row: any) {
    const message = `Are you sure you want to delete Lease "${row.BusinessName}"?`;
    this.dialogService.confirm('Delete Lease', message).subscribe(confirmed => {
      if (confirmed) {
        this.leaseService.deleteLease(row.LeaseId).subscribe((response: any) => {
          if (response.statusCode == 200) {
            this.toaster.success(`Lease "${row.BusinessName}" has been deleted successfully`);
            this.ResetSearch();
          }
          else {
            this.toaster.error(response.responseMessage);
          }
        }, error => {

        });
      }
    });
  }

  //function is used to manage enter key press on search text box
  updateFilter(event) {
    this.searhName = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.SearchLease();
    }
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  onChange($eventSearchLease) {
    this.pageNumber = 0;
    this.SearchLease();
  }
  setPage($event) {
    this.pageNumber = $event.page - 1;
    this.SearchLease();
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.pageNumber = $event.page - 1;
    this.SearchLease();
  }

  ApproveLease(row: any) {
    const message = `Are you sure you want to Approve Lease for "${row.BusinessName}"?`;
    this.dialogService.confirm('Approve Lease', message).subscribe(confirmed => {
      if (confirmed) {
        this.leaseService.changeLeaseStatus(row.LeaseId).subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success(result.responseMessage);
            this.SearchLease();
          }
          else {
            this.toaster.error(result.responseMessage);
          }
        })
      }
    });
  }

  backbtn() {
    this.router.navigateByUrl("/contact");
  }
}

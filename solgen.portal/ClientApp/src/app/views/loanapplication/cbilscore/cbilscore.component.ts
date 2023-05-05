import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgSelectComponent } from '@ng-select/ng-select';
import { CommonService } from '../../shared/common.service';
import { LoanapplicationserviceService } from '../loanapplicationservice.service';

@Component({
  selector: 'app-cbilscore',
  templateUrl: './cbilscore.component.html',
  styleUrls: ['./cbilscore.component.scss']
})
export class CbilscoreComponent implements OnInit {

  sendLeaseToBank0: any;
  setPage: any;
  onSort: any;
  sendLeaseToBank: any;

  lstActiveStatus: any;
  activeStatus: any;
  @ViewChild('loanapplicationpopupModal', { static: false }) modalLoanApplication: ModalDirective;
  @ViewChild('clearDrop', { static: false }) clearDrop: NgSelectComponent;
  @ViewChild('clearDrp', { static: false }) clearDrp: NgSelectComponent;
  active = false;
  pagedData: any = {
    pager: {},
    data: []
  };
  loadSave: boolean = false;
  listFilter = '';
  searchTxt = '';
  loading = false;
  lstPageSize: any;
  searchUserType: any;
  pageSizeValue: number;
  sortColumn: any;
  sortDir: any;
  Bureaudrop: any;
  loginuserid: any;
  constructor(private toaster: ToastrService, private loanapplicationserviceService: LoanapplicationserviceService,
    private router: Router, private dialogService: ConfirmationDialogService, private commonService: CommonService, 
    private activeRoute: ActivatedRoute
    ) {
    this.lstActiveStatus = this.ActiveStatus;
    this.Bureaudrop = this.Bureau;
  }

  refresh() {
    this.loading = true;
    this.pageSizeValue = 10;
    //////this.getPageSizes();
    this.loanapplicationserviceService.GetcibilScoreList(this.listFilter, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.pagedData = this.loanapplicationserviceService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  ngOnInit() {
    this.activeStatus = '';
    this.lstActiveStatus = this.ActiveStatus;
    this.Bureaudrop = this.Bureau;
    this.refresh();
  }

  close() {
    this.active = false;
    this.modalLoanApplication.hide();
  }

  show() {
    //this.refresh();
    this.modalLoanApplication.show();
    this.refresh();
    this.active = true;
  }


  ActiveStatus = [
    { value: 1, name: 'Primary' },
    { value: 2, name: 'Co-Applicant' }

  ];
  Bureau = [
    { value: 1, name: 'Equifax' }
  ];
}

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonService } from '../common.service';
import { ManageleaseService } from '../../managelease/managelease.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'leaserequestForm',
  templateUrl: './leaserequestform.component.html',
  styleUrls: ['./leaserequestform.component.scss']
})
export class LeaserequestformComponent implements OnInit {
    @ViewChild('fileInput', { static: false }) fileInput;
  @Input('group')
  public leaseRequestDetailForm: FormGroup;
  isBankUser: any;
  lstrespercentages: any;
  lstterms: any;
  constructor(public  commonService: CommonService
    , private leaseService: ManageleaseService, private toaster: ToastrService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (userdetail.userType == 'usertype04') {
        this.isBankUser = true;
      }
    });
    this.bindLeaseDropDowns();
  }

  ngOnInit() {
  }


  bindLeaseDropDowns() {
    this.commonService.getMasterItemsList("ResidualPercentage,LeaseTerm").subscribe((result: any) => {
      this.lstrespercentages = this.commonService.masters.filter(x => x.masterName == "ResidualPercentage");
      this.lstterms = this.commonService.masters.filter(x => x.masterName == "LeaseTerm");
    });
  }

  get leaseRequest() { return this.leaseRequestDetailForm.get('leaseRequest'); }
  get leaseRequestRateToBank() { return this.leaseRequestDetailForm.get('leaseRequestRateToBank'); }
  get leaseRequestTerm() { return this.leaseRequestDetailForm.get('leaseRequestTerm'); }
  get leaseRequestPayment() { return this.leaseRequestDetailForm.get('leaseRequestPayment'); }
  get leaseRequestResidual() { return this.leaseRequestDetailForm.get('leaseRequestResidual'); }
  get leaseRequestCollateral() { return this.leaseRequestDetailForm.get('leaseRequestCollateral'); }
  get leaseRequestPurpose() { return this.leaseRequestDetailForm.get('leaseRequestPurpose'); }
  get leaseRequestSOROne() { return this.leaseRequestDetailForm.get('leaseRequestSOROne'); }
  get leaseRequestBalance() { return this.leaseRequestDetailForm.get('leaseRequestBalance'); }
  
  initializeFormula() {

  }
}

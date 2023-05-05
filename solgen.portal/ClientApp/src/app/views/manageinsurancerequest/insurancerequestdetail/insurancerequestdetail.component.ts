import { Component, OnInit, ViewChild } from '@angular/core';
import { InsuarncerequestlistService } from '../insuarncerequestlist.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'app-insurancerequestdetail',
  templateUrl: './insurancerequestdetail.component.html',
  styleUrls: ['./insurancerequestdetail.component.scss']
})
export class InsurancerequestdetailComponent implements OnInit {


  @ViewChild('insurancerequestdetail', { static: false}) modalInsuranceRequest: ModalDirective;

  active = false;
  loadSave = false;
  leaseId: any;
  contactId: any;
  venderEmailId: any;
  insuranceRequest: any;
  leaseAssignedBankId: any;
  collateralInformation: any;
  isModelPopupOpen = false;
  htmlStr: string;
  
  constructor(private insuarncerequestlistService: InsuarncerequestlistService, private toaster: ToastrService,
    private router: Router, private dialogService: ConfirmationDialogService, public commonService: CommonService) {
    if (this.insuranceRequest == undefined) {
      this.insuranceRequest = "";
    }
  }


  ngOnInit() {
    this.modalInsuranceRequest.hide();
  }
  close() {
    this.active = false;
    this.modalInsuranceRequest.hide();
  }

  show(insuranceRequest) {
    this.insuranceRequest = insuranceRequest;
    this.htmlStr = this.insuranceRequest.solgenAddress;
    this.collateralInformation = this.insuranceRequest.collateralInformation == null || this.insuranceRequest.collateralInformation == "" ? "N/A" : this.insuranceRequest.collateralInformation;
    this.modalInsuranceRequest.show();
    this.active = true;
  }

}

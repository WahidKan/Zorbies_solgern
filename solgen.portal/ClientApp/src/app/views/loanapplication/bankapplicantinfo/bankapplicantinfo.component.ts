import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CheckboxData, JsonData, LoanapplicationserviceService } from '../loanapplicationservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, ModuleList } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bankapplicantinfo',
  templateUrl: './bankapplicantinfo.component.html',
  styleUrls: ['./bankapplicantinfo.component.scss']
})
export class BankapplicantinfoComponent implements OnInit {
  loanapplicantdata: any;
  coloanapplicantdata: any;
  loanappid: any;
  showSSNandDOB: boolean = false;
  IsCoApplicantRequired: boolean=false;
  @Output() loanInfoEmit = new EventEmitter<any>();

  constructor(private route: ActivatedRoute, private loanApplicationService: LoanapplicationserviceService, private commonService: CommonService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.showSSNandDOB = (userdetail.userType === "usertypecompanyadmin" || userdetail.userType === "usertyperelationship" || userdetail.userType === "usertypebanker");
    });

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loanappid = id;
        this.fillapplicantForm(id);
      } else {

      }

    });
  }


  fillapplicantForm(id) {
    this.loanApplicationService.GetbankApplicantInfo(id).subscribe((result: any) => {
      this.loanapplicantdata = this.loanApplicationService.applicantInfo[0].applicant;
      this.IsCoApplicantRequired = this.loanapplicantdata[0].IsCoApplicantRequired;
      this.coloanapplicantdata = this.loanApplicationService.applicantInfo[0].coapplicant;
      this.loanApplicationService.loanappliacntsubject.next(this.loanapplicantdata.applicant);
      //  this.loanemint.emit(this.loanProductdata);
      // this.amountfinanced = this.loanProductdata.AmountFinanced;
      //  this.loanrate = this.loanProductdata.LoanRate;
      // // console.log('loanProductdata', this.loanProductdata);


    });
  }

}

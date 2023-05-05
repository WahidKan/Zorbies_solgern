import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanapplicationserviceService } from '../loanapplicationservice.service';
import { Subject } from 'rxjs';
import { StreamUtils } from 'xlsx/types';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'app-view-product-info',
  templateUrl: './view-product-info.component.html',
  styleUrls: ['./view-product-info.component.scss']
})
export class ViewProductInfoComponent implements OnInit {
  @Input('submoduleName') submoduleName: any = null;
  loanProductdata: any;
  loanappid: any;
  amountfinanced: any;
  loanrate: any;
  usertype: string;
  isBanker: boolean = false;
  roleCode: string = "";
  SuperAccMangerDirector: boolean = false;

  constructor(private route: ActivatedRoute, private loanApplicationService: LoanapplicationserviceService, private commonService: CommonService) {

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.roleCode = userdetail.roleCode;
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loanappid = id;
        this.fillLoanProductForm(id);
      } else {

      }
      this.isBanker = false;
      this.usertype = localStorage.getItem("usertype");
      if (this.usertype.toLocaleLowerCase() == 'usertypebanker') {
        this.isBanker = true;
      }


      //if (this.usertype.toLocaleLowerCase() == 'usertypecompanyadmin') {
      //  this.SuperAccMangerDirector = true;
      //}
      //if (this.usertype.toLocaleLowerCase() === "usertypecommonuser") {
      //  if (this.roleCode == "Accounting_User" || this.roleCode == "Accounting_Director") {
      //    this.SuperAccMangerDirector = true;
      //  }
      //}


    });
  }


  fillLoanProductForm(id) {
    this.loanApplicationService.GetLoanProductInfo(id, this.submoduleName).subscribe((result: any) => {
     
      
    
      this.loanProductdata = this.loanApplicationService.loanProductInfo;
      this.loanApplicationService.loanProductsubject.next(this.loanProductdata);
    //  this.loanemint.emit(this.loanProductdata);
     // this.amountfinanced = this.loanProductdata.AmountFinanced;
    //  this.loanrate = this.loanProductdata.LoanRate;
      // // console.log('loanProductdata', this.loanProductdata);

     
    });
  }

}

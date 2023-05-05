import { Component, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TransferLoanAppModel, LoanapplicationserviceService } from '../loanapplicationservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transferloanapplication',
  templateUrl: './transferloanapplication.component.html',
  styleUrls: ['./transferloanapplication.component.scss']
})
export class TransferloanapplicationComponent implements OnInit {
  @ViewChild('showtransferAppPopUp', { static: false }) showtransferAppPopUp: ModalDirective;
  lstdealerCompany: any;
  applicationNumber: any;
  loanId: any;
  dealerAccountId: any;
  @Output() refreshEmit = new EventEmitter();
  transferLoanAppModel: TransferLoanAppModel = new TransferLoanAppModel()
  constructor(private commonService: CommonService, private loanapplicationserviceService: LoanapplicationserviceService,
  private toaster: ToastrService) { }

  ngOnInit() {

  }

  show(id: any, loanAppNumber: any) {
    this.loanId = id; 
   this.applicationNumber = loanAppNumber; 
  // this.commonService.getMasterItemsList("Dealer_Company").subscribe((result: any) => {
    this.commonService.getMasterItemsInMultiple("Dealer_Company", this.loanId).subscribe((result: any) => {
     this.lstdealerCompany = this.commonService.masters;
   })
    this.showtransferAppPopUp.show();
  }

  setDealerCompany(dealerAccountId: any) {
    this.dealerAccountId = dealerAccountId;
  }

  saveAssignedApplicationToDealer() {
    this.transferLoanAppModel.dealerAccountId = this.dealerAccountId;
    this.transferLoanAppModel.loanappid = this.loanId;
    this.loanapplicationserviceService.saveAssignedApplicationToDealer(this.transferLoanAppModel).subscribe((result: any) => {
      if (result.statusCode == 200) {
        this.toaster.success(result.responseMessage);
        this.refreshEmit.emit();
        this.showtransferAppPopUp.hide();

      }
    });

  }

  closeAssignedApplicationToDealer() {
    this.showtransferAppPopUp.hide();
  }
}

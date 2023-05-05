import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { dynamicsectionarray } from '../loanapplicationservice.service';
import { fabricateEventRange } from '@fullcalendar/core/structs/date-span';

@Component({
  selector: 'app-stageinfo',
  templateUrl: './stageinfo.component.html',
  styleUrls: ['./stageinfo.component.scss']
})
export class StageinfoComponent implements OnInit {
  @ViewChild('stageInfo', { static: false }) stageInfo: ModalDirective;
  @Output() stageemit = new EventEmitter();
  @Output() changeOrderStageEmit = new EventEmitter();
  @Output() showOverrideReasonPopup = new EventEmitter();

  @Output() stageCreditScoreManualPullForCoApp = new EventEmitter();
  @Output() stateRule = new EventEmitter<any>();

  @Input('SFOpportunityId') SFOpportunityId: any;
  @Input('LoanApplicationNumber') LoanApplicationNumber: any;

  _formstagearray: dynamicsectionarray[] = [];
  active = false;
  title = "";
  stageid: any;
  loanapplicationflag = false;
  loanapplicantflag = false;
  loancoapplicantflag = false;
  installationpropertyflag = false;
  loanbankverificationflag = false;
  loanpaymentflag = false;
  loanproductflag = false;
  loanChangeOrder: boolean = false;
  loanFundReleaseCO: boolean = false;
  loanexpansesflag = false;
  loanntpflag = false;
  loanntpChangeOrderFlag = false;
  loanreleasefundflag = false;
  loanverificationflag = false;
  signeddocflag = false;
  itemdata: any;
  formname = "";
  checkflag = false;
  formid = "";
  IsLACanceledFlag: boolean = false;
  loadSave: boolean = false;
  ntpApprovedFlag: boolean = false;
  ntpCOApprovedFlag: boolean = false;
  borrowerPhoneNumber: any = null;
  changeOrderDocWithR_F_S: number = 0;
  applicantemail = "";
  hideChangeOrderButton: boolean = false;
  SourceType: string = "";
  DealerName: string = "";
  // @Input('IsLACanceledFlag') IsLACanceledFlag: boolean;
  constructor() {
    //this.IsLACanceledFlag2 = this.IsLACanceledFlag;
  }

  ngOnInit() {

  }

  show(item, flag, IsLACanceledFlag, isForChangeOrder: any = null, phoneNumber: any = null, changeOrderDocWithR_F_S: number = 0, applicantEmail: string = '', hideChangeOrderButton: boolean = false, SourceType: string = "", DealerName: string = "") {
    debugger
    this.hideChangeOrderButton = hideChangeOrderButton;
    this.changeOrderDocWithR_F_S = changeOrderDocWithR_F_S;
    this.borrowerPhoneNumber = phoneNumber;
    this.applicantemail = applicantEmail
    this.SourceType = SourceType;
    this.DealerName = DealerName;
    let existitem = [];
    if (isForChangeOrder == 'insertOperation') {
      this.IsLACanceledFlag = IsLACanceledFlag;
      var itemdta = {
        stageView: isForChangeOrder,
        userTypes: "",
      };
      this.itemdata = itemdta;
      this._formstagearray = [];
      this.title = 'Change Order';
      this.loanChangeOrder = true;
      this.loanFundReleaseCO = false;
      this.loanapplicationflag = false;
      this.loanapplicantflag = false;
      this.loancoapplicantflag = false;
      this.installationpropertyflag = false;
      this.loanpaymentflag = false;
      this.loanproductflag = false;
      this.loanexpansesflag = false;
      this.loanntpflag = false;
      this.loanntpChangeOrderFlag = false;
      this.loanreleasefundflag = false;
      this.loanverificationflag = false;
      this.signeddocflag = false;
      this.loanbankverificationflag = false;



      this.stageInfo.show();
    }
    else {

      this.stageid = item.loan_app_stage_id;
      this.IsLACanceledFlag = IsLACanceledFlag;
      this.checkflag = flag;
      // // console.log("item.masterValue", item);
      this.itemdata = item;
      // // // console.log("item.masterValue", this.itemdata);
      this._formstagearray = [];

      this.title = item.loan_app_stage_name;
      this.loanapplicationflag = false;
      this.loanapplicantflag = false;
      this.loancoapplicantflag = false;
      this.installationpropertyflag = false;
      this.loanpaymentflag = false;
      this.loanproductflag = false;
      this.loanChangeOrder = false;
      this.loanFundReleaseCO = false;
      this.loanexpansesflag = false;
      this.loanntpflag = false;
      this.loanntpChangeOrderFlag = false;
      this.loanreleasefundflag = false;
      this.loanverificationflag = false;
      this.signeddocflag = false;
      this.loanbankverificationflag = false;
      // this.IsLACanceledFlag = this.IsLACanceledFlag2;
      item.LinkFormMaster.split(',').forEach((itm, i) => {
        let _stgname = itm.split('::')
        let itmarray = "";
        if (_stgname.length <= 2) {

          itmarray = _stgname[0];
        }
        debugger;
        if (itmarray.toLocaleLowerCase() == "Application Info".toLocaleLowerCase()) {
          this.loanapplicationflag = true;
        }
        else if (itmarray.toLocaleLowerCase() == "Applicant".toLocaleLowerCase()) {
          this.loanapplicantflag = true;
        }
        else if (itmarray.toLocaleLowerCase() == "Co-Applicant".toLocaleLowerCase()) {
          this.loancoapplicantflag = true;
        }
        else if (itmarray.toLocaleLowerCase() == "Installation Property".toLocaleLowerCase()) {
          this.installationpropertyflag = true;
        }
        else if (itmarray.toLocaleLowerCase() == "Payment Information".toLocaleLowerCase()) {
          this.loanpaymentflag = true;
        }
        else if (itmarray.toLocaleLowerCase() == "Product Info".toLocaleLowerCase()) {
          this.loanproductflag = true;
        }
        else if (itmarray.toLocaleLowerCase() == "Expanses".toLocaleLowerCase()) {
          this.loanexpansesflag = true;
        }
        else if (itmarray.toLocaleLowerCase() == "NTP".toLocaleLowerCase()) {
          this.loanntpflag = true;
        }
        else if (itmarray.toLocaleLowerCase() == "Fund Release".toLocaleLowerCase()) {
          this.loanreleasefundflag = true;
        }
        else if (itmarray.toLocaleLowerCase() == "Internal Verification".toLocaleLowerCase()) {
          this.loanverificationflag = true;
        }
        else if (itmarray.toLocaleLowerCase() == "External Verification".toLocaleLowerCase()) {
          this.loanbankverificationflag = true;
        }
        else if (itmarray.toLocaleLowerCase() == "Documents Signed".toLocaleLowerCase()) {
          this.signeddocflag = true;
        }
        else if (itmarray.toLocaleLowerCase() == "Change Order".toLocaleLowerCase()) {
          this.loanChangeOrder = true;
        }
        else if (itmarray.toLocaleLowerCase() == "Fund Release(CO)".toLocaleLowerCase()) {
          this.loanFundReleaseCO = true;
        }
        else if (itmarray.toLocaleLowerCase() == "NTP(CO)".toLocaleLowerCase()) {
          this.loanntpChangeOrderFlag = true;
        }
        
        else {
          debugger;

          if (itm.search('form::') != -1) {
            let dynformarray = new dynamicsectionarray();
            dynformarray.module_name_code=this.itemdata.module_name_code;
            dynformarray.formmasterid = _stgname[1];
            dynformarray.stageName = _stgname[2];
            dynformarray.stageclass = _stgname[3];
            dynformarray.userTypes = this.itemdata.userTypes;
            dynformarray.stageActive = this.itemdata.stageActive;
            dynformarray.stageapproved = this.itemdata.stageapproved;

            this._formstagearray.push(dynformarray);
          }
          else {
            let fomrids = JSON.parse(item.formmasterid);
            let dynformarray = new dynamicsectionarray();
            dynformarray.module_name_code=this.itemdata.module_name_code;
            dynformarray.formmasterid = JSON.parse(item.formmasterid);
            dynformarray.stageName = itmarray;
            dynformarray.userTypes = this.itemdata.userTypes;
            dynformarray.stageActive = this.itemdata.stageActive;
            dynformarray.stageapproved = this.itemdata.stageapproved;

            this._formstagearray.push(dynformarray);
          }
        }
        //// console.log("this._formstagearray", this._formstagearray);
        existitem.push(itm);
      });

      //// // console.log('installationpropertyflag', this.installationpropertyflag);
      //// // console.log('loanapplicationflag', this.loanapplicationflag);
      //// // console.log('loancoapplicantflag', this.loancoapplicantflag);
      // // // console.log('loanapplicantflag', this.loanapplicantflag);
      // // // console.log('loanpaymentflag', this.loanpaymentflag);
      // // // console.log('loanproductflag', this.loanproductflag);

      if (item.stageActive == 1 && item.stageapproved == 1 && item.loan_app_stage_name.toLocaleLowerCase() == "NTP".toLocaleLowerCase()) {
        this.ntpApprovedFlag = true;
      }

      if (item.stageActive == 1 && item.stageapproved == 1 && item.loan_app_stage_name.toLocaleLowerCase() == "NTP(CO)".toLocaleLowerCase()) {
        this.ntpCOApprovedFlag = true;
      }

      this.stageInfo.show();
      this.active = true;
    }
  }
  close() {

    this.active = false;
    this.stageInfo.hide();
  }

  ntpemit() {
    this.stageInfo.hide();
    this.stageemit.emit();
  }
  changentpemit() {
    this.stageInfo.hide();
    this.changeOrderStageEmit.emit();
  }
  hidePopup() {
    this.stageInfo.hide();
    this.showOverrideReasonPopup.emit();
  }
  CreditScoreMannualPullForCoApp() {
    this.stageCreditScoreManualPullForCoApp.emit();
  }
  hideStage() {
    this.stageInfo.hide();
  }

  ruleProgressShow() {
    debugger
    this.stateRule.emit();
  }
}

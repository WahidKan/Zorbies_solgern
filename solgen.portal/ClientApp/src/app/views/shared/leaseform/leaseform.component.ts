import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { Finance } from 'financejs'
import { ManageleaseService } from '../../managelease/managelease.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { LeasetemplatedetailComponent } from '../leasetemplatedetail/leasetemplatedetail.component';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'leaseform',
  templateUrl: './leaseform.component.html'

})
export class LeaseformComponent implements OnInit, OnChanges {

  @Input() isUCCFilling: boolean;
    @ViewChild('fileInput', { static: false }) fileInput;;
  @Input('group')

  public leaseDetailForm: FormGroup;
  @Input('states') states: any;
  @Input('templates') templates: any;
  @Input('insurance') insurance: any;
  @Input('banks') banks: any;
  @Input('showHideTag') showHideTag: any;
  @Input('customerHideTag') customerHideTag: any;
  @Input('isDisabled') isDisabled: any;
  @Input('isDisabled') isdisable: any;
  @Input('leaseID') leaseID: any;
  @Input('bankUserName') bankUserName: any;
  @Input('IsLanderAgree') IsLanderAgree: any;
  @Input('isLeaseDocumentPrefrered') isLeaseDocumentPrefrered: boolean;
  @Input('isEditLease') isEditLease: boolean;
  @Input('ContactPreferredDocumentSignedBy') ContactPreferredDocumentSignedBy: any;
  @ViewChild('leasetemplatedetail', { static: false }) leasetemplatedetail: LeasetemplatedetailComponent;
  isBankUser: any;
  isBank = false;
  lstrespercentages: any
  lstterms: any;
  totalAmount = 0;
  isbankUserActive: any;
  leaseTermAmount = 1;
  leaseAssignedId: any;
  leaseAssignedBankIdForReset: any;
  uCCFilingDocument: any;
  fileName = 'Select File'; imageLink = '';
  monthlyRentalAmount = 0;
  placementFee = 0;
  isDocumentPreferedDisabled = false;
  isLanderAgree = false;
  loginUserName: any;
  Templateid: any;
  isSalesUser = false;
  LeaseTemplateId: any;
  residualPercent = 0;
  leaseRateAmount = 0;
  isValid: boolean;
  minDate: any;
  fee: any;
  preLeaseTemplateId: any;
  dateTime = new Date();
  To: any;
  From: any;
  showForCustomer = false;
  IsApprovedForPurchase: any;
  IsGenerateLeaseDoc: any;
  isOrperationUser = false;
  isSuperAdminUser = false;
  constructor(private commonService: CommonService
    , private route: ActivatedRoute, private leaseService: ManageleaseService, private dialogService: ConfirmationDialogService,
    private toaster: ToastrService,
    private datePipe: DatePipe) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.bindLeaseDropDowns();
    });

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (userdetail.userType == 'usertype03') {  // For Sales user disable leaseAssignedBankId
        this.isSalesUser = true;
      }
      if (userdetail.userType == 'usertype05') {  //Customer User 
        this.showForCustomer = true;
      }
      if (userdetail.userType == 'usertype01') {  //Customer User 
        this.isSuperAdminUser = true;
      }
      if (userdetail.userType == 'usertype02') {  //Customer User 
        this.isOrperationUser = true;
      }
    });
    //---2 apr
    //////this.commonService.getMasterItemsList("leaselicencefee").subscribe((result: any) => {
    //////  this.fee = this.commonService.masters.filter(x => x.masterName == "LeaseLicenceFee");

    //////  this.leaseLicenceFee.setValue(this.fee[0].text);
    //////})
  }

  UCCFilling(value: boolean) {

    if (value) {
      this.leaseState.enable();
      this.leaseUCCFillingNumber.enable();
      this.leaseUCCFillingDocument.enable();
      this.leaseState.updateValueAndValidity();
      this.leaseUCCFillingNumber.updateValueAndValidity();
      this.leaseUCCFillingDocument.updateValueAndValidity();

    }
    else {
      this.leaseState.disable();
      this.leaseUCCFillingNumber.disable();
      this.leaseUCCFillingDocument.disable();
      this.leaseState.updateValueAndValidity();
      this.leaseUCCFillingNumber.updateValueAndValidity();
      this.leaseUCCFillingDocument.updateValueAndValidity();

    }

  }

  ngOnChanges() {
    this.UCCFilling(this.isUCCFilling);
  }

  ngOnInit() {
    this.LeaseTemplateId = this.leaseDetailForm.get('leaseTemplateId').value;
    this.Templateid = this.LeaseTemplateId;
    if (this.isLeaseDocumentPrefrered == true) {
      this.isDocumentPreferedDisabled = true;

    }
    if (this.leaseDetailForm.controls.leaseUCCFillingDocumentLink.value == undefined) {
      this.uCCFilingDocument = "null";
    } else {
      this.uCCFilingDocument = this.leaseDetailForm.controls.leaseUCCFillingDocumentLink.value;
    }
    this.leaseLicenceFee.disable();
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (userdetail.userType == 'usertype01' || userdetail.userType == 'usertype06' || userdetail.userType == 'usertype02') {
        //superadmin/admin/operation user
       this.leaseLicenceFee.enable();

      }
      if (userdetail.userType == 'usertype03') {  // For Sales user disable leaseAssignedBankId
        this.route.paramMap.subscribe(
          params => {
            const id = params.get('leaseId');
            if (id) {
              this.isSalesUser = true;
              this.leaseAssignedBankId.disable();
            }
          });
        this.leaseAssignedBankId.disable();
      }
      else if (userdetail.userType == 'usertype04') {
        this.isBankUser = true;
        this.isDisabled = true;
        this.leaseState.disable();
        this.leaseInsurance.disable();
        this.leaseAssignedBankId.disable();
        this.leaseResidualPercentage.disable();
        this.leaseTerm.disable();
      }
    })
    if (this.isDisabled === 'disabled') {
      this.leaseState.disable();
      this.leaseAssignedBankId.disable();
      this.leaseResidualPercentage.disable();
      this.leaseTerm.disable();
    }
    if (this.IsLanderAgree == true) {
      this.isLanderAgree = true;
    }

    this.bindLeaseDropDowns();
    this.leaseService.getCurrentDate().subscribe((res: any) => {
      this.lenderDate.setValue(res);
    });
    if (!this.showHideTag && this.customerHideTag) {

      if (this.leaseID === null
        || typeof this.leaseID === 'undefined'
        ||
        this.leaseID === '') {
        this.leaseService.getCurrentDate().subscribe((res: any) => {
          this.leaseDate.setValue(res);
          this.lenderDate.setValue(res);

          //---2 apr
          this.commonService.getMasterItemsList("leaselicencefee").subscribe((result: any) => {
            this.fee = this.commonService.masters.filter(x => x.masterName == "LeaseLicenceFee");

            //this.leaseLicenceFee.setValue(this.fee[0].text);

            var formattedNumber = this.SetUSCurrencyFormat(this.fee[0].text);
            this.leaseLicenceFee.setValue(formattedNumber);
          })
        });
      }
    }

    this.leaseEquipmentMSRP.valueChanges.subscribe(m => {//sales Price
      this.calculteTotalEquipMSRP();
    });
    this.leaseAdditions1.valueChanges.subscribe(m => {//Added Equipment
      this.calculteTotalEquipMSRP();
    });

    this.leaseEquipmentCost.valueChanges.subscribe(m => {//Purchase Price
      this.calculateTotalLeaseAmount();
    });
    this.leaseAdditions2.valueChanges.subscribe(m => {//Added Equipment
      this.calculateTotalLeaseAmount();
    });
    this.leaseSalesTax.valueChanges.subscribe(m => {
      this.calculateTotalLeaseAmount();
    });
    this.leaseWarranty.valueChanges.subscribe(m => {
      this.calculateTotalLeaseAmount();
    });

    this.leaseOther.valueChanges.subscribe(m => {
      this.calculateTotalLeaseAmount();
    });
    this.leaseFeePercentage.valueChanges.subscribe(m => {
      this.calculateTotalLeaseAmount();
    });

    this.leaseEquipmentCost.valueChanges.subscribe(m => {
      this.calculatePlaceMentFee();
    });

    this.leaseAdditions2.valueChanges.subscribe(m => {
      this.calculatePlaceMentFee();
    });
    this.leaseFeePercentage.valueChanges.subscribe(m => {
      this.calculatePlaceMentFee();
    });
    this.commonService.getLoggedInName.subscribe((user: any) => {

      let id = this.commonService.LoginUser.id;
      this.loginUserName = this.commonService.LoginUser.firstName;
    });
    this.UCCFilling(this.isUCCFilling);


    this.route.paramMap.subscribe(
      params => {
        const id = params.get('leaseId');
        if (id) {
          this.getLeaseDetails(id, this.isBank);
        }
      });
  }

  AssignBankddl() {
    this.leaseAssignedBankId.setValue(null);
    this.leaseAssignedBankIdForReset = "ResetDll";
  }

  SetBankAssignId(status: string) {
    this.leaseAssignedId = status;
  }
   
  GetPreSelectedValue() {
    this.preLeaseTemplateId = this.leaseTemplateId.value;
  }

  setLenderAgree($event) {
    this.isLanderAgree = $event.target.checked;
  }

  bindLeaseDropDowns() {
    this.commonService.getMasterItemsList("ResidualPercentage,LeaseTerm").subscribe((result: any) => {
      this.lstrespercentages = this.commonService.masters.filter(x => x.masterName == "ResidualPercentage");
      this.lstterms = this.commonService.masters.filter(x => x.masterName == "LeaseTerm");
    });
  }

  uccFillingChange(event) {
    if (event.target.checked) {
      this.leaseState.enable();
      this.leaseUCCFillingNumber.enable();
      this.leaseUCCFillingDocument.enable();
      this.leaseState.updateValueAndValidity();
      this.leaseUCCFillingNumber.updateValueAndValidity();
      this.leaseUCCFillingDocument.updateValueAndValidity();
    }
    else {
      this.leaseState.disable();
      this.leaseUCCFillingNumber.disable();
      this.leaseUCCFillingDocument.disable();
      this.leaseState.updateValueAndValidity();
      this.leaseUCCFillingNumber.updateValueAndValidity();
      this.leaseUCCFillingDocument.updateValueAndValidity();
    }
  }

  get leaseType() { return this.leaseDetailForm.get('leaseType'); }
  get leaseDate() { return this.leaseDetailForm.get('leaseDate'); }
  get leaseMaturityDate() { return this.leaseDetailForm.get('leaseMaturityDate'); }
  get leaseRate() { return this.leaseDetailForm.get('leaseRate'); }
  get leaseFeePercentage() { return this.leaseDetailForm.get('leaseFeePercentage'); }
  get leaseResidualPercentage() { return this.leaseDetailForm.get('leaseResidualPercentage'); }
  get leaseState() { return this.leaseDetailForm.get('leaseState'); }
  get leaseAssignedBankId() { return this.leaseDetailForm.get('leaseAssignedBankId'); }
  get insuranceExpirationDate() { return this.leaseDetailForm.get('insuranceExpirationDate'); }
  get leaseTerm() { return this.leaseDetailForm.get('leaseTerm'); }
  get leaseEquipmentMSRP() { return this.leaseDetailForm.get('leaseEquipmentMSRP'); }
  get leaseEquipmentCost() { return this.leaseDetailForm.get('leaseEquipmentCost'); }
  get leaseAdditions1() { return this.leaseDetailForm.get('leaseAdditions1'); }
  get leaseAdditions2() { return this.leaseDetailForm.get('leaseAdditions2'); }
  get leaseTotalEquipmentMSRP() { return this.leaseDetailForm.get('leaseTotalEquipmentMSRP'); }
  get leaseSalesTax() { return this.leaseDetailForm.get('leaseSalesTax'); }
  get leaseResidualAmount() { return this.leaseDetailForm.get('leaseResidualAmount'); }
  get leaseWarranty() { return this.leaseDetailForm.get('leaseWarranty'); }
  get leaseOther() { return this.leaseDetailForm.get('leaseOther'); }
  get leaseMonthlyRentalPayment() { return this.leaseDetailForm.get('leaseMonthlyRentalPayment'); }
  get leasePlacementFee() { return this.leaseDetailForm.get('leasePlacementFee'); }
  get leaseAmountDueAtSigining() { return this.leaseDetailForm.get('leaseAmountDueAtSigining'); }
  get leaseTotalAmount() { return this.leaseDetailForm.get('leaseTotalAmount'); }
  get leaseTermText() { return this.leaseDetailForm.get('leaseTermText'); } 
  get leaseTemplateId() { return this.leaseDetailForm.get('leaseTemplateId'); }
  get leaseTemplateContent() { return this.leaseDetailForm.get('leaseTemplateContent'); }
  get lenderName() { return this.leaseDetailForm.get('lenderName'); }
  get lenderDate() { return this.leaseDetailForm.get('lenderDate'); }
  get lenderNotes() { return this.leaseDetailForm.get('lenderNotes'); }
  get lenderAgree() { return this.leaseDetailForm.get('lenderAgree'); }
  get leaseInsurance() { return this.leaseDetailForm.get('leaseInsurance'); }
  get leaseUCCFillingNumber() { return this.leaseDetailForm.get('leaseUCCFillingNumber'); }
  get leaseUCCFillingDocument() { return this.leaseDetailForm.get('leaseUCCFillingDocument'); }
  get isLeaseUCCFilling() { return this.leaseDetailForm.get('isLeaseUCCFilling'); }
  get leaseLicenceFee() { return this.leaseDetailForm.get('leaseLicenceFee'); }
  get leasePreferredDocumentSignedBy() { return this.leaseDetailForm.get('leasePreferredDocumentSignedBy'); }

  initializeFormula() {

  }

  getLeaseDetails(id: any, isBank: boolean) {
    this.leaseService.getLeaseDetails(id, isBank).subscribe((res: any) => {
      if (res) {
        this.IsApprovedForPurchase = res.isApprovedForPurchase;
        this.IsGenerateLeaseDoc = res.isGenerateLeaseDoc;

        if (res.isApprovedForPurchase == true) {
          this.leaseAssignedBankId.disable();
        }
        if (res.isGenerateLeaseDoc == true) {
          this.isdisable = true;
          this.leaseTemplateId.disable();
          this.leaseLicenceFee.disable();
        }
      }
    });
  }
  onblurPurchasePrice() {
    var formattedNumber = this.SetUSCurrencyFormat(this.leaseEquipmentCost.value);
    this.leaseEquipmentCost.setValue(formattedNumber);
  }

  onblurSalePrice(){
  var formattedNumber = this.SetUSCurrencyFormat(this.leaseEquipmentMSRP.value);
  this.leaseEquipmentMSRP.setValue(formattedNumber);
}
  onblurAddedEquipment() {
    var formattedNumber = this.SetUSCurrencyFormat(this.leaseAdditions2.value);
    this.leaseAdditions2.setValue(formattedNumber);
  }
  onblurAddedEquipment2() {
    var formattedNumber = this.SetUSCurrencyFormat(this.leaseAdditions1.value);
    this.leaseAdditions1.setValue(formattedNumber);
  }
  onblurSalesTax() {
    var formattedNumber = this.SetUSCurrencyFormat(this.leaseSalesTax.value);
    this.leaseSalesTax.setValue(formattedNumber);
  }
  onblurDelivery() {
    var formattedNumber = this.SetUSCurrencyFormat(this.leaseWarranty.value);
    this.leaseWarranty.setValue(formattedNumber);
  }
  onblurOther() {
    var formattedNumber = this.SetUSCurrencyFormat(this.leaseOther.value);
    this.leaseOther.setValue(formattedNumber);
  }
  onblurDocumentationFee() {
    var formattedNumber = this.SetUSCurrencyFormat(this.leaseLicenceFee.value);
    this.leaseLicenceFee.setValue(formattedNumber);}

  SetUSCurrencyFormat(amt) {
  try{
    if(amt.indexOf("$")>=0) 
    {
        amt=amt.replace("$", "");        
    }
    if(amt.indexOf(",")>=0)
    {
        amt=amt.replace(",", "");        
    }
  }catch(error){}
    let currencyPipe = new CurrencyPipe('en');
    let formattedNumber = currencyPipe.transform(amt, 'USD', 'symbol');
    return formattedNumber;    
  }

  calculteTotalEquipMSRP() {
    var add1 = this.leaseAdditions1.value;
    add1 = add1.replace("$", "").replace(",", "")

    var eqmsrp = this.leaseEquipmentMSRP.value;
    eqmsrp = eqmsrp.replace("$", "").replace(",", "")

    //const val1 = parseFloat(this.leaseEquipmentMSRP.value == '' ? 0 : this.leaseEquipmentMSRP.value);
    //const val2 = parseFloat(this.leaseAdditions1.value == '' ? 0 : this.leaseAdditions1.value );

    const val1 = parseFloat(eqmsrp == '' ? 0 : eqmsrp);
    const val2 = parseFloat(add1 == '' ? 0 : add1);


    let result = val1 + val2;
   ////////////// this.leaseTotalEquipmentMSRP.setValue(result.toFixed(2));
    var formattedNumber = this.SetUSCurrencyFormat(result);
    this.leaseTotalEquipmentMSRP.setValue(formattedNumber);

    if (this.leaseResidualPercentage.value != null) {
      this.calculteResidualAmount();
    }
  }

  setResidualPercentage(event) {
    if (event.value) {
      this.residualPercent =parseInt(event.text === '' ? 0 : event.text.replace(/^\D+/g, ''));
      this.calculteResidualAmount();
    }
  }

  calculteResidualAmount() {
    let equipMentCost = 0;
    let percentValue = 0;
  


   // if (this.leaseEquipmentCost.value != "") {
    if (this.leaseTotalEquipmentMSRP.value != "") {
      var eqipMSRP = this.leaseTotalEquipmentMSRP.value.replace("$", "").replace(",", "")
      //////////equipMentCost = parseFloat(this.leaseTotalEquipmentMSRP.value);//Purchase Price
      equipMentCost = eqipMSRP;
    }
    if (this.residualPercent > 0) {
      percentValue = (this.residualPercent * equipMentCost) / 100
    /////////////////////////  this.leaseResidualAmount.setValue(percentValue.toFixed(2));
      var formattedNumber = this.SetUSCurrencyFormat(percentValue);
      this.leaseResidualAmount.setValue(formattedNumber);

    }
  }

  calculatePlaceMentFee() {
    //var eCost = this.leaseEquipmentCost.value;
    //eCost = eCost.replace("$", "").replace(",", "")
    //this.leaseEquipmentCost.setValue(eCost);


    //var add2 = this.leaseAdditions2.value;
    //add2 = eCost.replace("$", "").replace(",", "")
    //this.leaseAdditions2.setValue(add2);


    //////////////const val1 = this.leaseEquipmentCost.value;
    //////////////const val2 = this.leaseAdditions2.value;
    var val1 = this.leaseEquipmentCost.value;
    var val2 = this.leaseAdditions2.value;
    let val3 = this.leaseFeePercentage.value;

    val1 = val1.replace("$", "").replace(",", "");
    val2 = val2.replace("$", "").replace(",", "");

    if (parseFloat(val3) > 0) {
      val3 = (val3 / 100);
    }
    let result = (parseFloat(val1 === '' ? 0 : val1) + parseFloat(val2 === '' ? 0 : val2)) * parseFloat(val3 === '' ? 0 : val3);
    if (result < 0)
      result = 0;
    this.placementFee = result;
    //////////////this.leasePlacementFee.setValue(result.toFixed(2));
    var formattedNumber = this.SetUSCurrencyFormat(result);
    this.leasePlacementFee.setValue(formattedNumber);
  }

  calculateTotalLeaseAmount() {
   
    //const val1 = this.leaseEquipmentCost.value;
    //const val2 = this.leaseAdditions2.value;
    //const val3 = this.leaseSalesTax.value;
    //const val4 = this.leaseWarranty.value;
    //const val5 = this.leaseOther.value;
    var val1 = this.leaseEquipmentCost.value;
    var val2 = this.leaseAdditions2.value;
    var val3 = this.leaseSalesTax.value;
    var val4 = this.leaseWarranty.value;
    var val5 = this.leaseOther.value;

    val1 = val1.replace("$", "").replace(",", "");
    val2 = val2.replace("$", "").replace(",", "");
    val3 = val3.replace("$", "").replace(",", "");
    val4 = val4.replace("$", "").replace(",", "");
    val5 = val5.replace("$", "").replace(",", "");

    let val6 = this.leaseFeePercentage.value;
    if (parseFloat(val6) > 0) {
      val6 = (val6 / 100);
    }
    let result = ((parseFloat(val1 === '' ? 0 : val1) + parseFloat(val2 === '' ? 0 : val2)) * parseFloat(val6 === '' ? 0 : val6))
      + parseFloat(val3 === '' ? 0 : val3) + parseFloat(val4 === '' ? 0 : val4)
      + parseFloat(val5 === '' ? 0 : val5)
      + parseFloat(val2 === '' ? 0 : val2) + parseFloat(val1 === '' ? 0 : val1);
    if (result < 0)
      result = 0;

    this.totalAmount = result;
   /////////// this.leaseTotalAmount.setValue(result.toFixed(2));
    this.leaseTotalAmount.setValue(this.SetUSCurrencyFormat(result));
  }

  setLeaseTerm(event) {
    if (typeof event == 'undefined') {
      this.leaseTermAmount = 0;
      this.leaseMaturityDate.setValue("");
    }
    else { 
      if (this.leaseTermText !== null && typeof this.leaseTermText !== 'undefined') {
        this.leaseTermText.setValue(event.text);
      }
      if (event.value !== null && typeof event.value !== 'undefined') {
        this.leaseTermAmount = parseInt(event.text.replace(/^\D+/g, ''));
      }
      else {
        this.leaseTermAmount = 1;
      }
      if (!this.showHideTag && this.customerHideTag) {
        if (this.leaseDate.value != null) {
          let dt = new Date(this.leaseDate.value);
          var newDate = new Date(dt.setMonth(dt.getMonth() + this.leaseTermAmount));
          this.leaseMaturityDate.setValue(this.datePipe.transform(newDate,'MM/dd/yyyy'));
        }
        else {
          this.leaseMaturityDate.setValue("");
        }
      }
    }
  }

  selectDateOfLease(event) {
    const term = this.lstterms.find(m => m.value === this.leaseTerm.value);
  
    if (term) {
      this.leaseTermAmount = parseInt(term.text.replace(/^\D+/g, '')); ;
    }

    if (!this.showHideTag && this.customerHideTag) {
      if (this.leaseTermAmount != 0 && this.leaseDate.value!=null) {
        let dt = new Date(this.leaseDate.value);
        var newDate = new Date(dt.setMonth(dt.getMonth() + this.leaseTermAmount));
        this.leaseMaturityDate.setValue(this.datePipe.transform(newDate, 'MM/dd/yyyy'));
      }
      else {
        this.leaseMaturityDate.setValue("");
      }
    }
  }

  setLeaseRate() {
    this.leaseRateAmount = this.leaseRate.value;
  }

  calculatePMT() {

    let rate = parseFloat(this.leaseRateAmount.toString());
    if (rate > 0) {
      rate = (rate / 100);
    }
    let monthlyRentalAmt = "0";
    const pv = (this.leaseTermAmount <= 0 ? 0 : this.leaseTermAmount - 1);
    let fv = this.totalAmount;
    if (rate > 0
      && this.totalAmount > 0
      && pv > 0) {
      let finance = new Finance();
      this.monthlyRentalAmount = finance.PMT((rate / 12), pv, -fv);
      

      this.leaseMonthlyRentalPayment.setValue(this.SetUSCurrencyFormat(this.monthlyRentalAmount));
      return this.SetUSCurrencyFormat(this.monthlyRentalAmount);

      ////////this.leaseMonthlyRentalPayment.setValue(this.monthlyRentalAmount.toFixed(2));
      ////////return this.monthlyRentalAmount.toFixed(2);
    }
    else {
let mpayment : string;
mpayment="0";
  mpayment=this.leaseMonthlyRentalPayment.value;

 
//mpayment=mpayment.replace("$", "").replace(",", "");
try{
  this.monthlyRentalAmount = parseFloat(this.leaseMonthlyRentalPayment.value.replace("$", "").replace(",", ""));
}
catch (error) {
  this.monthlyRentalAmount = parseFloat(this.leaseMonthlyRentalPayment.value);
} 
//this.monthlyRentalAmount = parseFloat(mpayment);
return this.leaseMonthlyRentalPayment.value; 
     //this.monthlyRentalAmount = parseFloat(this.leaseMonthlyRentalPayment.value);
   //  return this.monthlyRentalAmount.toFixed(2);
    }

  }


  calculatePMTbk() {
    let rate = parseFloat(this.leaseRateAmount.toString());
    if (rate > 0) {
      rate = (rate / 100);
    }
    const pv = (this.leaseTermAmount <= 0 ? 0 : this.leaseTermAmount - 1);
    let fv = this.totalAmount;
    if (rate > 0
      && this.totalAmount > 0
      && pv > 0) {
      let finance = new Finance();
      this.monthlyRentalAmount = finance.PMT((rate / 12), pv, -fv);
      this.leaseMonthlyRentalPayment.setValue(this.monthlyRentalAmount.toFixed(2));
      return this.monthlyRentalAmount.toFixed(2);
    }
    else {
      this.monthlyRentalAmount = parseFloat(this.leaseMonthlyRentalPayment.value);
      return this.monthlyRentalAmount.toFixed(2);
    }
  }
  calculateAmountDueSigning() { 
    var licFee = this.leaseLicenceFee.value;
    licFee = licFee.replace("$", "").replace(",", "");
    let amount = (this.monthlyRentalAmount + parseFloat(licFee));
    if (amount > 0) {
     //////// this.leaseAmountDueAtSigining.setValue(amount.toFixed(2));
      this.leaseAmountDueAtSigining.setValue(this.SetUSCurrencyFormat(amount));
      return amount.toFixed(2);
    }
    return amount;
  }
  calculateAmountDueSigningbk() {
    var licFee = this.leaseLicenceFee.value;
    licFee = licFee.replace("$", "").replace(",", "");
    let amount = (this.monthlyRentalAmount + parseFloat(licFee));
    if (amount > 0) {
      this.leaseAmountDueAtSigining.setValue(amount.toFixed(2));
      return amount.toFixed(2);
    }
    return amount;
  }

  setFile($event): void {
    this.fileName = "Select File";
    this.commonService.uploadDocumentFileValidator($event);
    if (this.commonService.isUploadFileValid) {
      if (typeof this.fileInput != 'undefined') {
        this.commonService.uploadDocumentSizeLeaseManagement("img", $event.target.files[0].size)
        if (this.commonService.isFileValid) {
          this.fileName = $event.target.files[0].name;
          this.uCCFilingDocument = this.fileName;
          var form = new FormData()
          form.append('file', $event.target.files[0]);
          const fileBrowser = this.fileInput.nativeElement;
          if (fileBrowser.files && fileBrowser.files[0]) {
            form.append('file', fileBrowser.files[0]);
          }
        }
      }
    }
  }

  save(leaseId: any) {

    if (this.uCCFilingDocument === null || this.uCCFilingDocument === ''
      || typeof this.uCCFilingDocument === 'undefined'
      || this.uCCFilingDocument == 'UCC Select File') {
      this.isValid = false;
    }
    else {
      this.isValid = true;
    }
    if (this.isValid) {
      if (typeof this.fileInput != 'undefined') {
        var form = new FormData()
        const fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
          form.append('file', fileBrowser.files[0]);
          form.append('leaseId', leaseId);
          form.append('leaseNumber', leaseId);
          this.leaseService.updateLeaseDocument(form).subscribe((result: any) => {
          })
        }
      }
    }
  }

  downloadDocument(fileName: any, folderName: any) {
    this.commonService.DownloadDocument(fileName, folderName);
  }

  onPageSizeChanged(event: string, leaseTemplateId) {
    if (this.leaseID != null) {
      const message = `If you update Template then old template will be replaced with new one`;
      this.dialogService.confirm('Alert', message).subscribe(confirmed => {
        if (confirmed) {
          this.leaseTemplateId.setValue(event);
          this.Templateid = event;
        } else {
          this.leaseTemplateId.setValue(leaseTemplateId);
          this.Templateid = leaseTemplateId;
        }
      });
    }
  }

  LeaseTemplateOpen() {
    if (this.Templateid != null) {
      this.leaseService.GetTemplateDetail(this.Templateid).subscribe((result: any) => {
        this.leaseTemplateId.setValue(result.templateId);
        this.leaseTemplateContent.setValue(result.templateName);
        this.leasetemplatedetail.show(result, this.leaseID);
      });
    }
    else {
      this.toaster.error("Please select Lease Template");
    }
  }

  setDefaultValeusOfDocumentSigned() {
   
    this.leaseDetailForm.patchValue({
      leasePreferredDocumentSignedBy: this.ContactPreferredDocumentSignedBy
    });
  }
}

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { ManageleaseService } from '../managelease.service';
import { ToastrService } from 'ngx-toastr';
import { retry } from 'rxjs/operators';
import { from } from 'rxjs';
import { Finance } from 'financejs'
@Component({
  selector: 'leaseformold',
  templateUrl: './leaseformold.component.html',

})
export class LeaseformoldComponent implements OnInit {
    @ViewChild('fileInput', { static: false }) fileInput;;
  @Input('group')
  public leaseDetailForm: FormGroup;
  @Input('states') states: any;
  @Input('banks') banks: any;
  lstrespercentages: any
  lstterms: any;
  totalAmount = 0;
  leaseTermAmount = 1;
  uCCFilingDocument: any;
  fileName = 'Select File'; imageLink = '';
  monthlyRentalAmount = 0;
  placementFee = 0;
    isValid: boolean;
  constructor(public commonService: CommonService
    , private leaseService: ManageleaseService, private toaster: ToastrService, ) {
  }

  ngOnInit() {
    this.bindLeaseDropDowns();
    this.leaseService.getCurrentDate().subscribe((res: any) => {
      this.leaseDate.setValue(res);
    });
  }

  bindLeaseDropDowns() {
    this.commonService.getMasterItemsList("ResidualPercentage,LeaseTerm").subscribe((result: any) => {
      this.lstrespercentages = this.commonService.masters.filter(x => x.masterName == "ResidualPercentage");
      this.lstterms = this.commonService.masters.filter(x => x.masterName == "LeaseTerm");
    });
  }


  get leaseDate() { return this.leaseDetailForm.get('leaseDate'); }
  get leaseMaturityDate() { return this.leaseDetailForm.get('leaseMaturityDate'); }
  get leaseRate() { return this.leaseDetailForm.get('leaseRate'); }
  get leaseFeePercentage() { return this.leaseDetailForm.get('leaseFeePercentage'); }
  get leaseResidualPercentage() { return this.leaseDetailForm.get('leaseResidualPercentage'); }
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

  initializeFormula() {

  }

  calculteTotalEquipMSRP() {
    const val1 = this.leaseEquipmentMSRP.value;
    const val2 = this.leaseAdditions1.value;
    let result = parseInt(val1 === '' ? 0 : val1) + parseInt(val2 === '' ? 0 : val2);
    if (result < 0)
      result = 0;
    return result;
  }

  calculteResidualAmount() {
    let result = 0;
    let equipMentCost = parseInt(this.leaseEquipmentCost.value);
    if (this.leaseResidualAmount.value.value) {
      const val1 = this.leaseResidualAmount.value.text;
      const percentValue = (parseInt(val1 === '' ? 0 : val1.replace('%', '')) * equipMentCost)/100
      result = 3 * percentValue;
      if (result < 0)
        result = 0;
    }
    this.leaseResidualAmount.setValue(result);
  }

  calculatePlaceMentFee() {
    const val1 = this.leaseEquipmentCost.value;
    const val2 = this.leaseAdditions2.value;
    const val3 = this.leaseFeePercentage.value;
    let result = (parseInt(val1 === '' ? 0 : val1) + parseInt(val2 === '' ? 0 : val2)) * parseInt(val3 === '' ? 0 : val3);
    if (result < 0)
      result = 0;
    this.placementFee = result;
    return result;
  }

  calculateTotalLeaseAmount() {
    const val1 = this.leaseEquipmentCost.value;
    const val2 = this.leaseAdditions2.value;
    const val3 = this.leaseSalesTax.value;
    const val4 = this.leaseWarranty.value;
    const val5 = this.leaseOther.value;
    const val6 = this.leaseFeePercentage.value;
    let result = ((parseInt(val1 === '' ? 0 : val1) + parseInt(val2 === '' ? 0 : val2)) * parseInt(val6 === '' ? 0 : val6))
      + parseInt(val3 === '' ? 0 : val3) + parseInt(val4 === '' ? 0 : val4)
      + parseInt(val5 === '' ? 0 : val5)
      + parseInt(val2 === '' ? 0 : val2) + parseInt(val1 === '' ? 0 : val1);
    if (result < 0)
      result = 0;

    this.totalAmount = result;
    return result;
  }

  setLeaseTerm(event) {
    if (event.value !== null && typeof event.value !== 'undefined') {
      this.leaseTermAmount = parseInt(event.text.replace(" months", ""));
    }
    else {
      this.leaseTermAmount = 1;
    }

    this.leaseService.getMaturityDate(this.leaseTermAmount).subscribe((res: any) => {
      this.leaseMaturityDate.setValue(res);
    });
  }

  calculatePMT() {
    let rate = parseInt(this.leaseRate.value);
    if (rate > 0) {
      rate = (rate / 100);
    }
    const pv = this.leaseTermAmount - 1;
    let fv = this.totalAmount;
    if (rate > 0
      && this.totalAmount > 0
      && pv > 0) {
      let finance = new Finance();
      this.monthlyRentalAmount = finance.PMT((rate / 12), pv, -fv);
      return this.monthlyRentalAmount.toFixed(2);
    }
    else {
      return 0;
    }
  }

  calculateAmountDueSigning() {
    return (this.monthlyRentalAmount + this.placementFee).toFixed(2);
  }

  setFile($event): void {
    this.uCCFilingDocument = 'Select File';
    this.commonService.uploadDocumentFileValidator($event);
    if (this.commonService.isUploadFileValid) {
      this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "10MB")
      if (this.commonService.isFileValid) {
        this.fileName = $event.target.files[0].name;
        var form = new FormData()
        form.append('file', $event.target.files[0]);

        const fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
          form.append('file', fileBrowser.files[0]);
        }
      }
    }
  }

  save(leaseId: any) {
    if (this.uCCFilingDocument === null || this.uCCFilingDocument === ''
      || typeof this.uCCFilingDocument === 'undefined'
      || this.uCCFilingDocument == 'Select File') {
      this.isValid = false;
    }
    else {
      this.isValid = true;
    }
    if (this.isValid) {
      var form = new FormData()
      const fileBrowser = this.fileInput.nativeElement;
      if (fileBrowser.files && fileBrowser.files[0]) {
        form.append('file', fileBrowser.files[0]);
        form.append('leaseId', leaseId);
        this.leaseService.updateLeaseDocument(form).subscribe((result: any) => {

        })
      }
    }
  }
  downloadDocument(fileName: any, folderName: any) {
    this.commonService.DownloadDocument(fileName, folderName);
  }
}

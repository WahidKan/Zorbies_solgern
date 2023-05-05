import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ManageleaseService, LeaseForm } from '../managelease.service';
import { CommonService } from '../../shared/common.service';
import { ContactService, Guarantor } from '../../contact/contact.service';
import { ToastrService } from 'ngx-toastr';
import { LeaseformComponent } from '../../shared/leaseform/leaseform.component';

@Component({
  selector: 'app-leasedetail',
  templateUrl: './leasedetail.component.html',
  styleUrls: ['./leasedetail.component.scss']
})
export class LeasedetailComponent implements OnInit {
  public leaseForm: FormGroup;
  lstcontactPosition: any;
  lstcompanyType: any;
  lstStates: any;
  isLoading = false;
  contactCreatedOn: any;
  contactId: any;
  vendorId: any;
  leasedata: any;
  IsLeaseDocumentPrefrered = false;
  lstBanks: any;
  loadSave = false;
  showHideTag = false;
  isDisabled = 'disabled';
  constructor(private fb: FormBuilder,
    private leaseService: ManageleaseService,
    private commonService: CommonService,
    private _location: Location,
    private contactService: ContactService,
    private route: ActivatedRoute) {
    this.loadDropDowns();
    this.loadStateDropdown();
    this.loadBankDropDown();
  }

  loadDropDowns() {
    this.isLoading = true;
    this.commonService.getMasterItemsList("BussinessContactPosition,CompanyType").subscribe((result: any) => {
      this.lstcontactPosition = this.commonService.masters.filter(x => x.masterName == "BussinessContactPosition");
      this.lstcompanyType = this.commonService.masters.filter(x => x.masterName == "CompanyType");
      this.isLoading = false;
    });
  }

  loadStateDropdown() {
    this.commonService.getStatesList().subscribe(res => {
      this.lstStates = this.commonService.states;
    });
  }

  loadBankDropDown() {
    this.commonService.getBankDropList().subscribe(res => {
      this.lstBanks = res;
    });
  }
  fillForm(id) {
    this.contactService.getContactDetails(id).subscribe((res: any) => {
      this.contactId = id;
      this.leaseForm.patchValue({
        contactId: res.contactDetails[0].contactId,
        contactBussinessName: res.contactDetails[0].contactBussinessName,
        contactBussinessMailAddress: res.contactDetails[0].contactBussinessMailAddress,
        contactMailAddressCity: res.contactDetails[0].contactMailAddressCity,
        contactMailAddressState: res.contactDetails[0].contactMailAddressState,
        contactMailAddressZip: res.contactDetails[0].contactMailAddressZip,
        contactMailAddressCounty: res.contactDetails[0].contactMailAddressCounty,
        contactBussinessPhysicalAddress: res.contactDetails[0].contactBussinessPhysicalAddress,
        contactPhysicalAddressCity: res.contactDetails[0].contactPhysicalAddressCity,
        contactPhysicalAddressState: res.contactDetails[0].contactPhysicalAddressState,
        contactPhysicalAddressZip: res.contactDetails[0].contactPhysicalAddressZip,
        contactBussinessPhone: res.contactDetails[0].contactBussinessPhone,
        contactBussinessTIN: res.contactDetails[0].contactBussinessTIN,
        contactTypeOfCompany: res.contactDetails[0].contactTypeOfCompany,
        contactFirstName: res.contactDetails[0].contactFirstName,
        contactLastName: res.contactDetails[0].contactLastName,
        contactEmail: res.contactDetails[0].contactEmail,
        contactPosition: res.contactDetails[0].contactPosition,
        contactPreferredDocumentSignedBy: res.contactDetails[0].contactPreferredDocumentSignedBy,
        contactPhysicalAddressCounty: res.contactDetails[0].contactPhysicalAddressCounty,
      });
      this.contactCreatedOn = res.contactDetails[0].contactCreatedOn;
      res.guarantors.forEach(m => {
        this.guarantors.push(this.initdisplayGuarantor(m));
      });
      this.guarantors.removeAt(0);

      if (this.leasedata) {
        this.leases.push(this.initdisplayLease(this.leasedata));
        this.leases.removeAt(0);
      }
    })
  }
  setValidation() {
    let control = this.leases.controls[0] as FormGroup


  }
  cancel() {
    this._location.back();
  }
  ngOnInit() {
    this.leaseForm = this.fb.group({
      contactId: [null],
      contactBussinessName: [''],
      contactBussinessMailAddress: [''],
      contactMailAddressCity: [''],
      contactMailAddressState: [null],
      contactMailAddressZip: [''],
      contactMailAddressCounty: [''],
      contactBussinessPhysicalAddress: [''],
      contactPhysicalAddressCity: [''],
      contactPhysicalAddressState: [null],
      contactPhysicalAddressZip: [''],
      contactBussinessPhone: [''],
      contactBussinessTIN: [''],
      contactTypeOfCompany: [null],
      contactFirstName: [''],
      contactLastName: [''],
      contactEmail: [''],
      contactPosition: [null],
      contactPhysicalAddressCounty: [''],
      guarantors: this.fb.array([
        this.initGuarantor(),
      ]),
      leases: this.fb.array([
        this.initLeaseForm(),
      ]),
    });

    //get routing parameters
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('leaseId');
        if (id) {
          this.loadSave = true;
          this.getLeaseDetails(id);
        }
      }
    );
    this.route.queryParams
      .filter(params => params.contactid)
      .subscribe(params => {
        this.contactId = params.contactid;
        this.fillForm(this.contactId);
      });
    this.mailAddressState.disable();
    this.typeOfCompany.disable();
    this.physicalAddressState.disable();
    this.position.disable();
  }

  initGuarantor() {
    // initialize our guarantor
    return this.fb.group({
      guarantorID: [null],
      guarantorFirstName: [''],
      guarantorLastName: [''],
      guarantorTitle: [''],
      guarantorOwnership: [''],
      guarantorBussinessAddress: [''],
      guarantorBussinessCity: [''],
      guarantorBussinessState: [null],
      guarantorBussinessZip: [''],
      guarantorBussinessCounty: [''],
      guarantorHomeAddress: [''],
      guarantorHomeCity: [''],
      guarantorHomeState: [null],
      guarantorHomeZip: [''],
      guarantorHomeCounty: [''],
      guarantorPhone: [''],
      guarantorEmail: [''],
      guarantorSocialNumber: [''],
      guarantorFormattedDateOfBirth: [null],
    });
  }
  initdisplayGuarantor(gurantor: Guarantor) {
    return this.fb.group({
      guarantorID: gurantor.guarantorID,
      guarantorFirstName: gurantor.guarantorFirstName,
      guarantorLastName: gurantor.guarantorLastName,
      guarantorTitle: gurantor.guarantorTitle,
      guarantorOwnership: gurantor.guarantorOwnership,
      guarantorBussinessAddress: gurantor.guarantorBussinessAddress,
      guarantorBussinessCity: gurantor.guarantorBussinessCity,
      guarantorBussinessState: gurantor.guarantorBussinessState,
      guarantorBussinessZip: gurantor.guarantorBussinessZip,
      guarantorBussinessCounty: gurantor.guarantorBussinessCounty,
      guarantorHomeAddress: gurantor.guarantorHomeAddress,
      guarantorHomeCity: gurantor.guarantorHomeCity,
      guarantorHomeState: gurantor.guarantorHomeState,
      guarantorHomeZip: gurantor.guarantorHomeZip,
      guarantorHomeCounty: gurantor.guarantorHomeCounty,
      guarantorPhone: gurantor.guarantorPhone,
      guarantorEmail: gurantor.guarantorEmail,
      guarantorSocialNumber: gurantor.guarantorSocialNumber,
      guarantorFormattedDateOfBirth: gurantor.guarantorFormattedDateOfBirth,
    });
  }

  initLeaseForm() {
    // initialize our guarantor
    return this.fb.group({
      leaseId: [null],
      leaseUseType: ['', Validators.required],
      leaseType: ['', Validators.required],
      leaseOtherDescription: [''],
      leaseDescription: [''],
      isLeaseUCCFilling: [false],
      leaseState: [null],
      leaseUCCFillingDocument: [null],
      leaseUCCFillingNumber: [''],
      leaseSerialNumber: ['', Validators.required],
      leaseRate: [0, [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      leaseFeePercentage: [0, [Validators.required, Validators.pattern("^([0-9]|[1-9][0-9]|100)$")]],
      leaseResidualPercentage: [null, Validators.required],
      leaseTerm: [null, Validators.required],
      leaseEquipmentMSRP: [0, [Validators.required, Validators.pattern("^[0-9]*$")]],
      leaseEquipmentCost: [0, [Validators.required, Validators.pattern("^[0-9]*$")]],
      leaseAdditions1: [0, [Validators.pattern("^[0-9]*$")]],
      leaseAdditions2: [0, [Validators.pattern("^[0-9]*$")]],
      leaseTotalEquipmentMSRP: [0],
      leaseSalesTax: [0, [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      leaseResidualAmount: [0],
      leaseWarranty: [0, [Validators.required, Validators.pattern("^[0-9]*$")]],
      leaseOther: [0, Validators.pattern("^[0-9]*$")],
      leaseMonthlyRentalPayment: [0],
      leasePlacementFee: [0],
      leaseAmountDueAtSigining: [0],
      leaseTotalAmount: [0],
      leaseAssignedBankId: [null],
      leaseDate: [new Date().toLocaleDateString(), Validators.required],
      leaseMaturityDate: [null, Validators.required],
      leaseVendorId: [null],
      leaseContactId: [null], leaseUCCFillingDocumentLink: [null]
    });
  }
  initdisplayLease(leaseForm: LeaseForm) {
    return this.fb.group({
      leaseId: [leaseForm.leaseId],
      leaseUseType: [leaseForm.leaseUseType, Validators.required],
      leaseType: [leaseForm.leaseType, Validators.required],
      leaseOtherDescription: [leaseForm.leaseOtherDescription],
      leaseDescription: [leaseForm.leaseDescription],
      isLeaseUCCFilling: [leaseForm.isLeaseUCCFilling],
      leaseState: [leaseForm.leaseState],
      leaseUCCFillingDocument: [leaseForm.leaseUCCFillingDocument],
      leaseUCCFillingNumber: [leaseForm.leaseUCCFillingNumber],
      leaseSerialNumber: [leaseForm.leaseSerialNumber, Validators.required],
      leaseRate: [leaseForm.leaseRate, [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      leaseFeePercentage: [leaseForm.leaseFeePercentage, [Validators.required, Validators.pattern("^([0-9]|[1-9][0-9]|100)$")]],
      leaseResidualPercentage: [leaseForm.leaseResidualPercentage, Validators.required],
      leaseTerm: [leaseForm.leaseTerm, Validators.required],
      leaseEquipmentMSRP: [leaseForm.leaseEquipmentMSRP, [Validators.required, Validators.pattern("^[0-9]*$")]],
      leaseEquipmentCost: [leaseForm.leaseEquipmentCost, [Validators.required, Validators.pattern("^[0-9]*$")]],
      leaseAdditions1: [leaseForm.leaseAdditions1, [Validators.pattern("^[0-9]*$")]],
      leaseAdditions2: [leaseForm.leaseAdditions2, [Validators.pattern("^[0-9]*$")]],
      leaseTotalEquipmentMSRP: [leaseForm.leaseTotalEquipmentMSRP],
      leaseSalesTax: [leaseForm.leaseSalesTax, [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      leaseResidualAmount: [leaseForm.leaseResidualAmount],
      leaseWarranty: [leaseForm.leaseWarranty, [Validators.required, Validators.pattern("^[0-9]*$")]],
      leaseOther: [leaseForm.leaseOther, Validators.pattern("^[0-9]*$")],
      leaseMonthlyRentalPayment: [leaseForm.leaseMonthlyRentalPayment],
      leasePlacementFee: [leaseForm.leasePlacementFee],
      leaseAmountDueAtSigining: [leaseForm.leaseAmountDueAtSigining],
      leaseTotalAmount: [leaseForm.leaseTotalAmount],
      leaseAssignedBankId: [leaseForm.leaseAssignedBankId],
      leaseDate: [leaseForm.leaseFormattedDate, Validators.required],
      leaseMaturityDate: [leaseForm.leaseFormattedMaturityDate, Validators.required],
      leaseVendorId: [leaseForm.leaseVendorId],
      leaseContactId: [leaseForm.leaseContactId],
      leaseUCCFillingDocumentLink: [leaseForm.leaseUCCFillingDocumentLink],
    });

  }

  getLeaseDetails(id: any) {
    this.leaseService.getLeaseDetails(id, false).subscribe((res: any) => {
      if (res) {
        this.loadSave = false;
        this.leasedata = res;
        this.contactId = res.leaseContactId;
        this.vendorId = res.leaseVendorId;
        this.fillForm(this.contactId);
      }
    },
      (error: any) => {
        this.loadSave = false;
      })
  }


  setVendorID(id: any) {
    this.vendorId = id;
  }
  get guarantors(): FormArray {
    return <FormArray>this.leaseForm.get('guarantors');
  }

  get leases(): FormArray {
    return <FormArray>this.leaseForm.get('leases');
  }

  get mailAddressState() { return this.leaseForm.get('contactMailAddressState'); }
  get typeOfCompany() { return this.leaseForm.get('contactTypeOfCompany'); }
  get physicalAddressState() { return this.leaseForm.get('contactPhysicalAddressState'); }
  get position() { return this.leaseForm.get('contactPosition'); }

}


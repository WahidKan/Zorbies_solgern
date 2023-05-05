import { Component, OnInit, ViewChild } from '@angular/core';
import { LeaserequestformComponent } from '../../shared/leaserequest/leaserequestform.component';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MasterService } from '../../master/master.service';
import { ManageleaseService, LeaseRequestdata, LeaseForm } from '../managelease.service';
import { CommonService, ModuleList } from '../../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService, Guarantor } from '../../contact/contact.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { EqualValidator } from '../../shared/custom-validation/equal-validator';
import { id } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-addeditleaserequest',
  templateUrl: './addeditleaserequest.component.html',
  styleUrls: ['./addeditleaserequest.component.scss']
})
export class AddeditleaserequestComponent implements OnInit {
  @ViewChild(LeaserequestformComponent, { static: false }) child: LeaserequestformComponent;
  public leaserequestForm: FormGroup;
  contactCreatedOn: any;
  contactId: any;
  vendorId: any;
  leaseRequestId: any;
  pageTitle: string;
  isEditLease = false;
  leasedata: any;
  customerHideTag = false;
  loginUserType: any;
  loginUserId: any;
  isBankUser = false;
  isLoading = false;
  isCustomer = false;
  leaseRequestAdminId: any;
  lstStates: any;
  disabled = 'disabled';
  isDisabled = true;
  loading = false;
  lstBanks: any;
  modulePermission: ModuleList;
  lstcontactPosition: any;
  lstcompanyType: any;
  loadSave = false;
  isOperationUser = false;
  constructor(private fb: FormBuilder, private masterService: MasterService,
    private leaseService: ManageleaseService,
    private commonService: CommonService,
    private router: Router,
    private contactService: ContactService,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private dialogService: ConfirmationDialogService) {
    this.modulePermission = this.commonService.getPermission(4311);
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
  ngOnInit() {
    this.pageTitle = 'Add Proposal Request';
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {

      this.loginUserType = userdetail.userType;
      this.loginUserId = userdetail.id;

      if (userdetail.userType == 'usertype02') {
        this.isOperationUser = true;
      }
      if (userdetail.userType === 'usertype05') {
        this.isCustomer = true;
      }
      if (userdetail.userType == 'usertype04') {
        this.isBankUser = true;
        this.route.paramMap.subscribe(
          params => {
           this.leaseRequestId = params.get('LeaseRequestId');
            if (id) {   // SHOW BUTTON IN CASE OF EDIT ONLY FOR BANK USER ---kiran 07 nov..add/edit not given to bank user
            }
          });
      }
    
    });


    this.leaserequestForm = this.fb.group({
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
      bussinessPhone:[''],
      contactSocialSecurityNumber:[''],
      contactBussinessTIN: [''],
      contactTypeOfCompany: [null],
      contactFirstName: [''],
      contactLastName: [''],
      contactEmail: [''],
      contactPosition: [null],
      contactPhysicalAddressCounty: [''],
      leases: this.fb.array([
        this.initLeaseForm()
      ]),
      guarantors: this.fb.array([
        this.initGuarantor()
      ]),
      
    });
     
    
    
    
    this.mailAddressState.disable();
    this.typeOfCompany.disable();
    this.physicalAddressState.disable();
    this.position.disable();

    this.route.paramMap.subscribe(
      params => {
        const id = params.get('leaserequestId');
        if (id) {
          this.leaseRequestId = id;
          this.loadSave = true;
          if (id != null && id != undefined) {

            this.pageTitle = 'Edit Proposal Request';
          }
          else {
            this.pageTitle = 'Add Proposal Request';
          }
          this.getLeaseRequestDetails(id);
         
        }
        else {
          this.pageTitle = 'Add Proposal Request';
          this.isEditLease = false;
          this.contactService.getContactIdByUserId(this.loginUserId).subscribe((res: any) => {
            if (res !== null && res !== 'undefined') {
              this.fillForm(res);
            }
          });
        }
      }
    );
    this.route.queryParams
      .filter(params => params.contactid)
      .subscribe(params => {
        this.contactId = params.contactid;
        this.fillForm(this.contactId);
      });
  }

  initLeaseForm() {
    return this.fb.group({
      leaseRequest: ['', Validators.required],
      leaseRequestRateToBank: [0, [Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      leaseRequestTerm: [null, Validators.required],
      leaseRequestPayment: [0, [Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      leaseRequestResidual: [null],
      leaseRequestCollateral: [''],
      leaseRequestPurpose: ['', Validators.required],
      leaseRequestSOROne: ['', Validators.required],
      leaseRequestSORTwo: [''],
      leaseRequestSORThree: [''],
      leaseRequestAccountType: [''],
      leaseRequestBankName: [''],
      leaseRequestNameOnBank: [''],
      leaseRequestDescription:[''],
      leaseRequestBalance: [0, [Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      leaseRequestCompanyoverview: ['', Validators.nullValidator]      
    },
    {
      validator: EqualValidator.percentage('leaseRequestRateToBank')
    });

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

  getLeaseRequestDetails(id: any) {
    this.leaseService.getLeaseRequestDetails(id).subscribe((res: any) => {
      if (res) {
        this.loadSave = false;
        this.leasedata = res;
        this.leaseRequestAdminId = res.leaseCustomerId;
        this.leasedata = res;
        this.contactService.getContactIdByUserId(this.leaseRequestAdminId).subscribe((res: any) => {
          if (res !== null && res !== 'undefined') {
            this.fillForm(res);
          }
        });
      }
    },
      (error: any) => {
        this.loadSave = false;
      })
  }

  fillForm(id) {
    this.contactService.getContactDetails(id).subscribe((res: any) => {
      if (this.leaseRequestId != null && !this.isCustomer) {
        this.pageTitle = 'View Proposal Request: ' + res.contactDetails[0].contactBussinessName;
      }
      else if (this.leaseRequestId != null && this.leaseRequestId != undefined) {
        this.pageTitle = 'Edit Proposal Request';
      }
      else {
        this.pageTitle = 'Add Proposal Request';
      }
      if (this.leaseRequestId == undefined && !this.isCustomer) {
        this.pageTitle = 'Add Proposal Request: ' + res.contactDetails[0].contactBussinessName;
      }
      
      this.contactId = res.contactDetails[0].contactId;
      this.leaserequestForm.patchValue({
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
        bussinessPhone: res.contactDetails[0].bussinessPhone,
        contactBussinessTIN: res.contactDetails[0].contactBussinessTIN,
        contactTypeOfCompany: res.contactDetails[0].contactTypeOfCompany,
        contactFirstName: res.contactDetails[0].contactFirstName,
        contactSocialSecurityNumber: res.contactDetails[0].contactSocialSecurityNumber,
        contactLastName: res.contactDetails[0].contactLastName,
        contactEmail: res.contactDetails[0].contactEmail,
        contactPosition: res.contactDetails[0].contactPosition,
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

  initdisplayLease(leaseForm: LeaseRequestdata) {
    
    return this.fb.group({
      leaseRequest: [leaseForm.leaseRequest, Validators.required],
      leaseRequestRateToBank: [leaseForm.leaseRequestRateToBank, [Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      leaseRequestTerm: [leaseForm.leaseRequestTerm, Validators.required],
      leaseRequestPayment: [leaseForm.leaseRequestPayment, [Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      leaseRequestResidual: [leaseForm.leaseRequestResidual],
      leaseRequestCollateral: [leaseForm.leaseRequestCollateral],
      leaseRequestPurpose: [leaseForm.leaseRequestPurpose, Validators.required],
      leaseRequestSOROne: [leaseForm.leaseRequestSOROne, Validators.required],
      leaseRequestSORTwo: [leaseForm.leaseRequestSORTwo],
      leaseRequestSORThree: [leaseForm.leaseRequestSORThree],
      leaseRequestAccountType: [leaseForm.leaseRequestAccountType],
      leaseRequestBankName: [leaseForm.leaseRequestBankName],
      leaseRequestBalance: [leaseForm.leaseRequestBalance, [Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      leaseRequestNameOnBank: [leaseForm.leaseRequestNameOnBank],
      leaseRequestCompanyoverview: [leaseForm.leaseRequestCompanyoverview],
      leaseRequestDescription: [leaseForm.leaseRequestDescription]
    },
      {
        validator: EqualValidator.percentage('leaseRequestRateToBank')
      });

  }

  get leases(): FormArray {
    return <FormArray>this.leaserequestForm.get('leases');
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

  get guarantors(): FormArray {
    return <FormArray>this.leaserequestForm.get('guarantors');
  }

  saveLeaseRequestDetails() {
    if (this.leaserequestForm.valid) {
      this.loadSave = true;
      if (this.contactId !== null && typeof this.contactId !== 'undefined') {
        this.leaseService.addOrUpdateLeaseRequest(this.leaserequestForm.value.leases[0], this.contactId, this.leaseRequestId)
          .subscribe((res: any) => {
          if (res.statusCode === 200) {
            if (this.customerHideTag) {
            }
            this.toaster.success(res.responseMessage);
            this.router.navigateByUrl("lease-request");
            setTimeout(() => { this.loadSave = false; }, 3000);
          }
          else {
            this.loadSave = false;
            this.toaster.error(res.responseMessage);
          }
        },
          error => {
            this.loadSave = false;
          })
      }
      else {
        this.loadSave = false;
        this.toaster.error("Please select contact first.");
        this.loadSave = false;
      }
    }
    else {
      this.commonService.validateAllFormFields(this.leaserequestForm, false);
      setTimeout(() => { this.checkValidation(); }, 200);
      this.loadSave = false;
    }
  }

  checkValidation() {
    var elms1 = document.getElementById('collapseFour').querySelectorAll("input");
    var selectElems = document.getElementById('collapseFour').querySelectorAll("ng-select");
    for (var i = 0; i < elms1.length; i++) {
      if (elms1[i].className.indexOf("is-invalid") >= 0 || elms1[i].className.indexOf("ng-invalid") >= 0) {

        elms1[i].scrollIntoView({ behavior: 'smooth', block: "end", inline: "end" });
        break;
      }
    }
    for (var i = 0; i < selectElems.length; i++) {
      if (selectElems[i].className.indexOf("is-invalid") >= 0 || selectElems[i].className.indexOf("ng-invalid") >= 0) {
        selectElems[i].scrollIntoView({ behavior: 'smooth', block: "end", inline: "end" });
        break;
      }
    }
  }
  cancelForm() {
    this.router.navigateByUrl("lease-request");
  }

  get mailAddressState() { return this.leaserequestForm.get('contactMailAddressState'); }
  get typeOfCompany() { return this.leaserequestForm.get('contactTypeOfCompany'); }
  get physicalAddressState() { return this.leaserequestForm.get('contactPhysicalAddressState'); }
  get position() { return this.leaserequestForm.get('contactPosition'); }

}

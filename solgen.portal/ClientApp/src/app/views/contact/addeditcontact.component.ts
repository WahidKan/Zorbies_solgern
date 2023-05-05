import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CommonService, ModuleList } from '../shared/common.service';
import { ContactService, Guarantor, ContactForm } from './contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { EqualValidator } from '../shared/custom-validation/equal-validator';
import {  BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { tblMasterModel, MasterService } from '../master/master.service';

@Component({
  selector: 'app-addeditcontact',
  templateUrl: './addeditcontact.component.html',
  styleUrls: ['./addeditcontact.component.scss']
})
export class AddeditcontactComponent implements OnInit {
  public contactForm: FormGroup;
  lstcontactPosition: any;
  lstcompanyType: any;
  loadSave = false;
  lstStates: any;
  isLoading = false;
  contactCreatedOn: any;
  firstName: any;
  buissnessName: any;
  lastName: any;
  guarantorGroup = [];
  pageTitle: string;
  modulePermission: ModuleList;
  addOrUpdatePermission: boolean;
  addPermission: boolean;
  disabled = null;
  isLeaseCreated = false;
  duplicateContactTypeOfCompany: any;
  companyName: string = null;
  contactPos: string = null;
  modalRef: BsModalRef;
  master: tblMasterModel = new tblMasterModel();
  masterValue: string;
  addCompany: string;
  validcontact = false;
  BankId: string;
  BankName: string;
  BankAddress: string;
  BankRoutingNumber: string;
  BankAccountNum: string;
  BankCity: string;
  BankState: string;
  BankCounty: string;
  BankZipcode: string;
  constructor(private _fb: FormBuilder, private modalService: BsModalService
    , private masterService: MasterService
    , private commonService: CommonService
    , private contactService: ContactService
    , private route: ActivatedRoute
    , private dialogService: ConfirmationDialogService
    , private router: Router
    , private toaster: ToastrService) {
    this.loadDropDowns();
    this.loadStateDropdown();
    this.addOrUpdatePermission = false;
    this.addPermission = false;
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
    if (this.modulePermission != null)
      this.addPermission = this.modulePermission.roleModuleAddFlag;

  }

  ngOnInit() {
    this.pageTitle = 'Add Customer';

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadSave = true;
       
        this.fillContactForm(id);
        
      }
      else {
        this.pageTitle = 'Add Customer';
        this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
      }
     
      
    }
    );
    this.contactForm = this._fb.group({
      contactId: [null],
      contactBussinessName: ['', [Validators.required]],
      contactBussinessMailAddress: ['', Validators.required],
      contactMailAddressCity: ['', Validators.required],
      contactMailAddressState: [null, Validators.required],
      contactMailAddressZip: ['', [Validators.required, Validators.maxLength(5)]],
      contactMailAddressCounty: ['', Validators.required],
      contactBussinessPhysicalAddress: ['', Validators.required],
      contactPhysicalAddressCity: ['', Validators.required],
      contactPhysicalAddressState: [null, Validators.required],
      contactPhysicalAddressZip: ['', [Validators.required, Validators.maxLength(5)]],
      contactBussinessPhone: ['',Validators.required],
      bussinessPhone: ['', Validators.required],
      contactBussinessTIN: ['', Validators.required],
      contactTypeOfCompany: [null, Validators.required],

      contactFirstName: ['', Validators.required],
      contactLastName: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPosition: [null],
      contactSocialSecurityNumber: [''],
      contactPreferredDocumentSignedBy: 'DocuSign',
      contactPhysicalAddressCounty: ['', Validators.required],
      isLeaseCreated: [false],

      // Contact Business Information
      contactBankId:[null],
      //contactBankName: ['', Validators.required],
      //contactBankAddress: ['', Validators.required],
      //contactBankRoutingNumber: ['', Validators.required],
      //contactBankAccountNum: ['', Validators.required],
      contactBankName: [''],
      contactBankAddress: [''],
      contactBankRoutingNumber: [''],
      contactBankAccountNum: [''],
      contactBankCity: [''],
      contactBankState: [null],
      contactBankCounty: [''],
      contactBankZipcode: [''],

      // Gurantors
      guarantors: this._fb.array([
        this.initGuarantor(),
      ]),
      insurances: this._fb.array([
        this.initInsurance(),
      ])
    });
    //alert(this.isLeaseCreated);
    //if (this.isLeaseCreated == true) {
    // // alert("hi")
    //  this.contactTypeOfCompany.disable();
    //}
   // alert("hi2222")
  }

  fillContactForm(id: any) {

    this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
    this.contactService.getContactDetails(id).subscribe((res: ContactForm) => {
      this.pageTitle = 'Edit Customer: ' + res.contactDetails[0].contactBussinessName;
      this.isLeaseCreated = res.contactDetails[0].isLeaseCreated;
      this.duplicateContactTypeOfCompany = res.contactDetails[0].contactTypeOfCompany;

      if (this.isLeaseCreated == true) {
        // alert("hi")
        this.contactTypeOfCompany.disable();
      }

      if (res.contactBankInfo[0] != null) {
        this.BankId = res.contactBankInfo[0].contactBankId,
        this.BankName = res.contactBankInfo[0].contactBankName,
        this.BankAddress = res.contactBankInfo[0].contactBankAddress,
        this.BankRoutingNumber= res.contactBankInfo[0].contactBankRoutingNumber,
          this.BankAccountNum = res.contactBankInfo[0].contactBankAccountNum,

        this.BankCity = res.contactBankInfo[0].contactBankCity,
        this.BankState = res.contactBankInfo[0].contactBankState,
        this.BankCounty = res.contactBankInfo[0].contactBankCounty,
        this.BankZipcode = res.contactBankInfo[0].contactBankZipcode
      }
      

      this.loadSave = false;
      this.contactForm.patchValue({
        contactId: res.contactDetails[0].contactId,
        contactSocialSecurityNumber: res.contactDetails[0].contactSocialSecurityNumber,
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
        contactLastName: res.contactDetails[0].contactLastName,
        contactEmail: res.contactDetails[0].contactEmail,
        contactPosition: res.contactDetails[0].contactPosition,
        contactCreatedOn: res.contactDetails[0].contactCreatedOn,
        contactPreferredDocumentSignedBy: res.contactDetails[0].contactPreferredDocumentSignedBy,
        contactPhysicalAddressCounty: res.contactDetails[0].contactPhysicalAddressCounty,

        // Contact Bank Information
        
        contactBankId: this.BankId,
        contactBankName:  this.BankName,
        contactBankAddress: this.BankAddress,
        contactBankRoutingNumber: this.BankRoutingNumber,
        contactBankAccountNum: this.BankAccountNum,
        contactBankCity: this.BankCity,
        contactBankCounty: this.BankCity,
        contactBankState: this.BankState,
        contactBankZipcode: this.BankZipcode,
        // Insurance
        insurances: res.insuranceDetails,

      });
      
      this.contactCreatedOn = res.contactDetails[0].contactCreatedOn;
      this.buissnessName = res.contactDetails[0].contactBussinessName;
      this.firstName = res.contactDetails[0].contactBussinessName;
      this.lastName = res.contactDetails[0].contactLastName;
      //this.isLeaseCreated = res.contactDetails[0].isLeaseCreated,
      //this.duplicateContactTypeOfCompany = res.contactDetails[0].contactTypeOfCompany,

      res.guarantors.forEach(m => {
        this.guarantors.push(this.initdisplayGuarantor(m));
      });
      this.guarantors.removeAt(0);
    },
      (error: any) => {
        this.loadSave = false;
      });

  }

  initGuarantor() {
    // initialize our guarantor
    return this._fb.group({
      guarantorID: [null],
      guarantorFirstName: ['', Validators.required],
      guarantorLastName: ['', Validators.required],
      guarantorTitle: ['', Validators.required],
      guarantorOwnership: ['', Validators.required],


      guarantorBussinessAddress: ['', Validators.nullValidator],
      guarantorBussinessCity: ['', Validators.nullValidator],
      guarantorBussinessState: [null, Validators.nullValidator],
      guarantorBussinessZip: ['', Validators.nullValidator], //Validators.maxLength(5)
      guarantorBussinessCounty: ['', Validators.nullValidator],
      guarantorHomeAddress: ['', Validators.required],
      guarantorHomeCity: ['', Validators.required],
      guarantorHomeState: [null, Validators.required],
      guarantorHomeZip: ['', [Validators.required, Validators.maxLength(5)]],
      guarantorHomeCounty: ['', Validators.required],
      guarantorPhone: ['', Validators.required],
      guarantorEmail: ['', [Validators.required, Validators.email]],
      guarantorSocialNumber: [''],
      guarantorFormattedDateOfBirth: [null],
    }, {
        validator: EqualValidator.percentage('guarantorOwnership')
      });
  }

  initdisplayGuarantor(gurantor: Guarantor) {
    return this._fb.group({
      guarantorID: [gurantor.guarantorID],
      guarantorFirstName: [gurantor.guarantorFirstName, Validators.required],
      guarantorLastName: [gurantor.guarantorLastName, Validators.required],
      guarantorTitle: [gurantor.guarantorTitle, Validators.required],
      guarantorOwnership: [gurantor.guarantorOwnership, Validators.required],
      guarantorBussinessAddress: [gurantor.guarantorBussinessAddress, Validators.nullValidator],
      guarantorBussinessCity: [gurantor.guarantorBussinessCity, Validators.nullValidator],
      guarantorBussinessState: [gurantor.guarantorBussinessState, Validators.nullValidator],
      guarantorBussinessZip: [gurantor.guarantorBussinessZip, Validators.nullValidator],
      guarantorBussinessCounty: [gurantor.guarantorBussinessCounty, Validators.nullValidator],
      guarantorHomeAddress: [gurantor.guarantorHomeAddress, Validators.required],
      guarantorHomeCity: [gurantor.guarantorHomeCity, Validators.required],
      guarantorHomeState: [gurantor.guarantorHomeState, Validators.required],
      guarantorHomeZip: [gurantor.guarantorHomeZip, Validators.required],
      guarantorHomeCounty: [gurantor.guarantorHomeCounty, Validators.required],
      guarantorPhone: [gurantor.guarantorPhone, Validators.required],
      guarantorEmail: [gurantor.guarantorEmail, [Validators.required, Validators.email]],
      guarantorSocialNumber: [gurantor.guarantorSocialNumber],
      guarantorFormattedDateOfBirth: [gurantor.guarantorFormattedDateOfBirth],
    }, {
        validator: EqualValidator.percentage('guarantorOwnership')
      });
  }



  initInsurance() {
    return this._fb.group({
      insuranceId: [null],
      name: ['', Validators.nullValidator],
      address: ['', Validators.nullValidator],
      city: ['', Validators.nullValidator],
      state: [null, Validators.nullValidator],
      zipCode: ['', [Validators.nullValidator, Validators.maxLength(5)]],
      phone: ['', Validators.nullValidator],
      agentName: ['', Validators.nullValidator],
      agentEmail: ['', [Validators.nullValidator, Validators.email]],
      county: ['', Validators.nullValidator],
    });
  }

  addGuarantor() {
    // add guarantor to the list
    const control = <FormArray>this.contactForm.controls['guarantors'];
    control.push(this.initGuarantor());
  }

  removeGuarantor(i: number, id: any) {
    // remove guarantor from the list
    if (id != null) {
      const message = `Are you sure you want to delete guarantor.?`;
      this.dialogService.confirm('Delete Guarantor', message).subscribe(confirmed => {
        if (confirmed) {
          this.contactService.deleteGuarantor(id).subscribe((res: any) => {
            if (res) {
              const control = <FormArray>this.contactForm.controls['guarantors'];
              control.removeAt(i);
            }
          });
        }
      });
    }
    else {
      const control = <FormArray>this.contactForm.controls['guarantors'];
      control.removeAt(i);
    }
  }
  toggleEditable(event) {
    if (event.target.checked) {
      this.contactBussinessPhysicalAddress.setValue(this.contactBussinessMailAddress.value);
      this.contactPhysicalAddressCounty.setValue(this.contactMailAddressCounty.value);
      this.contactPhysicalAddressZip.setValue(this.contactMailAddressZip.value);
      this.contactPhysicalAddressCity.setValue(this.contactMailAddressCity.value);
      this.contactPhysicalAddressState.setValue(this.contactMailAddressState.value);
      this.contactPhysicalAddressCounty.updateValueAndValidity();
      this.contactBussinessPhysicalAddress.updateValueAndValidity();
      this.contactPhysicalAddressZip.updateValueAndValidity();
      this.contactPhysicalAddressCity.updateValueAndValidity();
      this.contactPhysicalAddressState.updateValueAndValidity();
    }
    else {
      this.contactPhysicalAddressCounty.setValue('');
      this.contactBussinessPhysicalAddress.setValue('');
      this.contactPhysicalAddressZip.setValue('');
      this.contactPhysicalAddressCity.setValue('');
      this.contactPhysicalAddressState.setValue(null);
      this.contactPhysicalAddressCounty.updateValueAndValidity();
      this.contactBussinessPhysicalAddress.updateValueAndValidity();
      this.contactPhysicalAddressZip.updateValueAndValidity();
      this.contactPhysicalAddressCity.updateValueAndValidity();
      this.contactPhysicalAddressState.updateValueAndValidity();
    }
  }

  loadDropDowns() {
    this.isLoading = true;
    this.commonService.getMasterItemsList("BussinessContactPosition,CompanyType").subscribe((result: any) => {
      this.lstcontactPosition = this.commonService.masters.filter(x => x.masterName == "BussinessContactPosition");
      this.lstcompanyType = this.commonService.masters.filter(x => x.masterName == "CompanyType");
      if (this.companyName !== null) {
        let company = this.lstcompanyType.find(m => m.text === this.companyName);
        if (company) {
          this.contactTypeOfCompany.setValue(company.value);
        }
      }
      if (this.contactPos !== null) {
        let contact = this.lstcontactPosition.find(m => m.text === this.contactPos);
        if (contact) {
          this.contactPosition.setValue(contact.value);
        }
      }
      this.isLoading = false;
    });
  }

  loadStateDropdown() {
    this.commonService.getStatesList().subscribe(res => {
      this.lstStates = this.commonService.states;
    });
  }
  checkValidation() {
    var elms1 = document.getElementById('collapseOne').querySelectorAll("input");
    for (var i = 0; i < elms1.length; i++) {
      if (elms1[i].className.indexOf("is-invalid") >= 0) {
        elms1[i].scrollIntoView({ behavior: 'smooth', block: "end", inline: "end" });
        if (document.getElementById("firstAccordianAnch").className === 'collapsed') {
          document.getElementById("firstAccordianAnch").click();
          setTimeout(function () {
            var element = document.getElementById("firstAccordianAnch");
            element.classList.remove("collapsed");
          }, 200);
          break;
        }
      }
    }
    var elms2 = document.getElementById('collapseTwo').querySelectorAll("input");
    for (var i = 0; i < elms2.length; i++) {
      if (elms2[i].className.indexOf("is-invalid") >= 0) {
        elms2[i].scrollIntoView({ behavior: 'smooth', block: "end", inline: "end" });
        if (document.getElementById("secondAccordianAnch").className === 'collapsed') {
          document.getElementById("secondAccordianAnch").click();
          break;
        }
      }
    }
    var elms3 = document.getElementById('collapseThree').querySelectorAll("input");
    for (var i = 0; i < elms3.length; i++) {
      if (elms3[i].className.indexOf("is-invalid") >= 0) {
        elms3[i].scrollIntoView({ behavior: 'smooth', block: "end", inline: "end" });
        if (document.getElementById("thirdAccordianAnch").className === 'collapsed') {
          document.getElementById("thirdAccordianAnch").click();
          break;
        }
      }
    }

    var elms1 = document.getElementById('collapseSix').querySelectorAll("input");
    for (var i = 0; i < elms1.length; i++) {
      if (elms1[i].className.indexOf("is-invalid") >= 0) {
        elms1[i].scrollIntoView({ behavior: 'smooth', block: "end", inline: "end" });
        if (document.getElementById("sixAccordianAnch").className === 'collapsed') {
          document.getElementById("sixAccordianAnch").click();
          setTimeout(function () {
            var element = document.getElementById("sixAccordianAnch");
            element.classList.remove("collapsed");
          }, 200);
          break;
        }
      }
    }

  }

  saveContactForm() {
    if (this.contactForm.valid) {
      if (this.contactForm.value.insurances[0].agentName != '' || this.contactForm.value.insurances[0].phone != ''
        || this.contactForm.value.insurances[0].address != '' || this.contactForm.value.insurances[0].city != ''
        || this.contactForm.value.insurances[0].county != '' || this.contactForm.value.insurances[0].state != null
        || this.contactForm.value.insurances[0].zipCode != '') {
        /// alert('error')
        if (this.contactForm.value.insurances[0].name == '') {
          this.toaster.error("Please Enter Insurance Company name");
          return false;
        }
        else if (this.contactForm.value.insurances[0].agentEmail == '') {
          this.toaster.error("Please Enter Insurance Agent Email");
          return false;
        }
      }
      if (this.contactForm.value.insurances[0].name == '' && this.contactForm.value.insurances[0].agentEmail != '') {
        this.toaster.error("Please Enter Insurance Company name");
        return false;
      }
      else if (this.contactForm.value.insurances[0].name != '' && this.contactForm.value.insurances[0].agentEmail == '') {
        this.toaster.error("Please Enter Insurance Agent Email");
        return false;
      }
      if (this.contactForm.value.contactTypeOfCompany == null) {
        //alert(this.duplicateContactTypeOfCompany);
        this.contactForm.value.contactTypeOfCompany = this.duplicateContactTypeOfCompany;
        //alert(this.contactForm.value.contactTypeOfCompany)
      }
      this.contactService.saveContactForm(this.contactForm.value).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toaster.success(res.responseMessage);
          this.router.navigateByUrl("/contact");
        }
        else {
          this.loadSave = false;
          this.toaster.error(res.responseMessage);
        }
      });
    }
    else {
      this.commonService.validateAllFormFields(this.contactForm, false);
      setTimeout(() => { this.checkValidation(); }, 500);
    }
  }

  saveContactInMaster() {
    if (this.masterValue != '') {
      this.loadSave = true;
      this.master.masterNameId = "0DDD9CDA-CDE7-4466-A113-5770E39D203D";
      this.master.masterKey = "~positionnum~";
      this.master.masterValue = this.masterValue;
      this.master.masterStatusId = "";
      this.contactPos = this.masterValue;
      this.master.masterIsDeleted = false;
      this.master.masterDescription = this.masterValue;
      this.masterService.AddManageMaster(this.master).subscribe((result: any) => {
        if (result.statusCode == 201) {
          this.toaster.error(`Duplicate Customer Position`);
          this.loadSave = false;
        }
        else if (result.statusCode == 200) {
          this.loadDropDowns();
          this.toaster.success(`Customer Position has been added successfully`);
          setTimeout(() => { this.loadSave = false; }, 1000);
          this.modalRef.hide();
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      }, error => {
        this.loadSave = false;
      });
    }
    else {
      this.validcontact = true;
    }
  }

  onKeyPress(event: any) {

    this.validcontact = false;
  }

  saveCompanyInMaster() {
    if (this.addCompany != '') {
      this.loadSave = true;
      this.master.masterNameId = "6883630C-493B-49B0-AC0F-295B2875AFFD";
      this.master.masterKey = "~companytypenum~";
      this.master.masterValue = this.addCompany;
      this.companyName = this.addCompany;
      this.master.masterStatusId = "";
      this.master.masterIsDeleted = false;
      this.master.masterDescription = this.addCompany;
      this.masterService.AddManageMaster(this.master).subscribe((result: any) => {
        if (result.statusCode == 201) {
          this.toaster.error(`Duplicate Type of Company`);
          this.loadSave = false;
        }
        else if (result.statusCode == 200) {
          this.loadDropDowns();
          this.toaster.success(`Type of company has been added successfully`);

          setTimeout(() => { this.loadSave = false; }, 1000);
          this.modalRef.hide();
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      }, error => {
        this.loadSave = false;
      });
    }
    else {
      this.validcontact = true;
    }
  }


  cancelForm() {
    this.router.navigateByUrl("/contact");
  }
  get guarantors(): FormArray {
    return <FormArray>this.contactForm.get('guarantors');
  }

  addContactPosition(template: TemplateRef<any>) {
    this.masterValue = "";
    this.validcontact = false;
    this.modalRef = this.modalService.show(template);
  }
  addTypeOfComp(template: TemplateRef<any>) {
    this.addCompany = "";
    this.validcontact = false;
    this.modalRef = this.modalService.show(template);
  }

  get contactBussinessName() { return this.contactForm.get('contactBussinessName'); }
  get contactBussinessTIN() { return this.contactForm.get('contactBussinessTIN'); }
  get contactTypeOfCompany() { return this.contactForm.get('contactTypeOfCompany'); }
  get contactPosition() { return this.contactForm.get('contactPosition'); }
  get contactBussinessMailAddress() { return this.contactForm.get('contactBussinessMailAddress'); }
  get contactMailAddressCity() { return this.contactForm.get('contactMailAddressCity'); }
  get contactMailAddressState() { return this.contactForm.get('contactMailAddressState'); }
  get contactMailAddressZip() { return this.contactForm.get('contactMailAddressZip'); }
  get contactMailAddressCounty() { return this.contactForm.get('contactMailAddressCounty'); }
  get contactBussinessPhysicalAddress() { return this.contactForm.get('contactBussinessPhysicalAddress'); }
  get contactPhysicalAddressCity() { return this.contactForm.get('contactPhysicalAddressCity'); }
  get contactPhysicalAddressState() { return this.contactForm.get('contactPhysicalAddressState'); }
  get contactPhysicalAddressZip() { return this.contactForm.get('contactPhysicalAddressZip'); }
  get contactPhysicalAddressCounty() { return this.contactForm.get('contactPhysicalAddressCounty'); }
  get contactBussinessPhone() { return this.contactForm.get('contactBussinessPhone'); }
  get bussinessPhone() { return this.contactForm.get('bussinessPhone'); }
  get contactFirstName() { return this.contactForm.get('contactFirstName'); }
  get contactLastName() { return this.contactForm.get('contactLastName'); }
  get contactEmail() { return this.contactForm.get('contactEmail'); }
  get contactSocialSecurityNumber() { return this.contactForm.get('contactSocialSecurityNumber'); }


  // Contact Bank Information

  get contactBankName() { return this.contactForm.get('contactBankName'); }
  get contactBankAddress() { return this.contactForm.get('contactBankAddress'); }
  get contactBankRoutingNumber() { return this.contactForm.get('contactBankRoutingNumber'); }
  get contactBankAccountNum() { return this.contactForm.get('contactBankAccountNum'); }

  get contactBankCity() { return this.contactForm.get('contactBankCity'); }
  get contactBankCounty() { return this.contactForm.get('contactBankCounty'); }
  get contactBankState() { return this.contactForm.get('contactBankState'); }
  get contactBankZipcode() { return this.contactForm.get('contactBankZipcode'); }
}

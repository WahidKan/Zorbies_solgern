import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ContactForm, ContactService } from '../contact/contact.service';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-generate-welcome-package',
  templateUrl: './generate-welcome-package.component.html',
  styleUrls: ['./generate-welcome-package.component.scss']
})
export class GenerateWelcomePackageComponent implements OnInit {
  public contactForm: FormGroup;
  @ViewChild('welcomePackageModal', { static: false }) public modal: ModalDirective;
  @ViewChild('closeButton', { static: false }) button: ElementRef;
  lstcontactPosition: any;
  loadSave = false;
  lstcompanyType: any;
  lstStates: any;
  isLoading = false;
  contactId: any;
  emailTemplate = '';
  isEmailTemplateReady = true;
  constructor(private _fb: FormBuilder,
    private contactService: ContactService,
    private commonService: CommonService,
    private toasterService: ToastrService) {
      this.loadDropDowns();
    this.loadStateDropdown(); }

  ngOnInit() {
   
    this.contactForm = this._fb.group({
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
      contactPhysicalAddressCounty: [''],
      contactBussinessTIN: [''],
      contactTypeOfCompany: [null],
      contactFirstName: [''],
      contactLastName: [''],
      contactEmail: [''],
      contactPosition: [null],
      contactPositionName:'',
      contactPreferredDocumentSignedBy: ['']
    });

    this.contactMailAddressState.disable();
    this.contactPhysicalAddressState.disable();
    this.contactTypeOfCompany.disable();
    this.contactPosition.disable();
  }

  fillContactForm(id: any) {
    this.contactId = id;
    this.contactService.getContactDetails(id).subscribe((res: ContactForm) => {
      
      this.isEmailTemplateReady = false;
      this.contactForm.patchValue({
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
        contactPhysicalAddressCounty: res.contactDetails[0].contactPhysicalAddressCounty,
        contactBussinessPhone: res.contactDetails[0].contactBussinessPhone,
        contactBussinessTIN: res.contactDetails[0].contactBussinessTIN,
        contactTypeOfCompany: res.contactDetails[0].contactTypeOfCompany,
        contactFirstName: res.contactDetails[0].contactFirstName,
        contactLastName: res.contactDetails[0].contactLastName,
        contactEmail: res.contactDetails[0].contactEmail,
        contactPosition: res.contactDetails[0].contactPosition,
        contactPositionName:'-',
        contactCreatedOn: res.contactDetails[0].contactCreatedOn,
      });
      let bussinessContactPosition = this.commonService.masters.filter(x => x.masterName == "BussinessContactPosition");
      let position = bussinessContactPosition.find(m => m.value === res.contactDetails[0].contactPosition)
      if (position !== null && typeof position !== 'undefined') {
        this.contactForm.patchValue({
          contactPositionName: position.text
        })
      }
    });
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

  generateWelcomePackage() {
    this.contactService.getWelcomePackageEmail(this.contactId).subscribe((res: any) => {
      this.emailTemplate = res;
    });
  }

  sendWelcomePackage() {
    this.loadSave = true;
    this.contactService.sendWelcomePackageEmail(this.contactId).subscribe((res: any) => {
      let btn = this.button.nativeElement;
      btn.click();
      if (res.statusCode == 200) {
        this.toasterService.success(res.responseMessage);
        setTimeout(() => { this.loadSave = false; }, 3000);
      }
      else {
        this.loadSave = false;
        this.toasterService.error(res.responseMessage);
      }
    }, error => {
      this.loadSave = false;
    });
  }
  get contactMailAddressState() { return this.contactForm.get('contactMailAddressState'); }
  get contactPhysicalAddressState() { return this.contactForm.get('contactPhysicalAddressState'); }
  get contactTypeOfCompany() { return this.contactForm.get('contactTypeOfCompany'); }
  get contactPosition() { return this.contactForm.get('contactPosition'); }

}

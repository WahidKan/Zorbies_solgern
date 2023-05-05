import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CommonService, ModuleList, UserDetails } from '../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ManageleaseService, LeaseForm, Insurance, InsuranceRequestPreview, LeaseTemplate } from './managelease.service';
import { ContactService, Guarantor } from '../contact/contact.service';
import { LeaseformComponent } from '../shared/leaseform/leaseform.component';
import { EqualValidator } from '../shared/custom-validation/equal-validator';
import { LeasecontactdocsComponent } from './leasecontactdocs/leasecontactdocs.component';
import { LeasereviewdocsComponent } from './leasereviewdocs/leasereviewdocs.component';
import { id } from '@swimlane/ngx-datatable';
import { MasterService } from '../master/master.service';
import { LeasedocsComponent } from './leasedocs/leasedocs.component';
import { BankapprovalComponent } from './bankApproval/bankapproval.component';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { GenerateleaseformComponent } from './generateleaseform/generateleaseform.component';
import { docpdfforwetsigComponent } from './docpdfforwetsig/docpdfforwetsig.component';
import { Location, CurrencyPipe } from '@angular/common';
import { LeasedocspdfviewComponent } from './leasedocspdfview/leasecontactdocs.component';
import { FundingpackagetobankComponent } from './fundingpackage/fundingpackagetobank.component';
import { TitleworkrequestComponent } from './titleworkrequest/titleworkrequest.component';
import { InsuranceService } from '../manageinsurance/insurance.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { UploadDocuSignComponent } from './upload-docu-sign/upload-docu-sign.component';
import { CreditscoredetailComponent } from './creditscoredetail/creditscoredetail.component';
import { PrepareUccFillingComponent } from './prepare-ucc-filling/prepare-ucc-filling.component';




@Component({
  selector: 'app-addeditlease',
  templateUrl: './addeditlease.component.html',
  styleUrls: ['./addeditlease.component.scss']
})
export class AddeditleaseComponent implements OnInit {
  @ViewChild(LeaseformComponent, { static: false }) child: LeaseformComponent;
  @ViewChild('leasecontactDocModal', { static: false }) childdoc: LeasecontactdocsComponent;
  @ViewChild('generateleaseModal', { static: false }) gendoc: GenerateleaseformComponent;
  @ViewChild('leaseDocModal', { static: false }) leasedoc: LeasedocsComponent;
  @ViewChild('leasereviewdocsModal', { static: false }) childReviewdoc: LeasereviewdocsComponent;
  @ViewChild('leasebankApprovalModal', { static: false }) bankApproval: BankapprovalComponent;
  @ViewChild('docpdfforwetsigModal', { static: false }) docpdfforwetsig: docpdfforwetsigComponent;
  @ViewChild('leasedocspdfviewModal', { static: false }) childleasedocspdfview: LeasedocspdfviewComponent;
  @ViewChild('leasefundingPackageTobankModal', { static: false }) modalFundingPackage: FundingpackagetobankComponent;
  @ViewChild('leaseTitleWorkRequestModal', { static: false }) modalTitlWorkRequest: TitleworkrequestComponent;
  @ViewChild('uploadSign', { static: false }) modalDocuSign: UploadDocuSignComponent;
  @ViewChild('leaseCreditScoreModal', { static: false }) modalCreditScore: CreditscoredetailComponent;
  @ViewChild('prepareUCC', { static: false }) modalucc: PrepareUccFillingComponent;
  UpdateTitleRequestStatus: any;
  leaseAssignedId: any;
  public leaseForm: FormGroup;
  leaseInsuranceForm: FormGroup;
  insurance: Insurance = new Insurance();
  insuranceRequestPreview: InsuranceRequestPreview = new InsuranceRequestPreview();
  leaseMaturityDates= new Date();
  loading = false;
  IsReload = false;
  lstcontactPosition: any;
  lstcompanyType: any;
  showfour = '';
  showthree = '';
  lstStates: any; listFilter = '';
  templateList: any;
  lstInsurance: any;
  sortDir = 'asc'; lstPageSize: any
  sortColumn = 'LeaseCreatedOn';
  pageNumber = 0;
  modulePermission: ModuleList;
  moduleBankPermission: ModuleList;
  addOrUpdatePermission: boolean;
  addOrUpdateBankPermission: boolean;
  UpdateBankUserPermission = false;
  titleWorkRequest: any;
  IsDeleteLease = false;
  showEquipmentDiv = false;
  IsSendToBankApproval = false;
  IsReviewSupportingDoc = false;
  IsReviewLeaseDoc = false;
  insuranceDocument: any;
  vendorDocument: any;
  IsReceiveInsuranceDocument = false;
  IsReceivedVendordocument = false;
  UploadDocuSignTitle: string = 'Upload Signed Proposal Document';
  leaseDocumentTitle: string = 'Generate Proposal Document';
  IsCheckCreditScore = false;
  leaseTerm: any;
  leaseState: any;
  leaseResidualPercentage: any;
  leaseInsurance: any;
  leaseAssignedBankId: any;
  leaseAssignedbank: any;
  IsGenerateLeaseDoc = false;
  SaleAssignedBankId: any;
  IsSendToDocuSign = false;
  IsLeaseDocumentPrefrered = false;
  IsDownloadToPDFWet = false;
  bankUserName: any;
  IsLanderAgree = false;
  isAgreeTerms: false;
  bankName: any;
  leaseResidualAmount: any;
  IsCreateInsuranceRequest = false;
  IsCreateTitleWorkRequest = false;
  IsPrepareUCCFillingRequest = false;
  IsCreateAmorSchedule = false;
  IsSendFundingPackToBank = false;
  IsTitleWorkRequest = false;
  IsApprovedForPurchase = false;
  IsApprovedForFund = false;
  leaseBankId: any;
  pageSizeValue: number;
  pagedData: any = {
    pager: {},
    data: []
  };
  isLoading = false;
  contactCreatedOn: any;
  contactFirstName: any;
  buissnessName: any;
  contactLastName: any;
  contactId: any;
  prefixNameOfDocument: any;
  vendorId: any;
  venderEmailId: any;
  calledFrom: any;
  disabled = 'disabled';
  isDisabled = false;
  pageTitle: string;
  nameOfBusiness: string;
  isEditLease = false;
  leasedata: any;
  isContactSocialSecurityNumber = true;
  lstBanks: any;
  loadSave = false;
  showHideTag = false;
  customerHideTag = true;
  isNotCustomer = true;
  leaseID = null;
  isOperationUser = false;
  isBankUser = false;
  isCustomer = false;
  ContactPreferredDocumentSignedBy: any;
  loginUserType: any;
  isContactPage: boolean = false;
  isLeaseInsuranceRequest = false;
  leaseInsuranceData: any;
  moduleContactPermission: ModuleList
  modalRef: BsModalRef;
  htmlStr: any;
  InsuredValue: string;
  LeasePreferredDocumentSignedBy: string;
  LossPayee: string;
  Information: string
  VINSerialNumber: string;
  MaturityDate: string;
  EquipmentCost: string;
  LeaseNum: string
  AgentEmail: string;
  Password: string;
  InsuranceName: string;
  InsuranceId: string;
  leaseLicenceFee: any
  fee: any
  config: any;
  LeaseTemplateContent: any;
  type: string;
  additions2: any;
  insuranceExpirationDate: any;
  leaseTempId: any;
  showCustomer = false; LicenseFeeForDisable: any; isSalesUser = false;
  constructor(private fb: FormBuilder, private masterService: MasterService, private insuranceService: InsuranceService,
    private modalService: BsModalService,
    private leaseService: ManageleaseService,
    private commonService: CommonService,
    private router: Router,
    private contactService: ContactService,
    private toaster: ToastrService,
    private route: ActivatedRoute, private _location: Location,
    private dialogService: ConfirmationDialogService) {
    this.loadDropDowns();
    this.loadStateDropdown();
    this.loadBankDropDown();
    this.loadInsuranceDropdown();
    this.loadTemplateDropdown();
    this.addOrUpdatePermission = false;
    this.addOrUpdateBankPermission = false;
    let moduleCode = this.route.snapshot.data.moduleCode;
   

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (userdetail.userType == 'usertype04') {
        moduleCode = "4510";
        this.isBankUser = true;
      }
      else if (userdetail.userType == 'usertype03') {
        this.isSalesUser = true;
      }      
    });
    this.modulePermission = this.commonService.getPermission(moduleCode);
    this.moduleBankPermission = this.commonService.getPermission(4510);
    this.IsDeleteLease = this.modulePermission.roleModuleDeleteFlag;
    this.moduleContactPermission = this.commonService.getPermission(1600);
    if (this.titleWorkRequest == 'undefined') {
      this.titleWorkRequest = null;
    }
    if (this.titleWorkRequest == undefined) {
      this.titleWorkRequest = null;
    }

    const configure: ModalOptions = {
      backdrop: 'static',
      keyboard: false,
      animated: true,
      ignoreBackdropClick: true
    }
    this.config = configure;
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
  loadTemplateDropdown() {
    this.commonService.getTemplateList().subscribe(res => {
      this.templateList = this.commonService.Templates;
      });
  }
  loadInsuranceDropdown() {
    this.commonService.getMasterItemsList("InsuranceRequired").subscribe(res => {
      this.lstInsurance = this.commonService.masters;
    });
  }

  loadBankDropDown() {
    this.commonService.getBankDropList().subscribe(res => {
      this.lstBanks = res;
    });
  }

  fillForm(id) {
    this.contactService.getContactDetails(id).subscribe((res: any) => {
      this.ContactPreferredDocumentSignedBy = res.contactDetails[0].contactPreferredDocumentSignedBy;
     
      this.pageTitle = 'Edit Proposal: ' + res.contactDetails[0].contactBussinessName;
      if (this.isEditLease === false) {
        this.pageTitle = 'Add Proposal: ' + res.contactDetails[0].contactBussinessName;
        this.IsDeleteLease = false;//do not show lease for add
      }
      this.contactId = id;
      this.nameOfBusiness = res.contactDetails[0].contactBussinessName;
      this.leaseForm.patchValue({
        contactId: res.contactDetails[0].contactId,
        contactBussinessName: res.contactDetails[0].contactBussinessName,
        contactSocialSecurityNumber: res.contactDetails[0].contactSocialSecurityNumber,
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
        contactPreferredDocumentSignedBy: res.contactDetails[0].contactPreferredDocumentSignedBy,

        contactPhysicalAddressCounty: res.contactDetails[0].contactPhysicalAddressCounty,
      });
      this.contactCreatedOn = res.contactDetails[0].contactCreatedOn;
      this.buissnessName = res.contactDetails[0].contactBussinessName,
     this.contactFirstName=res.contactDetails[0].contactFirstName,
      this.contactLastName=res.contactDetails[0].contactLastName,
      res.guarantors.forEach(m => {
        this.guarantors.push(this.initdisplayGuarantor(m));
      });
      this.guarantors.removeAt(0);
      if (typeof this.leasedata !== 'undefined') {
        this.leases.push(this.initdisplayLease(this.leasedata));
        this.leases.removeAt(0);
      } else {
        let leaseInitial = new LeaseForm();
        leaseInitial.leasePreferredDocumentSignedBy = res.contactDetails[0].contactPreferredDocumentSignedBy;
        this.leases.push(this.initdisplayLease(leaseInitial));
        this.leases.removeAt(0);
      }
    })
  }

  setValidation() {
    let control = this.leases.controls[0] as FormGroup;
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  ngOnInit() {
    // this code eshow breadcrum according to condition
    var index = this.leaseService.getPreviousUrl().indexOf("contactid");
    if (index !== -1) {
      this.isContactPage = true;
    }
    var sellease = this.leaseService.getPreviousUrl().indexOf("lease");
    if (sellease !== -1) {
      var ul = document.getElementById("side-main-menu");
      var items = ul.getElementsByTagName("a");
    
      for (var i = 0; i < items.length; ++i) {
       
        if (items[i].innerText == 'Manage Proposal') {
          
          items[i].setAttribute("class", "nav-link selected"); //" selected";   //nav-link selected
        }
      }
      // do something with items[i], which is a <li> element
    }
    this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
    this.addOrUpdateBankPermission = this.moduleBankPermission.roleModuleAddFlag;
    this.UpdateBankUserPermission = this.moduleBankPermission.roleModuleUpdateFlag;
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (userdetail.userType == 'usertype02') {
        this.isOperationUser = true;
      }
      if (userdetail.userType == 'usertype04') {
        this.isBankUser = true;
        this.route.paramMap.subscribe(
          params => {
            const id = params.get('leaseId');
            if (id) {   // SHOW BUTTON IN CASE OF EDIT ONLY FOR BANK USER ---kiran 07 nov..add/edit not given to bank user
              
            }
          });
      }
      if (userdetail.id !== null && userdetail.id !== 'undefined') {
        this.contactService.getContactIdByUserId(userdetail.id).subscribe((res: any) => {
          if (res !== null && res !== 'undefined') {
            this.fillForm(res);
          }
        });
      }
      this.loginUserType = userdetail.userType;
      if (userdetail.userType === 'usertype05') {
        this.customerHideTag = false;
        this.isNotCustomer = false;
        this.isCustomer = true;
        this.showCustomer = true;
      }
    });
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.pageTitle = 'Add Proposal';
    this.leaseForm = this.fb.group({
      contactId: [null],
      contactBussinessName: [''],
      contactSocialSecurityNumber: [''],
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
      contactBussinessTIN: [''],
      contactTypeOfCompany: [null],
      contactFirstName: [''],
      contactLastName: [''],
      contactEmail: [''],
      ContactLenderAgree:[''],
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
          this.leaseID = id;
          this.loadSave = true;
          this.pageTitle = 'Edit Proposal';
          this.isEditLease = true;
          this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
          this.addOrUpdateBankPermission = this.moduleBankPermission.roleModuleUpdateFlag;
          const basicuserinfo = JSON.parse(localStorage.getItem('userinfo'));
          if (basicuserinfo.userType == 'usertype04') {
            this.isBankUser = true;
          }
          this.getLeaseDetails(id, this.isBankUser);
        }
        else {
          this.pageTitle = 'Add Proposal';
          this.isEditLease = false;
          this.IsDeleteLease = false;//do not show lease for add
        }
      }
    );
    this.route.queryParams
      .filter(params => params.contactid)
      .subscribe(params => {
        this.isContactPage = true;
        this.contactId = params.contactid;
        this.fillForm(this.contactId);
      });
    this.mailAddressState.disable();
    this.typeOfCompany.disable();
    this.physicalAddressState.disable();
    this.position.disable();
    if (this.titleWorkRequest == undefined) {
      this.leaseService.GetTitlWorkRequest(this.leaseID).subscribe((res: any) => {
        if (res) {
          this.titleWorkRequest = res;
          this.modalTitlWorkRequest.show(this.titleWorkRequest, true, this.leaseAssignedBankId, this.venderEmailId);
          this.loadSave = false;
        }
      }, error => {
        this.loadSave = false;
      })
    }
    this.initLeaseInsuranceForm();
  }

  uploadDocuSigned() {
    this.IsSendToDocuSign = true;
    this.IsReload = true;
    this.UploadDocuSignTitle = 'Signed Proposal Document Received';
  }

  prepreUccFilling() {
    
    this.IsReload = true;
    this.getLeaseDetails(this.leaseID, this.isBankUser)
  }


  updateReviewLeaseDocStatus() {
    this.IsReviewLeaseDoc = true;
  }

  updateReviewSupportingDocStatus() {
    this.IsReviewSupportingDoc = true;
  }

  updateSendToBankApprovalStatus() {
    this.IsSendToBankApproval = true;
  }

  UpdateGenerateLeaseStatus() {
    this.IsGenerateLeaseDoc = true;
    this.IsLeaseDocumentPrefrered = true;
    this.leaseDocumentTitle = 'Download Proposal Document';
    this.getLeaseDetails(this.leaseID, this.isBankUser);
  }

  UpdateleasedocspdfStatus() {
    this.IsSendToDocuSign = true;
  }

  UpdateCreditScoreStatus() {
    this.IsReload = true;
    this.IsCheckCreditScore = true;
    this.IsReload = true;
  }

  UpdateFundingPackageStatus() {
    this.IsSendFundingPackToBank = true;
  }

  UpdateWeightSignatureStatus() {
    this.IsReload = true;
    this.IsDownloadToPDFWet = true;
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
      leaseUseType: ['Business Use', Validators.required],
      leaseType: ['', Validators.required],
      leasePreferredDocumentSignedBy: ['', Validators.required],
      leaseOtherDescription: [''],
      leaseDescription: [''],
      isLeaseUCCFilling: [false],
      leaseState: [null],
      insuranceExpirationDate:[null],// [new Date().toLocaleDateString()],
      leaseTemplateId: [null, Validators.required],
      leaseTemplateContent: [''],
      leaseInsurance: [null],
      leaseAssignedBankId: [null],
      leaseUCCFillingDocument: [null],
      leaseUCCFillingNumber: [''],
      leaseDate: [new Date().toLocaleDateString(), Validators.required],
      lenderDate: [new Date().getUTCDate()],
      lenderName: [''],
      lenderNotes: [''],
      lenderAgree: [true, Validators.required],
      leaseMaturityDate: [null],
      leaseLicenceFee: ['$0.00', [Validators.required, Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
      leaseSerialNumber: ['', Validators.required],
     // leaseRate: ['0.00', [Validators.required,Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      leaseRate: ['0.00', [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      leaseFeePercentage: ['0.00', Validators.required],
      leaseResidualPercentage: [null, Validators.required],
      leaseTerm: [null, Validators.required],
    //  leaseEquipmentMSRP: ['0.00', [Validators.required]],//Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")
    // leaseEquipmentMSRP: ['0.00', [Validators.required, Validators.pattern("[$0-9.,]")]],
       leaseEquipmentMSRP: ['$0.00', [Validators.required, Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],

      leaseEquipmentCost: ['$0.00', [Validators.required, Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
      leaseAdditions1: ['$0.00',[ Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
      leaseAdditions2: ['$0.00',[ Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
      leaseTotalEquipmentMSRP: [0],
      leaseSalesTax: ['$0.00',[Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
      leaseResidualAmount: ['$0.00'],
      leaseWarranty: ['$0.00',[Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
      leaseOther: ['0.00',[Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
      leaseMonthlyRentalPayment: [0],
      leasePlacementFee: [0],
      leaseAmountDueAtSigining: [0],
      leaseTotalAmount: [0],
      leaseNumber: [''],
      leaseVendorId: [null],
      leaseContactId: [null], leaseUCCFillingDocumentLink: [null]
    },
      {
        validator: EqualValidator.percentage('leaseFeePercentage')
      })
    //////return this.fb.group({
    //////  leaseId: [null],
    //////  leaseUseType: ['Business Use', Validators.required],
    //////  leaseType: ['', Validators.required],
    //////  leasePreferredDocumentSignedBy: ['', Validators.required],
    //////  leaseOtherDescription: [''],
    //////  leaseDescription: [''],
    //////  isLeaseUCCFilling: [false],
    //////  leaseState: [null],
    //////  insuranceExpirationDate: [new Date().toLocaleDateString()],
    //////  leaseTemplateId: [null, Validators.required],
    //////  leaseTemplateContent:[''],
    //////  leaseInsurance: [null],
    //////  leaseAssignedBankId: [null],
    //////  leaseUCCFillingDocument: [null],
    //////  leaseUCCFillingNumber: [''],
    //////  leaseDate: [new Date().toLocaleDateString(), Validators.required],
    //////  lenderDate: [new Date().getUTCDate()],
    //////  lenderName: [''],
    //////  lenderNotes: [''],
    //////  lenderAgree: [true, Validators.required],
    //////  leaseMaturityDate: [null],
    //////  leaseLicenceFee: ['0.00', [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
    //////  leaseSerialNumber: ['', Validators.required],
    //////  leaseRate: ['0.00', [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
    //////  leaseFeePercentage: ['0.00', Validators.required],
    //////  leaseResidualPercentage: [null, Validators.required],
    //////  leaseTerm: [null, Validators.required],
    //////  leaseEquipmentMSRP: ['0.00', [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
    //////  leaseEquipmentCost: ['0.00', [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
    //////  leaseAdditions1: ['0.00', [Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
    //////  leaseAdditions2: ['0.00', Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")],
    //////  leaseTotalEquipmentMSRP: [0],
    //////  leaseSalesTax: ['0.00', [Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
    //////  leaseResidualAmount: ['0.00'],
    //////  leaseWarranty: ['0.00', [Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
    //////  leaseOther: ['0.00', Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")],
    //////  leaseMonthlyRentalPayment: [0],
    //////  leasePlacementFee: [0],
    //////  leaseAmountDueAtSigining: [0],
    //////  leaseTotalAmount: [0],
    //////  leaseNumber: [''],
    //////  leaseVendorId: [null],
    //////  leaseContactId: [null], leaseUCCFillingDocumentLink: [null]
    //////},
    //////  {
    //////    validator: EqualValidator.percentage('leaseFeePercentage')
    //////  })
  }
  SetUSCurrencyFormat(amt) {
    let currencyPipe = new CurrencyPipe('en');
    let formattedNumber = currencyPipe.transform(amt, 'USD', 'symbol');
    return formattedNumber;
  }
  initdisplayLease(leaseForm: LeaseForm) {
    this.leaseBankId = leaseForm.leaseAssignedBankId;
    this.LeaseNum = leaseForm.leaseNumber;
   
    if (typeof leaseForm.leaseLicenceFee == 'undefined' || leaseForm.leaseLicenceFee == null) { leaseForm.leaseLicenceFee = 0;}

    var varleaseTotalAmount = this.SetUSCurrencyFormat(leaseForm.leaseTotalAmount);
    var varleaseTotalEquipmentMSRP = this.SetUSCurrencyFormat(leaseForm.leaseTotalEquipmentMSRP);
    var varleaseAmountDueAtSigining = this.SetUSCurrencyFormat(leaseForm.leaseAmountDueAtSigining);
    var varleasePlacementFee = this.SetUSCurrencyFormat(leaseForm.leasePlacementFee);
    var varleaseAdditions1 = this.SetUSCurrencyFormat(leaseForm.leaseAdditions1);
    var varleaseAdditions2 = this.SetUSCurrencyFormat(leaseForm.leaseAdditions2);
    var varleaseEquipmentCost = this.SetUSCurrencyFormat(leaseForm.leaseEquipmentCost);
    var varleaseEquipmentMSRP = this.SetUSCurrencyFormat(leaseForm.leaseEquipmentMSRP);
    var varleaseLicenceFee = this.SetUSCurrencyFormat(leaseForm.leaseLicenceFee);
    var varleaseFeePercentage = this.SetUSCurrencyFormat(leaseForm.leaseFeePercentage);
        
    var varleaseMonthlyRentalPayment = this.SetUSCurrencyFormat(leaseForm.leaseMonthlyRentalPayment);
    var varleaseOther = this.SetUSCurrencyFormat(leaseForm.leaseOther);//leaseRate
    var varleaseResidualAmount = this.SetUSCurrencyFormat(leaseForm.leaseResidualAmount);
    var varleaseSalesTax = this.SetUSCurrencyFormat(leaseForm.leaseSalesTax);
    var varleaseWarranty = this.SetUSCurrencyFormat(leaseForm.leaseWarranty);


   //// this.leaseForm.value.leases[0].leaseTotalAmount = this.SetUSCurrencyFormat(this.leaseForm.value.leases[0].leaseTotalAmount)
    //this.leaseForm.value.leases[0]. = this.SetUSCurrencyFormat(this.leaseForm.value.leases[0].leaseTotalEquipmentMSRP);
    //this.leaseForm.value.leases[0]. = this.leaseForm.value.leases[0].leaseAmountDueAtSigining
    //this.leaseForm.value.leases[0]. = this.leaseForm.value.leases[0].leasePlacementFee
    //this.leaseForm.value.leases[0]. = this.leaseForm.value.leases[0].leaseAdditions1.replace("$", "").replace(",", "");
    //this.leaseForm.value.leases[0]. = this.leaseForm.value.leases[0].leaseAdditions2.replace("$", "").replace(",", "");
    //this.leaseForm.value.leases[0]. = this.leaseForm.value.leases[0].leaseEquipmentCost.replace("$", "").replace(",", "");
    //this.leaseForm.value.leases[0]. = this.leaseForm.value.leases[0].leaseEquipmentMSRP.replace("$", "").replace(",", "");
    //this.leaseForm.value.leases[0]. = this.leaseForm.value.leases[0].leaseFeePercentage.replace("$", "").replace(",", "");
    //this.leaseForm.value.leases[0]. = this.leaseForm.value.leases[0].leaseLicenceFee.replace("$", "").replace(",", "");
    //this.leaseForm.value.leases[0]. = this.leaseForm.value.leases[0].leaseMonthlyRentalPayment.replace("$", "").replace(",", "");
    //this.leaseForm.value.leases[0]. = this.leaseForm.value.leases[0].leaseOther.replace("$", "").replace(",", "");
    //this.leaseForm.value.leases[0]. = this.leaseForm.value.leases[0].leaseRate.replace("$", "").replace(",", "");
    //this.leaseForm.value.leases[0]. = this.leaseForm.value.leases[0].leaseResidualAmount.replace("$", "").replace(",", "");
    //this.leaseForm.value.leases[0]. = .leaseForm.value.leases[0].leaseSalesTax.replace("$", "").replace(",", "");
    //this.leaseForm.value.leases[0]. = this.leaseForm.value.leases[0].leaseWarranty.replace("$", "").replace(",", "");


    return this.fb.group({
      leaseId: [leaseForm.leaseId],
      leaseUseType: [leaseForm.leaseUseType, Validators.required],
      leaseType: [leaseForm.leaseType, Validators.required],
      leasePreferredDocumentSignedBy: [leaseForm.leasePreferredDocumentSignedBy, Validators.required],
      leaseOtherDescription: [leaseForm.leaseOtherDescription],
      leaseDescription: [leaseForm.leaseDescription],
      isLeaseUCCFilling: [leaseForm.isLeaseUCCFilling],
      leaseState: [leaseForm.leaseState],
      insuranceExpirationDate: [leaseForm.leaseFormattedInsuranceExpirationDate],
      leaseTemplateId: [leaseForm.leaseTemplateId, Validators.required],
      leaseTemplateContent: [leaseForm.leaseTemplateContent],
      leaseInsurance: [leaseForm.leaseInsurance],
      leaseUCCFillingDocument: [leaseForm.leaseUCCFillingDocument],
      leaseDate: [leaseForm.leaseFormattedDate, Validators.required],
      lenderDate: [leaseForm.lenderDate],
      lenderName: [leaseForm.lenderName],
      lenderNotes: [leaseForm.lenderNotes],
      lenderAgree: [leaseForm.lenderAgree],
     // leaseLicenceFee: [leaseForm.leaseLicenceFee.toFixed(2), [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      leaseLicenceFee: [varleaseLicenceFee, [Validators.required,Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
      leaseMaturityDate: [leaseForm.leaseFormattedMaturityDate],
      leaseAssignedBankId: [leaseForm.leaseAssignedBankId],
      leaseUCCFillingNumber: [leaseForm.leaseUCCFillingNumber],
      leaseSerialNumber: [leaseForm.leaseSerialNumber, Validators.required],
     // leaseRate: [leaseForm.leaseRate.toFixed(2), [Validators.required]],
 leaseRate: [leaseForm.leaseRate.toFixed(2), [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      leaseFeePercentage: [leaseForm.leaseFeePercentage.toFixed(2), Validators.required],
      leaseResidualPercentage: [leaseForm.leaseResidualPercentage, Validators.required],
      leaseTerm: [leaseForm.leaseTerm, Validators.required],
      leaseEquipmentMSRP: [varleaseEquipmentMSRP, [Validators.required,Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
      leaseEquipmentCost: [varleaseEquipmentCost, [Validators.required,Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
      leaseAdditions1: [varleaseAdditions1,Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")],
      leaseAdditions2: [varleaseAdditions2,Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")],
      leaseTotalEquipmentMSRP: [varleaseTotalEquipmentMSRP],
      leaseSalesTax: [varleaseSalesTax,Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")],
      leaseResidualAmount: [varleaseResidualAmount,Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")],
      leaseWarranty: [varleaseWarranty,Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")],
      leaseOther: [varleaseOther,Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")],
      leaseMonthlyRentalPayment: [varleaseMonthlyRentalPayment],
      leasePlacementFee: [varleasePlacementFee],
      leaseAmountDueAtSigining: [varleaseAmountDueAtSigining],
      //leaseTotalAmount: [leaseForm.leaseTotalAmount],
      leaseTotalAmount: [varleaseTotalAmount],
      
      leaseVendorId: [leaseForm.leaseVendorId],
      leaseContactId: [leaseForm.leaseContactId],
      leaseNumber: [leaseForm.leaseNumber],
      leaseUCCFillingDocumentLink: [leaseForm.leaseUCCFillingDocumentLink],
    },
      {
        validator: EqualValidator.percentage('leaseFeePercentage')
      });

    //return this.fb.group({
    //  leaseId: [leaseForm.leaseId],
    //  leaseUseType: [leaseForm.leaseUseType, Validators.required],
    //  leaseType: [leaseForm.leaseType, Validators.required], 
    //  leasePreferredDocumentSignedBy: [leaseForm.leasePreferredDocumentSignedBy, Validators.required],
    //  leaseOtherDescription: [leaseForm.leaseOtherDescription],
    //  leaseDescription: [leaseForm.leaseDescription],
    //  isLeaseUCCFilling: [leaseForm.isLeaseUCCFilling],
    //  leaseState: [leaseForm.leaseState],
    //  insuranceExpirationDate: [leaseForm.leaseFormattedInsuranceExpirationDate],
    //  leaseTemplateId: [leaseForm.leaseTemplateId, Validators.required],
    //  leaseTemplateContent: [leaseForm.leaseTemplateContent],
    //  leaseInsurance: [leaseForm.leaseInsurance],
    //  leaseUCCFillingDocument: [leaseForm.leaseUCCFillingDocument],
    //  leaseDate: [leaseForm.leaseFormattedDate, Validators.required],
    //  lenderDate: [leaseForm.lenderDate],
    //  lenderName: [leaseForm.lenderName],
    //  lenderNotes: [leaseForm.lenderNotes],
    //  lenderAgree: [leaseForm.lenderAgree],
    //  leaseLicenceFee: [leaseForm.leaseLicenceFee.toFixed(2), [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
    //        leaseMaturityDate: [leaseForm.leaseFormattedMaturityDate],
    //  leaseAssignedBankId: [leaseForm.leaseAssignedBankId],
    //  leaseUCCFillingNumber: [leaseForm.leaseUCCFillingNumber],
    //  leaseSerialNumber: [leaseForm.leaseSerialNumber, Validators.required],
    //  leaseRate: [leaseForm.leaseRate.toFixed(2), [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
    //  leaseFeePercentage: [leaseForm.leaseFeePercentage.toFixed(2), Validators.required],
    //  leaseResidualPercentage: [leaseForm.leaseResidualPercentage, Validators.required],
    //  leaseTerm: [leaseForm.leaseTerm, Validators.required],
    //  leaseEquipmentMSRP: [leaseForm.leaseEquipmentMSRP.toFixed(2), [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
    //  leaseEquipmentCost: [leaseForm.leaseEquipmentCost.toFixed(2), [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
    //  leaseAdditions1: [leaseForm.leaseAdditions1.toFixed(2), Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")],
    //  leaseAdditions2: [leaseForm.leaseAdditions2.toFixed(2), Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")],
    //  leaseTotalEquipmentMSRP: [leaseForm.leaseTotalEquipmentMSRP],
    //  leaseSalesTax: [leaseForm.leaseSalesTax.toFixed(2), [Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
    //  leaseResidualAmount: [leaseForm.leaseResidualAmount.toFixed(2)],
    //  leaseWarranty: [leaseForm.leaseWarranty.toFixed(2), [Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
    //  leaseOther: [leaseForm.leaseOther.toFixed(2), Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")],
    //  leaseMonthlyRentalPayment: [leaseForm.leaseMonthlyRentalPayment],
    //  leasePlacementFee: [leaseForm.leasePlacementFee],
    //  leaseAmountDueAtSigining: [leaseForm.leaseAmountDueAtSigining],
    //  leaseTotalAmount: [leaseForm.leaseTotalAmount],
    //  leaseVendorId: [leaseForm.leaseVendorId],
    //  leaseContactId: [leaseForm.leaseContactId],
    //  leaseNumber: [leaseForm.leaseNumber],
    //  leaseUCCFillingDocumentLink: [leaseForm.leaseUCCFillingDocumentLink],
    //},
    //  {
    //    validator: EqualValidator.percentage('leaseFeePercentage')
    //  });
  }

  cancelForm() {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (userdetail.userType == 'usertype04') {
        this.router.navigateByUrl("/lease/inprogresslease");
      }
      else {
        this._location.back();
      }
    });
  }

  DeleteLease() {
    const message = `Are you sure you want to delete Proposal "${this.nameOfBusiness}"?`;
      this.dialogService.confirm('Delete Lease', message).subscribe(confirmed => {
        if (confirmed) {
          this.leaseService.deleteLease(this.leaseID).subscribe((response: any) => {
            if (response.statusCode == 200) {
              this.toaster.success(`Proposal "${this.nameOfBusiness}" has been deleted successfully`);
              this.router.navigateByUrl("/lease");
            }
            else {
              this.toaster.error(response.responseMessage);
            }
          }, error => {

          });
        }
      });
    }

  checkValidationpreview() {
    var elms1 = document.getElementById('divpreviewinsreq').querySelectorAll("input");
    var selectElems = document.getElementById('divpreviewinsreq').querySelectorAll("ng-select");
    for (var i = 0; i < elms1.length; i++) {
      if (elms1[i].className.indexOf("is-invalid") >= 0 || elms1[i].className.indexOf("ng-invalid") >= 0) {
        elms1[i].scrollIntoView({ behavior: 'smooth', block: "end", inline: "end" });
        this.showfour = "show";
        break;
      }
    }
    for (var i = 0; i < selectElems.length; i++) {
      if (selectElems[i].className.indexOf("is-invalid") >= 0 || selectElems[i].className.indexOf("ng-invalid") >= 0) {
        selectElems[i].scrollIntoView({ behavior: 'smooth', block: "end", inline: "end" });
        this.showfour = "show";
        break;
      }
    }
  }

  checkValidation() {
    var elms1 = document.getElementById('collapseFour').querySelectorAll("input");
    var selectElems = document.getElementById('collapseFour').querySelectorAll("ng-select");
    for (var i = 0; i < elms1.length; i++) {
      if (elms1[i].className.indexOf("is-invalid") >= 0 || elms1[i].className.indexOf("ng-invalid") >= 0) {
        elms1[i].scrollIntoView({ behavior: 'smooth', block: "end", inline: "end" });
        this.showfour = "show";

        var elementshow = document.getElementById("collapseFour");
        elementshow.classList.add("show");

        var element = document.getElementById("fourcollapse");
        element.classList.remove("collapsed");
        break;
      }
    }
   
    for (var i = 0; i < selectElems.length; i++) {
      
      if (selectElems[i].className.indexOf("is-invalid") >= 0 || selectElems[i].className.indexOf("ng-invalid") >= 0) {
       
        selectElems[i].scrollIntoView({ behavior: 'smooth', block: "end", inline: "end" });
        this.showfour = "show";

        var elementshow = document.getElementById("collapseFour");
        elementshow.classList.add("show");

        var element = document.getElementById("fourcollapse");
        element.classList.remove("collapsed");
        break;
      }
    }

    var elms11 = document.getElementById('collapseThree').querySelectorAll("input");
    var selectElems1 = document.getElementById('collapseThree').querySelectorAll("ng-select");
    
    for (var i = 0; i < elms11.length; i++) {
      
      if (elms11[i].className.indexOf("is-invalid") >= 0 || elms11[i].className.indexOf("ng-invalid") >= 0) {
        elms11[i].scrollIntoView({ behavior: 'smooth', block: "end", inline: "end" });
        this.showthree = "show";

        var elementshow = document.getElementById("collapseThree");
        elementshow.classList.add("show");

        var element = document.getElementById("threecollapse");
        element.classList.remove("collapsed");
        break;
      }
    }
    for (var i = 0; i < selectElems1.length; i++) {
     
      if (selectElems1[i].className.indexOf("is-invalid") >= 0 || selectElems1[i].className.indexOf("ng-invalid") >= 0) {
        selectElems1[i].scrollIntoView({ behavior: 'smooth', block: "end", inline: "end" });
        this.showthree = "show";

        var elementshow = document.getElementById("collapseThree");
        elementshow.classList.add("show");

        var element = document.getElementById("threecollapse");
        element.classList.remove("collapsed");
        break;
      }
    }
  }

  
  getLeaseDetails(id: any, isBankUser: boolean) {
    this.IsLeaseDocumentPrefrered = true;
    this.leaseService.getLeaseDetails(id, isBankUser).subscribe((res: any) => {
      this.type = res.leaseType;
      this.additions2 = res.leaseAdditions2;
      this.LeaseTemplateContent = res.leaseTemplateContent
   
      if (res) {

        this.loadSave = false;

        this.LicenseFeeForDisable = res.leaseLicenceFee;
        this.IsLeaseDocumentPrefrered = res.isGenerateLeaseDoc;
        this.leasedata = res;
        this.contactId = res.leaseContactId;
        this.prefixNameOfDocument = res.leaseNumber;
        this.LeaseNum = res.leaseNumber;
        this.prefixNameOfDocument = res.leaseNumber;
        this.vendorId = res.leaseVendorId;
        this.bankUserName = res.lenderName;
        this.bankName = res.bankName;
        this.LeasePreferredDocumentSignedBy = res.leasePreferredDocumentSignedBy;
        this.IsLanderAgree = res.lenderAgree;
        this.leaseTerm = res.leaseTerm;
        this.leaseState = res.leaseState;
        this.leaseResidualPercentage = res.leaseResidualPercentage;
        this.leaseInsurance = res.leaseInsurance;
        this.leaseAssignedBankId = res.leaseAssignedBankId;
        this.leaseAssignedbank = res.leaseAssignedBankId;
        this.SaleAssignedBankId = res.leaseAssignedBankId;
        this.IsSendToBankApproval = res.sendToBankApproval;
        this.IsReviewSupportingDoc = res.isReviewSupportingDoc;
        this.IsReviewLeaseDoc = res.isReviewLeaseDoc;
        this.insuranceDocument = res.insuranceDocument;
        this.bankName = res.bankName;
        this.leaseResidualAmount = res.leaseResidualAmount;
        if (this.insuranceDocument != null) {
          this.IsReceiveInsuranceDocument = true;
        }
        if (res.leaseType ==='Vehicle Lease') {
          this.showEquipmentDiv = true;
        }
        this.vendorDocument = res.vendorDocument;
        if (this.vendorDocument != null) {
          this.IsReceivedVendordocument = true;
        }
        this.IsGenerateLeaseDoc = res.isGenerateLeaseDoc;
        this.IsSendToDocuSign = res.isSendToDocuSign;
        this.IsCheckCreditScore = res.isCheckCreditScore;

        if (this.IsGenerateLeaseDoc) {
          this.leaseDocumentTitle = 'Download Proposal Document';
        }
        if (this.IsSendToDocuSign) {
          this.UploadDocuSignTitle = 'Signed Proposal Document Received';
        }

        this.IsDownloadToPDFWet = res.isDownloadToPDFWet;
        this.IsCreateInsuranceRequest = res.isCreateInsuranceRequest;
        this.IsCreateTitleWorkRequest = res.isCreateTitleWorkRequest;
        this.IsPrepareUCCFillingRequest = res.isPrepareUCCFillingRequest;
        this.IsCreateAmorSchedule = res.isCreateAmorSchedule;
        this.IsSendFundingPackToBank = res.isSendFundingPackToBank;
        this.IsTitleWorkRequest = res.isTitleWorkRequest;
        this.IsApprovedForPurchase = res.isApprovedForPurchase;
        this.IsApprovedForFund = res.isApprovedForFund;
        this.insuranceExpirationDate = res.insuranceExpirationDate;
        this.leaseTempId = res.leaseTemplateId;
        this.fillForm(this.contactId);
      }
    },
      (error: any) => {
        this.loadSave = false;
      })
  }

  saveLeaseDetails() {
    if (this.leaseForm.valid) {
      this.loadSave = true;
      if (this.contactId !== null && typeof this.contactId !== 'undefined') {
        this.commonService.getLoggedInName.subscribe((userdetail: any) => {
          if ( userdetail.userType == 'usertype04') {// 
            this.leaseForm.value.leases[0].leaseAssignedBankId = this.leaseAssignedBankId;
          }
          else {
            this.leaseForm.value.leases[0].leaseAssignedBankId = this.SaleAssignedBankId;
          }
         
          if (userdetail.userType == 'usertype01' || userdetail.userType == 'usertype06' || userdetail.userType == 'usertype02')
          { //superadmin/admin/operation
            if (typeof this.leaseForm.value.leases[0].leaseLicenceFee == 'undefined')
              this.leaseForm.value.leases[0].leaseLicenceFee = this.LicenseFeeForDisable;
          }
          else { this.leaseForm.value.leases[0].leaseLicenceFee = this.LicenseFeeForDisable}
         
          

        });
        if (typeof this.child.leaseAssignedId != 'undefined' || this.child.leaseAssignedBankIdForReset == "ResetDll") {
          this.leaseForm.value.leases[0].leaseAssignedBankId = this.child.leaseAssignedId;
        }
        else {
          this.leaseForm.value.leases[0].leaseAssignedBankId = this.leaseAssignedBankId;
        }


        if (this.leaseForm.value.leases[0].leaseTemplateId == 'undefined' || this.leaseForm.value.leases[0].leaseTemplateId == null ) {
          this.leaseForm.value.leases[0].leaseTemplateId = this.leaseTempId;
        }
        
        if (this.vendorId != null && this.vendorId != '' && typeof this.vendorId != 'undefined') {
          //replace $ and comma
          this.leaseForm.value.leases[0].leaseTotalAmount = this.leaseForm.value.leases[0].leaseTotalAmount.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leaseTotalEquipmentMSRP = this.leaseForm.value.leases[0].leaseTotalEquipmentMSRP.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leaseAmountDueAtSigining = this.leaseForm.value.leases[0].leaseAmountDueAtSigining.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leasePlacementFee = this.leaseForm.value.leases[0].leasePlacementFee.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leaseAdditions1 = this.leaseForm.value.leases[0].leaseAdditions1.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leaseAdditions2 = this.leaseForm.value.leases[0].leaseAdditions2.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leaseEquipmentCost = this.leaseForm.value.leases[0].leaseEquipmentCost.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leaseEquipmentMSRP = this.leaseForm.value.leases[0].leaseEquipmentMSRP.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leaseFeePercentage = this.leaseForm.value.leases[0].leaseFeePercentage.replace("$", "").replace(",", "");
          //this.leaseForm.value.leases[0].leaseLicenceFee = this.leaseForm.value.leases[0].leaseLicenceFee.replace("$", "").replace(",", "");

try{
    var licenfee=this.leaseForm.value.leases[0].leaseLicenceFee;
    if(licenfee.indexOf("$")>=0)
    {
    this.leaseForm.value.leases[0].leaseLicenceFee = this.leaseForm.value.leases[0].leaseLicenceFee.replace("$", "").replace(",", "");
    }
}catch(error){}


          this.leaseForm.value.leases[0].leaseMonthlyRentalPayment = this.leaseForm.value.leases[0].leaseMonthlyRentalPayment.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leaseOther = this.leaseForm.value.leases[0].leaseOther.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leaseRate = this.leaseForm.value.leases[0].leaseRate.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leaseResidualAmount = this.leaseForm.value.leases[0].leaseResidualAmount.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leaseSalesTax = this.leaseForm.value.leases[0].leaseSalesTax.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leaseWarranty = this.leaseForm.value.leases[0].leaseWarranty.replace("$", "").replace(",", "");
                   
          this.leaseService.addOrUpdateLease(this.leaseForm.value.leases[0], this.leaseAssignedbank , this.contactId, this.vendorId, false).subscribe((res: any) => {
            if (res.statusCode === 200) {
              if (this.customerHideTag) {
                this.child.save(res.result);
              }
              this.toaster.success(res.responseMessage);
              if (this.isSalesUser) {
                this.router.navigateByUrl("/dashboard"); }
              else {
                this.router.navigateByUrl("/lease");
              }
              setTimeout(() => { this.loadSave = false; }, 3000);
            }
            else {
              this.loadSave = false;
              this.toaster.error(res.responseMessage);
            }
          },
            error => {
              this.loadSave = false;
            });
        } else {
          setTimeout(() => { this.checkValidation(); }, 200);
          this.loadSave = false;
          this.toaster.error("Please Select Vendor From Vendor Information.");
        }
      }
      else {
        this.loadSave = false;
        this.toaster.error("Please select contact first.");
        this.loadSave = false;
      }
    }
    else {
      this.commonService.validateAllFormFields(this.leaseForm, false);
      setTimeout(() => { this.checkValidation(); }, 200);
      this.loadSave = false;
    }
  }

  displayContactdocs() {
    this.isLeaseInsuranceRequest = false;
    this.loading = true;
    let id = '';
    this.route.paramMap.subscribe(
      params => {
        id = params.get('leaseId');
      });
    this.leaseService.getContactDocbyLeaseID(id, "UploadedOn", "desc", this.pageNumber, this.pageSizeValue).subscribe(response => {
      this.loading = false;
      this.pagedData = this.leaseService.pagedData;
      this.childdoc.show(this.pagedData, id);
    }, error => {
      this.loading = false;
    })
    if (Response) {
    }
  }

  displayLeaseReviewdocs() {

    if (this.IsGenerateLeaseDoc == false) {
      const message = `Proposal Document is not generated yet.`;
      this.dialogService.confirm('Review Supproting Documents', message).subscribe(confirmed => {
      });
    }
    else {
      this.isLeaseInsuranceRequest = false;
      this.loading = true;
      let id = '';
      this.route.paramMap.subscribe(
        params => {
          id = params.get('leaseId');
        });
      this.leaseService.getleaseReviewDoc(id, "UploadedOn", "desc", this.pageNumber, this.pageSizeValue).subscribe(response => {
        this.loading = false;
        this.pagedData = this.leaseService.pagedData;
        this.childReviewdoc.show(this.pagedData, this.leaseID);
      }, error => {
        this.loading = false;
      })
    }
  }

  sendToDocusignToClient() {
    this.isLeaseInsuranceRequest = false;
    this.loading = true;
    let id = '';
    this.route.paramMap.subscribe(
      params => {
        id = params.get('leaseId');
      });
    if (id !== null && id !== 'undefined') {
      this.leaseService.getLeaseDetails(id, this.isBankUser).subscribe((res: any) => {
        if (res) {
          this.loadSave = false;
          this.childleasedocspdfview.show(res.leasePDFDocumentNameLink, id);
        }
      }, error => {
        this.loading = false;
      })
    }

  }

  docpdfwetsig() {
    if (this.IsGenerateLeaseDoc == false) {
      const message = `Please generate Proposal Document before uploading wet signature.`;
      this.dialogService.confirm('Upload Wet Signature Document', message).subscribe(confirmed => {
      });
    }
    else {
      this.isLeaseInsuranceRequest = false;
      this.loading = true;
      let id = '';
      this.route.paramMap.subscribe(
        params => {
          id = params.get('leaseId');
        });
      if (id !== null && id !== 'undefined') {
        this.leaseService.getLeaseDetailsForWetSignature(id).subscribe((res: any) => {
          if (res.statusCode !== 100) {
            this.loadSave = false;
            this.docpdfforwetsig.show(id, res.leasePDFDocumentNameLink, this.contactId, this.leaseAssignedBankId);
          }
          else {
            this.loadSave = false
            this.toaster.error(res.responseMessage);
          }
        }, error => {
          this.loading = false;
        })
      }
    }

  }

  sendFundingPackageForBank() {
    if (this.IsApprovedForPurchase == false) {
      const message = `You can't send Funding Package to bank as Proposal is not Approved for Purchase yet.`;
      this.dialogService.confirm('Send Funding Package To Bank', message).subscribe(confirmed => {
      });
    }
    else if (this.IsApprovedForFund == true) {
      const message = `Proposal has been Approved for Funding by ${this.bankName}`
      this.dialogService.confirm('Send to Bank Approval', message).subscribe(confirmed => {
      });
    }
    else {
      let id = '';
      this.route.paramMap.subscribe(
        params => {
          id = params.get('leaseId');
        });
      this.leaseService.getFundingPackageleaseReviewDoc(id,"UploadedOn","desc", this.pageNumber, this.pageSizeValue).subscribe(response => {
        this.loading = false;

        this.pagedData = this.leaseService.pagedData;
        this.modalFundingPackage.show(id, this.contactId, this.leaseAssignedBankId, this.IsApprovedForPurchase, this.pagedData);
      }, error => {
        this.loading = false;
      })
     
    }
  }

  uploadDocuSign() {
    this.isLeaseInsuranceRequest = false;
    if (this.IsGenerateLeaseDoc == false) {
      const message = `Please generate Proposal Document before uploading Signed Proposal Document.`;
      this.dialogService.confirm('Upload Signed Proposal Document', message).subscribe(confirmed => {
      });
    }
    else {
      this.modalDocuSign.show();
    }
  }

  uccFillingRequest() {
    this.isLeaseInsuranceRequest = false;
    this.modalucc.show();
  }

  createTitleWorkRequest() {
    this.isLeaseInsuranceRequest = false;
    if (this.leaseBankId == null) {
      const message = `Bank should be assigned before send Title work request. Please assign bank from "Proposal Information" tab below.`;
      this.dialogService.confirm('Proposal Title Work Request', message).subscribe(confirmed => {
      });
    }
    else {
      let id = '';
      this.route.paramMap.subscribe(
        params => {
          id = params.get('leaseId');
        });

      this.leaseService.GetTitlWorkRequest(id).subscribe((res: any) => {
        if (res) {
          this.titleWorkRequest = res;
          this.modalTitlWorkRequest.show(this.titleWorkRequest, false, this.leaseAssignedBankId, this.venderEmailId);
          this.loadSave = false;
        }
      }, error => {
        this.loadSave = false;
      })
    }
  }

  sendForBankApproval() {
    this.isLeaseInsuranceRequest = false;
    if (this.leaseBankId == null) {
      const message = `Bank should be assigned before Send to Bank for Approval. Please assign bank from "Proposal Information" tab below.`;
      this.dialogService.confirm('Send to Bank Approval', message).subscribe(confirmed => {
      });
    }
    else if (this.IsGenerateLeaseDoc == false) {
      const message = `Please generate Proposal Document before Send to Bank for Approval.`;
      this.dialogService.confirm('Send to Bank Approval', message).subscribe(confirmed => {
      });
    }
    else if (this.IsApprovedForPurchase == true) {
      const message = `Proposal has been Approved for Purchase by ${this.bankName}`
      this.dialogService.confirm('Send to Bank Approval', message).subscribe(confirmed => {
      });
    }
    else {
      let id = '';
      this.route.paramMap.subscribe(
        params => {
          id = params.get('leaseId');
        });
      this.bankApproval.show(id, this.contactId);
    }
  }
  checkCreditScore() {
    let id = '';
    this.route.paramMap.subscribe(
      params => {
        id = params.get('leaseId');
      });
    this.modalCreditScore.show(id, this.LeaseNum);
  }


  generatelease() {
    this.isLeaseInsuranceRequest = false;
    this.loading = true;
    let id = '';
    this.route.paramMap.subscribe(
      params => {
        id = params.get('leaseId');
      });
    if (id !== null && id !== 'undefined') {
      this.leaseService.getLeaseDetails(id, this.isBankUser).subscribe((res: any) => {
        if (res) {
          this.loadSave = false;
          this.gendoc.show(res.leasePDFDocumentNameLink,this.IsGenerateLeaseDoc);
        }
      }, error => {
        this.loading = false;
      })
    }
  }

  displayLeasedocs() {
    this.loading = true;
    let id = '';
    this.route.paramMap.subscribe(
      params => {
        id = params.get('leaseId');
      });
    this.leaseService.getLeaseDetails(id, this.isBankUser).subscribe((res: any) => {
      if (res) {
        this.loadSave = false;
        this.leasedata = res;
      }
    }, error => {
      this.loading = false;
    })
  }

  setBankAssignedIdID(status: string) {
    this.leaseAssignedId = status;
  }

  setVendorID(id: any) {
    this.vendorId = id;
  }

  setVendorEmailId(emailId: any) {
    this.venderEmailId = emailId;
  }

  get guarantors(): FormArray {
    return <FormArray>this.leaseForm.get('guarantors');
  }

  get leases(): FormArray {
    return <FormArray>this.leaseForm.get('leases');
  }

  ApproveLease1() {
    let id = '';
    this.route.paramMap.subscribe(
      params => {
        id = params.get('leaseId');
      });
    const message = `Are you sure you want to Approve this Proposal`;
    this.dialogService.confirm('Proposal Approve', message).subscribe(confirmed => {
      if (confirmed) {
        this.leaseService.changeLeaseStatus(id).subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success(result.responseMessage);
          }
          else {
            this.toaster.error(result.responseMessage);
          }
        })
      }
    });
  }

  setLenderAgree(event) {
    this.isAgreeTerms = event.target.checked;
  }

  ApproveLease() {
    if (this.isAgreeTerms) {
      const message = `Are you sure you want to Approve this Proposal`;
      this.dialogService.confirm('Proposal Approve', message).subscribe(confirmed => {
        if (confirmed) {
    this.leaseForm.value.leases[0].leaseTotalAmount = this.leaseForm.value.leases[0].leaseTotalAmount.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leaseTotalEquipmentMSRP = this.leaseForm.value.leases[0].leaseTotalEquipmentMSRP.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leaseAmountDueAtSigining = this.leaseForm.value.leases[0].leaseAmountDueAtSigining.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leasePlacementFee = this.leaseForm.value.leases[0].leasePlacementFee.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leaseAdditions1 = this.leaseForm.value.leases[0].leaseAdditions1.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leaseAdditions2 = this.leaseForm.value.leases[0].leaseAdditions2.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leaseEquipmentCost = this.leaseForm.value.leases[0].leaseEquipmentCost.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leaseEquipmentMSRP = this.leaseForm.value.leases[0].leaseEquipmentMSRP.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leaseFeePercentage = this.leaseForm.value.leases[0].leaseFeePercentage.replace("$", "").replace(",", "");
          //this.leaseForm.value.leases[0].leaseLicenceFee = this.leaseForm.value.leases[0].leaseLicenceFee.replace("$", "").replace(",", "");
this.leaseForm.value.leases[0].leaseLicenceFee = this.leaseForm.value.leases[0].leaseLicenceFee;

          this.leaseForm.value.leases[0].leaseMonthlyRentalPayment = this.leaseForm.value.leases[0].leaseMonthlyRentalPayment.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leaseOther = this.leaseForm.value.leases[0].leaseOther.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leaseRate = this.leaseForm.value.leases[0].leaseRate.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leaseResidualAmount = this.leaseForm.value.leases[0].leaseResidualAmount.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leaseSalesTax = this.leaseForm.value.leases[0].leaseSalesTax.replace("$", "").replace(",", "");
          this.leaseForm.value.leases[0].leaseWarranty = this.leaseForm.value.leases[0].leaseWarranty.replace("$", "").replace(",", "");

          this.leaseService.addOrUpdateLeaseBankApproval(this.leaseForm.value.leases[0], this.contactId, this.vendorId, true, this.leaseTerm, this.leaseState, this.leaseResidualPercentage, this.leaseInsurance, this.leaseAssignedBankId, this.nameOfBusiness, this.bankName).subscribe((res: any) => {
            if (res.statusCode === 200) {
              if (this.customerHideTag) {
                this.child.save(res.result);
              }
              this.toaster.success(res.responseMessage);
              this.router.navigateByUrl("/lease/inprogresslease");
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
      });
    }
    else {
      this.toaster.error("Please Select agree to puchase check box");
    }
  }
   
  LeaseInsurance() {
    if (this.leaseBankId == null) {
      const message = `Bank should be assigned before sending Insurance request. Please assign bank from "Proposal Information" tab below.`;
      this.dialogService.confirm('Proposal Insurance Request', message).subscribe(confirmed => {
      });
    }
    else {
      this.loadSave = true;
      this.isLeaseInsuranceRequest = true;
      this.getLeaseInsuranceDropList();
      this.getLeaseDetailForCreateInsuranceRequest(this.leaseID);
      setTimeout(() => { this.loadSave = false; }, 1000);
    }
  }

  getLeaseInsuranceDropList() {
    this.leaseService.getLeaseInsuranceDropList().subscribe((res: any) => {
      this.leaseInsuranceData = res;
    })
  }

  initLeaseInsuranceForm() {
    // initialize our guarantor
    this.leaseInsuranceForm = this.fb.group({
      insuranceId: [null],
      name: [null, Validators.required],
      address: [null],
      city: [null],
      stateName: [null],
      zipCode: [null],
      phone: [null],
      agentEmail: [null],
      agentName: [null],
      county: [null],
      leaseNumber: [null],
      bankName: [null],
      leaseUseType: [null],
      leaseType: [null],
      collateralInformation: [null],
      leaseVINSerialNumber: [null],
      leaseDate: [null],
      leaseMaturityDate: [null],
      contactBussinessName: [null],
      contactBussinessTIN: [null],
      bussinessPhone: [null],
      contactBussinessPhone: [null],
      contactFirstName: [null],
      contactLastName: [null],
      contactPosition: [null],
      contactBussinessMailAddress: [null],
      contactMailAddressCity: [null],
      contactMailAddressCounty: [null],
      contactMailAddressState: [null],
      contactMailAddressZip: [null],
      contactBussinessPhysicalAddress: [null],
      contactPhysicalAddressCity: [null],
      contactPhysicalAddressCounty: [null],
      contactPhysicalAddressState: [null],
      contactPhysicalAddressZip: [null],
      leaseEquipmentCost: [null],
      bankCity: [null],
      bankStateName: [null],
      bankCounty: [null],
      bankZipCode: [null],
      bankAddress: [null],
      SolgenAddress: [null],
    });
  }

  setLeaseInsuranceDetails(event: any) {
    let value = null;
    if (typeof event != 'undefined') {
      value = event.value;
      this.getLeaseInsuranceDetails(event.value);
    }
  }

  getLeaseInsuranceDetails(id: any) {
    this.insuranceService.getInsuranceDetail(id).subscribe((result: any) => {
      this.AgentEmail = result.agentEmail;
      this.InsuranceName = result.name;
      this.InsuranceId = result.insuranceId;
      this.Password = result.password;
        this.leaseInsuranceForm.patchValue({
          insuranceId: result.insuranceId,
          name: result.insuranceId.toString().toUpperCase(),
          address: result.address,
          city: result.city,
          stateName: result.stateName,
          zipCode : result.zipCode,
          phone: result.phone,
          agentEmail: result.agentEmail,
          agentName: result.agentName,
          county: result.county,
        });
    });
  }

  getLeaseDetailForCreateInsuranceRequest(id: any) {
    this.leaseService.getLeaseDetailForCreateInsuranceRequest(id).subscribe((result: any) => {
      this.htmlStr = result.solgenAddress;
      this.InsuredValue = result.contactBussinessName + ",<br /> " + result.contactBussinessMailAddress + ", " + result.contactMailAddressCity + " " + result.contactMailAddressState
        + ",<br /> " + result.contactMailAddressCounty + ", " + result.contactMailAddressZip;
      this.LossPayee = result.bankName + ",<br /> " + result.bankAddress + ", " + result.bankCity + " " + result.bankStateName
        + ",<br /> " + result.bankCounty + ", " + result.bankZipCode;
      this.Information = result.collateralInformation;
      this.VINSerialNumber = result.leaseVINSerialNumber;
      this.MaturityDate = result.leaseFormattedMaturityDate;
      this.EquipmentCost = result.leaseEquipmentCost;
      this.LeaseNum = result.leaseNumber;
      // fill insurance drop down
      if (this.IsCreateInsuranceRequest) {
        this.getLeaseInsuranceDetails(result.insuranceId);
      }
        this.leaseInsuranceForm.patchValue({
          leaseNumber: result.leaseNumber,
          bankName: result.bankName,
          leaseUseType: result.leaseUseType,
          leaseType: result.leaseType,
          collateralInformation: (result.collateralInformation=="") ? "N/A" : result.collateralInformation,
          leaseVINSerialNumber: result.leaseVINSerialNumber,
          leaseDate: result.leaseFormattedDate,
          leaseMaturityDate: result.leaseFormattedMaturityDate,
          contactBussinessName: result.contactBussinessName,
          contactBussinessTIN: result.contactBussinessTIN,
          bussinessPhone: result.bussinessPhone,
          contactBussinessPhone: result.contactBussinessPhone,
          contactFirstName: result.contactFirstName,
          contactLastName: result.contactLastName,
          contactPosition: (result.contactPosition == null) ? "N/A" : result.contactPosition,
          contactBussinessMailAddress: result.contactBussinessMailAddress,
          contactMailAddressCity: result.contactMailAddressCity,
          contactMailAddressCounty: result.contactMailAddressCounty,
          contactMailAddressState: result.contactMailAddressState,
          contactMailAddressZip: result.contactMailAddressZip,
          contactBussinessPhysicalAddress: result.contactBussinessPhysicalAddress,
          contactPhysicalAddressCity: result.contactPhysicalAddressCity,
          contactPhysicalAddressCounty: result.contactPhysicalAddressCounty,
          contactPhysicalAddressState: result.contactPhysicalAddressState,
          contactPhysicalAddressZip: result.contactPhysicalAddressZip,
          leaseEquipmentCost: result.leaseEquipmentCost,
          bankCity: result.bankCity,
          bankStateName: result.bankStateName,
          bankCounty: result.bankCounty,
          bankZipCode: result.bankZipCode,
          bankAddress: result.bankAddress,
          solgenAddress: result.solgenAddress
        });
    });
  }

  ngOnChanges() {
    if (this.insuranceId && typeof this.insuranceId !== 'undefined') {
      this.getLeaseInsuranceDetails(this.insuranceId);
    }
  }

  previewInsuranceRequest(template: TemplateRef<any>) {
    if (this.leaseInsuranceForm.valid) {
      this.modalRef = this.modalService.show(template, this.config);
    }
    else {
      setTimeout(() => { this.checkValidationpreview(); }, 200);
      this.commonService.validateAllFormFields(this.leaseInsuranceForm);
    }
  }

  saveInsuranceRequestPreview() {
    this.loadSave = true;
    var form = new FormData()
    form.append('LeaseId', this.leaseID)
    form.append('AgentEmail', this.AgentEmail)
    form.append('InsuranceName', this.InsuranceName)
    form.append('Insured', this.InsuredValue);
    form.append('LossPayee', this.LossPayee);
    form.append('SolgenADDRESS',this.htmlStr);
    form.append('Description', this.Information);
    form.append('VIN', this.VINSerialNumber);
    form.append('MaturityDate',this.MaturityDate );
    form.append('Cost', this.EquipmentCost);
    form.append('InsuranceId', this.InsuranceId)
    form.append('LeaseNumber', this.LeaseNum)
    form.append('Password', this.Password)
    this.leaseService.saveInsuranceRequestPreview(form).subscribe((result: any) => {
      if (result.statusCode == 200) {
        this.IsCreateInsuranceRequest = true;
        this.toaster.success(`Proposal has been sent to ` + this.AgentEmail +` for Insurance Request`);
        setTimeout(() => { this.loadSave = false; }, 1000);
        this.modalRef.hide();
      }
      else {
        this.loadSave = false;
        this.toaster.error(result.responseMessage);
      }
    },
      error => {
        this.loadSave = false;
      });
  }


  get mailAddressState() { return this.leaseForm.get('contactMailAddressState'); }
  get typeOfCompany() { return this.leaseForm.get('contactTypeOfCompany'); }
  get physicalAddressState() { return this.leaseForm.get('contactPhysicalAddressState'); }
  get position() { return this.leaseForm.get('contactPosition'); }

  //Insurance Detail
  get insuranceId() { return this.leaseInsuranceForm.get('insuranceId'); }
  get name() { return this.leaseInsuranceForm.get('name'); }
  get address() { return this.leaseInsuranceForm.get('address'); }
  get city() { return this.leaseInsuranceForm.get('city'); }
  get stateName() { return this.leaseInsuranceForm.get('stateName'); }
  get zipCode() { return this.leaseInsuranceForm.get('zipCode'); }
  get phone() { return this.leaseInsuranceForm.get('phone'); }
  get agentEmail() { return this.leaseInsuranceForm.get('agentEmail'); }
  get agentName() { return this.leaseInsuranceForm.get('agentName'); }
  get county() { return this.leaseInsuranceForm.get('county'); }
}

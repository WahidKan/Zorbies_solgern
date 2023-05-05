import { Component, OnInit } from '@angular/core';
import { VendorModel, VendorService } from './vendor.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService, ModuleList } from '../shared/common.service';

@Component({
  selector: 'app-addeditvendor',
  templateUrl: './addeditvendor.component.html',
  styleUrls: ['./addeditvendor.component.scss']
})
export class AddeditvendorComponent implements OnInit {
  VendorModel: VendorModel = new VendorModel();
  lstStatus: any;
  loadSave = false;
  pageTitle: string;
  states: any;
  modulePermission: ModuleList;
  addOrUpdatePermission: boolean;
  status: string;
  associateUser: string;
  wiringInstruction = false;
  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private vendorService: VendorService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute) {
    this.commonService.getMasterItemsList("status").subscribe((result: any) => {
      this.lstStatus = this.commonService.masters;
    })
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (userdetail.userType == 'usertype01' || userdetail.userType == 'usertype06') {  // For Sales user disable leaseAssignedBankId
        this.wiringInstruction = true;
      }
    });
  }

  ngOnInit() {
    this.addOrUpdatePermission = false;
    this.addVendorForm.value.userid = 0;

    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          this.loadSave = true;
          this.fillForm(id);
        }
        else {
          this.pageTitle = 'Add Vendor';
          this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
        }
        this.getState();
      }
    );
    
  }

  getState() {
    this.vendorService.getStateList().subscribe((result: any) => {
      var data = result;
      this.states = data

    })
  }

  addVendorForm = this.fb.group({
    BusinessName: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.nullValidator],
    address: ['', [Validators.required, Validators.maxLength(500)]],
    city: ['', [Validators.required, Validators.maxLength(100)]],
    state: [null, Validators.required],
    zipCode: ['', [Validators.required, Validators.maxLength(5)]],
    county: ['', [Validators.required, Validators.maxLength(100)]],
    statusId: [null, Validators.required],
    wiringBankName: [null],
    wiringRoutingNumber: [null],
    wiringAccountNumber: [null],
    wiringBankAddress: [null],
    wiringBankZipcode: ['', [Validators.nullValidator, Validators.maxLength(5)]],
    wiringBankCounty: [null],
    wiringBankState: [null],
    wiringBankCity: [null],
    id:[null]
  });
  get BusinessName() { return this.addVendorForm.get('BusinessName'); }
  get firstName() { return this.addVendorForm.get('firstName'); }
  get lastName() { return this.addVendorForm.get('lastName'); }
  get email() { return this.addVendorForm.get('email'); }
  get phone() { return this.addVendorForm.get('phone'); }
  get address() { return this.addVendorForm.get('address'); }
  get state() { return this.addVendorForm.get('state'); }
  get zipCode() { return this.addVendorForm.get('zipCode'); }
  get city() { return this.addVendorForm.get('city'); }
  get county() { return this.addVendorForm.get('county'); }
  get statusId() { return this.addVendorForm.get('statusId'); }
  get wiringBankName() { return this.addVendorForm.get('wiringBankName'); }
  get wiringRoutingNumber(){ return this.addVendorForm.get('wiringRoutingNumber'); }
  get wiringAccountNumber(){ return this.addVendorForm.get('wiringAccountNumber'); }
  get wiringBankAddress() { return this.addVendorForm.get('wiringBankAddress'); }

  get wiringBankZipcode() { return this.addVendorForm.get('wiringBankZipcode'); }
  get wiringBankCounty() { return this.addVendorForm.get('wiringBankCounty'); }
  get wiringBankState() { return this.addVendorForm.get('wiringBankState'); }
  get wiringBankCity() { return this.addVendorForm.get('wiringBankCity'); }
  get id() { return this.addVendorForm.get('id'); }

  addEditVendor() {
    if (this.addVendorForm.valid) {
      this.loadSave = true;
      if (this.addVendorForm.value.id == undefined) {
        this.VendorModel.id = null
        this.VendorModel.statusId = this.addVendorForm.value.statusId;
      }
      else {
        this.VendorModel.id = this.addVendorForm.value.id;
        if (this.associateUser == null) {
          this.VendorModel.statusId = this.addVendorForm.value.statusId;
        } else {
          this.VendorModel.statusId = this.status;
        }
      }
      this.VendorModel.BusinessName = this.addVendorForm.value.BusinessName;
      this.VendorModel.firstName = this.addVendorForm.value.firstName;
      this.VendorModel.lastName = this.addVendorForm.value.lastName;
      this.VendorModel.email = this.addVendorForm.value.email;
      this.VendorModel.phone = this.addVendorForm.value.phone;
      this.VendorModel.address = this.addVendorForm.value.address;
      this.VendorModel.state = this.addVendorForm.value.state;
      this.VendorModel.zipCode = this.addVendorForm.value.zipCode;
      this.VendorModel.city = this.addVendorForm.value.city;
      this.VendorModel.county = this.addVendorForm.value.county;
      this.VendorModel.wiringBankName = this.addVendorForm.value.wiringBankName;
      this.VendorModel.wiringRoutingNumber = this.addVendorForm.value.wiringRoutingNumber;
      this.VendorModel.wiringAccountNumber = this.addVendorForm.value.wiringAccountNumber;
      this.VendorModel.wiringBankAddress = this.addVendorForm.value.wiringBankAddress;

      this.VendorModel.wiringBankZipcode = this.addVendorForm.value.wiringBankZipcode;
      this.VendorModel.wiringBankCity = this.addVendorForm.value.wiringBankCity;
      this.VendorModel.wiringBankState = this.addVendorForm.value.wiringBankState;
      this.VendorModel.wiringBankCounty = this.addVendorForm.value.wiringBankCounty;
      // // console.log("CompTest", this.VendorModel);
      this.vendorService.addEditVendor(this.VendorModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.router.navigateByUrl("/vendor");
          setTimeout(() => { this.loadSave = false; }, 3000);
        }
        else {
          this.toaster.error(result.responseMessage);
          this.loadSave = false;
        }
      }, error => {
        this.loadSave = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.addVendorForm);
    }
  }
  
  fillForm(id) {
   this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
    this.vendorService.getVendorDetail(id).subscribe((result: any) => {
      if (result) {
        this.loadSave = false;
        this.pageTitle = 'Edit Vendor: ' + result.firstName + ' ' + result.lastName;
        this.addVendorForm.patchValue({
          id: result.id,
          BusinessName: result.businessName,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          phone: result.phone,
          address: result.address,
          state: result.state,
          zipCode: result.zipCode,
          city: result.city,
          county: result.county,
          wiringBankName: result.wiringBankName,
          wiringRoutingNumber: result.wiringRoutingNumber,
          wiringAccountNumber: result.wiringAccountNumber,
          wiringBankAddress: result.wiringBankAddress,
          statusId: result.statusID.toLowerCase(),
          wiringBankZipcode: result.wiringBankZipcode,
          wiringBankCounty: result.wiringBankCounty,
          wiringBankState: result.wiringBankState,
          wiringBankCity: result.wiringBankCity,
          
        });
        
        if (result.associateUser != null) {
          this.addVendorForm.controls.statusId.disable();
          this.status = result.statusID;
          this.associateUser = result.associateUser;
        }
      }
    },
      (error: any) => {
      this.loadSave = false;
    })

  }

  Cancel() {
    this.router.navigateByUrl("/vendor");
  }


}

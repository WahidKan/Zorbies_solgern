import { Component, OnInit, Output, EventEmitter, Input, OnChanges, ViewChild } from '@angular/core';
import { VendorService } from '../../vendor/vendor.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';

@Component({
  selector: 'vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.scss']
})
export class VendorDetailsComponent implements OnInit, OnChanges {
  lstVendors: any;
  @Input("form") form: any;
  @Input('isDisabled') isDisabled: any;
  @Output() onIdPicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() onIdPickedVendorEmailId: EventEmitter<any> = new EventEmitter<any>();
  @Input('vendorId') vendorId: any;
  vendorForm: FormGroup;
  vendorEmailId: any;
  constructor(private vendorService: VendorService, private fb: FormBuilder, private commonService: CommonService) {
    this.getVendorDropList();
  }

  ngOnInit() {
    this.initForm();
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (userdetail.userType == 'usertype04') {
        this.isDisabled = true;
        this.selectedVendor.disable();
      }
    });
  }

  ngOnChanges() {
    if (this.vendorId && typeof this.vendorId !== 'undefined') {
      this.getVendorDetails(this.vendorId);
    }
  }
  

  getVendorDropList() {
    this.vendorService.getVendorDropList().subscribe((res: any) => {
      this.lstVendors = res;
    })
  }

  setVendorDetails(event: any) {
    let value = null;
    if (typeof event != 'undefined') {
      value = event.value;
      this.getVendorDetails(event.value);
    }
    this.onIdPicked.emit(value);
   
  }

  getVendorDetails(id:any) {
    this.vendorService.getVendorDetail(id).subscribe((res: any) => {
      this.vendorEmailId = res.email
      if (res) {
        let item = this.lstVendors.find(x => x.value == res.id).value;
        this.vendorForm.patchValue({
          selectedVendor: item,
          vendorPhone: res.phone,
          vendorEmail: res.email,
          vendorAddress: res.address,
          businessName: res.businessName,
          city: res.city,
          stateName: res.stateName,
          zipCode: res.zipCode,
        });
      }
    this.onIdPickedVendorEmailId.emit(this.vendorEmailId);
    });
    
  }

  private initForm() {
    this.vendorForm = this.fb.group({
      'selectedVendor': [null, Validators.required],
      'vendorPhone': [''],
      'vendorEmail': [''],
      'vendorAddress': [''],
      'businessName': [''],
      'city': [''],
      'stateName': [''],
      'zipCode':[''],
    });
  }

  get vendorPhone() { return this.vendorForm.get('vendorPhone'); }
  get selectedVendor() { return this.vendorForm.get('selectedVendor'); }
  get vendorEmail() { return this.vendorForm.get('vendorEmail'); }
  get vendorAddress() { return this.vendorForm.get('vendorAddress'); }
  get businessName() { return this.vendorForm.get('businessName'); }
  get city() { return this.vendorForm.get('city'); }
  get stateName() { return this.vendorForm.get('stateName'); }
  get zipCode() { return this.vendorForm.get('zipCode'); }
}

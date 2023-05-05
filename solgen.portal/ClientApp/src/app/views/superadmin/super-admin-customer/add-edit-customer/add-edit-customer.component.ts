import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectionType } from '@swimlane/ngx-datatable';
import { CommonService } from '../../../shared/common.service';


@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.scss']
})
export class AddEditCustomerComponent implements OnInit {
  pageTitle = "Add Customer";
  paymentTermlist = [{
    text: 'Weekly',
    value: 'Weekly'
  }, {
    text: 'Monthly',
    value: 'Monthly'
  }, {
    text: 'Yearly',
    value: 'Yearly'
  }]
  currencylist = [{
    text: 'USD',
    value: 'USD'
  }, {
    text: 'PKR',
    value: 'PKR'
  }, {
    text: 'EURO',
    value: 'EURO'
  }]
  form = this.formBuilder.group({
    id: [0],
    customerType: ['Business', [Validators.required]],
    firstName: ['Test', [Validators.required]],
    lastName: ['User'],
    companyName: ['abc', [Validators.required]],
    email: ['abc@gmail.com', [Validators.required]],
    phone: ['+03438798120', [Validators.required]],
    currency: ['USD', [Validators.required]],
    paymentTerm: ['Monthly'],
    address: this.formBuilder.group({
      addressLine1: ['addressLine1', [Validators.required]],
      addressLine2: ['addressLine2'],
      country: ['country', [Validators.required]],
      city: ['city', [Validators.required]],
      state: ['state', [Validators.required]],
      zipCode: ['zipCode', [Validators.required]]
    }),
    contactPersons: this.formBuilder.group({}),
    customeFields: this.formBuilder.group({}),
    remarks: this.formBuilder.group({})
  })

  constructor(private formBuilder: FormBuilder, private commonService: CommonService,) { }

  ngOnInit() {
  }
  addressTab = true;
  contactTab = false;
  remarksTab = false;
  updateActive(current) {
    ;
    if (current == 'address') {
      this.addressTab = true;
      this.contactTab = false;
      this.remarksTab = false;
    }
    else if (current == 'contact') {
      this.addressTab = false;
      this.contactTab = true;
      this.remarksTab = false;
    }
    else if (current == 'remarks') {
      this.addressTab = false;
      this.contactTab = false;
      this.remarksTab = true;
    }
  }


  get customerType() {
    return this.form.get('customerType');
  }
  get firstName() {
    return this.form.get('firstName');
  }
  get companyName() {
    return this.form.get('companyName');
  }
  get email() {
    return this.form.get('email');
  }
  get phone() {
    return this.form.get('phone');
  }
  get currency() {
    return this.form.get('currency');
  }
  get address() {
    return this.form.get('address') as FormGroup;
  }
  get addressLine1() {
    return this.address.get('addressLine1');
  }
  get country() {
    return this.address.get('country');
  }
  get city() {
    return this.address.get('city');
  }
  get state() {
    return this.address.get('state');
  }
  get zipCode() {
    return this.address.get('zipCode');
  }
  //        

}

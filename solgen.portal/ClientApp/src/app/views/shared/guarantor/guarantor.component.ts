import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'guarantor',
  templateUrl: './guarantor.component.html',
  styleUrls: ['./guarantor.component.scss']
})
export class GuarantorComponent implements OnInit {
  @Input('group')
  public guarantorForm: FormGroup;
  @Input('states') states: any;
  @Input('isDisabled') isDisabled: any;
  dateTime = new Date();
  SameAs = true;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe(params => {   
      if (params[0].path == 'editlease') {
        this.SameAs = false;
      }
      if (params[0].path == 'addlease') {
        this.SameAs = false;
      
      }
      if (params[0].path == 'lease-request') {
        this.SameAs = false;
      }
    });

    if (this.isDisabled === 'disabled') {
      this.bussinesstate.disable();
      this.homeState.disable();
      this.formattedDateOfBirth.disable();
      this.guarantorSocialNumber.disable();
      this.guarantorPhone.disable();
    }
  }

  toggleEditable(event) {
    if (event.target.checked) {

      this.guarantorHomeAddress.setValue(this.guarantorBussinessAddress.value);
      this.guarantorHomeCity.setValue(this.guarantorBussinessCity.value);
      this.guarantorHomeCounty.setValue(this.guarantorBussinessCounty.value);
      this.guarantorHomeState.setValue(this.guarantorBussinessState.value);
      this.guarantorHomeZip.setValue(this.guarantorBussinessZip.value);

      this.guarantorHomeAddress.updateValueAndValidity();
      this.guarantorHomeCity.updateValueAndValidity();
      this.guarantorHomeCounty.updateValueAndValidity();
      this.guarantorHomeState.updateValueAndValidity();
      this.guarantorHomeZip.updateValueAndValidity();
    }
    else {
      this.guarantorHomeAddress.setValue('');
      this.guarantorHomeCity.setValue('');
      this.guarantorHomeCounty.setValue('');
      this.guarantorHomeState.setValue(null);
      this.guarantorHomeZip.setValue('');
           
      this.guarantorHomeAddress.updateValueAndValidity();
      this.guarantorHomeCity.updateValueAndValidity();
      this.guarantorHomeCounty.updateValueAndValidity();
      this.guarantorHomeState.updateValueAndValidity();
      this.guarantorHomeZip.updateValueAndValidity();
    }
  }

  get bussinesstate() { return this.guarantorForm.get('guarantorBussinessState'); }
  get homeState() { return this.guarantorForm.get('guarantorHomeState'); }
  get formattedDateOfBirth() { return this.guarantorForm.get('guarantorFormattedDateOfBirth'); }
  get guarantorFirstName() { return this.guarantorForm.get('guarantorFirstName'); } 
  get guarantorLastName() { return this.guarantorForm.get('guarantorLastName'); } 
  get guarantorTitle() { return this.guarantorForm.get('guarantorTitle'); }
  get guarantorOwnership() { return this.guarantorForm.get('guarantorOwnership'); } 
  get guarantorBussinessAddress() { return this.guarantorForm.get('guarantorBussinessAddress'); } 
  get guarantorBussinessCity() { return this.guarantorForm.get('guarantorBussinessCity'); } 
  get guarantorBussinessState() { return this.guarantorForm.get('guarantorBussinessState'); } 
  get guarantorBussinessZip() { return this.guarantorForm.get('guarantorBussinessZip'); } 

  get guarantorBussinessCounty() { return this.guarantorForm.get('guarantorBussinessCounty'); } 
  get guarantorHomeCity() { return this.guarantorForm.get('guarantorHomeCity'); }
  get guarantorHomeAddress() { return this.guarantorForm.get('guarantorHomeAddress'); } 
  get guarantorHomeZip() { return this.guarantorForm.get('guarantorHomeZip'); }
  get guarantorHomeState() { return this.guarantorForm.get('guarantorHomeState'); } 
  get guarantorHomeCounty() { return this.guarantorForm.get('guarantorHomeCounty'); } 
  get guarantorPhone() { return this.guarantorForm.get('guarantorPhone'); } 
  get guarantorEmail() { return this.guarantorForm.get('guarantorEmail'); }
  get guarantorSocialNumber() { return this.guarantorForm.get('guarantorSocialNumber'); }
}

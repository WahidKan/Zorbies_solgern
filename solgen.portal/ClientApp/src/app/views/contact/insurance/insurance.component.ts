import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {
  @Input('group')
  public insuranceForm: FormGroup;
  @Input('states') states: any;
  constructor() { }

  ngOnInit() {
  }

  get name() { return this.insuranceForm.get('name'); } 
  get address() { return this.insuranceForm.get('address'); }
  get city() { return this.insuranceForm.get('city'); }
  get state() { return this.insuranceForm.get('state'); }
  get zipCode() { return this.insuranceForm.get('zipCode'); }
  get phone() { return this.insuranceForm.get('phone'); }
  get agentName() { return this.insuranceForm.get('agentName'); }
  get agentEmail() { return this.insuranceForm.get('agentEmail'); }
  get county() { return this.insuranceForm.get('county'); } 
}

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'guarantorold',
  templateUrl: './guarantorold.component.html',
})
export class GuarantoroldComponent implements OnInit {
  @Input('group')
  public guarantorForm: FormGroup;
  @Input('states') states: any; maxDate : Date;
  constructor() { }

  ngOnInit() {
    this.maxDate  = new Date();
  }
}

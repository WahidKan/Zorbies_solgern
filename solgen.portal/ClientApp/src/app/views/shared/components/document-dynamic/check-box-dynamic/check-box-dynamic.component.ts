import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-check-box-dynamic',
  templateUrl: './check-box-dynamic.component.html',
  styleUrls: ['./check-box-dynamic.component.scss']
})
export class CheckBoxDynamicComponent implements OnInit {

  @Input('checkBox') public checkBox: FormGroup;
  focus: boolean = false;

  constructor() { }

  ngOnInit() {
    if (this.checkBox.get('focus').value) {
      this.focus = true;
      this.checkBox.get('focus').setValue(false);
    }
  }
}

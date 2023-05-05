import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent implements OnInit {
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

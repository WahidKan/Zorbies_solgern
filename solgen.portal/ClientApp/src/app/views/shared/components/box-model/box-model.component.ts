import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-box-model',
  templateUrl: './box-model.component.html',
  styleUrls: ['./box-model.component.scss'],
})
export class BoxModelComponent implements OnInit {
  @Input('cssModel') cssModel: FormGroup;

  constructor() {}

  ngOnInit() {
  }
}

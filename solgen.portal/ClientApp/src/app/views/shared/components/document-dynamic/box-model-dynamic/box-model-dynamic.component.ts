import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-box-model-dynamic',
  templateUrl: './box-model-dynamic.component.html',
  styleUrls: ['./box-model-dynamic.component.scss']
})
export class BoxModelDynamicComponent implements OnInit {
  @Input('cssModel') cssModel: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}

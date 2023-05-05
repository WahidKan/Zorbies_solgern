import { Component, Input, OnInit } from '@angular/core';
import { forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {documentConst} from '../../../../constants/document-const';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor, OnInit {
  @Input() isHeading: boolean;
  @Input() textFieldType: string = 'text';
  @Input() disabled: boolean = false;
  @Input() header: string;
  @Input() componentType : string;
  @Input() hiddenFieldName: string;
  onChange: any = () => {};
  onTouch: any = () => {};
  val = '';

  constructor() {}
  ngOnInit() {}

  get value() {
    return this.val;
  }
  set value(val) {
    if (val !== undefined && this.val !== val) {
      this.val = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }

  writeValue(value: any) {
    if(this.componentType === documentConst.TABLE){
      this.value = value;
      }
      else if(this.componentType === documentConst.PRICINGTABLE){
        this.value = this.header;
      }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
}

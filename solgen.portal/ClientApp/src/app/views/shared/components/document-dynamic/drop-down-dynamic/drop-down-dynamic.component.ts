import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-drop-down-dynamic',
  templateUrl: './drop-down-dynamic.component.html',
  styleUrls: ['./drop-down-dynamic.component.scss']
})
export class DropDownDynamicComponent implements OnInit {
  @Input('dropdown') public dropdown: FormGroup;
  @ViewChild('modal', { static: true }) textFieldModal: ModalDirective;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  addItem() {
    if (this.dropdown.get('dropdownItem') && this.dropdown.get('dropdownItem').value) {
      const obj = { key: this.dropdown.get('dropdownItem').value, text: this.dropdown.get('dropdownItem').value };
      (this.dropdown.get('dropdownList') as FormArray).push(this.fb.control(obj));
      this.dropdown.get('dropdownItem').setValue(null);
    }
  }
  removeItem(index: number) {
    (this.dropdown.get('dropdownList') as FormArray).removeAt(index);
  }

  get dropdownList() {
    return this.dropdown.get('dropdownList') as FormArray;
  }

  close() {
    this.textFieldModal.hide();
  }
}

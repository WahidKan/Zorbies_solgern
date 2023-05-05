import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  @ViewChild('actionModal', { static: false }) actionModal: ModalDirective;
  @Input() form: FormGroup;
  nodeId: string;
  constructor() { }

  ngOnInit() {
  }
  showActinModal(nodeId: string) {
    this.nodeId = nodeId;
    this.actionModal.show();
  }
  saveActionForm() {
    this.closeActionModal();
  }
  closeActionModal() {
    this.actionModal.hide();
  }
  get actionForm() {
    let node = (this.form.get("nodes") as FormArray).controls.find(f => f.get("nodeId").value == this.nodeId);
    return node != null ? node.get("component") : null;
  }
}

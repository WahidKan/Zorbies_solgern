import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { FlowBuilderService } from '../flow-builder.service';

@Component({
  selector: 'app-loop',
  templateUrl: './loop.component.html',
  styleUrls: ['./loop.component.scss']
})
export class LoopComponent implements OnInit {

  @ViewChild('loopModal', { static: false }) loopModal: ModalDirective;
  @Input() form: FormGroup;
  nodeId: string;
  constructor(private service: FlowBuilderService) { }

  ngOnInit() {
    
  }
  collectionVariables = [
    {
      value: "Api",
      id: 1
    },
    {
      value: "Flow",
      id: 2
    },
    {
      value: "Label",
      id: 3
    },
    {
      value: "Profile",
      id: 4
    }
  ]
  saveLoopForm() {
    this.closeLoopModal();
    // console.log(this.loopForm.value);
  }
  showLoopModal(nodeId: string) {
    this.nodeId = nodeId;
    this.loopModal.show();
    this.collectionVariables = [...this.service.ReturnCollection(this.form, nodeId)];
  }
  closeLoopModal() {
    this.loopModal.hide();
  }
  get loopForm() {
    let node = (this.form.get("nodes") as FormArray).controls.find(f => f.get("nodeId").value == this.nodeId);
    return node != null ? node.get("component") : null;
  }
  get loopName() { return this.loopForm.get('name'); }
  get loopDescription() { return this.loopForm.get('description'); }
}

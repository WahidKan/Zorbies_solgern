import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FlowBuilderService } from '../flow-builder.service';

@Component({
  selector: 'app-rollback',
  templateUrl: './rollback.component.html',
  styleUrls: ['./rollback.component.scss']
})
export class RollbackComponent implements OnInit {

  @ViewChild('rollBackModal', { static: false }) rollBackModal: ModalDirective;
  @Input() form: FormGroup;
  nodeId: string;
  constructor(private flowBuilderService: FlowBuilderService) { }

  ngOnInit() {
  }
  saveRollBackForm() {
    // console.log(this.rollBackForm);
    this.closeRollBackModal()
  }
  showRollBackModal(nodeId: string) {
    this.nodeId = nodeId;
    this.rollBackModal.show();
  }
  closeRollBackModal() {
    this.rollBackModal.hide();
  }
  get rollBackForm() {
    let node = (this.form.get("nodes") as FormArray).controls.find(f => f.get("nodeId").value == this.nodeId);
    return node != null ? node.get("component") : null;
  }
  get rollBackName() { return this.rollBackForm.get('name'); }
  get rollBackDescription() { return this.rollBackForm.get('description'); }
}

import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-loop-connector-modal',
  templateUrl: './loop-connector-modal.component.html',
  styleUrls: ['./loop-connector-modal.component.scss']
})

export class LoopConnectorModalComponent implements OnInit {

  @ViewChild('loopConnectorModal', { static: false }) loopConnectorModal: ModalDirective;
  @Input() form : FormGroup;
  targetId : any;
  sourceId : any;


  constructor() { }

  ngOnInit() {
  }

  close(){
    this.loopConnectorModal.hide();
  }
  save(){
    this.loopConnectorModal.hide();
  }

  show(targetID,sourceID){
  ;
  this.targetId=targetID;
  this.sourceId=sourceID;
    this.loopConnectorModal.show();
  }

  get LoopConnectorModalForm(){
     return (this.form.get("connectors") as FormArray).controls.find(f => f.get("targetID").value == this.targetId && f.get("sourceID").value == this.sourceId);
  }

}

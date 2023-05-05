import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-flow-type-selection',
  templateUrl: './flow-type-selection.component.html',
  styleUrls: ['./flow-type-selection.component.scss']
})
export class FlowTypeSelectionComponent implements OnInit {
  @ViewChild('FlowTypeSelection', { static: false }) modalFlowSelection: ModalDirective;
  @Input('title') title: string;
  @Output('valueChange') valueChange : EventEmitter<any> = new EventEmitter();
  active = false;
  Type:string='';
  loadSave : boolean = false;
  constructor() { }

  ngOnInit() {

  }

  show(){
    this.active = true;
    this.modalFlowSelection.show();
  }
  close() {
    this.modalFlowSelection.hide();
  }

  save(){
    this.active = false;
    this.valueChange.emit(this.Type);
    this.modalFlowSelection.hide();
  }

  Active(selType){
    this.Type=selType;
  }
}

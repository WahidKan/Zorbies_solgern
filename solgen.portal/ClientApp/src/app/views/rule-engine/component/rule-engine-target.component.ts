import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'rule-engine-target',
  templateUrl: './rule-engine-target.component.html'
})
export class RuleEngineTargetComponent implements OnInit {

  @Output() deleteTargetEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  deleteTarget() {    
    this.deleteTargetEvent.emit();
  }
}

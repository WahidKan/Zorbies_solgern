import { Component, EventEmitter, OnInit, Output,Input } from '@angular/core';

@Component({
  selector: 'app-solgen-rule-engine-target',
  templateUrl: './solgen-rule-engine-target.component.html',
  styleUrls: ['./solgen-rule-engine-target.component.scss']
})
export class SolgenRuleEngineTargetComponent implements OnInit {

  @Output() deleteTargetEvent = new EventEmitter();
  @Input() vwRuleId: any;
  constructor() { }

  ngOnInit() {
  }

  deleteTarget() {
    this.deleteTargetEvent.emit();
  }

}

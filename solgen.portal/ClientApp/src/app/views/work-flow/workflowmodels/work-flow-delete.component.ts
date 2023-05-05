import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-work-flow-delete',
  templateUrl: './work-flow-delete.component.html',
  styleUrls: ['./work-flow-delete.component.scss']
})
export class WorkFlowDeleteComponent implements OnInit {

  @Output() deleteTargetEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  deleteTarget() {
    this.deleteTargetEvent.emit();
  }
}
